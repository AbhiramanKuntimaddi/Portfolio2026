import type { Text } from "@/lib/i18n";

export interface ExperienceData {
  id: string;
  year: string;
  title: Text;
  company: string;
  desc: Text;
  context: Text;
}

export const experiences: ExperienceData[] = [
  {
    id: "01",
    year: "2024",
    title: { en: "Java & ML Engineer", de: "Java- & ML-Engineer" },
    company: "SoftDeCC Software",
    desc: {
      en: "I build high-load Java EE e-learning platforms and the recommendation system that decides what each learner sees next.",
      de: "Ich entwickle Java-EE-E-Learning-Plattformen unter hoher Last und das Empfehlungssystem, das entscheidet, was Lernende als Nächstes sehen.",
    },
    context: { en: "Current role", de: "Aktuelle Stelle" },
  },
  {
    id: "02",
    year: "2022",
    title: { en: "Master's Thesis", de: "Masterarbeit" },
    company: "RPTU Kaiserslautern",
    desc: {
      en: "Research where scientific computing, visualization and intelligent systems meet.",
      de: "Forschung an der Schnittstelle von wissenschaftlichem Rechnen, Visualisierung und intelligenten Systemen.",
    },
    context: { en: "Academic", de: "Studium" },
  },
  {
    id: "03",
    year: "2021",
    title: { en: "XR Frameworks", de: "XR-Frameworks" },
    company: "RPTU Kaiserslautern",
    desc: {
      en: "Compared XR frameworks (Unity, Unreal and OpenXR) for spatial computing.",
      de: "Vergleich von XR-Frameworks (Unity, Unreal und OpenXR) für Spatial Computing.",
    },
    context: { en: "Research", de: "Forschung" },
  },
  {
    id: "04",
    year: "2018",
    title: { en: "Full-Stack Engineer", de: "Full-Stack-Engineer" },
    company: "SM Chemicals",
    desc: {
      en: "Built the company's product platform and catalog, end to end.",
      de: "Aufbau der Produktplattform und des Katalogs, von Anfang bis Ende.",
    },
    context: { en: "Industry", de: "Industrie" },
  },
  {
    id: "05",
    year: "2018",
    title: { en: "Vision AI", de: "Vision AI" },
    company: "PetPals Startup",
    desc: {
      en: "Real-time animal recognition with neural networks, running on a phone.",
      de: "Tiererkennung in Echtzeit mit neuronalen Netzen, direkt auf dem Smartphone.",
    },
    context: { en: "Startup", de: "Startup" },
  },
];
