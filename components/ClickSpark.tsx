"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ClickSparkProps {
  children?: ReactNode;
  sparkColor?: string;
  shape?: "line";
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
}

type Burst = { x: number; y: number; started: number };

export default function ClickSpark({ children, sparkColor = "#fff", shape = "line", sparkCount = 8, sparkSize = 14, sparkRadius = 30, duration = 500 }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return; 
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let bursts: Burst[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const count = Math.min(64, Math.max(0, Math.floor(sparkCount)));
    const lifetime = Math.max(1, duration);

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      bursts = [];
      context.clearRect(0, 0, width, height);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const draw = (now: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      bursts = bursts.filter(burst => now - burst.started < lifetime);
      context.strokeStyle = sparkColor;
      context.lineWidth = 2;
      context.lineCap = "round";
      for (const burst of bursts) {
        const progress = Math.min(1, (now - burst.started) / lifetime);
        const eased = 1 - (1 - progress) ** 3;
        const radius = sparkRadius * eased;
        const length = Math.max(0, sparkSize) * (1 - progress);
        context.globalAlpha = 1 - progress;
        for (let index = 0; index < count; index++) {
          const angle = index / count * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          context.beginPath();
          context.moveTo(burst.x + cos * radius, burst.y + sin * radius);
          context.lineTo(burst.x + cos * (radius + length), burst.y + sin * (radius + length));
          context.stroke();
        }
      }
      context.globalAlpha = 1;
      if (bursts.length) frame = requestAnimationFrame(draw);
    };
    const click = (event: MouseEvent) => {
      if (reducedMotion.matches || document.hidden || event.button !== 0 || event.detail === 0 || !count) return;
      bursts.push({ x: event.clientX, y: event.clientY, started: performance.now() });
      if (bursts.length > 32) bursts.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    };
    resize();
    // Capture also catches clicks on controls that stop propagation, including dialogs.
    document.addEventListener("click", click, true);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", clear);
    reducedMotion.addEventListener("change", clear);
    return () => {
      clear();
      document.removeEventListener("click", click, true);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", clear);
      reducedMotion.removeEventListener("change", clear);
    };
  }, [sparkColor, shape, sparkCount, sparkSize, sparkRadius, duration]);

  return <>
    {children}
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] h-dvh w-full motion-reduce:hidden" />
  </>;
}
