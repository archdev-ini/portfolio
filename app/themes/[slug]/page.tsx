import ThemeDetail from "@/components/ThemeDetail";
import { notFound } from "next/navigation";
import { getThemeBySlug, getArchivedThemes } from "@/src/lib/archive";

export async function generateStaticParams() {
  const themes = await getArchivedThemes();
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = await getThemeBySlug(slug);

  if (!theme) {
    notFound();
  }

  return <ThemeDetail theme={theme} />;
}
