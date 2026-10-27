"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandFilmVideo } from "@/lib/content";

export function Showreel({ suspended }: { suspended: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 751px)",
      mobile: "(max-width: 750px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, context => {
      if (context.conditions?.reducedMotion) {
        gsap.set(section, { "--reel-scale": 1, "--reel-radius": "0px" });
        return;
      }
      gsap.fromTo(section,
        { "--reel-scale": context.conditions?.mobile ? .86 : .72, "--reel-radius": "28px" },
        {
          "--reel-scale": 1,
          "--reel-radius": "0px",
          ease: "power1.inOut",
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 15%", scrub: .6, invalidateOnRefresh: true },
        },
      );
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;
    const updatePlayback = () => {
      if (inView && !suspended && !document.hidden) {
        void video.play().catch(() => { /* Browsers may restrict autoplay in power-saving mode. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      updatePlayback();
    }, { threshold: [0, 0.25] });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", updatePlayback); video.pause(); };
  }, [suspended]);
  return <section ref={sectionRef} id="reel" aria-label="Recycle Bin Media brand film" className="showreel-frame w-full">
    <div className="showreel-card w-full overflow-hidden bg-black">
      <video ref={videoRef} src={brandFilmVideo} autoPlay muted loop playsInline preload="metadata" aria-label="Recycle Bin Media CGI brand film" className="block h-auto w-full" />
    </div>
  </section>;
}
