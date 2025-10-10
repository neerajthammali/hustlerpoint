import Image from 'next/image';
import { BarChart, Users, Eye } from 'lucide-react';
import NewsletterSignup from '@/components/newsletter-signup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCounter from '@/components/animated-counter';

const analyticsData = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: 6273,
    label: 'Total Demographics',
    description: 'A growing community of innovators and creators.',
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    value: 17,
    label: 'Total Engagements',
    description: 'Meaningful interactions across our content.',
  },
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    value: 546,
    label: 'Article Views',
    description: 'Insights reaching a dedicated readership.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            About Hustler Point
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The digital voice built for the modern hustler — where ideas, innovation, and individuality meet.
          </p>
        </header>

        <section className="mt-16">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://picsum.photos/seed/community/1200/675"
              alt="Hustler Point Community"
              fill
              className="object-cover"
              data-ai-hint="diverse community"
            />
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold">Our Vision</h2>
            <p className="mt-4 text-muted-foreground">
              At Hustler Point, we believe in the power of bold ideas and the relentless individuals who bring them to life. We are more than just a media brand; we are a platform for the voices redefining the digital world. Our mission is to provide sharp, actionable insights into tech, creativity, and startup culture that not only inform but also inspire action.
            </p>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold">Founder's Note</h2>
            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
              "Built for the bold minds redefining the digital world. We're here to champion your journey, celebrate your wins, and provide the fuel for your hustle. Welcome to the community."
            </blockquote>
          </div>
        </section>
        
        <section className="mt-20 text-center">
           <h2 className="font-headline text-3xl font-bold tracking-tighter">Our Community Reach</h2>
           <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
             We're proud of the community we're building. Here's a look at our growth and engagement.
           </p>
           <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
             {analyticsData.map((item) => (
                <Card key={item.label} className="text-center">
                    <CardHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            {item.icon}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                           <AnimatedCounter to={item.value} />
                        </p>
                        <p className="mt-1 text-sm font-semibold">{item.label}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
             ))}
           </div>
        </section>

        <section className="mt-20 rounded-lg bg-card p-8 shadow-sm">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-headline text-3xl font-bold">Join Our Newsletter</h2>
            <p className="mt-2 text-muted-foreground">
              Become part of the Hustler Point community. Get exclusive content, early access, and insights sent directly to your inbox.
            </p>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
