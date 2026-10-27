"use client";
import { useEffect, useState } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
import { Showreel } from "./showreel";
import { Portfolio } from "./portfolio";
import { About, Contact, Footer, Services, Ticker } from "./studio-sections";
import { MediaDialog, type MediaSelection } from "./media-dialog";
import { PointerGlow } from "./pointer-glow";
import { SocialSidebar } from "./social-sidebar";
import { Skiper39 } from "./ui/skiper39";
import ClickSpark from "./ClickSpark";
import { WhatsAppButton } from "./whatsapp-button";
import { SmoothScroll } from "./smooth-scroll";
import IntegrationHero from "./ui/integration-hero";

export function StudioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selection, setSelection] = useState<MediaSelection | null>(null);
  const overlayOpen = menuOpen || selection !== null;
  useEffect(() => {
    if (!overlayOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelection(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onEscape); };
  }, [overlayOpen]);
  return <ClickSpark sparkColor="#fff" shape="line" sparkCount={8} sparkSize={14} sparkRadius={30} duration={500}>
    <SmoothScroll suspended={overlayOpen} />
    <PointerGlow />
    <div className="min-[1101px]:pr-20">
    <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} onCloseMenu={() => setMenuOpen(false)} />
    <main className="w-full overflow-x-clip bg-background text-foreground">
      <Hero />
      <Showreel suspended={overlayOpen} onPlay={() => setSelection({ kind: "reel" })} />
      <About />
      <Ticker />
      <Skiper39 />
      <Portfolio onSelect={project => setSelection({ kind: "project", project })} />
      <IntegrationHero />
      <Services />
      <Contact />
    </main>
    <Footer />
    </div>
    <SocialSidebar hidden={overlayOpen} />
    <WhatsAppButton hidden={overlayOpen} />
    {selection && <MediaDialog selection={selection} onClose={() => setSelection(null)} onPlay={() => setSelection({ kind: "reel" })} />}
  </ClickSpark>;
}
