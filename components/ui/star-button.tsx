import type { ComponentPropsWithoutRef } from "react";

export type StarButtonProps =
  | (ComponentPropsWithoutRef<"a"> & { href: string })
  | (ComponentPropsWithoutRef<"button"> & { href?: never });

export function StarButton({ children, className = "", ...props }: StarButtonProps) {
  const content = <>
    <span className="star-button-label">{children}</span>
    {[0, 1, 2, 3, 4, 5].map(index => <span key={index} aria-hidden="true" className={`star-button-spark star-button-spark-${index + 1}`}>
      <svg viewBox="0 0 784.11 815.53" fill="currentColor"><path d="M392.05 0C371.15 210.08 207.99 378.41 0 407.78c207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C576.12 378.4 412.94 210.09 392.05 0Z" /></svg>
    </span>)}
  </>;

  if (typeof props.href === "string") {
    return <a {...props} className={`star-button ${className}`}>{content}</a>;
  }

  return <button type="button" {...props} className={`star-button ${className}`}>{content}</button>;
}

export default StarButton;
