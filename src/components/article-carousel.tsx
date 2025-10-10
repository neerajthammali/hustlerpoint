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

type ArticleCarouselProps = {
  articles: Article[];
};

export function ArticleCarousel({ articles }: ArticleCarouselProps) {
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
          <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
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
