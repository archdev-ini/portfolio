import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/src/lib/archive";

export default async function SelectedWorks() {
  const projects = await getAllProjects();
  const displayProjects = projects.slice(0, 3);
  return (
    <section id="work" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
           <span className="font-mono text-xs text-muted tracking-widest uppercase">
            02 — Selected Works
          </span>
          <span className="font-sans text-xs text-muted">
            Index [1—3]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayProjects.map((project, idx) => (
            <Link href={`/themes/current#project-${project.id}`} key={project.id} className="group block cursor-pointer">
              <div className="w-full aspect-4/5 bg-border/30 overflow-hidden relative mb-6">
                 {project.imageUrl ? (
                     <Image 
                       src={project.imageUrl} 
                       alt={project.title} 
                       fill 
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                 ) : (
                   <>
                     {/* Placeholder for actual images */}
                     <div className="absolute inset-0 bg-muted/10 group-hover:bg-muted/20 transition-colors" />
                     <div className="absolute bottom-4 left-4 font-mono text-xs text-muted opacity-50">
                        IMG_0{idx + 1}
                     </div>
                   </>
                 )}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline border-b border-border pb-2 group-hover:border-foreground transition-colors duration-500">
                  <h3 className="font-serif text-xl italic group-hover:pl-2 transition-all duration-300">{project.title}</h3>
                  <span className="font-mono text-xs text-muted">{project.year}</span>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-muted mt-1">
                  {project.type} / {project.systems[0]}
                </span>
                <p className="font-sans text-sm text-foreground/70 mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
