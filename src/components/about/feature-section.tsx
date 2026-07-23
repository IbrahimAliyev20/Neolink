import Image from "next/image";

import { ClipReveal } from "@/components/animation/clip-reveal";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import aboutFeature from "../../../public/images/about-feature.jpg";

export function FeatureSection() {
  return (
    <Container className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-3 items-start w-full lg:flex-row lg:gap-5">
        {/* Wipes open from the left while the copy swings in from the right. */}
        <ClipReveal className="border border-[#e7e7ea] relative rounded-2xl h-[248px] w-full overflow-hidden lg:rounded-[20px] lg:self-stretch lg:flex-1 lg:min-w-0 lg:h-auto">
          <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
            <Image
              src={aboutFeature}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Parallax>
        </ClipReveal>
        <Reveal
          x={72}
          y={24}
          scale={0.94}
          stagger={0.18}
          className="flex flex-col gap-3 items-start justify-center w-full lg:gap-5 lg:flex-1 lg:min-w-0"
        >
          <div className="bg-white border border-[#e7e7ea] flex flex-col gap-4 items-start px-3.5 py-4 rounded-2xl w-full lg:gap-10 lg:px-7 lg:py-6 lg:rounded-[20px]">
            <p className="font-medium text-[#040711] text-xl leading-7 tracking-[0.2px] whitespace-nowrap lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
              Missiyamız
            </p>
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              Neoline olaraq missiyamız bizneslərin rəqəmsal transformasiya prosesini
              sürətləndirən, innovativ və etibarlı proqram təminatı həlləri təqdim
              etməkdir. Müştərilərimizin qarşılaşdığı problemləri dərindən analiz edərək
              onların fəaliyyətinə real dəyər qatan fərdi həllər hazırlayırıq. Hər
              layihədə istifadəçi təcrübəsini, funksionallığı və texnoloji
              mükəmməlliyi əsas prioritet kimi qəbul edirik.
            </p>
          </div>
          <div className="bg-[#0d153a] border border-[#e7e7ea] flex flex-col gap-4 items-start px-3.5 py-4 rounded-2xl w-full text-[#e7e7ea] lg:gap-10 lg:px-7 lg:py-6 lg:rounded-[20px]">
            <p className="font-medium text-xl leading-7 tracking-[0.2px] whitespace-nowrap lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
              Gələcəyə Baxışımız
            </p>
            <p className="text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              Məqsədimiz innovativ yanaşması, texniki peşəkarlığı və yüksək xidmət
              keyfiyyəti ilə seçilən aparıcı proqram təminatı şirkətlərindən birinə
              çevrilməkdir. Texnologiyanın daim dəyişən dünyasında yenilikləri
              izləməklə kifayətlənmir, onları bizneslər üçün praktik və effektiv
              həllərə çeviririk. Gələcək vizyonumuz müxtəlif sahələrdə fəaliyyət
              göstərən şirkətlərin rəqəmsal inkişafına töhfə verməkdir.
            </p>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
