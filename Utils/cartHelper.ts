"use client";

import { Cart, CartEventProps, LineItem, Product } from "@/types";
import { EVENT_CART_CHANGED, EVENT_CART_CLEARED, EVENT_CART_ITEM_ADDED, EVENT_CART_ITEM_REMOVED } from "./constants";


const defaultCart: Cart = {
  items: [],
  region: "en" // Get default region
};
const isClient = () => typeof window != "undefined";

export function watchCart(callback: (e: CustomEventInit<CartEventProps>) => void) {
  document.addEventListener("itemAdded", callback);
}

export function unwatchCart(callback: (e: CustomEventInit<CartEventProps>) => void) {
  document.removeEventListener("itemAdded", callback);
}

export function getCart(): Cart{
  if (!isClient()) return defaultCart;
  let tCart = localStorage.getItem("cart");
  if (!tCart) return defaultCart;
  return JSON.parse(tCart) as Cart;
}

function setCart(newCart: Cart) {
  if (!isClient()) return false;
  try {
    console.log(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function addToCart(product: Product, quantity: number = 1) {
  const cart = {...getCart()};
  const lineItem: LineItem = {
    product,
    quantity,
    price: product.price,
  };

  let exists = false;
  
  for (let item of cart.items) {
    if (
      item.product.id == lineItem.product.id
      // && item.variant == lineItem.variant
    ) {
      item.quantity += quantity;
      item.price += product.price;
      exists = true;
    }
  }

  if (!exists) cart.items.push(lineItem);
  
  setCart(cart);
  document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: cart }));
  document.dispatchEvent(new CustomEvent(EVENT_CART_ITEM_ADDED, { detail: cart }));
}

export function removeFromCart(product: Product) {
  const cart = getCart();
  const items = cart.items.filter((i) => (
    i.product.id != product.id
    // || i.variant != product.variant
  ));
  cart.items = items;
  setCart(cart);
  document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: cart }));
  document.dispatchEvent(new CustomEvent(EVENT_CART_ITEM_REMOVED, { detail: cart }));
}

export function clearCart() {
  const cart = {...defaultCart};
  setCart(cart);
  document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: cart }));
  document.dispatchEvent(new CustomEvent(EVENT_CART_CLEARED, { detail: cart }));
}
