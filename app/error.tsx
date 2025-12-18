"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative overflow-hidden bg-background text-foreground">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.3] z-0 pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center gap-6">
        <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
          System Malfunction
        </span>
        
        <h1 className="font-serif text-6xl md:text-8xl italic">
          Process Failed
        </h1>

        <div className="h-px w-24 bg-foreground mt-4 mb-4" />

        <p className="max-w-md text-muted/90 leading-relaxed font-mono text-xs uppercase tracking-widest">
          An unexpected error occurred while processing the request.
          <br />
          Ref: {error.digest || "UNKNOWN_ERROR"}
        </p>

        <button
          onClick={reset}
          className="group flex items-center gap-3 w-fit mt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted transition-colors border border-border px-6 py-3 bg-white/50 backdrop-blur-sm cursor-pointer"
        >
          <span className="relative">
            Re-Initialize System
          </span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
