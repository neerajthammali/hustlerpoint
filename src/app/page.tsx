
import { ArrowRight, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { TestimonialsCarousel } from '@/components/testimonials';
import { ArticleCarousel } from '@/components/article-carousel';
import AnimatedCounter from '@/components/animated-counter';
import { DiscordIcon, WhatsAppIcon } from '@/components/community-icons';
import AnimatedHeadline from '@/components/animated-headline';

const stats = [
  { label: 'Articles Published', value: 12, icon: <BookOpen className="h-8 w-8 text-primary" />, growth: 15 },
  { label: 'Ideas Shared', value: 85, icon: <Lightbulb className="h-8 w-8 text-primary" />, growth: 20 },
  { label: 'Community Members', value: 500, icon: <Users className="h-8 w-8 text-primary" />, growth: 10 },
];

export default async function Home() {
  const allArticles = await getAllArticles();
  
  const editorsPicks = allArticles.filter(a => a.featured).slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="relative isolate overflow-hidden bg-background">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="max-w-2xl text-center mx-auto">
              <AnimatedHeadline text="Publish Your Ideas. Build Your Future." />
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                A creator platform for writers, founders, and learners to share powerful insights and grow an audience.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                    <Link href="/articles">
                    Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
      </div>
      
      <section className="bg-card py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  {stat.icon}
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    <AnimatedCounter to={stat.value} />+
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Editor's Picks</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Hand-picked articles from our editors to get you started.
            </p>
          </div>
          <div className="mt-12">
            <ArticleCarousel articles={editorsPicks} />
          </div>
          {editorsPicks.length > 0 && (
              <div className="mt-16 text-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/articles">
                    View All Articles
                  </Link>
                </Button>
              </div>
          )}
        </div>
      </section>

      <section className="bg-card py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What They're Saying</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Testimonials from our readers and community members.
                </p>
            </div>
            <TestimonialsCarousel />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Join the Community</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Connect with fellow hustlers, founders, and creators. Share ideas, get feedback, and grow together.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer">
                            <DiscordIcon className="mr-2 h-5 w-5" />
                            Join Discord
                        </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                        <a href="https://chat.whatsapp.com/your-invite" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="mr-2 h-5 w-5" />
                            Join WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
