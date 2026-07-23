"use client";

import { useMemo, useState } from "react";
import Container from "@/components/shared/container";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
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
      <Container className="flex flex-col lg:flex-row gap-10 items-center justify-between w-full">
        <div className="flex flex-col gap-5 items-start w-full lg:w-[560px]">
          <h1 className="font-semibold text-[#1c1c1e] text-[48px] leading-[64px] w-full">
            Rəqəmsal Dünyadan Yeniliklər
          </h1>
          <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
            Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
            fikirləri ilə gündəmdən geri qalmayın.
          </p>
        </div>

        {featuredPost && <FeaturedPost post={featuredPost} />}
      </Container>

      <Container className="flex flex-col gap-6 items-start w-full">
        <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
