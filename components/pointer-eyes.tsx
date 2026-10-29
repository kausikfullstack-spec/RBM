"use client";

import { useEffect, useRef } from "react";

export function PointerEyes() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const point = pointer
        ? new DOMPoint(pointer.x, pointer.y).matrixTransform(matrix.inverse())
        : null;
      svg.querySelectorAll<SVGGElement>("[data-pupil]").forEach((pupil, index) => {
        const dx = point ? point.x - (27 + index * 58) : 0;
        const dy = point ? point.y - 27 : 0;
        const distance = Math.hypot(dx, dy);
        const scale = distance ? Math.min(distance * 0.12, 7) / distance : 0;
        pupil.setAttribute("transform", `translate(${dx * scale} ${dy * scale})`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const reset = () => { pointer = null; schedule(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return <svg ref={svgRef} aria-hidden="true" viewBox="0 0 112 54" className="mx-[.025em] inline-block h-[.85em] w-[1.76em] self-center overflow-visible" fill="none">
    <g className="pointer-eyes-blink">
    {[0, 58].map((offset) => <g key={offset} transform={`translate(${offset} 0)`}>
      <path d="M2 30C2 14 12 3 27 3S52 14 52 30V34C52 45 44 51 27 51S2 45 2 34Z" className="fill-foreground" />
      <g data-pupil>
        <circle cx="27" cy="27" r="15" className="fill-background stroke-brand" strokeWidth="2.5" />
        <circle cx="30" cy="23" r="3" className="fill-foreground" />
      </g>
    </g>)}
    </g>
  </svg>;
}
