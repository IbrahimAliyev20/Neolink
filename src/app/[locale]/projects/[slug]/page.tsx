import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container";
import { getProjectBySlug } from "@/lib/data/projects";
import { RelatedProjects } from "@/components/projects/RelatedProjects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (
    !project ||
    !project.heroImage ||
    !project.client ||
    !project.duration ||
    !project.field ||
    !project.detailSections ||
    !project.gallery
  ) {
    notFound();
  }

  return (
    <>
    <div className="relative w-full h-[500px] md:h-[704px]">
      <Image
        src={project.heroImage}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-col h-full">
        <Container className="pt-6 w-full">
          <div className="flex gap-1 items-center">
            <Link href="/projects" className="text-[#b3b5bc] text-xs">
              Layihələr
            </Link>
            <Image src="/icons/breadcrumb-divider.svg" alt="" width={16} height={16} />
            <p className="font-medium text-white text-xs truncate max-w-[400px]">
              {project.title}
            </p>
          </div>
        </Container>

        <Container className="flex flex-col gap-6 items-start w-full mt-auto pb-10">
          <h1 className="font-semibold text-white text-[48px] leading-[64px] max-w-[566px]">
            {project.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
            <div className="flex flex-wrap gap-6 sm:gap-9 items-center text-lg tracking-[0.18px] text-white">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Şirkət:</p>
                <p className="font-medium">{project.client}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Müddət:</p>
                <p className="font-medium">{project.duration}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Sahə:</p>
                <p className="font-medium">{project.field}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-black/32 flex items-center justify-center px-4 py-1.5 rounded-full"
                >
                  <p className="font-medium text-white text-sm tracking-[0.14px] whitespace-nowrap">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>

    <Container className="flex flex-col gap-12 items-start w-full pt-14">
      {project.detailSections.map((section) => (
        <div
          key={section.number}
          className="flex flex-col lg:flex-row gap-6 items-start justify-between w-full"
        >
          <p className="font-semibold text-[#040711] text-[32px] leading-10 tracking-[0.32px] shrink-0 w-full lg:w-[434px]">
            {section.number}. {section.title}
          </p>
          <div className="flex flex-col gap-6 items-start w-full lg:max-w-[900px]">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[#5b606f] text-base leading-6 w-full">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Container>

    <Container className="flex flex-col items-center w-full pt-12 pb-[90px]">
      <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
        {project.gallery.map((image, index) => (
          <div
            key={index}
            className="border border-[#f2f4f8] flex-1 min-w-0 w-full h-[534px] relative rounded-2xl overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </Container>

    <RelatedProjects currentSlug={project.slug} />
    </>
  );
}
