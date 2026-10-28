import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { sectionStyles } from "./ui";
import { brandFilmVideo } from "@/lib/content";
import { ServiceCardVideo } from "./service-card-video";

const services = [
  { title: "Video Editing", id: "video-editing", image: "/services/video-editing.jpg", description: "Give every frame a reason to be there.", points: ["Reels & short-form content", "Brand films & ad edits", "Colour grading & sound design", "Motion graphics & animation"] },
  { title: "Graphic Design", id: "graphic-design", image: "/services/graphic-design.jpg", description: "A visual language your audience remembers.", points: ["Social media creatives", "Campaign & ad graphics", "Packaging & print design", "Digital illustrations"] },
  { title: "Performance Marketing", id: "performance-marketing", image: "/services/performance-marketing.jpg", description: "Put your creative in front of the right people.", points: ["Meta & Google Ads", "Audience research & targeting", "Creative testing", "Campaign optimisation"] },
  { title: "Influencer Marketing", id: "influencer-marketing", image: "/services/influencer-marketing.jpg", description: "Build connections through voices people trust.", points: ["Creator discovery", "Campaign planning", "Content collaborations", "Campaign tracking & reporting"] },
];

export function ServicesStack() {
  return <section id="services" aria-labelledby="services-heading" className={`${sectionStyles} services-stack border-t border-line`}>
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6 md:mb-12"><div>
      {/* <SectionLabel>CREATIVE WORK. CONNECTED THINKING.</SectionLabel> */}
      <h2 id="services-heading" className="mt-5 text-[clamp(40px,5vw,76px)] leading-[1.08] font-bold tracking-[-.05em]">What We Do<span className="text-brand">.</span></h2></div><Link href="/expertise" className="inline-flex items-center gap-6 border-b border-brand pb-3 text-sm transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Explore all expertise <FiArrowUpRight aria-hidden="true" /></Link></div>
    <div className="services-stack-deck">{services.map((service, index) => <article key={service.id} className="services-stack-card" style={{ "--service-index": index } as CSSProperties}>
      <Link href={`/expertise#${service.id}`} className="group relative flex size-full overflow-hidden rounded-[inherit] bg-background focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand">
        {service.id === "video-editing" ? <ServiceCardVideo src={brandFilmVideo} poster={service.image} /> : <Image src={service.image} alt="" fill sizes="90vw" className="object-cover object-right transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />}
        <div aria-hidden="true" className="services-stack-shade absolute inset-0" />
        <div className="relative z-10 flex w-full flex-col justify-center p-7 md:p-10 lg:p-14">
          <h3 className="max-w-[650px] text-[clamp(28px,3.5vw,52px)] leading-[1.08] font-semibold tracking-[-.04em]">{service.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground/70">{service.description}</p>
          <ul className="mt-6 grid gap-3">{service.points.map(point => <li key={point} className="flex items-center gap-3 text-sm md:text-base"><FiCheck aria-hidden="true" className="size-5 shrink-0 rounded-full border border-brand/40 p-0.5 text-brand" />{point}</li>)}</ul>
        </div>
        <span aria-hidden="true" className="absolute right-6 bottom-6 z-10 grid size-12 place-items-center rounded-full border border-brand/50 bg-black/70 text-brand transition-colors group-hover:bg-brand group-hover:text-black group-focus-visible:bg-brand group-focus-visible:text-black md:right-10 md:bottom-10 md:size-14"><FiArrowUpRight className="size-6" /></span>
      </Link>
    </article>)}</div>
  </section>;
}
