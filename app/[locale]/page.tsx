import React from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Button from "@/components/button";
import { Typography } from "@/components/typography";
import ProductsList from "@/components/products-list";

export const experimental_ppr = true;

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <>
      <section className="relative h-[100vh] overflow-hidden flex items-center justify-center 2xl:justify-start">
        <Image src={"/hero.jpg"} alt="hero" className="absolute inset-0 w-full h-full object-cover -z-1 opacity-30 blur-xs" />
        <div className="flex flex-col gap-2 2xl:mx-[20%] 2xl:mt-80">
          <Typography as="h1" variant="heading" className="">
            {
              t.rich(
                "title",
                { br: () => <br/> }
              )
            }
          </Typography>
          <Typography as="p" variant="subheading" className="font-bold lg:font-black">
            { t.rich("subtitle", { br: () => <br/> }) }
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
            {t.rich("aboutus_info", { br: () => <br/> })}
          </Typography>
          <div className="2xl:w-200"></div>
          <Image src="/aboutus.jpg" alt="about us" className="max-h-100 2xl:max-h-160 w-full object-cover rounded-2xl" />
        </div>
      </section>
    </>
  );
}
