export interface SkillGroup {
  id: string;
  group: string;
  role: string;
  skills: string[];
  desc: string;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "01",
    group: "The Logic",
    role: "Foundation — Languages",
    skills: ["C", "C++", "Java", "Python", "TypeScript", "React"],
    desc: "My core foundation. I build high-performance systems and scalable web architectures where clean logic meets type-safe precision.",
  },
  {
    id: "02",
    group: "The Engine",
    role: "Immersion — 3D & XR",
    skills: ["Unreal Engine 5", "Unity 3D", "Blender"],
    desc: "Crafting immersive 3D environments. I specialize in spatial computing and real-time rendering pipelines for the next generation of XR.",
  },
  {
    id: "03",
    group: "The Canvas",
    role: "Interface — Design to Code",
    skills: ["HTML", "CSS", "TailwindCSS", "Sass", "Figma"],
    desc: "Design-to-code execution. I bridge the gap between complex engineering and aesthetic interfaces with pixel-perfect attention to detail.",
  },
  {
    id: "04",
    group: "The Databases",
    role: "Persistence — Data Layer",
    skills: ["MySQL", "MSSQL", "PostgreSQL", "Oracle"],
    desc: "Relational architecture and optimization. I design data structures that ensure high availability and integrity for enterprise-scale systems.",
  },
  {
    id: "05",
    group: "The Intelligence",
    role: "The Brains — ML & RecSys",
    skills: [
      "Recommender Systems",
      "Neural Networks",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
    ],
    desc: "Teaching systems to predict and personalize. I write neural networks and recommendation engines from the ground up, turning raw behavioral signals into relevant, real-time decisions.",
  },
];
