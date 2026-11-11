import { findProjectVideo } from "@/lib/terabox-stream";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = findProjectVideo(id);
  if (!video) return new Response("Video not found", { status: 404 });
  const source = JSON.stringify(`/api/project-videos/${encodeURIComponent(id)}`);
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project video</title><style>html,body{margin:0;height:100%;background:#000}video{display:block;width:100%;height:100%;object-fit:cover}p{position:absolute;inset:auto 16px 16px;color:#fff;font:14px sans-serif}a{color:#fac903}</style></head><body><video autoplay muted loop playsinline disablepictureinpicture disableremoteplayback aria-label="Project video"></video><p hidden role="alert">Video unavailable. <a target="_blank" rel="noopener noreferrer">Watch on TeraBox</a></p><script src="/vendor/hls.min.js"></script><script>
const video=document.querySelector('video'),error=document.querySelector('p');
error.querySelector('a').href=${JSON.stringify(video.shareUrl).replace(/</g, "\\u003c")};
const fail=()=>{error.hidden=false},play=()=>{video.muted=true;video.play().catch(fail)};
video.addEventListener('error',fail);
if(window.Hls&&Hls.isSupported()){const hls=new Hls({enableWorker:false});hls.loadSource(${source});hls.attachMedia(video);hls.on(Hls.Events.MANIFEST_PARSED,play);hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal)fail()});window.addEventListener('pagehide',()=>hls.destroy())}
else if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=${source};video.addEventListener('loadedmetadata',play)}
else fail();
</script></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "SAMEORIGIN" } });
}
