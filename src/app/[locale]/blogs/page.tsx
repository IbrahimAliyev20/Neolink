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
    <div className="bg-[#f7f7f7] flex flex-col gap-9 items-center pt-16 pb-[90px] w-full">
      <HeroSection featuredPost={featuredPost} />
      <GridSection activeCategory={activeCategory} onChange={setActiveCategory} posts={gridPosts} />
    </div>
  );
}
