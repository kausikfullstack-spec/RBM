import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  tags?: string[];
  monochrome?: boolean;
  surface?: string;
  className?: string;
}

/** The notch uses the surrounding surface colour to curve around the arrow. */
export function NotchedProjectCard({ href, title, description, image, imageAlt = "", badge, tags = [], monochrome = false, surface = "var(--color-background)", className = "" }: NotchedProjectCardProps) {
  return <Link href={href} aria-label={`Discuss ${title}`} className={`group flex min-w-0 flex-col rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand ${className}`}>
    <div className="relative isolate">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-line">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 767px) 90vw, 45vw" className={`object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100 ${monochrome ? "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0" : ""}`} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
        {badge && <div className="absolute inset-x-0 top-0 flex justify-center pt-5"><span className="rounded-full border border-brand/45 bg-black/75 px-4 py-2 font-mono text-[10px] tracking-wider text-brand backdrop-blur-md">{badge}</span></div>}
      </div>
      <div aria-hidden="true" className="absolute right-0 bottom-0 size-20 rounded-tl-[48px]" style={{ background: surface }} />
      {[{ bottom: 80, right: 0 }, { bottom: 0, right: 80 }].map((position, index) => <div key={index} aria-hidden="true" className="absolute size-7" style={{ ...position, background: `radial-gradient(circle at top left, transparent 27.5px, ${surface} 28px)` }} />)}
      <span aria-hidden="true" className="absolute right-0 bottom-0 grid size-16 place-items-center rounded-full border border-brand/50 bg-brand/[.08] text-brand transition-[background-color,color,transform] duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-black group-focus-visible:bg-brand group-focus-visible:text-black motion-reduce:transition-none motion-reduce:group-hover:scale-100"><FiArrowUpRight className="size-6" /></span>
    </div>
    <h3 className="mt-6 text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand group-focus-visible:text-brand md:text-3xl">{title}</h3>
    {description && <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{description}</p>}
    {tags.length > 0 && <ul className="mt-5 flex flex-wrap gap-2">{tags.map(tag => <li key={tag} className="rounded-md border border-brand/15 bg-brand/[.07] px-3 py-2 text-[10px] font-medium tracking-wide text-brand">{tag}</li>)}</ul>}
  </Link>;
}

export default NotchedProjectCard;
