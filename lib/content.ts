export type Project = { name: string; category: string; image: string };
export const projects: Project[] = [
  { name: "Motion / 01", category: "Brand film", image: "motion" },
  { name: "Built Different / 02", category: "Corporate film", image: "industry" },
  { name: "New Perspective / 03", category: "Campaign film", image: "perspective" },
  { name: "Back to the Roots / 04", category: "Brand story", image: "roots" },
];
export const services = [
  { title: "Creative strategy & concepts", description: "Big ideas start with a different perspective. We shape your story, find its voice, and build a concept worth paying attention to." },
  { title: "Films & full-stack production", description: "From the first storyboard to the final frame: brand films, commercials, music videos, and complete production support." },
  { title: "Content for brands", description: "Social-first films, campaign assets, and content that keeps your brand in the conversation." },
  { title: "Post-production & motion", description: "Editing, colour, sound, and motion design. The finishing touches that turn good footage into something unforgettable." },
  { title: "Production partners for agencies", description: "Your idea. Our production muscle. A collaborative crew to bring ambitious creative work to life." },
];
export const navigation = [
  { label: "The studio", href: "#about" },
  { label: "Our work", href: "#work" },
  { label: "What we do", href: "#services" },
];
export const sampleVideo = "/work/sample.mp4";
export const showreelPoster = "/work/showreel.jpg";
export const contactEmail = "hello@recyclebinmedia.com";
