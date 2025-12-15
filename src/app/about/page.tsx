import Image from 'next/image';
import { Linkedin, BookOpen, BrainCircuit, Users, Mail, Lightbulb, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';
import { FadeInOnScroll, StaggerContainer, StaggerItem } from '@/components/animations';

const whatWeDo = [
  { icon: <Mail className="h-6 w-6 text-primary" />, title: 'Exclusive Newsletter', description: 'Curated startup insights, actionable growth tips, and real-world case studies delivered to your inbox.' },
  { icon: <Users className="h-6 w-6 text-primary" />, title: 'Founder Community', description: 'Connect with a network of emerging entrepreneurs to share ideas, ask questions, and grow together.' },
  { icon: <Lightbulb className="h-6 w-6 text-primary" />, title: 'Real-World Breakdowns', description: 'In-depth analysis of how successful businesses solve complex problems and achieve their breakthroughs.' },
];

export default function AboutPage() {
  const profileImage = placeholderImages.profile;
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        
        <header className="text-center mb-10">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            About Hustler Point
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The platform for creators, founders, and learners to build their impact.
          </p>
        </header>

        <div className="space-y-12">

          <section>
            <h2 className="text-center font-headline text-3xl font-bold">Our Mission</h2>
            <div className="mt-6 prose prose-lg dark:prose-invert max-w-none text-center text-muted-foreground">
              <p>
                We empower independent writers, founders, and learners to share powerful insights, startup stories, and industry breakdowns. Hustler Point is a creator hub that combines smart publishing tools, AI-powered growth automation, and simple analytics to help you publish, grow, and monetize your ideas.
              </p>
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-center font-headline text-3xl font-bold mb-8">What We Provide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whatWeDo.map((item) => (
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

          <Separator />

          <a href="https://neerajthammali.vercel.app/" target="_blank" rel="noopener noreferrer" className="group block">
            <section className="flex flex-col md:flex-row items-center gap-8 md:gap-10 rounded-lg bg-card p-6 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:bg-accent/10">
              <div className="flex-shrink-0">
                <Image
                  src={profileImage.url}
                  alt={profileImage.alt}
                  width={profileImage.width}
                  height={profileImage.height}
                  className="rounded-full border-4 border-primary/20 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={profileImage.hint}
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="font-headline text-2xl font-bold">A Note from the Founder</h2>
                <p className="mt-2 text-lg font-semibold text-primary">Hi, I’m Neeraj Thammali 🤘</p>
                <p className="mt-4 text-muted-foreground">
                  I started Hustler Point because I believe the best ideas come from those in the trenches. Click to learn more about my journey.
                </p>
              </div>
              <LinkIcon className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            </section>
          </a>

          <section className="text-center rounded-lg bg-card p-8 shadow-sm">
            <h2 className="font-headline text-3xl font-bold">Join the Movement</h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Ready to share your voice and grow your influence? Start publishing, connect with like-minded individuals, and turn your expertise into opportunity.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/articles">Explore Articles</Link>
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
