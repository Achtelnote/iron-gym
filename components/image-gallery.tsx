"use client";
import { useEffect, useRef, useState } from "react";
import { ProductImage } from "./product-thumbnail";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useLocale } from "next-intl";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();

  const handleNextImageClick = () => {
    if (selectedImageIndex < images.length - 1)
      setSelectedImageIndex(selectedImageIndex + 1);
    else
      setSelectedImageIndex(0);
  };

  const handlePrevImageClick = () => {
    if (selectedImageIndex > 0)
      setSelectedImageIndex(selectedImageIndex - 1);
    else
      setSelectedImageIndex(images.length - 1);
  };

  useEffect(() => {
    if (thumbsRef.current) {
      const selectedThumb = thumbsRef.current.children[selectedImageIndex] as HTMLButtonElement;
      if (selectedThumb) {
        selectedThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedImageIndex]);

  {/* h-full flex flex-col gap-2 */}
  return (
    <div className={`h-full grid grid-rows-[${images.length > 1 ? "1fr_120px" : "1fr"}] gap-2 overflow-hidden`}>
      <ProductImage image={images[selectedImageIndex]} className={`w-full h-full overflow-hidden ${locale == "en" ? "rounded-l-md" : "rounded-r-md" }`} />
      {
        images.length > 1 ? (
          <div className="lg:max-h-30 2xl:max-h-40 grid grid-cols-[20px_1fr_20px] gap-2">
            <button className="cursor-pointer rounded-l-sm bg-slate-400/20 hover:bg-slate-400/50" onClick={handlePrevImageClick}>
              <LuChevronLeft />
            </button>
            <div ref={thumbsRef} className="flex flex-row gap-2 overflow-hidden">
              {
                images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative min-w-40 overflow-hidden cursor-pointer hover:opacity-75 transition-opacity duration-200"
                  >
                    <ProductImage
                      image={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`object-cover w-40 h-full ${selectedImageIndex != index ? 'opacity-50' : ''}`}
                    />
                  </button>
                ))
              }
            </div>
            <button className="cursor-pointer rounded-r-sm bg-slate-400/20 hover:bg-slate-400/50" onClick={handleNextImageClick}>
              <LuChevronRight />
            </button>
          </div>
        ) : null
      }
    </div>
  )
}
