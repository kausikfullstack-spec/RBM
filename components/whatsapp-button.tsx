import { FaWhatsapp } from "react-icons/fa";

const message = [
  "Hi Recycle Bin Media! I'd like to discuss a project.",
  "",
  "Name:",
  "Brand / Company:",
  "Project type:",
  "Brief:",
  "Timeline:",
].join("\n");

export function WhatsAppButton({ hidden }: { hidden: boolean }) {
  if (hidden) return null;

  return <a
    href={`https://wa.me/917980909989?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Discuss your project with Recycle Bin Media on WhatsApp (opens in a new tab)"
    className="group fixed right-5 bottom-[max(24px,env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_#0008] transition-[background,transform] hover:scale-105 hover:bg-[#128C7E] focus-visible:bg-[#128C7E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] motion-reduce:transition-none min-[1101px]:right-4"
  >
    <span aria-hidden="true" className="pointer-events-none absolute inset-1 animate-[ping_2.5s_ease-out_infinite] rounded-full border-[0.5px] border-[#25D366]/30 motion-reduce:animate-none" />
    <FaWhatsapp aria-hidden="true" size={30} className="relative" />
    <span aria-hidden="true" className="pointer-events-none absolute right-full mr-3 w-max translate-x-2 rounded-lg border border-line bg-black px-4 py-2.5 text-xs text-brand opacity-0 shadow-lg transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none">Let&apos;s talk on WhatsApp</span>
  </a>;
}
