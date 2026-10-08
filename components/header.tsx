import Image from "next/image";
import { navigation } from "@/lib/content";
import { ActionLink, Arrow, Button } from "./ui";

export function Header({ menuOpen, onToggleMenu, onCloseMenu }: { menuOpen: boolean; onToggleMenu: () => void; onCloseMenu: () => void }) {
  return <>
    <header className="flex h-[90px] items-center gap-[23px] border-b border-line px-[5%] min-[751px]:h-[113px] min-[751px]:gap-10 min-[751px]:px-[4.5%]">
      <a href="#" aria-label="Recycle Bin Media home" className="flex items-center gap-[7px] text-[11px] leading-[1.2] font-black tracking-[-.5px] min-[751px]:gap-3 min-[751px]:text-sm">
        <Image src="/RBM_logo.jpeg" alt="Recycle Bin Media logo" width={65} height={65} priority className="size-[49px] object-contain min-[751px]:size-[61px]" />
        <span>RECYCLE BIN<span className="block text-[17px] tracking-[1px] min-[751px]:text-[22px]">MEDIA&#174;</span></span>
      </a>
      <nav aria-label="Main navigation" className="mx-auto hidden gap-[39px] text-[13px] min-[751px]:flex">{navigation.map(item => <a key={item.href} href={item.href} className="transition-colors hover:text-brand">{item.label}</a>)}</nav>
      <ActionLink href="#contact" className="group ml-auto flex items-center gap-2.5 rounded-[3px] border-b border-brand px-3 py-2.5 text-xs min-[751px]:ml-0 min-[751px]:gap-6 min-[751px]:text-sm">Let&apos;s talk<Arrow className="text-[25px] text-brand group-hover:text-black group-focus-visible:text-black" /></ActionLink>
      <Button aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={onToggleMenu} className="group flex size-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-[3px] bg-transparent p-1.5">
        {menuOpen ? <span>&#10005;</span> : <><span className="h-px w-[22px] bg-foreground transition-colors group-hover:bg-black group-focus-visible:bg-black" /><span className="h-px w-[22px] bg-foreground transition-colors group-hover:bg-black group-focus-visible:bg-black" /></>}
      </Button>
    </header>
    {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-x-0 top-[90px] bottom-0 z-20 flex flex-col gap-[30px] bg-black p-[8vw] text-[clamp(25px,6vw,60px)] min-[751px]:top-[113px]">{[...navigation, { label: "Let's talk", href: "#contact" }].map(item => <ActionLink key={item.href} href={item.href} onClick={onCloseMenu} className="rounded px-3 py-2">{item.label} <Arrow /></ActionLink>)}</nav>}
  </>;
}
