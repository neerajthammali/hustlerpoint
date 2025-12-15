"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeInOnScroll } from '@/components/animations';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInOnScroll>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold">Newsletter</h1>
          <p className="mt-4 text-muted-foreground">Subscribe to weekly research, case studies, and community highlights.</p>
        </div>
      </FadeInOnScroll>

      <section className="mt-12 max-w-2xl mx-auto">
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            aria-label="Email address"
          />
          <Button type="submit" size="lg" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        <div className="mt-6">
          {status === 'success' && <p className="text-sm text-green-600">Thanks — you're subscribed.</p>}
          {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Try again.</p>}
        </div>
      </section>

      <section className="mt-16">
        <FadeInOnScroll>
          <h2 className="font-semibold text-2xl">Archive</h2>
          <p className="text-muted-foreground mt-2">Past issues will appear here. (Coming soon)</p>
        </FadeInOnScroll>
      </section>
    </div>
  );
}
