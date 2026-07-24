"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "@/components/blog/hero-section";
import { GridSection } from "@/components/blog/grid-section";
import { mapApiBlog } from "@/lib/data/blogs";
import { useTags } from "@/services/tags/queries";
import { useBlogs, useBlogsByTag } from "@/services/blog/queries";

export default function BlogPage() {
  const { data: tags } = useTags();
  const { data: allBlogs } = useBlogs();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Only keep tags that actually have at least one blog, so empty tabs are
  // never shown. Content presence is derived from the `/blogs` list.
  const availableTags = useMemo(() => {
    if (!tags) return [];
    if (!allBlogs) return tags;
    const tagsWithBlogs = new Set(allBlogs.map((blog) => blog.tag));
    return tags.filter((tag) => tagsWithBlogs.has(tag.name));
  }, [tags, allBlogs]);

  // Default to the first available tag (and correct the selection if the active
  // one drops out of the list).
  useEffect(() => {
    if (
      availableTags.length > 0 &&
      !availableTags.some((tag) => tag.slug === activeSlug)
    ) {
      setActiveSlug(availableTags[0].slug);
    }
  }, [availableTags, activeSlug]);

  const { data: apiBlogs } = useBlogsByTag(activeSlug ?? undefined);

  const posts = useMemo(() => (apiBlogs ?? []).map(mapApiBlog), [apiBlogs]);

  // The first blog headlines the hero. With more than one blog the rest fill
  // the grid; with a single blog it also appears in the grid so the lower part
  // of the page isn't left empty.
  const featuredPost = posts[0];
  const gridPosts = posts.length > 1 ? posts.slice(1) : posts;

  const categories = availableTags.map((tag) => tag.name);
  const activeCategory =
    availableTags.find((tag) => tag.slug === activeSlug)?.name ??
    categories[0] ??
    "";

  const handleChange = (name: string) => {
    const tag = availableTags.find((t) => t.name === name);
    if (tag) setActiveSlug(tag.slug);
  };

  return (
    <div className="flex flex-col gap-8 items-center pt-8 pb-12 w-full lg:gap-9 lg:pt-16 lg:pb-[90px]">
      <HeroSection featuredPost={featuredPost} />
      <GridSection
        categories={categories}
        activeCategory={activeCategory}
        onChange={handleChange}
        posts={gridPosts}
      />
    </div>
  );
}
