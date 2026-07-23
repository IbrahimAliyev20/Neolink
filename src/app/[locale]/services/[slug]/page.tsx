import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container";
import { serviceDetails, type ServiceSlug } from "@/lib/data/service-details";
import { OtherServices } from "@/components/services/OtherServices";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetails[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <>
    <div className="bg-[#f7f7f7] flex flex-col gap-16 items-center pb-[90px] w-full">
      <Container className="flex flex-col items-start w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-[132px] items-center w-full">
          <div className="flex flex-col gap-12 items-start flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-6 items-start w-full">
              <h1 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
                {service.title}
              </h1>
              <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
                {service.description}
              </p>
            </div>
            <div className="flex gap-5 items-start w-full">
              <button
                type="button"
                className="bg-[#3abdaa] flex flex-1 gap-4 h-12 items-center justify-center px-6 py-3 rounded-full"
              >
                <span className="font-medium text-white text-base leading-6 tracking-[0.16px]">
                  Təklif al
                </span>
              </button>
              <button
                type="button"
                className="bg-white flex flex-1 gap-4 h-12 items-center justify-center px-6 py-3 rounded-full"
              >
                <span className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px]">
                  Layihələrimiz
                </span>
              </button>
            </div>
          </div>
          <div className="border border-[#e7e7ea] h-[474px] relative rounded-[20px] flex-1 min-w-0 w-full overflow-hidden">
            <Image
              src={service.heroImage}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </Container>

      <Container className="flex flex-col lg:flex-row gap-12 items-center w-full">
        <div className="flex flex-col gap-6 items-start flex-1 min-w-0 w-full">
          <h2 className="font-semibold text-[#040711] text-[40px] leading-[56px] tracking-[0.4px] max-w-[452px]">
            {service.whatIncludedTitle}
          </h2>
          <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
            {service.whatIncludedDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-[1.5] min-w-0 w-full">
          {service.whatIncluded.map((item) => (
            <div
              key={item.title}
              className="bg-[#f7f7f7] flex flex-col gap-5 items-start px-6 py-5 rounded-xl w-full"
            >
              <div className="bg-white flex items-center justify-center p-2 rounded-xl size-[52px]">
                <Image src={item.icon} alt="" width={30} height={30} />
              </div>
              <div className="flex flex-col gap-2 items-start w-full">
                <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full">
                  {item.title}
                </p>
                <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>

    <OtherServices currentSlug={service.slug} />
    </>
  );
}
