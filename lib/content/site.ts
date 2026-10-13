import { localize, type Locale, type Localized, type Widen } from "@/lib/i18n";

const content = {
  meta: {
    title: {
      en: "Abhiraman Kuntimaddi — Software & Machine Learning Engineer",
      de: "Abhiraman Kuntimaddi — Software- & Machine-Learning-Engineer",
    },
    description: {
      en: "Abhiraman Kuntimaddi is a software and machine-learning engineer based in Germany — building high-load Java systems, recommendation engines, neural networks, and modern web experiences with Next.js and GSAP.",
      de: "Abhiraman Kuntimaddi ist Software- und Machine-Learning-Engineer in Deutschland — er entwickelt hochlastfähige Java-Systeme, Empfehlungssysteme, neuronale Netze und moderne Web-Erlebnisse mit Next.js und GSAP.",
    },
  },

  nav: {
    hero: { en: "intro", de: "intro" },
    about: { en: "about", de: "über" },
    skills: { en: "skills", de: "skills" },
    experience: { en: "experience", de: "erfahrung" },
    projects: { en: "work", de: "projekte" },
    contact: { en: "contact", de: "kontakt" },
    goTo: { en: "Go to", de: "Gehe zu" },
    backToTop: { en: "Back to top", de: "Zurück nach oben" },
    menu: { en: "Sections", de: "Bereiche" },
  },

  hero: {
    role: { en: "Software Developer", de: "Softwareentwickler" },
    based: { en: "Based in Germany", de: "Lebt in Deutschland" },
    degree: { en: "M.Sc. Computer Science", de: "M.Sc. Informatik" },
    objectiveLabel: { en: "What I do", de: "Was ich mache" },
    objective: {
      lead: { en: "I connect", de: "Ich verbinde" },
      muted: { en: "solid backend systems", de: "solide Backend-Systeme" },
      join: { en: "with", de: "mit" },
      accent: {
        en: "interfaces people enjoy",
        de: "Oberflächen, die Freude machen",
      },
    },
    cta: { en: "Start_Conversation", de: "Gespräch_starten" },
    rootsLabel: { en: "Background", de: "Hintergrund" },
    roots: {
      en: "Industrial systems & scalable software",
      de: "Industrielle Systeme & skalierbare Software",
    },
    nowPlaying: { en: "Now_Playing", de: "Läuft_gerade" },
    offline: {
      en: "Offline · nothing playing",
      de: "Offline · gerade läuft nichts",
    },
    albumArt: { en: "Album art", de: "Albumcover" },
    focusLabel: { en: "Focus", de: "Fokus" },
    focus: {
      en: "Interfaces, websites & digital products",
      de: "Interfaces, Websites & digitale Produkte",
    },
  },

  about: {
    label: { en: "How I work", de: "Wie ich arbeite" },
    quote: {
      en: "“Design is not just what it looks like, it is how it works.”",
      de: "„Design ist nicht nur, wie es aussieht, sondern wie es funktioniert.“",
    },
    quoteAccentFrom: { en: "8", de: "7" },
    p1: {
      en: "I build the parts you don't see: backend services, machine-learning models in Python, and the web interfaces on top. My goal is software that stays clear when real people use it.",
      de: "Ich baue die Teile, die man nicht sieht: Backend-Services, Machine-Learning-Modelle in Python und die Web-Oberflächen darüber. Mein Ziel ist Software, die auch im echten Einsatz klar bleibt.",
    },
    p1Emphasis: {
      en: "backend,machine-learning,clear",
      de: "backend-services,machine-learning-modelle,klar",
    },
    p2: {
      en: "Good software feels obvious. I remove friction until only the intent is left.",
      de: "Gute Software wirkt selbstverständlich. Ich entferne Reibung, bis nur noch die Absicht übrig bleibt.",
    },
    p2Emphasis: {
      en: "obvious,friction,intent",
      de: "selbstverständlich,reibung,absicht",
    },
    photoAlt: {
      en: "Portrait of Abhiraman Kuntimaddi",
      de: "Porträt von Abhiraman Kuntimaddi",
    },
  },

  skills: {
    label: { en: "Skills", de: "Fähigkeiten" },
    line1: { en: "What I", de: "Womit ich" },
    line2: { en: "work with.", de: "arbeite." },
    intro: {
      en: "The languages, engines and tools I use every day.",
      de: "Die Sprachen, Engines und Tools, die ich täglich nutze.",
    },
  },

  experience: {
    label: { en: "Experience", de: "Erfahrung" },
    line1: { en: "Where I've", de: "Meine" },
    line2: { en: "worked.", de: "Stationen." },
    intro: {
      en: "From high-load Java platforms to XR research: the road so far.",
      de: "Von Java-Plattformen unter hoher Last bis zur XR-Forschung: mein bisheriger Weg.",
    },
  },

  projects: {
    label: { en: "Projects 2017–2026", de: "Projekte 2017–2026" },
    line1: { en: "Selected", de: "Ausgewählte" },
    line2: { en: "work.", de: "Projekte." },
    intro: {
      en: "Recent projects, newest first.",
      de: "Aktuelle Projekte, die neuesten zuerst.",
    },
    readMore: { en: "read more", de: "mehr lesen" },
    all: { en: "all projects", de: "alle projekte" },
    more: { en: "more in", de: "weitere in" },
    status: {
      COMPLETED: { en: "completed", de: "abgeschlossen" },
      ONGOING: { en: "ongoing", de: "in arbeit" },
      ARCHIVED: { en: "archived", de: "archiviert" },
      UPCOMING: { en: "upcoming", de: "geplant" },
    },
  },

  work: {
    metaTitle: { en: "All projects", de: "Alle Projekte" },
    label: { en: "Index", de: "Index" },
    line1: { en: "All", de: "Alle" },
    line2: { en: "projects.", de: "Projekte." },
    intro: {
      en: "Everything I've built, newest first. Filter by status or search by name, tech or year.",
      de: "Alles, was ich gebaut habe, die neuesten zuerst. Filtere nach Status oder suche nach Name, Technik oder Jahr.",
    },
    search: { en: "search", de: "suche" },
    searchPlaceholder: {
      en: "title, tech, year…",
      de: "titel, technik, jahr…",
    },
    all: { en: "all", de: "alle" },
    empty: { en: "no projects match.", de: "keine passenden projekte." },
    back: { en: "back to home", de: "zur startseite" },
    shown: { en: "shown", de: "angezeigt" },
  },
  contact: {
    tag: { en: "say hello", de: "sag hallo" },
    line1: { en: "Let's", de: "Lass uns" },
    line2: { en: "talk.", de: "reden." },
    lead: {
      en: "Use the form, pick a channel, or email me at",
      de: "Nutze das Formular, einen der Kanäle oder schreib mir an",
    },
    name: { en: "name", de: "name" },
    namePlaceholder: { en: "your name", de: "dein name" },
    email: { en: "email", de: "e-mail" },
    message: { en: "message", de: "nachricht" },
    messagePlaceholder: {
      en: "what's on your mind?",
      de: "was liegt dir auf dem herzen?",
    },
    send: { en: "send", de: "senden" },
    sending: { en: "sending…", de: "wird gesendet…" },
    sent: { en: "sent ✓", de: "gesendet ✓" },
    failed: {
      en: "failed — try again",
      de: "fehlgeschlagen — nochmal versuchen",
    },
    elsewhere: { en: "elsewhere", de: "anderswo" },
  },

  status: {
    building: { en: "currently building", de: "baut gerade" },
    weekend: {
      en: "off the clock · weekend builds welcome",
      de: "feierabend · wochenendprojekte willkommen",
    },
    work: {
      en: "9-to-5 at SoftDeCC Software GmbH",
      de: "9-to-5 bei SoftDeCC Software GmbH",
    },
    evening: {
      en: "side projects after hours",
      de: "nebenprojekte nach feierabend",
    },
  },

  footer: {
    animated: { en: "animated by", de: "animiert mit" },
    scrolled: { en: "scrolled by", de: "gescrollt mit" },
    styled: { en: "styled by", de: "gestylt mit" },
    stored: { en: "stored in", de: "gespeichert in" },
    delivered: { en: "delivered through", de: "zugestellt über" },
    shipped: { en: "shipped by", de: "ausgeliefert mit" },
  },

  archive: {
    back: { en: "back_to_index", de: "zurück_zum_index" },
    builtWith: { en: "built with", de: "gebaut mit" },
    pending: { en: "images_upload_pending", de: "bilder_folgen" },
    pendingBody: {
      en: "Visual assets for this deployment will be uploaded soon.",
      de: "Bildmaterial zu diesem Projekt folgt in Kürze.",
    },
    cta: { en: "start_conversation", de: "gespräch_starten" },
    notFound: { en: "Project not found", de: "Projekt nicht gefunden" },
    client: { en: "client", de: "kunde" },
    role: { en: "my role", de: "meine rolle" },
    year: { en: "year", de: "jahr" },
    status: { en: "status", de: "status" },
    live: { en: "visit site", de: "website besuchen" },
    code: { en: "view code", de: "code ansehen" },
    brief: { en: "the brief", de: "die aufgabe" },
    built: { en: "what i built", de: "was ich gebaut habe" },
    features: { en: "key features", de: "funktionen" },
    outcome: { en: "outcome", de: "ergebnis" },
    gallery: { en: "gallery", de: "galerie" },
    next: { en: "next project", de: "nächstes projekt" },
  },

  ui: {
    language: { en: "Language", de: "Sprache" },
    themeToLight: {
      en: "Switch to light theme",
      de: "Zum hellen Design wechseln",
    },
    themeToDark: {
      en: "Switch to dark theme",
      de: "Zum dunklen Design wechseln",
    },
    items: { en: "items", de: "Einträge" },
    tools: { en: "tools", de: "Tools" },
    view: { en: "view", de: "ansehen" },

    preloader: {
      system: { en: "Portfolio_System", de: "Portfolio_System" },
      loading: { en: "Loading_Assets", de: "Lade_Assets" },
    },

    notFound: {
      tag: {
        en: "error 404 · route not found",
        de: "fehler 404 · route nicht gefunden",
      },
      titleTop: { en: "Lost in", de: "Verloren im" },
      titleAccent: { en: "Transit.", de: "Transit." },
      body: {
        en: "This page drifted off the map — or never existed. Everything else is still right where it should be.",
        de: "Diese Seite ist von der Karte verschwunden — oder existierte nie. Alles andere ist genau dort, wo es sein sollte.",
      },
      cta: { en: "return_home", de: "zur_startseite" },
    },
  },
} as const;

export type Copy = Widen<typeof content>;

export const siteCopy: Copy = content;

export type Content = Localized<Copy>;

export function getContent(locale: Locale, copy: Copy = siteCopy): Content {
  return localize(copy, locale);
}
