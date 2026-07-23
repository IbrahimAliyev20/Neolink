import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data/blogs";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="border border-[#f2f4f8] h-[213px] relative rounded-[14px] shrink-0 w-full lg:h-[440px] lg:rounded-2xl lg:w-[710px] overflow-hidden block"
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
      <div className="absolute bottom-0 left-0 flex flex-col gap-3 items-start px-3 pb-4 w-full lg:gap-6 lg:px-6 lg:pb-8">
        <div className="flex items-center gap-1.5 px-2">
          <p className="font-medium text-[#e7e7ea] text-xs whitespace-nowrap">{post.dateLabel}</p>
          <div className="bg-[#e7e7ea] rounded-full shrink-0 size-0.5" />
          <p className="font-medium text-[#e7e7ea] text-xs whitespace-nowrap">{post.category}</p>
        </div>
        <div className="flex flex-col gap-2 items-start px-2 w-full lg:gap-3">
          <p className="font-medium text-base leading-6 text-white tracking-[0.16px] w-full lg:font-semibold lg:text-2xl lg:leading-8 lg:tracking-[0.24px]">
            {post.title}
          </p>
          <p className="text-xs leading-4 text-[#e7e7ea] tracking-[0.12px] w-full truncate lg:text-base lg:leading-6 lg:tracking-[0.16px]">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
