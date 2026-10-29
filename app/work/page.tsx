import type { Metadata } from "next";
import { WorkArchive } from "@/components/work-archive";
import { Contact } from "@/components/studio-sections";
import { PointerEyes } from "@/components/pointer-eyes";

export const metadata: Metadata = {
  title: "Our Work | Recycle Bin Media",
  description: "Explore creative work for Flavours of India, Hideaway, Kinky’s, The Paw Story, Turtle, and Utsav Hotel & Banquet.",
};

export default function WorkPage() {
  return <main id="top" className="bg-background text-foreground">
    <section className="px-[5%] py-12 text-center sm:py-16 md:py-24">
      <p className="mx-auto max-w-full text-[9px] leading-relaxed tracking-[.16em] text-brand sm:text-[10px] sm:tracking-[.25em]">REAL BRANDS. IDEAS BROUGHT TO LIFE.</p>
      <h1 className="mx-auto mt-5 text-[10vw] leading-[1.08] font-bold tracking-[-.06em] sm:text-[min(8vw,118px)] sm:leading-none">
        <span className="sr-only">Look once. wonder twice.</span>
        <span aria-hidden="true">
          <span className="block whitespace-nowrap"><span className="inline-flex items-baseline">L<PointerEyes />k</span> once<span className="text-brand">.</span></span>
          <span className="block whitespace-nowrap">wonder twice<span className="text-brand">.</span></span>
        </span>
      </h1>
    </section>
    <WorkArchive />
    <Contact />
  </main>;
}
