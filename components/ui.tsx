import type { ComponentProps, ReactNode } from "react";

export const buttonStyles = "cursor-pointer transition-all duration-250 ease-out hover:border-brand hover:bg-brand hover:text-black focus-visible:border-brand focus-visible:bg-brand focus-visible:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none";
export const sectionStyles = "px-[5%] py-[65px] min-[751px]:px-[4.5%] min-[751px]:py-[85px] min-[1101px]:py-[115px]";
export const headingStyles = "font-heading text-[clamp(34px,7.2vw,52px)] leading-[1.08] font-normal tracking-normal min-[751px]:text-[clamp(38px,4.6vw,74px)]";

export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return <button className={`${buttonStyles} ${className}`} {...props} />;
}
export function ActionLink({ className = "", ...props }: ComponentProps<"a">) {
  return <a className={`${buttonStyles} ${className}`} {...props} />;
}
export function Arrow({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={className}>&#8599;</span>;
}
export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className="flex items-center gap-2.5 text-[9px] tracking-[1.7px]"><span className={`size-1.5 shrink-0 ${dark ? "bg-black" : "bg-brand"}`} />{children}</div>;
}
export function TextLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return <ActionLink className={`group mt-[26px] flex w-fit items-center justify-between gap-[25px] rounded-[3px] border-b border-line px-3 py-2.5 text-xs ${className}`} {...props}>{children}<Arrow className="text-[23px] text-brand transition-colors group-hover:text-black group-focus-visible:text-black" /></ActionLink>;
}
