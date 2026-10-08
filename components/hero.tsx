import { TextLink } from "./ui";

function StudioSeal() {
  return <div className="relative mt-[7px] size-[125px] text-brand min-[751px]:mt-[19px] min-[751px]:size-[110px] min-[1101px]:size-[145px]">
    <svg viewBox="0 0 150 150" aria-hidden="true" className="size-full animate-[spin_35s_linear_infinite] fill-brand text-[10px] font-semibold tracking-[2px] motion-reduce:animate-none"><defs><path id="studio-circle" d="M75,75 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0" /></defs><text><textPath href="#studio-circle" textLength="351">RECYCLE THE ORDINARY &#183; CREATE THE EXTRAORDINARY &#183; </textPath></text></svg>
    <span aria-hidden="true" className="absolute top-[25px] left-[39px] text-[53px] leading-none min-[751px]:top-[22px] min-[751px]:left-[35px] min-[751px]:text-[47px] min-[1101px]:top-[29px] min-[1101px]:left-[45px] min-[1101px]:text-[62px]">&#10035;</span>
    <span className="absolute top-[85px] left-[30px] text-[5px] tracking-[1px] min-[751px]:top-[74px] min-[751px]:left-[26px] min-[1101px]:top-[98px] min-[1101px]:left-[37px] min-[1101px]:text-[6px]">EST. TO CREATE</span>
  </div>;
}
export function Hero() {
  return <section className="overflow-hidden px-[5%] pt-[25px] min-[751px]:px-[4.5%] min-[751px]:pt-[30px]">
    <div className="flex justify-between text-[7px] tracking-[1px] text-muted min-[751px]:text-[9px] min-[751px]:tracking-[1.6px]"><span className="flex items-center gap-[9px]"><i className="size-1.5 rounded-full bg-brand" />INDEPENDENT CREATIVE PRODUCTION STUDIO</span><span className="hidden min-[751px]:inline">GOOD IDEAS DESERVE GREAT FRAMES.</span></div>
    <div className="grid grid-cols-2 items-start gap-[30px] pt-[45px] pb-[35px] min-[751px]:grid-cols-[110px_1fr_195px] min-[751px]:gap-x-[4%] min-[751px]:pt-[55px] min-[751px]:pb-[57px] min-[1101px]:grid-cols-[155px_1fr_235px] min-[1101px]:gap-x-[5.2%] min-[1101px]:pt-[68px] min-[1600px]:py-[95px]">
      <StudioSeal />
      <h1 className="font-heading col-span-2 row-start-1 m-0 text-[clamp(44px,9vw,65px)] leading-[1.12] font-normal tracking-normal min-[751px]:col-span-1 min-[751px]:col-start-2 min-[751px]:text-[5.6vw] min-[1101px]:text-[clamp(49px,5.4vw,87px)]">Ideas worth<br />a second look.<br />Stories that <span className="whitespace-nowrap text-brand">stick<span aria-hidden="true" className="ml-[17px] inline-block animate-[spin_25s_linear_infinite] align-middle text-[.9em] motion-reduce:animate-none">&#10035;</span></span>.</h1>
      <div className="min-[751px]:pt-[5px]">
        <p className="mb-[15px] text-xl leading-[1.25] tracking-[-.7px] min-[751px]:text-[23px] min-[1101px]:text-[26px]">Any <em className="mr-1 text-brand not-italic">brand.</em><br className="hidden min-[751px]:block" />Any <em className="mr-1 text-brand not-italic">sector.</em><br className="hidden min-[751px]:block" />Any <em className="text-brand not-italic">story.</em></p>
        <p className="text-[11px] leading-[1.7] text-[#c7c7bf] min-[751px]:text-[13px]">If it needs attention,<br />we roll camera.</p><div className="my-[15px] h-px bg-line min-[751px]:my-[23px]" />
        <p className="text-[11px] leading-[1.8] text-muted min-[1101px]:text-xs">We turn fresh perspectives into films, campaigns, and content that people don&apos;t just see. They remember.</p>
        <TextLink href="#work" className="mt-[15px] text-[11px] min-[751px]:mt-[26px] min-[751px]:text-xs">Explore our work</TextLink>
      </div>
    </div>
    <div className="font-display -ml-[.008em] whitespace-nowrap text-[13vw] leading-[1.1] font-normal tracking-[-.025em] text-brand min-[751px]:text-[clamp(80px,13.35vw,220px)]">RECYCLE BIN<span className="ml-2.5 inline-block align-top text-[.14em] leading-[2.9] tracking-normal">&#174;</span></div>
    <div className="mt-[18px] flex justify-between border-t border-line py-[15px] text-[7px] tracking-[.8px] text-muted min-[751px]:mt-[27px] min-[751px]:py-[21px] min-[751px]:text-[9px] min-[751px]:tracking-[1.5px]"><span>NEW PERSPECTIVES. NO OLD FORMULAS.</span><a href="#reel" className="text-foreground">SCROLL TO EXPLORE <span className="ml-[15px] text-lg text-brand">&#8595;</span></a></div>
  </section>;
}
