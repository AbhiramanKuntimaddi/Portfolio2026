"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  if (process.env.NODE_ENV === "development") {
    (window as Window & { gsap?: typeof gsap }).gsap = gsap;
  }
}

export { gsap, ScrollTrigger, useGSAP };
