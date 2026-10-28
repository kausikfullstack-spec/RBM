type VideoProjectInfo = {
  id: string;
  title: string;
  description: string;
  label: string;
};

export type VideoProject = VideoProjectInfo & (
  | { kind?: "file"; src: string }
  | { kind: "instagram"; url: string }
);

export const videoProjects: VideoProject[] = [
  { id: "epr-instagram-reel", kind: "instagram", title: "EPR Iyer / Featured Reel", description: "Instagram Reel shared by @epr_svnslas_iyer", url: "https://www.instagram.com/reel/DY_mMRXxPZe/", label: "Instagram Reel" },
  { id: "cgi-brand-film", title: "A new dimension of storytelling", description: "CGI brand film / Motion & visual storytelling", src: "/video/CGI_brand_film_creation_20261027170749.mp4", label: "CGI brand film" },
  { id: "studio-demo", title: "Stories in motion", description: "Studio preview / Sample video", src: "/work/sample.mp4", label: "Demo video" },
  { id: "landscape-sample", title: "A moment outdoors", description: "Landscape playback sample / Demo footage", src: "/video/samples/landscape-nature.mp4", label: "Landscape demo" },
  { id: "landscape-extended", title: "A little more to the story", description: "Extended landscape sample / Demo footage", src: "/video/samples/landscape-motion.mp4", label: "Landscape demo" },
  { id: "portrait-sample", title: "A vertical point of view", description: "Portrait playback sample / Reframed demo footage", src: "/video/samples/portrait-sample.mp4", label: "Portrait demo" },
];
