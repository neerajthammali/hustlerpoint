
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p>
            Please read these Terms of Service ("Terms") carefully before using the Hustler Point website (the "Service") operated by us. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.
          </p>
          
          <Separator />

          <section>
            <h2 className="font-headline text-2xl font-bold">User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
            </p>
             <p>
              You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold">Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Hustler Point and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
          </section>
          
          <Separator />

          <section>
            <h2 className="font-headline text-2xl font-bold">Disclaimer</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>
          </section>

           <section>
            <h2 className="font-headline text-2xl font-bold">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:neerajthammali@gmail.com" className="text-primary hover:underline">neerajthammali@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
