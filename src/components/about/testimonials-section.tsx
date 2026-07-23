import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/container";
import aboutTestimonialFeature from "../../../public/images/about-testimonial-feature.jpg";
import aboutContactArt from "../../../public/images/about-contact-art.png";

export function TestimonialsSection() {
  return (
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
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Növbəti rəy"
                    className="bg-white/12 flex items-center justify-center p-2 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
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
                <ArrowUpRight className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
