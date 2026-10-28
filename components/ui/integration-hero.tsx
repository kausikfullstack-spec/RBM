import Image from "next/image";
import { brands, type Brand } from "@/lib/brands";
import { ActionLink, Arrow, headingStyles } from "../ui";

function BrandRow({ items, reverse = false }: { items: Brand[]; reverse?: boolean }) {
  return <div className="brand-marquee-row">
    <div className="brand-marquee-track" data-reverse={reverse}>
      {[0, 1].map(copy => <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="brand-marquee-group">
        {items.map(brand => <li key={brand.name} className="brand-wordmark-card">
          <span className="brand-logo-badge" data-dark={brand.darkBadge} data-has-logo={Boolean(brand.logo)}>
            {brand.logo ? <Image src={brand.logo} alt={`${brand.name} logo`} width={100} height={80} className="brand-logo-image" unoptimized /> : <span className="brand-wordmark-name font-heading">{brand.name}</span>}
          </span>
          <span className="brand-caption">{brand.name}</span>
        </li>)}
      </ul>)}
    </div>
  </div>;
}

export default function IntegrationHero() {
  const rowSize = Math.ceil(brands.length / 3);
  const rows = Array.from({ length: 3 }, (_, index) => brands.slice(index * rowSize, (index + 1) * rowSize));

  return <section id="brands" aria-labelledby="brands-heading" className="relative overflow-hidden border-y border-line bg-background py-[65px] min-[751px]:py-[85px] min-[1101px]:py-[115px]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(#fac90326_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="relative mx-auto max-w-[850px] px-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-2 text-[10px] tracking-[1.5px] text-brand"><span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />OUR BRANDS</span>
      <h2 id="brands-heading" className={`${headingStyles} mt-6`}>Different brands.<br /><span className="text-brand">Shared creative energy.</span></h2>
      <p className="mx-auto mt-6 max-w-[460px] text-sm leading-[1.9] text-muted">The brands we work with. The stories we bring to life.</p>
      <ActionLink href="/work" className="mt-8 inline-flex items-center gap-5 rounded-lg border border-brand bg-brand px-6 py-3 text-xs text-black hover:bg-black hover:text-brand focus-visible:bg-black focus-visible:text-brand">Explore Our Work <Arrow className="text-lg" /></ActionLink>
    </div>
    <div className="brand-carousel relative mx-auto mt-12 max-w-[1280px] min-[751px]:mt-16" role="region" aria-label="Brands we work with">
      {rows.map((items, index) => <BrandRow key={index} items={items} reverse={index === 1} />)}
    </div>
  </section>;
}

