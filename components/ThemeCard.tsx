import { Theme } from "@/src/data/themes";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Link 
      href={theme.status === 'Active' ? '/themes/current' : `/themes/${theme.slug}`} 
      className="group block border-t border-border pt-8 pb-12 hover:bg-muted/5 px-4 -mx-4 transition-colors"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            {theme.yearRange}
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border ${theme.status === 'Active' ? 'border-foreground text-foreground' : 'border-border text-muted'}`}>
              {theme.status}
            </span>
            <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-3xl group-hover:italic transition-all">
            {theme.title}
          </h3>
          <p className="font-sans text-sm text-foreground/80 leading-relaxed max-w-md">
            {theme.thesis}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {theme.systemsExplored.slice(0, 3).map((system, i) => (
            <span key={i} className="font-mono text-[9px] text-muted uppercase tracking-tighter border border-border px-2 py-0.5 rounded-full">
              {system}
            </span>
          ))}
          {theme.systemsExplored.length > 3 && (
            <span className="font-mono text-[9px] text-muted uppercase tracking-tighter">
              + {theme.systemsExplored.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
