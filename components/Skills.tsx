import { SkillCategory } from "@/src/lib/archive";

export default function Skills({ skillsData }: { skillsData?: SkillCategory[] }) {
  // If no data from Sanity, render nothing or fallback
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <section className="py-24 px-6 border-t border-border bg-white/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
           <span className="font-mono text-xs text-muted tracking-widest uppercase">
            04 — Skills & Tools
          </span>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillsData.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h4 className="font-serif italic text-lg text-foreground">{group.title}</h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-muted">
                {group.skills && group.skills.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-border rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
