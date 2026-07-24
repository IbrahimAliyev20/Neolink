"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { type BlogPost } from "@/lib/data/blogs";

const PAGE_SIZE = 6;

export function GridSection({
  categories,
  activeCategory,
  onChange,
  posts,
}: {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  posts: BlogPost[];
}) {
  const tc = useTranslations("common");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset to the first page whenever the category (i.e. the post set) changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <Container className="flex flex-col gap-6 items-center w-full">
      <div className="w-full">
        <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={onChange} />
      </div>

      {visiblePosts.length > 0 && (
        /* Keyed on the category so switching tabs remounts the reveal and the
           new cards animate in instead of staying at their hidden start. */
        <Reveal
          key={activeCategory}
          y={64}
          scale={0.94}
          blur={8}
          stagger={0.14}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4 lg:gap-5 w-full"
        >
          {visiblePosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Reveal>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          className="flex gap-1.5 items-center cursor-pointer"
        >
          <span className="font-medium text-[#20201e] text-base leading-6">{tc("showMore")}</span>
          <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
        </button>
      )}
    </Container>
  );
}
