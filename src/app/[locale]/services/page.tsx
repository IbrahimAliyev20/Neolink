import Link from "next/link";
import Container from "@/components/shared/container";
import { services } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export default function ServicePage() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-12 items-center pb-[90px] pt-12 w-full">
      <div className="flex flex-col gap-5 items-center text-center max-w-[566px] px-4">
        <h1 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
          Xidmətlərimizlə Yaxından Tanış Olun
        </h1>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
          Böyüyən B2B şirkətləri üçün nəzərdə tutulmuş korporativ səviyyəli tam İT xidmətləri
          – hamısı bir mərkəzdən
        </p>
      </div>

      <Container className="flex flex-col gap-6 items-start w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          <Link href={`/services/${services[0].slug}`} className="contents">
            <ServiceCard {...services[0]} />
          </Link>
          <Link href={`/services/${services[1].slug}`} className="contents">
            <ServiceCard {...services[1]} />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          <Link href={`/services/${services[2].slug}`} className="contents">
            <ServiceCard {...services[2]} />
          </Link>
          <Link href={`/services/${services[3].slug}`} className="contents">
            <ServiceCard {...services[3]} />
          </Link>
        </div>
      </Container>
    </div>
  );
}
