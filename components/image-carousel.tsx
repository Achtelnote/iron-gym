"use client";
import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { ProductImage } from "./product-thumbnail";

type ImageCarouselProps = {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const touchXRef = useRef(0);
  
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.style.gridTemplateColumns = `repeat(${images.length}, 1fr)`;
      const selectedThumb = viewerRef.current.children[selectedImageIndex] as HTMLImageElement;
      if (selectedThumb) {
        selectedThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
      }
    }
  }, [selectedImageIndex, images.length ]);

  const onTouchDown: TouchEventHandler = (event) => touchXRef.current = event.touches[0].clientX;
  const onTouchUp: TouchEventHandler = (event) => {
    const finalX = event.changedTouches[0].clientX;
    const deltaX = finalX - touchXRef.current;
    if (Math.abs(deltaX) > 75) {
      if (deltaX > 0) {
        setSelectedImageIndex((prevIndex) => selectedImageIndex > 0 ? prevIndex - 1 : images.length - 1);
      } else {
        setSelectedImageIndex((prevIndex) => selectedImageIndex < images.length - 1 ? prevIndex + 1 : 0);
      }
    }
  }

  return (
    <div ref={viewerRef} onTouchStart={onTouchDown} onTouchEnd={onTouchUp} className="relative grid gap-2 h-full overflow-hidden">
      {
        images.map((image, index) => (
          <div
            key={index}
            className={`absolute ${images.length > 1 ? "w-13/14 ml-6" : "w-full"} h-full transition-translate duration-300 ease-in-out overflow-hidden px-2`}
            style={{
              transform: `translateX(${(index) * 102}%)`,
            }}
          >
            <ProductImage
              key={`${image}-${index}`}
              image={image}
              alt={`Product image ${index}`}
              className="pointer-events-none user-select-none w-full h-full rounded-sm"
            />
          </div>
        ))
      }
    </div>
  );
}
