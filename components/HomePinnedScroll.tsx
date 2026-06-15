"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";
import { lenisRef } from "@/lib/lenis";
import { enableSectionSnap } from "@/lib/sectionSnap";
import { HeroAct } from "@/components/acts/HeroAct";
import { AboutAct } from "@/components/acts/AboutAct";
import { SkillsAct } from "@/components/acts/SkillsAct";
import { ExperienceAct } from "@/components/acts/ExperienceAct";
import { ProjectsAct } from "@/components/acts/ProjectsAct";
import { ContactAct } from "@/components/acts/ContactAct";
import { Footer } from "@/components/ui/Footer";
import { SectionNav, type NavItem } from "@/components/ui/SectionNav";

const NAV_ITEMS: NavItem[] = [
  { label: "hero", name: "intro" },
  { label: "about", name: "about" },
  { label: "skills", name: "skills" },
  { label: "experience", name: "experience" },
  { label: "projects", name: "work" },
  { label: "contact", name: "contact" },
];

interface CycRange {
  key: "skills" | "exp" | "projects";
  start: number;
  dur: number;
  count: number;
}

export function HomePinnedScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const heroInRef = useRef<gsap.core.Timeline | null>(null);
  const idxRef = useRef({ skills: 0, exp: 0, projects: 0 });
  const [idx, setIdx] = useState({ skills: 0, exp: 0, projects: 0 });
  const [navPos, setNavPos] = useState<number[]>([]);

  useLayoutEffect(() => {
    let off = () => {};
    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".about-act",
          ".skills-act",
          ".exp-act",
          ".projects-act",
          ".contact-act",
        ],
        { autoAlpha: 0 },
      );

      const heroIn = gsap.timeline({ paused: true });
      heroIn
        .from(".hero-name-line", {
          yPercent: 115,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
        })
        .from(
          ".hero-sub-line",
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.55",
        )
        .from(
          ".hero-sub-text",
          { opacity: 0, x: -16, duration: 0.5, ease: "expo.out" },
          "<",
        )
        .from(
          ".hero-status",
          { opacity: 0, y: 10, duration: 0.5, ease: "expo.out" },
          "-=0.25",
        )
        .from(
          ".hero-meta-right",
          { opacity: 0, y: 16, duration: 0.6, ease: "expo.out" },
          "<",
        )
        .from(
          ".hero-obj-label",
          { opacity: 0, y: 8, duration: 0.45, ease: "expo.out" },
          "-=0.35",
        )
        .from(
          ".hero-obj-h1",
          { opacity: 0, y: 30, duration: 0.7, ease: "expo.out" },
          "-=0.3",
        )
        .from(
          ".hero-cta",
          { opacity: 0, x: 18, duration: 0.5, ease: "expo.out" },
          "-=0.45",
        )
        .from(
          ".hero-strip-item",
          { opacity: 0, y: 20, duration: 0.5, ease: "expo.out", stagger: 0.08 },
          "-=0.3",
        );

      heroInRef.current = heroIn;
      off = loaderSignal.onComplete(() => heroIn.play());
    }, wrapperRef);

    return () => {
      off();
      ctx.revert();
      heroInRef.current = null;
    };
  }, []);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const run = () => {
      ctx = gsap.context(() => {
      const ranges: CycRange[] = [];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 28}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.01) heroInRef.current?.progress(1);
            const t = self.progress * tl.duration();
            const next = { ...idxRef.current };
            let changed = false;
            for (const r of ranges) {
              if (t < r.start) {
                if (next[r.key] !== 0) {
                  next[r.key] = 0;
                  changed = true;
                }
                continue;
              }
              const i = Math.min(
                Math.floor((t - r.start) / r.dur),
                r.count - 1,
              );
              if (i !== next[r.key]) {
                next[r.key] = i;
                changed = true;
              }
            }
            if (changed) {
              idxRef.current = next;
              setIdx(next);
            }
          },
        },
      });

      const showAct = (sel: string, t: number) =>
        tl.set(sel, { autoAlpha: 1 }, t);
      const hideAct = (sel: string, t: number) =>
        tl.to(sel, { autoAlpha: 0, duration: 0.01 }, t);

      const addCyclic = (
        cfg: {
          act: string;
          intro: string;
          content: string;
          block: string;
          bg: string;
          key: "skills" | "exp" | "projects";
        },
        startT: number,
      ): number => {
        showAct(cfg.act, startT - 0.05);

        tl.from(
          `.${cfg.intro}-intro-label`,
          { opacity: 0, y: 12, duration: 0.4, ease: "power3.out" },
          startT,
        )
          .from(
            `.${cfg.intro}-intro-line`,
            { yPercent: 115, duration: 0.6, ease: "expo.out", stagger: 0.1 },
            startT + 0.1,
          )
          .from(
            `.${cfg.intro}-intro-p`,
            {
              opacity: 0,
              y: 20,
              filter: "blur(6px)",
              duration: 0.5,
              ease: "power3.out",
            },
            startT + 0.3,
          );

        const introOut = startT + 1.4;
        const itemsStart = startT + 1.85;
        const itemDur = 0.6;

        tl.to(
          `.${cfg.intro}-intro`,
          {
            opacity: 0,
            scale: 0.96,
            filter: "blur(10px)",
            duration: 0.25,
            ease: "power2.in",
          },
          introOut,
        )
          .fromTo(
            cfg.content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
            introOut + 0.05,
          )
          .fromTo(
            cfg.bg,
            { opacity: 0 },
            { opacity: 0.05, duration: 0.4, ease: "power2.out" },
            itemsStart - 0.1,
          );
        const blocks = gsap.utils.toArray<HTMLElement>(cfg.block);
        blocks.forEach((b, i) => {
          const s = itemsStart + i * itemDur;
          tl.fromTo(
            gsap.utils.toArray(b.children),
            {
              yPercent: 80,
              opacity: 0,
              clipPath: "inset(0% 0% 100% 0%)",
            },
            {
              yPercent: 0,
              opacity: 1,
              clipPath: "inset(0% 0% -30% 0%)",
              duration: 0.26,
              ease: "power4.out",
              stagger: 0.05,
            },
            s,
          );
          if (i < blocks.length - 1) {
            tl.to(
              gsap.utils.toArray(b.children),
              {
                yPercent: -80,
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 0.22,
                ease: "power3.in",
                stagger: 0.04,
              },
              s + itemDur - 0.22,
            );
          }
        });

        ranges.push({
          key: cfg.key,
          start: itemsStart,
          dur: itemDur,
          count: blocks.length,
        });

        for (let li = 0; li < blocks.length; li++) {
          tl.addLabel(
            `${cfg.key}-${li}`,
            itemsStart + li * itemDur + itemDur * 0.45,
          );
        }

        const itemsEnd = itemsStart + blocks.length * itemDur;
        tl.to(
          cfg.content,
          {
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            duration: 0.3,
            ease: "power2.in",
          },
          itemsEnd + 0.05,
        ).to(cfg.bg, { opacity: 0, duration: 0.2 }, itemsEnd + 0.05);
        hideAct(cfg.act, itemsEnd + 0.4);

        return itemsEnd + 0.4;
      };

      tl.to(
        ".hero-name",
        { yPercent: -20, duration: 0.6, ease: "power2.in" },
        0,
      )
        .to(
          ".hero-content",
          { scale: 0.92, duration: 0.55, ease: "power2.in" },
          0,
        )
        .to(
          ".hero-content",
          {
            autoAlpha: 0,
            filter: "blur(18px)",
            duration: 0.45,
            ease: "power2.in",
          },
          0.1,
        );
      hideAct(".hero-act", 0.75);

      showAct(".about-act", 0.65);
      tl.fromTo(
        ".about-img",
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        0.7,
      )
        .fromTo(
          ".about-img-inner",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.55,
            ease: "power3.out",
          },
          0.7,
        )
        .fromTo(
          ".about-photo",
          { scale: 1.3 },
          { scale: 1, duration: 0.6, ease: "power2.out" },
          0.7,
        )
        .fromTo(
          ".about-quote-label",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.9,
        )
        .from(
          ".about-quote .word",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.02,
          },
          0.95,
        )
        .fromTo(
          ".about-cite",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3 },
          1.2,
        )
        .from(
          ".about-p1 .word",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.25,
            ease: "power3.out",
            stagger: 0.012,
          },
          1.25,
        )
        .from(
          ".about-p2 .word",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.22,
            ease: "power3.out",
            stagger: 0.012,
          },
          1.5,
        )
        .to(
          ".about-content",
          {
            opacity: 0,
            yPercent: -12,
            filter: "blur(8px)",
            duration: 0.35,
            ease: "power2.in",
          },
          2.4,
        );
      hideAct(".about-act", 2.85);

      const skillsStart = 2.85;
      const skillsEnd = addCyclic(
        {
          act: ".skills-act",
          intro: "skills",
          content: ".skills-content",
          block: ".skill-block",
          bg: ".skills-bgdigit",
          key: "skills",
        },
        skillsStart,
      );
      const expStart = skillsEnd;
      const expEnd = addCyclic(
        {
          act: ".exp-act",
          intro: "exp",
          content: ".exp-content",
          block: ".exp-block",
          bg: ".exp-bgyear",
          key: "exp",
        },
        expStart,
      );
      const projStart = expEnd;
      const projEnd = addCyclic(
        {
          act: ".projects-act",
          intro: "projects",
          content: ".projects-content",
          block: ".project-block",
          bg: ".projects-bgdigit",
          key: "projects",
        },
        projStart,
      );

      const contactStart = projEnd;
      showAct(".contact-act", contactStart - 0.05);
      tl.from(
        ".contact-headline-line",
        { yPercent: 115, duration: 0.5, ease: "expo.out", stagger: 0.1 },
        contactStart,
      )
        .from(
          ".contact-sub",
          {
            opacity: 0,
            y: 16,
            filter: "blur(6px)",
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.08,
          },
          contactStart + 0.25,
        )
        .from(
          ".contact-fade",
          {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.1,
          },
          contactStart + 0.4,
        );

      tl.addLabel("hero", 0)
        .addLabel("about", 2.0)
        .addLabel("skills", skillsStart + 0.9)
        .addLabel("experience", expStart + 0.9)
        .addLabel("projects", projStart + 0.9)
        .addLabel("contact", contactStart + 0.9);

      tlRef.current = tl;
      const dur = tl.duration();
      setNavPos(
        NAV_ITEMS.map((it) => (dur ? (tl.labels[it.label] ?? 0) / dur : 0)),
      );
      const cleanupSnap = enableSectionSnap(tl);

      return () => {
        cleanupSnap();
        tlRef.current = null;
      };
      }, wrapperRef);
    };
    const handle = w.requestIdleCallback
      ? w.requestIdleCallback(run)
      : window.setTimeout(run, 1);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle);
      else clearTimeout(handle);
      ctx?.revert();
    };
  }, []);

  const getProgress = useCallback(
    () => tlRef.current?.scrollTrigger?.progress ?? 0,
    [],
  );

  const scrollToProgress = useCallback((p: number) => {
    const st = tlRef.current?.scrollTrigger;
    if (!st) return;
    const target = st.start + p * (st.end - st.start);
    const lenis = lenisRef.get();
    if (lenis) lenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target });
  }, []);

  const scrollToLabel = (label: string) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const t = tl.labels[label];
    if (t == null) return;
    const target = st.start + (t / tl.duration()) * (st.end - st.start);
    const lenis = lenisRef.get();

    if (label === "contact") {
      tl.progress(t / tl.duration());
    }

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
        onComplete: () => {
          st.refresh();
        },
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => st.refresh(), 1200);
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative z-10 w-full h-dvh overflow-hidden"
      >
        <HeroAct onContact={() => scrollToLabel("contact")} />
        <AboutAct />
        <SkillsAct activeIndex={idx.skills} />
        <ExperienceAct activeIndex={idx.exp} />
        <ProjectsAct activeIndex={idx.projects} />
        <ContactAct />
      </div>
      <SectionNav
        items={NAV_ITEMS}
        positions={navPos}
        getProgress={getProgress}
        scrollToProgress={scrollToProgress}
        onJump={scrollToLabel}
      />
      <Footer />
    </>
  );
}
