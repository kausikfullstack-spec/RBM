"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FitWordmark({ children, fill = .99 }: { children: ReactNode; fill?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    const text = container?.firstElementChild as HTMLElement | null;
    if (!container || !text) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      text.style.fontSize = "100px";
      const naturalWidth = text.getBoundingClientRect().width;
      if (naturalWidth > 0) {
        text.style.fontSize = `${Math.min(220, container.clientWidth / naturalWidth * 100 * fill)}px`;
      }
    };
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    fit();
    void document.fonts.ready.then(fit);
    return () => { active = false; observer.disconnect(); };
  }, [fill]);

  return <div ref={ref} className="hero-wordmark">{children}</div>;
}
