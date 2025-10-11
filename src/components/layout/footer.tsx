
import Link from "next/link";
import { Separator } from "../ui/separator";
import { getAllArticles } from "@/lib/articles";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
]

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
)

const socialLinks = [
    { href: "https://twitter.com/okasankalpam", label: "X", icon: <XIcon /> },
    { href: "https://instagram.com/okasankalpam", label: "Instagram", icon: <Instagram /> },
    { href: "https://youtube.com/@okasankalpam", label: "YouTube", icon: <Youtube /> },
    { href: "https://linkedin.com/in/neerajtammali", label: "LinkedIn", icon: <Linkedin /> },
    { href: "https://github.com/neeraj-tammali", label: "GitHub", icon: <Github /> },
]

export async function Footer() {
  const articles = await getAllArticles();
  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
            
            <div>
              <h3 className="font-headline text-lg font-bold">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-lg font-bold">Categories</h3>
              <ul className="mt-4 space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`/category/${category.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
                <h3 className="font-headline text-lg font-bold">Connect</h3>
                <div className="mt-4 flex justify-center gap-4 md:justify-start">
                    {socialLinks.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                            {React.cloneElement(link.icon, { className: "h-5 w-5" })}
                            <span className="sr-only">{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Hustler Point. All rights reserved.</p>
           <ul className="flex items-center gap-4">
                {legalLinks.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </footer>
  );
}
