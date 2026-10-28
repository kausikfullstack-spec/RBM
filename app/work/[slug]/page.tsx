import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiAperture, FiLayers, FiTarget } from "react-icons/fi";
import { projects, projectImage } from "@/lib/projects";
import { projectStories } from "@/lib/project-stories";
import { ProjectGallery } from "@/components/project-gallery";
import { Contact } from "@/components/studio-sections";
import { SectionLabel } from "@/components/ui";

const craftIcons = [FiTarget, FiAperture, FiLayers];

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project ? `${project.name} | Our Work | Recycle Bin Media` : "Project not found", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const nextProject = projects[(index + 1) % projects.length];
  const story = projectStories[project.slug];

  return <main id="top" className="bg-background text-foreground">
    <section className="px-[5%] pt-10 pb-12 md:px-[4.5%] md:pt-14 md:pb-16">
      <Link href="/work" className="mb-10 inline-flex items-center gap-3 text-xs text-muted transition-colors hover:text-brand"><FiArrowLeft aria-hidden="true" /> Back to the work</Link>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"><SectionLabel>{project.category.toUpperCase()}</SectionLabel><span className="text-[10px] tracking-[.15em] text-muted">RECYCLE BIN MEDIA / BRAND JOURNAL</span></div>
      <h1 className="mt-7 max-w-[1200px] text-[clamp(52px,8vw,120px)] leading-[.98] font-bold tracking-[-.065em]">{project.name}<span className="text-brand">.</span></h1>
      <div className="mt-8 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-[620px] text-[clamp(24px,3vw,40px)] leading-[1.2] tracking-[-.035em] text-foreground/80">{story.headline}</p><div className="flex max-w-sm flex-wrap gap-2">{project.services.map(service => <span key={service} className="rounded-full border border-brand/30 px-3 py-2 text-[10px] text-brand">{service}</span>)}</div></div>
    </section>
    <figure className="mx-[5%] overflow-hidden rounded-2xl border border-line md:mx-[4.5%] md:rounded-3xl" style={{ background: story.accent }}><Image src={projectImage(project, 1)} alt={`${project.name}: opening brand artwork`} width={2000} height={1414} priority sizes="90vw" className="h-auto w-full" /></figure>
    <section className="grid gap-9 px-[5%] py-16 md:grid-cols-[.7fr_1.3fr] md:gap-20 md:px-[8%] md:py-24"><div><SectionLabel>THE BRAND, UP CLOSE</SectionLabel><h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight md:text-5xl">A story worth<br />a closer look.</h2></div><div><p className="max-w-2xl text-lg leading-[1.85] text-foreground/85 md:text-2xl">{story.intro}</p><dl className="mt-9 grid grid-cols-2 gap-8 border-t border-line pt-7"><div><dt className="text-[10px] tracking-widest text-muted">BRAND</dt><dd className="mt-3 text-sm">{project.name}</dd></div><div><dt className="text-[10px] tracking-widest text-muted">FOCUS</dt><dd className="mt-3 text-sm">{project.services.join(" / ")}</dd></div></dl></div></section>
    <section className="case-direction mx-[5%] overflow-hidden rounded-3xl bg-[var(--case-accent)] text-black md:mx-[4.5%]" style={{ "--case-accent": story.accent } as CSSProperties}>
      <div className="grid md:grid-cols-2"><div className="flex flex-col justify-center p-7 md:p-12 lg:p-16"><SectionLabel dark>WHERE THE CREATIVE BEGINS</SectionLabel><h2 className="mt-6 text-[clamp(32px,4vw,58px)] leading-[1.08] font-semibold tracking-[-.045em]">{story.directionTitle}</h2><p className="mt-7 text-sm leading-7 text-black/75 md:text-base">{story.direction}</p></div><div className="flex items-center p-4 md:p-6"><Image src={projectImage(project, 2)} alt={`${project.name}: visual direction and creative layout`} width={1200} height={849} sizes="(max-width: 767px) 90vw, 45vw" className="h-auto w-full rounded-xl shadow-[0_18px_45px_#0002]" /></div></div>
    </section>
    <section className="px-[5%] py-16 md:px-[4.5%] md:py-24"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>THE DETAILS THAT HOLD IT TOGETHER</SectionLabel><h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">Built with intention<span className="text-brand">.</span></h2></div></div><div className="grid gap-8 md:grid-cols-3 md:gap-12">{story.craft.map((item, itemIndex) => { const Icon = craftIcons[itemIndex]; return <article key={item.title} className="border-t border-brand/40 pt-6"><Icon aria-hidden="true" className="size-8 text-brand" /><h3 className="mt-6 text-xl font-medium tracking-tight">{item.title}</h3><p className="mt-4 max-w-md text-sm leading-7 text-muted">{item.text}</p></article>; })}</div></section>
    <div className="border-y border-line px-[7%] py-14 text-center md:py-20"><p className="mx-auto max-w-[1000px] text-[clamp(30px,4.5vw,68px)] leading-[1.12] font-semibold tracking-[-.04em] text-brand">{story.statement}</p></div>
    <ProjectGallery project={project} startAt={3} />
    <section className="px-[5%] pb-16 md:px-[4.5%] md:pb-24"><Link href={`/work/${nextProject.slug}`} className="group grid overflow-hidden rounded-3xl border border-line transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand md:grid-cols-2"><div className="flex flex-col justify-center p-8 md:p-14"><span className="text-[10px] tracking-[.2em] text-muted">ANOTHER BRAND. A FRESH PERSPECTIVE.</span><h2 className="mt-6 text-[clamp(34px,4vw,58px)] leading-tight font-semibold tracking-tight group-hover:text-brand">{nextProject.name}</h2><span className="mt-8 inline-flex items-center gap-6 text-sm text-brand">Explore the story <FiArrowUpRight aria-hidden="true" size={24} /></span></div><Image src={projectImage(nextProject, 1)} alt={`${nextProject.name} project preview`} width={1000} height={707} sizes="(max-width: 767px) 90vw, 45vw" className="h-full w-full object-contain" /></Link></section>
    <Contact />
  </main>;
}
