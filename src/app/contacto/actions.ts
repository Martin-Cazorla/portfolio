"use server";

import { Resend } from "resend";
import { getPlan, site } from "@/config/site";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; phone: string; business: string; plan: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string, max: number) => String(formData.get(k) ?? "").trim().slice(0, max);
  const values = {
    name: get("name", 80),
    email: get("email", 120),
    phone: get("phone", 40),
    business: get("business", 120),
    plan: get("plan", 20),
    message: get("message", 3000),
  };

  // Anti-spam: campo trampa que los humanos no ven + tiempo mínimo de llenado.
  const honeypot = get("website", 200);
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < 2500)) {
    return { status: "ok", message: "¡Gracias! Tu mensaje fue enviado." };
  }

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Contame tu nombre.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Revisá el email, parece incompleto.";
  if (values.message.length < 10) errors.message = "Contame un poco más (mínimo 10 caracteres).";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Revisá los campos marcados.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Kaiju Code <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contacto] Faltan RESEND_API_KEY o CONTACT_TO_EMAIL en las variables de entorno.");
    return {
      status: "error",
      message: "El formulario todavía no está configurado. Escribinos por WhatsApp y te respondemos enseguida.",
      values,
    };
  }

  const planLabel = getPlan(values.plan)?.name ?? "No sabe / quiere asesoramiento";
  const rows: [string, string][] = [
    ["Nombre", values.name],
    ["Email", values.email],
    ["WhatsApp / Teléfono", values.phone || "—"],
    ["Negocio / Rubro", values.business || "—"],
    ["Plan de interés", planLabel],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#121212">
      <h2 style="margin:0 0 12px">Nueva consulta desde ${escapeHtml(site.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#7b2cbf;font-weight:bold">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(values.message)}</p>
    </div>`;

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${values.message}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: values.email,
      subject: `Nueva consulta: ${values.name} (${planLabel})`,
      html,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[contacto] Error al enviar con Resend:", err);
    return {
      status: "error",
      message: "No pudimos enviar tu mensaje. Probá de nuevo en un rato o escribinos por WhatsApp.",
      values,
    };
  }

  return {
    status: "ok",
    message: `¡Gracias, ${values.name.split(" ")[0]}! Recibí tu consulta y te respondo en menos de 24 horas hábiles.`,
  };
}
