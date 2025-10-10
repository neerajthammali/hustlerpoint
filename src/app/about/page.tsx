
import Image from 'next/image';
import { Linkedin, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const whatYoullFind = [
  { icon: <BookOpen className="h-6 w-6 text-primary" />, title: 'Actionable Tutorials', description: 'Step-by-step methods to improve your skills in tech and business.' },
  { icon: <TrendingUp className="h-6 w-6 text-primary" />, title: 'Growth & Monetization Tips', description: 'Insights into building an audience and turning your passion into a venture.' },
  { icon: <Lightbulb className="h-6 w-6 text-primary" />, title: 'Productivity Hacks', description: 'Practical shortcuts, tools, and tech recommendations to keep you efficient.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Decoding what the top 1% creators & hustlers do.
          </p>
        </header>

        <div className="space-y-16">

          {/* Meet the Founder */}
          <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-lg bg-card p-8 shadow-sm">
            <div className="flex-shrink-0">
              <Image
                src="https://picsum.photos/seed/profile/160/160"
                alt="Neeraj Thammali"
                width={160}
                height={160}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                data-ai-hint="founder portrait"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-headline text-2xl font-bold">Meet the Founder</h2>
              <p className="mt-2 text-lg font-semibold text-primary">Hi, I’m Neeraj Thammali 🤘</p>
              <p className="mt-4 text-muted-foreground">
                The creator behind Hustler's Point. I started from a civil engineering background and dove headfirst into the world of code and startups. I know first-hand how challenging (and exciting) it can be to build your digital presence.
              </p>
            </div>
          </section>

          {/* Our Focus */}
          <section>
            <h2 className="text-center font-headline text-3xl font-bold">Our Focus</h2>
            <div className="mt-6 prose prose-lg dark:prose-invert max-w-none text-center text-muted-foreground">
              <p>
                We run a niche blog dedicated to helping creators, developers, and aspiring entrepreneurs thrive. From actionable tech guides and productivity hacks to startup playbooks, our resources cut through the noise so you can build your brand and grow your business faster.
              </p>
            </div>
          </section>
          
          <Separator />

          {/* Why It Matters */}
          <section>
            <h2 className="text-center font-headline text-3xl font-bold">Why It Matters</h2>
            <div className="mt-6 prose prose-lg dark:prose-invert max-w-none text-center text-muted-foreground">
              <p>
                The digital world changes at lightning speed—new platforms, shifting algorithms, and fresh opportunities pop up daily. We’re here to keep you on track with relevant strategies, real-world case studies, and easy-to-follow guides, so you can skip the guesswork and focus on creating work you’re proud of.
              </p>
            </div>
          </section>

          <Separator />

          {/* What You'll Find */}
          <section>
            <h2 className="text-center font-headline text-3xl font-bold mb-8">What You’ll Find Here</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whatYoullFind.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Join the Community */}
          <section className="text-center rounded-lg bg-card p-8 shadow-sm">
            <h2 className="font-headline text-3xl font-bold">Join the Community</h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Ready to take your hustle to the next level? Dive in, explore the blog, and connect with fellow creators and founders on the same journey. Let’s grow together!
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/articles">Read the Blog</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.linkedin.com/in/neerajtammali/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
                </a>
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
