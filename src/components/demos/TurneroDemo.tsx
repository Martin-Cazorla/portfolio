"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePersistentState } from "./usePersistentState";

type Booking = { id: string; date: string; time: string; name: string; service: string; mine?: boolean };

const services = [
  { id: "consulta", label: "Consulta", minutes: 30 },
  { id: "control", label: "Control", minutes: 30 },
  { id: "primera-vez", label: "Primera vez", minutes: 30 },
];

const SLOTS = (() => {
  const out: string[] = [];
  for (let h = 9; h < 18; h++) {
    if (h === 13) continue; // almuerzo
    out.push(`${String(h).padStart(2, "0")}:00`, `${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

const SAMPLE_NAMES = ["Lucía G.", "Marcos P.", "Sofía R.", "Diego F.", "Valentina M.", "Juan C.", "Carla T.", "Nicolás B."];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Turnos "ya tomados" de ejemplo, siempre iguales para la misma fecha. */
function seeded(date: string): Booking[] {
  let seed = [...date].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0;
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) % 1000) / 1000;
  return SLOTS.filter(() => rand() < 0.32).map((time, i) => ({
    id: `s-${date}-${time}`,
    date,
    time,
    name: SAMPLE_NAMES[Math.floor(rand() * SAMPLE_NAMES.length)],
    service: services[i % services.length].label,
  }));
}

export default function TurneroDemo() {
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [service, setService] = useState(services[0].id);
  const [name, setName] = useState("");
  const [mine, setMine] = usePersistentState<Booking[]>("kaiju-demo-turnos", []);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const list: Date[] = [];
    const d = new Date();
    // Si ya pasó el último horario del día, arrancamos desde mañana.
    if (d.getHours() * 60 + d.getMinutes() >= 17 * 60 + 30) d.setDate(d.getDate() + 1);
    while (list.length < 6) {
      if (d.getDay() !== 0) list.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    setDays(list);
    setSelectedDate(iso(list[0]));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const dayBookings = useMemo(() => {
    if (!selectedDate) return [];
    return [...seeded(selectedDate), ...mine.filter((b) => b.date === selectedDate)].sort((a, b) =>
      a.time.localeCompare(b.time),
    );
  }, [selectedDate, mine]);

  const taken = new Set(dayBookings.map((b) => b.time));
  const now = new Date();
  const isToday = selectedDate === iso(now);
  const isPast = (time: string) => {
    if (!isToday) return false;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes();
  };
  const free = SLOTS.filter((s) => !taken.has(s) && !isPast(s)).length;
  const occupancy = Math.round((dayBookings.length / SLOTS.length) * 100);

  const book = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !name.trim()) return;
    const svc = services.find((s) => s.id === service)!;
    setMine((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: selectedDate,
        time: selectedTime,
        name: name.trim().slice(0, 40),
        service: svc.label,
        mine: true,
      },
    ]);
    setToast(`Turno confirmado: ${selectedTime} hs. Te llegaría un recordatorio por WhatsApp.`);
    setSelectedTime(null);
    setName("");
  };

  const cancel = (id: string) => setMine((prev) => prev.filter((b) => b.id !== id));

  const fmtDay = (d: Date) => ({
    dow: d.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", ""),
    num: d.getDate(),
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Vista del cliente */}
      <div className="rounded-2xl border border-white/10 bg-night p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold">Reservá tu turno</p>
          <span className="rounded-full bg-cyan/10 px-2.5 py-1 text-[11px] text-cyan">Vista del cliente</span>
        </div>

        <label className="mt-5 block text-xs text-muted" htmlFor="turnero-servicio">
          Servicio
        </label>
        <select
          id="turnero-servicio"
          className="field mt-1.5"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {services.map((s) => (
            <option key={s.id} value={s.id} className="bg-night">
              {s.label} ({s.minutes} min)
            </option>
          ))}
        </select>

        <p className="mt-5 text-xs text-muted">Día</p>
        <div className="mt-1.5 grid grid-cols-6 gap-2" role="radiogroup" aria-label="Elegí el día">
          {days.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5" />)
            : days.map((d) => {
                const id = iso(d);
                const { dow, num } = fmtDay(d);
                const active = id === selectedDate;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setSelectedDate(id);
                      setSelectedTime(null);
                    }}
                    className={`flex h-16 flex-col items-center justify-center rounded-xl border text-sm transition-colors ${
                      active
                        ? "border-violet-light bg-violet/30 text-white"
                        : "border-white/10 text-muted hover:border-white/25"
                    }`}
                  >
                    <span className="text-[11px] capitalize">{dow}</span>
                    <span className="font-display text-lg font-bold">{num}</span>
                  </button>
                );
              })}
        </div>

        <p className="mt-5 text-xs text-muted">
          Horario <span className="text-cyan">· {free} disponibles</span>
        </p>
        <div className="mt-1.5 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {SLOTS.map((s) => {
            const disabled = taken.has(s) || isPast(s);
            const active = s === selectedTime;
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedTime(s)}
                aria-pressed={active}
                className={`rounded-lg border py-2 text-xs transition-all ${
                  disabled
                    ? "cursor-not-allowed border-transparent bg-white/[0.02] text-white/20 line-through"
                    : active
                      ? "border-cyan bg-cyan/15 text-cyan shadow-[0_0_16px_-4px_var(--color-cyan)]"
                      : "border-white/10 hover:border-cyan/50"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <form onSubmit={book} className="mt-5 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="turnero-nombre" className="sr-only">
            Tu nombre
          </label>
          <input
            id="turnero-nombre"
            className="field"
            placeholder="Tu nombre"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            disabled={!selectedTime || !name.trim()}
            className="btn btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {selectedTime ? `Confirmar ${selectedTime}` : "Elegí un horario"}
          </button>
        </form>

        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan"
            >
              ✓ {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Vista del negocio */}
      <div className="rounded-2xl border border-white/10 bg-night-3/60 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold">Agenda del día</p>
          <span className="rounded-full bg-violet/30 px-2.5 py-1 text-[11px] text-violet-light">Vista del negocio</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="Turnos" value={dayBookings.length} />
          <Stat label="Libres" value={free} />
          <Stat label="Ocupación" value={`${occupancy}%`} />
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-light to-cyan"
            animate={{ width: `${occupancy}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <ul className="mt-5 max-h-[340px] space-y-2 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {dayBookings.map((b) => (
              <motion.li
                key={b.id}
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                  b.mine ? "border-cyan/40 bg-cyan/[0.07]" : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <span className="font-display font-semibold tabular-nums text-violet-light">{b.time}</span>
                <span className="flex-1 truncate">
                  {b.name}
                  <span className="text-muted"> · {b.service}</span>
                </span>
                {b.mine ? (
                  <button
                    type="button"
                    onClick={() => cancel(b.id)}
                    className="rounded-md px-2 py-1 text-xs text-muted hover:bg-white/5 hover:text-white"
                    aria-label={`Cancelar turno de ${b.name} a las ${b.time}`}
                  >
                    Cancelar
                  </button>
                ) : (
                  <span className="text-[11px] text-muted">Confirmado</span>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
          {dayBookings.length === 0 && <li className="py-8 text-center text-sm text-muted">Sin turnos para este día.</li>}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/[0.03] px-2 py-3">
      <p className="font-display text-xl font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
