
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <header className="text-center mb-10">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            Welcome to Hustler Point. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <Separator />

          <section>
            <h2 className="font-headline text-2xl font-bold">Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the platform, subscribe to our newsletter, or publish content. This may include your name, email address, and user-generated content.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our platform.</li>
              <li>Improve, personalize, and expand our platform.</li>
              <li>Understand and analyze how you use our platform.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
              <li>Send you emails and newsletters.</li>
            </ul>
          </section>
          
          <Separator />

          <section>
            <h2 className="font-headline text-2xl font-bold">Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, advertising, and other business purposes. These third parties may use cookies or other tracking technologies to collect information about your use of our website.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>
          
          <Separator />

          <section>
            <h2 className="font-headline text-2xl font-bold">Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:neerajthammali@gmail.com" className="text-primary hover:underline">neerajthammali@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
