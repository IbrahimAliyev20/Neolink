import Container from "@/components/shared/container";

const officeAddress = "Bakı şəhəri, Nərimanov rayonu, Əhməd Rəcəbli küçəsi";

export function MapSection() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center w-full">
      <Container className="flex flex-col items-center w-full pt-8 pb-8 lg:pt-12 lg:pb-[90px]">
        <div className="border border-[#d3d3d7] h-[240px] relative rounded-2xl w-full overflow-hidden lg:h-[600px]">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`}
            title="Neoline ofisinin xəritədə yeri"
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </div>
  );
}
