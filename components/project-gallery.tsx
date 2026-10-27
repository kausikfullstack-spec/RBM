"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX } from "react-icons/fi";
import { projectBoards, type Project } from "@/lib/projects";
import { useSiteControls } from "./site-shell";
import { Button } from "./ui";

export function ProjectGallery({ project }: { project: Project }) {
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
    <section aria-labelledby="project-gallery-heading" className="px-[5%] pb-20 min-[751px]:px-[4.5%] min-[751px]:pb-28">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 min-[601px]:flex-row min-[601px]:items-end"><h2 id="project-gallery-heading" className="font-heading text-4xl min-[751px]:text-5xl">Inside the work<span className="text-brand">.</span></h2><p className="font-mono text-[10px] text-muted">{boards.length} CREATIVE BOARDS</p></div>
      <div className="grid gap-6 min-[901px]:grid-cols-2">
        {boards.map((board, index) => <figure key={board.number}>
          <button type="button" onClick={() => setActive(index)} aria-label={`Enlarge ${project.name} board ${board.number}`} className="group relative block aspect-[3508/2480] w-full overflow-hidden border border-line bg-[#141414] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <Image src={board.src} alt={`${project.name} creative board ${board.number} of ${boards.length}`} fill sizes="(max-width: 900px) 90vw, 45vw" className="object-contain" />
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
          <a href={boards[active].original} target="_blank" rel="noopener noreferrer" className="text-xs text-brand underline underline-offset-4">Open original image ↗</a>
          <Button onClick={next} aria-label="Next artwork" className="grid size-11 place-items-center rounded-full border border-line bg-black"><FiArrowRight /></Button>
        </div>
      </div>}
    </dialog>
  </>;
}
