"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { mapApiBlog } from "@/lib/data/blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { useBlogs } from "@/services/blog/queries";

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const { data: apiBlogs } = useBlogs();

  // All blogs except the one being read, capped at four.
  const relatedPosts = (apiBlogs ?? [])
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 4)
    .map(mapApiBlog);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-5 items-center py-9 w-full lg:gap-12 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[566px]">
        <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
          Digər Bloqlarla Tanış olun
        </h2>
        <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
          Biznesinizin müxtəlif ehtiyaclarını qarşılamaq üçün təqdim etdiyimiz əlavə
          xidmətlərlə tanış olun.
        </p>
      </div>

      <Container className="flex flex-col items-center w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4 lg:gap-5 w-full">
          {relatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>

      <Link href="/blogs" className="flex gap-1.5 items-center">
        <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
        <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
