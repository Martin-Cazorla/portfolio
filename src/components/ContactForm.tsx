"use client";

import { useActionState, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendContact, type ContactState } from "@/app/contacto/actions";
import { plans, whatsappLink } from "@/config/site";
import { Check } from "lucide-react";

const options = [
  ...plans.map((p) => ({ id: p.id, title: p.name, sub: `${p.level} · ${p.delivery.replace("Entrega ", "")}` })),
  { id: "no-se", title: "No estoy seguro", sub: "Quiero que me asesores" },
];

export default function ContactForm({ initialPlan }: { initialPlan?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [plan, setPlan] = useState(initialPlan && options.some((o) => o.id === initialPlan) ? initialPlan : "no-se");
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => setStartedAt(Date.now()), []);
  useEffect(() => {
    if (state.values?.plan) setPlan(state.values.plan);
  }, [state.values?.plan]);

  if (state.status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card flex flex-col items-center p-10 text-center"
        role="status"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan/15 text-cyan shadow-[0_0_40px_-8px_var(--color-cyan)]">
          <Check className="h-8 w-8" aria-hidden />
        </div>
        <p className="mt-6 font-display text-2xl font-bold">Mensaje enviado</p>
        <p className="mt-3 max-w-md text-muted">{state.message}</p>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
          ¿Apurado? Escribime por WhatsApp
        </a>
      </motion.div>
    );
  }

  const v = state.values;
  const err = state.errors ?? {};

  return (
    <form action={action} className="card space-y-6 p-6 sm:p-8" noValidate>
      <fieldset>
        <legend className="text-sm font-semibold">¿Qué te interesa?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {options.map((o) => {
            const active = plan === o.id;
            return (
              <label
                key={o.id}
                className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
                  active
                    ? "border-violet-light bg-violet/20 shadow-[0_0_30px_-12px_var(--color-violet-light)]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={o.id}
                  checked={active}
                  onChange={() => setPlan(o.id)}
                  className="sr-only"
                />
                <span className="block font-display font-semibold">{o.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{o.sub}</span>
                {active && (
                  <motion.span
                    layoutId="plan-check"
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-night"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </motion.span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" error={err.name}>
          <input
            id="name"
            name="name"
            className="field"
            autoComplete="name"
            required
            defaultValue={v?.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="Email" name="email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            required
            defaultValue={v?.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
          />
        </Field>
        <Field label="WhatsApp (opcional)" name="phone">
          <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" defaultValue={v?.phone} />
        </Field>
        <Field label="Negocio o rubro (opcional)" name="business">
          <input
            id="business"
            name="business"
            className="field"
            placeholder="Ej: veterinaria, ferretería…"
            defaultValue={v?.business}
          />
        </Field>
      </div>

      <Field label="Contame tu proyecto" name="message" error={err.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field resize-y"
          placeholder="¿Qué hace tu negocio? ¿Qué te gustaría resolver o mejorar?"
          required
          defaultValue={v?.message}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
        />
      </Field>

      {/* Anti-spam */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enviando…
            </>
          ) : (
            "Enviar consulta"
          )}
        </button>
        <p className="text-xs text-muted">Te respondo en menos de 24 horas hábiles. Sin spam, prometido.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
