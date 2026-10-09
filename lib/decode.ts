import { gsap } from "@/lib/gsap";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>";
const LOWER = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>";

type Slot = { node: Text; text: string; written: string };

const pick = (set: string) => set[(Math.random() * set.length) | 0];

const scramble = (ch: string) => {
  if (!/[\p{L}\p{N}]/u.test(ch)) return ch;
  return ch === ch.toLowerCase() && ch !== ch.toUpperCase()
    ? pick(LOWER)
    : pick(UPPER);
};

export function makeDecoder(el: Element) {
  const slots: Slot[] = [];
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walk.nextNode()) {
    const node = walk.currentNode as Text;
    const text = node.nodeValue ?? "";
    if (text.trim()) slots.push({ node, text, written: text });
  }

  const render = (p: number) => {
    for (const s of slots) {
      if (s.node.nodeValue !== s.written) s.text = s.node.nodeValue ?? "";
    }
    const total = slots.reduce((n, s) => n + s.text.length, 0);
    const done = p >= 1 ? total : Math.floor(p * total);
    let i = 0;
    for (const s of slots) {
      let out = "";
      for (const ch of s.text) out += i++ < done ? ch : scramble(ch);
      if (out !== s.node.nodeValue) s.node.nodeValue = out;
      s.written = out;
    }
  };

  const restore = () => {
    for (const s of slots) {
      if (s.node.nodeValue === s.written) s.node.nodeValue = s.text;
      s.written = s.text;
    }
  };

  return { render, restore };
}

export function decodeIn(
  tl: gsap.core.Timeline,
  targets: Element[],
  position: gsap.Position,
  restores: (() => void)[],
  { duration = 0.5, stagger = 0.08 } = {},
) {
  const wide = window.matchMedia("(min-width: 1280px)").matches;
  targets.forEach((el, i) => {
    if (el.getAttribute("data-decode") === "wide" && !wide) return;
    const d = makeDecoder(el);
    const proxy = { p: 1 };
    restores.push(d.restore);
    tl.fromTo(
      proxy,
      { p: 0 },
      {
        p: 1,
        duration,
        ease: "none",
        immediateRender: false,
        onUpdate: () => d.render(proxy.p),
      },
      typeof position === "number" ? position + i * stagger : position,
    );
  });
}
