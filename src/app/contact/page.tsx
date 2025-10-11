
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const recipientEmail = "neerajthammali2021@gmail.com";

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };
  
  const handleTestimonialSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const testimonial = formData.get('testimonial') as string;

    const subject = `New Testimonial from ${name}`;
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nTitle/Role: ${title}\n\nTestimonial:\n${testimonial}`)}`;
    window.location.href = mailtoLink;
  };


  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question, a project idea, or just want to say hi? Drop us a line.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input id="contact-name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" name="subject" placeholder="e.g., Partnership Inquiry" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" placeholder="Tell us what's on your mind..." className="min-h-[120px]" required />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <Separator />

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5"/>
                Leave a Testimonial
            </CardTitle>
             <p className="pt-2 text-sm text-muted-foreground">
                Enjoying Hustler Point? Share your experience with the community!
             </p>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="testimonial-name">Your Name</Label>
                     <Input id="testimonial-name" name="name" placeholder="Alex Johnson" required />
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="testimonial-title">Your Title/Role</Label>
                      <Input id="testimonial-title" name="title" placeholder="SaaS Founder" required />
                   </div>
                </div>

                 <div className="space-y-2">
                   <Label htmlFor="testimonial-text">Testimonial</Label>
                   <Textarea id="testimonial-text" name="testimonial" placeholder="Hustler Point has been a game-changer..." className="min-h-[120px]" required />
                 </div>
                <Button type="submit">Submit Testimonial</Button>
              </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
