"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiCalendar, FiX } from "react-icons/fi";
import { calendlyUrl } from "@/lib/content";
import { useSiteControls } from "./site-shell";

export function CalendlyBooking() {
  const { openBooking } = useSiteControls();
  return <button type="button" onClick={openBooking} aria-haspopup="dialog" aria-label="Book a 30-minute call with Recycle Bin Media" className="group flex shrink-0 cursor-pointer flex-col items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black">
    <span className="grid size-[85px] place-items-center rounded-full border border-black/45 transition-[background,color,transform] group-hover:scale-105 group-hover:bg-black group-hover:text-brand group-focus-visible:bg-black group-focus-visible:text-brand motion-reduce:transition-none min-[751px]:size-[155px]"><FiArrowUpRight aria-hidden="true" className="size-11 min-[751px]:size-20" /></span>
    <span className="flex items-center gap-1.5 text-[10px] min-[751px]:gap-2 min-[751px]:text-xs"><FiCalendar aria-hidden="true" />Book a 30-min call</span>
  </button>;
}

export function CalendlyDialog({ embedUrl, onClose }: { embedUrl: string; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => dialog?.close();
  }, []);

  useEffect(() => {
    const ready = (event: MessageEvent) => {
      if (event.origin !== new URL(calendlyUrl).origin || event.source !== iframeRef.current?.contentWindow) return;
      if (event.data && typeof event.data.event === "string" && event.data.event.startsWith("calendly.")) setLoaded(true);
    };
    window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, []);

  return <dialog ref={dialogRef} aria-label="Book a 30-minute call" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto h-[calc(100dvh-64px)] max-h-[900px] w-[calc(100%-24px)] max-w-[1000px] overflow-visible border-0 bg-transparent p-0 text-foreground backdrop:bg-black/85 backdrop:backdrop-blur-sm min-[751px]:w-[calc(100%-64px)]">
    <button type="button" onClick={onClose} aria-label="Close booking calendar" className="absolute -top-7 right-0 z-20 grid size-10 cursor-pointer place-items-center rounded-full bg-black text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand min-[751px]:-right-10 min-[751px]:top-0"><FiX aria-hidden="true" size={22} /></button>
    {!loaded && <div role="status" className="pointer-events-none absolute inset-0 z-10 grid place-content-center gap-4 text-center text-xs text-muted"><span aria-hidden="true" className="mx-auto size-7 animate-spin rounded-full border-2 border-line border-t-brand motion-reduce:animate-none" />Loading Calendly...</div>}
    {/* Calendly is cross-origin: crop its scrollbar on desktop while retaining scrolling inside the calendar. */}
    <div className="size-full min-[751px]:overflow-hidden">
      <iframe ref={iframeRef} src={embedUrl} title="Calendly: book a 30-minute call with Recycle Bin Media" data-lenis-prevent className={`h-full w-full border-0 bg-transparent min-[751px]:w-[calc(100%+20px)] ${loaded ? "opacity-100" : "opacity-0"}`} />
    </div>
  </dialog>;
}
