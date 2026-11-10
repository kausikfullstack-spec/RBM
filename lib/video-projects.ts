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
  { id: "cgi-brand-film", title: "A new dimension of storytelling", description: "CGI brand film / Motion & visual storytelling", src: "/video/CGI_brand_film_creation_20261027170749.mp4", label: "CGI brand film" },
];
