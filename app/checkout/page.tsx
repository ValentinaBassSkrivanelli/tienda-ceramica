import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Finalizar compra",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <h1 className="mb-10 font-display text-4xl">Finalizar compra</h1>
      <CheckoutForm />
    </div>
  );
}
