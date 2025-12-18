import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fetchResearchArticles } from "@/src/lib/rss";
import { SYSTEM_METADATA } from "@/src/data/metadata";
import { Profile } from "@/src/lib/archive";

export default async function Research({ profile }: { profile?: Profile }) {
  const articles = await fetchResearchArticles(profile?.substackUrl || SYSTEM_METADATA.substackRss);
  
  // If no articles found, we render nothing (or the empty map)
  const displayArticles = articles;

  if (!displayArticles || displayArticles.length === 0) {
    return null;
  }
  return (
    <section id="research" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
           <span className="font-mono text-xs text-muted tracking-widest uppercase sticky top-24">
            03 — Research & Writing
          </span>
        </div>

        <div className="md:col-span-8 flex flex-col">
          {displayArticles.map((article, index) => (
            <Link 
              href={article.link} 
              key={index}
              target="_blank"
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-border hover:bg-muted/5 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl group-hover:italic transition-all duration-300">
                  {article.title}
                </h3>
                <span className="font-sans text-xs text-muted">
                  {article.description}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-xs text-muted">
                <span>{article.pubDate}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
