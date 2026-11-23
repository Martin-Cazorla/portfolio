"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePersistentState } from "./usePersistentState";
import { TriangleAlert } from "lucide-react";

type Product = { id: string; name: string; category: string; stock: number; min: number; price: number };
type Movement = { id: string; at: number; product: string; delta: number };

const INITIAL: Product[] = [
  { id: "p1", name: "Yerba mate 1 kg", category: "Almacén", stock: 42, min: 15, price: 4200 },
  { id: "p2", name: "Café molido 500 g", category: "Almacén", stock: 8, min: 10, price: 6900 },
  { id: "p3", name: "Aceite de girasol 1,5 L", category: "Almacén", stock: 25, min: 12, price: 3100 },
  { id: "p4", name: "Agua mineral 2 L", category: "Bebidas", stock: 60, min: 24, price: 1200 },
  { id: "p5", name: "Gaseosa cola 2,25 L", category: "Bebidas", stock: 14, min: 18, price: 2800 },
  { id: "p6", name: "Detergente 750 ml", category: "Limpieza", stock: 19, min: 8, price: 2200 },
  { id: "p7", name: "Lavandina 2 L", category: "Limpieza", stock: 3, min: 6, price: 1500 },
];

const ars = (n: number) => n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function StockDemo() {
  const [products, setProducts] = usePersistentState<Product[]>("kaiju-demo-stock", INITIAL);
  const [moves, setMoves] = usePersistentState<Movement[]>("kaiju-demo-movs", []);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const [onlyLow, setOnlyLow] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Almacén", stock: "", min: "", price: "" });
  const [showForm, setShowForm] = useState(false);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const visible = products.filter(
    (p) =>
      (cat === "Todas" || p.category === cat) &&
      (!onlyLow || p.stock <= p.min) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const lowCount = products.filter((p) => p.stock <= p.min).length;
  const units = products.reduce((a, p) => a + p.stock, 0);
  const value = products.reduce((a, p) => a + p.stock * p.price, 0);

  const adjust = (p: Product, delta: number) => {
    if (p.stock + delta < 0) return;
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, stock: x.stock + delta } : x)));
    setMoves((prev) => [{ id: crypto.randomUUID(), at: Date.now(), product: p.name, delta }, ...prev].slice(0, 8));
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = Number(form.stock);
    const min = Number(form.min);
    const price = Number(form.price);
    if (!form.name.trim() || [stock, min, price].some((n) => !Number.isFinite(n) || n < 0)) return;
    const p: Product = {
      id: crypto.randomUUID(),
      name: form.name.trim().slice(0, 40),
      category: form.category.trim() || "General",
      stock,
      min,
      price,
    };
    setProducts((prev) => [p, ...prev]);
    setMoves((prev) => [{ id: crypto.randomUUID(), at: Date.now(), product: p.name, delta: stock }, ...prev].slice(0, 8));
    setForm({ name: "", category: form.category, stock: "", min: "", price: "" });
    setShowForm(false);
  };

  const reset = () => {
    setProducts(INITIAL);
    setMoves([]);
    setQuery("");
    setCat("Todas");
    setOnlyLow(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-night p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Productos" value={products.length} />
        <Kpi label="Unidades en stock" value={units} />
        <Kpi label="Valor del inventario" value={ars(value)} />
        <Kpi label="Alertas de reposición" value={lowCount} alert={lowCount > 0} />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="stock-buscar" className="sr-only">
          Buscar producto
        </label>
        <input
          id="stock-buscar"
          className="field sm:max-w-xs"
          placeholder="Buscar producto…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                cat === c ? "bg-violet text-white" : "bg-white/5 text-muted hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOnlyLow((v) => !v)}
            aria-pressed={onlyLow}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
              onlyLow ? "bg-amber-400 text-night" : "bg-white/5 text-amber-300 hover:bg-white/10"
            }`}
          >
            <TriangleAlert className="h-3.5 w-3.5" aria-hidden />
            Stock bajo
          </button>
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <button type="button" className="btn btn-ghost !py-2 text-sm" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cerrar" : "+ Producto"}
          </button>
          <button type="button" className="rounded-full px-3 text-xs text-muted hover:text-white" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={add}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-2 rounded-xl border border-cyan/20 bg-cyan/[0.04] p-3 sm:grid-cols-6">
              <input
                className="field sm:col-span-2"
                placeholder="Nombre"
                aria-label="Nombre del producto"
                required
                maxLength={40}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="field"
                placeholder="Categoría"
                aria-label="Categoría"
                maxLength={20}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                className="field"
                type="number"
                min={0}
                placeholder="Stock"
                aria-label="Stock inicial"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              <input
                className="field"
                type="number"
                min={0}
                placeholder="Mínimo"
                aria-label="Stock mínimo"
                required
                value={form.min}
                onChange={(e) => setForm({ ...form, min: e.target.value })}
              />
              <input
                className="field"
                type="number"
                min={0}
                placeholder="Precio"
                aria-label="Precio unitario"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <button type="submit" className="btn btn-primary sm:col-span-6">
                Guardar producto
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs text-muted">
              <tr>
                <th className="px-3 py-2.5 font-medium">Producto</th>
                <th className="px-3 py-2.5 font-medium">Precio</th>
                <th className="px-3 py-2.5 font-medium">Nivel</th>
                <th className="px-3 py-2.5 text-center font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {visible.map((p) => {
                  const low = p.stock <= p.min;
                  const pct = Math.min(100, (p.stock / Math.max(p.min * 3, 1)) * 100);
                  return (
                    <motion.tr
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <td className="px-3 py-2.5">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted">
                          {p.category} · mín. {p.min}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 tabular-nums text-muted">{ars(p.price)}</td>
                      <td className="px-3 py-2.5">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className={`h-full ${low ? "bg-amber-400" : "bg-gradient-to-r from-violet-light to-cyan"}`}
                            animate={{ width: `${pct}%` }}
                          />
                        </div>
                        {low && <p className="mt-1 text-[11px] text-amber-300">Reponer</p>}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => adjust(p, -1)}
                            disabled={p.stock === 0}
                            className="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10 disabled:opacity-30"
                            aria-label={`Registrar venta de ${p.name}`}
                          >
                            −
                          </button>
                          <span
                            className={`w-9 text-center font-display font-bold tabular-nums ${low ? "text-amber-300" : ""}`}
                          >
                            {p.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => adjust(p, 1)}
                            className="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10"
                            aria-label={`Registrar ingreso de ${p.name}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {visible.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center text-muted">
                    No hay productos que coincidan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <p className="text-xs uppercase tracking-wider text-muted">Últimos movimientos</p>
          <ul className="mt-3 space-y-2 text-sm">
            <AnimatePresence initial={false}>
              {moves.map((m) => (
                <motion.li
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="truncate">{m.product}</span>
                  <span className={`tabular-nums font-semibold ${m.delta > 0 ? "text-cyan" : "text-violet-light"}`}>
                    {m.delta > 0 ? `+${m.delta}` : m.delta}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
            {moves.length === 0 && (
              <li className="text-muted">Tocá + o − en un producto para registrar ingresos y ventas.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, alert }: { label: string; value: string | number; alert?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 ${alert ? "border-amber-400/30 bg-amber-400/[0.06]" : "border-white/5 bg-white/[0.02]"}`}
    >
      <p className={`font-display text-lg font-bold tabular-nums sm:text-xl ${alert ? "text-amber-300" : ""}`}>{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
