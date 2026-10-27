import type { CSSProperties, HTMLAttributes } from "react";

type KineticTextProps = HTMLAttributes<HTMLElement> & {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

/** Adapted from Magic UI's Kinetic Text: https://magicui.design/r/kinetic-text.json */
export function KineticText({ text, as: Tag = "span", className = "", style, ...props }: KineticTextProps) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...style,
  } as CSSProperties;

  return <Tag {...props} className={`kinetic-text ${className}`} style={mergedStyle}>
    {Array.from(text).map((letter, index) => <span key={index} aria-hidden="true" className="kinetic-letter">{letter === " " ? "\u00a0" : letter}</span>)}
    <span className="sr-only">{text}</span>
  </Tag>;
}
