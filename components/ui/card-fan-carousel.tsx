"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { projectImage, type Project } from "@/lib/projects";

export default function CardFanCarousel({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !projects.length) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = container.querySelectorAll<HTMLElement>("[data-fan-card]");
    const layout = () => {
      const width = container.clientWidth;
      cards.forEach((card, index) => {
        let distance = (index - center + projects.length) % projects.length;
        if (distance > (projects.length - 1) / 2) distance -= projects.length;
        const active = hovered === index;
        gsap.to(card, {
          x: distance * width * (width < 640 ? 0.12 : 0.115),
          y: Math.abs(distance) ** 2 * (width < 640 ? 9 : 15) - (active ? 24 : 0),
          rotation: distance * 7,
          scale: (1 - Math.abs(distance) * 0.075) * (active ? 1.045 : 1),
          zIndex: active ? 20 : 10 - Math.abs(distance),
          duration: media.matches ? 0 : 0.55,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };
    const observer = new ResizeObserver(layout);
    observer.observe(container);
    media.addEventListener("change", layout);
    layout();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", layout);
      gsap.killTweensOf(cards);
    };
  }, [center, hovered, projects]);

  if (!projects.length) return null;
  const cycle = (direction: number) => {
    setHovered(null);
    setCenter((previous) => (previous + direction + projects.length) % projects.length);
  };

  return <div role="region" aria-label="Selected brand projects" aria-roledescription="carousel">
    <div ref={containerRef} className="relative isolate flex h-[340px] items-start justify-center pt-10 min-[480px]:h-[410px] min-[751px]:h-[510px] min-[751px]:pt-14" onMouseLeave={() => setHovered(null)}>
      {projects.map((project, index) => <Link
        key={project.slug}
        href={`/work/${project.slug}`}
        data-fan-card
        onMouseEnter={() => setHovered(index)}
        onFocus={() => { setCenter(index); setHovered(index); }}
        onBlur={() => setHovered(null)}
        className="group absolute top-10 block w-[64%] max-w-[380px] origin-bottom rounded-xl border-4 border-line bg-[#141414] shadow-[0_16px_45px_#0009] transition-colors hover:border-brand focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand min-[751px]:top-14 min-[751px]:w-[34%]"
      >
        <div className="relative aspect-[3508/2480] overflow-hidden rounded-t-lg">
          <Image src={projectImage(project)} alt={`${project.name} — selected creative work`} fill sizes="(max-width: 750px) 64vw, 380px" className="object-contain" />
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-[9px] text-foreground">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex min-h-20 items-center justify-between gap-3 px-4 py-4 min-[751px]:min-h-24 min-[751px]:px-5">
          <div><h3 className="font-heading text-[clamp(20px,2.3vw,30px)] leading-tight text-foreground group-hover:text-brand">{project.name}</h3><p className="mt-1 text-[10px] text-muted">{project.category}</p></div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-black"><FiArrowUpRight aria-hidden="true" size={20} /></span>
        </div>
      </Link>)}
    </div>
    <div className="relative z-30 flex items-center justify-center gap-5">
      <button type="button" aria-label="Previous project" onClick={() => cycle(-1)} className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><FiArrowLeft /></button>
      <p aria-live="polite" aria-atomic="true" className="min-w-0 text-center text-xs text-foreground"><span className="block font-semibold">{projects[center].name}</span><span className="mt-1 block font-mono text-[10px] text-muted">{center + 1} / {projects.length}</span></p>
      <button type="button" aria-label="Next project" onClick={() => cycle(1)} className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><FiArrowRight /></button>
    </div>
  </div>;
}
