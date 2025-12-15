'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { FadeInOnScroll, StaggerContainer, StaggerItem } from '@/components/animations';
import Link from 'next/link';

interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  comments: number;
  category: string;
  createdAt: string;
  hasVoted?: boolean;
}

export default function CommunityPage() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'AI-Powered Code Review Tools',
      description: 'Building intelligent tools that automatically review code quality, security, and performance issues.',
      author: 'Sarah Chen',
      votes: 342,
      comments: 18,
      category: 'Tech',
      createdAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Personal Finance for Creators',
      description: 'A platform helping creators manage taxes, invoicing, and financial planning. Built for 1099 income.',
      author: 'Marcus Johnson',
      votes: 287,
      comments: 24,
      category: 'SaaS',
      createdAt: '3 days ago',
    },
    {
      id: '3',
      title: 'No-Code Automation for Solopreneurs',
      description: 'Simplified workflow automation without technical knowledge. Focus on business, not code.',
      author: 'Emma Rodriguez',
      votes: 201,
      comments: 12,
      category: 'Business',
      createdAt: '4 days ago',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', category: 'Tech' });

  const handleVote = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id 
        ? { ...idea, votes: idea.hasVoted ? idea.votes - 1 : idea.votes + 1, hasVoted: !idea.hasVoted }
        : idea
    ));
  };

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.title && newIdea.description) {
      const idea: Idea = {
        id: Math.random().toString(),
        title: newIdea.title,
        description: newIdea.description,
        category: newIdea.category,
        author: 'You',
        votes: 0,
        comments: 0,
        createdAt: 'just now',
      };
      setIdeas([idea, ...ideas]);
      setNewIdea({ title: '', description: '', category: 'Tech' });
      setShowForm(false);
    }
  };

  const topIdeas = [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Community Hub</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Share ideas, vote on what matters, and connect with fellow builders.
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Share Idea CTA */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl mx-auto">
              {!showForm ? (
                <Button onClick={() => setShowForm(true)} size="lg" className="w-full">
                  Share Your Idea
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Idea</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitIdea} className="space-y-4">
                      <Input
                        placeholder="Idea title"
                        value={newIdea.title}
                        onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Describe your idea..."
                        value={newIdea.description}
                        onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                        required
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">Submit</Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-3xl font-bold">Trending Ideas</h2>
              </div>
              <p className="text-muted-foreground">Most voted ideas from the community this week.</p>
            </div>
          </FadeInOnScroll>

          <StaggerContainer className="space-y-4 max-w-3xl mx-auto">
            {topIdeas.map((idea) => (
              <StaggerItem key={idea.id}>
                <Card className="hover:bg-card/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_100px]">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                            {idea.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{idea.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>By {idea.author}</span>
                          <span>{idea.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(idea.id)}
                          className={idea.hasVoted ? 'bg-primary/10' : ''}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {idea.votes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {idea.comments}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {ideas.length > topIdeas.length && (
            <FadeInOnScroll className="mt-8 text-center">
              <Button variant="outline" size="lg">
                View All Ideas
              </Button>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      {/* Polls Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="font-headline text-3xl font-bold mb-2">Community Polls</h2>
            <p className="text-muted-foreground mb-10">Help shape the future of HustlersPoint.</p>
          </FadeInOnScroll>

          <StaggerContainer className="grid grid-cols-1 gap-6 max-w-4xl mx-auto md:grid-cols-2">
            {[
              { question: 'What topic should we cover next?', options: ['AI & Automation', 'Personal Branding', 'SaaS Growth', 'Remote Work'] },
              { question: 'Preferred content format?', options: ['Long-form articles', 'Video essays', 'Podcasts', 'Infographics'] },
            ].map((poll, idx) => (
              <StaggerItem key={idx}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{poll.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {poll.options.map((option) => (
                      <Button key={option} variant="outline" className="w-full justify-start">
                        {option}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl text-center mx-auto">
              <h2 className="font-headline text-3xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Connect deeper with the community on Discord.
              </p>
              <Button asChild size="lg">
                <a href="https://discord.gg/hustlerpoint" target="_blank" rel="noopener noreferrer">
                  Join Our Discord
                </a>
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
