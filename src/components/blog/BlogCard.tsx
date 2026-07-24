import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group/card flex flex-col gap-3 items-start w-full lg:gap-4"
    >
      <div className="border border-[#f2f4f8] h-[128px] relative rounded-[14px] w-full overflow-hidden lg:h-[264px] lg:rounded-2xl">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-[1.05]"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>
      <div className="flex flex-col gap-1.5 items-start w-full lg:gap-3">
        <div className="flex items-center gap-1.5 px-1 lg:px-2">
          {post.dateLabel && (
            <>
              <p className="font-normal text-[#5b606f] text-[10px] leading-[14px] tracking-[0.1px] whitespace-nowrap lg:font-medium lg:text-xs lg:leading-normal lg:tracking-normal">{post.dateLabel}</p>
              <div className="bg-[#5b606f] rounded-full shrink-0 size-0.5" />
            </>
          )}
          <p className="font-normal text-[#5b606f] text-[10px] leading-[14px] tracking-[0.1px] whitespace-nowrap lg:font-medium lg:text-xs lg:leading-normal lg:tracking-normal">{post.category}</p>
        </div>
        <div className="flex flex-col gap-1 items-start px-1 lg:px-2 w-full">
          <p className="font-medium text-[#20201e] text-sm leading-5 tracking-[0.14px] truncate w-full lg:text-lg lg:leading-normal lg:tracking-normal">{post.title}</p>
          <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] truncate w-full lg:text-base lg:leading-normal lg:tracking-[0.16px]">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
