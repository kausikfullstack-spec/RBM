"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Button } from "./ui";
import { videoProjects, type VideoProject } from "@/lib/video-projects";
import { VideoProjectCard, VideoProjectDialog } from "./video-project";

const filters = [
  { label: "All", match: /.*/ },
  { label: "Social Content", match: /social content/i },
  { label: "Photography", match: /photography/i },
  { label: "Branding & Design", match: /brand identity|creative direction/i },
  { label: "Campaigns", match: /campaigns|creatives/i },
  { label: "Video Studio", match: /video studio/i },
];

export function WorkArchive() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const selectedFilter = filters.find(filter => filter.label === category) ?? filters[0];
  const filtered = projects.filter(project => selectedFilter.match.test(project.services.join(" ")) && `${project.name} ${project.category} ${project.services.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const filteredVideos = (category === "All" || category === "Video Studio") ? videoProjects.filter(video => `${video.title} ${video.description} ${video.label} Video Studio`.toLowerCase().includes(query.trim().toLowerCase())) : [];
  const resultCount = filtered.length + filteredVideos.length;

  return <section aria-label="Browse our projects" className="px-[5%] pb-20 min-[751px]:px-[4.5%] min-[751px]:pb-28">
    <div className="mb-9 flex flex-col gap-5 border-y border-line py-6 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between">
    <div role="group" aria-label="Filter projects by service" className="flex min-w-0 flex-wrap items-center gap-1 rounded-[28px] border border-line bg-[#141414] p-1.5 min-[1400px]:flex-nowrap min-[1200px]:rounded-full">
      {filters.map(filter => <button key={filter.label} type="button" aria-pressed={category === filter.label} aria-controls="work-results" onClick={() => setCategory(filter.label)} className={`min-h-11 cursor-pointer rounded-full px-3 py-3 text-[10px] font-semibold tracking-[.06em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand min-[1200px]:whitespace-nowrap ${category === filter.label ? "bg-brand text-black" : "text-foreground hover:bg-brand/10 hover:text-brand"}`}>{filter.label}</button>)}
    </div>
      <label className="flex w-full shrink-0 items-center gap-3 rounded-full border border-line px-4 py-3 focus-within:border-brand min-[1200px]:w-[300px]">
        <FiSearch aria-hidden="true" className="shrink-0 text-brand" /><span className="sr-only">Search projects</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a brand or service" className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted" />
      </label>
    </div>
    <p aria-live="polite" className="mb-6 font-mono text-[10px] uppercase tracking-[1.3px] text-muted">{resultCount} {resultCount === 1 ? "project" : "projects"}</p>
    <div id="work-results">{resultCount ? <div className="grid gap-x-7 gap-y-11 min-[751px]:grid-cols-2">{filtered.map(project => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}{filteredVideos.map(video => <VideoProjectCard key={video.id} project={video} onPlay={() => setActiveVideo(video)} />)}</div> : <div className="border border-line p-12 text-center"><p className="font-heading text-3xl">No matching projects.</p><p className="mt-3 text-sm text-muted">Try another brand name, change the filter, or show all work.</p><Button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-6 rounded-full bg-brand px-5 py-3 text-xs text-black">Show all work</Button></div>}</div>
    {activeVideo && <VideoProjectDialog key={activeVideo.id} project={activeVideo} onClose={() => setActiveVideo(null)} />}
  </section>;
}
