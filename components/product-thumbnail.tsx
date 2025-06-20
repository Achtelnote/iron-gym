import Image from "next/image";

export function ProductImage({
  alt = "Product Image",
  image = "/placeholder.jpg",
  className,
  style
}: {
  alt?: string;
  image?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={image}
      alt={alt}
      width="10000"
      height="10000"
      className={`object-fit aspect-[1/2] ${className}`}
      style={style}
    />
  );
}

// <div className="aspect-w-1 aspect-h-2 sm:aspect-h-1 overflow-hidden h-full grow">
// </div>