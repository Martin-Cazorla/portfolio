/**
 * Configuración central del sitio.
 * Todo lo que tengas que cambiar seguido (WhatsApp, precios, redes, casos)
 * está acá, así no tenés que tocar los componentes.
 */

export const site = {
  name: "Kaiju Code",
  tagline: "Conquer the Digital World",
  description:
    "Estudio de desarrollo web Full Stack. Páginas web, tiendas online y sistemas a medida para profesionales, comercios y pymes.",
  // Se usa para metadata, Open Graph y sitemap. Definilo en NEXT_PUBLIC_SITE_URL al deployar.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Número en formato internacional, sin "+", espacios ni guiones. Ej: 5491112345678
  // TODO(Martín): reemplazar por tu número real o definir NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5490000000000",
  whatsappMessage: "¡Hola Kaiju Code! Vi su web y quiero consultar por un proyecto.",
  // TODO(Martín): tu mail público de contacto.
  email: "hola@kaijucode.dev",
  location: "Argentina · Trabajo remoto para todo LATAM",
  socials: [
    // TODO(Martín): completá tus redes. Las que tengan href vacío no se muestran.
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "https://github.com/Martin-Cazorla" },
  ],
} as const;

export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/proceso", label: "Proceso" },
  { href: "/contacto", label: "Contacto" },
] as const;

export type PlanId = "despegue" | "vidriera" | "sistemas";

export type Plan = {
  id: PlanId;
  level: string;
  name: string;
  summary: string;
  idealFor: string;
  /** TODO(Martín): poné tu precio real. Ej: "Desde USD 300" o "Desde $250.000". */
  price: string;
  delivery: string;
  features: string[];
  highlight?: string;
};

export const plans: Plan[] = [
  {
    id: "despegue",
    level: "Nivel 1",
    name: "Despegue",
    summary: "Landing page o web institucional para que te encuentren y te contacten.",
    idealFor: "Profesionales, locales y emprendedores que necesitan estar online ya.",
    price: "Desde $XXX",
    delivery: "Entrega en 7 a 10 días",
    features: [
      "Diseño a medida, rápido y pensado para celular",
      "Hasta 5 secciones con textos orientados a vender",
      "Botón de WhatsApp y formulario de contacto",
      "SEO básico para aparecer en Google",
      "Dominio, hosting y certificado SSL configurados",
    ],
  },
  {
    id: "vidriera",
    level: "Nivel 2",
    name: "Vidriera",
    summary: "E-commerce o catálogo autoadministrable para vender las 24 horas.",
    idealFor: "Comercios que hoy venden por Instagram o WhatsApp y quieren escalar.",
    price: "Desde $XXX",
    delivery: "Entrega en 3 a 5 semanas",
    features: [
      "Catálogo con categorías, filtros y buscador",
      "Panel para cargar productos, precios y stock vos mismo",
      "Carrito y pagos online (Mercado Pago y otros)",
      "Pedidos que llegan ordenados, no perdidos en el chat",
      "Capacitación para que lo manejes sin depender de nadie",
    ],
  },
  {
    id: "sistemas",
    level: "Nivel 3",
    name: "Sistemas a medida",
    summary: "Software web hecho para cómo trabaja tu empresa, no al revés.",
    idealFor: "Pymes que hoy manejan todo en papel, Excel o diez apps sueltas.",
    price: "Desde $XXX",
    delivery: "Entrega por etapas, desde 6 semanas",
    features: [
      "Turneros, CRMs, paneles de control o gestión de inventario",
      "Usuarios y permisos para todo tu equipo",
      "Reportes y métricas en tiempo real",
      "Integraciones con WhatsApp, pagos, facturación o tus herramientas",
      "Soporte y mejoras continuas después del lanzamiento",
    ],
    highlight: "Nuestro diferencial",
  },
];

export function getPlan(id: string | undefined | null) {
  return plans.find((p) => p.id === id);
}

/**
 * Casos y testimonios. Mientras esté vacío, el sitio muestra una invitación
 * a ser de los primeros proyectos en lugar de testimonios inventados.
 */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project?: string;
  href?: string;
};

export const testimonials: Testimonial[] = [
  // {
  //   quote: "Pasamos de anotar turnos en un cuaderno a tener la agenda llena y ordenada.",
  //   author: "Nombre Apellido",
  //   role: "Dueña de Centro Estético X",
  //   project: "Turnero online",
  //   href: "https://...",
  // },
];

/** Bloque "Quién está detrás". La foto va en /public/brand/fundador.jpg (ver README). */
export const founder = {
  name: "Martín Cazorla",
  role: "Fundador y desarrollador Full Stack",
  // TODO(Martín): cuando tengas la foto, guardala como public/brand/fundador.jpg y poné photo: "/brand/fundador.jpg".
  photo: null as string | null,
  bio: [
    "Detrás de Kaiju Code hay un desarrollador Full Stack que se ocupa de todo el proyecto: desde entender tu negocio hasta poner el sistema en producción.",
    "Sin intermediarios ni pases de mano: hablás directo con quien escribe el código, y eso se nota en los tiempos y en el resultado.",
  ],
};
