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

  return <dialog ref={dialogRef} aria-labelledby="calendly-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto h-[calc(100dvh-24px)] max-h-[900px] w-[calc(100%-24px)] max-w-[1100px] overflow-hidden rounded-2xl border border-line bg-black p-0 text-foreground backdrop:bg-black/85 backdrop:backdrop-blur-sm min-[751px]:h-[calc(100dvh-64px)] min-[751px]:w-[calc(100%-64px)]">
    <div className="flex h-full flex-col" data-lenis-prevent>
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-4 min-[751px]:px-6">
        <div><p className="mb-1 text-[9px] tracking-[1.5px] text-brand">LET&apos;S MAKE SOME NOISE</p><h2 id="calendly-dialog-title" className="font-heading text-xl min-[751px]:text-2xl">Book a 30-minute call</h2></div>
        <button type="button" onClick={onClose} aria-label="Close booking calendar" className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-black text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><FiX aria-hidden="true" size={22} /></button>
      </div>
      <div className="relative min-h-0 flex-1">
        {!loaded && <div role="status" className="pointer-events-none absolute inset-0 z-10 grid place-content-center gap-4 bg-black text-center text-xs text-muted"><span aria-hidden="true" className="mx-auto size-7 animate-spin rounded-full border-2 border-line border-t-brand motion-reduce:animate-none" />Loading Calendly...</div>}
        <iframe ref={iframeRef} src={embedUrl} title="Calendly: book a 30-minute call with Recycle Bin Media" className="relative size-full border-0 bg-black" />
      </div>
      <div className="shrink-0 border-t border-line px-4 py-3 text-center text-[11px] min-[751px]:px-6"><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Open Calendly in a new tab <FiArrowUpRight aria-hidden="true" /></a></div>
    </div>
  </dialog>;
}
