"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";

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
            <div className="flex flex-col items-start md:col-span-1">
                <Logo />
                <p className="mt-4 text-sm text-muted-foreground">
                    Actionable insights for creators, developers, and founders.
                </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-headline text-lg font-bold">Stay Updated</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Subscribe to our newsletter for the latest articles and resources.
                  </p>
                  <form className="mt-4 flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="flex-1" />
                    <Button type="submit" size="icon" aria-label="Subscribe">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold">Follow Us</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Connect with us on social media for daily insights.
                  </p>
                   <div className="mt-4 flex gap-2">
                     {/* Add social links here */}
                   </div>
                </div>
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