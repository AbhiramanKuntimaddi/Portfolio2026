"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GlobalGlow = dynamic(
  () => import("@/components/ui/GlobalGlow").then((m) => m.GlobalGlow),
  { ssr: false },
);
const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

export function ClientChrome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 250));
    const id = ric(() => setShow(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    };
  }, []);

  if (!show) return null;
  return (
    <>
      <GlobalGlow />
      <CustomCursor />
    </>
  );
}
