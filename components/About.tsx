import { PortableText } from "next-sanity";
import { HomePage } from "@/src/lib/archive";

export default function About({ home }: { home?: HomePage }) {

  return (
    <section id="about" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="font-mono text-xs text-muted tracking-widest uppercase sticky top-24">
            01 — Philosophy
          </span>
        </div>
        
        <div className="md:col-span-8 flex flex-col gap-12">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight text-balance">
            {home?.aboutHeading || "Architecture is not limited to form or construction. It is the study of systems—cultural, ecological, spatial, and informational—that shape how environments emerge and endure."}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-sm text-muted leading-relaxed text-justify">
            {home?.aboutText ? (
                <div className="col-span-2 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <PortableText value={home.aboutText} />
                </div>
            ) : (
                <>
                <p>
                My work is grounded in <strong className="text-foreground font-medium uppercase tracking-tighter">systems thinking</strong>. I approach design as the orchestration of relationships rather than the production of isolated objects. Across urban analysis, vernacular studies, and speculative projects, I seek to reveal the underlying logic governing place, material, and use.
                </p>
                <p>
                Emerging technologies—BIM, computational workflows, and digital modeling—are employed as <strong className="text-foreground font-medium uppercase tracking-tighter">analytical tools</strong>, not aesthetic ends. They serve to clarify complexity and extend traditional knowledge. By aligning heritage with innovation, architecture can remain adaptive, resilient, and culturally rooted.
                </p>
                </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
