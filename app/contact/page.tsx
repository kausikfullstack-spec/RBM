import type { Metadata } from "next";
import { Allura } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import founderPortrait from "@/public/jo.jpg";
import { SiteShell } from "@/components/site-shell";
import { CalendlyBooking } from "@/components/calendly-booking";
import { contactEmail } from "@/lib/content";
import { Arrow, SectionLabel } from "@/components/ui";

const signature = Allura({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Contact | Recycle Bin Media",
  description: "Tell Recycle Bin Media about your next project. Email us, chat on WhatsApp or book a 30-minute creative call.",
};

type ContactPageProps = { searchParams: Promise<{ service?: string | string[] }> };

export default function ContactPage(props: ContactPageProps) {
  return <SiteShell><Suspense fallback={<main className="px-[5%] py-24"><h1 className="text-6xl font-bold">Contact<span className="text-brand">.</span></h1><p role="status" className="mt-6 text-muted">Loading contact details...</p></main>}><ContactContent {...props} /></Suspense></SiteShell>;
}

async function ContactContent({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const service = typeof params.service === "string" ? params.service.slice(0, 100) : "";
  const subject = service ? `Let's talk: ${service}` : "Let's talk about a project";
  return <main id="top">
   
    <section className="px-[5%] pt-16 pb-16 text-center md:pt-24 md:pb-24"><p className="text-[10px] tracking-[.25em] text-brand">GOOD WORK STARTS WITH A CONVERSATION.</p><h1 className="mt-5 text-[clamp(58px,8vw,118px)] leading-none font-bold tracking-[-.06em]">Contact<span className="text-brand">.</span></h1><p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-muted md:text-lg">A new idea. A fresh brief. Your next big move.<br />We&apos;d love to hear about it.</p></section>


     <section aria-labelledby="founder-message" className="mx-auto grid max-w-[1280px] gap-10 px-[5%] pt-14 pb-16 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-16 md:pt-20 md:pb-20">
      <figure className="mx-auto w-full max-w-[420px] md:mx-0">
        <div className="rounded-[28px] border-[8px] border-brand/80 bg-brand/[.03] p-3 md:p-4">
          <Image src={founderPortrait} alt="Souvanik Kundu, Founder of Recycle Bin Media" priority sizes="(max-width: 767px) 90vw, 420px" className="h-auto w-full rounded-[26px]" />
        </div>
        <figcaption className="mt-5 border-l-2 border-brand pl-4"><span className="block text-lg font-semibold">Souvanik Kundu</span><span className="mt-1 block text-xs text-muted">Founder, Recycle Bin Media</span></figcaption>
      </figure>
      <div>
        <SectionLabel>A NOTE FROM OUR FOUNDER</SectionLabel>
        <h2 id="founder-message" className="mt-6 text-[clamp(34px,3.6vw,52px)] leading-[1.1] font-semibold tracking-[-.045em]">What do you find in a bin? <span className="text-brand">We found a beginning</span></h2>

        <div className="mt-7 space-y-5 text-sm leading-[1.9] text-muted md:text-[15px]">
          <p>What do you see in a recycle bin—an ending or another possibility? At Recycle Bin Media, that question shapes how we think. A fresh perspective can turn an overlooked idea into something people remember.</p>
          <p>I founded this agency to bring together people who care about the thinking behind the work as much as the finished result. We listen, ask questions, and get to know what makes each brand its own before deciding how to tell its story.</p>
          <p>Our name is a reminder to look twice. Sometimes, the strongest idea comes from revisiting something familiar, challenging an assumption, or following a thought that others set aside.</p>
          <p>To our clients, collaborators, and team: thank you for trusting us with your ideas and ambitions. You give us a reason to keep looking closer, thinking further, and creating work we’re proud to put our names to.</p>
        </div>
        <p className="mt-7 text-sm leading-6"><span className={`${signature.className} block text-[38px] leading-[1.3] font-normal text-brand md:text-[44px]`}>Souvanik Kundu</span><span className="mt-1 block text-muted">Founder, Recycle Bin Media</span></p>
      </div>
    </section>
    
    <section className="mx-auto grid max-w-[1280px] gap-12 px-[5%] pb-20 md:grid-cols-2 md:gap-20 md:pb-28">
      <div>
        {/* <SectionLabel>LET&apos;S MAKE SOMETHING WORTH SEEING</SectionLabel> */}
        <h2 className="mt-7 text-[clamp(36px,4vw,60px)] leading-[1.08] font-semibold tracking-[-.045em]">Your next chapter<br />starts <span className="text-brand">here.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-muted">Tell us about your brand, what you want to create and when you need it. From an edit to a complete campaign, we&apos;ll help shape the next step.</p>{service && <p className="mt-6 border-l-2 border-brand pl-4 text-sm">Let&apos;s talk about <span className="text-brand">{service}</span>.</p>}<Link href="/expertise" className="mt-8 inline-flex items-center gap-6 border-b border-line pb-3 text-sm hover:text-brand">Explore our expertise <Arrow /></Link></div>
      <div className="divide-y divide-line border-y border-line"><a href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`} className="group block py-8">
        {/* <span className="text-[10px] tracking-[.2em] text-muted">01 / WRITE TO US</span> */}
        <span className="mt-4 flex items-center justify-between gap-3 text-[clamp(16px,2vw,26px)] tracking-tight break-all group-hover:text-brand">{contactEmail}<Arrow className="shrink-0 text-brand" /></span>
        {/* <span className="mt-3 block text-xs text-muted">Send your brief, references or a spark of an idea.</span> */}
        </a>
      <a href={`https://wa.me/917980909989?text=${encodeURIComponent(`Hi Recycle Bin Media! I'd like to discuss ${service || 'a project'}.`)}`} target="_blank" rel="noopener noreferrer" className="group block py-8">
      {/* <span className="text-[10px] tracking-[.2em] text-muted">02 / START A CHAT</span> */}
      <span className="mt-4 flex items-center justify-between text-2xl group-hover:text-brand">Say hello on WhatsApp <Arrow className="text-brand" /></span><span className="mt-3 block text-xs text-muted">+91 79809 09989</span></a></div>
    </section>
    <section className="flex flex-col justify-between gap-10 bg-brand px-[5%] py-16 text-black md:flex-row md:items-center md:px-[4.5%] md:py-24"><div><SectionLabel dark>PREFER A CONVERSATION?</SectionLabel><h2 className="mt-6 font-heading text-[clamp(48px,7vw,100px)] leading-none">Let&apos;s talk it through.</h2><p className="mt-6 max-w-lg text-sm leading-7">Book a 30-minute call. Bring your ideas, questions and ambitions. We&apos;ll bring a fresh perspective.</p></div><CalendlyBooking /></section>
  </main>;
}
