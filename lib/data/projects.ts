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
  client: string;
  role: Text;
  url: string;
  repo: string;
  challenge: Text;
  solution: Text;
  highlights: Text[];
  outcome: Text;
  stack: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  hidden: boolean;
  cover: string;
  images: string[];
}

const none: Text = { en: "", de: "" };

const designDevCms: Text = {
  en: "Design, development & CMS",
  de: "Design, Entwicklung & CMS",
};

const webCms: Text = {
  en: "Web platform · CMS",
  de: "Web-Plattform · CMS",
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "spandana-puppala",
    title: {
      en: "Spandana Puppala Official Portfolio",
      de: "Offizielles Portfolio von Spandana Puppala",
    },
    category: { en: "Personal portfolio", de: "Persönliches Portfolio" },
    description: {
      en: "A personal portfolio for interior designer and singer Spandana Puppala, told as one horizontal story.",
      de: "Ein persönliches Portfolio für die Innenarchitektin und Sängerin Spandana Puppala, erzählt als eine horizontale Geschichte.",
    },
    client: "Spandana Puppala",
    role: { en: "Design & development", de: "Design & Entwicklung" },
    url: "",
    repo: "",
    challenge: {
      en: "Her studio's website sells the business. This one had to show the person: her design work and her music, side by side, in one place.",
      de: "Die Website ihres Studios verkauft das Geschäft. Diese sollte die Person zeigen: ihre Designarbeit und ihre Musik, Seite an Seite, an einem Ort.",
    },
    solution: {
      en: "Scrolling down moves the page sideways through seven panels: intro, about, studio, music, story, accolades and contact. Each panel has its own reveals and parallax, in the same colours and type as her studio.",
      de: "Beim Scrollen bewegt sich die Seite seitwärts durch sieben Bereiche: Intro, Über mich, Studio, Musik, Geschichte, Auszeichnungen und Kontakt. Jeder Bereich hat eigene Animationen und Parallax, in den Farben und Schriften ihres Studios.",
    },
    highlights: [
      {
        en: "Horizontal storytelling driven by normal vertical scrolling",
        de: "Horizontales Erzählen, gesteuert durch normales Scrollen",
      },
      {
        en: "Seven panels with their own GSAP reveal and parallax effects",
        de: "Sieben Bereiche mit eigenen GSAP-Reveal- und Parallax-Effekten",
      },
      {
        en: "Shares the SP Design Studio palette and typography",
        de: "Teilt Farbpalette und Typografie von SP Design Studio",
      },
    ],
    outcome: none,
    stack: ["NextJS", "GSAP", "Lenis", "TailwindCSS"],
    year: "2026",
    status: "UPCOMING",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "02",
    slug: "sm-chemicals",
    title: { en: "SM-Chemicals (Redesign)", de: "SM-Chemicals (Relaunch)" },
    category: webCms,
    description: {
      en: "A new website for an industrial chemicals company: a catalog of 72 products with full specs, and an admin the team runs themselves.",
      de: "Eine neue Website für ein Industriechemie-Unternehmen: ein Katalog mit 72 Produkten und allen Spezifikationen, dazu ein Admin, den das Team selbst pflegt.",
    },
    client: "SM Chemicals",
    role: designDevCms,
    url: "https://smchemicals.co.in",
    repo: "",
    challenge: {
      en: "Buyers need exact specifications quickly, but the product range lived in documents and an old site that only a developer could change.",
      de: "Einkäufer brauchen schnell exakte Spezifikationen, doch das Sortiment steckte in Dokumenten und einer alten Website, die nur ein Entwickler ändern konnte.",
    },
    solution: {
      en: "A rebuilt site with the catalog in 13 categories, every product with its own spec table and image. Behind it is a custom admin on Supabase for products, page content, careers and a blog. Changes are saved as drafts, previewed and then published.",
      de: "Eine neu gebaute Website mit dem Katalog in 13 Kategorien, jedes Produkt mit eigener Spezifikationstabelle und Bild. Dahinter steht ein eigener Admin auf Supabase für Produkte, Seiteninhalte, Karriere und Blog. Änderungen werden als Entwurf gespeichert, in der Vorschau geprüft und dann veröffentlicht.",
    },
    highlights: [
      {
        en: "72 products with spec tables, grouped into 13 categories",
        de: "72 Produkte mit Spezifikationstabellen in 13 Kategorien",
      },
      {
        en: "Draft, preview and publish for every page, with an activity log",
        de: "Entwurf, Vorschau und Veröffentlichung für jede Seite, mit Aktivitätsprotokoll",
      },
      {
        en: "Custom roles that decide who can edit which section",
        de: "Eigene Rollen, die festlegen, wer welchen Bereich bearbeiten darf",
      },
      {
        en: "Blog with a rich-text editor",
        de: "Blog mit Rich-Text-Editor",
      },
      {
        en: "Contact form with branded emails via Resend, and a protected login",
        de: "Kontaktformular mit gebrandeten E-Mails über Resend und geschütztem Login",
      },
    ],
    outcome: none,
    stack: [
      "NextJS",
      "Supabase",
      "PostgreSQL",
      "GSAP",
      "TailwindCSS",
      "Resend",
    ],
    year: "2026",
    status: "ONGOING",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "03",
    slug: "sp-design-studio",
    title: { en: "SP Design Studio", de: "SP Design Studio" },
    category: webCms,
    description: {
      en: "A new website and content system for an interior design studio, so the team publishes projects, jobs and news without a developer.",
      de: "Eine neue Website und ein Content-System für ein Innenarchitekturstudio, damit das Team Projekte, Jobs und Neuigkeiten ohne Entwickler veröffentlicht.",
    },
    client: "SP Design Studio",
    role: designDevCms,
    url: "https://spdesignstudio.in",
    repo: "",
    challenge: {
      en: "The studio's work lives in photos and stories, but the old site was static: every new project, opening or award had to go through a developer.",
      de: "Die Arbeit des Studios lebt von Fotos und Geschichten, doch die alte Website war statisch: Jedes neue Projekt, jede Stelle und jede Auszeichnung musste über einen Entwickler laufen.",
    },
    solution: {
      en: "A fast site with GSAP motion and a custom admin on Supabase. The team edits every page as a draft, compares it with what's live, previews it and publishes when it's ready. Roles decide who can edit what, and every change is logged.",
      de: "Eine schnelle Website mit GSAP-Animationen und einem eigenen Admin auf Supabase. Das Team bearbeitet jede Seite als Entwurf, vergleicht sie mit der Live-Version, prüft sie in der Vorschau und veröffentlicht sie, wenn alles passt. Rollen regeln, wer was bearbeiten darf, und jede Änderung wird protokolliert.",
    },
    highlights: [
      {
        en: "Project galleries with an in-browser crop editor",
        de: "Projektgalerien mit Zuschneide-Editor im Browser",
      },
      {
        en: "Draft and publish workflow with a visual diff and preview",
        de: "Entwurf und Veröffentlichung mit visuellem Vergleich und Vorschau",
      },
      {
        en: "Instagram feed managed from the admin",
        de: "Instagram-Feed, im Admin verwaltet",
      },
      {
        en: "Careers page and a contact form that accepts PDF briefs",
        de: "Karriereseite und ein Kontaktformular, das PDF-Briefings annimmt",
      },
      {
        en: "SEO groundwork: structured data, sitemap and per-page metadata",
        de: "SEO-Grundlagen: strukturierte Daten, Sitemap und Metadaten pro Seite",
      },
      {
        en: "CMS self-hosted on a Linux (Fedora) server",
        de: "CMS selbst gehostet auf einem Linux-Server (Fedora)",
      },
    ],
    outcome: {
      en: "The studio runs its own site now: new projects, openings and news go live without touching code.",
      de: "Das Studio pflegt seine Website jetzt selbst: Neue Projekte, Stellen und Neuigkeiten gehen ohne eine Zeile Code online.",
    },
    stack: [
      "NextJS",
      "Supabase",
      "PostgreSQL",
      "GSAP",
      "TailwindCSS",
      "Resend",
    ],
    year: "2026",
    status: "COMPLETED",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "08",
    slug: "pooja-chemicals",
    title: { en: "Pooja Chemicals", de: "Pooja Chemicals" },
    category: { en: "Company website", de: "Firmenwebsite" },
    description: {
      en: "A website for a chemicals company that shows its products and industries clearly and turns visitors into enquiries.",
      de: "Eine Website für ein Chemieunternehmen, die Produkte und Branchen klar zeigt und Besucher zu Anfragen führt.",
    },
    client: "Pooja Chemicals",
    role: { en: "Full-stack development", de: "Full-Stack-Entwicklung" },
    url: "https://poojachemicals.in",
    repo: "",
    challenge: {
      en: "The company needed a modern site where buyers quickly find the right product for their industry and can get in touch straight away.",
      de: "Das Unternehmen brauchte eine moderne Website, auf der Einkäufer schnell das passende Produkt für ihre Branche finden und direkt Kontakt aufnehmen können.",
    },
    solution: {
      en: "I designed and built the site end to end in Next.js: products grouped by category, a page per industry, careers, and an enquiry form that lands in the team's inbox. Every push to GitHub deploys automatically to Vercel.",
      de: "Ich habe die Website komplett in Next.js entworfen und gebaut: Produkte nach Kategorien, eine Seite pro Branche, Karriere und ein Anfrageformular, das direkt im Postfach des Teams landet. Jeder Push auf GitHub geht automatisch auf Vercel live.",
    },
    highlights: [
      {
        en: "Product catalog organised by category",
        de: "Produktkatalog nach Kategorien geordnet",
      },
      {
        en: "Industries and careers pages",
        de: "Seiten für Branchen und Karriere",
      },
      {
        en: "Enquiry form delivered by email via Resend",
        de: "Anfrageformular mit E-Mail-Zustellung über Resend",
      },
      {
        en: "Client logos in a scrolling marquee",
        de: "Kundenlogos als laufendes Band",
      },
      {
        en: "Automatic deployments from GitHub to Vercel",
        de: "Automatische Deployments von GitHub zu Vercel",
      },
    ],
    outcome: none,
    stack: [
      "NextJS",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Vercel",
      "Resend",
    ],
    year: "2025",
    status: "COMPLETED",
    featured: false,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "04",
    slug: "autonomous-simulation",
    title: { en: "Autonomous Simulation", de: "Autonome Simulation" },
    category: {
      en: "Master's thesis · Robotics",
      de: "Masterarbeit · Robotik",
    },
    description: {
      en: "My master's thesis: a simulation tool for testing self-driving off-road vehicles in realistic virtual terrain before they reach a real field.",
      de: "Meine Masterarbeit: ein Simulationswerkzeug, mit dem autonome Offroad-Fahrzeuge in realistischem virtuellem Gelände getestet werden, bevor sie echtes Terrain erreichen.",
    },
    client: "Robotics Research Lab, RPTU Kaiserslautern",
    role: { en: "Master's thesis", de: "Masterarbeit" },
    url: "",
    repo: "",
    challenge: {
      en: "Testing autonomous vehicles off-road is slow, expensive and risky. The lab needed a way to run the same situations again and again, including critical ones, without a real vehicle in the field.",
      de: "Autonome Fahrzeuge im Gelände zu testen ist langsam, teuer und riskant. Das Labor brauchte einen Weg, dieselben Situationen immer wieder durchzuspielen, auch kritische, ohne echtes Fahrzeug im Feld.",
    },
    solution: {
      en: "I built a high-fidelity simulation environment in Unreal Engine and connected it to Finroc, the lab's C++/Java robotics framework. On top of it I designed learning scenarios, routine tests and critical test cases, and wrote a Python tool that turns the simulation data into clear performance and safety results.",
      de: "Ich habe eine realitätsnahe Simulationsumgebung in Unreal Engine gebaut und an Finroc angebunden, das C++/Java-Robotik-Framework des Labors. Darauf aufbauend habe ich Lernszenarien, Routinetests und kritische Testfälle entworfen und ein Python-Werkzeug geschrieben, das die Simulationsdaten in klare Leistungs- und Sicherheitsergebnisse übersetzt.",
    },
    highlights: [
      {
        en: "Realistic off-road environment in Unreal Engine (C++)",
        de: "Realistische Offroad-Umgebung in Unreal Engine (C++)",
      },
      {
        en: "Connected to the Finroc robotics framework",
        de: "Angebunden an das Robotik-Framework Finroc",
      },
      {
        en: "Learning scenarios, routine tests and critical test cases",
        de: "Lernszenarien, Routinetests und kritische Testfälle",
      },
      {
        en: "Python analysis tool for performance and safety results",
        de: "Python-Analysewerkzeug für Leistungs- und Sicherheitsergebnisse",
      },
    ],
    outcome: {
      en: "Vehicles can be tested repeatably, including situations that would be too risky to stage for real.",
      de: "Fahrzeuge lassen sich reproduzierbar testen, auch in Situationen, die in der Realität zu riskant wären.",
    },
    stack: ["Unreal Engine", "C++", "Finroc", "Python"],
    year: "2023",
    status: "COMPLETED",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "05",
    slug: "xr-frameworks",
    title: { en: "XR Frameworks", de: "XR-Frameworks" },
    category: {
      en: "Master's project · Human-Computer Interaction",
      de: "Masterprojekt · Mensch-Computer-Interaktion",
    },
    description: {
      en: "A master's project comparing OpenXR, Unity and Unreal Engine to find out which suits mixed, virtual and augmented reality development best.",
      de: "Ein Masterprojekt, das OpenXR, Unity und Unreal Engine vergleicht, um herauszufinden, was sich am besten für Mixed-, Virtual- und Augmented-Reality-Entwicklung eignet.",
    },
    client: "Human-Computer Interaction group, RPTU Kaiserslautern",
    role: { en: "Master's project", de: "Masterprojekt" },
    url: "",
    repo: "",
    challenge: {
      en: "XR teams have to choose a framework early, and switching later is expensive. There was little side-by-side evidence on how native and cross-platform options really compare.",
      de: "XR-Teams müssen sich früh für ein Framework entscheiden, und ein späterer Wechsel ist teuer. Es gab kaum direkte Vergleiche, wie native und plattformübergreifende Optionen wirklich abschneiden.",
    },
    solution: {
      en: "I analysed OpenXR, Unity and Unreal Engine across MR, VR and AR, then ran comparative tests and experiments on performance, compatibility and versatility, using Unity (C#), OpenXR and the Mixed Reality Toolkit.",
      de: "Ich habe OpenXR, Unity und Unreal Engine für MR, VR und AR analysiert und anschließend vergleichende Tests und Experimente zu Leistung, Kompatibilität und Vielseitigkeit durchgeführt, mit Unity (C#), OpenXR und dem Mixed Reality Toolkit.",
    },
    highlights: [
      {
        en: "Strengths and limits of native and cross-platform frameworks",
        de: "Stärken und Grenzen nativer und plattformübergreifender Frameworks",
      },
      {
        en: "Experiments on performance, compatibility and versatility",
        de: "Experimente zu Leistung, Kompatibilität und Vielseitigkeit",
      },
      {
        en: "Built with Unity (C#), OpenXR and the Mixed Reality Toolkit",
        de: "Umgesetzt mit Unity (C#), OpenXR und dem Mixed Reality Toolkit",
      },
    ],
    outcome: {
      en: "Documented findings and recommendations on which framework fits which kind of XR work, presented to the HCI group.",
      de: "Dokumentierte Ergebnisse und Empfehlungen, welches Framework zu welcher Art von XR-Arbeit passt, vorgestellt in der HCI-Arbeitsgruppe.",
    },
    stack: ["Unity", "C#", "OpenXR", "MRTK", "Unreal Engine", "Python"],
    year: "2022",
    status: "COMPLETED",
    featured: true,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "06",
    slug: "avirbhava",
    title: { en: "Avirbhava", de: "Avirbhava" },
    category: { en: "Company website", de: "Firmenwebsite" },
    description: {
      en: "A website for a civil engineering firm that presents its structural projects to new clients.",
      de: "Eine Website für ein Bauingenieurbüro, die seine Tragwerksprojekte neuen Kunden vorstellt.",
    },
    client: "Avirbhava",
    role: { en: "Full-stack development", de: "Full-Stack-Entwicklung" },
    url: "",
    repo: "",
    challenge: {
      en: "The firm needed a professional online presence to show its structural work to prospective clients.",
      de: "Das Büro brauchte einen professionellen Online-Auftritt, um seine Tragwerksprojekte potenziellen Kunden zu zeigen.",
    },
    solution: {
      en: "I built a server-rendered site in PHP with a database behind it, and a responsive layout that works the same in every browser.",
      de: "Ich habe eine serverseitig gerenderte Website in PHP mit Datenbankanbindung gebaut, dazu ein responsives Layout, das in jedem Browser gleich funktioniert.",
    },
    highlights: [
      {
        en: "Server-side rendering with PHP",
        de: "Serverseitiges Rendering mit PHP",
      },
      {
        en: "Project content served from a database",
        de: "Projektinhalte aus einer Datenbank",
      },
      {
        en: "Responsive, cross-browser layout",
        de: "Responsives, browserübergreifendes Layout",
      },
    ],
    outcome: none,
    stack: ["PHP", "JavaScript", "HTML", "CSS"],
    year: "2019",
    status: "ARCHIVED",
    featured: false,
    hidden: false,
    cover: "",
    images: [],
  },
  {
    id: "07",
    slug: "sm-chemicals-2018",
    title: { en: "SM-Chemicals (2018)", de: "SM-Chemicals (2018)" },
    category: { en: "Web front end", de: "Web-Frontend" },
    description: {
      en: "My first project for SM Chemicals: a modular React front end for the company's website, built from reusable components.",
      de: "Mein erstes Projekt für SM Chemicals: ein modulares React-Frontend für die Firmenwebsite, aufgebaut aus wiederverwendbaren Komponenten.",
    },
    client: "SM Chemicals",
    role: { en: "Full-stack development", de: "Full-Stack-Entwicklung" },
    url: "",
    repo: "",
    challenge: {
      en: "The company's website had to grow with its product range without being rebuilt every time something changed.",
      de: "Die Website des Unternehmens sollte mit dem Sortiment wachsen, ohne bei jeder Änderung neu gebaut zu werden.",
    },
    solution: {
      en: "Over two years I designed and built dynamic, modular interfaces in React and TypeScript, with reusable components and a cleaner client-side data flow.",
      de: "Über zwei Jahre habe ich dynamische, modulare Oberflächen mit React und TypeScript entworfen und gebaut, mit wiederverwendbaren Komponenten und einem saubereren Datenfluss im Client.",
    },
    highlights: [
      {
        en: "Reusable, scalable front-end components",
        de: "Wiederverwendbare, skalierbare Frontend-Komponenten",
      },
      {
        en: "Optimised client-side data flow",
        de: "Optimierter Datenfluss im Client",
      },
    ],
    outcome: none,
    stack: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    year: "2018",
    status: "COMPLETED",
    featured: false,
    hidden: false,
    cover: "",
    images: [],
  },
];
