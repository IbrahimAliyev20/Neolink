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

/**
 * Figma: `Frame 2085665804` — date · category with a 2px dot. Typography and
 * horizontal padding come from the caller since the wide card and the small
 * cards differ (12/16 Medium vs 10/14 Regular on mobile).
 */
function PostMeta({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-[6px] ${className ?? ""}`}>
      <span>{date}</span>
      <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-current" />
      <span>{category}</span>
    </div>
  );
}

/**
 * Figma desktop: `Frame 2147224641` (1920x796) — column, py 90, gap 48.
 * Header row (1440, space-between) + `Frame 2147224631` (710 wide feature card
 * + gap 20 + 710 column with two 345 cards and the "see all" link).
 * Figma mobile: `Home-statistics` (375x657) — py 36 / px 16, column gap 24,
 * centred heading, 343x213 wide card, then two 167 cards in a row (gap 12).
 */
export function BlogSection() {
  return (
    <section className="w-full py-9 lg:py-[90px]">
      <Container className="flex flex-col gap-6 lg:gap-12 2xl:px-0">
        {/* Figma: Frame 16 / Frame 2147224638 — mobile centred column gap 12;
            desktop row, space-between, align center, gap 24 */}
        <div className="flex flex-col gap-3 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-left">
          <h2 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-[#1c1c1e] md:text-[36px] md:leading-[48px] lg:w-[34.24%] lg:shrink-0 lg:text-[48px] lg:leading-[64px] lg:tracking-[0]">
            Rəqəmsal Dünyadan Yeniliklər
          </h2>
          <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px] lg:w-[51.32%]">
            Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual
            məqalələr və ekspert fikirləri ilə gündəmdən geri qalmayın.
          </p>
        </div>

        {/* Figma: Frame 2147224631 — mobile column gap 12; desktop row, gap 20 */}
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
          {/* Figma: Blog-wide — 710x440, r16, border #F2F4F8, gradient scrim */}
          <Link
            href="/blog"
            className="relative block aspect-[710/440] h-auto max-h-[440px] w-full min-w-0 overflow-hidden rounded-[14px] border border-[#f2f4f8] lg:w-[49.31%] lg:rounded-[16px]"
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

            {/* Figma: Frame 2085665803 — bottom aligned; mobile gap 12 / p 0 12 16,
                desktop gap 24 / p 0 24 32 */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-3 pb-4 lg:gap-6 lg:px-6 lg:pb-8">
              <PostMeta className="px-2 text-[12px] leading-[16px] font-medium tracking-[0] text-[#e7e7ea]" />
              {/* Figma: Content — mobile gap 8, desktop gap 12, px 8 */}
              <div className="flex flex-col gap-2 px-2 lg:gap-3">
                <h3 className="line-clamp-2 max-w-[554px] text-[16px] leading-[24px] font-medium tracking-[0.01em] text-white lg:text-[24px] lg:leading-[32px] lg:font-semibold">
                  Müasir Bizneslər Üçün Xüsusi Proqram Təminatının Üstünlükləri
                </h3>
                <p className="line-clamp-1 text-[12px] leading-[16px] font-normal tracking-[0.01em] text-[#e7e7ea] lg:text-[16px] lg:leading-[24px]">
                  {excerpt}
                </p>
              </div>
            </div>
          </Link>

          {/* Figma: Frame 2147225052 — column, centered; mobile gap 24, desktop 48 */}
          <div className="flex min-w-0 flex-col items-center gap-6 lg:w-[49.31%] lg:gap-12">
            {/* Figma: Frame 2147225054 / 2147225051 — row; mobile gap 12, desktop 20 */}
            <div className="flex w-full gap-3 lg:gap-5">
              {posts.map((post, index) => (
                <Link
                  key={index}
                  href="/blog"
                  className="flex w-full min-w-0 flex-col gap-3 lg:gap-4"
                >
                  {/* Figma: Frame 2147224960 — 167x128 r14 mobile / 345x264 r16 desktop */}
                  <div className="relative aspect-[345/264] h-auto max-h-[264px] w-full overflow-hidden rounded-[14px] border border-[#f2f4f8] bg-white lg:rounded-[16px]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 345px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Figma: Frame 2085665803 — column; mobile gap 6, desktop 12 */}
                  <div className="flex flex-col gap-[6px] lg:gap-3">
                    <PostMeta className="px-1 text-[10px] leading-[14px] font-normal tracking-[0.01em] text-neo-muted lg:px-2 lg:text-[12px] lg:leading-[16px] lg:font-medium lg:tracking-[0]" />
                    {/* Figma: Content — column, gap 4; px 4 mobile / 8 desktop */}
                    <div className="flex flex-col gap-1 px-1 lg:px-2">
                      <h3 className="line-clamp-1 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-[#20201e] lg:text-[18px] lg:leading-[24px] lg:tracking-[0]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-1 text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted lg:text-[16px] lg:leading-[24px]">
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
