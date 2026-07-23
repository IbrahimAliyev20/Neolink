import Container from "@/components/shared/container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { blogCategories, type BlogCategory, type BlogPost } from "@/lib/data/blogs";

export function GridSection({
  activeCategory,
  onChange,
  posts,
}: {
  activeCategory: BlogCategory;
  onChange: (category: BlogCategory) => void;
  posts: BlogPost[];
}) {
  return (
    <Container className="flex flex-col gap-6 items-start w-full">
      <CategoryTabs categories={blogCategories} activeCategory={activeCategory} onChange={onChange} />

      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
