"use client";

import { useEffect, useRef, useState } from "react";

import { Cart, LineItem, Product } from "@/types";
import { EVENT_CART_CHANGED } from "@/Utils/constants";

const defaultCart: Cart = {
  items: [],
  region: "en" // Get default region
};

export default function useCart() {
  const [cart, setCart] = useState(defaultCart);
  const isInitRef = useRef(false);

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      setCart(JSON.parse(cartString));
    }
  }, []);

  // Listen to localStorage.Cart changes and update local state
  useEffect(() => {
    const updateCart = () => {
      isInitRef.current = true;
      const cart = localStorage.getItem("cart");
      if (cart) {
        const tmpCart = JSON.parse(cart);
        setCart(tmpCart);
      }
    }
    document.addEventListener(EVENT_CART_CHANGED, updateCart);
    return () => document.removeEventListener(EVENT_CART_CHANGED, updateCart);
  }, [ ]);

  function saveCart(newCart: Cart) {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  
  function addToCart(product: Product) {
    const tmpCart = { ...cart };
    const lineItem: LineItem = {
      product: product,
      quantity: 1,
      price: product.price,
    };
  
    let exists = false;
    
    for (const item of tmpCart.items) {
      if (
        item.product.id == lineItem.product.id
        // && item.variant == lineItem.variant
      ) {
        item.quantity += 1;
        item.price += product.price;
        exists = true;
      }
    }
  
    if (!exists) cart.items.push(lineItem);
    saveCart(tmpCart);
    document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: tmpCart }));
  }
  
  function removeFromCart(product: Product) {
    const tmpCart = {...cart};
    const items = tmpCart.items.filter((i) => (
      i.product.id != product.id
      // || i.variant != product.variant
    ));
    tmpCart.items = items;
    saveCart(tmpCart);
    document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: tmpCart }));
  }
  
  function clearCart() {
    const cart = {...defaultCart};
    saveCart(cart);
    document.dispatchEvent(new CustomEvent(EVENT_CART_CHANGED, { detail: cart }));
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInitRef
  };
}