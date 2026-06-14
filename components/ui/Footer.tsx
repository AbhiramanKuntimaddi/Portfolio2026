"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full px-6 md:px-20 pb-12 md:pb-16 pt-20 md:pt-32 bg-transparent ${className}`}
    >
      <div className="max-w-7xl mx-auto relative pt-10">
        <div className="footer-line absolute top-0 left-0 h-px w-full bg-accent/30" />

        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0 items-start md:items-center">
          <div className="footer-reveal flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[11px] font-mono text-foreground/45 tracking-wide block">
              <span className="text-accent/60">{"//"}</span> v.2026
            </span>
            <span className="text-[11px] font-mono text-foreground/45 tracking-wide block leading-relaxed md:leading-normal">
              <span className="text-accent/60">{"//"}</span> animated by{" "}
              <span className="text-foreground/70">GSAP</span> + scrolled by{" "}
              <span className="text-foreground/70">Lenis</span> · styled by{" "}
              <span className="text-foreground/70">TailwindCSS</span>
            </span>
            <span className="text-[11px] font-mono text-foreground/45 tracking-wide block leading-relaxed md:leading-normal">
              <span className="text-accent/60">{"//"}</span> stored in{" "}
              <span className="text-foreground/70">Supabase</span> · delivered
              through <span className="text-foreground/70">Resend</span> ·
              shipped by <span className="text-foreground/70">NextJS</span>
            </span>
          </div>

          <div className="footer-reveal w-full md:w-auto flex justify-start md:justify-end">
            <StatusBadge />
          </div>
        </div>

        <div className="footer-copy mt-16 md:mt-12 text-left md:text-center">
          <p className="text-[11px] font-mono text-foreground/25 tracking-wide">
            © {currentYear} Abhiraman Kuntimaddi
          </p>
        </div>
      </div>
    </footer>
  );
}
