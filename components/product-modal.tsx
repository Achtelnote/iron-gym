'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import ImageGallery from "./image-gallery";
import { useTranslations } from "next-intl";
import QuantityInput from "./form/quantity-input";
// import BuyButtons from "./form/buy-buttons";
import ImageCarousel from "./image-carousel";

export type Product = {
    title: string;
    price: number;
    image: string;
    description: string;
  };

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documentBody, setDocumentBody] = useState<any>();
  const t = useTranslations("ProductModal");

  const handleClose = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.classList.add("opacity-0!", "pointer-events-none!");
      setTimeout(() => {
        onClose();
      }, 100);
    }
  }, [onClose]);

  useEffect(() => {
    setDocumentBody(document.body);
    if (isOpen && modalRef.current) {
      modalRef.current.classList.remove("opacity-0!", "pointer-events-none!");
    }
  }, [isOpen]);

  if (!documentBody) return;
  return createPortal(
    (
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          ref={modalRef}
          className="relative w-full h-full bg-black transition-opacity duration-200 opacity-95 opacity-0! cursor-pointer pointer-events-auto pointer-events-none!" onClick={handleClose}
        ></div>
        {
          (isOpen || product) ? (
            <div className="absolute h-full w-full sm:max-w-6/10 sm:min-h-3/5 sm:h-3/5 p-2 sm:p-6 rounded-lg shadow-lg bg-[var(--foreground1)] text-[var(--on-foreground1)] pointer-events-auto">
              <button
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={handleClose}
              >
                <LuX size={24} strokeWidth={3} />
              </button>
              <div className="grid grid-rows-[2fr_1fr] sm:grid-cols-[2fr_3fr] sm:grid-rows-1 h-full p-2 mt-8 sm:mt-0 sm:p-0">
                <div className="hidden sm:block w-full">
                  <ImageGallery
                    images={[
                      "./placeholder.jpg",
                      product?.image || "",
                      "./cat.png",
                      "./moon.png",
                      "./pls.png",
                      "./pc.jpg",
                    ]}
                  />
                </div>
                <div className="sm:hidden w-full">
                  <ImageCarousel
                    images={[
                      "./placeholder.jpg",
                      product?.image || "",
                      "./cat.png",
                      "./moon.png",
                      "./pls.png",
                      "./pc.jpg",
                    ]}
                  />
                </div>
                <div className="w-full h-full grid grid-rows-[100px_1fr_50px_2fr] sm:px-8 sm:p-4">
                  <div>
                    <h3 className="text-3xl font-semibold mb-2">{product?.title}</h3>
                    <h4 className="text-base font-light">{t("usdPrice", { price: product?.price || 0 })}</h4>
                  </div>
                  <p className="hidden sm:block">{product?.description}</p>
                  <QuantityInput value={0} />
                  {/* <BuyButtons product={product} /> */}
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    ),
    documentBody
  );
};