
import Image from 'next/image';
import { Mail, Linkedin, Twitter, Code, DraftingCompass, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skills = [
    { icon: <DraftingCompass className="h-6 w-6 text-primary" />, text: 'Civil Engineering' },
    { icon: <Code className="h-6 w-6 text-primary" />, text: 'Web Development' },
    { icon: <BrainCircuit className="h-6 w-6 text-primary" />, text: 'Artificial Intelligence' },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="mb-6 inline-block">
          <Image
            src="https://picsum.photos/seed/profile/160/160"
            alt="Neeraj Thammali"
            width={160}
            height={160}
            className="rounded-full border-4 border-primary/20 shadow-lg"
            data-ai-hint="founder portrait"
          />
        </div>
        <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl">
          Hi. I'm Neeraj Thammali 🤘
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">Product Maker, Civil Engineer, and Tech Enthusiast</p>
        <div className="mt-6 flex justify-center gap-4">
            <Button asChild variant="ghost" size="sm">
                <a href="https://twitter.com/neerajthammali" target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" /> @neerajthammali
                </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
                <a href="https://www.linkedin.com/in/neerajtammali/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
            </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-4 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Left Column: Bio & Journey */}
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="font-headline text-3xl font-bold">About Me</h2>
              <div className="prose prose-lg dark:prose-invert mt-4 max-w-none space-y-4 text-muted-foreground">
                <p>
                  I'm a product maker and civil engineer from Hyderabad, India, passionate about building products that create real value. I bridge civil engineering principles with technology to build smart, helpful tools.
                </p>
                <p>
                  As a believer in open source and building in public, I also enjoy educating others about technology and business on my blog, Hustler's Point.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-headline text-3xl font-bold">My Journey</h2>
              <div className="prose prose-lg dark:prose-invert mt-4 max-w-none space-y-4 text-muted-foreground">
                <p>
                  My childhood dream was designing massive structures, which led me to civil engineering. The 2020 pandemic introduced me to coding, which felt like a superpower.
                </p>
                <p>
                  This newfound passion grew into side projects, freelance work in web development and design, and a deep fascination with AI. Now, I combine both worlds: using engineering for solid foundations and technology to bring ideas to life.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Skills & Connect */}
          <aside className="space-y-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Core Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {skills.map(skill => (
                    <li key={skill.text} className="flex items-center gap-4">
                      {skill.icon}
                      <span className="font-medium">{skill.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle>Let's Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  I'm open to discussing freelance projects and new opportunities. If you have an idea or just want to chat, feel free to reach out.
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:neerajthammali@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Get In Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
