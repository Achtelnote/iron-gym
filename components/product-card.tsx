import { unstable_ViewTransition as ViewTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/app/i18n/navigation';

import { ProductImage } from "./product-thumbnail";
import Button from './button';
import { Product } from '@/types';
import { addToCart } from '@/Utils/cartHelper';

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  addToCart?: (product: Product) => void;
  compact?: boolean;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const t = useTranslations("Product");
  const locale = useLocale() as "ar" | "en";

  return (
    <div className="relative sm:min-h-[300px] mt-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200 shadow-md cursor-pointer">
      <Link onClick={onClick} href={`/product/${product.id}`}>
        <ViewTransition name={`product-card-${product.id}`}>
          <ProductImage alt={product.name[locale]} image={product.image} className="h-full w-full min-h-[200px] sm:min-h-[300px] max-h-[160px] sm:max-h-[300px] rounded-t-2xl" />
        </ViewTransition>
        <div className="px-2 md:px-4 md:mt-4 mb-4 2xl:mb-8">
          <h2 className="text-base 2xl:text-lg font-medium mt-2 uppercase truncate">{product.name[locale]}</h2>
          <p className="text-sm 2xl:text-lg text-gray-300 mb-4">
            {
              product.stock ? t("price", { price: product.price, currency: "kwd" })
              : <span className="text-red-500">{t("out_of_stock")}</span>
            }
          </p>
        </div>
      </Link>
      <Button className={`absolute block ${locale == "en" ? "right-0": "left-0"} bottom-0 text-sm uppercase cursor-pointer`} label={t("addToCart")} compact onClick={() => addToCart(product)} />
      {/* <Button className={`absolute block 2xl:hidden ${locale == "en" ? "right-0": "left-0"} bottom-0 text-xs uppercase cursor-pointer`} label={t("addToCartShort")} compact onClick={() => addToCart(product)} /> */}
    </div>
  );
}
