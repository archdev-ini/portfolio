import ThemeDetail from "@/components/ThemeDetail";
import { notFound } from "next/navigation";
import { getActiveTheme } from "@/src/lib/archive";

export default async function CurrentThemePage() {
  const currentTheme = await getActiveTheme();

  if (!currentTheme) {
    notFound();
  }

  return <ThemeDetail theme={currentTheme} />;
}
