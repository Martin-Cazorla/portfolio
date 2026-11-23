"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { plans } from "@/config/site";
import SectionHeading from "@/components/SectionHeading";
import { Check } from "lucide-react";

export default function Plans() {
  const reduce = useReducedMotion();
  return (
    <section id="planes" className="relative scroll-mt-20 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-80 max-w-4xl rounded-full bg-violet/10 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Planes"
          title={
            <>
              Tres niveles, <span className="text-gradient">un mismo estándar</span>
            </>
          }
          intro="Empezá por donde lo necesites hoy. Cuando tu negocio crezca, el proyecto crece con vos."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = Boolean(plan.highlight);
            return (
              <motion.article
                key={plan.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
                className={`relative flex flex-col rounded-3xl p-[1px] ${
                  featured
                    ? "bg-gradient-to-b from-violet-light via-violet to-cyan shadow-[0_20px_60px_-20px_rgba(123,44,191,0.7)]"
                    : "bg-white/10"
                }`}
              >
                <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-night-2 p-7">
                  {plan.highlight && (
                    <span className="absolute -top-3 left-7 rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-night">
                      {plan.highlight}
                    </span>
                  )}
                  <p className="eyebrow">{plan.level}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-3 text-sm text-muted">{plan.summary}</p>

                  <div className="mt-6 border-y border-white/5 py-5">
                    <p className="font-display text-3xl font-bold">{plan.price}</p>
                    <p className="mt-1 text-sm text-cyan">{plan.delivery}</p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-light" aria-hidden />
                        <span className="text-ink/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 rounded-xl bg-white/[0.03] p-3 text-xs text-muted">
                    <strong className="text-ink">Ideal para:</strong> {plan.idealFor}
                  </p>

                  <Link
                    href={`/contacto?plan=${plan.id}`}
                    className={`btn mt-6 w-full ${featured ? "btn-primary" : "btn-ghost"}`}
                  >
                    Quiero el plan {plan.name}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          ¿No sabés cuál te conviene?{" "}
          <Link href="/contacto" className="text-cyan underline-offset-4 hover:underline">
            Contame tu caso
          </Link>{" "}
          y te recomiendo el más adecuado, sin compromiso.
        </p>
      </div>
    </section>
  );
}
