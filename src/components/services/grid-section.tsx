import Link from "next/link";
import Container from "@/components/shared/container";
import { services } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export function GridSection() {
  return (
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
  );
}
