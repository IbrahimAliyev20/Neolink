import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import Container from "@/components/shared/container";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import type { BlogPost } from "@/lib/data/blogs";

export function HeroSection({ featuredPost }: { featuredPost: BlogPost | undefined }) {
  return (
    <Container className="flex flex-col gap-5 lg:flex-row lg:gap-10 items-center justify-between w-full">
      <div className="flex flex-col gap-3 items-start w-full lg:gap-5 lg:w-[560px]">
        <SplitLines>
          <h1 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] w-full lg:text-[48px] lg:leading-[64px] lg:tracking-normal">
            Rəqəmsal Dünyadan Yeniliklər
          </h1>
        </SplitLines>
        <Reveal y={48} blur={8} className="w-full">
          <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
            Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
            fikirləri ilə gündəmdən geri qalmayın.
          </p>
        </Reveal>
      </div>

      {featuredPost && <FeaturedPost post={featuredPost} />}
    </Container>
  );
}
