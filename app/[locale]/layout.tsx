import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "../globals.css";
import { routing } from "../i18n/routing";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ClientProviders from "@/providers/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IronPro.club",
  description: "IronPro club for body training equipment",
};

export function generateStaticParams() {
  return routing.locales.map(( locale ) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased flex flex-col items-center scroll-smooth`}
      >
        <NextIntlClientProvider>
          <ClientProviders>
            <NavBar className="absolute h-[75px] w-full" />
            <main className="h-[calc(100vh-52px)] w-full lg:p-0">
              {children}
              <Footer />
            </main>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
