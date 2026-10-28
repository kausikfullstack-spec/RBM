import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Contact } from "@/components/studio-sections";
import { Arrow, SectionLabel } from "@/components/ui";
import { FiFilm, FiPenTool, FiTrendingUp, FiUsers, FiLayers, FiTarget, FiShoppingBag, FiSearch } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Expertise | Recycle Bin Media",
  description: "Video editing, graphic design, performance marketing, influencer marketing, branding, lead generation, e-commerce and SEO for your brand.",
};

const services = [
  { title: "Video Editing", icon: FiFilm, description: "From raw footage to the final cut. We build stories with rhythm, colour, sound and motion that make people stop scrolling.", items: ["Reels & short-form content", "Brand films & ad edits", "Colour grading & sound design", "Motion graphics & animation"] },
  { title: "Graphic Design", icon: FiPenTool, description: "Bold ideas, made visual. We give your brand a distinctive look across social feeds, campaigns and every everyday touchpoint.", items: ["Social media creatives", "Campaign & ad graphics", "Packaging & print design", "Digital illustrations"] },
  { title: "Performance Marketing", icon: FiTrendingUp, description: "Creative meets a clear plan. Paid campaigns shaped around your audience, tested with real data and refined around your business goals.", items: ["Meta & Google Ads", "Creative testing", "Campaign optimisation"] },
  { title: "Influencer Marketing", icon: FiUsers, description: "Put your story in the right hands. Creator partnerships that feel natural to their audience and true to your brand.", items: ["Creator discovery", "Campaign planning", "Content collaborations"] },
  { title: "Branding & Designing", icon: FiLayers, description: "Build a brand people recognise and remember. We connect your positioning, voice and visual identity into one clear story.", items: ["Brand strategy", "Logo & visual identity", "Brand guidelines"] },
  { title: "Lead Generation", icon: FiTarget, description: "Start more meaningful conversations. Audience research, focused landing pages and campaigns designed to bring the right enquiries to your business.", items: ["Audience targeting", "Landing page strategy", "Lead capture & funnels"] },
  { title: "E-commerce Solutions", icon: FiShoppingBag, description: "Turn browsing into a better buying experience. Storefront design, product content and campaigns that support your online business.", items: ["Storefront design", "Product creatives", "Shopping campaigns"] },
  { title: "SEO Services", icon: FiSearch, description: "Help the right people find you. Search-friendly content and a stronger technical foundation for long-term organic visibility.", items: ["SEO audits", "On-page & technical SEO", "Content & keyword strategy"] },
];

export default function ExpertisePage() {
  return <SiteShell><main id="top">
    <section className="px-[5%] pt-16 pb-16 text-center md:pt-24 md:pb-24">
      <p className="text-[10px] tracking-[.25em] text-brand">CREATIVE THINKING. BUSINESS IMPACT.</p>
      <h1 className="mt-5 text-[clamp(58px,8vw,118px)] leading-none font-bold tracking-[-.06em]">Expertise<span className="text-brand">.</span></h1>
      <p className="mt-6 text-sm text-muted md:text-lg">Fresh perspectives. Perfect solutions for your business.</p>
    </section>
    <section className="mx-auto grid max-w-[1280px] gap-12 px-[5%] py-10 md:grid-cols-2 md:gap-20 md:py-16">
      <div><SectionLabel>WHAT WE BRING TO THE TABLE</SectionLabel><h2 className="mt-7 max-w-[500px] text-[clamp(36px,4vw,60px)] leading-[1.08] font-semibold tracking-[-.045em]">We create brands<br />for <span className="text-brand">tomorrow.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-muted">Great visuals start the conversation. Smart marketing keeps it going. We bring both together to help your brand move forward.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-8 border-b border-brand pb-3 text-sm transition-colors hover:text-brand">Let&apos;s build something together <Arrow /></Link></div>
      <div className="flex flex-col justify-center gap-8" aria-label="Our creative approach">
        {[['Video & motion', 'Stories that move people', '100%'], ['Graphics & identity', 'A look that is unmistakably yours', '94%'], ['Marketing & growth', 'Creative with a clear purpose', '87%'], ['Digital experiences', 'Every touchpoint, connected', '80%']].map(([title, detail, width]) => <div key={title}><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-base">{title}</h3><span className="text-[11px] text-muted">{detail}</span></div><div aria-hidden="true" className="mt-3 h-1 bg-line"><div className="h-full bg-brand" style={{ width }} /></div></div>)}
        <p className="text-[10px] tracking-wider text-muted">OUR FOCUS: CREATIVE FIRST, CONNECTED AT EVERY STEP.</p>
      </div>
    </section>
    <section className="px-[5%] py-16 md:px-[4.5%] md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><SectionLabel>OUR EXPERTISE / 08 SERVICES</SectionLabel><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Made to stand out.</h2></div><Link href="/work" className="text-sm text-brand hover:underline">Explore our work <Arrow /></Link></div>
      <div className="grid gap-5 md:grid-cols-2">{services.map(({ title, icon: Icon, description, items }, index) => <article key={title} className={`group border p-7 transition-colors md:p-10 ${index < 2 ? 'border-brand/50 bg-brand/[.06]' : 'border-line hover:border-brand/50'}`}>
        <div className="flex items-center justify-between"><Icon aria-hidden="true" className="size-8 text-brand" /><span className="font-mono text-xs text-muted">0{index + 1}{index < 2 && ' / CREATIVE CORE'}</span></div>
        <h3 className={`mt-9 font-semibold tracking-tight ${index < 2 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{title}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-muted">{description}</p>
        <ul className="mt-7 flex flex-wrap gap-2">{items.map(item => <li key={item} className="rounded-full border border-line px-3 py-2 text-[11px]">{item}</li>)}</ul>
        <Link href={`/contact?service=${encodeURIComponent(title)}`} className="mt-8 inline-flex items-center gap-5 text-xs text-brand hover:underline" aria-label={`Discuss ${title}`}>Let&apos;s talk <Arrow /></Link>
      </article>)}</div>
    </section>
    <Contact />
  </main></SiteShell>;
}
