import { useTranslations } from "next-intl";
import Link from "next/link";

export default function EmptyCart() {
  const t = useTranslations("cart");
  const tHome = useTranslations("HomePage");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">{t("cart")}</h1>
      <p className="text-gray-500">{t("emptyCart")}</p>
      <Link className="text-white underline" href="/">
        {tHome("shopnow")}
      </Link>
    </div>
  );
}
