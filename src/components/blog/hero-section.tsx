import Container from "@/components/shared/container";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import type { BlogPost } from "@/lib/data/blogs";

export function HeroSection({ featuredPost }: { featuredPost: BlogPost | undefined }) {
  return (
    <Container className="flex flex-col lg:flex-row gap-10 items-center justify-between w-full">
      <div className="flex flex-col gap-5 items-start w-full lg:w-[560px]">
        <h1 className="font-semibold text-[#1c1c1e] text-[48px] leading-[64px] w-full">
          Rəqəmsal Dünyadan Yeniliklər
        </h1>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      {featuredPost && <FeaturedPost post={featuredPost} />}
    </Container>
  );
}
