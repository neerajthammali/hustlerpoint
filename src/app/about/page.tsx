
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <header className="mb-12 text-center">
        <div className="mb-4 inline-block">
          <Image
            src="https://picsum.photos/seed/profile/128/128"
            alt="Neeraj Thammali"
            width={128}
            height={128}
            className="rounded-full"
            data-ai-hint="founder portrait"
          />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Hi. I'm Neeraj Thammali 🤘
        </h1>
        <Link
          href="https://twitter.com/neerajthammali"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-lg text-primary hover:underline"
        >
          @neerajthammali
        </Link>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="font-headline text-3xl font-bold">Short Bio</h2>
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

        <section>
          <h2 className="font-headline text-3xl font-bold">Let's Connect</h2>
          <div className="prose prose-lg dark:prose-invert mt-4 max-w-none space-y-4 text-muted-foreground">
            <p>
              I'm excited to connect with others via{' '}
              <a href="mailto:neerajthammali@gmail.com" className="text-primary hover:underline">
                email
              </a>{' '}
              and on{' '}
              <a
                href="https://www.linkedin.com/in/neerajtammali/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>{' '}
              to chat about projects and ideas.
            </p>
            <p>
              Currently, I'm open to discussing freelance projects and potential opportunities. If it's a good fit, I'd love to collaborate. I'm always looking to be part of something great.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-20 text-center">
        <h2 className="font-headline text-3xl font-bold">Get In Touch</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          I'm currently available for freelance work and open to discussing new projects. Feel free to reach out.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <a href="mailto:neerajthammali@gmail.com">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://www.linkedin.com/in/neerajtammali/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
