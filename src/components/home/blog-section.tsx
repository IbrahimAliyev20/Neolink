import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/shared/container";

const posts = [
  {
    title: "Müasir Bizneslər üçün Xüsusi Proqram Təminatının Üstünlükləri",
    image: "/images/blog-card-1.png",
  },
  {
    title: "Müasir Bizneslər üçün Xüsusi Proqram Təminatının Üstünlükləri",
    image: "/images/blog-card-2.png",
  },
];

const date = "27 iyul 2026";
const category = "Texnologiya";
const excerpt =
  "Standart həllərdən fərqli olaraq, xüsusi proqram təminatı biznesinizin ehtiyaclarına uyğun hazırlanır, iş proseslərini optimallaşdırır və uzunmüddətli inkişaf üçün daha çevik imkanlar yara";

/** Figma: `Frame 2085665804` — date · category, 12/16 Medium with a 2px dot. */
function PostMeta({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-[6px] px-2 ${className ?? ""}`}>
      <span className="text-[12px] leading-[16px] font-medium tracking-[0]">
        {date}
      </span>
      <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-current" />
      <span className="text-[12px] leading-[16px] font-medium tracking-[0]">
        {category}
      </span>
    </div>
  );
}

/**
 * Figma: `Frame 2147224641` (1920x796) — column, py 90, gap 48.
 * Header row (1440, space-between) + `Frame 2147224631` (710 wide feature card
 * + gap 20 + 710 column with two 345 cards and the "see all" link).
 */
export function BlogSection() {
  return (
    <section className="w-full py-[60px] lg:py-[90px]">
      <Container className="flex flex-col gap-10 lg:gap-12 2xl:px-0">
        {/* Figma: Frame 2147224638 — row, space-between, align center, gap 24 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <h2 className="text-[36px] leading-[48px] font-semibold tracking-[0] text-[#1c1c1e] lg:w-[34.24%] lg:shrink-0 lg:text-[48px] lg:leading-[64px]">
            Rəqəmsal Dünyadan Yeniliklər
          </h2>
          <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted lg:w-[51.32%]">
            Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual
            məqalələr və ekspert fikirləri ilə gündəmdən geri qalmayın.
          </p>
        </div>

        {/* Figma: Frame 2147224631 — row, gap 20 */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Figma: Blog-wide — 710x440, r16, border #F2F4F8, gradient scrim */}
          <Link
            href="/blog"
            className="relative block aspect-[710/440] h-auto max-h-[440px] w-full min-w-0 overflow-hidden rounded-[16px] border border-[#f2f4f8] lg:w-[49.31%]"
          >
            <Image
              src="/images/blog-wide.png"
              alt=""
              fill
              sizes="(min-width: 1536px) 710px, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.48]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237,237,237,0.12) 18%, rgba(36,37,38,0.56) 44.72%, rgba(14,14,17,1) 64%)",
              }}
            />

            {/* Figma: Frame 2085665803 — bottom aligned, gap 24, p 0 24 32 */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-8">
              <PostMeta className="text-[#e7e7ea]" />
              {/* Figma: Content — column, gap 12, px 8 */}
              <div className="flex flex-col gap-3 px-2">
                <h3 className="line-clamp-2 max-w-[554px] text-[24px] leading-[32px] font-semibold tracking-[0.01em] text-white">
                  Müasir Bizneslər Üçün Xüsusi Proqram Təminatının Üstünlükləri
                </h3>
                <p className="line-clamp-1 text-[16px] leading-[24px] font-normal tracking-[0.01em] text-[#e7e7ea]">
                  {excerpt}
                </p>
              </div>
            </div>
          </Link>

          {/* Figma: Frame 2147225052 — column, gap 48, centered, width 710 */}
          <div className="flex min-w-0 flex-col items-center gap-8 lg:w-[49.31%] lg:gap-12">
            {/* Figma: Frame 2147225051 — row, gap 20 */}
            <div className="flex w-full flex-col gap-5 sm:flex-row">
              {posts.map((post, index) => (
                <Link
                  key={index}
                  href="/blog"
                  className="flex w-full min-w-0 flex-col gap-4"
                >
                  {/* Figma: Frame 2147224960 — 345x264, r16, border #F2F4F8 */}
                  <div className="relative aspect-[345/264] h-auto max-h-[264px] w-full overflow-hidden rounded-[16px] border border-[#f2f4f8] bg-white">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 345px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Figma: Frame 2085665803 — column, gap 12 */}
                  <div className="flex flex-col gap-3">
                    <PostMeta className="text-neo-muted" />
                    {/* Figma: Content — column, gap 4, px 8 */}
                    <div className="flex flex-col gap-1 px-2">
                      <h3 className="line-clamp-1 text-[18px] leading-[24px] font-medium tracking-[0] text-[#20201e]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-1 text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                        {excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Figma: See all button — text 16/24 Medium + chevron 24 */}
            <Link
              href="/blog"
              className="flex items-center gap-[6px] text-[16px] leading-[24px] font-medium tracking-[0] text-[#20201e]"
            >
              Hamısına bax
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
