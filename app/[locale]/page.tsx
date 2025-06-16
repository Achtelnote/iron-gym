import React from "react";
import {LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";

import { SubNav, SubNavItem, SubNavPortal } from "@/components/subnav";
import ProductCard from "@/components/product-card";
import Button from "@/components/button";
import Logo from "@/components/logo";
import { Typography } from "@/components/typography";
import { Locale, Product } from "@/types";
import ProductsList from "@/components/products-list";
import { getProducts } from "../api-agent";
import { routing } from "../i18n/routing";
import { getTranslations } from "next-intl/server";

export const experimental_ppr = true;

export default async function Home({ params }: Readonly<{ params: { locale: string } }>) {
  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  // const { locale } = await params;
  // const { data: products, error } = await getProducts(locale as Locale);
  const t = await getTranslations("HomePage");

  return (
    <>
      <section className="relative h-[100vh] overflow-hidden flex items-center justify-center 2xl:justify-start">
        <img src={"/hero.jpg"} alt="hero" className="absolute inset-0 w-full h-full object-cover -z-1 opacity-30 blur-xs" />
        <div className="flex flex-col gap-2 2xl:mx-[20%] 2xl:mt-80">
          <Typography as="h1" variant="heading" className="">
            {
              t.rich(
                "title",
                { br: (chunks) => <br/> }
              )
            }
          </Typography>
          <Typography as="p" variant="subheading" className="font-bold lg:font-black">
            { t.rich("subtitle", { br: (chunks) => <br/> }) }
          </Typography>
          <div className="ltr:self-center w-full lg:w-auto ltr:2xl:self-end mt-6 2xl:mt-4">
            <a href="#products">
              <Button label={t("shopnow")} block />
            </a>
          </div>
        </div>
      </section>
      <section id="products" className="lg:w-[var(--content-width)] ml-auto mr-auto flex flex-col">
        <Typography as="h2" variant="title" weight="thin" className="my-12 2xl:my-24 text-center" uppercase>
          {t("equipment")}
        </Typography>
        <ProductsList />
      </section>
      <section id="about" className="hidden lg:block w-[var(--content-width)] m-auto mb-20">
        <Typography as="h2" variant="title" weight="thin" className="my-12 lg:my-24 text-center uppercase">{t("aboutus")}</Typography>
        <div className="flex flex-row justify-between">
          <Typography variant="body" weight="light" className="py-2 text-xs lg:text-sm/6 2xl:text-xl/9 uppercase rtl:content-center ltr:tracking-[0.20rem]">
            {t.rich("aboutus_info", { br: (chunks) => <br/> })}
          </Typography>
          <div className="2xl:w-200"></div>
          <img src="/aboutus.jpg" alt="about us" className="max-h-100 2xl:max-h-160 w-full object-cover rounded-2xl" />
        </div>
      </section>
    </>
  );
}
