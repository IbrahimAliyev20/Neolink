"use client";

import Link from "next/link";
import Container from "@/components/shared/container";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/animation/reveal";
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
    <Container className="w-full">
      {/* Rows deal in one after another on scroll. Re-keyed on the count so the
          stagger plays once the API services arrive rather than snapping in. */}
      <Reveal
        key={services.length}
        y={44}
        stagger={0.16}
        end="top 55%"
        className="flex flex-col gap-3 items-start w-full lg:gap-6"
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-start w-full"
          >
            {row.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                // The max-width caps stop a lone card in a row from stretching to
                // full width — it keeps its intended wide/narrow size instead.
                className={`w-full min-w-0 ${
                  service.size === "wide"
                    ? "lg:flex-[812] lg:max-w-[812px]"
                    : "lg:flex-[604] lg:max-w-[604px]"
                }`}
              >
                <ServiceCard {...service} />
              </Link>
            ))}
          </div>
        ))}
      </Reveal>
    </Container>
  );
}
