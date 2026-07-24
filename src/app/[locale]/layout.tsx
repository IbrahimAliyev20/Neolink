import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, K2D, Poppins } from "next/font/google";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CtaBanner } from "@/components/shared/cta-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

/** Figma: partner logo wordmark ("Neolit") uses K2D SemiBold. */
const k2d = K2D({
  variable: "--font-k2d",
  subsets: ["latin"],
  weight: ["600"],
});

/** Figma: footer copyright line uses Poppins Regular. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: t("title"),
    description: t("description"),
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${k2d.variable} ${poppins.variable} font-inter antialiased`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            {/* `overflow-x-clip` catches any animation that travels sideways
                before it can add a horizontal scrollbar. `clip` rather than
                `hidden`, so it does not create a scroll container and break the
                sticky header. */}
            <div className="min-h-screen overflow-x-clip">
              <Header />
              {children}
              <CtaBanner />
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
