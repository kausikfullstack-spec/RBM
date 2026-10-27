import type { Metadata } from "next";
import { WorkArchive } from "@/components/work-archive";
import { Contact } from "@/components/studio-sections";
import { SectionLabel } from "@/components/ui";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work | Recycle Bin Media",
  description: "Explore creative work for Flavours of India, Hideaway, Kinky’s, The Paw Story, Turtle, and Utsav Hotel & Banquet.",
};

export default function WorkPage() {
  return <main id="top" className="bg-background text-foreground">
    <section className="px-[5%] pt-14 pb-12 min-[751px]:px-[4.5%] min-[751px]:pt-20 min-[751px]:pb-16">
      <SectionLabel>THE WORK / {String(projects.length).padStart(2, "0")} BRAND STORIES</SectionLabel>
      <div className="mt-7 flex flex-col justify-between gap-8 min-[901px]:flex-row min-[901px]:items-end">
        <h1 className="font-heading text-[clamp(76px,13vw,200px)] leading-[.95] tracking-[-.025em]">OUR <span className="text-brand">WORK.</span></h1>
        <p className="max-w-[330px] text-sm leading-[1.9] text-muted">Different brands. Different stories.<br />Creative work with a point of view, from the first idea to the final detail.</p>
      </div>
    </section>
    <WorkArchive />
    <Contact />
  </main>;
}
