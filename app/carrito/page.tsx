import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <h1 className="mb-10 font-display text-4xl">Tu carrito</h1>
      <CartView />
    </div>
  );
}
