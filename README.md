# Kaiju Code · Sitio oficial

Web comercial de **Kaiju Code**, estudio de desarrollo web Full Stack.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Resend.

## Páginas

| Ruta          | Qué tiene                                                                       |
| ------------- | ------------------------------------------------------------------------------- |
| `/`           | Hero, problemas que resolvés, los 3 planes, demos, casos/testimonios, fundador |
| `/soluciones` | Demos en vivo: **Turnero online** y **Gestión de stock** (guardan en el navegador) |
| `/proceso`    | Las 4 etapas de trabajo y preguntas frecuentes                                  |
| `/contacto`   | Formulario que envía mail de verdad. `?plan=despegue\|vidriera\|sistemas` lo preselecciona |

## Arrancar en local

```bash
npm install
cp .env.example .env.local   # completá los valores
npm run dev                  # http://localhost:3000
```

## Qué tenés que editar

Casi todo está en **`src/config/site.ts`**:

- `whatsappNumber` (o la variable `NEXT_PUBLIC_WHATSAPP_NUMBER`): tu número en formato `5491112345678`.
- `email` y `socials`: tu mail público y tus redes (las que queden vacías no se muestran).
- `plans[].price`: hoy dice `Desde $XXX`. Poné tus precios reales (ej. `Desde USD 300`).
- `plans[].delivery` y `features`: plazos y qué incluye cada plan.
- `testimonials`: mientras esté vacío se muestra una invitación a ser de los primeros clientes. Cuando tengas casos, agregalos ahí.
- `founder.photo`: guardá tu foto como `public/brand/fundador.jpg` y poné `photo: "/brand/fundador.jpg"`.

Los colores están en `src/app/globals.css` (bloque `@theme`).

Logos en `public/brand/` (fondo quitado de los PNG originales). Íconos e imagen para redes en `src/app/` (`icon.png`, `apple-icon.png`, `opengraph-image.png`).

## Formulario de contacto (Resend)

1. Creá una cuenta gratis en [resend.com](https://resend.com) y generá una API key.
2. Definí estas variables (en `.env.local` y en Vercel → Settings → Environment Variables):

   | Variable                      | Ejemplo                               |
   | ----------------------------- | ------------------------------------- |
   | `RESEND_API_KEY`              | `re_...`                              |
   | `CONTACT_TO_EMAIL`            | `tu-mail@gmail.com`                   |
   | `CONTACT_FROM_EMAIL`          | `Kaiju Code <hola@kaijucode.com>`     |
   | `NEXT_PUBLIC_SITE_URL`        | `https://kaijucode.com`               |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5491112345678`                       |

3. Sin dominio propio podés usar `onboarding@resend.dev` como remitente, pero Resend solo te deja enviar a tu propio mail de la cuenta. Cuando tengas dominio, verificalo en Resend y usá un remitente de ese dominio.

Si faltan las variables, el formulario no se rompe: le muestra al visitante que escriba por WhatsApp.

## Deploy en Vercel

1. Importá el repo en [vercel.com/new](https://vercel.com/new) (detecta Next.js solo).
2. Cargá las variables de entorno de arriba.
3. Deploy. Cuando tengas dominio, agregalo en Vercel y actualizá `NEXT_PUBLIC_SITE_URL`.
