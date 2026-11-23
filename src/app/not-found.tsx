import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <Image src="/brand/isotipo.png" alt="" width={120} height={120} className="animate-float opacity-80" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Esta página se la comió el kaiju</h1>
      <p className="mt-4 max-w-md text-muted">La dirección no existe o cambió de lugar.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Volver al inicio
      </Link>
    </section>
  );
}
