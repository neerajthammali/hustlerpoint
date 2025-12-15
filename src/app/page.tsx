
import { ArrowRight, BookOpen, Lightbulb, Users, Zap, Target, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { DiscordIcon, WhatsAppIcon } from '@/components/community-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ArticleCard from '@/components/article-card';
import placeholderImages from '@/lib/placeholder-images.json';
import { FadeInOnScroll, StaggerContainer, StaggerItem, HeroAnimation } from '@/components/animations';

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
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-background">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-2xl text-center mx-auto">
            <HeroAnimation>
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The Thinking Network for Builders
              </h1>
            </HeroAnimation>
            <FadeInOnScroll delay={0.2}>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                Publish your research, share hustler stories, and connect with founders, engineers, and creators building the future.
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.4} className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/articles">
                  Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/community">Join Community</Link>
              </Button>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-3">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="flex flex-col items-center">
                    {stat.icon}
                    <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                      {stat.value}+
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Why HustlersPoint?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Built for builders who think deeply about their craft.
              </p>
            </div>
          </FadeInOnScroll>
          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: <Zap className="h-6 w-6 text-primary" />, title: 'High-Quality Research', desc: 'Long-form articles with original insights from industry experts' },
              { icon: <Target className="h-6 w-6 text-primary" />, title: 'Community-Driven', desc: 'Share ideas, vote on polls, and connect with fellow builders' },
              { icon: <Code className="h-6 w-6 text-primary" />, title: 'Built for Growth', desc: 'Optimize your personal brand and build your audience in public' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <Card className="flex flex-col h-full border-0 bg-card/50 hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Editor's Picks Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Editor's Picks</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Hand-curated articles to get you started.
              </p>
            </div>
          </FadeInOnScroll>
          <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {editorsPicks.map((article) => (
              <StaggerItem key={article.slug}>
                <ArticleCard article={article} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          {editorsPicks.length > 0 && (
            <FadeInOnScroll className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/articles">
                  View All Articles
                </Link>
              </Button>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-card py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Community Love</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                What builders are saying about HustlersPoint.
              </p>
            </div>
          </FadeInOnScroll>
          <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <Card className="flex h-full flex-col justify-between text-left border-0 bg-background">
                  <CardContent className="p-6">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="flex items-center gap-4 border-t bg-background/50 p-6">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Build in Public</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join the community of thinkers, builders, and makers creating the future.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/ideas">Share Your Idea</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">Learn Our Story</Link>
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Discord/Community CTA */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-12">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="font-headline text-2xl font-bold">Connect with Us</h3>
              <p className="mt-3 text-muted-foreground">
                Real-time discussions and community support on Discord and WhatsApp.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="https://discord.gg/hustlerpoint" target="_blank" rel="noopener noreferrer">
                    <DiscordIcon className="mr-2 h-5 w-5" />
                    Join Discord
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href="https://chat.whatsapp.com/FUTfdqsELWoKLMRuDGnz0Y?mode=ems_copy_t" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Join WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
