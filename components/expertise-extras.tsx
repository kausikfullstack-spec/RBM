"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SectionLabel } from "./ui";

const strengths = [
  { title: "Video & motion", value: 100 },
  { title: "Graphics & identity", value: 94 },
  { title: "Marketing & growth", value: 87 },
  { title: "Digital experiences", value: 80 },
];

export function ExpertiseStrengths() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add({ reduced: "(prefers-reduced-motion: reduce)", animated: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
        const progress = { value: conditions?.reduced ? 1 : 0 };
        const render = () => {
          container.current?.querySelectorAll<HTMLElement>("[data-strength]").forEach((row, index) => {
            const value = Math.round(strengths[index].value * progress.value);
            const fill = row.querySelector<HTMLElement>("[data-fill]");
            const count = row.querySelector<HTMLElement>("[data-count]");
            if (fill) fill.style.width = `${value}%`;
            if (count) count.textContent = `${value}%`;
          });
        };
        render();
        if (!conditions?.reduced) gsap.to(progress, { value: 1, ease: "none", onUpdate: render, scrollTrigger: { trigger: container.current, start: "top 90%", end: "top 35%", scrub: 0.6, invalidateOnRefresh: true } });
      });
      return () => media.revert();
    }, container);
    return () => context.revert();
  }, []);

  return <div ref={container} className="flex min-w-0 flex-col justify-center gap-8" aria-label="Our creative focus">
    {strengths.map(({ title, value }) => <div key={title} data-strength>
      <div className="flex items-end justify-between gap-4"><h3 className="text-base">{title}</h3><span data-count aria-hidden="true" className="font-mono text-xl text-brand tabular-nums">0%</span><span className="sr-only">Creative focus: {value}%</span></div>
      <div aria-hidden="true" className="mt-4 h-2.5 overflow-hidden rounded-full bg-line"><div data-fill className="h-full w-0 rounded-full bg-brand" /></div>
    </div>)}
  </div>;
}

const tools = [
  { name: "Premiere Pro", category: "Video editing", logo: "/tools/premiere.svg" },
  { name: "After Effects", category: "Video editing", logo: "/tools/after-effects.svg" },
  { name: "DaVinci Resolve", category: "Video editing", logo: "/tools/davinci-resolve.svg" },
  { name: "CapCut", category: "Video editing", logo: "/tools/capcut.svg" },
  { name: "Photoshop", category: "Graphic design", logo: "/tools/photoshop.svg" },
  { name: "Illustrator", category: "Graphic design", logo: "/tools/illustrator.svg" },
  { name: "InDesign", category: "Graphic design", logo: "/tools/indesign.svg" },
  { name: "Canva", category: "Graphic design", logo: "/tools/canva.svg" },
  { name: "Figma", category: "Graphic design", logo: "/tools/figma.svg" },
  { name: "Google Ads", category: "Digital advertising", logo: "/tools/google-ads.svg" },
  { name: "Meta Ads Manager", category: "Digital advertising", logo: "/tools/meta.svg" },
  { name: "Google Analytics 4", category: "Analytics & tracking", logo: "/tools/google-analytics.svg" },
  { name: "Google Tag Manager", category: "Analytics & tracking", logo: "/tools/google-tag-manager.svg" },
  { name: "React", category: "Web development", logo: "/tools/react.svg" },
  { name: "WordPress", category: "Web development", logo: "/tools/wordpress.svg" },
  { name: "Tailwind CSS", category: "Web development", logo: "/tools/tailwind-css.svg" },
  { name: "JavaScript", category: "Web development", logo: "/tools/javascript.svg" },
];

export function ExpertiseTools() {
  const slider = useRef<HTMLDivElement>(null);
  const interaction = useRef({ dragging: false, hovering: false, focused: false, lastX: 0, resumeAt: 0 });

  useEffect(() => {
    const element = slider.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let distance = 0;
    const measure = () => {
      distance = element.scrollWidth / 3;
      if (!reduced.matches && element.scrollLeft < distance) element.scrollLeft += distance;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    measure();
    const tick = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      const state = interaction.current;
      if (!reduced.matches && distance > 0 && !state.dragging && time > state.resumeAt) {
        if (!state.hovering && !state.focused) element.scrollLeft += delta * 0.035;
        if (element.scrollLeft >= distance * 2) element.scrollLeft -= distance;
        else if (element.scrollLeft < distance) element.scrollLeft += distance;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, []);

  return <section aria-labelledby="tools-heading" className="border-y border-line py-12 md:py-16">
    <div className="mb-8 px-[5%] md:px-[4.5%]"><SectionLabel>OUR CREATIVE TOOLKIT</SectionLabel><h2 id="tools-heading" className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">The tools behind the work<span className="text-brand">.</span></h2></div>
    <div ref={slider} className="tools-marquee" tabIndex={0} role="region" aria-label="Tools we use. Drag, swipe, or use arrow keys to explore." data-lenis-prevent
      onMouseEnter={() => { interaction.current.hovering = true; }}
      onMouseLeave={() => { interaction.current.hovering = false; }}
      onFocus={() => { interaction.current.focused = true; }}
      onBlur={() => { interaction.current.focused = false; }}
      onTouchStart={() => { interaction.current.dragging = true; }}
      onTouchEnd={() => { interaction.current.dragging = false; interaction.current.resumeAt = performance.now() + 1500; }}
      onTouchCancel={() => { interaction.current.dragging = false; }}
      onPointerDown={event => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        event.preventDefault();
        interaction.current.dragging = true;
        interaction.current.lastX = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true";
      }}
      onPointerMove={event => {
        if (event.pointerType !== "mouse" || !interaction.current.dragging) return;
        event.currentTarget.scrollLeft += interaction.current.lastX - event.clientX;
        interaction.current.lastX = event.clientX;
      }}
      onLostPointerCapture={event => { interaction.current.dragging = false; event.currentTarget.dataset.dragging = "false"; }}
      onPointerUp={event => {
        if (event.pointerType !== "mouse") return;
        interaction.current.dragging = false;
        interaction.current.resumeAt = performance.now() + 1000;
        event.currentTarget.dataset.dragging = "false";
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}>
      <div className="tools-marquee-track">{[0, 1, 2].map(copy => <ul key={copy} aria-hidden={copy !== 1 || undefined} className="tools-marquee-group">{tools.map(({ name, category, logo }) => <li key={name} className="flex w-[180px] shrink-0 flex-col items-center justify-center rounded-2xl border border-line bg-white/[.025] px-3 py-6 md:w-[200px]"><div className="mb-4 flex size-16 items-center justify-center rounded-xl bg-white p-2.5"><Image src={logo} alt="" width={48} height={48} draggable={false} className="size-12 object-contain" /></div><span className="text-center text-sm font-medium">{name}</span><span className="mt-2 text-[10px] text-muted">{category}</span></li>)}</ul>)}</div>
    </div>
  </section>;
}

