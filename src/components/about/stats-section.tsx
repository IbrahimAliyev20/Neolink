import { CountUp } from "@/components/animation/count-up";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";

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
      className="backdrop-blur-lg flex flex-col items-start p-3.5 rounded-[10px] w-full flex-1 min-w-0 text-white lg:p-5 lg:rounded-xl"
      style={{
        backgroundImage:
          "linear-gradient(106.14deg, rgb(33, 203, 178) 17.782%, rgb(38, 189, 184) 63.245%)",
      }}
    >
      <div className="flex flex-col gap-1.5 items-start font-semibold whitespace-nowrap lg:gap-2">
        <p className="text-2xl leading-8 tracking-[0.24px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
          <CountUp value={value} />
        </p>
        <p className="text-base leading-6 tracking-[0.16px] lg:text-xl lg:leading-[28px] lg:tracking-[0.2px]">
          {title}
        </p>
      </div>
      <p className="text-sm leading-5 tracking-[0.14px] mt-2.5 lg:text-base lg:leading-6 lg:tracking-[0.16px]">
        {description}
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <Container className="flex flex-col items-center w-full">
      <Reveal
        stagger={0.1}
        className="flex flex-col gap-3 items-start w-full lg:flex-row lg:gap-5"
      >
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
      </Reveal>
    </Container>
  );
}
