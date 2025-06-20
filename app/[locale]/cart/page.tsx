"use client";

import { useMemo } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";

import useCart from "@/app/hooks/cart";
import Button from "@/components/button";
import EmptyCart from "@/components/cart/empty-cart";
import InputField from "@/components/form/input-field";
import Logo from "@/components/logo";
import { ProductImage } from "@/components/product-thumbnail";
import { Typography } from "@/components/typography";
import { LineItem, Product } from "@/types";
import { removeFromCart } from "@/Utils/cartHelper";

// CSS eating shit.
// TODO: Find way to limit height without using max-h-x

export default function Cart() {
  const {
    cart,
    removeFromCart
  } = useCart();
  const t = useTranslations("cart");

  if (cart.items.length === 0) {
    return (
      <div className="h-full m-0 p-0">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="h-[calc(100%-75px)] w-full hd:w-[var(--content-width)] mt-[80px] m-auto hd:mb-[150px] 2xl:mb-auto grid grid-rows-[auto_1fr]">
      <Typography variant="title" weight="thin" className="px-8 lg:py-8 2xl:py-16" uppercase>
        {t("cart")}
      </Typography>
      <div className="flex flex-col-reverse hd:flex-row gap-4 hd:gap-8 fhd:gap-16 2k:gap-32 px-4 mb-80">
        <Link href="/checkout" className="lg:hidden">
          <Button label={t("checkoutButton")} block className="cursor-pointer capitalized" />
        </Link>
        <OrderSummary cartItems={cart.items} />
        <CartItems cartItems={cart.items} onRemoveFromCart={removeFromCart} />
      </div>
    </div>
  );
}

function OrderSummary({ cartItems = [] }: { cartItems?: LineItem[] }) {
  const tCommon = useTranslations("common");
  const t = useTranslations("cart");
  const subTotal = useMemo(() => {
    let tmp = 0;
    cartItems.forEach((i: LineItem) => tmp += i.product.price);
    return tmp;
  }, [ cartItems ]);
  const tax = 0;
  const shipping = 0;
  const promotionPercent = 0;
  const promotionFlat = 0;
  const total = ((subTotal + tax + shipping - promotionFlat) * (1 - promotionPercent));

  return (
    <div className="hd:max-w-80 fhd:max-w-120 flex-1 flex flex-col gap-1 lg:gap-4 2xl:gap-8 p-4 lg:p-8 2xl:px-12 rounded-tl-4xl rounded-br-4xl bg-[var(--primary)]">
      <div>
        <Logo height="50px" className="w-35 xl:w-[250px]" />
        <Typography variant="subtitle" weight="light" className="2xl:text-3xl! mt-2">
          {t("orderSummary")}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle" weight="extralight" className="mb-2 2xl:text-3xl!">
          {t("promoCode")}
        </Typography>
        <InputField block placeholder="Enter Promotion Code" />
      </div>
      <div className="w-full flex justify-between">
        <Typography variant="subtitle" weight="light" className="2xl:text-2xl!">
          {t("subTotal")}
        </Typography>
        <Typography variant="subtitle" weight="light" className="2xl:text-2xl!">
          {tCommon("price", { price: subTotal.toFixed(2), currency: "KWD" })}
        </Typography>
      </div>
      <div className="w-full flex justify-between">
        <Typography variant="body" weight="extralight">
          {t("shipping")}
        </Typography>
        <Typography variant="body" weight="extralight">
          {tCommon("price", { price: 0.00, currency: "KWD" })}
        </Typography>
      </div>
      {/* <div className="w-full flex justify-between">
        <Typography variant="body" weight="extralight">
          {t("estTaxes")}
        </Typography>
        <Typography variant="body" weight="extralight">
          {tCommon("price", { price: 0.00, currency: "KWD" })}
        </Typography>
      </div> */}
      <div className="grow"></div>
      <div className="w-full flex justify-between">
        <Typography variant="subtitle" weight="light" className="2xl:text-3xl!">
          {t("total")}
        </Typography>
        <Typography variant="subtitle" weight="light" className="2xl:text-3xl!">
          {tCommon("price", { price: total.toFixed(2), currency: "KWD" })}
        </Typography>
      </div>
    </div>
  );
}

function CartItems({ cartItems = [] }: { cartItems?: LineItem[]; onRemoveFromCart?: (product: Product) => void }) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");

  return (
    <div className="w-full xl:h-full flex flex-col xl:flex-1">
      <Typography weight="extralight" className="hidden lg:block capitalized text-xl! 2xl:text-3xl!">
        {t("yourCart")}
      </Typography>
      <div className="w-full max-h-40 mobile-sm:max-h-80 mobile:max-h-100 fhd:max-h-140 2k:max-h-200 4k:max-h-400 flex flex-col xl:gap-4 xl:mt-8 xl:mb-8 overflow-y-auto">
        { !cartItems.length ? (
          <div className="w-full p-12 flex justify-center">
            <Typography weight="light">
              {t("emptyCart")}
            </Typography>
          </div>
        ) : "" }
        {
          cartItems.map((item: LineItem) => (
            <div key={`cart-item-${item.product.id}`} className="w-full grid grid-cols-[30px_1fr] lg:grid-cols-[30px_100px_1fr] 2xl:grid-cols-[30px_180px_1fr] gap-4">
              <div className="grid justify-center items-center rounded-md hover:*:text-[var(--primary)] hover:bg-white/10 cursor-pointer" onClick={() => removeFromCart(item.product)}>
                <LuTrash2 />
              </div>
              <ProductImage image={`/images/${item.product.id}.avif`} className="hidden h-full lg:block max-h-33 w-full aspect-square rounded-md" />
              <div className="flex flex-col 2xl:px-2 py-4 2xl:gap-4 overflow-hidden">
                <div className="flex gap-2">
                  <Typography variant="body1" className="truncate">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body" className="min-w-10 hd:hidden self-center">
                    x {item.quantity}
                  </Typography>
                </div>
                <div className="flex flex-col 2xl:gap-2">
                  <div className="hidden w-full hd:grid grid-cols-2">
                    <Typography variant="body" weight="light" className="w-30">
                      {t("quantity")}
                    </Typography>
                    <Typography variant="body" weight="light" className="text-end">
                      {item.quantity}
                    </Typography>
                  </div>
                  <div className="w-full grid grid-cols-2">
                    <Typography variant="body" weight="light">
                      {t("totalPrice")}
                    </Typography>
                    <Typography variant="body" weight="light" className="text-end">
                      {tCommon("price", { price: item.product.price * item.quantity, currency: "KWD" })}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="hidden lg:block grow"></div>
      <Link href="/checkout" className="hidden lg:block">
        <Button label={t("checkoutButton")} block className="cursor-pointer" />
      </Link>
    </div>
  );
}
