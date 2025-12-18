import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative overflow-hidden bg-background text-foreground">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.3] z-0 pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center gap-6">
        <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
          Error 404
        </span>
        
        <h1 className="font-serif text-6xl md:text-8xl italic">
          Record Missing
        </h1>

        <div className="h-px w-24 bg-foreground mt-4 mb-4" />

        <p className="max-w-md text-muted/90 leading-relaxed font-mono text-xs uppercase tracking-widest">
          The requested path does not exist in the archive. 
          <br />
          Ref: INVALID_ROUTE
        </p>

        <Link 
          href="/" 
          className="group flex items-center gap-3 w-fit mt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted transition-colors border border-border px-6 py-3 bg-white/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          <span className="relative">
            Return to Index
          </span>
        </Link>
      </div>
    </div>
  );
}
