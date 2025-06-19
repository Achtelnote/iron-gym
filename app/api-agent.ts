import { Locale, Product, ProductResponse } from "@/types";

export async function getProducts(locale: Locale = "en") {
  const response = await fetch(`/products/-1`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const json: ProductResponse[] = await response.json();
  const products = json.map((p) => {
    const tmp: Product = {
      id: p.id,
      name: p.name[locale],
      category: p.category[locale],
      description: p.description[locale],
      image: `/images/${p.id}.avif`,
      stock: p.stock,
      price: p.price,
      hidden: p.hidden,
    };
    return tmp;
  });
  return { data: products };
}

export async function getProduct(id?: string, locale: Locale = "en") {
  const response = await fetch(`/products/${id}`);
  if (!response.ok) {
    // throw new Error("Failed to fetch products");
    return { error: "Failed to fetch products" };
  }

  const json: ProductResponse = await response.json();
  const product = {
    id: json.id,
    name: json.name[locale],
    category: json.category[locale],
    description: json.description[locale],
    image: `/images/${json.id}.avif`,
    stock: json.stock,
    price: json.price,
    hidden: json.hidden
  } as Product;

  return { data: product };
}
