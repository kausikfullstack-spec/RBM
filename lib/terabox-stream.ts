import { createHash } from "node:crypto";
import videoData from "./project-videos.json";

type Stream = { playlist: string; segments: string[] };
const streams = new Map<string, { expires: number; value: Promise<Stream> }>();
const headers = { "User-Agent": "Mozilla/5.0", Referer: "https://www.terabox.app/" };

export function findProjectVideo(id: string) {
  return Object.values(videoData).flat().find(video => video.id === id);
}

async function resolveStream(id: string): Promise<Stream> {
  const video = findProjectVideo(id);
  if (!video || video.provider !== "terabox") throw new Error("Unknown video");
  const code = new URL(video.shareUrl).pathname.match(/^\/s\/1([\w-]+)$/)?.[1];
  if (!code) throw new Error("Invalid share link");
  const page = await fetch(`https://www.terabox.app/sharing/link?surl=${code}`, {
    headers, cache: "no-store", signal: AbortSignal.timeout(20000),
  });
  if (!page.ok) throw new Error("Share unavailable");
  const html = await page.text();
  const stateText = html.match(/window\.__INITIAL_STATE__ = (.*?);<\/script>/)?.[1];
  const token = html.match(/fn%28%22(.*?)%22%29/)?.[1];
  if (!stateText || !token) throw new Error("Share format changed");
  const state = JSON.parse(stateText);
  const share = state.pinia?.share;
  const info = share?.shareInfo;
  const file = share?.currentFile;
  if (!info?.uk || !info?.shareid || !file?.fs_id || file.play_forbid === "1") throw new Error("Public video unavailable");
  const cookies = page.headers.getSetCookie().map(cookie => cookie.split(";")[0]);
  const browser = cookies.find(cookie => cookie.startsWith("browserid="))?.slice(10) ?? "";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const sign = createHash("md5").update(`0dubox${browser}${timestamp}`).digest("hex");
  const params = new URLSearchParams({ uk: String(info.uk), shareid: String(info.shareid), fid: String(file.fs_id),
    type: "M3U8_AUTO_480", sign, timestamp, jsToken: token, esl: "1", isplayer: "1", ehps: "1", clienttype: "0", app_id: "250528", web: "1", channel: "dubox" });
  const response = await fetch(`https://www.terabox.app/share/streaming?${params}`, {
    headers: { ...headers, Cookie: cookies.join("; ") }, cache: "no-store", signal: AbortSignal.timeout(20000),
  });
  const playlist = await response.text();
  if (!response.ok || !playlist.startsWith("#EXTM3U")) throw new Error("Public stream unavailable");
  const segments = playlist.split(/\r?\n/).filter(line => line && !line.startsWith("#"));
  for (const segment of segments) {
    const url = new URL(segment);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".terabox.app") || !url.pathname.startsWith("/video/")) throw new Error("Unexpected media host");
  }
  return { playlist, segments };
}

export function getTeraboxStream(id: string): Promise<Stream> {
  const existing = streams.get(id);
  if (existing && existing.expires > Date.now()) return existing.value;
  const value = resolveStream(id).catch(error => { streams.delete(id); throw error; });
  streams.set(id, { expires: Date.now() + 5 * 60 * 1000, value });
  return value;
}

export async function fetchTeraboxSegment(url: string) {
  return fetch(url, { headers, redirect: "error", cache: "no-store", signal: AbortSignal.timeout(30000) });
}
