"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sampleVideo, showreelPoster } from "@/lib/content";
import { Button } from "./ui";

export function Showreel({ suspended, onPlay }: { suspended: boolean; onPlay: () => void }) {
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
        void video.play().catch(() => { /* Manual playback remains available. */ });
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
  return <section ref={sectionRef} id="reel" className="showreel-frame w-full">
    <Button onClick={onPlay} aria-label="Play studio showreel" className="showreel-card group relative block h-[340px] w-full overflow-hidden bg-[#151515] text-left min-[751px]:h-[420px] min-[1101px]:h-[500px] min-[1600px]:h-[650px]">
      <video ref={videoRef} src={sampleVideo} poster={showreelPoster} muted loop playsInline preload="metadata" aria-label="Studio showreel preview" className="absolute inset-0 block size-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/65" />
      <span className="absolute top-5 left-5 text-[7px] tracking-[2px] text-foreground min-[751px]:top-[30px] min-[751px]:left-8 min-[751px]:text-[9px]">A LITTLE BIT OF WHAT WE DO</span>
      <span className="absolute top-1/2 left-1/2 grid size-[74px] -translate-1/2 place-items-center rounded-full border border-white/45 text-foreground backdrop-blur-lg transition-all duration-250 group-hover:scale-108 group-hover:border-brand group-hover:bg-brand group-hover:text-black group-focus-visible:bg-brand group-focus-visible:text-black motion-reduce:transition-none min-[751px]:size-[100px]"><span className="ml-[5px] text-[21px]">&#9654;</span></span>
      <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between text-[22px] leading-[1.25] tracking-[-1px] text-foreground min-[751px]:right-8 min-[751px]:bottom-8 min-[751px]:left-8 min-[751px]:text-[28px]"><span>Less ordinary.<br /><strong className="font-normal text-brand">More unforgettable.</strong></span><span className="max-w-[85px] text-[7px] leading-[1.7] tracking-[1.3px] min-[751px]:max-w-none min-[751px]:text-[10px]">WATCH THE SHOWREEL &#8599;</span></span>
    </Button>
  </section>;
}
