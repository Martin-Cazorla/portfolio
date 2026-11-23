import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import TurneroDemo from "@/components/demos/TurneroDemo";
import StockDemo from "@/components/demos/StockDemo";

export const metadata: Metadata = {
  title: "Soluciones y demos en vivo",
  description:
    "Probá demos reales de un turnero online y un sistema de gestión de stock. Así se sentiría tener tu negocio ordenado con un sistema a medida.",
  alternates: { canonical: "/soluciones" },
  openGraph: { title: "Soluciones y demos en vivo · Kaiju Code", url: "/soluciones" },
};

const demos = [
  {
    id: "turnero",
    eyebrow: "Demo 01 · Turnero online",
    title: "Tu agenda llena, sin atender el teléfono",
    text: "Elegí un día y un horario y reservá un turno. A la derecha ves lo mismo que vería el negocio: la agenda del día actualizándose al instante.",
    benefits: [
      "Los clientes reservan solos, a cualquier hora",
      "Recordatorios automáticos que reducen las ausencias",
      "Agenda por profesional, servicio o sucursal",
    ],
    ideal: "Consultorios, centros de estética, peluquerías, talleres y estudios.",
    Demo: TurneroDemo,
  },
  {
    id: "stock",
    eyebrow: "Demo 02 · Gestión de stock",
    title: "Sabé qué tenés, qué vendiste y qué reponer",
    text: "Registrá ventas e ingresos con un clic, cargá productos nuevos y mirá cómo se actualizan las métricas y las alertas de reposición.",
    benefits: [
      "Alertas cuando un producto llega al mínimo",
      "Valor del inventario y movimientos en tiempo real",
      "Usuarios para tu equipo y reportes exportables",
    ],
    ideal: "Almacenes, ferreterías, distribuidoras, kioscos y depósitos.",
    Demo: StockDemo,
  },
];

const more = [
  { title: "Catálogos y tiendas online", text: "Productos, carrito y pagos con Mercado Pago. Vos cargás, el cliente compra." },
  { title: "CRM simple", text: "Clientes, presupuestos y seguimiento de ventas en un solo lugar, sin perder un contacto." },
  { title: "Paneles de control", text: "Las métricas de tu negocio en una pantalla: ventas, gastos, rendimiento por día." },
  { title: "Webs institucionales", text: "Tu carta de presentación online: rápida, profesional y lista para aparecer en Google." },
];

export default function SolucionesPage() {
  return (
    <>
      <section className="relative pt-32 pb-8">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            as="h1"
            eyebrow="Soluciones"
            title={
              <>
                Sistemas que podés <span className="text-gradient">tocar antes de comprar</span>
              </>
            }
            intro="Estas demos funcionan de verdad: guardan lo que cargás en tu navegador. Imaginalas con tu logo, tus servicios y tus productos."
          />
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {demos.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="btn btn-ghost !py-2 text-sm">
                {d.eyebrow.split(" · ")[1]}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {demos.map(({ id, eyebrow, title, text, benefits, ideal, Demo }) => (
        <section key={id} id={id} className="scroll-mt-20 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">{title}</h2>
                <p className="mt-4 text-muted">{text}</p>
              </div>
              <Link href="/contacto?plan=sistemas" className="btn btn-primary self-start lg:self-end">
                Quiero algo así
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="relative mt-8">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet/20 via-transparent to-cyan/10 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-night-2/80 p-2 shadow-2xl sm:p-3">
                <div className="flex items-center gap-1.5 px-3 pb-3 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 truncate text-xs text-muted">app.tunegocio.com/{id}</span>
                  <span className="ml-auto rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan">
                    Demo en vivo
                  </span>
                </div>
                <Demo />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
              <ul className="grid gap-2 sm:grid-cols-3">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted">
                    <span className="text-cyan" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted md:max-w-xs md:text-right">
                <span className="text-ink">Ideal para:</span> {ideal}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Y mucho más"
            title="Si tu negocio lo necesita, se puede construir"
            intro="Cada sistema se diseña a partir de cómo trabajás hoy. Estas son algunas de las soluciones más pedidas."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.06} className="card p-6">
                <p className="font-display text-lg font-semibold">{m.title}</p>
                <p className="mt-2 text-sm text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            ¿Te imaginás esto <span className="text-gradient">con tu marca</span>?
          </>
        }
        text="Contame cómo trabajás hoy y te propongo un sistema a medida, con plazos y precio cerrados."
      />
    </>
  );
}
