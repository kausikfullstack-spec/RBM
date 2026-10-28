import type { Metadata } from "next";
import { WorkArchive } from "@/components/work-archive";
import { Contact } from "@/components/studio-sections";

export const metadata: Metadata = {
  title: "Our Work | Recycle Bin Media",
  description: "Explore creative work for Flavours of India, Hideaway, Kinky’s, The Paw Story, Turtle, and Utsav Hotel & Banquet.",
};

export default function WorkPage() {
  return <main id="top" className="bg-background text-foreground">
    <section className="px-[5%] pt-16 pb-16 text-center md:pt-24 md:pb-24">
      <p className="text-[10px] tracking-[.25em] text-brand">REAL BRANDS. IDEAS BROUGHT TO LIFE.</p>
      <h1 className="mt-5 text-[clamp(58px,8vw,118px)] leading-none font-bold tracking-[-.06em]">Our Work<span className="text-brand">.</span></h1>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted md:text-lg">Different brands. Different stories.<br />Creative work with a point of view, from the first idea to the final detail.</p>
    </section>
    <WorkArchive />
    <Contact />
  </main>;
}
