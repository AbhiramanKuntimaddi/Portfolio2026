import type { Text } from "@/lib/i18n";

export interface SkillGroup {
  id: string;
  group: Text;
  role: Text;
  skills: (string | Text)[];
  desc: Text;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "01",
    group: { en: "Languages", de: "Sprachen" },
    role: { en: "Foundation", de: "Fundament" },
    skills: ["C", "C++", "Java", "Python", "TypeScript", "React"],
    desc: {
      en: "My base for everything: fast, reliable systems and web apps with clean, type-safe code.",
      de: "Meine Basis für alles: schnelle, zuverlässige Systeme und Web-Apps mit sauberem, typsicherem Code.",
    },
  },
  {
    id: "02",
    group: { en: "3D & XR", de: "3D & XR" },
    role: { en: "Real-time 3D", de: "Echtzeit-3D" },
    skills: ["Unreal Engine 5", "Unity 3D", "Blender"],
    desc: {
      en: "Real-time 3D scenes and XR prototypes in Unreal and Unity.",
      de: "Echtzeit-3D-Szenen und XR-Prototypen in Unreal und Unity.",
    },
  },
  {
    id: "03",
    group: { en: "Frontend", de: "Frontend" },
    role: { en: "Design to code", de: "Vom Design zum Code" },
    skills: ["HTML", "CSS", "TailwindCSS", "Sass", "Figma"],
    desc: {
      en: "I turn designs into fast, accessible interfaces, down to the pixel.",
      de: "Ich setze Designs in schnelle, barrierearme Oberflächen um, bis aufs Pixel.",
    },
  },
  {
    id: "04",
    group: { en: "Databases", de: "Datenbanken" },
    role: { en: "Data layer", de: "Datenschicht" },
    skills: ["MySQL", "MSSQL", "PostgreSQL", "Oracle"],
    desc: {
      en: "Relational databases designed to stay fast and consistent as they grow.",
      de: "Relationale Datenbanken, die auch beim Wachsen schnell und konsistent bleiben.",
    },
  },
  {
    id: "05",
    group: { en: "Machine Learning", de: "Machine Learning" },
    role: {
      en: "Recommendations & neural networks",
      de: "Empfehlungen & neuronale Netze",
    },
    skills: [
      { en: "Recommender Systems", de: "Empfehlungssysteme" },
      { en: "Neural Networks", de: "Neuronale Netze" },
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
    ],
    desc: {
      en: "Recommendation systems and neural networks built from scratch, turning user behaviour into useful suggestions.",
      de: "Empfehlungssysteme und neuronale Netze, von Grund auf gebaut. Sie machen aus Nutzerverhalten hilfreiche Vorschläge.",
    },
  },
];
