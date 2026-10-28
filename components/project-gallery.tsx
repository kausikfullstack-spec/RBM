"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiMaximize2, FiX } from "react-icons/fi";
import { projectBoards, type Project } from "@/lib/projects";
import { useSiteControls } from "./site-shell";
import { Button } from "./ui";

export function ProjectGallery({ project, startAt = 1 }: { project: Project; startAt?: number }) {
  const boards = projectBoards(project);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setContentOverlayOpen } = useSiteControls();
  const open = active !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    setContentOverlayOpen(open);
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open) dialog?.close();
    return () => { dialog?.close(); setContentOverlayOpen(false); };
  }, [open, setContentOverlayOpen]);

  const previous = () => setActive(index => index === null ? null : (index + boards.length - 1) % boards.length);
  const next = () => setActive(index => index === null ? null : (index + 1) % boards.length);

  return <>
    <section aria-labelledby="project-gallery-heading" className="px-[5%] pt-16 pb-20 min-[751px]:px-[4.5%] min-[751px]:pt-24 min-[751px]:pb-28">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 min-[601px]:flex-row min-[601px]:items-end"><h2 id="project-gallery-heading" className="text-4xl font-semibold tracking-tight min-[751px]:text-5xl">The story, frame by frame<span className="text-brand">.</span></h2><p className="text-xs text-muted">Select an artwork for a closer look <FiMaximize2 aria-hidden="true" className="ml-2 inline" /></p></div>
      <div className="grid gap-6 min-[901px]:grid-cols-2">
        {boards.filter(board => board.number >= startAt).map((board, index) => <figure key={board.number} className={index % 5 === 0 ? "min-[901px]:col-span-2" : ""}>
          <button type="button" onClick={() => setActive(board.number - 1)} aria-label={`Enlarge ${project.name} board ${board.number}`} className="group relative block aspect-[3508/2480] w-full overflow-hidden rounded-2xl border border-line bg-[#141414] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <Image src={board.src} alt={`${project.name} creative board ${board.number} of ${boards.length}`} fill sizes={index % 5 === 0 ? "90vw" : "(max-width: 900px) 90vw, 45vw"} className="object-contain" />
            <span aria-hidden="true" className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-black/80 text-brand transition-colors group-hover:bg-brand group-hover:text-black"><FiMaximize2 size={17} /></span>
          </button>
          <figcaption className="flex justify-between gap-4 py-3 font-mono text-[10px] text-muted"><span>{project.name}</span><span>{String(board.number).padStart(2, "0")} / {String(boards.length).padStart(2, "0")}</span></figcaption>
        </figure>)}
      </div>
    </section>
    <dialog ref={dialogRef} aria-label={`${project.name} artwork viewer`} onCancel={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); previous(); } if (event.key === "ArrowRight") { event.preventDefault(); next(); } }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 text-foreground backdrop:bg-black/80">
      {active !== null && <div data-lenis-prevent className="flex h-full flex-col overflow-auto px-4 py-4 min-[751px]:px-8">
        <div className="mb-5 flex shrink-0 items-center justify-between gap-4">
          <p className="text-xs">{project.name}<span className="ml-3 font-mono text-[10px] text-muted">{active + 1} / {boards.length}</span></p>
          <Button onClick={() => setActive(null)} aria-label="Close artwork viewer" className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-black"><FiX size={22} /></Button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <Image src={boards[active].src} alt={`${project.name} creative board ${active + 1}`} width={2000} height={1414} unoptimized className="max-h-full w-auto max-w-full object-contain" />
        </div>
        <div className="mt-5 flex shrink-0 items-center justify-between gap-4">
          <Button onClick={previous} aria-label="Previous artwork" className="grid size-11 place-items-center rounded-full border border-line bg-black"><FiArrowLeft /></Button>
          <a href={boards[active].original} target="_blank" rel="noopener noreferrer" className="text-xs text-brand underline underline-offset-4">Open original image <FiArrowUpRight aria-hidden="true" className="ml-1 inline" /></a>
          <Button onClick={next} aria-label="Next artwork" className="grid size-11 place-items-center rounded-full border border-line bg-black"><FiArrowRight /></Button>
        </div>
      </div>}
    </dialog>
  </>;
}
