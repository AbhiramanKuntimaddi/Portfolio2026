import { createClient } from "@supabase/supabase-js";

const DEFAULT_EMAIL = "admin@abhiramankuntimaddi.com";
const MIN_LENGTH = 10;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [argPassword, argEmail] = process.argv.slice(2);
const email = (argEmail || DEFAULT_EMAIL).trim().toLowerCase();

if (!url || !key) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}
if (!/^[^\s@']+@[^\s@']+\.[^\s@']+$/.test(email)) {
  console.error(`"${email}" isn't a valid email.`);
  process.exit(1);
}

function ask(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) {
      console.error(
        'No terminal to prompt in. Pass the password instead:\n  npm run bootstrap:admin -- "<password>" [email]',
      );
      process.exit(1);
    }
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (char) => {
      if (char === "\u0003") {
        process.stdout.write("\n");
        process.exit(130);
      }
      if (char === "\r" || char === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        process.stdout.write("\n");
        resolve(value);
        return;
      }
      if (char === "\u007f" || char === "\b") {
        if (value) {
          value = value.slice(0, -1);
          process.stdout.write("\b \b");
        }
        return;
      }
      value += char;
      process.stdout.write("*".repeat(char.length));
    };
    stdin.on("data", onData);
  });
}

let password = argPassword;
if (!password) {
  password = await ask(`Password for ${email}: `);
  const again = await ask("Repeat password: ");
  if (password !== again) {
    console.error("Passwords don't match.");
    process.exit(1);
  }
}
if (password.length < MIN_LENGTH) {
  console.error(`Use at least ${MIN_LENGTH} characters.`);
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: list, error: listError } = await supabase.auth.admin.listUsers({
  perPage: 1000,
});
if (listError) {
  console.error("listUsers failed:", listError.message);
  process.exit(1);
}

const existing = list.users.find((u) => u.email?.toLowerCase() === email);

if (existing) {
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("updateUser failed:", error.message);
    process.exit(1);
  }
  console.log("Updated password for existing user:", email);
} else {
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("createUser failed:", error.message);
    process.exit(1);
  }
  console.log("Created user:", email);
}

const { error: adminError } = await supabase
  .from("cms_admins")
  .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });
if (adminError) {
  console.error(
    `Adding to cms_admins failed: ${adminError.message}\nRun supabase/schema.sql in the SQL editor first.`,
  );
  process.exit(1);
}

console.log("\n✓ Admin ready. Sign in at /admin/login with:");
console.log("  email:    ", email);
console.log("  password:  (the one you just set)\n");
