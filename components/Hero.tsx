"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortableText } from "next-sanity";
import { SYSTEM_METADATA } from "@/src/data/metadata";
import { HomePage, Profile } from "@/src/lib/archive";

interface HeroProps {
  home?: HomePage;
  profile?: Profile;
}

export default function Hero({ home, profile }: HeroProps) {
  const startYear = SYSTEM_METADATA.portfolioStartYear;
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > startYear ? `${startYear}—${currentYear}` : `${startYear}`;

  const location = profile?.location || SYSTEM_METADATA.location.primary;
  const availability = profile?.availability || "Active Inquiry: The Radiant Archive";

  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-6 relative overflow-hidden py-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.3] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase" suppressHydrationWarning>
            Portfolio — {yearRange}
          </span>
          
          <div className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-foreground mix-blend-multiply text-balance">
            {home?.heroHeadline ? <PortableText value={home.heroHeadline} /> : (
                <h1>
                  Architecting systems <br />
                  for resilient cultural <br />
                  and <i className="font-light">ecological futures</i>.
                </h1>
            )}
          </div>

          <div className="h-px w-24 bg-foreground mt-8 mb-8" />

          <p className="max-w-xl font-sans text-lg text-muted/90 leading-relaxed">
            {home?.heroTagline || "Inioluwa Oladipupo is an architecture student and systems thinker documenting architectural processes across the built environment, digital workflows, and ecological preservation."}
          </p>

          <Link 
            href="/themes/current" 
            className="group flex items-center gap-3 w-fit mt-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-muted transition-colors"
          >
            <span className="relative">
              {availability}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
            </span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 font-mono text-xs text-muted mix-blend-multiply"
      >
        <div className="flex flex-col gap-1">
          <span>{location}</span>
          <span className="opacity-50">{SYSTEM_METADATA.location.coordinates}</span>
        </div>
        <span className="animate-bounce md:absolute md:left-1/2 md:-translate-x-1/2">↓ Scroll to explore</span>
        <div className="text-right flex flex-col gap-1">
          <span>Systems / Design</span>
          <span className="opacity-50">Ref: Radiant Archive</span>
        </div>
      </motion.div>
    </section>
  );
}
