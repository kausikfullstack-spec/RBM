"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { sampleVideo, showreelPoster, type Project } from "@/lib/content";
import { Arrow, Button } from "./ui";

export type MediaSelection = { kind: "reel" } | { kind: "project"; project: Project };
export function MediaDialog({ selection, onClose, onPlay }: { selection: MediaSelection; onClose: () => void; onPlay: () => void }) {
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
  return <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-black/85 px-5 py-[45px] backdrop-blur-xl"><div ref={dialogRef} role="dialog" aria-modal="true" aria-label={selection.kind === "reel" ? "Studio showreel" : `${selection.project.name} project`} onClick={event => event.stopPropagation()} className="relative max-h-[90vh] w-full max-w-[950px] overflow-auto border border-line bg-[#111]">
    <Button onClick={onClose} aria-label="Close dialog" className="absolute top-3 right-3 z-10 size-[38px] rounded-full bg-brand text-black hover:rotate-90">&#10005;</Button>
    {selection.kind === "reel" ? <><video controls autoPlay playsInline poster={showreelPoster} src={sampleVideo} className="block h-auto w-full" /><p className="px-5 py-2.5 text-[11px] text-muted">Sample video / Demo content</p></> : <><Image src={`/work/${selection.project.image}.jpg`} width={1200} height={700} alt={selection.project.name} className="block h-auto w-full" /><div className="p-6 min-[751px]:p-[30px]"><span className="text-[9px] tracking-[1.7px]">DEMO PROJECT / {selection.project.category}</span><h2 className="font-heading my-5 text-[35px] font-normal min-[751px]:text-[45px]">{selection.project.name}</h2><p className="max-w-[600px] text-sm leading-[1.8] text-muted">A fictional project using stock imagery and a sample video to preview your portfolio.</p><Button onClick={onPlay} className="group mt-[26px] flex w-fit items-center gap-[25px] rounded-[3px] border-b border-line bg-transparent px-3 py-2.5 text-xs">Play sample video<Arrow className="text-[23px] text-brand group-hover:text-black group-focus-visible:text-black" /></Button></div></>}
  </div></div>;
}
