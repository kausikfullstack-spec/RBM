import Link from "next/link";
import { projects } from "@/lib/projects";
import CardFanCarousel from "./ui/card-fan-carousel";
import { Arrow, headingStyles, sectionStyles } from "./ui";

export function Portfolio() {
  return <section id="work" aria-labelledby="selected-work-heading" className={sectionStyles}>
    <div className="mb-9 flex flex-col justify-between gap-6 min-[751px]:flex-row min-[751px]:items-end">
      <div><p className="mb-5 text-[9px] tracking-[1.7px] text-muted">SELECTED WORK / {String(projects.length).padStart(2, "0")} BRANDS</p><h2 id="selected-work-heading" className={headingStyles}>Made to <span className="text-brand">make a mark.</span></h2></div>
      <Link href="/work" className="flex w-fit items-center gap-6 rounded-full border border-brand px-5 py-3 text-xs text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">View all work <Arrow className="text-xl" /></Link>
    </div>
    <CardFanCarousel projects={projects} />
    <div className="mt-12 flex justify-center min-[751px]:mt-16">
      <Link href="/work" className="group inline-flex items-center gap-6 rounded-full border border-brand bg-brand px-8 py-4 text-sm text-black transition-colors hover:bg-black hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none">View all work <Arrow className="text-2xl" /></Link>
    </div>
  </section>;
}
