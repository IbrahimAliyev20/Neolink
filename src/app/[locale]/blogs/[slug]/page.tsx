"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { mapApiBlog } from "@/lib/data/blogs";
import { useBlog } from "@/services/blog/queries";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { HeroDetailSection } from "@/components/blog/hero-detail-section";
import { BlogHtmlContent } from "@/components/blog/html-content";

export default function BlogDetailPage() {
  const t = useTranslations("blog.detail");
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: apiBlog, isLoading } = useBlog(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!apiBlog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        {t("notFound")}
      </div>
    );
  }

  const post = mapApiBlog(apiBlog);

  return (
    <>
      <div className="bg-white flex flex-col items-center pb-12 lg:pb-[90px] w-full pt-8 lg:pt-16">
        <HeroDetailSection post={post}>
          <BlogHtmlContent html={apiBlog.description} />
        </HeroDetailSection>
      </div>

      <RelatedPosts currentSlug={post.slug} />
    </>
  );
}
