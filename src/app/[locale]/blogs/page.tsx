"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "@/components/blog/hero-section";
import { GridSection } from "@/components/blog/grid-section";
import { blogCategories, blogPosts, type BlogCategory } from "@/lib/data/blogs";

function getFeaturedPost(category: BlogCategory) {
  return blogPosts
    .filter((post) => post.category === category)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(blogCategories[0]);

  const featuredPost = useMemo(() => getFeaturedPost(activeCategory), [activeCategory]);

  const gridPosts = useMemo(
    () =>
      blogPosts.filter(
        (post) => post.category === activeCategory && post.slug !== featuredPost?.slug
      ),
    [activeCategory, featuredPost]
  );

  return (
    <div className="flex flex-col gap-8 items-center pt-8 pb-12 w-full lg:gap-9 lg:pt-16 lg:pb-[90px]">
      <HeroSection featuredPost={featuredPost} />
      <GridSection activeCategory={activeCategory} onChange={setActiveCategory} posts={gridPosts} />
    </div>
  );
}
