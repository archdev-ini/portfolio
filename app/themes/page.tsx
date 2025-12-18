import ThemeCard from "@/components/ThemeCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getActiveTheme, getArchivedThemes } from "@/src/lib/archive";

export default async function ThemeArchivePage() {
  const activeTheme = await getActiveTheme();
  const archivedThemes = await getArchivedThemes();

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Header />
      
      <div className="pt-40 px-6 pb-24 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col gap-8 mb-24 max-w-4xl">
            <span className="font-mono text-xs text-muted uppercase tracking-[0.2em] font-medium">
              Intellectual Archive
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
              Thematic Cycles — <br />
              <span className="text-muted">A record of architectural inquiry across time.</span>
            </h1>
            <p className="font-sans text-lg text-muted max-w-2xl leading-relaxed">
              Themes function as curated lenses through which research, projects, and systems thinking are organized. This archive documents the evolution of my methodological rigor and ecological sensitivity.
            </p>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <div className="flex flex-col gap-12">
               <span className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-border pb-2">
                Active Inquiry
              </span>
              {activeTheme && (
                <ThemeCard key={activeTheme.id} theme={activeTheme} />
              )}
            </div>

            <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-12">
               <span className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-border pb-2">
                Archived Chapters
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                {archivedThemes.map(theme => (
                  <ThemeCard key={theme.id} theme={theme} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
