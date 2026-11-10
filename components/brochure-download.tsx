import { FiDownload } from "react-icons/fi";
import StarButton from "./ui/star-button";

export function BrochureDownload({ className = "" }: { className?: string }) {
  return <StarButton href="/downloads/recycle-bin-media-brochure.pdf" download="Recycle Bin Media - Brochure.pdf" className={className}><FiDownload aria-hidden="true" className="size-4 shrink-0" /><span>Download brochure</span></StarButton>;
}
