import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const problems = [
  {
    icon: "🔍",
    pain: "Te buscan en Google y no te encuentran.",
    fix: "Una web profesional y optimizada para que el cliente llegue a vos y no a la competencia.",
  },
  {
    icon: "💬",
    pain: "Respondés las mismas preguntas por WhatsApp todo el día.",
    fix: "Catálogo, precios y turnos online: el cliente se autogestiona y vos atendés solo lo importante.",
  },
  {
    icon: "📒",
    pain: "Tu negocio vive en cuadernos, Excel y papelitos.",
    fix: "Un sistema a medida que ordena turnos, stock, clientes y ventas en un solo lugar.",
  },
  {
    icon: "🐢",
    pain: "Tu web actual es lenta o se rompe en el celular.",
    fix: "Sitios rápidos, modernos y pensados primero para el teléfono, que es donde está tu cliente.",
  },
  {
    icon: "📉",
    pain: "No sabés cuánto vendiste ni qué te falta reponer.",
    fix: "Paneles con métricas claras y alertas de stock para decidir con datos, no a ojo.",
  },
  {
    icon: "🌙",
    pain: "Cuando cerrás, tu negocio deja de vender.",
    fix: "Tienda online y reservas que trabajan las 24 horas, incluso mientras dormís.",
  },
];

export default function Problems() {
  return (
    <section id="problemas" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Lo que resolvemos"
          title={
            <>
              ¿Te suena alguno de <span className="text-gradient">estos problemas</span>?
            </>
          }
          intro="No vendemos código: resolvemos lo que hoy te hace perder tiempo, clientes y plata."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal as="li" key={p.pain} delay={(i % 3) * 0.08} className="card group relative overflow-hidden p-6">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="text-2xl" aria-hidden>
                {p.icon}
              </span>
              <p className="mt-4 font-display text-lg font-semibold">{p.pain}</p>
              <p className="mt-3 flex gap-2 text-sm text-muted">
                <span className="text-cyan" aria-hidden>
                  ✓
                </span>
                {p.fix}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
