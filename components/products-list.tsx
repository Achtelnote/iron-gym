"use client";
import { useState } from "react";
import { Product } from "@/types";

import { Typography } from "./typography";
import { SubNav, SubNavItem } from "./subnav";
import Button from "./button";
import ProductCard from "./product-card";
import { LuChevronLeft, LuChevronRight, LuLoaderCircle } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/api-agent";
import { useLocale, useTranslations } from "next-intl";

export default function ProductsList() {
  const itemsPerPage = 12;
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const locale = useLocale();
  const t = useTranslations("Product");
  
  const { data: products, error, isLoading, isPending, refetch, isError } = useQuery({
    queryKey: ["products", locale],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await getProducts(locale as any);
      return response.data;
    },
    initialData: []
  });
  
  const categories = Array.from(new Set(products.map((p: Product) => p.category)));
  const filteredProducts = products.filter((p: Product) => p.stock > 0 && (p.category === selectedCategory || selectedCategory === 'all'));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil((filteredProducts.length || 0) / itemsPerPage)) return;
    setPage(newPage);
  };

  if (isLoading || isPending) {
    return (
      <div className="w-full h-full min-h-200 flex justify-center align-center">
        <LuLoaderCircle className="animate-spin" width={64} />
      </div>
    );
  }
  
  if (isError || error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-center text-red-500 mb-8">
          <Typography variant="body" weight="light">{t("failedToLoad")}</Typography>
        </div>
        <Button label="Retry" onClick={() => refetch()} className="w-30 m-auto" />
      </div>
    );
  }
  
  if (products.length > 0) {
    return (
      <>
        <SubNav fixed className="hidden lg:block">
          <SubNavItem label={t("all")} className="text-sm capitalized" onClick={() => setSelectedCategory('all')} />
            {
              categories.map((c) => {
                return (
                  <SubNavItem key={`category-${c}`} label={c} className="text-sm capitalized" onClick={() => setSelectedCategory(c)} />
                )
              })
            }
          <div className="flex-1"></div>
          {/* <Button label="Filter" icon={<FaFilter size={12} />} className="h-8 py-0! justify-self-end self-center cursor-pointer text-sm" /> */}
        </SubNav>
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6 lg:mt-8 px-8">
          {
            filteredProducts
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((product) => (
                <ProductCard
                  key={`product-card-${product.id}`}
                  product={product}
                />
              ))
          }
        </div>
        <div className="grid grid-cols-[45px_1fr_45px] justify-center items-center gap-4 m-auto mt-12 mb-4">
          <a className="text-[var(--primary)] mr-4 cursor-pointer" onClick={() => handlePageChange(page - 1)}>
            { locale == "en" ? <LuChevronLeft size={24} /> : <LuChevronRight size={24} />}
          </a>
          <div className="flex items-center gap-4">
            {
              Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) || 1 }, (_, i) => (
                <a key={i} className={`p-2 hover:text-[var(--primary)] cursor-pointer ${i + 1 === page ? 'border-b-2 border-[var(--primary)]' : ''}`} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </a>
              ))
            }
          </div>
          <a className="text-[var(--primary)] ml-4 cursor-pointer" onClick={() => handlePageChange(page + 1)}>
            { locale == "en" ? <LuChevronRight size={24} /> : <LuChevronLeft size={24} />}
          </a>
        </div>
      </>
    );
  }
  
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-red-500 mb-8">
        <Typography variant="body" weight="light">{t("failedToLoad")}</Typography>
      </div>
      <Button label={t("retry")} onClick={() => refetch()} className="m-auto" />
    </div>
  );
}