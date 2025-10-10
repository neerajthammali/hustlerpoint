
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote: "Hustler's Point is my go-to for no-fluff, actionable advice. The articles on startup growth have been a game-changer for my own venture.",
    author: "Alex Johnson",
    title: "Founder, TechSavvy",
    avatar: "https://picsum.photos/seed/test1/40/40",
  },
  {
    quote: "The productivity hacks are pure gold. I've streamlined my workflow and saved hours every week thanks to the tips I've picked up here.",
    author: "Samantha Lee",
    title: "Freelance Developer",
    avatar: "https://picsum.photos/seed/test2/40/40",
  },
  {
    quote: "As someone navigating the creator economy, the insights from Hustler's Point are invaluable. It's like having a mentor in my pocket.",
    author: "David Chen",
    title: "YouTuber",
    avatar: "https://picsum.photos/seed/test3/40/40",
  },
];


export function TestimonialsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-4 h-full">
              <Card className="h-full flex flex-col justify-between text-left">
                <CardContent className="p-6">
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
                <div className="flex items-center gap-4 border-t p-6 bg-card/50">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} data-ai-hint="person avatar" />
                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
