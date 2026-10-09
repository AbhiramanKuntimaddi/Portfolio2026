import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

/*
 * Syncs the Design Lab into a project. Everything Lab-related lives in one
 * hidden folder at the project root, so the project's own source stays clean:
 *
 *   .design-lab/lab/            the Lab itself (gitignored, dev only)
 *   .design-lab/stub.tsx        no-op stand-in for deploys and fresh clones (committed)
 *   .design-lab/design-lab.d.ts types for the "design-lab" import (committed)
 *
 * The one exception is app/tokens.css: it's the site's real CSS, so it sits
 * with the app and ships to production.
 */

const root = process.cwd();
const lab = resolve(root, process.env.DESIGN_LAB_DIR ?? "../DesignLab");

if (!existsSync(join(lab, "src", "index.ts"))) {
  console.log("[design-lab] not found next to this project, skipping (the stub keeps builds working)");
  process.exit(0);
}

const app = existsSync(join(root, "src", "app")) ? join(root, "src", "app") : join(root, "app");
const home = join(root, ".design-lab");

const write = (to, content) => {
  const prev = existsSync(to) ? readFileSync(to, "utf8") : null;
  if (prev === content) return false;
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, content);
  return true;
};

const labDest = join(home, "lab");
rmSync(labDest, { recursive: true, force: true });
mkdirSync(labDest, { recursive: true });
cpSync(join(lab, "src"), labDest, { recursive: true });

const version = (css) => css?.match(/tokens v(\d+)\.(\d+)\.(\d+)/)?.slice(1).map(Number) ?? [1, 0, 0];
const tokensPath = join(app, "tokens.css");
const nextTokens = readFileSync(join(lab, "tokens.css"), "utf8");
const before = existsSync(tokensPath) ? version(readFileSync(tokensPath, "utf8")) : null;
const after = version(nextTokens);

const changed = [];
if (write(tokensPath, nextTokens)) changed.push("tokens.css");
if (before && before[0] < after[0]) {
  console.warn(
    `[design-lab] tokens.css moved from v${before.join(".")} to v${after.join(".")}, a breaking change.` +
      ` See ${join(lab, "CHANGELOG.md")} for what to update in this project.`,
  );
}
if (write(join(home, "design-lab.d.ts"), readFileSync(join(lab, "design-lab.d.ts"), "utf8"))) changed.push("types");
const stub = join(home, "stub.tsx");
if (!existsSync(stub) && write(stub, readFileSync(join(lab, "stub.tsx"), "utf8"))) changed.push("stub");

console.log(`[design-lab] synced${changed.length ? ` (updated: ${changed.join(", ")})` : ""}`);
