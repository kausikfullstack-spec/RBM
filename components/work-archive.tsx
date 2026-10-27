"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Button } from "./ui";

// const categories = ["All work", ...new Set(projects.map(project => project.category))];

export function WorkArchive() {
  // const [category, setCategory] = useState("All work");
  const [query, setQuery] = useState("");
  const filtered = projects.filter(project => `${project.name} ${project.category} ${project.services.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));

  return <section aria-label="Browse our projects" className="px-[5%] pb-20 min-[751px]:px-[4.5%] min-[751px]:pb-28">
    <div className="mb-9 flex justify-end border-y border-line py-6">
      {/* <div aria-label="Filter projects by industry" className="flex flex-wrap gap-2">
        {categories.map(item => <Button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2.5 text-[11px] ${category === item ? "border-brand bg-brand text-black" : "border-line bg-transparent text-foreground"}`}>{item}</Button>)}
      </div> */}
      <label className="flex w-full items-center gap-3 rounded-full border border-line px-4 py-3 focus-within:border-brand min-[751px]:max-w-[340px]">
        <FiSearch aria-hidden="true" className="shrink-0 text-brand" /><span className="sr-only">Search projects</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a brand or service" className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted" />
      </label>
    </div>
    <p aria-live="polite" className="mb-6 font-mono text-[10px] uppercase tracking-[1.3px] text-muted">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
    {filtered.length ? <div className="grid gap-x-7 gap-y-11 min-[751px]:grid-cols-2">{filtered.map(project => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</div> : <div className="border border-line p-12 text-center"><p className="font-heading text-3xl">No matching projects.</p><p className="mt-3 text-sm text-muted">Try another brand name or clear your search.</p><Button onClick={() => setQuery("")} className="mt-6 rounded-full bg-brand px-5 py-3 text-xs text-black">Show all work</Button></div>}
  </section>;
}
