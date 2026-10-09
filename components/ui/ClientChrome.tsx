"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DotField = dynamic(
  () => import("@/components/ui/DotField").then((m) => m.DotField),
  { ssr: false },
);

export function ClientChrome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShow(true);
    };

    const ric = window.requestIdleCallback;
    if (ric) ric(reveal, { timeout: 1200 });
    const t = window.setTimeout(reveal, 400);

    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;
  return <DotField />;
}
