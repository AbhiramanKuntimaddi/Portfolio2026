import { readActivity } from "@/lib/cms/store";
import { CMS_LABELS, isCmsKey } from "@/lib/cms/schema";

const ACTIONS: Record<string, string> = {
  edit: "saved draft",
  publish: "published",
  discard: "discarded draft",
};

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));

export default async function ActivityPage() {
  const log = await readActivity();
  return (
    <div>
      <p className="mb-3 text-muted lowercase">
        <span className="text-accent">$</span> tail activity.log
      </p>
      <h1 className="mb-10 font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
        Activity
      </h1>
      <ul className="border-t border-line">
        {log.map((e) => (
          <li
            key={e.id}
            className="grid grid-cols-1 gap-1 border-b border-line py-4 lowercase md:grid-cols-12 md:gap-6"
          >
            <span className="text-muted tabular-nums md:col-span-3">
              {when(e.created_at)}
            </span>
            <span
              className={`md:col-span-2 ${
                e.action === "publish" ? "text-accent" : "text-foreground/80"
              }`}
            >
              {ACTIONS[e.action] ?? e.action}
            </span>
            <span className="text-foreground md:col-span-3">
              {e.target && isCmsKey(e.target) ? CMS_LABELS[e.target] : e.target}
            </span>
            <span className="text-muted md:col-span-4">{e.detail}</span>
          </li>
        ))}
        {log.length === 0 && (
          <li className="border-b border-line py-10 text-muted lowercase">
            no activity yet.
          </li>
        )}
      </ul>
    </div>
  );
}
