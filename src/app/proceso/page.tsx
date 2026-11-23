import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "Proceso",
  description:
    "Cómo trabajamos en Kaiju Code: reunión inicial, prototipo, desarrollo y lanzamiento. Plazos claros, pagos en etapas y soporte después de la entrega.",
  alternates: { canonical: "/proceso" },
  openGraph: { title: "Cómo trabajamos · Kaiju Code", url: "/proceso" },
};

const steps = [
  {
    n: "01",
    title: "Reunión inicial",
    time: "30 minutos · sin cargo",
    text: "Charlamos por videollamada o WhatsApp sobre tu negocio, tus clientes y qué te está frenando. Salís con una idea clara de qué conviene hacer, aunque no trabajemos juntos.",
    out: "Propuesta con alcance, plazo y precio cerrado.",
  },
  {
    n: "02",
    title: "Prototipo",
    time: "3 a 7 días",
    text: "Antes de escribir una línea de código definitiva, te muestro cómo se va a ver y funcionar. Lo ajustamos juntos hasta que sea exactamente lo que imaginabas.",
    out: "Diseño navegable aprobado por vos.",
  },
  {
    n: "03",
    title: "Desarrollo",
    time: "Según el plan",
    text: "Construyo tu web o sistema con tecnología moderna. Te comparto avances en un link de prueba para que veas el progreso en vivo, sin sorpresas al final.",
    out: "Versión de prueba online para revisar.",
  },
  {
    n: "04",
    title: "Lanzamiento y soporte",
    time: "Desde el día 1",
    text: "Publicamos con dominio, hosting y seguridad configurados. Te enseño a usarlo y quedo disponible para ajustes, mejoras y mantenimiento mensual.",
    out: "Tu proyecto online y vos con el control.",
  },
];

const faqs = [
  {
    q: "¿Cómo se paga?",
    a: "Trabajo con 50% de anticipo para arrancar y 50% contra entrega. En proyectos grandes (Nivel 3) dividimos el pago por etapas, así pagás a medida que ves resultados.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "Tenés un período de garantía para corregir cualquier detalle sin costo. Después podés sumar un plan de mantenimiento mensual que incluye hosting, actualizaciones, copias de seguridad y pequeños cambios.",
  },
  {
    q: "¿Voy a poder hacer cambios yo mismo?",
    a: "Sí. Las tiendas y los sistemas incluyen un panel para que cargues productos, precios, turnos o lo que necesites sin depender de nadie. Y te dejo una capacitación grabada.",
  },
  {
    q: "¿El dominio y la web son míos?",
    a: "Sí, todo queda a tu nombre: dominio, contenido y accesos. Nada de quedar atado a un proveedor.",
  },
  {
    q: "¿Trabajás solo en mi ciudad?",
    a: "Trabajo 100% remoto, así que puedo hacer tu proyecto estés donde estés. Las reuniones son por videollamada o WhatsApp.",
  },
  {
    q: "No sé qué plan necesito, ¿qué hago?",
    a: "Escribime y contame tu situación. En la reunión inicial te digo con honestidad qué te conviene, aunque sea la opción más simple.",
  },
];

export default function ProcesoPage() {
  return (
    <>
      <section className="relative pt-32 pb-12">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            as="h1"
            eyebrow="Cómo trabajamos"
            title={
              <>
                Un proceso claro, <span className="text-gradient">sin letra chica</span>
              </>
            }
            intro="Si nunca contrataste un desarrollo, es normal tener dudas. Por eso cada etapa tiene plazos, entregables y tu aprobación antes de seguir."
          />
        </div>
      </section>

      <section className="pb-12">
        <ol className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <span
            aria-hidden
            className="absolute left-[2.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-violet-light via-violet to-cyan sm:left-[2.65rem]"
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-light/40 bg-night font-display text-sm font-bold text-cyan shadow-[0_0_24px_-4px_rgba(123,44,191,0.8)] sm:h-14 sm:w-14">
                {s.n}
              </span>
              <div className="card flex-1 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-bold">{s.title}</h2>
                  <span className="text-xs text-cyan">{s.time}</span>
                </div>
                <p className="mt-3 text-muted">{s.text}</p>
                <p className="mt-4 text-sm">
                  <span className="text-violet-light">Resultado:</span> {s.out}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que todos preguntan antes de arrancar" />
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
