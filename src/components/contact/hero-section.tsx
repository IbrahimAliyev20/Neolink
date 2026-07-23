"use client";

import Image from "next/image";
import Container from "@/components/shared/container";

const contactInfo = [
  {
    icon: "/icons/phone.svg",
    label: "Telefon nömrəsi",
    lines: ["+994 70 777 77 77", "+994 50 555 55 55"],
  },
  {
    icon: "/icons/mail.svg",
    label: "E-poçt",
    lines: ["office@neoline.az", "support@neoline.az"],
  },
  {
    icon: "/icons/map-pin.svg",
    label: "Ünvan",
    lines: ["Bakı şəhəri, Nərimanov ray. Əhməd R. küç."],
  },
];

const socialLinks = [
  { icon: "/icons/contact-instagram.svg", label: "Instagram" },
  { icon: "/icons/contact-facebook.svg", label: "Facebook" },
  { icon: "/icons/brand-linkedin.svg", label: "LinkedIn" },
  { icon: "/icons/contact-twitter-x.svg", label: "X (Twitter)" },
];

export function HeroSection() {
  return (
    <div className="relative w-full bg-[#f7f7f7]">
      <div className="absolute inset-0 bg-[#0d153a] lg:bottom-20 lg:rounded-bl-[120px]" />
      <Container className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full py-16 lg:py-24">
        <div className="flex flex-col gap-8 items-start flex-[574] min-w-0 w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            <h1 className="font-semibold text-white text-[48px] leading-[64px]">
              Bizimlə Əlaqə
            </h1>
            <p className="text-[#b3b5bc] text-base leading-6 tracking-[0.16px]">
              Biznesiniz üçün düzgün texnoloji həlli birlikdə müəyyənləşdirək. Layihənizi
              bizimlə paylaşın, sizə uyğun həll yollarını birlikdə planlaşdıraq.
            </p>
          </div>

          <div className="bg-[#3d4461] h-px w-full" />

          <div className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-5 items-start w-full">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="pt-0.5 shrink-0">
                    <Image src={item.icon} alt="" width={32} height={32} />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-[#b3b5bc] text-sm leading-5">{item.label}</p>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="font-medium text-white text-base leading-6 whitespace-nowrap"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#3d4461] h-px w-full" />

            <div className="flex flex-col gap-4 items-start w-full">
              <p className="text-[#b3b5bc] text-base leading-6 tracking-[0.16px]">
                Bizimlə sosial media vasitələri ilə əlaqə saxlayın
              </p>
              <div className="flex gap-3 items-start">
                {socialLinks.map((social) => (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    className="bg-[rgba(235,248,247,0.04)] border border-[#3abdaa] flex items-center justify-center rounded-full size-11"
                  >
                    <Image src={social.icon} alt="" width={24} height={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl flex flex-col gap-10 items-start px-7 py-8 rounded-[20px] flex-[658] min-w-0 w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <p className="font-medium text-[#040711] text-[32px] leading-10 tracking-[0.32px]">
                Sualınız var ? Bizə yazın
              </p>
              <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px]">
                Məlumatlarınızı doldurun, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-6 items-start w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                  <label htmlFor="contact-name" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                    Ad, soyad
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Ad və soyadınızı daxil edin"
                    className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f]"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                  <label htmlFor="contact-email" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                    E-poçt
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="E-poçtunuu daxil edin"
                    className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                  <label htmlFor="contact-phone" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                    Telefon nömrəsi
                  </label>
                  <div className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl flex items-center gap-2 px-4 py-3.5 w-full">
                    <span className="flex items-center gap-1 text-[#77777b] text-sm shrink-0">
                      +994
                      <Image src="/icons/chevron-down-small.svg" alt="" width={16} height={16} />
                    </span>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Telefon nömrənizi daxi edin"
                      className="flex-1 min-w-0 bg-transparent text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                  <label htmlFor="contact-subject" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                    Mesaj başlığı
                  </label>
                  <div className="relative w-full">
                    <select
                      id="contact-subject"
                      defaultValue=""
                      className="appearance-none bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#5b606f] focus:outline-none"
                    >
                      <option value="" disabled>
                        Mesaj başlığı
                      </option>
                      <option value="teklif">Təklif almaq istəyirəm</option>
                      <option value="emekdasliq">Əməkdaşlıq təklifi</option>
                      <option value="diger">Digər</option>
                    </select>
                    <Image
                      src="/icons/chevron-down.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="contact-message" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                  Mesajınız
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Mesajınız"
                  rows={4}
                  className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#9093a4] flex h-12 items-center justify-center px-6 py-3 rounded-full w-full"
              >
                <span className="font-medium text-[#e7e8eb] text-base leading-6 tracking-[0.16px]">
                  Göndər
                </span>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
