type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "heading" | "subheading" | "title" | "title1" | "title2" | "subtitle" | "body" | "body1" | "caption";
  weight?: "light" | "extralight" | "thin" | "normal" | "medium" | "semibold" | "bold" | "black";
  capitalized?: boolean;
  uppercase?: boolean;
  as?: React.ElementType;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  className = "",
  variant = "body",
  weight = "normal",
  capitalized = false,
  uppercase = false,
  as: Component = "p",
}) => {
  const baseStyles = "text-gray-900 dark:text-gray-100";
  const variantStyles = {
    heading: "text-3xl/9 hd:text-5xl/12 2k:text-6xl/15 ltr:tracking-widest",
    subheading: "text-sm hd:text-base 2k:text-lg ltr:hd:tracking-[0.80rem]",
    title: "text-xl hd:text-3xl 2k:text-5xl ltr:tracking-widest",
    title1: "text-xl hd:text-2xl 2k:text-3xl ltr:tracking-widest",
    title2: "text-lg hd:text-xl 2k:text-2xl ltr:tracking-widest",
    subtitle: "text-xl",
    body1: "text-lg",
    body: "text-base",
    bodySmall: "text-sm",
    caption: "text-xs",
  };

  const weightStyles = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    black: "font-black",
  };

  return (
    <Component className={`${baseStyles} ${variantStyles[variant]} ${weightStyles[weight]} ${capitalized ? "capitalized" : ""} ${uppercase ? "uppercase" : ""} ${className}`}>
      {children}
    </Component>
  );
};
