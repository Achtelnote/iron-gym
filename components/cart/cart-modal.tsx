"use client";

import { useLocale, useTranslations } from "next-intl";
import { LuTrash2 } from "react-icons/lu";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/app/i18n/navigation";

import { ProductImage } from "../product-thumbnail";
import { Typography } from "../typography";
import Button from "../button";
import { LineItem } from "@/types";
import useCart from "@/app/hooks/cart";

export default function CartModal() {
  const {
    cart,
    removeFromCart,
    isInitRef
  } = useCart();
  const tp = useTranslations("Product");
  const tc = useTranslations("CartModal");
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const path = usePathname();
  const locale = useLocale() as "ar" | "en";

  useEffect(() => {
    if (!isInitRef.current) return;
    if (!path.includes("/cart") && modalRef.current && cart.items.length > 0) {
      modalRef.current.classList.add("hd:grid!");
      timeoutRef.current = setTimeout(() => {
        modalRef.current?.classList.remove("hd:grid!");
      }, 1500);
    }
  }, [cart, isInitRef, path]);
  
  return (
    <div ref={modalRef} className={`hidden absolute right-0 w-[24rem] h-[27rem] z-5 grid-rows-[50px_1fr_50px] gap-2 p-4 bg-[var(--primary)] rounded-tl-3xl rounded-br-3xl align-center`}>
      <Link href="/cart">
        <Typography variant="subtitle" weight="light" uppercase className="text-center py-1 hover:bg-white/10 rounded-md">
          {tc("yourCart")}
        </Typography>
      </Link>
      <div className="max-h-[20rem] flex flex-col overflow-auto">
        {
          !cart.items.length ? (
            <></>
          ) : null
        }
        {
          cart.items.map((item: LineItem, index: number) => (
            <div key={`item-${item.product.id}`}>
              <div className={`relative min-h-[70px] max-h-[70px] overflow-hidden grid grid-cols-[80px_1fr] gap-4`}>
                <ProductImage image={`/images/${item.product.id}.avif`} className="rounded-md! w-full max-h-[70px]" />
                <div className="max-h-[70px] flex flex-col justify-between">
                  <div className="h-[45px] overflow-hidden">
                    <Typography variant="body">
                      {item.product.name[locale]} x {item.quantity}
                    </Typography>
                  </div>
                  <Typography className="text-sm" weight="semibold">
                    {tp("price", { price: item.product.price, currency: "kwd" })}
                  </Typography>
                </div>
                <div className="hover:*:opacity-100 absolute w-full h-full cursor-pointer">
                  <div className="opacity-0 w-full h-full grid justify-center items-center hover:bg-black/80 rounded-md transition-opacity duration-100" onClick={() => removeFromCart(item.product)}>
                    <LuTrash2 className="text-white" size={24} />
                  </div>
                </div>
              </div>
              {
                index < cart.items.length - 1 ? (
                  <hr className="my-1 mx-1 border-1 border-white/40" />
                ) : null
              }
            </div>
          ))
        }
      </div>
      <Link href="/checkout">
        <Button block label={tc("checkout")} className="border-1" />
      </Link>
    </div>
  );
}