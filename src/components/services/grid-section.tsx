"use client";

import Link from "next/link";
import Container from "@/components/shared/container";
import { ServiceCard } from "@/components/services/ServiceCard";
import { mapApiServices } from "@/lib/data/services";
import { useServices } from "@/services/service/queries";

export function GridSection() {
  const { data: apiServices = [] } = useServices();
  const services = mapApiServices(apiServices);

  if (services.length === 0) return null;

  // Render two cards per row; each row pairs one wide + one narrow card.
  const rows: (typeof services)[] = [];
  for (let i = 0; i < services.length; i += 2) {
    rows.push(services.slice(i, i + 2));
  }

  return (
    <Container className="flex flex-col gap-3 items-start w-full lg:gap-6">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-start w-full"
        >
          {row.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`w-full min-w-0 ${
                service.size === "wide" ? "lg:flex-[812]" : "lg:flex-[604]"
              }`}
            >
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      ))}
    </Container>
  );
}
