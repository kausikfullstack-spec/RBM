"use client";
import { useEffect, useRef } from "react";
import { sampleVideo, showreelPoster } from "@/lib/content";
import { Button } from "./ui";

export function MediaDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const elements = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]'));
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => { document.removeEventListener("keydown", trapFocus); previousFocus?.focus(); };
  }, []);
  return <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-black/85 px-5 py-[45px] backdrop-blur-xl"><div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Studio showreel" onClick={event => event.stopPropagation()} className="relative max-h-[90vh] w-full max-w-[950px] overflow-auto border border-line bg-[#111]">
    <Button onClick={onClose} aria-label="Close dialog" className="absolute top-3 right-3 z-10 size-[38px] rounded-full bg-brand text-black hover:rotate-90">&#10005;</Button>
    <video controls autoPlay playsInline poster={showreelPoster} src={sampleVideo} className="block h-auto w-full" />
    <p className="px-5 py-2.5 text-[11px] text-muted">Sample video / Demo content</p>
  </div></div>;
}
