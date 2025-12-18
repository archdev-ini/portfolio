import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google"; // Using Newsreader for serif
import "./globals.css";
import { getProfile, getHomePage } from "@/src/lib/archive";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const home = await getHomePage();

  const title = profile?.name 
    ? `${profile.name} | Architect & Systems Thinker`
    : "Inioluwa Oladipupo | Architect & Systems Thinker";
    
  const description = home?.heroTagline || "Portfolio and intellectual archive of Inioluwa Oladipupo.";

  return {
    title,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
