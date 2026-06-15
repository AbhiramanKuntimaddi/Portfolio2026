export const site = {
  url: "https://abhiramankuntimaddi.com",
  name: "Abhiraman Kuntimaddi",
  title: "Abhiraman Kuntimaddi — Software & Machine Learning Engineer",
  description:
    "Abhiraman Kuntimaddi is a software and machine-learning engineer based in Germany — building high-load Java systems, recommendation engines, neural networks, and modern web experiences with Next.js and GSAP.",
  locale: "en_US",
  author: "Abhiraman Kuntimaddi",
  jobTitle: "Software & Machine Learning Engineer",
  email: "abhiraman21696@gmail.com",
  keywords: [
    "Abhiraman Kuntimaddi",
    "Software Engineer",
    "Machine Learning Engineer",
    "Recommendation Systems",
    "Neural Networks",
    "Java Developer",
    "Python",
    "Next.js",
    "GSAP",
    "Full-Stack Developer",
    "Germany",
    "Portfolio",
  ],
  sameAs: [
    "https://github.com/AbhiramanKuntimaddi",
    "https://www.linkedin.com/in/abhiraman-kuntimaddi-93b037112",
    "https://www.instagram.com/abhiraman.kuntimaddi/",
  ],
} as const;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}/images/Profile.jpg`,
    jobTitle: site.jobTitle,
    email: site.email,
    description: site.description,
    worksFor: {
      "@type": "Organization",
      name: "SoftDeCC Software GmbH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "RPTU Kaiserslautern",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
    knowsAbout: [
      "Java",
      "Python",
      "Machine Learning",
      "Recommendation Systems",
      "Neural Networks",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "GSAP",
    ],
    sameAs: site.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}
