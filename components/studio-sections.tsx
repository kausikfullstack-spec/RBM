import { contactEmail } from "@/lib/content";
import { ActionLink, Arrow, headingStyles, sectionStyles } from "./ui";
import { ServicesStack } from "./services-stack";
import { CalendlyBooking } from "./calendly-booking";

export function About() {
  return <section id="about" className={`${sectionStyles} text-center`}>
    <div className="mx-auto max-w-[1000px]"><h2 className={headingStyles}>Good stories don&apos;t<br />belong in the bin.<br /><span className="text-brand">They belong out there.</span></h2>
      <div className="mt-7 flex flex-col items-center gap-[25px] min-[751px]:mt-[38px] min-[751px]:gap-8"><p className="max-w-[520px] text-xs leading-[1.9] text-muted min-[751px]:text-sm">We&apos;re Recycle Bin Media. An independent creative production studio turning unexpected ideas into unforgettable visuals. From that first spark to the final cut, we make content with something to say.</p><ActionLink href="#contact" className="group flex size-[100px] shrink-0 items-center justify-center gap-[5px] rounded-full border border-[#515147] text-[10px] min-[751px]:size-[123px] min-[751px]:gap-[11px] min-[751px]:text-xs">Let&apos;s create<br />something<Arrow className="text-[25px] text-brand group-hover:text-black group-focus-visible:text-black" /></ActionLink></div>
    </div>
  </section>;
}
export function Ticker() {
  return <div aria-hidden="true" className="my-3.5 -rotate-2 overflow-hidden bg-brand py-[15px] text-black min-[751px]:py-[22px]"><div className="flex w-max animate-marquee motion-reduce:animate-none">{[0, 1, 2, 3].map(i => <span key={i} className="font-display whitespace-nowrap text-[23px] font-normal tracking-normal min-[751px]:text-[29px]">FRESH THINKING <b className="mx-[15px] text-[28px] font-normal min-[751px]:mx-[25px] min-[751px]:text-[35px]">&#10035;</b> BOLD STORIES <b className="mx-[15px] text-[28px] font-normal min-[751px]:mx-[25px] min-[751px]:text-[35px]">&#10035;</b> NO BORING FRAMES <b className="mx-[15px] text-[28px] font-normal min-[751px]:mx-[25px] min-[751px]:text-[35px]">&#10035;</b> </span>)}</div></div>;
}
export function Services() {
  return <ServicesStack />;
}
export function Contact() {
  return <section id="contact" className={`${sectionStyles} bg-brand text-black`}>
    {/* <SectionLabel dark>YOUR NEXT BIG IDEA STARTS HERE</SectionLabel> */}
    <div className="my-[35px] flex items-center justify-between gap-5 min-[751px]:my-10"><h2 className="font-heading text-[12vw] leading-[.94] font-normal tracking-normal min-[751px]:text-[clamp(60px,9.4vw,150px)]">Let&apos;s make<br />some noise.</h2><CalendlyBooking /></div><div className="border-t border-black/25 pt-[25px] text-xs leading-[1.8] min-[751px]:flex min-[751px]:items-center min-[751px]:justify-between min-[751px]:text-sm"><p>Got a brief? A wild idea? A &ldquo;hear me out&rdquo;?<br />We&apos;re all ears.</p><ActionLink href={`mailto:${contactEmail}`} className="mt-5 inline-block border-b border-black/40 text-[17px] tracking-[-.5px] min-[751px]:mt-0 min-[751px]:text-[19px]">{contactEmail} <Arrow /></ActionLink></div></section>;
}
export function Footer() {
  return <footer className="flex flex-wrap items-center justify-between gap-5 px-[5%] py-[25px] text-[9px] text-muted min-[751px]:px-[4.5%] min-[751px]:py-[33px] min-[751px]:text-[10px]"><a href="#" className="text-xs font-extrabold tracking-[-.3px] text-foreground min-[751px]:text-sm">RECYCLE BIN MEDIA&#174;</a><span>&#169; 2026 Recycle Bin Media</span><a href="#" className="ml-auto text-[9px] tracking-[1px]">BACK TO TOP &#8593;</a></footer>;
}
