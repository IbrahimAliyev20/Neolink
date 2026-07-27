"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Figma: `Frame 2147225087` — a 750x422 r16 artwork panel centred on a 24%
 * black scrim, with a 32px round close button inset 16px from the top right.
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
  const [open, setOpen] = useState(false);

  // Read in an effect, never during render: the server has no `sessionStorage`,
  // so deciding at render time would desync the markup and break hydration.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      // Marked as seen the moment it opens, so an immediate reload does not
      // bring it back.
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage blocked (private mode, strict settings) — still show it once.
    }
    setOpen(true);
  }, []);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/24 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("aria")}
        className="relative aspect-[750/422] w-full max-w-[750px] overflow-hidden rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src="/images/home-intro-popup.png"
          alt=""
          fill
          priority
          sizes="(min-width: 782px) 750px, 100vw"
          className="object-cover"
        />
        {/* The artwork is exported from Figma with its close button drawn in, so
            the control here is a transparent hit area sitting exactly on top of
            it — positioned in percentages, which hold at every size because the
            panel keeps the 750x422 ratio. */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={tc("close")}
          className="absolute right-[2.13%] top-[3.79%] aspect-square w-[4.27%] cursor-pointer rounded-full transition-shadow hover:shadow-[0_0_0_3px_rgba(255,255,255,0.35)] focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.6)] focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
