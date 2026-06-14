export interface SkillGroup {
  id: string;
  group: string;
  skills: string[];
  desc: string;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "01",
    group: "The Logic",
    skills: ["C", "C++", "Java", "Python", "TypeScript", "React"],
    desc: "My core foundation. I build high-performance systems and scalable web architectures where clean logic meets type-safe precision.",
  },
  {
    id: "02",
    group: "The Engine",
    skills: ["Unreal Engine 5", "Unity 3D", "Blender"],
    desc: "Crafting immersive 3D environments. I specialize in spatial computing and real-time rendering pipelines for the next generation of XR.",
  },
  {
    id: "03",
    group: "The Canvas",
    skills: ["HTML", "CSS", "TailwindCSS", "Sass", "Figma"],
    desc: "Design-to-code execution. I bridge the gap between complex engineering and aesthetic interfaces with pixel-perfect attention to detail.",
  },
  {
    id: "04",
    group: "The Databases",
    skills: ["MySQL", "MSSQL", "PostgreSQL", "Oracle"],
    desc: "Relational architecture and optimization. I design data structures that ensure high availability and integrity for enterprise-scale systems.",
  },
];
