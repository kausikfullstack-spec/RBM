"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./studio-sections";
import { MediaDialog } from "./media-dialog";
import { PointerGlow } from "./pointer-glow";
import { SocialSidebar } from "./social-sidebar";
import { WhatsAppButton } from "./whatsapp-button";
import { SmoothScroll } from "./smooth-scroll";
import ClickSpark from "./ClickSpark";
import { CalendlyDialog } from "./calendly-booking";
import { calendlyUrl } from "@/lib/content";

type SiteControls = { overlayOpen: boolean; openReel: () => void; openBooking: () => void; setContentOverlayOpen: (open: boolean) => void };
const SiteContext = createContext<SiteControls | null>(null);

export function useSiteControls() {
  const controls = useContext(SiteContext);
  if (!controls) throw new Error("Site controls require SiteShell");
  return controls;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  const [contentOverlayOpen, setContentOverlayOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const overlayOpen = menuOpen || reelOpen || contentOverlayOpen || bookingUrl !== null;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeMobileMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  const openBooking = () => {
    const url = new URL(calendlyUrl);
    url.searchParams.set("embed_domain", window.location.hostname);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("background_color", "000000");
    url.searchParams.set("text_color", "f5f4ed");
    url.searchParams.set("primary_color", "fac903");
    setMenuOpen(false);
    setBookingUrl(url.toString());
  };

  useEffect(() => {
    if (!overlayOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setReelOpen(false); setBookingUrl(null); }
    };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", escape); };
  }, [overlayOpen]);

  return <SiteContext.Provider value={{ overlayOpen, openReel: () => setReelOpen(true), openBooking, setContentOverlayOpen }}>
    <ClickSpark sparkColor="#fff" shape="line" sparkCount={8} sparkSize={14} sparkRadius={30} duration={500}>
      <SmoothScroll suspended={overlayOpen} />
      <PointerGlow />
      <div className="min-[1101px]:pr-20">
        <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(value => !value)} onCloseMenu={() => setMenuOpen(false)} onBookCall={openBooking} />
        {children}
        <Footer />
      </div>
      <SocialSidebar hidden={overlayOpen} />
      <WhatsAppButton hidden={overlayOpen} />
      {reelOpen && <MediaDialog onClose={() => setReelOpen(false)} />}
      {bookingUrl && <CalendlyDialog embedUrl={bookingUrl} onClose={() => setBookingUrl(null)} />}
    </ClickSpark>
  </SiteContext.Provider>;
}
