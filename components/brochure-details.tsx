import Link from "next/link";
import { Arrow, SectionLabel, sectionStyles } from "./ui";

const capabilities = [
  { title: "Photography & videography", text: "From concept and scripting to production and publishing. Product shoots, portraits, fashion, food, architecture, events, corporate films, commercials, testimonials and brand documentaries." },
  { title: "Content creation", text: "Words that give your brand a voice. Website copy, brochures, blogs, articles, case studies, white papers, annual reports, press releases and campaign collateral." },
  { title: "Social media management", text: "Build a consistent presence with content planning, creative posts and community engagement across Facebook, Instagram, LinkedIn, YouTube, Pinterest and X." },
  { title: "Web development & UI/UX", text: "Website design, development and app design shaped around your business, with accessible experiences that make it easier for customers to connect." },
  { title: "Public relations", text: "Corporate communication, media and community relations, press releases, events, crisis communication and brand campaigns that bring your story to the right people." },
  { title: "Artist management", text: "Talent partnerships across entertainment and music. Our portfolio includes work with Tollywood artists and musicians such as EPR Iyer and Cizzy, alongside brand collaborations and jingles." },
];

export function BrochureCapabilities() {
  return <section aria-labelledby="more-capabilities" className={`${sectionStyles} border-t border-line`}>
    <SectionLabel>ONE TEAM. A WIDER CREATIVE WORLD.</SectionLabel>
    <h2 id="more-capabilities" className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">More ways to move <span className="text-brand">your brand.</span></h2>
    <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">Beyond individual campaigns, we bring content, design, web, video and digital together. From a new brand launch to an ongoing creative partnership, we build around what your business needs.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(({ title, text }) => <article key={title} className="rounded-2xl border border-line p-6 md:p-8"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">{text}</p><Link href={`/contact?service=${encodeURIComponent(title)}`} className="mt-6 inline-flex items-center gap-4 text-sm text-brand hover:underline">Talk to us <Arrow /></Link></article>)}</div>
  </section>;
}

const partnerships = [
  { brand: "A N John Salons & Academy", sector: "FASHION & LIFESTYLE", text: "Social media management, graphics and content creation brought together in a complete media partnership." },
  { brand: "Infinity Jewels", sector: "JEWELLERY", text: "PR, shoots and motion graphics supporting the brand's presence and ongoing audience engagement." },
  { brand: "WOW! Momo Foods", sector: "FOOD & BEVERAGE", text: "Media and influencer campaigns across WOW! Momo Instant, WOW! Kulfi, WOW! China and Coco Charge." },
  { brand: "Ambuja Neotia", sector: "HOSPITALITY & RETAIL", text: "Campaigns for restaurants and lounges including Afraa, Conclave Club, Loafers Cafe, Sonar Tori and The Orient, alongside project work for malls." },
  { brand: "Turtle", sector: "FASHION & E-COMMERCE", text: "Product shoots, graphics, social content and reels supporting the clothing brand's e-commerce presence." },
  { brand: "Times Music Bangla", sector: "FILMS & MUSIC", text: "Influencer campaigns for songs from Sentimentaal and Bohurupi, connecting film music with creator communities." },
];

export function BrochurePartnerships() {
  return <section aria-labelledby="brand-partnerships" className={`${sectionStyles} border-t border-line`}>
    <SectionLabel>BRANDS. STORIES. COLLABORATIONS.</SectionLabel>
    <h2 id="brand-partnerships" className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">A closer look at <span className="text-brand">our partnerships.</span></h2>
    <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">From Kolkata businesses to national campaigns, our work spans food, fashion, lifestyle, entertainment, hospitality and retail.</p>
    <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">{partnerships.map(({ brand, sector, text }) => <article key={brand} className="border-t border-line py-8"><p className="text-[10px] tracking-[.16em] text-brand">{sector}</p><h3 className="mt-4 text-2xl font-semibold">{brand}</h3><p className="mt-4 text-sm leading-7 text-muted">{text}</p></article>)}</div>
    <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">Our influencer work also includes store launches for Louis Philippe, beauty campaigns for NIVEA and L&apos;Oreal, and collaborations for Eveready and Style Baazar. Our PR portfolio includes food and beverage, fashion, lifestyle, films and music, with coverage in publications including t2, Indulge and UpperCrust.</p>
  </section>;
}
