import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { Contact } from "@/components/studio-sections";
import { SectionLabel } from "@/components/ui";

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

  return <main id="top" className="bg-background text-foreground">
    <section className="px-[5%] pt-10 pb-12 min-[751px]:px-[4.5%] min-[751px]:pt-14 min-[751px]:pb-16">
      <Link href="/work" className="mb-10 inline-flex items-center gap-3 text-xs text-muted transition-colors hover:text-brand"><FiArrowLeft aria-hidden="true" /> All work</Link>
      <SectionLabel>{project.category.toUpperCase()}</SectionLabel>
      <h1 className="mt-6 max-w-[1100px] font-heading text-[clamp(50px,8vw,124px)] leading-[1.03] tracking-[-.025em] text-brand">{project.name}</h1>
      <div className="mt-8 grid gap-7 min-[901px]:grid-cols-[1.4fr_1fr] min-[901px]:gap-[10%]">
        <p className="max-w-[660px] text-sm leading-[1.9] text-muted min-[751px]:text-base">{project.summary}</p>
        <div><p className="mb-3 text-[9px] tracking-[1.6px] text-muted">THE CREATIVE WORK</p><div className="flex flex-wrap gap-2">{project.services.map(service => <span key={service} className="rounded-full border border-line px-3 py-2 text-[10px]">{service}</span>)}</div></div>
      </div>
    </section>
    <ProjectGallery project={project} />
    <Link href={`/work/${nextProject.slug}`} className="group mx-[5%] mb-20 flex items-center justify-between gap-6 border-y border-line py-8 transition-colors hover:text-brand min-[751px]:mx-[4.5%]">
      <span><span className="mb-3 block text-[9px] tracking-[1.5px] text-muted">NEXT BRAND STORY</span><span className="font-heading text-[clamp(30px,4vw,60px)]">{nextProject.name}</span></span><FiArrowUpRight aria-hidden="true" size={40} />
    </Link>
    <Contact />
  </main>;
}
