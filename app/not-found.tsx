import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <h1 className="font-display text-4xl">No encontramos esa página</h1>
      <p className="mt-4 max-w-md text-lg text-hollin/75">
        Puede que la pieza ya no esté en la colección o que el link esté mal escrito.
      </p>
      <Link
        href="/#coleccion"
        className="mt-8 inline-block bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
      >
        Ver la colección
      </Link>
    </div>
  );
}
