import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { type BlogPost } from "@/lib/data/blogs";

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
  return (
    <Container className="flex flex-col gap-6 items-start w-full">
      <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={onChange} />

      {posts.length > 0 && (
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
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Reveal>
      )}
    </Container>
  );
}
