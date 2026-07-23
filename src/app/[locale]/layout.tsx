import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, K2D, Poppins } from "next/font/google";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  title: "HR-vakansiyaları",
  description: "HR-vakansiyaları",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  const messages = (await getMessages()) as Record<string, string>;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${k2d.variable} ${poppins.variable} font-inter antialiased`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen">
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
