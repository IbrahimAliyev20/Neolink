import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="flex justify-center items-center text-[120px] font-bold min-h-screen">
     YENI LAYIHƏ 
    </div>
  );
}
