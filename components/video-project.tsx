"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiInstagram, FiPlay, FiX } from "react-icons/fi";
import type { VideoProject } from "@/lib/video-projects";
import { useSiteControls } from "./site-shell";

export function VideoProjectCard({ project, onPlay }: { project: VideoProject; onPlay: () => void }) {
  return <button type="button" onClick={onPlay} aria-label={`Play ${project.title}`} aria-haspopup="dialog" className="group block min-w-0 cursor-pointer rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand">
    <div className="relative aspect-[3508/2480] overflow-hidden rounded-xl border border-line bg-[#141414]">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-4 border-transparent transition-colors duration-200 group-hover:border-brand group-focus-visible:border-brand motion-reduce:transition-none" />
      {project.kind === "instagram" ? <div aria-hidden="true" className="flex size-full flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top_right,#fac90322,transparent_65%)] pb-20"><FiInstagram className="size-16 text-brand" /><span className="text-xs tracking-[.2em] text-muted">@epr_svnslas_iyer</span></div> : <video src={`${project.src}#t=0.1`} muted playsInline preload="metadata" aria-hidden="true" className="pointer-events-none size-full object-contain" />}
      <span className="absolute top-4 left-4 rounded-full border border-brand/30 bg-black/80 px-3 py-2 text-[10px] text-brand">{project.label}</span>
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-black/10"><span className="grid size-16 place-items-center rounded-full border border-brand/60 bg-black/65 text-brand transition-colors group-hover:bg-brand group-hover:text-black"><FiPlay className="ml-1 size-6" /></span></span>
      <span aria-hidden="true" className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-brand text-black"><FiArrowUpRight size={23} /></span>
    </div>
    <div className="flex items-start justify-between gap-4 border-b border-line py-5"><div><h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand">{project.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-muted">{project.description}</p></div><span className="mt-1 shrink-0 text-[10px] text-muted">Video Studio</span></div>
  </button>;
}

export function VideoProjectDialog({ project, onClose }: { project: VideoProject; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const { setContentOverlayOpen } = useSiteControls();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setContentOverlayOpen(true);
    dialog?.showModal();
    if (video) {
      video.currentTime = 0;
      void video.play().catch((error: DOMException) => {
        if (error.name === "NotAllowedError" && video.isConnected) {
          video.muted = true;
          void video.play().catch(() => { /* Native playback controls remain available. */ });
        }
      });
    }
    return () => { video?.pause(); dialog?.close(); setContentOverlayOpen(false); previousFocus?.focus(); };
  }, [setContentOverlayOpen]);

  return <dialog ref={dialogRef} aria-label={project.title} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-auto border-0 bg-transparent p-5 text-foreground backdrop:bg-black/65 backdrop:backdrop-blur-xl md:p-10" data-lenis-prevent>
    <div className="pointer-events-none flex min-h-full items-center justify-center">
      <div className="pointer-events-auto relative" style={{ width: project.kind === "instagram" ? "min(420px, calc(100vw - 40px))" : ratio ? `min(1100px, calc(100vw - 40px), ${74 * ratio}dvh)` : "min(800px, calc(100vw - 40px))" }}>
        <button type="button" autoFocus onClick={onClose} aria-label="Close video" className="absolute -top-12 right-0 grid size-10 cursor-pointer place-items-center rounded-full border border-brand/30 bg-black text-brand transition-colors hover:bg-brand hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><FiX aria-hidden="true" size={22} /></button>
        {project.kind === "instagram" ? <>
          <div className="h-[min(700px,72dvh)] overflow-hidden rounded-2xl bg-black shadow-[0_20px_80px_#0008]">
            <iframe src={`${project.url}embed/`} title={project.title} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="relative -top-[54px] block h-[calc(min(700px,72dvh)+54px)] w-full border-0 bg-white" />
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-brand hover:underline">View on Instagram <FiArrowUpRight aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
        </> : <>
          <video ref={videoRef} src={project.src} controls autoPlay playsInline preload="metadata" aria-label={project.title} onLoadedMetadata={event => { const video = event.currentTarget; if (video.videoWidth && video.videoHeight) setRatio(video.videoWidth / video.videoHeight); }} onError={() => setFailed(true)} className="block max-h-[74dvh] w-full rounded-2xl bg-black object-contain shadow-[0_20px_80px_#0008]" />
          {failed && <p role="alert" className="mt-4 text-sm">This video could not load. <a href={project.src} className="text-brand underline">Open the video directly</a>.</p>}
        </>}
        <p className="mt-4 text-sm">{project.title}<span className="mt-1 block text-[11px] text-foreground/65">{project.description}</span></p>
      </div>
    </div>
  </dialog>;
}
