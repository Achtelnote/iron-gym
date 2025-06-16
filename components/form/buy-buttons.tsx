"use client";

import { useTranslations } from "next-intl";
import { LuLoaderCircle } from "react-icons/lu";

import Button from "../button";
import { Product } from "@/types";
import { addToCart } from "@/Utils/cartHelper";
import { useRouter } from "next/navigation";

type BuyButtonsProps = {
  quickBuy?: boolean
  loading?: boolean;
  disabled?: boolean;
  quantity?: number;
  product: Product;
};

export default function BuyButtons({
  quickBuy = false,
  loading = false,
  disabled = false,
  quantity = 1,
  product,
}: BuyButtonsProps) {
  const t = useTranslations("Product");
  const nav = useRouter();

  const onBuyNow = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    nav.push("/cart")
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-end justify-end">
      {
        !quickBuy ? (
          <Button label={t("buyNow")} loading={loading} onClick={() => onBuyNow(product, quantity)} disabled={disabled} className="hidden 2xl:grid" />
        ) : null
      }
      <Button label={t("addToCart")} loading={loading} onClick={() => addToCart(product, quantity)} disabled={disabled} className="w-full lg:w-auto" />
    </div>
  );
}
