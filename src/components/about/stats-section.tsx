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

export function StatsSection() {
  return (
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
  );
}
