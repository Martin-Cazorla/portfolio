import Link from "next/link";
import Reveal from "./Reveal";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppButton";

type Props = {
  title?: React.ReactNode;
  text?: string;
};

export default function CtaBand({
  title = (
    <>
      ¿Listo para que tu negocio <span className="text-gradient">juegue en otra liga</span>?
    </>
  ),
  text = "Contame qué necesitás y en menos de 24 horas hábiles te respondo con una propuesta concreta. Sin compromiso.",
}: Props) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-light/20 bg-night-2 px-6 py-14 text-center sm:px-12">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet/40 blur-[90px]" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan/20 blur-[90px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contacto" className="btn btn-primary">
              Pedir presupuesto
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsAppIcon className="h-5 w-5" />
              Escribime por WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
