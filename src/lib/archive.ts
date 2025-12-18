import { client, ACTIVE_THEME_QUERY, ARCHIVED_THEMES_QUERY, ALL_PROJECTS_QUERY, PROJECTS_BY_THEME_QUERY, THEME_BY_SLUG_QUERY, SKILLS_QUERY, PROFILE_QUERY, HOME_QUERY } from "./sanity";
import { Theme } from "../data/themes";
import { Project } from "../data/projects";
import { PortableTextBlock } from "sanity";

// Raw Sanity interfaces
interface SanityTheme extends Omit<Theme, 'slug' | 'relatedOutputs'> {
  slug: { current: string };
  relatedOutputs: Theme['relatedOutputs'];
}

interface SanityProject extends Omit<Project, 'id' | 'imagePlaceholder'> {
  _id: string;
  mainImage?: Record<string, unknown>;
}

export async function getActiveTheme(): Promise<Theme | undefined> {
  const theme = await client.fetch<SanityTheme>(ACTIVE_THEME_QUERY);
  if (!theme) return undefined;
  return {
    ...theme,
    slug: theme.slug.current,
    relatedOutputs: theme.relatedOutputs || []
  };
}

export async function getArchivedThemes(): Promise<Theme[]> {
  const themes = await client.fetch<SanityTheme[]>(ARCHIVED_THEMES_QUERY);
  return themes.map((theme) => ({
    ...theme,
    slug: theme.slug.current,
    relatedOutputs: theme.relatedOutputs || []
  }));
}

export async function getThemeBySlug(slug: string): Promise<Theme | undefined> {
  const theme = await client.fetch<SanityTheme>(THEME_BY_SLUG_QUERY, { slug });
  if (!theme) return undefined;
  return {
    ...theme,
    slug: theme.slug.current,
    relatedOutputs: theme.relatedOutputs || []
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await client.fetch<SanityProject[]>(ALL_PROJECTS_QUERY);
  return projects.map((project) => ({
    ...project,
    id: project._id,
    type: project.type,
    imagePlaceholder: project.mainImage ? "GALLERY" : undefined
  }));
}

export async function getProjectsByTheme(themeId: string): Promise<Project[]> {
  const projects = await client.fetch<SanityProject[]>(PROJECTS_BY_THEME_QUERY, { themeId });
  return projects.map((project) => ({
    ...project,
    id: project._id,
    type: project.type,
    imagePlaceholder: project.mainImage ? "GALLERY" : undefined
  }));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const project = await client.fetch<SanityProject>(`*[_type == "project" && _id == $id][0]`, { id });
  if (!project) return undefined;
  return {
    ...project,
    id: project._id,
    type: project.type
  };
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
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface HomePage {
  heroHeadline: PortableTextBlock[];
  heroTagline: string;
  aboutHeading: string;
  aboutText: PortableTextBlock[];
}

export async function getAllSkills(): Promise<SkillCategory[]> {
  return await client.fetch<SkillCategory[]>(SKILLS_QUERY);
}

export async function getProfile(): Promise<Profile | undefined> {
  return await client.fetch<Profile>(PROFILE_QUERY);
}

export async function getHomePage(): Promise<HomePage | undefined> {
  return await client.fetch<HomePage>(HOME_QUERY);
}
