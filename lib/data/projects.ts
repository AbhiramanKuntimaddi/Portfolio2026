export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  year: string;
  link: string;
  status: "COMPLETED" | "ONGOING" | "ARCHIVED" | "UPCOMING";
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Spandana Puppala Official Portfolio",
    category: "Personal Brand Platform // Portfolio",
    description:
      "Designing and developing a high-fidelity portfolio platform for Spandana Puppala, founder of SP Design Studio. The platform showcases her multidisciplinary work across interior design and music, supported by a custom CMS for dynamic content management.",
    stack: [
      "NextJS",
      "Custom CMS",
      "PostgreSQL (Supabase)",
      "GSAP",
      "TailwindCSS",
    ],
    year: "2026",
    link: "/archive/spandana-puppala",
    status: "UPCOMING",
  },
  {
    id: "02",
    title: "SM-Chemicals (Redesign)",
    category: "Full-Stack Web Architecture // CMS",
    description:
      "Complete architectural redesign and development of the company's digital platform. Built and integrated a custom CMS powered by PostgreSQL (Supabase) for dynamic product catalog and content management.",
    stack: [
      "NextJS",
      "Custom CMS",
      "PostgreSQL (Supabase)",
      "GSAP",
      "TailwindCSS",
    ],
    year: "2026",
    link: "/archive/sm-chemicals",
    status: "ONGOING",
  },
  {
    id: "03",
    title: "SP Design Studio",
    category: "Full-Stack Web Architecture // CMS",
    description:
      "Complete architectural redesign and development. Implemented and integrated a custom CMS powered by PostgreSQL (Supabase) for dynamic content management.",
    stack: [
      "NextJS",
      "Custom CMS",
      "PostgreSQL (Supabase)",
      "GSAP",
      "TailwindCSS",
    ],
    year: "2026",
    link: "/archive/sp-design-studio",
    status: "COMPLETED",
  },
  {
    id: "04",
    title: "Autonomous Simulation",
    category: "Master Thesis // Robotics",
    description:
      "Simulation-based tool for off-road autonomous vehicles using Unreal Engine 5. Rigorous scenario testing & analysis.",
    stack: ["Unreal Engine", "C++", "Python"],
    year: "2025",
    link: "/archive/autonomous-simulation",
    status: "COMPLETED",
  },
  {
    id: "05",
    title: "XR Frameworks",
    category: "Research // Spatial Computing",
    description:
      "Evaluated MR/VR/AR frameworks for industrial XR contexts. Benchmarked OpenXR, Unity, and Unreal Engine.",
    stack: ["Unity", "OpenXR", "Unreal Engine"],
    year: "2025",
    link: "/archive/xr-frameworks",
    status: "COMPLETED",
  },
  {
    id: "06",
    title: "Avirbhava",
    category: "Engineering Portfolio",
    description:
      "High-fidelity portfolio platform for a civil engineering firm, highlighting complex structural projects.",
    stack: ["HTML", "CSS", "PHP", "JavaScript"],
    year: "2018",
    link: "/archive/avirbhava",
    status: "ARCHIVED",
  },
  {
    id: "07",
    title: "SM-Chemicals",
    category: "Web Architecture",
    description:
      "Interactive product catalog platform optimized for industrial chemical inventories. Built for data integrity.",
    stack: ["HTML", "CSS", "PHP", "JavaScript"],
    year: "2017",
    link: "/archive/sm-chemicals",
    status: "COMPLETED",
  },
];
