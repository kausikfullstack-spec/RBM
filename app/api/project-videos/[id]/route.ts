import { connection } from "next/server";
import { fetchTeraboxSegment, findProjectVideo, getTeraboxStream } from "@/lib/terabox-stream";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  if (!findProjectVideo(id)) return new Response("Video not found", { status: 404 });
  const segment = new URL(request.url).searchParams.get("segment");
  if (segment !== null && !/^\d+$/.test(segment)) return new Response("Invalid segment", { status: 400 });
  try {
    const stream = await getTeraboxStream(id);
    if (segment !== null) {
      const url = stream.segments[Number(segment)];
      if (!url) return new Response("Segment not found", { status: 404 });
      const response = await fetchTeraboxSegment(url);
      if (!response.ok) throw new Error("Media unavailable");
      return new Response(response.body, { headers: { "Content-Type": "video/mp2t", "Cache-Control": "no-store" } });
    }
    let index = 0;
    const playlist = stream.playlist.split(/\r?\n/).map(line => line && !line.startsWith("#")
      ? `/api/project-videos/${encodeURIComponent(id)}?segment=${index++}` : line).join("\n");
    return new Response(playlist, { headers: { "Content-Type": "application/vnd.apple.mpegurl", "Cache-Control": "no-store" } });
  } catch {
    return new Response("TeraBox playback is temporarily unavailable", { status: 502 });
  }
}
