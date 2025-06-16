import { getTranslations } from "next-intl/server";

export default async function Cart() {
  const t = await getTranslations("CartModal");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">{t("yourCart")}</h1>
      <p className="text-lg">{t("emptyCart")}</p>
      <p className="text-sm text-gray-500 mt-2">
        {t("emptyCartHint")}
      </p>
    </div>
  );
}
