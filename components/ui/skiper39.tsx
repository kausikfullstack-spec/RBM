"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import { BrandDifferences } from "../brand-differences";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  paused?: boolean;
}

type Peep = {
  cell: number;
  x: number;
  y: number;
  baseline: number;
  scale: number;
  direction: number;
};

/** Adapted from Skiper UI #39 and Zadvorsky's crowd canvas; Open Peeps artwork. */
export function CrowdCanvas({ src, rows = 15, cols = 7, paused = false }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || rows < 1 || cols < 1) return;
    const image = new Image();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const people: Peep[] = [];
    const animations: gsap.core.Timeline[] = [];
    let disposed = false;
    let visible = false;
    let ready = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const cellWidth = image.naturalWidth / rows;
      const cellHeight = image.naturalHeight / cols;
      people.forEach(peep => {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.direction * peep.scale, peep.scale);
        ctx.drawImage(image, (peep.cell % rows) * cellWidth, Math.floor(peep.cell / rows) * cellHeight, cellWidth, cellHeight, -cellWidth / 2, -cellHeight, cellWidth, cellHeight);
        ctx.restore();
      });
    };

    const resize = () => {
      if (!ready || disposed) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      animations.forEach(animation => animation.kill());
      animations.length = 0;
      people.length = 0;
      const count = width < 600 ? 60 : 120;
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        const direction = Math.random() > .5 ? 1 : -1;
        const baseline = height * (.5 + depth * .55);
        const peep: Peep = { cell: Math.floor(Math.random() * rows * cols), x: 0, y: baseline, baseline, scale: .35 + depth * .25, direction };
        people.push(peep);
        const start = direction === 1 ? -150 : width + 150;
        const end = direction === 1 ? width + 150 : -150;
        const walk = gsap.timeline({ paused: true, repeat: -1 })
          .fromTo(peep, { x: start }, { x: end, duration: 18 + Math.random() * 14, ease: "none" }, 0);
        const duration = walk.duration();
        walk.to(peep, { y: baseline - 7, duration: .25, repeat: Math.ceil(duration / .25), yoyo: true, ease: "power1.inOut" }, 0);
        walk.progress(Math.random());
        animations.push(walk);
      }
      people.sort((a, b) => a.baseline - b.baseline);
      draw();
    };

    const tick = (_time: number, delta: number) => {
      if (!ready || !visible || document.hidden || motion.matches || pausedRef.current) return;
      animations.forEach(animation => animation.totalTime(animation.totalTime() + Math.min(delta, 64) / 1000));
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersectionObserver.observe(canvas);
    image.onload = () => {
      if (disposed) return;
      ready = true;
      resize();
      gsap.ticker.add(tick);
    };
    image.src = src;
    return () => {
      disposed = true;
      image.onload = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gsap.ticker.remove(tick);
      animations.forEach(animation => animation.kill());
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />;
}

export function Skiper39() {
  const [paused, setPaused] = useState(false);
  return <section aria-labelledby="crowd-heading" className="relative isolate mt-16 overflow-hidden bg-brand text-black min-[751px]:mt-24">
    <div className="relative z-10 mx-auto max-w-[760px] px-6 pt-12 text-center min-[751px]:pt-16">
      <p className="text-[9px] tracking-[2px]">FRESH THINKING. DISTINCTIVE BRANDS.</p>
      <h2 id="crowd-heading" className="mt-4 font-heading text-[clamp(32px,4.5vw,64px)] leading-[1.06]">Give your brand<br />a place in the crowd.<br /><span className="text-black/60">And a reason to stand out.</span></h2>
    </div>
    <BrandDifferences />
    <div className="relative h-[230px] overflow-hidden min-[751px]:h-[280px]"><CrowdCanvas src="/illustrations/crowd.png" paused={paused} /></div>
    <div className="absolute top-5 right-5 z-20">
      <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play crowd animation" : "Pause crowd animation"} aria-pressed={paused} className="grid size-9 shrink-0 place-items-center rounded-full border border-black/40 hover:bg-black hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:hidden">
        {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
      </button>
    </div>
  </section>;
}

export default Skiper39;

