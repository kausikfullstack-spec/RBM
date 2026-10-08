"use client";
import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import { Arrow, Button, headingStyles, sectionStyles, SectionLabel } from "./ui";

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  return <Button onClick={onSelect} className="group bg-transparent p-0 text-left">
    <div className="relative aspect-[1.63] overflow-hidden bg-[#141414]"><Image src={`/work/${project.image}.jpg`} alt={`${project.name} film preview`} fill sizes="(max-width: 750px) 100vw, 50vw" className="object-cover saturate-70 transition-all duration-500 group-hover:scale-104 group-hover:saturate-100 motion-reduce:transition-none" /><span className="absolute right-5 bottom-5 grid size-[43px] place-items-center rounded-full bg-brand text-[25px] text-black transition-transform group-hover:rotate-45"><Arrow /></span><span className="absolute top-5 left-5 bg-black/50 px-[9px] py-1.5 text-[10px] text-foreground backdrop-blur-sm transition-colors group-hover:bg-brand group-hover:text-black group-focus-visible:bg-brand group-focus-visible:text-black">0{index + 1}</span></div>
    <div className="flex items-center justify-between border-b border-line px-3 py-[17px]"><h3 className="font-heading text-[19px] font-normal tracking-normal min-[751px]:text-[21px]">{project.name}</h3><span className="text-[10px] text-muted transition-colors group-hover:text-black group-focus-visible:text-black">{project.category}<Arrow className="ml-[13px] text-brand group-hover:text-black group-focus-visible:text-black" /></span></div>
  </Button>;
}
export function Portfolio({ onSelect }: { onSelect: (project: Project) => void }) {
  const [filter, setFilter] = useState("All work");
  return <section id="work" className={sectionStyles}><div className="flex items-end justify-between"><div><SectionLabel>SELECTED WORK / 02</SectionLabel><h2 className={`${headingStyles} mt-[25px]`}>Made to <span className="text-brand">make a mark.</span></h2></div><span className="hidden text-[9px] leading-[1.8] tracking-[1.4px] text-muted min-[751px]:inline">A FEW FRAMES.<br />A WHOLE LOT OF FEELING.</span></div>
    <div aria-label="Filter projects" className="mt-7 mb-6 flex flex-wrap gap-[7px] min-[751px]:mt-[38px] min-[751px]:mb-[30px] min-[751px]:gap-2.5">{["All work", "Brand film", "Corporate film", "Campaign film"].map(item => <Button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-[13px] py-[9px] text-[10px] min-[751px]:px-5 min-[751px]:py-[11px] min-[751px]:text-[11px] ${filter === item ? "border-brand bg-brand text-black" : "border-line bg-transparent text-[#c3c3bc]"}`}>{item}{item === "All work" && <sup className="ml-2 text-[8px]">04</sup>}</Button>)}</div>
    <div className="grid grid-cols-1 gap-7 min-[751px]:grid-cols-2 min-[751px]:gap-x-[25px] min-[751px]:gap-y-11">{projects.map((project, index) => (filter === "All work" || filter === project.category) && <ProjectCard key={project.name} project={project} index={index} onSelect={() => onSelect(project)} />)}</div><p className="mt-[25px] text-[11px] text-muted">Sample projects and stock imagery. Your stories go here.</p>
  </section>;
}
