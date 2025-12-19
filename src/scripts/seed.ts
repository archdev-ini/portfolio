import { themes } from "../data/themes";
import { projects } from "../data/projects";
import { SYSTEM_METADATA } from "../data/metadata";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN; // Needs full access

if (!STRAPI_TOKEN) {
  console.error("Error: STRAPI_ADMIN_TOKEN is not set in environment variables.");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

async function seed() {
  console.log("🌱 Starting seeding process...");

  // 1. Seed Themes
  console.log("... Seeding Themes");
  const themeSlugToId = new Map<string, number>();

  for (const theme of themes) {
    // Check if exists
    const search = await fetch(`${STRAPI_URL}/api/themes?filters[slug][$eq]=${theme.slug}`, { headers });
    const searchData = await search.json();
    
    let themeId;

    if (searchData.data && searchData.data.length > 0) {
        console.log(`   Theme '${theme.title}' already exists. Skipping creation, updating ID map.`);
        themeId = searchData.data[0].id;
    } else {
        const res = await fetch(`${STRAPI_URL}/api/themes`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              data: {
                title: theme.title,
                slug: theme.slug,
                yearRange: theme.yearRange,
                thematicStatement: theme.thematicStatement,
                keyQuestions: theme.keyQuestions,
                systemsExplored: theme.systemsExplored,
                status: theme.status,
                thesis: theme.thesis
              },
            }),
          });
      
          if (!res.ok) {
            console.error(`Status: ${res.status}`);
            console.error(await res.text());
            continue;
          }
      
          const data = await res.json();
          themeId = data.data.id;
          console.log(`   Created Theme: ${theme.title}`);
    }
    themeSlugToId.set(theme.slug, themeId);
  }

  // 2. Seed Projects
  console.log("... Seeding Projects");
  for (const project of projects) {
     // Check if exists
     const search = await fetch(`${STRAPI_URL}/api/projects?filters[slug][$eq]=${project.id}`, { headers }); // project.id is the slug in local data
     const searchData = await search.json();

     if (searchData.data && searchData.data.length > 0) {
        console.log(`   Project '${project.title}' already exists. Skipping.`);
        continue;
     }

    const themeId = themeSlugToId.get(project.themeId);

    const res = await fetch(`${STRAPI_URL}/api/projects`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          title: project.title,
          slug: project.id, // Mapping id to slug
          year: project.year,
          type: project.type,
          description: project.description,
          tools: project.tools,
          systems: project.systems,
          status: project.status,
          theme: themeId // Connect relation
        },
      }),
    });

    if (!res.ok) {
        console.error(`Status: ${res.status}`);
        console.error(await res.text());
        continue;
    }
    console.log(`   Created Project: ${project.title}`);
  }

  // 3. Seed Profile
  console.log("... Seeding Profile");
  // Check if profile has data
  const profileRes = await fetch(`${STRAPI_URL}/api/profile`, { headers });
  const profileData = await profileRes.json();
  
  // Update or Create (Single types usually exist but are null, we PUT to update)
  const profileBody = {
      name: SYSTEM_METADATA.name,
      location: SYSTEM_METADATA.location.primary,
      // Default others
      email: "inioluwa@example.com", 
      availability: "Available for projects"
  };

  await fetch(`${STRAPI_URL}/api/profile`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: profileBody })
  });
  console.log("   Updated Profile");

  // 4. Seed HomePage
  console.log("... Seeding Home Page");
  await fetch(`${STRAPI_URL}/api/home-page`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
        data: {
            heroHeadline: "Designing systems for the built environment.",
            heroTagline: SYSTEM_METADATA.tagline,
            aboutHeading: "Architecture is not limited to form.",
            aboutText: "My work is grounded in systems thinking..."
        }
    })
  });
  console.log("   Updated Home Page");

  console.log("✅ Seeding Complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
