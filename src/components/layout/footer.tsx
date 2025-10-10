
"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllArticles } from "@/lib/articles";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "mailto:neerajthammali@gmail.com", label: "Contact" },
];

const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
]

export function Footer() {
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    async function fetchCategories() {
      const articles = await getAllArticles();
      const uniqueCategories = [...new Set(articles.map(article => article.category))];
      setCategories(uniqueCategories);
    }
    fetchCategories();
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
            
            <div>
              <h3 className="font-headline text-lg font-bold">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                    <li key={link.label}>
                      {link.label === 'Contact' ? (
                        <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
                      ) : (
                        <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {link.label}
                        </Link>
                      )}
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
              <h3 className="font-headline text-lg font-bold">Stay Updated</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                  Subscribe for the latest articles and resources.
              </p>
              <form className="mt-4 flex w-full gap-2">
                  <Input type="email" placeholder="Enter your email" className="flex-1" />
                  <Button type="submit" size="icon" aria-label="Subscribe">
                  <ArrowRight className="h-4 w-4" />
                  </Button>
              </form>
            </div>
        </div>

        <Separator className="my-8" />

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
