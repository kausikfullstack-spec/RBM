export type Project = {
  slug: string;
  name: string;
  category: "Food & drink" | "Fashion" | "Pet care" | "Hospitality";
  summary: string;
  services: string[];
  sourceFolder: string;
  boardCount: number;
  coverBoard: number;
};

export const projects: Project[] = [
  {
    slug: "flavours-of-india", name: "Flavours of India", category: "Food & drink",
    summary: "Food, fusion, and festive storytelling. A collection of menu-led visuals, seasonal creatives, and food and drink content for Flavours of India.",
    services: ["Social content", "Food photography", "Seasonal campaigns"], sourceFolder: "foi", boardCount: 14, coverBoard: 5,
  },
  {
    slug: "hideaway", name: "Hideaway", category: "Food & drink",
    summary: "A warm, coffee-inspired visual world. Menu features, café moments, live-music creatives, and social storytelling for Hideaway.",
    services: ["Social content", "Food photography", "Event creatives"], sourceFolder: "hideaway", boardCount: 14, coverBoard: 2,
  },
  {
    slug: "kinkys", name: "Kinky’s", category: "Food & drink",
    summary: "Scrumptious. Saucy. Messy. Bold food imagery and playful, expressive social creatives that put Kinky’s personality front and centre.",
    services: ["Social content", "Food photography", "Creative direction"], sourceFolder: "kinkys", boardCount: 5, coverBoard: 3,
  },
  {
    slug: "the-paw-story", name: "The Paw Story", category: "Pet care",
    summary: "Pet portraits, grooming offers, and care-led communication. An affectionate, playful collection of social content for The Paw Story.",
    services: ["Social content", "Pet photography", "Promotional creatives"], sourceFolder: "PAW STORY", boardCount: 6, coverBoard: 3,
  },
  {
    slug: "turtle", name: "Turtle", category: "Fashion",
    summary: "Everyday essentials and occasion dressing, seen through a cohesive visual lens. Fashion imagery, collection stories, and promotional creatives for Turtle.",
    services: ["Social content", "Fashion campaigns", "Promotional creatives"], sourceFolder: "turtle", boardCount: 14, coverBoard: 5,
  },
  {
    slug: "utsav", name: "Utsav Hotel & Banquet", category: "Hospitality",
    summary: "Hospitality rooted in culture. Brand identity explorations, festive communication, and visual stories of the stays, celebrations, and experiences at Utsav.",
    services: ["Brand identity", "Social content", "Festive campaigns"], sourceFolder: "utsav", boardCount: 10, coverBoard: 3,
  },
];

export function projectImage(project: Project, board = project.coverBoard) {
  return `/work/projects/${project.slug}/${String(board).padStart(2, "0")}.webp`;
}

export function originalProjectImage(project: Project, board: number) {
  return `/RBM%20brand%20book/${encodeURIComponent(project.sourceFolder)}/Artboard%20${board}.jpg`;
}

export function projectBoards(project: Project) {
  return Array.from({ length: project.boardCount }, (_, index) => ({
    number: index + 1,
    src: projectImage(project, index + 1),
    original: originalProjectImage(project, index + 1),
  }));
}
