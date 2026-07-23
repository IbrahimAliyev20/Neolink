"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import Container from "@/components/shared/container";

const messageSubjects = [
  "Əməkdaşlıq təklifi",
  "Qiymət təklifi",
  "İT Konsultasiyası",
  "Texniki problem",
  "Digər",
];

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
  const [subject, setSubject] = useState<string | null>(null);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement | null>(null);

  // Close the subject dropdown on outside click or Escape.
  useEffect(() => {
    if (!subjectOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (subjectRef.current && !subjectRef.current.contains(event.target as Node)) {
        setSubjectOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSubjectOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [subjectOpen]);

  return (
    <div className="relative w-full bg-[#f7f7f7]">
      <div className="absolute inset-0 bg-[#0d153a] lg:bottom-20 lg:rounded-bl-[120px]" />
      <Container className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full pt-14 pb-8 lg:pt-24 lg:pb-0">
        <div className="flex flex-col gap-5 lg:gap-8 items-start w-full lg:flex-[574] lg:min-w-0">
          <div className="flex flex-col gap-4 items-start w-full lg:gap-6">
            <h1 className="font-semibold text-white text-xl leading-7 tracking-[0.2px] lg:text-[48px] lg:leading-[64px] lg:tracking-normal">
              Bizimlə Əlaqə
            </h1>
            <p className="text-[#b3b5bc] text-xs leading-4 tracking-[0.12px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              Biznesiniz üçün düzgün texnoloji həlli birlikdə müəyyənləşdirək. Layihənizi
              bizimlə paylaşın, sizə uyğun həll yollarını birlikdə planlaşdıraq.
            </p>
          </div>

          <div className="bg-[#3d4461] h-px w-full" />

          <div className="flex flex-col gap-5 items-start w-full lg:gap-6">
            <div className="flex flex-col gap-4 items-start w-full lg:gap-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-3 items-start lg:gap-4">
                  <div className="pt-0.5 shrink-0">
                    <Image src={item.icon} alt="" width={32} height={32} className="size-6 lg:size-8" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-[#b3b5bc] text-xs leading-4 tracking-[0.12px] lg:text-sm lg:leading-5 lg:tracking-normal">{item.label}</p>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="font-medium text-white text-sm leading-5 tracking-[0.14px] whitespace-nowrap lg:text-base lg:leading-6 lg:tracking-normal"
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
              <p className="text-[#b3b5bc] text-xs leading-4 tracking-[0.12px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
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

        <div className="bg-white shadow-2xl flex flex-col gap-10 items-start p-3.5 rounded-2xl w-full lg:px-7 lg:py-8 lg:rounded-[20px] lg:flex-[658] lg:min-w-0">
          <div className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-3 items-start w-full lg:gap-2">
              <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] lg:font-medium lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
                Sualınız var ? Bizə yazın
              </p>
              <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                Məlumatlarınızı doldurun, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-4 items-start w-full lg:gap-6"
            >
              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="contact-name" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                  Ad, soyad
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Ad və soyadınızı daxil edin"
                  className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none focus:border-[#3abdaa]"
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
                  className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="contact-phone" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                  Telefon nömrəsi
                </label>
                <div className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl flex items-center gap-2 px-4 py-3.5 w-full focus-within:border-[#3abdaa]">
                  <span className="flex items-center gap-1 text-[#77777b] text-sm shrink-0">
                    +994
                    <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
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
                <div ref={subjectRef} className="relative w-full">
                  <button
                    type="button"
                    id="contact-subject"
                    aria-haspopup="listbox"
                    aria-expanded={subjectOpen}
                    onClick={() => setSubjectOpen((open) => !open)}
                    className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3.5 w-full text-left text-sm cursor-pointer transition-colors focus:outline-none ${
                      subjectOpen
                        ? "bg-white border border-[#3abdaa]"
                        : "bg-[#f7f7f7] border border-[#e7e7ea]"
                    } ${subject ? "text-[#040711]" : "text-[#5b606f]"}`}
                  >
                    {subject ?? "Mesaj başlığı"}
                    <ChevronDown
                      className={`h-5 w-5 text-[#20201e] shrink-0 transition-transform ${
                        subjectOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>

                  {subjectOpen && (
                    <ul
                      role="listbox"
                      aria-labelledby="contact-subject"
                      className="absolute left-0 right-0 top-full mt-2 z-20 bg-white rounded-2xl shadow-[0px_16px_40px_0px_rgba(0,0,0,0.14)] py-1.5 overflow-hidden"
                    >
                      {messageSubjects.map((option) => {
                        const isSelected = option === subject;
                        return (
                          <li key={option} role="option" aria-selected={isSelected}>
                            <button
                              type="button"
                              onClick={() => {
                                setSubject(option);
                                setSubjectOpen(false);
                              }}
                              className={`flex items-center justify-between gap-2 w-full px-5 py-3.5 text-left text-sm cursor-pointer transition-colors hover:bg-[#f7f7f7] ${
                                isSelected ? "bg-[#f7f7f7] text-[#040711]" : "text-[#20201e]"
                              }`}
                            >
                              {option}
                              {isSelected && (
                                <Check className="h-5 w-5 text-[#3abdaa] shrink-0" strokeWidth={2} />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
                  className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] resize-none focus:outline-none focus:border-[#3abdaa]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#9093a4] flex h-10 items-center justify-center px-6 py-2.5 rounded-full w-full lg:h-12 lg:py-3"
              >
                <span className="font-medium text-[#e7e8eb] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
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
