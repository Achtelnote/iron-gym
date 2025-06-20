import { Product, ProductResponse } from "@/types";

export async function getProducts() {
  const response = await fetch(`/api/products/-1`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const json: ProductResponse[] = await response.json();
  const products = json.map((p) => {
    const tmp: Product = {
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      image: `/images/${p.id}.avif`,
      stock: p.stock,
      price: p.price,
      hidden: p.hidden,
    };
    return tmp;
  });
  return { data: products };
}

export async function getProduct(id?: string) {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    // throw new Error("Failed to fetch products");
    return { error: "Failed to fetch products" };
  }

  const json: ProductResponse = await response.json();
  const product = {
    id: json.id,
    name: json.name,
    category: json.category,
    description: json.description,
    image: `/images/${json.id}.avif`,
    stock: json.stock,
    price: json.price,
    hidden: json.hidden
  } as Product;

  return { data: product };
}
