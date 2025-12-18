export const SYSTEM_METADATA = {
  name: "Inioluwa Oladipupo",
  title: "Architecture Student & Systems Thinker",
  portfolioStartYear: 2026,
  location: {
    primary: "Lagos, NG",
    coordinates: "6.5244° N, 3.3792° E",
    base: "Lagos — London"
  },
  tagline: "An evolving architectural archive exploring the relationships between ecology, culture, and technology.",
  substackRss: "https://your-substack.substack.com/feed", // Placeholder, user will provide
};

export const SYSTEMS = [
  "Ecological Systems",
  "Cultural Heritage",
  "Digital Workflows",
  "Urban Morphology",
  "Thermal Materiality",
  "Speculative Futures"
] as const;

export type SystemTag = typeof SYSTEMS[number];
