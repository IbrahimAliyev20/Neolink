import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { Parallax } from "@/components/animation/parallax";
import type { BlogPost } from "@/lib/data/blogs";

export function FeaturedPost({ post }: { post: BlogPost }) {
  // Marked for the hero's on-load timeline (clip wipe). `data-hero-anim` holds
  // it hidden via globals.css until that runs, so it never flashes in.
  return (
    <Link
      data-hero-anim
      data-feat-media
      href={`/blogs/${post.slug}`}
      className="group/featured border border-[#f2f4f8] h-[213px] relative rounded-[14px] w-full shrink-0 lg:h-[440px] lg:w-[710px] lg:rounded-2xl overflow-hidden block"
    >
      <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover/featured:scale-[1.04]"
          sizes="(min-width: 1024px) 710px, 100vw"
          priority
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(237,237,237,0.06)] via-[44.723%] via-[rgba(36,37,38,0.27)] to-[rgba(14,14,17,0.48)]" />
      <div className="absolute bottom-0 left-0 flex flex-col gap-3 items-start px-3 pb-4 w-full lg:gap-6 lg:px-6 lg:pb-8">
        <div className="flex items-center gap-1.5 px-2">
          {post.dateLabel && (
            <>
              <p className="font-medium text-[#e7e7ea] text-xs whitespace-nowrap">{post.dateLabel}</p>
              <div className="bg-[#e7e7ea] rounded-full shrink-0 size-0.5" />
            </>
          )}
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
