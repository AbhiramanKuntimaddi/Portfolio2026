"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function RollingDigit({
  digit,
  className = "",
}: {
  digit: string;
  className?: string;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const prev = useRef<string | null>(null);

  useGSAP(
    () => {
      const slot = slotRef.current;
      if (!slot) return;
      const incoming = slot.querySelector<HTMLElement>("[data-incoming]");
      if (!incoming) return;

      if (prev.current === null || prev.current === digit) {
        prev.current = digit;
        return;
      }

      const old = incoming.cloneNode(true) as HTMLElement;
      old.textContent = prev.current;
      old.removeAttribute("data-incoming");
      old.style.position = "absolute";
      old.style.left = "0";
      old.style.right = "0";
      old.style.top = "0";
      slot.appendChild(old);
      prev.current = digit;

      gsap.fromTo(
        incoming,
        { yPercent: 30, opacity: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
      );
      gsap.to(old, {
        yPercent: -30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => old.remove(),
      });
    },
    { dependencies: [digit] },
  );

  return (
    <div ref={slotRef} className="relative inline-flex justify-center">
      <span data-incoming className={className}>
        {digit}
      </span>
    </div>
  );
}
