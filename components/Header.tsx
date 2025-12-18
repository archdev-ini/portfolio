import Link from "next/link";
import { Profile } from "@/src/lib/archive";

export default function Header({ profile }: { profile?: Profile }) {
  const name = profile?.name || "Inioluwa Oladipupo";

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <Link href="/" className="font-serif italic text-lg tracking-wide hover:opacity-70 transition-opacity">
        {name}
      </Link>

      <nav className="flex gap-8 text-sm font-sans tracking-widest uppercase opacity-90">
        <Link href="/#work" className="hover:underline underline-offset-4 decoration-1">
          Work
        </Link>
        <Link href="/themes" className="hover:underline underline-offset-4 decoration-1">
          Archive
        </Link>
        <Link href="/#research" className="hover:underline underline-offset-4 decoration-1">
          Research
        </Link>
        <Link href="/#about" className="hover:underline underline-offset-4 decoration-1">
          Profile
        </Link>
      </nav>
    </header>
  );
}
