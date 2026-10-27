"use client";

import { useState } from "react";
import { FiAperture, FiArrowUpRight, FiEye, FiLayers, FiMessageCircle } from "react-icons/fi";

const differences = [
  { title: "Your brand, understood.", description: "Creative shaped around your identity, audience and goals.", icon: FiEye },
  { title: "Ideas with purpose.", description: "Every visual and word has a role to play.", icon: FiMessageCircle },
  { title: "Culture meets creativity.", description: "Stories that connect through local insights and shared moments.", icon: FiLayers },
  { title: "From idea to execution.", description: "Campaign concepts, content, shoots and digital experiences brought together.", icon: FiAperture },
];

export function BrandDifferences() {
  const [active, setActive] = useState(0);
  return <div className="brand-panels" aria-label="What makes Recycle Bin Media different">
    {differences.map(({ title, description, icon: Icon }, index) => <article key={title} className="brand-panel" data-active={active === index} onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}>
      <h3>
        <button type="button" className="brand-panel-trigger" aria-expanded={active === index} aria-controls={`brand-detail-${index}`} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
          <span className="brand-panel-top"><span className="font-mono text-xs">0{index + 1}</span><Icon className="brand-panel-icon" size={30} aria-hidden="true" /></span>
          <span className="brand-panel-title font-heading">{title}</span>
          <FiArrowUpRight className="brand-panel-arrow" size={24} aria-hidden="true" />
        </button>
      </h3>
      <div id={`brand-detail-${index}`} className="brand-panel-detail" inert={active !== index} aria-hidden={active !== index}>
        <p>{description}</p>
      </div>
    </article>)}
  </div>;
}
