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
    <div className="flex flex-col items-start w-full">
      <Container className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-4 items-center py-8 w-full lg:flex-row lg:gap-[102px] lg:py-[90px]">
          <div className="flex flex-col gap-6 items-start w-full lg:gap-12 lg:flex-1 lg:min-w-0">
            <div className="flex flex-col gap-4 items-start w-full lg:gap-6">
              <h2 className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] lg:text-[56px] lg:leading-[72px] lg:tracking-normal lg:max-w-[566px]">
                Necə işləyirik?
              </h2>
              <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                Neoline olaraq hər layihəyə planlı, şəffaf və nəticəyönümlü yanaşırıq.
                Analizdən inkişaf mərhələsinə, tətbiqdən texniki dəstəyə qədər bütün
                prosesi peşəkar komandamızla birlikdə idarə edirik.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-start w-full lg:gap-5">
              {processSteps.map((step) => (
                <div key={step.key} className="flex gap-3 items-start w-full lg:gap-5">
                  <div className="bg-[#0d153a] flex items-center justify-center p-2.5 rounded-lg shrink-0 size-10 lg:rounded-xl lg:size-14">
                    <Image
                      src={step.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="size-6 lg:size-8"
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-start flex-1 min-w-0 lg:gap-2">
                    <p className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px] w-full lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
                      {step.title}
                    </p>
                    <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#e7e7ea] relative rounded-2xl w-full h-[247px] overflow-hidden lg:rounded-[20px] lg:h-[474px] lg:flex-1 lg:min-w-0">
            <Image
              src={aboutProcess}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
