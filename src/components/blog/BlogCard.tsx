import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="flex flex-col gap-4 items-start w-full">
      <div className="border border-[#f2f4f8] h-[264px] relative rounded-2xl w-full overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex items-center gap-1.5 px-2">
          <p className="font-medium text-[#5b606f] text-xs whitespace-nowrap">{post.dateLabel}</p>
          <div className="bg-[#5b606f] rounded-full shrink-0 size-0.5" />
          <p className="font-medium text-[#5b606f] text-xs whitespace-nowrap">{post.category}</p>
        </div>
        <div className="flex flex-col gap-1 items-start px-2 w-full">
          <p className="font-medium text-[#20201e] text-lg truncate w-full">{post.title}</p>
          <p className="text-[#5b606f] text-base tracking-[0.16px] truncate w-full">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
