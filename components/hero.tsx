import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import InversionCircleScrollAnimation from "./ui/inversion-circle-scroll-animation";
import { FitWordmark } from "./ui/fit-wordmark";

export function Hero() {
  return <InversionCircleScrollAnimation>
    <div className="hero-composition">
      {/* <div className="hero-eyebrow"><span>INDEPENDENT CREATIVE PRODUCTION STUDIO</span><span className="hidden min-[751px]:inline">GOOD IDEAS DESERVE GREAT FRAMES.</span></div> */}
      <div className="hero-center">
        <span className="hero-kicker">RECYCLE THE ORDINARY. CREATE THE EXTRAORDINARY.</span>
        <h1 className="font-heading text-[clamp(48px,8vw,128px)] leading-[1.02] font-normal tracking-[-.025em]">Ideas worth<br />a second look<span className="text-brand">.</span></h1>
        <p className="max-w-[360px] text-sm leading-[1.8] min-[751px]:text-base">Fresh perspectives. Films that move you.<br />Stories that stay long after the last frame.</p>
        <a href="#work" className="hero-cta">Explore our work <FiArrowUpRight aria-hidden="true" size={20} /></a>
      </div>
      <div>
        <FitWordmark><div className="font-display -ml-[.008em] whitespace-nowrap text-[13vw] leading-[1.1] font-normal tracking-[-.025em] text-brand min-[751px]:text-[clamp(80px,13.35vw,220px)]">RECYCLE BIN MEDIA<span className="ml-2.5 inline-block align-top text-[.30em] leading-[0.9] tracking-normal">&#174;</span></div></FitWordmark>
        <div className="hero-bottom"><span>NEW PERSPECTIVES. NO OLD FORMULAS.</span><a href="#reel" className="flex items-center gap-3">SCROLL TO EXPLORE <FiArrowDown aria-hidden="true" size={18} /></a></div>
      </div>
    </div>
  </InversionCircleScrollAnimation>;
}
