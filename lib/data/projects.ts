import type { Text } from "@/lib/i18n";

export const PROJECT_STATUSES = [
  "UPCOMING",
  "ONGOING",
  "COMPLETED",
  "ARCHIVED",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Project {
  id: string;
  slug: string;
  title: Text;
  category: Text;
  description: Text;
  stack: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  hidden: boolean;
  cover: string;
  images: string[];
}

const cmsStack = [
  "NextJS",
  "Custom CMS",
  "PostgreSQL (Supabase)",
  "GSAP",
  "TailwindCSS",
];

const webCms: Text = {
  en: "Web platform · CMS",
  de: "Web-Plattform · CMS",
};

export const projects: Project[] = [
  {
    id: "01",
    title: {
      en: "Spandana Puppala Official Portfolio",
      de: "Offizielles Portfolio von Spandana Puppala",
    },
    category: { en: "Portfolio · CMS", de: "Portfolio · CMS" },
    description: {
      en: "Portfolio site for Spandana Puppala, founder of SP Design Studio, showing her interior design and music work. Content is managed through a custom CMS.",
      de: "Portfolio-Website für Spandana Puppala, Gründerin von SP Design Studio, mit ihren Arbeiten in Innenarchitektur und Musik. Inhalte werden über ein eigenes CMS gepflegt.",
    },
    stack: cmsStack,
    year: "2026",
    slug: "spandana-puppala",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
    status: "UPCOMING",
  },
  {
    id: "02",
    title: { en: "SM-Chemicals (Redesign)", de: "SM-Chemicals (Relaunch)" },
    category: webCms,
    description: {
      en: "Full redesign of the company website, with a custom CMS on Supabase for the product catalog and content.",
      de: "Kompletter Relaunch der Firmenwebsite, mit eigenem CMS auf Supabase für Produktkatalog und Inhalte.",
    },
    stack: cmsStack,
    year: "2026",
    slug: "sm-chemicals",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
    status: "ONGOING",
  },
  {
    id: "03",
    title: { en: "SP Design Studio", de: "SP Design Studio" },
    category: webCms,
    description: {
      en: "Full redesign of the studio website, with a custom CMS on Supabase for projects and content.",
      de: "Kompletter Relaunch der Studio-Website, mit eigenem CMS auf Supabase für Projekte und Inhalte.",
    },
    stack: cmsStack,
    year: "2026",
    slug: "sp-design-studio",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
    status: "COMPLETED",
  },
  {
    id: "04",
    title: { en: "Autonomous Simulation", de: "Autonome Simulation" },
    category: {
      en: "Master's thesis · Robotics",
      de: "Masterarbeit · Robotik",
    },
    description: {
      en: "A simulation tool in Unreal Engine 5 for testing off-road autonomous vehicles in many scenarios.",
      de: "Ein Simulationstool in Unreal Engine 5, um autonome Offroad-Fahrzeuge in vielen Szenarien zu testen.",
    },
    stack: ["Unreal Engine", "C++", "Python"],
    year: "2025",
    slug: "autonomous-simulation",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
    status: "COMPLETED",
  },
  {
    id: "05",
    title: { en: "XR Frameworks", de: "XR-Frameworks" },
    category: { en: "Research · XR", de: "Forschung · XR" },
    description: {
      en: "Compared MR, VR and AR frameworks (OpenXR, Unity and Unreal) for industrial use.",
      de: "Vergleich von MR-, VR- und AR-Frameworks (OpenXR, Unity und Unreal) für den Industrieeinsatz.",
    },
    stack: ["Unity", "OpenXR", "Unreal Engine"],
    year: "2025",
    slug: "xr-frameworks",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
    status: "COMPLETED",
  },
  {
    id: "06",
    title: { en: "Avirbhava", de: "Avirbhava" },
    category: { en: "Portfolio", de: "Portfolio" },
    description: {
      en: "Portfolio website for a civil engineering firm, showing its structural projects.",
      de: "Portfolio-Website für ein Bauingenieurbüro und seine Tragwerksprojekte.",
    },
    stack: ["HTML", "CSS", "PHP", "JavaScript"],
    year: "2018",
    slug: "avirbhava",
    featured: false,
    hidden: false,
    cover: "",
    images: [],
    status: "ARCHIVED",
  },
  {
    id: "07",
    title: { en: "SM-Chemicals", de: "SM-Chemicals" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Product catalog website for an industrial chemicals company.",
      de: "Produktkatalog-Website für ein Unternehmen der Industriechemie.",
    },
    stack: ["HTML", "CSS", "PHP", "JavaScript"],
    year: "2017",
    slug: "sm-chemicals-2017",
    featured: false,
    hidden: false,
    cover: "",
    images: [],
    status: "COMPLETED",
  },
];
