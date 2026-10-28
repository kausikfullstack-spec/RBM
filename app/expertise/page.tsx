import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Contact } from "@/components/studio-sections";
import { Arrow, SectionLabel } from "@/components/ui";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { ExpertiseStrengths, ExpertiseTools } from "@/components/expertise-extras";

export const metadata: Metadata = {
  title: "Expertise | Recycle Bin Media",
  description: "Video editing, graphic design, performance marketing, influencer marketing, branding, lead generation, e-commerce and SEO for your brand.",
};

const services = [
  { title: "Video Editing", image: "/services/video-editing.jpg", description: "From raw footage to the final cut. We build stories with rhythm, colour, sound and motion that make people stop scrolling.", items: ["Reels & short-form content", "Brand films & ad edits", "Colour grading & sound design", "Motion graphics & animation"] },
  { title: "Graphic Design", image: "/services/graphic-design.jpg", description: "Bold ideas, made visual. We give your brand a distinctive look across social feeds, campaigns and every everyday touchpoint.", items: ["Social media creatives", "Campaign & ad graphics", "Packaging & print design", "Digital illustrations"] },
  { title: "Performance Marketing", image: "/services/performance-marketing.jpg", description: "Creative meets a clear plan. Paid campaigns shaped around your audience, tested with real data and refined around your business goals.", items: ["Meta & Google Ads", "Creative testing", "Campaign optimisation"] },
  { title: "Influencer Marketing", image: "/services/influencer-marketing.jpg", description: "Put your story in the right hands. Creator partnerships that feel natural to their audience and true to your brand.", items: ["Creator discovery", "Campaign planning", "Content collaborations"] },
  { title: "Branding & Designing", image: "/services/branding.jpg", description: "Build a brand people recognise and remember. We connect your positioning, voice and visual identity into one clear story.", items: ["Brand strategy", "Logo & visual identity", "Brand guidelines"] },
  { title: "Lead Generation", image: "/services/lead-generation.jpg", description: "Start more meaningful conversations. Audience research, focused landing pages and campaigns designed to bring the right enquiries to your business.", items: ["Audience targeting", "Landing page strategy", "Lead capture & funnels"] },
  { title: "E-commerce Solutions", image: "/services/ecommerce.jpg", description: "Turn browsing into a better buying experience. Storefront design, product content and campaigns that support your online business.", items: ["Storefront design", "Product creatives", "Shopping campaigns"] },
  { title: "SEO Services", image: "/services/seo.jpg", description: "Help the right people find you. Search-friendly content and a stronger technical foundation for long-term organic visibility.", items: ["SEO audits", "On-page & technical SEO", "Content & keyword strategy"] },
];

export default function ExpertisePage() {
  return <SiteShell><main id="top">
    <section className="px-[5%] pt-16 pb-16 text-center md:pt-24 md:pb-24">
      <p className="text-[10px] tracking-[.25em] text-brand">CREATIVE THINKING. BUSINESS IMPACT.</p>
      <h1 className="mt-5 text-[clamp(58px,8vw,118px)] leading-none font-bold tracking-[-.06em]">Expertise<span className="text-brand">.</span></h1>
      <p className="mt-6 text-sm text-muted md:text-lg">Fresh perspectives. Perfect solutions for your business.</p>
    </section>
    <section className="mx-auto grid max-w-[1440px] gap-12 px-[5%] py-10 md:grid-cols-[.9fr_1.1fr] md:gap-14 md:py-16">
      <div>
        {/* <SectionLabel>WHAT WE BRING TO THE TABLE</SectionLabel> */}
        <h2 className="mt-7 max-w-[500px] text-[clamp(36px,4vw,60px)] leading-[1.08] font-semibold tracking-[-.045em]">We create brands<br />for <span className="text-brand">tomorrow.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-muted">We get to know your business before we decide what to create. That understanding shapes every edit, design, and campaign, so your brand tells a consistent story and gives people a clear reason to choose you.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-8 border-b border-brand pb-3 text-sm transition-colors hover:text-brand">Let&apos;s build something together <Arrow /></Link></div>
      <ExpertiseStrengths />
    </section>
    <ExpertiseTools />
    <section className="px-[5%] py-16 md:px-[4.5%] md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><SectionLabel>OUR EXPERTISE</SectionLabel><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Made to stand out.</h2></div><Link href="/work" className="text-sm text-brand hover:underline">Explore our work <Arrow /></Link></div>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16">{services.map(({ title, image, description, items }) => <NotchedProjectCard key={title} href={`/contact?service=${encodeURIComponent(title)}`} title={title} description={description} image={image} tags={items} monochrome />)}</div>
    </section>
    <Contact />
  </main></SiteShell>;
}
