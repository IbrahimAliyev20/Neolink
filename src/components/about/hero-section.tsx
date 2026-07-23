import Container from "@/components/shared/container";

export function HeroSection() {
  return (
    <Container className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-3 items-start w-full lg:flex-row lg:justify-between lg:gap-10">
        <h1 className="font-semibold text-[#1c1c1e] text-[20px] leading-7 tracking-[0.2px] w-full lg:text-[48px] lg:leading-[64px] lg:tracking-normal lg:max-w-[424px] lg:shrink-0">
          Bizi Yaxından Tanıyın
        </h1>
        <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px] lg:max-w-[739px] lg:flex-1 lg:min-w-0">
          Neoline müasir bizneslərin rəqəmsal inkişafını dəstəkləyən innovativ proqram
          təminatı şirkətidir. Biz müəssisələrin ehtiyaclarına uyğun veb platformalar,
          mobil tətbiqlər, korporativ sistemlər və fərdi proqram həlləri hazırlayırıq.
          Məqsədimiz texnologiyanı sadəcə alət kimi deyil, bizneslərin inkişafına töhfə
          verən strateji dəyər kimi təqdim etməkdir.
        </p>
      </div>
    </Container>
  );
}
