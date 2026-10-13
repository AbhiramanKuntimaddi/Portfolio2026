export interface SectionInfo {
  key: string;
  title: string;
  about: string;
}

export interface FieldInfo {
  label: string;
  hint?: string;
}

export const COPY_SECTIONS: SectionInfo[] = [
  {
    key: "hero",
    title: "Intro",
    about:
      "The first screen: your title, the one-line pitch and the strip at the bottom.",
  },
  {
    key: "about",
    title: "About",
    about:
      "The quote, the two paragraphs next to your photo, and which words are highlighted.",
  },
  {
    key: "skills",
    title: "Skills",
    about:
      "The heading screen before the skill groups. The groups themselves are under Skills.",
  },
  {
    key: "experience",
    title: "Experience",
    about:
      "The heading screen before your jobs. The jobs themselves are under Experience.",
  },
  {
    key: "projects",
    title: "Work section",
    about:
      "The heading screen before the featured projects, buttons and status names.",
  },
  {
    key: "contact",
    title: "Contact",
    about: "The closing section: headline, intro line and the form.",
  },
  {
    key: "footer",
    title: "Footer",
    about: "The small credits line at the very bottom.",
  },
  {
    key: "status",
    title: "Status lines",
    about: "The live availability lines next to your name and in the footer.",
  },
  {
    key: "work",
    title: "All projects page",
    about: "The /work page that lists every project.",
  },
  {
    key: "archive",
    title: "Project pages",
    about: "Labels on each project's own page.",
  },
  {
    key: "nav",
    title: "Section names",
    about: "Names shown in the top-left path and its menu.",
  },
  {
    key: "meta",
    title: "Search & sharing",
    about: "What Google and link previews show for the homepage.",
  },
  {
    key: "ui",
    title: "Small labels",
    about: "Loading screen, 404 page and other bits of interface text.",
  },
];

