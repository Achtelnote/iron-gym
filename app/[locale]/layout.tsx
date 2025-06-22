import type { Metadata } from "next";
// import { Almarai, Tajawal, Montserrat } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import "../globals.css";
import { routing } from "../i18n/routing";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ClientProviders from "@/providers/client";

// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
// });

// const almarai = Almarai({
//   variable: "--font-almarai",
//   subsets: ["latin"],
// });

// const tajawal = Tajawal({
//   variable: "--font-tajawal",
//   subsets: ["latin"],
// });

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
        className={`antialiased overflow-hidden h-full overflow-y-auto grid grid-rows-[1fr_50px] scroll-smooth`}
      >
        <NextIntlClientProvider>
          <ClientProviders>
            <NavBar className="absolute h-[75px] w-full" />
            <main className="w-full">
              {children}
            </main>
            {/* <Footer /> */}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
