"use client";

import { Suspense, useState } from "react";

import BuyButtons from "@/components/form/buy-buttons";
import QuantityInput from "@/components/form/quantity-input";
import ImageCarousel from "@/components/image-carousel";
import ImageGallery from "@/components/image-gallery";
import { Typography } from "@/components/typography";
import { getProduct } from "@/app/api-agent";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTranslations, useLocale } from "next-intl";

export const experimental_ppr = true;

// export async function generateStaticParams() {
//   const { data: products } = await getProducts();
//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const t = useTranslations("Product");
  const locale = useLocale();
  const {
    data,
    error,
    isLoading
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await getProduct(id, locale as any);
      if (error) throw new Error(error);
      return data;
    },
  });

  if (error) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="h-[calc(100%-75px)] fhd:w-[var(--content-width)] m-auto mt-[75px] mobile:px-4 py-8 lg:py-16 2xl:py-48 flex flex-col lg:flex-row">
        <div className="hidden lg:flex h-full w-full gap-4 align-center justify-center items-center">
            <div className={`grow h-full grid grid-rows-[1fr_120px] gap-2 overflow-hidden`}>
              <div className="w-full h-full overflow-hidden rounded-l-md animate-pulse bg-gray-600/40">
              </div>
              <div className="w-full h-full overflow-hidden rounded-l-md animate-pulse bg-gray-600/40">
              </div>
            </div>
            <div className="grow h-full bg-gray-600/40 animate-pulse">
            </div>
          {/* <LuLoaderCircle className="animate-spin" size={64} /> */}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-[calc(100%-75px)] fhd:w-[var(--content-width)] m-auto mt-[75px] mobile:px-4 py-8 lg:py-16 2xl:py-48 flex flex-col lg:flex-row">
        <div className="hidden lg:block h-full w-full">
          <Typography variant="title2" className="text-center">{t("notFound")}</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-75px)] overflow-hidden hd:w-[var(--content-width)] m-auto mt-[75px] mobile:px-4 py-8 lg:py-16 2xl:py-48 flex flex-col lg:flex-row">
      <div className="hidden lg:block h-full w-full">
        <Suspense>
          <ImageGallery
            images={[ data.image || "" ]}
          />
        </Suspense>
      </div>
      <div className="lg:hidden h-full w-full">
        <Suspense>
          <ImageCarousel
            images={[ data.image || "" ]}
          />
        </Suspense>
      </div>
      <div className="lg:h-full w-full flex flex-col px-6 pt-4 lg:px-8 lg:py-4 gap-2">
        <div>
          <Typography variant="title1" weight="bold" className="mb-2">
            {data.name}
          </Typography>
          <div className="flex gap-2 items-center">
            <Typography variant="subtitle" weight="medium">
              {t("price", { price: data.price || 0, currency: "kwd" })}
            </Typography>
            -
            <Typography variant="body">
              {t("stock", { stock: data.stock || 0 })}
            </Typography>
          </div>
        </div>
        <p className="hidden sm:block mt-4">{data.description}</p>
        <br/>
        <Suspense>
          <QuantityInput
            value={quantity}
            max={data.stock || 1}
            onChange={setQuantity}
            onIncrement={() => setQuantity(quantity + 1)}
            onDecrement={() => setQuantity(quantity - 1)}
            className="mobile:hidden hd:grid"
          />
        </Suspense>
        <span className="hidden lg:block grow"></span>
        <BuyButtons product={data} quantity={quantity} disabled={data.stock < 1} />
      </div>
    </div>
  );
}
