
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ShareButtonsProps = {
  article: {
    title: string;
    slug: string;
  };
};

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
)

export default function ShareButtons({ article }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);
  
  const articleUrl = `${origin}/articles/${article.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(articleUrl).then(() => {
      setCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(article.title)}`;


  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="icon">
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          <XIcon />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon">
        <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
