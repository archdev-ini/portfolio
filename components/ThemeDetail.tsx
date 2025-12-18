"use client";

import { Theme } from "@/src/data/themes";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface ThemeDetailProps {
  theme: Theme;
}

export default function ThemeDetail({ theme }: ThemeDetailProps) {
  return (
    <main className="min-h-screen bg-background pt-32 px-6 pb-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {/* Navigation */}
        <Link 
          href="/themes" 
          className="group flex items-center gap-2 font-mono text-xs text-muted uppercase tracking-widest hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Theme Archive
        </Link>

        {/* Header */}
        <section className="flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-border pb-4">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              Theme — {theme.yearRange}
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border ${theme.status === 'Active' ? 'border-foreground text-foreground' : 'border-muted text-muted opacity-50'}`}>
              {theme.status}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight italic">
            {theme.title}
          </h1>
          <p className="font-sans text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            {theme.thematicStatement}
          </p>
        </section>

        {/* Key Questions */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12">
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest">Inquiry</h3>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            <ul className="flex flex-col gap-6">
              {theme.keyQuestions.map((question, i) => (
                <li key={i} className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
                  &ldquo;{question}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Systems Explored */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12">
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest">Systems</h3>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {theme.systemsExplored.map((system, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="font-sans text-sm text-foreground font-medium uppercase tracking-tighter">
                    {system}
                  </span>
                  <div className="h-px w-8 bg-border" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Outputs */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12">
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest">Outputs</h3>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-4">
              {theme.relatedOutputs.map((output, i) => (
                <Link 
                  href={`#${output.id}`} 
                  key={i}
                  className="group flex justify-between items-center py-4 border-b border-border hover:bg-muted/5 px-2 -mx-2 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-xl group-hover:italic transition-all">{output.title}</span>
                    <span className="font-sans text-[10px] text-muted uppercase tracking-widest">
                      {output.type}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
