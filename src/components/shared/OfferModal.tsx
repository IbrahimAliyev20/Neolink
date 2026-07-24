"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import { useServiceForm } from "@/services/service-form/mutations";

export function OfferModal({
  open,
  onClose,
  service = "",
}: {
  open: boolean;
  onClose: () => void;
  /** Service name sent with the offer request. */
  service?: string;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: sendOffer, isPending } = useServiceForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    sendOffer(
      { name, email, phone: `+994${phone}`, service },
      {
        onSuccess: () => setIsSubmitted(true),
        onError: () => toast.error("Təklif göndərilə bilmədi. Yenidən cəhd edin."),
      }
    );
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/24 flex items-center justify-center p-4 z-50" onClick={handleClose}>
        <div
          className="bg-white border border-[#f3f2f8] shadow-[1px_1px_2px_0px_rgba(0,0,0,0.06)] rounded-2xl w-full max-w-[420px] relative"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Bağla"
            className="absolute right-4 top-4 flex items-center justify-center size-6 text-[#5b606f]"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <div className="flex flex-col gap-10 items-center justify-center px-6 py-8 w-full">
            <div className="flex flex-col gap-5 items-center justify-center w-full">
              <div className="bg-[#0d153a] border border-[#3abdaa] flex items-center justify-center rounded-full size-[60px]">
                <Check className="h-8 w-8 text-[#3abdaa]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-3 items-center text-center w-full">
                <p className="font-medium text-[#20201e] text-2xl leading-8">
                  Təklifiniz göndərildi!
                </p>
                <p className="text-[#77777b] text-sm leading-5">
                  Müraciətiniz qeydə alındı. Komandamız onu nəzərdən keçirəcək və ən qısa
                  zamanda sizinlə əlaqə saxlayacaq.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/24 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white border border-[#e7e7ea] rounded-2xl w-full max-w-[624px] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#e7e7ea] flex items-center justify-between px-6 py-5 w-full">
          <p className="font-medium text-[#040711] text-2xl leading-8 tracking-[0.24px]">
            Təklif al
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Bağla"
            className="flex items-center justify-center size-6 text-[#5b606f]"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 items-center p-6 w-full"
        >
          <div className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <label htmlFor="offer-name" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                Ad, soyad
              </label>
              <input
                id="offer-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ad və soyadınızı daxil edin"
                className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none focus:border-[#3abdaa]"
              />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <label htmlFor="offer-email" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                E-poçt
              </label>
              <input
                id="offer-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-poçtunuu daxil edin"
                className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl px-4 py-3.5 w-full text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none focus:border-[#3abdaa]"
              />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <label htmlFor="offer-phone" className="text-[#040711] text-sm tracking-[0.14px] px-1">
                Telefon nömrəsi
              </label>
              <div className="bg-[#f7f7f7] border border-[#e7e7ea] rounded-xl flex items-center gap-2 px-4 py-3.5 w-full focus-within:border-[#3abdaa]">
                <span className="flex items-center gap-1 text-[#77777b] text-sm shrink-0">
                  +994
                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <input
                  id="offer-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Telefon nömrənizi daxi edin"
                  className="flex-1 min-w-0 bg-transparent text-sm text-[#040711] placeholder:text-[#5b606f] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-start w-full">
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#f7f7f7] flex flex-1 h-12 items-center justify-center px-6 py-3 rounded-full"
            >
              <span className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px]">
                Ləğv et
              </span>
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#61cabb] flex flex-1 h-12 items-center justify-center px-6 py-3 rounded-full transition-opacity disabled:opacity-70"
            >
              <span className="font-medium text-white text-base leading-6 tracking-[0.16px]">
                {isPending ? "Göndərilir..." : "Göndər"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
