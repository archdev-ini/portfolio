import { fetchAPI, getStrapiMedia } from "./strapi";
import { SYSTEM_METADATA } from "../data/metadata";

// Re-defining interfaces here to avoid depending on data files we are replacing
// In a real refactor, these should move to types/index.ts
export interface Theme {
  id: string;
  slug: string;
  title: string;
  yearRange: string;
  thematicStatement: string;
  keyQuestions: string[];
  systemsExplored: string[];
  relatedOutputs: { id: string; title: string; type: string }[];
  status: 'Active' | 'Archived';
  thesis: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  type: string;
  description: string;
  themeId: string;
  tools: string[];
  systems: string[];
  status: string;
  imagePlaceholder?: unknown;
  imageUrl?: string | null;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Profile {
  name?: string;
  email: string;
  location?: string;
  availability?: string;

  substackUrl?: string;
  startYear?: number;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface HomePage {
  heroHeadline: string;
  heroTagline: string;
  aboutHeading: string;
  aboutText: string;
}

// Mapper function to transform Strapi response to our interface
interface StrapiItem {
    id: number;
    // v5 uses flat structure, so fields are directly here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; 
}

function mapTheme(item: StrapiItem): Theme {
    // In v5, item IS the attributes (plus id, documentId etc)
    const attr = item;
    return {
        id: item.id.toString(),
        slug: attr.slug,
        title: attr.title,
        yearRange: attr.yearRange,
        thematicStatement: attr.thematicStatement,
        keyQuestions: attr.keyQuestions || [], 
        systemsExplored: attr.systemsExplored || [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relatedOutputs: (item.projects || []).map((p: any) => ({
             id: p.slug || p.id.toString(), // Use slug if available for links, or ID
             title: p.title,
             type: p.type
        })), 
        status: attr.themeStatus || "Active", // Mapped from new field name
        thesis: attr.thesis
    };
}

function mapProject(item: StrapiItem): Project {
    const attr = item;
    return {
        id: item.id.toString(),
        title: attr.title,
        year: attr.year,
        type: attr.type,
        description: attr.description,
        themeId: attr.theme?.slug, // v5 relation is flattened or object directly
        tools: attr.tools || [],

        systems: attr.systems || [],
        status: attr.status,
        imageUrl: getStrapiMedia(attr.imagePlaceholder?.url || null),
    };
}

export async function getActiveTheme(): Promise<Theme | undefined> {
  const data = await fetchAPI("/themes", {
      filters: { themeStatus: "Active" },
      populate: "*"
  });
  if (!data || !data.data || data.data.length === 0) return undefined;
  return mapTheme(data.data[0]);
}

export async function getArchivedThemes(): Promise<Theme[]> {
  const data = await fetchAPI("/themes", {
      filters: { themeStatus: "Archived" },
      populate: "*"
  });
  if (!data?.data) return [];
  return data.data.map(mapTheme);
}

export async function getThemeBySlug(slug: string): Promise<Theme | undefined> {
  const data = await fetchAPI("/themes", {
      filters: { slug: slug },
      populate: "*"
  });
  if (!data?.data?.length) return undefined;
  return mapTheme(data.data[0]);
}

export async function getAllProjects(): Promise<Project[]> {
    const data = await fetchAPI("/projects", { populate: "*" });
    if (!data?.data) return [];
    return data.data.map(mapProject);
}

export async function getProjectsByTheme(themeId: string): Promise<Project[]> {
    // themeId here matches the slug of the theme based on previous logic
    const data = await fetchAPI("/projects", {
        filters: { theme: { slug: themeId } },
        populate: "*"
    });
    if (!data?.data) return [];
    return data.data.map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
     // Checking if 'id' passed is the Strapi ID (number) or slug. 
     // The current app uses string IDs (slug-like). Let's search by slug first.
    const data = await fetchAPI("/projects", {
        filters: { slug: id },
        populate: "*"
    });
     if (data?.data?.length > 0) return mapProject(data.data[0]);

     // Fallback to ID check if needed, but assuming slug usage
     return undefined;
}


export async function getAllSkills(): Promise<SkillCategory[]> {
    const data = await fetchAPI("/skill-categories", { populate: "*" });
     if (!data?.data || data.data.length === 0) {
        // Fallback to default skills if CMS is empty
        return [
           { title: "Design", skills: ["Architecture", "Interior Design", "Urban Planning"] },
           { title: "Technical", skills: ["TypeScript", "React", "Next.js", "Node.js"] },
           { title: "Tools", skills: ["Rhino", "Revit", "Figma", "Adobe Suite"] }
        ];
     }
     return data.data.map((item: StrapiItem) => ({
         title: item.title,
         skills: item.skills || []
     }));
}

export async function getProfile(): Promise<Profile | undefined> {
    const data = await fetchAPI("/profile", { populate: "*" });
     if (!data?.data) {
        // Fallback profile
        return {
            name: SYSTEM_METADATA.name,
            email: "hello@inioluwa.com",
            location: SYSTEM_METADATA.location.primary,
            availability: "Available for new projects",
            socialLinks: [
                { platform: "Twitter", url: "https://twitter.com" },
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" }
            ]
        };
     }
     const attr = data.data; // v5 flat structure for single types
     return {
         name: attr.name,
         email: attr.email,
         location: attr.location,
         availability: attr.availability,
         substackUrl: attr.substackUrl,
         startYear: attr.startYear,
         socialLinks: attr.socialLinks || []
     };
}

export async function getHomePage(): Promise<HomePage | undefined> {
    const data = await fetchAPI("/home-page");
     if (!data?.data) {
        // Fallback content matches hardcoded data
        return {
            heroHeadline: "Designing systems for the built environment.",
            heroTagline: SYSTEM_METADATA.tagline,
            aboutHeading: "Architecture is not limited to form.",
            aboutText: "My work is grounded in systems thinking..."
        };
     }
     const attr = data.data;
     return {
         heroHeadline: attr.heroHeadline,
         heroTagline: attr.heroTagline,
         aboutHeading: attr.aboutHeading,
         aboutText: attr.aboutText
     };
}
