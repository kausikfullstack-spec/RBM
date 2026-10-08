"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
const projects = [
 {name:"Motion / 01",type:"Brand film",image:"motion"},
 {name:"Built Different / 02",type:"Corporate film",image:"industry"},
 {name:"New Perspective / 03",type:"Campaign film",image:"perspective"},
 {name:"Back to the Roots / 04",type:"Brand story",image:"roots"},
];
const services = [
 ["Creative strategy & concepts","Big ideas start with a different perspective. We shape your story, find its voice, and build a concept worth paying attention to."],
 ["Films & full-stack production","From the first storyboard to the final frame: brand films, commercials, music videos, and complete production support."],
 ["Content for brands","Social-first films, campaign assets, and content that keeps your brand in the conversation."],
 ["Post-production & motion","Editing, colour, sound, and motion design. The finishing touches that turn good footage into something unforgettable."],
 ["Production partners for agencies","Your idea. Our production muscle. A collaborative crew to bring ambitious creative work to life."],
];
export default function Home(){
 const [menu,setMenu]=useState(false);
 const [reel,setReel]=useState(false);
 const [project,setProject]=useState<number|null>(null);
 const [filter,setFilter]=useState("All work");
 const modal=reel||project!==null;
 const previewVideo = useRef<HTMLVideoElement>(null);
 useEffect(() => {
   const video = previewVideo.current;
   if (!video) return;
   let inView = false;
   const updatePlayback = () => {
     if (inView && !modal && !menu && !document.hidden) {
       void video.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
     } else {
       video.pause();
     }
   };
   const observer = new IntersectionObserver(([entry]) => {
     inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
     updatePlayback();
   }, { threshold: [0, 0.25] });
   observer.observe(video);
   document.addEventListener("visibilitychange", updatePlayback);
   return () => {
     observer.disconnect();
     document.removeEventListener("visibilitychange", updatePlayback);
     video.pause();
   };
 }, [modal, menu]);
 useEffect(()=>{if(!modal&&!menu)return; const previous=document.body.style.overflow; document.body.style.overflow="hidden";const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setReel(false);setProject(null);setMenu(false);}};window.addEventListener("keydown",close);return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",close);};},[modal,menu]);
 return <>
 <header className="header"><a className="brand" href="#" aria-label="Recycle Bin Media home"><Image src="/RBM_logo.jpeg" width={65} height={65} alt="Recycle Bin Media logo" priority/><span>RECYCLE BIN<span className="brand-bottom">MEDIA®</span></span></a><nav className="desktop-nav" aria-label="Main navigation"><a href="#about">The studio</a><a href="#work">Our work</a><a href="#services">What we do</a></nav><a className="contact-link" href="#contact">Let’s talk <span>↗</span></a><button className="menu-button" aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?"✕":<><span/><span/></>}</button></header>
 {menu&&<nav className="mobile-nav" aria-label="Mobile navigation">{[["The studio","about"],["Our work","work"],["What we do","services"],["Let’s talk","contact"]].map(([name,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{name} ↗</a>)}</nav>}
 <main><section className="hero"><div className="hero-eyebrow"><span><i/> INDEPENDENT CREATIVE PRODUCTION STUDIO</span><span>GOOD IDEAS DESERVE GREAT FRAMES.</span></div><div className="hero-grid"><div className="studio-seal"><svg viewBox="0 0 150 150" aria-hidden="true"><defs><path id="circle" d="M75,75 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0"/></defs><text><textPath href="#circle" textLength="351">RECYCLE THE ORDINARY · CREATE THE EXTRAORDINARY · </textPath></text></svg><span className="seal-star">✳</span><span className="seal-label">EST. TO CREATE</span></div><h1>Ideas worth<br/>a second look.<br/>Stories that <span className="stick">stick<span className="spark">✳</span></span>.</h1><div className="hero-copy"><p className="hero-lead">Any <em>brand.</em><br/>Any <em>sector.</em><br/>Any <em>story.</em></p><p>If it needs attention,<br/>we roll camera.</p><div className="mini-rule"/><p className="hero-small">We turn fresh perspectives into films, campaigns, and content that people don’t just see. They remember.</p><a className="text-link" href="#work">Explore our work <span>↗</span></a></div></div><div className="wordmark">RECYCLE BIN<span className="wordmark-dot">®</span></div><div className="hero-bottom"><span>NEW PERSPECTIVES. NO OLD FORMULAS.</span><a href="#reel">SCROLL TO EXPLORE <span>↓</span></a></div></section>
 <section id="reel" className="reel-section" style={{padding:0,width:"100%"}}><button className="reel-image" onClick={()=>setReel(true)} aria-label="Play studio showreel"><video ref={previewVideo} className="reel-video" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} src="/work/sample.mp4" poster="/work/showreel.jpg" muted loop playsInline preload="metadata" aria-label="Studio showreel preview"/><div className="reel-shade"/><span className="reel-label">A LITTLE BIT OF WHAT WE DO</span><span className="play-circle"><span>▶</span></span><span className="reel-bottom"><span>Less ordinary.<br/><strong>More unforgettable.</strong></span><span className="watch-label">WATCH THE SHOWREEL ↗</span></span></button></section>
 <section className="about section" id="about"><div className="section-kicker"><span className="square"/> THE STUDIO / 01</div><div><h2>Good stories don’t<br/>belong in the bin.<br/><span>They belong out there.</span></h2><div className="about-bottom"><p>We’re Recycle Bin Media. An independent creative production studio turning unexpected ideas into unforgettable visuals. From that first spark to the final cut, we make content with something to say.</p><a href="#contact" className="round-link">Let’s create<br/>something <span>↗</span></a></div></div></section>
 <div className="ticker" aria-hidden="true"><div>{[0,1,2,3].map(i=><span key={i}>FRESH THINKING <b>✳</b> BOLD STORIES <b>✳</b> NO BORING FRAMES <b>✳</b> </span>)}</div></div>
 <section className="section work" id="work"><div className="section-top"><div><div className="section-kicker"><span className="square"/> SELECTED WORK / 02</div><h2>Made to <span>make a mark.</span></h2></div><span className="section-side">A FEW FRAMES.<br/>A WHOLE LOT OF FEELING.</span></div><div className="filters" aria-label="Filter projects">{["All work","Brand film","Corporate film","Campaign film"].map(item=><button aria-pressed={filter===item} className={filter===item?"active":""} key={item} onClick={()=>setFilter(item)}>{item}{item==="All work"&&<sup>04</sup>}</button>)}</div><div className="project-grid">{projects.map((item,index)=>(filter==="All work"||filter===item.type)&&<button className="project" key={item.name} onClick={()=>setProject(index)}><div className="project-image"><Image src={`/work/${item.image}.jpg`} alt={`${item.name} film preview`} fill sizes="(max-width: 700px) 100vw, 50vw"/><span className="project-arrow">↗</span><span className="project-number">0{index+1}</span></div><div className="project-info"><h3>{item.name}</h3><span>{item.type} <span>↗</span></span></div></button>)}</div><p className="portfolio-note">Sample projects and stock imagery. Your stories go here.</p></section>
 <section className="section services" id="services"><div className="services-intro"><div className="section-kicker"><span className="square"/> WHAT WE DO / 03</div><h2>From <span>“what if”</span><br/>to <span>“that’s it.”</span></h2><p>One creative partner.<br/>Every part of the production.</p><span className="services-star" aria-hidden="true">✳</span></div><div className="service-list">{services.map(([title,description],index)=><details key={title}><summary><span className="service-index">0{index+1}</span><h3>{title}</h3><span className="service-plus">+</span></summary><p>{description}</p></details>)}</div></section>
 <section className="contact section" id="contact"><div className="section-kicker"><span className="square"/> YOUR NEXT BIG IDEA STARTS HERE</div><div className="contact-main"><h2>Let’s make<br/><span>some noise.</span></h2><a className="contact-circle" href="mailto:hello@recyclebinmedia.com" aria-label="Email Recycle Bin Media">↗</a></div><div className="contact-bottom"><p>Got a brief? A wild idea? A “hear me out”?<br/>We’re all ears.</p><a href="mailto:hello@recyclebinmedia.com">hello@recyclebinmedia.com ↗</a></div></section></main>
 <footer><a href="#" className="footer-brand">RECYCLE BIN MEDIA®</a><span>© 2026 Recycle Bin Media</span><a href="#">BACK TO TOP ↑</a></footer>
 {modal&&<div className="modal-backdrop" onClick={()=>{setReel(false);setProject(null);}}><div className="modal" role="dialog" aria-modal="true" aria-label={reel?"Studio showreel":`${projects[project!].name} project`} onClick={e=>e.stopPropagation()}><button autoFocus className="modal-close" aria-label="Close dialog" onClick={()=>{setReel(false);setProject(null);}}>✕</button>{reel?<><video controls autoPlay playsInline poster="/work/showreel.jpg" src="/work/sample.mp4"/><p>Sample video / Demo content</p></>:<><Image src={`/work/${projects[project!].image}.jpg`} width={1200} height={700} alt={projects[project!].name}/><div className="modal-copy"><span className="section-kicker">DEMO PROJECT / {projects[project!].type}</span><h2>{projects[project!].name}</h2><p>A fictional project using stock imagery and a sample video to preview your portfolio.</p><button className="text-link" style={{background:"transparent"}} onClick={()=>{setProject(null);setReel(true);}}>Play sample video <span>&#8599;</span></button></div></>}</div></div>}
 </>;
}

