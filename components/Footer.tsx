import Link from "next/link";
import { Profile, HomePage } from "@/src/lib/archive";

interface FooterProps {
  profile?: Profile;
  home?: HomePage;
}

export default function Footer({ profile, home }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const name = profile?.name;
  const tagline = home?.heroTagline;
  const location = profile?.location;

  return (
    <footer className="w-full px-6 py-12 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-4">
          <h3 className="font-serif italic text-2xl tracking-tight">{name}</h3>
          <p className="text-sm font-sans text-muted max-w-xs leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="flex gap-16 font-sans text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-muted uppercase tracking-wider text-xs">Social</span>
            {profile?.socialLinks ? (
              profile.socialLinks.map((link, i) => (
                <Link key={i} href={link.url} target="_blank" className="hover:text-muted transition-colors">
                  {link.platform}
                </Link>
              ))
            ) : (
                // Fallback
                <>
                <Link href="https://linkedin.com" target="_blank" className="hover:text-muted transition-colors">LinkedIn</Link>
                <Link href="https://instagram.com" target="_blank" className="hover:text-muted transition-colors">Instagram</Link>
                </>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-muted uppercase tracking-wider text-xs">Contact</span>
            <a href={`mailto:${profile?.email || 'hello@example.com'}`} className="hover:text-muted transition-colors">Email</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-muted font-mono uppercase tracking-widest">
        <span>© {currentYear} {name}</span>
        <div className="flex gap-4">
          <span>{location}</span>
          <span className="opacity-40">Built as an archive</span>
        </div>
      </div>
    </footer>
  );
}
