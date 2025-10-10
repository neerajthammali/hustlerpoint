
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Article } from "@/lib/types";
import ArticleCard from "./article-card";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "./ui/skeleton";

type ArticleCarouselProps = {
  articles: Article[];
  isLoading?: boolean;
};

export function ArticleCarousel({ articles, isLoading }: ArticleCarouselProps) {

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-1 md:basis-1/2 lg:basis-1/3 w-full">
              <div className="h-full overflow-hidden rounded-lg border bg-card shadow-sm">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="mt-4 pt-4">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem key={article.slug} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <ArticleCard article={article} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
