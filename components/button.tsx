import { MouseEvent } from "react";
import { LuLoaderCircle } from "react-icons/lu";

type ButtonProps = {
  variant?: "primary" | "secondary";
  label?: string;
  icon?: React.ReactNode;
  block?: boolean;
  compact?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export default function Button({
  variant = "primary",
  label,
  icon,
  block = false,
  compact = false,
  disabled = false,
  loading = false,
  className,
  onClick
}: ButtonProps) {
  const primaryStyle = "bg-[var(--primary)] rounded-tl-2xl rounded-br-2xl cursor-pointer grid justify-center align-center";
  const secondaryStyle = "";

  if (variant == "primary") {
    return (
      <button
        className={`${variant == "primary" ? primaryStyle : secondaryStyle} ${block ? "w-full" : ""} ${compact ? "px-6 py-2" : "px-6 py-3"} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {
          loading ? (
          <LuLoaderCircle className="animate-spin" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            {icon}
            {label}
          </span>
        )
        }
      </button>
    )
  }
}
