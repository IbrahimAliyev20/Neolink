import Container from "@/components/shared/container";

const officeAddress = "Bakı şəhəri, Nərimanov rayonu, Əhməd Rəcəbli küçəsi";

export function MapSection() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center w-full">
      <Container className="flex flex-col items-center w-full pt-12 pb-[90px]">
        <div className="border border-[#d3d3d7] h-[600px] relative rounded-2xl w-full overflow-hidden">
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
