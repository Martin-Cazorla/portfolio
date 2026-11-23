import Image from "next/image";
import Link from "next/link";
import { nav, site, whatsappLink } from "@/config/site";

export default function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="relative border-t border-white/5 bg-night-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/brand/emblema.png" alt="" width={398} height={460} className="h-auto w-[84px]" />
            <div>
              <p className="font-display text-2xl font-bold tracking-tight">
                Kaiju <span className="text-gradient">Code</span>
              </p>
              <p className="font-serif text-sm italic text-violet-light">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-muted">{site.description}</p>
        </div>
        <div>
          <p className="eyebrow">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Hablemos</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
            <li className="pt-2 text-xs">{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name} · {site.tagline}
      </div>
    </footer>
  );
}
