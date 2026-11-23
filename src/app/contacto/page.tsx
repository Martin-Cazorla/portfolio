import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto y presupuesto",
  description:
    "Contame tu proyecto y recibí una propuesta concreta en menos de 24 horas hábiles. Webs, tiendas online y sistemas a medida.",
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Pedí tu presupuesto · Kaiju Code", url: "/contacto" },
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { plan } = await searchParams;
  const initialPlan = typeof plan === "string" ? plan : undefined;

  return (
    <section className="relative pt-32 pb-24">
      <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-[700px] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          as="h1"
          eyebrow="Contacto"
          title={
            <>
              Contame tu idea y <span className="text-gradient">la hacemos realidad</span>
            </>
          }
          intro="Completá el formulario y te respondo con una propuesta clara: qué conviene hacer, en cuánto tiempo y cuánto cuesta."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
          <Reveal>
            <ContactForm key={initialPlan ?? "none"} initialPlan={initialPlan} />
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-4 p-6 transition-colors hover:border-[#25D366]/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <WhatsAppIcon />
              </span>
              <span>
                <span className="block font-display font-semibold">¿Preferís WhatsApp?</span>
                <span className="text-sm text-muted">Escribime y charlamos ahora.</span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="card flex items-center gap-4 p-6 transition-colors hover:border-violet-light/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet/20 text-xl text-violet-light">
                @
              </span>
              <span>
                <span className="block font-display font-semibold">Email</span>
                <span className="break-all text-sm text-muted">{site.email}</span>
              </span>
            </a>
            <div className="card p-6">
              <p className="font-display font-semibold">Qué pasa después</p>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                {[
                  "Leo tu consulta y te respondo en menos de 24 horas hábiles.",
                  "Coordinamos una charla de 30 minutos, sin cargo.",
                  "Te envío una propuesta con alcance, plazo y precio cerrado.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-display font-bold text-cyan">{i + 1}.</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
