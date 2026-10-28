"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { expertiseNavigation, navigation } from "@/lib/content";
import { ActionLink, Arrow, Button } from "./ui";

function ExpertiseDropdown() {
  const [open, setOpen] = useState(false);
  return <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={event => { if (event.target.tagName !== "BUTTON") setOpen(true); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); event.stopPropagation(); } }}>
    <div className="flex items-center gap-1"><Link href="/expertise" onClick={() => setOpen(false)} className="whitespace-nowrap py-3 transition-colors hover:text-brand">Expertise</Link><button type="button" aria-label="Toggle expertise services" aria-expanded={open} aria-controls="expertise-dropdown" onClick={() => setOpen(value => !value)} className="cursor-pointer rounded p-1 text-brand focus-visible:outline-2 focus-visible:outline-brand"><svg aria-hidden="true" viewBox="0 0 16 16" className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m4 6 4 4 4-4" /></svg></button></div>
    <div id="expertise-dropdown" hidden={!open} className="absolute top-full left-1/2 z-50 w-[290px] -translate-x-1/2 pt-2"><ul className="rounded-2xl border border-brand/25 bg-background p-2 shadow-[0_16px_50px_#000b]">{expertiseNavigation.map(service => <li key={service.id}><Link href={`/expertise#${service.id}`} onClick={() => setOpen(false)} className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-brand hover:text-black focus-visible:bg-brand focus-visible:text-black focus-visible:outline-none">{service.label}<Arrow /></Link></li>)}</ul></div>
  </div>;
}

export function Header({ menuOpen, onToggleMenu, onCloseMenu, onBookCall }: { menuOpen: boolean; onToggleMenu: () => void; onCloseMenu: () => void; onBookCall: () => void }) {
  return <>
    <header className="flex h-[90px] items-center gap-[23px] border-b border-line px-[5%] min-[1001px]:h-[113px] min-[1001px]:gap-6 min-[1001px]:px-[4.5%] min-[1101px]:gap-10">
      <Link href="/" aria-label="Recycle Bin Media home" className="flex items-center gap-[7px] text-[11px] leading-[1.2] font-black tracking-[-.5px] min-[1001px]:gap-3 min-[1001px]:text-sm">
        <Image src="/RBM_logo.jpeg" alt="Recycle Bin Media logo" width={65} height={65} priority className="size-[49px] object-contain min-[1001px]:size-[61px]" />
        <span>RECYCLE BIN<span className="block text-[17px] tracking-[1px] min-[1001px]:text-[22px]">MEDIA<span className="ml-0.5 inline-block align-top text-[.4em] leading-[1.4] tracking-normal">&#174;</span></span></span>
      </Link>
      <nav aria-label="Main navigation" className="mx-auto hidden items-center gap-6 text-sm leading-6 font-medium min-[1001px]:flex min-[1101px]:gap-[39px] min-[1101px]:text-base">{navigation.map(item => item.href === "/expertise" ? <ExpertiseDropdown key={item.href} /> : <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-brand">{item.label}</Link>)}</nav>
      <Button onClick={onBookCall} aria-haspopup="dialog" className="group ml-auto flex items-center gap-2.5 rounded-[3px] border-b border-brand bg-transparent px-3 py-2.5 text-xs min-[1001px]:ml-0 min-[1001px]:gap-6 min-[1001px]:text-sm">Let&apos;s talk<Arrow className="text-[25px] text-brand group-hover:text-black group-focus-visible:text-black" /></Button>
      <Button aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={onToggleMenu} className="group flex size-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-[3px] bg-transparent p-1.5 min-[1001px]:hidden">
        {menuOpen ? <span>&#10005;</span> : <><span className="h-px w-[22px] bg-foreground transition-colors group-hover:bg-black group-focus-visible:bg-black" /><span className="h-px w-[22px] bg-foreground transition-colors group-hover:bg-black group-focus-visible:bg-black" /></>}
      </Button>
    </header>
    {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-x-0 top-[90px] bottom-0 z-20 flex flex-col gap-[30px] overflow-y-auto bg-black p-[8vw] text-[clamp(25px,6vw,60px)] min-[1001px]:hidden" data-lenis-prevent>{navigation.map(item => item.href === "/expertise" ? <details key={item.href} className="px-3 py-2"><summary className="cursor-pointer marker:text-brand">Expertise</summary><ul className="mt-4 space-y-1 border-l border-brand/30 pl-4 text-sm"><li><Link href="/expertise" onClick={onCloseMenu} className="block rounded px-3 py-2 text-brand">All expertise <Arrow /></Link></li>{expertiseNavigation.map(service => <li key={service.id}><Link href={`/expertise#${service.id}`} onClick={onCloseMenu} className="block rounded px-3 py-3 hover:bg-brand hover:text-black">{service.label}</Link></li>)}</ul></details> : <ActionLink key={item.href} href={item.href} onClick={onCloseMenu} className="rounded px-3 py-2">{item.label} <Arrow /></ActionLink>)}<Button onClick={onBookCall} aria-haspopup="dialog" className="rounded bg-transparent px-3 py-2 text-left">Let&apos;s talk <Arrow /></Button></nav>}
  </>;
}

