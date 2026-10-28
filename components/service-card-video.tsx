"use client";

import { useEffect, useRef } from "react";
import { useSiteControls } from "./site-shell";

export function ServiceCardVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { overlayOpen } = useSiteControls();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && !overlayOpen && !reducedMotion.matches) {
        void video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      update();
    }, { threshold: [0, 0.25] });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
      video.pause();
    };
  }, [overlayOpen]);

  return <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover object-right" />;
}
