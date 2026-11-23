"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <NetworkCanvas />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
          <motion.p variants={item} className="eyebrow">
            Estudio de desarrollo web Full Stack
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Tu negocio vendiendo las 24 horas y <span className="text-gradient">organizado sin planillas</span>.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
            Diseño y desarrollo páginas web, tiendas online y sistemas a medida para que dejes de perder clientes en
            el chat y horas en Excel. Rápidos, lindos y hechos para que tu negocio crezca.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className="btn btn-primary">
              Pedir presupuesto sin cargo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/soluciones" className="btn btn-ghost">
              Probar las demos en vivo
            </Link>
          </motion.div>
          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["Webs desde 7 días", "Diseño mobile-first", "Hablás directo con el desarrollador"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto aspect-square w-64 sm:w-80 lg:w-full lg:max-w-[420px]"
        >
          <div className="absolute inset-[8%] animate-glow rounded-full bg-gradient-to-br from-violet/70 to-cyan/40 blur-3xl" />
          <div className="absolute inset-0 rounded-full border border-violet-light/20" />
          <div className="absolute inset-[-6%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-cyan/20" />
          <div className="relative h-full w-full animate-float p-[10%]">
            <Image
              src="/brand/isotipo-violeta.png"
              alt="Isotipo de Kaiju Code: un yin-yang de circuitos con la garra del dragón"
              width={512}
              height={512}
              priority
              className="h-full w-full drop-shadow-[0_0_40px_rgba(0,245,212,0.25)]"
            />
          </div>
        </motion.div>
      </div>

      <a
        href="#problemas"
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-cyan sm:block"
      >
        <span className="block h-10 w-6 rounded-full border border-white/20">
          <span className="mx-auto mt-2 block h-2 w-1 animate-bounce rounded-full bg-cyan" />
        </span>
      </a>
    </section>
  );
}
