import Image from "next/image";
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
    <div className="bg-white border border-[#e7e7ea] flex gap-4 items-center p-6 rounded-2xl w-full">
      <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
        <div className="flex flex-col gap-2.5 items-start w-full">
          <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full">
            {title}
          </p>
          <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full">
            {description}
          </p>
        </div>
        <div className="flex gap-5 items-start">
          <div className="flex gap-1 items-center">
            <Image src="/icons/calendar-event.svg" alt="" width={20} height={20} />
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
              {date}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/icons/clock-hour-4.svg" alt="" width={20} height={20} />
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
              {type}
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#0d153a] flex gap-4 h-10 items-center justify-center px-6 py-2.5 rounded-full shrink-0"
      >
        <span className="font-medium text-white text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
          Ətraflı bax
        </span>
        <Image src="/icons/arrow-up-right-white.svg" alt="" width={20} height={20} />
      </button>
    </div>
  );
}

export function JoinUsSection() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center justify-center pb-[90px] w-full">
      <Container className="flex flex-col lg:flex-row gap-16 items-start w-full">
        <div className="flex flex-col gap-3 items-start flex-1 min-w-0 w-full">
          <div className="bg-[#0d153a] flex gap-2.5 items-center justify-center px-4 py-2.5 rounded-full">
            <Image src="/icons/briefcase.svg" alt="" width={21} height={21} />
            <p className="font-medium text-[#3abdaa] text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
              Səni Axtarırıq
            </p>
          </div>
          <div className="flex flex-col gap-9 items-start w-full">
            <div className="flex flex-col gap-6 items-start justify-center w-full">
              <h2 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px] w-full">
                Neoline Ailəsinə Qoşulun
              </h2>
              <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
                Heç bir maliyyə öhdəliyi tələb etməyən texniki auditlə başlayın. Mövcud
                sistemlərinizi qiymətləndirəcəyik, zəif nöqtələri aşkarlayacaq və aydın
                fəaliyyət planı təqdim edəcəyik.
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
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

        <div className="flex flex-col gap-3.5 items-start flex-1 min-w-0 w-full">
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
