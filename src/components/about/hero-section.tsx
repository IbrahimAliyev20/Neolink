import Container from "@/components/shared/container";

export function HeroSection() {
  return (
    <Container className="flex flex-col items-center w-full">
      <div className="flex items-start justify-between gap-10 w-full">
        <h1 className="font-semibold text-[#1c1c1e] text-[48px] leading-[64px] max-w-[424px] shrink-0">
          Bizi Yaxından Tanıyın
        </h1>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] max-w-[739px] flex-1 min-w-0">
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
