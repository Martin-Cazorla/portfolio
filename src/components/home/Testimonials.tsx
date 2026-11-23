import Link from "next/link";
import { testimonials } from "@/config/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** Casos y testimonios. Se cargan en src/config/site.ts → testimonials. */
export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Casos y testimonios"
          title={
            <>
              Proyectos que <span className="text-gradient">hablan por sí solos</span>
            </>
          }
        />

        {testimonials.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.author + i} delay={i * 0.08} className="card flex flex-col p-7">
                <span className="font-display text-4xl leading-none text-violet-light" aria-hidden>
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-ink/90">{t.quote}</blockquote>
                <div className="mt-6 border-t border-white/5 pt-4 text-sm">
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-muted">{t.role}</p>
                  {t.project &&
                    (t.href ? (
                      <a href={t.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-cyan">
                        {t.project} ↗
                      </a>
                    ) : (
                      <p className="mt-1 text-cyan">{t.project}</p>
                    ))}
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="card relative mx-auto mt-12 max-w-3xl overflow-hidden p-8 text-center sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-violet/15 via-transparent to-cyan/10" />
            <div className="relative">
              <p className="font-display text-2xl font-bold">Tu proyecto puede ser el próximo caso de éxito.</p>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Kaiju Code está sumando sus primeros clientes y quiere que cada uno sea una carta de presentación.
                Eso significa atención dedicada, seguimiento cercano y condiciones especiales de lanzamiento.
              </p>
              <Link href="/contacto" className="btn btn-primary mt-7">
                Quiero ser uno de los primeros
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
