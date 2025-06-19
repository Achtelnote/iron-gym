import { redirect } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getFormatter, getLocale } from "next-intl/server";

import { getProducts } from "@/app/api-agent";
import Logo from "@/components/logo";
import { Typography } from "@/components/typography";
import { TransactionResult } from "@/types";
import Button from "@/components/button";

type SearchParams = {
    searchParams?: Promise<Record<string, string>>;
};

export default async function TransactionFailedPage({ searchParams }: SearchParams) {
  const tCommon = await getTranslations("common");
  const t = await getTranslations("checkout.failed");
  const formatter = await getFormatter();

  const params = new URLSearchParams(await searchParams);
  const locale = await getLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: products } = await getProducts(locale as any);

  const v = params.get("v");
  if (!v) {
    redirect("/");
  }
  const data = JSON.parse(atob(v) || "{}") as TransactionResult;

  return (
    <div className="h-[calc(100%-75px)] hd:w-[var(--content-width)] m-auto flex flex-col items-between justify-center h-full">
      <div className="h-full flex flex-col hd:flex-row gap-4 items-center justify-between hd:justify-center mt-[80px] p-4 hd:p-0">
        <div className="flex flex-col gap-4 justify-center hd:gap-4 p-4 fhd:p-32 mobile:mt-12 hd:mt-0">
          <div>
            <Typography uppercase variant="heading" weight="light">{t("sorry")}</Typography>
            <Typography uppercase variant="title2" weight="extralight">{t("thereHasBeenAnError")}</Typography>
          </div>
          <div>
            <Typography uppercase variant="title2" weight="extralight">{t("yourPurchaseFailed")}</Typography>
            <Typography uppercase variant="title2" weight="extralight">{t("reason", { reason: data.CCMessage.toLowerCase() })}</Typography>
            <Typography uppercase variant="title2" weight="extralight">
              {t("tryAgain")}
            </Typography>
          </div>
          <Link href="/#products">
            <Typography uppercase variant="title2" weight="extralight" className="flex gap-1 items-center justify-end">
              {t("returnToShop")}
              {
                locale == "en"
                ? <LuChevronRight strokeWidth={2} />
                : <LuChevronLeft strokeWidth={2} />
              }
            </Typography>
          </Link>
        </div>
        <div className="flex flex-col items-center px-6 hd:px-14 py-8 bg-[var(--primary)] rounded-tl-4xl rounded-br-4xl">
          <Logo className="w-70 h-auto!" />
          <div className="w-full flex flex-col gap-2 hd:gap-4">
            <div className="flex justify-between mt-8">
              <Typography uppercase weight="extralight">
                {t("transactionDate")}
              </Typography>
              <Typography uppercase weight="extralight">
                {formatter.dateTime(new Date(), { dateStyle: "full" })}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography uppercase weight="extralight">
                {t("transactionAmount")}
              </Typography>
              <Typography uppercase weight="extralight">
                {tCommon("price", { price: data.Amount, currency: "KWD" })}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography uppercase weight="extralight">
                {t("transactionPayId")}
              </Typography>
              <Typography uppercase weight="extralight">
                {data.PayId}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography uppercase weight="extralight">
                {t("transactionTrackingId")}
              </Typography>
              <Typography uppercase weight="extralight">
                {data.TrackId}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography uppercase weight="extralight">
                {t("transactionPaymentId")}
              </Typography>
              <Typography uppercase weight="extralight">
                {data.PaymentId}
              </Typography>
            </div>
          </div>
          <div className="hidden fhd:block w-full mt-8">
            <Typography uppercase weight="extralight" className="text-center">
              Checkout our other products
            </Typography>
            <div className="flex flex-col mt-4 gap-2">
              {
                products.slice(0, 2).map((p) => (
                  <Link key={`product-${p.id}`} href={`/product/${p.id}`}>
                    <div className={`relative bg-[var(--surface)] ${locale == "en" ? "grid" : "grid"} grid-cols-[90px_1fr] rounded-xl`}>
                      <Image src={p.image} width={175} height={175} alt="" className={`${locale == "en" ? "rounded-l-xl" : "rounded-r-xl"}`} />
                      <div className="px-4 py-2">
                        <Typography variant="body-sm">
                          {p.name}
                        </Typography>
                        <Typography variant="body-sm">
                          {tCommon("price", { price: p.price, currency: "KWD" })}
                        </Typography>
                      </div>
                      <Button className={`absolute ${locale == "en" ? "right-0 rounded-br-xl rounded-tl-xl" : "left-0 rounded-br-none rounded-tl-none rounded-tr-xl"} bottom-0 py-0! text-sm`} label="VIEW" />
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
