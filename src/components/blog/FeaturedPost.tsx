import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data/blogs";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="border border-[#f2f4f8] h-[440px] relative rounded-2xl shrink-0 w-full lg:w-[710px] overflow-hidden block"
    >
      <Image
        src={post.image}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 710px, 100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(237,237,237,0.06)] via-[44.723%] via-[rgba(36,37,38,0.27)] to-[rgba(14,14,17,0.48)]" />
      <div className="absolute bottom-0 left-0 flex flex-col gap-6 items-start px-6 pb-8 w-full">
        <div className="flex items-center gap-1.5 px-2">
          <p className="font-medium text-[#e7e7ea] text-xs whitespace-nowrap">{post.dateLabel}</p>
          <div className="bg-[#e7e7ea] rounded-full shrink-0 size-0.5" />
          <p className="font-medium text-[#e7e7ea] text-xs whitespace-nowrap">{post.category}</p>
        </div>
        <div className="flex flex-col gap-3 items-start px-2 w-full">
          <p className="font-semibold text-2xl leading-8 text-white tracking-[0.24px] w-full">
            {post.title}
          </p>
          <p className="text-base leading-6 text-[#e7e7ea] tracking-[0.16px] w-full truncate">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
