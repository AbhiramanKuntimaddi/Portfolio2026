import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-dvh flex items-center bg-background overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <p className="font-mono text-[11px] md:text-xs text-accent/70 tracking-[0.25em] mb-6">
          <span className="text-accent/70">{"//"}</span> error 404 · route not
          found
        </p>

        <h1 className="text-[clamp(3rem,15vw,9rem)] font-bold uppercase leading-[0.82] tracking-tight text-foreground">
          Lost in
          <br />
          <span className="text-accent italic">Transit.</span>
        </h1>

        <p className="mt-8 max-w-md font-sans text-sm md:text-base text-foreground/50 leading-relaxed">
          This page drifted off the map — or never existed. Everything else is
          still right where it should be.
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex items-baseline font-mono cursor-pointer"
        >
          <span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
            &gt;
          </span>
          <span className="flex flex-col">
            <span className="flex items-baseline gap-1">
              <span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-foreground">
                return_home
              </span>
              <span className="text-accent/40 select-none">();</span>
            </span>
            <span className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
}
