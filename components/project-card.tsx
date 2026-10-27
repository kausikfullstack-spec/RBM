import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { projectImage, type Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link href={`/work/${project.slug}`} className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand">
    <div className="relative aspect-[3508/2480] overflow-hidden border border-line bg-[#141414]">
      <Image src={projectImage(project)} alt={`${project.name} — selected creative work`} fill sizes="(max-width: 750px) 90vw, 45vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none" />
      <span aria-hidden="true" className="absolute top-4 left-4 rounded-full bg-black/80 px-3 py-1.5 font-mono text-[10px] text-foreground">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-brand text-black transition-transform group-hover:rotate-45 motion-reduce:transition-none"><FiArrowUpRight size={23} /></span>
    </div>
    <div className="flex items-start justify-between gap-4 border-b border-line py-5">
      <div><h3 className="font-heading text-[25px] leading-tight transition-colors group-hover:text-brand min-[751px]:text-[30px]">{project.name}</h3><p className="mt-2 text-[11px] leading-relaxed text-muted">{project.services.join(" / ")}</p></div>
      <span className="mt-1 shrink-0 text-[10px] text-muted">{project.category}</span>
    </div>
  </Link>;
}