export const COPY_FIELDS: Record<string, FieldInfo> = {
  "meta.title": {
    label: "Page title",
    hint: "Browser tab and Google result title",
  },
  "meta.description": {
    label: "Description",
    hint: "The grey text under the title in Google and link previews",
  },

  "nav.hero": { label: "Intro" },
  "nav.about": { label: "About" },
  "nav.skills": { label: "Skills" },
  "nav.experience": { label: "Experience" },
  "nav.projects": { label: "Work" },
  "nav.contact": { label: "Contact" },
  "nav.goTo": { label: "“Go to” prefix", hint: "Screen readers only" },
  "nav.backToTop": { label: "“Back to top”", hint: "Screen readers only" },
  "nav.menu": { label: "Sections menu name", hint: "Screen readers only" },

  "hero.role": { label: "Job title", hint: "Under your name" },
  "hero.based": { label: "Location line", hint: "Right of your name" },
  "hero.degree": { label: "Degree line", hint: "Under the location" },
  "hero.objectiveLabel": {
    label: "Pitch label",
    hint: "Small blue label above the pitch",
  },
  "hero.objective.lead": { label: "Pitch · start", hint: "Plain white words" },
  "hero.objective.muted": {
    label: "Pitch · grey part",
    hint: "Light italic words",
  },
  "hero.objective.join": { label: "Pitch · linking word" },
  "hero.objective.accent": {
    label: "Pitch · blue part",
    hint: "Bold blue italic words at the end",
  },
  "hero.cta": {
    label: "Contact button",
    hint: "Keep the Code_Style if you like it",
  },
  "hero.rootsLabel": { label: "Strip · left label" },
  "hero.roots": { label: "Strip · left text" },
  "hero.nowPlaying": { label: "Strip · music label" },
  "hero.offline": { label: "Strip · nothing playing" },
  "hero.albumArt": {
    label: "Album cover alt text",
    hint: "Screen readers only",
  },
  "hero.focusLabel": { label: "Strip · right label" },
  "hero.focus": { label: "Strip · right text" },

  "about.label": { label: "Small label", hint: "Above the quote" },
  "about.quote": { label: "Quote" },
  "about.quoteAccentFrom": {
    label: "Blue from word #",
    hint: "Count words from 0; everything from that word on turns blue",
  },
  "about.p1": { label: "First paragraph" },
  "about.p1Emphasis": {
    label: "First paragraph · highlighted words",
    hint: "Comma-separated, exactly as written in the paragraph",
  },
  "about.p2": { label: "Second paragraph" },
  "about.p2Emphasis": {
    label: "Second paragraph · highlighted words",
    hint: "Comma-separated",
  },
  "about.photoAlt": {
    label: "Photo description",
    hint: "Screen readers and Google Images",
  },

  "skills.label": { label: "Small label" },
  "skills.line1": { label: "Heading · line 1" },
  "skills.line2": { label: "Heading · line 2", hint: "Shown in blue italics" },
  "skills.intro": { label: "Intro sentence" },

  "experience.label": { label: "Small label" },
  "experience.line1": { label: "Heading · line 1" },
  "experience.line2": {
    label: "Heading · line 2",
    hint: "Shown in blue italics",
  },
  "experience.intro": { label: "Intro sentence" },

  "projects.label": { label: "Small label" },
  "projects.line1": { label: "Heading · line 1" },
  "projects.line2": {
    label: "Heading · line 2",
    hint: "Shown in blue italics",
  },
  "projects.intro": { label: "Intro sentence" },
  "projects.readMore": { label: "Project button" },
  "projects.all": { label: "All-projects link" },
  "projects.more": { label: "“+3 more in /work” wording" },
  "projects.status.UPCOMING": { label: "Status · upcoming" },
  "projects.status.ONGOING": { label: "Status · ongoing" },
  "projects.status.COMPLETED": { label: "Status · completed" },
  "projects.status.ARCHIVED": { label: "Status · archived" },

  "work.metaTitle": { label: "Browser tab title" },
  "work.label": { label: "Small label" },
  "work.line1": { label: "Heading · line 1" },
  "work.line2": { label: "Heading · line 2", hint: "Shown in blue italics" },
  "work.intro": { label: "Intro sentence" },
  "work.search": { label: "Search label" },
  "work.searchPlaceholder": { label: "Search placeholder" },
  "work.all": { label: "“All” filter" },
  "work.empty": { label: "No results message" },
  "work.back": { label: "Back link" },
  "work.shown": { label: "“shown” counter word" },

  "contact.tag": { label: "Small label", hint: "Above the headline" },
  "contact.line1": { label: "Headline · line 1" },
  "contact.line2": {
    label: "Headline · line 2",
    hint: "Shown in blue italics",
  },
  "contact.lead": {
    label: "Intro sentence",
    hint: "Your email address is added after it",
  },
  "contact.name": { label: "Form · name label" },
  "contact.namePlaceholder": { label: "Form · name placeholder" },
  "contact.email": { label: "Form · email label" },
  "contact.message": { label: "Form · message label" },
  "contact.messagePlaceholder": { label: "Form · message placeholder" },
  "contact.send": { label: "Send button" },
  "contact.sending": { label: "Send button · sending" },
  "contact.sent": { label: "Send button · sent" },
  "contact.failed": { label: "Send button · failed" },
  "contact.elsewhere": { label: "Social links label" },

  "status.building": {
    label: "“Currently building” prefix",
    hint: "Followed by your ongoing projects",
  },
  "status.work": {
    label: "During work hours",
    hint: "Mon–Fri, 9:00–17:00 Berlin time",
  },
  "status.evening": { label: "After work hours" },
  "status.weekend": { label: "Weekends" },

  "footer.animated": { label: "“animated by”" },
  "footer.scrolled": { label: "“scrolled by”" },
  "footer.styled": { label: "“styled by”" },
  "footer.stored": { label: "“stored in”" },
  "footer.delivered": { label: "“delivered through”" },
  "footer.shipped": { label: "“shipped by”" },

  "archive.back": { label: "Back link" },
  "archive.builtWith": { label: "Tech stack label" },
  "archive.pending": { label: "No images · label" },
  "archive.pendingBody": { label: "No images · sentence" },
  "archive.cta": { label: "Contact link" },
  "archive.notFound": { label: "Missing project title" },
  "archive.client": { label: "Facts · client" },
  "archive.role": { label: "Facts · my role" },
  "archive.year": { label: "Facts · year" },
  "archive.status": { label: "Facts · status" },
  "archive.live": { label: "Live site link" },
  "archive.code": { label: "Code link" },
  "archive.brief": { label: "Section · the brief" },
  "archive.built": { label: "Section · what I built" },
  "archive.features": { label: "Section · key features" },
  "archive.outcome": { label: "Section · outcome" },
  "archive.gallery": { label: "Section · gallery" },
  "archive.next": { label: "Next project link" },

  "ui.language": { label: "Language switch name", hint: "Screen readers only" },
  "ui.themeToLight": {
    label: "Theme button · to light",
    hint: "Tooltip and screen readers",
  },
  "ui.themeToDark": {
    label: "Theme button · to dark",
    hint: "Tooltip and screen readers",
  },
  "ui.items": { label: "“items” counter word" },
  "ui.tools": { label: "“tools” counter word" },
  "ui.view": { label: "Cursor label on images" },
  "ui.preloader.system": { label: "Loading screen · top label" },
  "ui.preloader.loading": { label: "Loading screen · progress label" },
  "ui.notFound.tag": { label: "404 · small label" },
  "ui.notFound.titleTop": { label: "404 · heading line 1" },
  "ui.notFound.titleAccent": { label: "404 · heading line 2" },
  "ui.notFound.body": { label: "404 · sentence" },
  "ui.notFound.cta": { label: "404 · home link" },
};
