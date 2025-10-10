
"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "mailto:neerajthammali@gmail.com", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <Logo />
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
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Hustler Point. All rights reserved.</p>
      </div>
    </footer>
  );
}
