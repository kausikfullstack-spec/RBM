import { FiAperture, FiEye, FiLayers, FiMessageCircle } from "react-icons/fi";
import { headingStyles, sectionStyles, SectionLabel, TextLink } from "./ui";

const differences = [
  {
    title: "Your brand, understood.",
    description: "Creative shaped around your identity, audience and goals.",
    icon: FiEye,
  },
  {
    title: "Ideas with purpose.",
    description: "Every visual and word has a role to play.",
    icon: FiMessageCircle,
  },
  {
    title: "Culture meets creativity.",
    description: "Stories that connect through local insights and shared moments.",
    icon: FiLayers,
  },
  {
    title: "From idea to execution.",
    description: "Campaign concepts, content, shoots and digital experiences brought together.",
    icon: FiAperture,
  },
];

export function WhyUs() {
  return <section id="why-us" aria-labelledby="why-us-heading" className={`${sectionStyles} border-y border-line`}>
    <div className="grid gap-10 min-[901px]:grid-cols-[1fr_1.35fr] min-[901px]:gap-[8%]">
      <div>
        <SectionLabel>WHAT MAKES US DIFFERENT</SectionLabel>
        <h2 id="why-us-heading" className={`${headingStyles} mt-7`}>Fresh thinking.<br /><span className="text-brand">Distinctive brands.</span></h2>
        <p className="mt-6 max-w-[430px] text-sm leading-[1.9] text-muted">At Recycle Bin Media, we bring strategy, design and storytelling together to give your brand a voice and a look people remember.</p>
        <TextLink href="#work">Explore Our Work</TextLink>
      </div>
      <div className="grid gap-x-8 min-[601px]:grid-cols-2">
        {differences.map(({ title, description, icon: Icon }, index) => <article key={title} className="border-t border-line py-7 min-[901px]:pb-9">
          <div className="mb-6 flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-full border border-brand/20 bg-brand/5 text-brand"><Icon size={22} aria-hidden="true" /></span>
            <span aria-hidden="true" className="font-mono text-[10px] text-muted">0{index + 1}</span>
          </div>
          <h3 className="font-heading text-[23px] leading-[1.2] font-normal">{title}</h3>
          <p className="mt-4 text-[13px] leading-[1.9] text-muted">{description}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
