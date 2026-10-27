"use client";
import { Hero } from "./hero";
import { Showreel } from "./showreel";
import { Portfolio } from "./portfolio";
import { About, Contact, Services, Ticker } from "./studio-sections";
import { Skiper39 } from "./ui/skiper39";
import IntegrationHero from "./ui/integration-hero";
import { SiteShell, useSiteControls } from "./site-shell";

function HomeContent() {
  const { overlayOpen } = useSiteControls();
  return <main id="top" className="w-full overflow-x-clip bg-background text-foreground">
    <Hero />
    <Showreel suspended={overlayOpen} />
    <About />
    <Ticker />
    <Skiper39 />
    <Portfolio />
    <IntegrationHero />
    <Services />
    <Contact />
  </main>;
}

export function StudioHome() {
  return <SiteShell><HomeContent /></SiteShell>;
}
