import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { blogPosts } from "@/lib/data/blogs";
import { BlogCard } from "@/components/blog/BlogCard";

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const relatedPosts = blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 4);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-12 items-center py-[90px] w-full">
      <div className="flex flex-col gap-5 items-center text-center max-w-[566px] px-4">
        <h2 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
          Rəqəmsal Dünyadan Yeniliklər
        </h2>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      <Container className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
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
