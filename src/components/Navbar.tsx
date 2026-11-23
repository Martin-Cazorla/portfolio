"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/5 bg-night/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, inicio`}>
          <Image
            src="/brand/isotipo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            Kaiju <span className="text-gradient">Code</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-violet-light/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contacto" className="btn btn-primary hidden !py-2 text-sm md:inline-flex">
          Pedir presupuesto
        </Link>

        <button
          type="button"
          className="relative h-10 w-10 rounded-lg md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2.5 h-0.5 w-5 bg-white transition-all ${open ? "top-[19px] rotate-45" : "top-[14px]"}`}
          />
          <span
            className={`absolute left-2.5 top-[19px] h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-2.5 h-0.5 w-5 bg-white transition-all ${open ? "top-[19px] -rotate-45" : "top-[24px]"}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-1 px-4 pb-6 pt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-base ${
                      isActive(item.href) ? "bg-white/[0.07] text-white" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contacto" className="btn btn-primary w-full">
                  Pedir presupuesto
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
