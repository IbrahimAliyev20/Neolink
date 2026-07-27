"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePopupImage } from "@/services/popup-image/queries";

/**
 * Figma: `Frame 2147225087` — an artwork panel centred on a 24% black scrim,
 * with a 32px round close button inset 16px from the top right. The artwork
 * comes from the API (`/popup-image`), which serves a different image — and a
 * different shape — per language, so nothing here assumes a fixed ratio.
 *
 * Shown once per browser-tab session: `sessionStorage` survives client-side
 * navigation and reloads (so it never reappears while the visitor browses the
 * site) but is wiped when the tab closes, which brings it back on the next
 * visit. A cookie would outlive the tab — a session cookie only expires when
 * the whole browser closes, and session restore can keep even that — and
 * `localStorage` would show it exactly once, ever.
 *
 * Mounted only by the home page, so it cannot appear anywhere else.
 */
const SESSION_KEY = "neoline:intro-popup-seen";

export function IntroPopup() {
  const t = useTranslations("home.introPopup");
  const tc = useTranslations("common");
  const { data } = usePopupImage();
  const image = data?.image?.trim();
  const [open, setOpen] = useState(false);
  // The session is only spent once the artwork is actually there to show — a
  // failed or empty response must not count as "already seen".
  const decided = useRef(false);

  // Decided in an effect, never during render: the server has no
  // `sessionStorage`, so reading it while rendering would break hydration.
  useEffect(() => {
    if (!image || decided.current) return;
    decided.current = true;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      // Marked the moment it opens, so an immediate reload does not bring it
      // back.
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage blocked (private mode, strict settings) — still show it once.
    }
    setOpen(true);
  }, [image]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // Lock the page behind the dialog. The scrollbar's width is handed back as
    // padding, otherwise the whole page jumps sideways as it opens.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [open]);

  if (!open || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/24 p-4"
      onClick={() => setOpen(false)}
    >
      {/* A 16:9 panel — the ratio the uploaded artwork is authored at — capped
          at the Figma 750 wide and at 85% of the viewport height so it never
          runs off a short screen. `object-contain` is deliberate: whatever
          arrives is shown whole, never cropped, squeezed or stretched. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("aria")}
        className="relative aspect-video max-h-[85dvh] w-full max-w-[750px]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          key={image}
          src={image}
          alt=""
          fill
          priority
          sizes="(min-width: 782px) 750px, 100vw"
          className="rounded-xl object-contain lg:rounded-2xl"
        />
        {/* Figma: 32px circle inset 16px from the top right. */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={tc("close")}
          className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#f6f6f6] bg-[#f9f9f9] text-[#20201e] transition-colors hover:bg-white lg:right-4 lg:top-4 lg:size-8"
        >
          <X className="size-5 lg:size-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
