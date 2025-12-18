import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'gb49cubf',
  dataset: 'production',
  apiVersion: '2024-12-18',
  useCdn: false, // Disabled to ensure fresh data updates
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ Queries
export const ACTIVE_THEME_QUERY = `*[_type == "theme" && status == "Active"][0]`
export const ARCHIVED_THEMES_QUERY = `*[_type == "theme" && status == "Archived"] | order(yearRange desc)`
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(year desc)`
export const PROJECTS_BY_THEME_QUERY = `*[_type == "project" && theme._ref == $themeId] | order(year desc)`
export const THEME_BY_SLUG_QUERY = `*[_type == "theme" && slug.current == $slug][0]`
export const SKILLS_QUERY = `*[_type == "skillCategory"] | order(order asc)`
export const PROFILE_QUERY = `*[_type == "profile"][0]`
export const HOME_QUERY = `*[_type == "homePage"][0]`
