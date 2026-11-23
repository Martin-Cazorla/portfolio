import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";

const demos = [
  {
    title: "Turnero online",
    text: "Tus clientes eligen día y horario, y vos ves la agenda del día ordenada. Chau cuaderno.",
    tag: "Consultorios · Estética · Talleres",
    href: "/soluciones#turnero",
  },
  {
    title: "Gestión de stock",
    text: "Productos, movimientos y alertas cuando algo se está por agotar. Todo en un panel.",
    tag: "Comercios · Distribuidoras · Depósitos",
    href: "/soluciones#stock",
  },
];

export default function DemoTeaser() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Demos en vivo"
          title={
            <>
              No te lo cuento: <span className="text-gradient">probalo vos</span>
            </>
          }
          intro="Armé sistemas de ejemplo que funcionan de verdad. Tocá, cargá datos y mirá cómo se sentiría en tu negocio."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {demos.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1}>
              <Link
                href={d.href}
                className="card group relative block h-full overflow-hidden p-8 transition-colors hover:border-cyan/40"
              >
                <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-cyan/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />
                <p className="text-xs text-cyan">{d.tag}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{d.title}</h3>
                <p className="mt-3 text-muted">{d.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-light">
                  Abrir demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
