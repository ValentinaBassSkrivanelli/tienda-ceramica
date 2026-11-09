"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

// Vacía el carrito cuando la persona vuelve de pagar.
export default function ClearCart() {
  const { vaciar, listo } = useCart();

  useEffect(() => {
    if (listo) vaciar();
  }, [listo, vaciar]);

  return null;
}
