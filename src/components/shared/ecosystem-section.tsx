import Image from "next/image";
import Container from "@/components/shared/container";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

function PartnerCard() {
  return (
    <div className="bg-white border border-[#e7e7ea] flex h-[100px] items-center justify-center px-[34px] py-7 rounded-xl w-[195px]">
      <div className="flex gap-2.5 items-center">
        <Image src="/icons/partner-triangle.svg" alt="" width={32} height={32} />
        <p className="font-semibold leading-9 text-[28px] tracking-[0.28px] text-[#3b4153] whitespace-nowrap">
          Neolit
        </p>
      </div>
    </div>
  );
}

function createPartnerLogos(): LogoItem[] {
  return Array.from({ length: 6 }, (_, index) => ({
    node: <PartnerCard key={index} />,
    ariaLabel: "Neolit",
  }));
}

export function EcosystemSection() {
  return (
    <div className="bg-white flex flex-col gap-12 items-center justify-center pb-[90px] w-full">
      <div className="flex flex-col gap-6 items-center text-center max-w-[788px] px-4">
        <h2 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
          Bütün İT Ekosisteminiz
        </h2>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] max-w-[756px]">
          Heç bir maliyyə öhdəliyi tələb etməyən texniki auditlə başlayın. Mövcud
          sistemlərinizi qiymətləndirəcəyik, zəif nöqtələri aşkarlayacaq və aydın fəaliyyət
          planı təqdim edəcəyik.
        </p>
      </div>
      <Container className="flex flex-col gap-4 items-center w-full">
        <LogoLoop
          logos={createPartnerLogos()}
          direction="right"
          speed={40}
          gap={16}
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Partnyor loqoları"
        />
        <LogoLoop
          logos={createPartnerLogos()}
          direction="left"
          speed={40}
          gap={16}
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Partnyor loqoları"
        />
      </Container>
    </div>
  );
}
