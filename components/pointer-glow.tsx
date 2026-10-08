"use client";

import { useEffect, useRef } from "react";

export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let overControl = false;

    const hide = () => { glow.style.opacity = "0"; };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      overControl = event.target instanceof Element &&
        Boolean(event.target.closest("a, button, summary, [role='button']"));
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.style.opacity = overControl ? "0.85" : "0.5";
        frame = 0;
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      data-pointer-glow
      className="pointer-events-none fixed top-0 left-0 z-[60] opacity-0 mix-blend-screen transition-opacity duration-200 motion-reduce:transition-none"
    >
      <div className="size-80 -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,201,3,0.24)_0%,rgba(250,201,3,0.14)_25%,rgba(250,201,3,0.05)_50%,transparent_75%)] blur-xl" />
    </div>
  );
}
