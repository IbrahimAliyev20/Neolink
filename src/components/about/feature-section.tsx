import Image from "next/image";
import Container from "@/components/shared/container";
import aboutFeature from "../../../public/images/about-feature.jpg";

export function FeatureSection() {
  return (
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
  );
}
