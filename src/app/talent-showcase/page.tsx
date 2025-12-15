'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalLink, Github, Linkedin, Globe } from 'lucide-react';
import { FadeInOnScroll, StaggerContainer, StaggerItem } from '@/components/animations';
import { useState } from 'react';
import placeholderImages from '@/lib/placeholder-images.json';

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  skills: string[];
  links: { label: string; url: string; icon: React.ReactNode }[];
  projects: number;
  followers: number;
}

export default function TalentShowcasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'Full-Stack Engineer & Founder',
      bio: 'Building tools for developers. Previously at Google, now bootstrapping my SaaS.',
      image: placeholderImages['testimonial-1'].url,
      skills: ['React', 'Node.js', 'AI/ML', 'Product Strategy'],
      links: [
        { label: 'GitHub', url: '#', icon: <Github className="h-4 w-4" /> },
        { label: 'Website', url: '#', icon: <Globe className="h-4 w-4" /> },
      ],
      projects: 12,
      followers: 2400,
    },
    {
      id: '2',
      name: 'Sarah Lee',
      title: 'Content Creator & Marketing Strategist',
      bio: 'Help startups tell their story. Obsessed with growth and community building.',
      image: placeholderImages['testimonial-2'].url,
      skills: ['Content Strategy', 'Community', 'Personal Branding', 'Analytics'],
      links: [
        { label: 'LinkedIn', url: '#', icon: <Linkedin className="h-4 w-4" /> },
        { label: 'Website', url: '#', icon: <Globe className="h-4 w-4" /> },
      ],
      projects: 8,
      followers: 3200,
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      title: 'Product Designer & UX Research',
      bio: 'Designing delightful products. Data-driven design advocate.',
      image: placeholderImages['testimonial-3'].url,
      skills: ['UI/UX Design', 'User Research', 'Design Systems', 'Prototyping'],
      links: [
        { label: 'Portfolio', url: '#', icon: <Globe className="h-4 w-4" /> },
        { label: 'LinkedIn', url: '#', icon: <Linkedin className="h-4 w-4" /> },
      ],
      projects: 15,
      followers: 1800,
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      title: 'Data Scientist & Entrepreneur',
      bio: 'ML engineer building predictive analytics for e-commerce.',
      image: placeholderImages['article-card'].url,
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      links: [
        { label: 'GitHub', url: '#', icon: <Github className="h-4 w-4" /> },
        { label: 'Website', url: '#', icon: <Globe className="h-4 w-4" /> },
      ],
      projects: 9,
      followers: 1600,
    },
  ];

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Talent Showcase</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover and connect with talented builders, creators, and engineers building amazing things.
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Search */}
      <section className="bg-card py-8">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl mx-auto">
              <Input
                placeholder="Search by name, skill, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-muted-foreground mb-8">
              Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
            </p>
          </FadeInOnScroll>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.map((creator) => (
              <StaggerItem key={creator.id}>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{creator.name}</h3>
                        <p className="text-sm text-primary">{creator.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground mb-4">{creator.bio}</p>
                    
                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {creator.skills.map((skill) => (
                          <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 py-4 border-y">
                      <div>
                        <p className="text-2xl font-bold">{creator.projects}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{(creator.followers / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      {creator.links.map((link) => (
                        <Button key={link.label} asChild variant="outline" size="sm" className="flex-1">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                            <span className="hidden sm:inline ml-1">{link.label}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredCreators.length === 0 && (
            <FadeInOnScroll className="text-center py-12">
              <p className="text-muted-foreground">No creators found matching your search.</p>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      {/* Showcase Your Work CTA */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-16">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-2xl text-center mx-auto">
              <h2 className="font-headline text-3xl font-bold mb-4">Showcase Your Work</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get featured in our talent showcase and connect with fellow builders. Submit your profile today.
              </p>
              <Button size="lg">Get Featured</Button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
