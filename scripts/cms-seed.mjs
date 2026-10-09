import { register } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

register("./lib/ts-paths.mjs", import.meta.url);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const push = args.has("--push");
const force = args.has("--force");
const DEFAULT_ADMIN = "admin@abhiramankuntimaddi.com";
const admins = [
  ...new Set([
    DEFAULT_ADMIN,
    ...process.argv
      .slice(2)
      .filter((a) => a.startsWith("--admin="))
      .map((a) => a.slice("--admin=".length).trim().toLowerCase())
      .filter(Boolean),
  ]),
];
const badAdmin = admins.find((e) => !/^[^\s@']+@[^\s@']+\.[^\s@']+$/.test(e));
if (badAdmin) {
  console.error(`[cms] "${badAdmin}" isn't a valid email`);
  process.exit(1);
}

const SCHEMA = `create table if not exists public.cms_drafts (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_snapshots (
  key text primary key,
  data jsonb not null,
  published_at timestamptz not null default now()
);

create table if not exists public.cms_activity (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  target text,
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_admins (
  email text primary key check (email = lower(email)),
  added_at timestamptz not null default now()
);

create table if not exists public.login_throttle (
  identifier text primary key,
  attempts integer not null default 0,
  first_attempt timestamptz not null default now(),
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.cms_drafts enable row level security;
alter table public.cms_snapshots enable row level security;
alter table public.cms_activity enable row level security;
alter table public.cms_admins enable row level security;
alter table public.login_throttle enable row level security;

drop policy if exists "snapshots are public" on public.cms_snapshots;
create policy "snapshots are public"
  on public.cms_snapshots for select
  using (true);

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "media is public" on storage.objects;
create policy "media is public"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');
`;

const { CMS_KEYS, DEFAULTS, normalize } = await import("../lib/cms/schema.ts");

const content = CMS_KEYS.map((key) => ({
  key,
  data: normalize(key, DEFAULTS[key]),
}));

const literal = (value) => {
  const json = JSON.stringify(value, null, 2);
  let tag = "cms";
  while (json.includes(`$${tag}$`)) tag += "x";
  return `$${tag}$${json}$${tag}$::jsonb`;
};

const seed = content
  .map(
    (c) => `insert into public.cms_snapshots (key, data) values (
  '${c.key}',
  ${literal(c.data)}
)
on conflict (key) do ${
      force
        ? "update set data = excluded.data, published_at = now()"
        : "nothing"
    };
`,
  )
  .join("\n");

const adminSql = admins.length
  ? `\ninsert into public.cms_admins (email) values
${admins.map((e) => `  ('${e}')`).join(",\n")}
on conflict (email) do nothing;
`
  : "";

const dir = path.join(root, "supabase");
await mkdir(dir, { recursive: true });
await writeFile(path.join(dir, "schema.sql"), SCHEMA);
await writeFile(path.join(dir, "seed.sql"), seed + adminSql);

const summary = content
  .map((c) =>
    Array.isArray(c.data) ? `${c.key}: ${c.data.length}` : `${c.key}: ok`,
  )
  .join(" · ");
console.log(`[cms] wrote supabase/seed.sql (website content: ${summary})`);
console.log("[cms] wrote supabase/schema.sql (tables, run once)");
console.log(
  admins.length
    ? `[cms] admins in seed.sql: ${admins.join(", ")}`
    : "[cms] no admin added; pass --admin=you@example.com to add one",
);

if (push) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "[cms] --push needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
    process.exit(1);
  }
  const { createClient } = await import("@supabase/supabase-js");
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: existing, error: readError } = await db
    .from("cms_snapshots")
    .select("key");
  if (readError) {
    console.error(
      `[cms] can't read cms_snapshots (${readError.message}). Run supabase/schema.sql in the SQL editor first.`,
    );
    process.exit(1);
  }
  if (admins.length) {
    const { error: adminError } = await db.from("cms_admins").upsert(
      admins.map((email) => ({ email })),
      { onConflict: "email", ignoreDuplicates: true },
    );
    if (adminError) {
      console.error(`[cms] adding admins failed: ${adminError.message}`);
      process.exit(1);
    }
    console.log(`[cms] admins: ${admins.join(", ")}`);
  }
  const have = new Set((existing ?? []).map((r) => r.key));
  const rows = content
    .filter((c) => force || !have.has(c.key))
    .map((c) => ({ ...c, published_at: new Date().toISOString() }));
  if (rows.length === 0) {
    console.log(
      "[cms] database already has every section; use --force to overwrite",
    );
  } else {
    const { error } = await db
      .from("cms_snapshots")
      .upsert(rows, { onConflict: "key" });
    if (error) {
      console.error(`[cms] push failed: ${error.message}`);
      process.exit(1);
    }
    console.log(`[cms] pushed ${rows.map((r) => r.key).join(", ")}`);
  }
}
