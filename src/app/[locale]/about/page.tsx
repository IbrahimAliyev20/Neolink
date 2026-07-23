import Image from "next/image";
import Container from "@/components/shared/container";
import aboutFeature from "../../../../public/images/about-feature.jpg";
import aboutProcess from "../../../../public/images/about-process.jpg";
import aboutTestimonialFeature from "../../../../public/images/about-testimonial-feature.jpg";
import aboutContactArt from "../../../../public/images/about-contact-art.png";

const processSteps = [
  {
    key: "discover",
    icon: "/icons/process-discover.svg",
    title: "Kəşf və Analiz",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
  },
  {
    key: "design",
    icon: "/icons/process-design.svg",
    title: "Dizayn və İnkişaf",
    description:
      "Müasir texnologiyalar və istifadəçi yönümlü yanaşma ilə etibarlı rəqəmsal həllər hazırlayırıq.",
  },
  {
    key: "launch",
    icon: "/icons/process-launch.svg",
    title: "Tətbiq və Davamlı Dəstək",
    description:
      "Layihəni uğurla istifadəyə təqdim edir, davamlı texniki dəstək və inkişaf təmin edirik.",
  },
] as const;

function StatisticsCard({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="backdrop-blur-lg flex flex-col items-start p-5 rounded-xl w-full flex-1 min-w-0 text-white"
      style={{
        backgroundImage:
          "linear-gradient(106.14deg, rgb(33, 203, 178) 17.782%, rgb(38, 189, 184) 63.245%)",
      }}
    >
      <div className="flex flex-col gap-2 items-start font-semibold whitespace-nowrap">
        <p className="text-[40px] leading-[56px] tracking-[0.4px]">{value}</p>
        <p className="text-xl leading-[28px] tracking-[0.2px]">{title}</p>
      </div>
      <p className="text-base leading-6 tracking-[0.16px] mt-2.5">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#f7f7f7] flex flex-col gap-16 items-start pb-[90px] pt-16 w-full">
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

        <div className="flex flex-col gap-5 items-start w-full">
          <Container className="flex flex-col items-center w-full">
            <div className="flex gap-5 items-start w-full">
              <div className="border border-[#e7e7ea] relative rounded-[20px] self-stretch flex-1 min-w-0 overflow-hidden">
                <Image
                  src={aboutFeature}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col gap-5 items-start justify-center flex-1 min-w-0">
                <div className="bg-white border border-[#e7e7ea] flex flex-col gap-10 items-start px-7 py-6 rounded-[20px] w-full">
                  <p className="font-medium text-[#040711] text-[32px] leading-10 tracking-[0.32px] whitespace-nowrap">
                    Missiyamız
                  </p>
                  <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
                    Neoline olaraq missiyamız bizneslərin rəqəmsal transformasiya prosesini
                    sürətləndirən, innovativ və etibarlı proqram təminatı həlləri təqdim
                    etməkdir. Müştərilərimizin qarşılaşdığı problemləri dərindən analiz edərək
                    onların fəaliyyətinə real dəyər qatan fərdi həllər hazırlayırıq. Hər
                    layihədə istifadəçi təcrübəsini, funksionallığı və texnoloji
                    mükəmməlliyi əsas prioritet kimi qəbul edirik.
                  </p>
                </div>
                <div className="bg-[#0d153a] border border-[#e7e7ea] flex flex-col gap-10 items-start px-7 py-6 rounded-[20px] w-full text-[#e7e7ea]">
                  <p className="font-medium text-[32px] leading-10 tracking-[0.32px] whitespace-nowrap">
                    Gələcəyə Baxışımız
                  </p>
                  <p className="text-base leading-6 tracking-[0.16px]">
                    Məqsədimiz innovativ yanaşması, texniki peşəkarlığı və yüksək xidmət
                    keyfiyyəti ilə seçilən aparıcı proqram təminatı şirkətlərindən birinə
                    çevrilməkdir. Texnologiyanın daim dəyişən dünyasında yenilikləri
                    izləməklə kifayətlənmir, onları bizneslər üçün praktik və effektiv
                    həllərə çeviririk. Gələcək vizyonumuz müxtəlif sahələrdə fəaliyyət
                    göstərən şirkətlərin rəqəmsal inkişafına töhfə verməkdir.
                  </p>
                </div>
              </div>
            </div>
          </Container>

          <Container className="flex flex-col items-center w-full">
            <div className="flex gap-5 items-start w-full">
              <StatisticsCard
                value="15+"
                title="Sahə üzrə Ekspert"
                description="Fərqli sahələrdə təcrübəli komandamızla layihələrinizi peşəkar şəkildə idarə edirik."
              />
              <StatisticsCard
                value="40+"
                title="Uğurla Tamamlanmış Layihə"
                description="Müxtəlif miqyaslı layihələri uğurla həyata keçirərək dəyər yaradırıq."
              />
              <StatisticsCard
                value="98%"
                title="Müştəri Məmnuniyyəti"
                description="Müştərilərimizin məmnuniyyəti bizim üçün ən vacib göstəricidir."
              />
            </div>
          </Container>
        </div>
      </div>

      <div className="bg-white flex flex-col items-start w-full">
        <Container className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row gap-10 md:gap-[102px] items-center py-[90px] w-full">
            <div className="flex flex-col gap-12 items-start flex-1 min-w-0 w-full">
              <div className="flex flex-col gap-6 items-start w-full">
                <h2 className="font-semibold text-[#040711] text-[56px] leading-[72px] max-w-[566px]">
                  Necə işləyirik?
                </h2>
                <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
                  Neoline olaraq hər layihəyə planlı, şəffaf və nəticəyönümlü yanaşırıq.
                  Analizdən inkişaf mərhələsinə, tətbiqdən texniki dəstəyə qədər bütün
                  prosesi peşəkar komandamızla birlikdə idarə edirik.
                </p>
              </div>
              <div className="flex flex-col gap-5 items-start w-full">
                {processSteps.map((step) => (
                  <div key={step.key} className="flex gap-5 items-start w-full">
                    <div className="bg-[#0d153a] flex items-center justify-center p-2.5 rounded-xl shrink-0 size-14">
                      <Image src={step.icon} alt="" width={32} height={32} />
                    </div>
                    <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
                      <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full">
                        {step.title}
                      </p>
                      <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#e7e7ea] h-[474px] relative rounded-[20px] flex-1 min-w-0 w-full overflow-hidden">
              <Image
                src={aboutProcess}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white flex flex-col items-center w-full pb-[90px]">
        <Container className="flex flex-col items-center gap-11 w-full">
          <div className="flex items-start justify-between gap-10 w-full">
            <h2 className="font-semibold text-[#1c1c1e] text-[48px] leading-[64px] max-w-[424px] shrink-0">
              Etibarla Qurulan <span className="text-[#3abdaa]">Əməkdaşlıqlar!</span>
            </h2>
            <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] max-w-[656px] flex-1 min-w-0">
              Hər uğurlu layihənin arxasında etibar, şəffaf əməkdaşlıq və ortaq məqsədlər
              dayanır. Müştərilərimizin fikirləri bizim üçün yalnız rəy deyil, davamlı
              inkişafımızın ən dəyərli göstəricisidir.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
            <div className="flex flex-col gap-5 items-start flex-[3] min-w-0 w-full">
              <div className="bg-[#0d153a] border border-[#8e929c] flex flex-col h-[336px] items-start justify-between px-9 py-8 rounded-[20px] w-full">
                <p className="font-semibold text-[20px] leading-7 tracking-[0.2px]">
                  <span className="text-white">01</span>
                  <span className="text-[#b3b5bc]">/03</span>
                </p>
                <p className="font-normal text-white text-xl leading-7 tracking-[0.2px]">
                  &quot;İlk görüşdən layihənin təhvilinə qədər bütün proses şəffaf və
                  peşəkar şəkildə idarə olundu. Gözləntilərimizi qarşılayan, istifadəsi
                  rahat və keyfiyyətli bir məhsul əldə etdik.&quot;
                </p>
                <div className="flex items-end justify-between w-full">
                  <div className="flex flex-col gap-1.5 items-start">
                    <p className="font-semibold text-[#3abdaa] text-xl leading-7 tracking-[0.2px]">
                      Ayaz Afandiyev
                    </p>
                    <p className="text-[#b3b5bc] text-base leading-6 tracking-[0.16px]">
                      Co-Founder | Veysəloğlu
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      aria-label="Əvvəlki rəy"
                      className="bg-white/12 flex items-center justify-center p-2 rounded-full"
                    >
                      <Image src="/icons/chevron-left.svg" alt="" width={24} height={24} />
                    </button>
                    <button
                      type="button"
                      aria-label="Növbəti rəy"
                      className="bg-white/12 flex items-center justify-center p-2 rounded-full"
                    >
                      <Image src="/icons/chevron-right.svg" alt="" width={24} height={24} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-[#e7e7ea] h-[336px] relative rounded-[20px] w-full overflow-hidden">
                <Image
                  src={aboutTestimonialFeature}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
            </div>

            <div className="bg-white border border-[#e7e7ea] rounded-[20px] flex-[2] min-w-0 w-full h-[692px] overflow-hidden flex flex-col">
              <div className="relative w-full overflow-hidden shrink-0" style={{ aspectRatio: "558 / 495" }}>
                <Image
                  src={aboutContactArt}
                  alt=""
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-6 items-start px-8 pb-8 flex-1 justify-end">
                <div className="flex flex-col gap-3 items-start w-full">
                  <p className="font-medium text-[#040711] text-2xl leading-8 tracking-[0.24px]">
                    Başlamağa hazırsınız?
                  </p>
                  <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px]">
                    Məqsədlərinizi anlayır, ehtiyaclarınıza uyğun həllər hazırlayır və
                    layihənizi uğurla həyata keçiririk.
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-[#0d153a] flex gap-4 h-12 items-center justify-center px-6 py-3 rounded-full w-full"
                >
                  <span className="font-medium text-[#3abdaa] text-base leading-6 tracking-[0.16px]">
                    Gəlin başlayaq
                  </span>
                  <Image src="/icons/arrow-up-right.svg" alt="" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
