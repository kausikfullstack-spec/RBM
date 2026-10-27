"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Rising and expanding inversion circle, driven by normal document scrolling. */
export default function InversionCircleScrollAnimation({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        stage.style.setProperty("--hero-circle", "circle(0px at 50% 100%)");
        return;
      }
      const height = stage.clientHeight;
      const width = stage.clientWidth;
      const travel = Math.max(0, -track.getBoundingClientRect().top) / height;
      const rise = Math.min(1, travel);
      const expand = Math.min(1, Math.max(0, travel - 1));
      const easedRise = rise < 0.5 ? 8 * rise ** 4 : 1 - (-2 * rise + 2) ** 4 / 2;
      const initialRadius = Math.min(190, width * 0.32);
      const radius = initialRadius + expand ** 2 * (Math.hypot(width, height) / 2 - initialRadius + 2);
      const centerY = height / 2 + (1 - easedRise) * (height / 2 + initialRadius);
      stage.style.setProperty("--hero-circle", `circle(${radius}px at ${width / 2}px ${centerY}px)`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={trackRef} className="hero-scroll-track">
    <section ref={stageRef} aria-label="Recycle Bin Media creative studio" className="hero-scroll-stage">
      {children}
      <div aria-hidden="true" inert className="hero-inverted">{children}</div>
    </section>
  </div>;
}
