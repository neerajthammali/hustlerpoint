
"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "../ui/separator";
import NewsletterSignup from "../newsletter-signup";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "mailto:neerajthammali@gmail.com", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
                <Logo />
                <p className="mt-4 text-sm text-muted-foreground">
                    Actionable insights for creators, developers, and founders.
                </p>
            </div>
            <div className="md:col-span-2">
                <h3 className="font-headline text-lg font-bold">Stay Updated</h3>
                <p className="mt-2 text-sm text-muted-foreground">Get the latest articles and resources delivered to your inbox.</p>
                <div className="mt-4">
                    <NewsletterSignup />
                </div>
            </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Hustler Point. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              link.label === 'Contact' ? (
                  <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">{link.label}</a>
              ) : (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                  </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
