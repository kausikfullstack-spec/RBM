import { headingStyles, sectionStyles, SectionLabel, TextLink } from "./ui";

export function WhyUs() {
  return <section id="why-us" aria-labelledby="why-us-heading" className={`${sectionStyles} border-y border-line`}>
    <SectionLabel>WHAT MAKES US DIFFERENT</SectionLabel>
    <div className="mt-7 grid items-end gap-8 min-[901px]:grid-cols-[1.2fr_1fr] min-[901px]:gap-[8%]">
      <h2 id="why-us-heading" className={headingStyles}>Fresh thinking.<br /><span className="text-brand">Distinctive brands.</span></h2>
      <div>
        <p className="max-w-[430px] text-sm leading-[1.9] text-muted">At Recycle Bin Media, we bring strategy, design and storytelling together to give your brand a voice and a look people remember.</p>
        <TextLink href="/work">Explore Our Work</TextLink>
      </div>
    </div>
  </section>;
}

