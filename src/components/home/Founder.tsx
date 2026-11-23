import Image from "next/image";
import { founder } from "@/config/site";
import Reveal from "@/components/Reveal";

export default function Founder() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative mx-auto w-60 sm:w-72">
          <div className="absolute inset-0 animate-glow rounded-[2rem] bg-gradient-to-br from-violet/60 to-cyan/30 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-night-3">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="(min-width: 768px) 288px, 240px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-muted">
                <Image src="/brand/isotipo.png" alt="" width={96} height={96} className="opacity-70" />
                <span className="text-xs">Foto de perfil próximamente</span>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Quién está detrás</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Hola, soy <span className="text-gradient">{founder.name.split(" ")[0]}</span>.
          </h2>
          <p className="mt-2 text-sm text-cyan">{founder.role}</p>
          <div className="mt-6 space-y-4 text-muted">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
