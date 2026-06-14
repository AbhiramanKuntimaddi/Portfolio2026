import { lenisRef } from "@/lib/lenis";

function snap(
  anchors: () => number[],
  getStart: () => number,
  getEnd: () => number,
): () => void {
  if (typeof window === "undefined") return () => {};
  if (!window.matchMedia("(pointer: coarse)").matches) return () => {};

  const EPS = 8;
  const MOVED = 6;
  let snapping = false;
  let startScroll = 0;

  const settle = () => {
    const lenis = lenisRef.get();
    if (!lenis || snapping) return;

    const cur = lenis.scroll;
    if (cur < getStart() - 1 || cur > getEnd() + 1) return;

    const moved = cur - startScroll;
    if (Math.abs(moved) < MOVED) return;
    const dir = moved > 0 ? 1 : -1;

    const pts = anchors();
    const target =
      dir > 0
        ? pts.find((a) => a > cur + EPS)
        : [...pts].reverse().find((a) => a < cur - EPS);

    if (target == null) return;

    snapping = true;
    lenis.scrollTo(target, {
      duration: 0.9,
      lock: true,
      easing: (x: number) => 1 - Math.pow(1 - x, 3),
      onComplete: () => {
        snapping = false;
      },
    });
  };

  const onTouchStart = () => {
    const lenis = lenisRef.get();
    startScroll = lenis ? lenis.scroll : 0;
  };

  const onTouchEnd = () => {
    requestAnimationFrame(() => requestAnimationFrame(settle));
  };

  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  return () => {
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
  };
}

export function enableSectionSnap(tl: gsap.core.Timeline): () => void {
  if (typeof window === "undefined") return () => {};

  const st = tl.scrollTrigger;
  if (!st) return () => {};

  const labelTimes = Object.values(tl.labels).sort((a, b) => a - b);
  if (labelTimes.length === 0) return () => {};

  const anchors = () => {
    const dur = tl.duration();
    const range = st.end - st.start;
    return labelTimes
      .map((t) => st.start + (t / dur) * range)
      .sort((a, b) => a - b);
  };

  return snap(
    anchors,
    () => st.start,
    () => st.end,
  );
}
