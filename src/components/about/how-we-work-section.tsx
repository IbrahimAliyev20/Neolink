import Image from "next/image";
import Container from "@/components/shared/container";
import aboutProcess from "../../../public/images/about-process.jpg";

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

export function HowWeWorkSection() {
  return (
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
  );
}
