import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data/blogs";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { HeroDetailSection } from "@/components/blog/hero-detail-section";
import { ContentSection } from "@/components/blog/content-section";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.content || !post.coverImage) {
    notFound();
  }

  return (
    <>
      <div className="bg-white flex flex-col items-center pb-[90px] w-full">
        <HeroDetailSection post={post}>
          <ContentSection content={post.content} />
        </HeroDetailSection>
      </div>

      <RelatedPosts currentSlug={post.slug} />
    </>
  );
}
