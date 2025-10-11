
import { ArrowRight, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { DiscordIcon, WhatsAppIcon } from '@/components/community-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ArticleCard from '@/components/article-card';
import placeholderImages from '@/lib/placeholder-images.json';

const testimonials = [
  {
    quote: "Hustler's Point is my go-to for no-fluff, actionable advice. The case studies on startup growth have been a game-changer for my own venture.",
    author: "Alex Johnson",
    title: "SaaS Founder",
    avatar: placeholderImages['testimonial-1'],
  },
  {
    quote: "The community is incredible. Being able to connect with other founders who are facing the same challenges is invaluable. It's like a mastermind group in my pocket.",
    author: "Samantha Lee",
    title: "Early-Stage Entrepreneur",
    avatar: placeholderImages['testimonial-2'],
  },
  {
    quote: "The breakdowns of how successful companies solved real-world problems are pure gold. It's inspiring and gives me tangible ideas to apply to my own business.",
    author: "David Chen",
    title: "Bootstrapped Founder",
    avatar: placeholderImages['testimonial-3'],
  },
];

export default async function Home() {
  const allArticles = await getAllArticles();
  
  const editorsPicks = allArticles.filter(a => a.featured).slice(0, 3);
  
  const stats = [
    { label: 'Articles Published', value: allArticles.length, icon: <BookOpen className="h-8 w-8 text-primary" /> },
    { label: 'Ideas Shared', value: 85, icon: <Lightbulb className="h-8 w-8 text-primary" /> },
    { label: 'Community Members', value: 500, icon: <Users className="h-8 w-8 text-primary" /> },
  ];

  return (
    <div className="flex flex-col">
      <div className="relative isolate overflow-hidden bg-background">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Publish Your Ideas. Build Your Future.</h1>
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
      
      <section className="bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  {stat.icon}
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {stat.value}+
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Editor's Picks</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Hand-picked articles from our editors to get you started.
            </p>
          </div>
          <div className="mt-10">
             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                {editorsPicks.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
          </div>
          {editorsPicks.length > 0 && (
              <div className="mt-10 text-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/articles">
                    View All Articles
                  </Link>
                </Button>
              </div>
          )}
        </div>
      </section>

      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What They're Saying</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Testimonials from our readers and community members.
                </p>
            </div>
             <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex h-full flex-col justify-between text-left">
                  <CardContent className="p-6">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="flex items-center gap-4 border-t bg-card/50 p-6">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar.url} alt={testimonial.author} data-ai-hint={testimonial.avatar.hint} width={testimonial.avatar.width} height={testimonial.avatar.height} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
        </div>
      </section>

      <section className="py-12">
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
