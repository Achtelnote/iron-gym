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
    <img
      src={image}
      alt={alt}
      className={`object-cover aspect-[1/2] ${className}`}
      style={style}
    />
  );
}

// <div className="aspect-w-1 aspect-h-2 sm:aspect-h-1 overflow-hidden h-full grow">
// </div>