import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Hustler Point Home">
      <Zap className="h-5 w-5 fill-primary text-primary" />
      <span className="font-headline text-xl font-bold">
        Hustler Point
      </span>
    </Link>
  );
}
