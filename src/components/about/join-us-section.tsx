import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import Container from "@/components/shared/container";

const openVacancies = [
  {
    key: "devops-1",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
  },
  {
    key: "devops-2",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
  },
  {
    key: "devops-3",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
  },
  {
    key: "devops-4",
    title: "DevOps Engineer",
    description:
      "Biznes ehtiyaclarınızı və layihə məqsədlərinizi analiz edərək doğru strategiyanı müəyyənləşdiririk.",
    date: "20 iyul 2026",
    type: "Hibrid",
  },
] as const;

function VacancyCard({
  title,
  description,
  date,
  type,
}: {
  title: string;
  description: string;
  date: string;
  type: string;
}) {
  return (
    <div className="bg-white border border-[#e7e7ea] flex flex-col gap-4 items-start p-3.5 rounded-2xl w-full lg:flex-row lg:items-center lg:p-6">
      <div className="flex flex-col gap-4 items-start flex-1 min-w-0 w-full">
        <div className="flex flex-col gap-2.5 items-start w-full">
          <p className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px] w-full lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
            {title}
          </p>
          <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
            {description}
          </p>
        </div>
        <div className="flex gap-5 items-start">
          <div className="flex gap-1 items-center">
            <CalendarDays className="h-4 w-4 lg:h-5 lg:w-5 text-[#5b606f]" strokeWidth={1.5} />
            <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              {date}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-[#5b606f]" strokeWidth={1.5} />
            <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              {type}
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#0d153a] flex gap-4 h-8 items-center justify-center px-6 py-2 rounded-full w-full lg:h-10 lg:py-2.5 lg:w-auto lg:shrink-0"
      >
        <span className="font-semibold text-white text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:font-medium lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
          Ətraflı bax
        </span>
        <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5 text-white" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function JoinUsSection() {
  return (
    <div className="flex flex-col items-center justify-center pb-9 w-full lg:pb-[90px]">
      <Container className="flex flex-col lg:flex-row gap-5 lg:gap-16 items-start w-full">
        <div className="flex flex-col gap-3 items-start flex-[576] min-w-0 w-full">
          <div className="-rotate-[6.89deg] bg-[#0d153a] flex gap-2 items-center justify-center px-3 py-2 rounded-full lg:gap-2.5 lg:px-4 lg:py-2.5">
            <Image src="/icons/briefcase.svg" alt="" width={21} height={21} className="size-4 lg:size-[21px]" />
            <p className="font-medium text-[#3abdaa] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              Səni Axtarırıq
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start w-full lg:gap-9">
            <div className="flex flex-col gap-3 items-start justify-center w-full lg:gap-6">
              <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] w-full lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
                Neoline Ailəsinə Qoşulun
              </h2>
              <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                Heç bir maliyyə öhdəliyi tələb etməyən texniki auditlə başlayın. Mövcud
                sistemlərinizi qiymətləndirəcəyik, zəif nöqtələri aşkarlayacaq və aydın
                fəaliyyət planı təqdim edəcəyik.
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                E-poçt ilə müraciət:
              </p>
              <a
                href="mailto:career@neolinetech.az"
                className="text-[#35ac9b] text-base leading-6 tracking-[0.16px] underline w-full"
              >
                career@neolinetech.az
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:gap-3.5 items-start flex-[800] min-w-0 w-full">
          {openVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.key}
              title={vacancy.title}
              description={vacancy.description}
              date={vacancy.date}
              type={vacancy.type}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
