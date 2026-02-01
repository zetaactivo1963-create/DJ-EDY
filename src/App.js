import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Music2,
  Lightbulb,
  Sparkles,
  Mic2,
  Camera,
  Video,
  Headphones,
  Phone as PhoneIcon,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Images,
  Building2,
  Star,
  Check,
  MapPin,
  ArrowLeft,
  Package,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

/* =========================
   CONFIGURACIÓN / CONSTANTES
   ========================= */

/* Teléfono para WhatsApp: sin + ni espacios. Ej: "17873568786" */
const WHATSAPP_NUMBER = "17873568786";
/* Email de contacto */
const CONTACT_EMAIL = "djedypr@gmail.com";

/* Rutas de logos (en /public). Coloca tus archivos ahí */
const PRIMARY_LOGO = "/4toDisenoLogo.png"; // tu logo blanco
const FALLBACK_LOGO = "/WhitelogoDjEdyNew.png"; // opcional de respaldo

/* Utilidades estilo (clases tipo Tailwind) */
const neonRing = "ring-1 ring-offset-0 ring-white/10";
const glass = "backdrop-blur-md bg-white/5 border border-white/10";
const sectionPad = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* Servicios (para la grilla del Home) */
// -- reemplaza tu const services = [...] por este:
const services = [
  {
    icon: Music2,
    title: "DJ SetUps / Montajes de DJ",
    slug: "montajes-dj",
    desc: "Cabinas elegantes, booths iluminados y diseño limpio con branding opcional.",
  },
  {
    icon: Headphones,
    title: "Sonido profesional",
    slug: "sonido-profesional",
    desc: "PA nítido según aforo, calibración del venue, micrófonos inalámbricos.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación",
    slug: "iluminacion",
    desc: "Arquitectónica, cabezales móviles, barras LED, gobos y escenas por control.",
  },
  {
    icon: Sparkles,
    title: "Pistas de baile",
    slug: "pistas-de-baile",
    desc: "Clásicas, espejo o pista LED. Instalación segura y acabados premium.",
  },
  {
    icon: Camera,
    title: "Photo Booths",
    slug: "photo-booths",
    desc: "360°, espejo o glam booth. Entrega digital y/o impresiones.",
  },
  {
    icon: Mic2,
    title: "Animación & MC",
    slug: "animacion-mc",
    desc: "Conducción dinámica, protocolos y manejo de agenda.",
  },
  {
    icon: Building2,
    title: "Coordinación",
    slug: "coordinacion",
    desc: "Timeline, protocolo de boda/prom y manejo con suplidores y venue.",
  },
  {
    icon: Sparkles,
    title: "Efectos especiales",
    slug: "efectos-especiales",
    desc: "Chispas frías, humo bajo, CO₂, confeti (según permisos del venue).",
  },
  {
    icon: Video,
    title: "Foto & Video",
    slug: "foto-video",
    desc: "Cobertura de ceremonia, cóctel y recepción. Highlight edits.",
  },
];

// ======= Montajes de DJ (3 opciones) =======
const djSetups = [
  {
    id: "sencillo",
    name: "Montaje Sencillo",
    media: "/montajeSencillo.jpg", // 👈 pon el archivo en /public o cambia la ruta
    features: [
      "Pantalla TV 32”",
      "Karaoke / Just Dance",
      "1 micrófono inalámbrico",
      "DJ Booth iluminado",
      "2 luces Party 5 en 1",
      "Mixeo de música en vivo",
      "4 horas",
    ],
  },
  {
    id: "mediano",
    name: "Montaje Mediano",
    media: "/montajeMediano.jpg",
    features: [
      "Pantalla gigante 100”",
      "Karaoke / Just Dance",
      "2 micrófonos inalámbricos",
      "DJ Booth iluminado",
      "2 trussing iluminados",
      "2 luces Moving Heads",
      "Máquina de humo o haze",
      "Mixeo de música en vivo",
      "5 horas",
    ],
  },
  {
    id: "premium",
    name: "Montaje Premium",
    media: "/montajePremium.jpg",
    features: [
      "2 pantallas TV 55”",
      "Karaoke / Just Dance",
      "2 micrófonos inalámbricos",
      "DJ Booth iluminado",
      "2 trussing iluminados",
      "2 luces Moving Heads",
      "Máquina de humo o haze",
      "Mixeo de música en vivo",
      "Sonido para ceremonia o cóctel",
      "5 horas + 1 hr de ceremonia o cóctel",
    ],
  },
];

/* Paquetes (la “pantalla” de #paquetes) */
const packages = [
  {
    name: "Silver",
    tagline: "Ideal para eventos íntimos",
    features: [
      "DJ hasta 4 horas",
      "Sonido compacto ~100 invitados",
      "Luces ambiente básicas",
      "1 micrófono inalámbrico",
      "Coordinación musical básica",
    ],
  },
  {
    name: "Gold",
    tagline: "El balance perfecto",
    features: [
      "DJ hasta 5 horas",
      "Sonido reforzado",
      "Iluminación inteligente (escenas)",
      "2 micrófonos inalámbricos",
      "MC/Animación",
      "1 efecto especial (sujeto a venue)",
    ],
  },
  {
    name: "Platinum",
    tagline: "Producción completa",
    features: [
      "DJ hasta 6 horas",
      "Sonido premium para salones grandes",
      "Iluminación integral (móviles, LED, gobos)",
      "Pista LED o pista premium",
      "LED wall / pantalla para visuales",
      "MC/Animación + coordinación de agenda",
      "Efectos combinados (según venue)",
    ],
  },
];

/* Opciones de “eventos” (cards de sugerencias) */
const eventOptions = [
  {
    key: "boda",
    label: "Bodas",
    suggestions: [
      "Ceremonia con micro discreto",
      "Cóctel elegante",
      "Recepción DJ+MC",
      "Iluminación cálida",
      "Chispas frías primer baile",
      "Pista LED (opcional)",
    ],
    bundle: "Gold + pista premium + humo bajo",
  },
  {
    key: "prom",
    label: "Proms",
    suggestions: [
      "DJ con visuales",
      "Iluminación dinámica",
      "Cabina 360°",
      "CO₂ y confeti (si aplica)",
    ],
    bundle: "Platinum con LED wall + 360°",
  },
  {
    key: "cumple",
    label: "Cumpleaños",
    suggestions: [
      "DJ versátil",
      "Luces ambiente",
      "Photobooth",
      "Playlist por décadas/estilos",
    ],
    bundle: "Silver + photobooth",
  },
  {
    key: "corp",
    label: "Corporativos",
    suggestions: [
      "Montaje sobrio",
      "Sonido para speeches",
      "Micros mano/solapa",
      "Pantallas",
      "Música de ambiente",
    ],
    bundle: "Gold sin efectos + branding en visuales",
  },
  {
    key: "quince",
    label: "Quinceañeros",
    suggestions: [
      "Entrada temática",
      "Visuales personalizados",
      "Iluminación por escenas",
      "Pista LED",
      "Cabina 360°",
    ],
    bundle: "Gold + pista LED + 360°",
  },
];

const galleryPlaceholders = [
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "video", ratio: "aspect-video" },
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "video", ratio: "aspect-video" },
  { type: "foto", ratio: "aspect-[4/5]" },
];

/* ==============
   HELPERS / UI
   ============== */
function useScrollVariants(delay = 0) {
  // --- Mini router: hash (#home, #testimonios, ...) ---
  function useHash(defaultHash = "#home") {
    const [hash, setHash] = useState(window.location.hash || defaultHash);
    useEffect(() => {
      const onHash = () => setHash(window.location.hash || defaultHash);
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }, [defaultHash]);
    return hash;
  }

  // --- Mini router: pathname (/servicio/:slug) ---
  function usePath() {
    const [path, setPath] = useState(window.location.pathname);
    useEffect(() => {
      const onPop = () => setPath(window.location.pathname);
      window.addEventListener("popstate", onPop);
      return () => window.removeEventListener("popstate", onPop);
    }, []);
    return path;
  }

  return useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay },
      },
    }),
    [delay]
  );
}

// Lee y escucha el hash de la URL (#home, #paquetes, #cotizar, etc.)
function useHash(defaultHash = "#home") {
  const [hash, setHash] = useState(window.location.hash || defaultHash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || defaultHash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultHash]);

  return hash;
}

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`${sectionPad} ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

/* =========
   NAVBAR
   ========= */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showServicios, setShowServicios] = useState(false);

  // Navegación SPA a /servicio/:slug sin recargar
  const gotoService = (slug, e) => {
    e?.preventDefault?.();
    window.history.pushState({}, "", `/servicio/${slug}`);
    window.dispatchEvent(new Event("popstate"));
    setOpen(false);
  };
  const [openServices, setOpenServices] = useState(false);

  return (
    <div className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className={`${container} flex items-center justify-between py-4`}>
        <a
          href="#home"
          aria-label="Ir al inicio"
          className="flex items-center gap-3 group"
        >
          <img
            src={PRIMARY_LOGO}
            alt="DJ EDY"
            className="h-16 md:h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,.15)]"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_LOGO;
            }}
          />
          <span className="sr-only">DJ EDY</span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>

          {/* Servicios con dropdown (hover) */}
          <div
            className="relative"
            onMouseEnter={() => setShowServicios(true)}
            onMouseLeave={() => setShowServicios(false)}
            onFocus={() => setShowServicios(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setShowServicios(false);
            }}
          >
            <button
              type="button"
              className="hover:text-white inline-flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={showServicios ? "true" : "false"}
            >
              Servicios
              <ChevronDown className="w-4 h-4" />
            </button>

            {showServicios && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[min(90vw,720px)] z-50">
                <div className="pt-2">
                  <div className="rounded-2xl bg-black/90 border border-white/10 shadow-2xl p-3">
                    <div className="grid grid-cols-2 gap-1">
                      {/* Paquetes (tamaño regular, resaltado con borde) */}
                      <a
                        href="#paquetes"
                        onClick={() => setShowServicios(false)}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 border border-white/30"
                      >
                        <Package className="w-5 h-5 text-white/90" />
                        <div className="min-w-0">
                          <div className="text-sm text-white font-medium">
                            Paquetes
                          </div>
                          <div className="text-xs text-zinc-400 line-clamp-2">
                            Incluye 'DJ SetUp' más otros servicios.
                          </div>
                        </div>
                      </a>

                      {/* Resto de servicios */}
                      {services.map((s) => (
                        <a
                          key={s.slug || s.title}
                          href={s.slug ? `#servicio/${s.slug}` : "#servicios"}
                          onClick={(e) => {
                            if (s.slug) {
                              e.preventDefault();
                              window.location.hash = `#servicio/${s.slug}`;
                            }
                            setShowServicios(false);
                          }}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/10"
                        >
                          <s.icon className="w-5 h-5 text-white/90 shrink-0" />
                          <div className="min-w-0">
                            <div className="text-sm text-white">{s.title}</div>
                            <div className="text-xs text-zinc-400 line-clamp-2">
                              {s.desc}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#galeria" className="hover:text-white transition-colors">
            Galería
          </a>
          <a href="#testimonios" className="hover:text-white transition-colors">
            Testimonios
          </a>
          <a href="#contacto" className="hover:text-white transition-colors">
            Contacto
          </a>

          {/* CTA: Cotizar (solo botón) */}
          <a
            href="#cotizar"
            className="ml-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Cotizar ahora
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/10 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span>≡</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`${container} md:hidden pb-4`}>
          <div className="grid gap-2 p-3 rounded-2xl bg-black border border-white/10">
            <a
              href="#home"
              className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Home
            </a>

            <div className="px-3 pt-1 text-zinc-400">Servicios</div>
            <div className="grid gap-1">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`/servicio/${s.slug}`}
                  onClick={(e) => gotoService(s.slug, e)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-200"
                >
                  {s.title}
                </a>
              ))}
            </div>

            <a
              href="#galeria"
              className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Galería
            </a>
            <a
              href="#testimonios"
              className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Lo que dicen nuestros clientes
            </a>
            <a
              href="#contacto"
              className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Contacto
            </a>

            <a
              href="#cotizar"
              className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              Cotizar ahora
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====
   HERO
   ===== */
function Hero() {
  const variants = useScrollVariants(0.05);
  return (
    <Section id="home" className="pt-36 pb-24 md:pt-40 md:pb-28">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={variants}
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Professional DJ & Equipment for Your Event{" "}
          </h1>
          <p className="mt-5 text-lg text-zinc-300 max-w-xl">
            DJ en vivo, sonido e iluminación profesional en todo Puerto Rico.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="#cotizar"
              className="rounded-full px-5 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
            >
              Cotizar ahora
            </a>
            <a
              href="#paquetes"
              className={`${neonRing} rounded-full px-5 py-3 text-white hover:bg-white/5 transition-colors`}
            >
              Ver paquetes
            </a>
          </div>

          <div className="mt-8 text-sm text-zinc-400">
            Bodas · Quinceañeros · Proms · Cumpleaños · Corporativos · Todo tipo
            de evento
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {/* Media wrapper */}
          <div className={`relative rounded-3xl overflow-hidden ${neonRing}`}>
            {/* Overlay de color muy sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-fuchsia-500/10 to-cyan-400/10" />
            {/* Video hero */}
            <video
              className="w-full h-full object-cover aspect-video"
              autoPlay
              muted
              playsInline
              loop
              poster="/1.png"
            >
              <source src="/montajePremium.webm" type="video/webm" />
              {/* Si subes MP4, descomenta: */}
              {/* <source src="/hero.mp4" type="video/mp4" /> */}
              Tu navegador no soporta video HTML5.
            </video>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Video real de montaje (6–10 s, loop, sin audio).
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ==========
   SERVICIOS
   ========== */
function Services() {
  return (
    <Section id="servicios">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Todo lo que tu evento necesita, en un solo lugar.
        </h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          Diseñamos experiencias completas: audio, luz, pista y ambiente, con un
          estilo moderno y sin complicaciones.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta grande “Paquetes” */}
        <a
          href="#paquetes"
          className={`group relative block p-6 rounded-2xl ${glass} ${neonRing} hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors md:col-span-3`}
          aria-label="Ver Paquetes"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 md:w-7 md:h-7 text-white" />
            <h3 className="text-xl font-semibold text-white">Paquetes</h3>
          </div>

          <p className="mt-2 text-sm text-zinc-300">
            Incluye 'DJ SetUp' más otros servicios.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-400 group-hover:text-white">
            Ver más <span aria-hidden>→</span>
          </span>
        </a>

        {services.map((s, i) => (
          <a key={s.slug} href={`#servicio/${s.slug}`} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className={`p-6 rounded-2xl ${glass} group-hover:bg-white/10 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <s.icon className="w-6 h-6 text-white" />
                <h3 className="text-lg font-medium text-white">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm text-zinc-300">{s.desc}</p>
              <span className="mt-4 inline-flex text-sm text-zinc-300 group-hover:underline">
                Ver más →
              </span>
            </motion.div>
          </a>
        ))}
      </div>

      <p className="mt-8 text-sm text-zinc-400">
        Elige solo lo que necesitas o combínalo en paquetes.
      </p>
    </Section>
  );
}

/* =========
   PAQUETES (estilo Apple + chips + CTA después de seleccionar)
   ========= */
function Packages() {
  const [selected, setSelected] = useState(null);

  // Orden de chips: Corporativos, Bodas, Quinceañeros, Proms, Otros
  const eventChips = [
    { key: "corp", label: "Corporativos" },
    { key: "boda", label: "Bodas" },
    { key: "quince", label: "Quinceañeros" },
    { key: "prom", label: "Proms" },
    { key: "otros", label: "Otros" }, // va directo a #cotizar
  ];

  // Recomendaciones por tipo
  const recommendedByEvent = {
    corp: ["Gold", "Silver", "Platinum"],
    boda: ["Gold", "Platinum", "Silver"],
    quince: ["Gold", "Platinum", "Silver"],
    prom: ["Platinum", "Gold", "Silver"],
  };

  const recommended = selected
    ? (recommendedByEvent[selected] || [])
        .map((name) => packages.find((p) => p.name === name))
        .filter(Boolean)
    : [];

  return (
    <Section
      id="paquetes"
      className="bg-gradient-to-b from-white/0 to-white/5/0"
    >
      {/* ← Atrás (izquierda) */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.hash = "#servicios";
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-black hover:bg-white rounded-full px-3 py-2 border border-white/10 hover:border-white transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
      </div>

      {/* Título limpio */}
      <div className="mx-auto max-w-2xl text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold text-white">
          Paquetes completos. Resultados completos.
        </h2>
        <p className="mt-3 text-zinc-300">
          Personalízalos según tu evento y lo que quieras lograr.
        </p>
      </div>

      {/* Selector de evento – versión destacada */}
      <div className="mb-12 md:mb-14">
        {/* Encabezado limpio y visible */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-white">
            Elige tu tipo de evento
          </h3>
          <p className="mt-2 text-sm text-zinc-400"></p>
        </div>

        {/* “Cápsula” de chips más grande y con blur */}
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur">
          {eventChips.map((opt) => {
            const isActive = selected === opt.key;
            const base =
              "px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm md:text-base border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
            const active = "bg-white text-black border-white shadow";
            const inactive =
              "text-white/80 border-white/10 hover:bg-white hover:text-black hover:border-white";

            // “Otros” → directo al formulario (#cotizar)
            if (opt.key === "otros") {
              return (
                <button
                  key={opt.key}
                  onClick={() => {
                    window.location.hash = "#cotizar";
                  }}
                  className={`${base} ${inactive}`}
                >
                  {opt.label}
                </button>
              );
            }

            return (
              <button
                key={opt.key}
                onClick={() => setSelected(opt.key)}
                className={`${base} ${isActive ? active : inactive}`}
                aria-pressed={isActive}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de paquetes (solo cuando hay selección) */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {selected &&
          recommended.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`rounded-3xl p-6 ${glass} ${neonRing}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                {p.name === "Gold" && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white text-black">
                    Popular
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-zinc-300">{p.tagline}</p>

              <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <a
                href="#cotizar"
                className="mt-6 inline-flex w-full justify-center rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                Elegir {p.name}
              </a>
            </motion.div>
          ))}
      </div>

      {/* CTA final: SOLO cuando HAY selección (versión premium) */}
      {selected && (
        <div className="flex justify-center mt-12">
          <a
            href="#cotizar"
            className="group inline-flex items-center gap-3 sm:gap-4 select-none"
            aria-label="Personaliza tu paquete"
          >
            {/* Bloque negro a la izquierda */}
            <span className="inline-flex items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-black text-white border border-white/10 text-sm sm:text-base">
              ¿Ninguno encaja?
            </span>

            {/* “Círculo”/pill blanco con texto grande en gradiente */}
            <span className="inline-flex items-center rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 shadow-lg ring-1 ring-black/5">
              <span className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-black bg-gradient-to-r from-white via-zinc-200 to-white">
                Personaliza tu paquete
              </span>
              <ChevronRight className="ml-2 w-5 h-5 text-black transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      )}
    </Section>
  );
}

function DJSetupsPage() {
  return (
    <Section id="montajes-dj" className="pt-36 md:pt-40">
      {/* Botón Atrás (izquierda) */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/#servicios";
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-black hover:bg-white rounded-full px-3 py-2 border border-white/10 hover:border-white transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
      </div>

      {/* Título */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          DJ SetUps / Montajes de DJ
        </h1>
        <p className="mt-3 text-zinc-300">
          Elige tu set favorito o combínalo con más servicios.
        </p>
      </div>

      {/* 3 tarjetas */}
      <div className="grid md:grid-cols-3 gap-6">
        {djSetups.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={`rounded-3xl p-6 ${glass} ${neonRing}`}
          >
            {/* Media */}
            <div className="rounded-2xl overflow-hidden mb-4">
              <img
                src={m.media}
                alt={m.name}
                className="w-full aspect-video object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold text-white">{m.name}</h3>

            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-2">
              <a
                href="#cotizar"
                className="inline-flex w-full justify-center rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                Cotizar este montaje
              </a>
              {/* “Video próximamente” */}
              <button
                disabled
                className="inline-flex w-full justify-center rounded-xl px-4 py-3 border border-white/10 text-zinc-400 cursor-not-allowed"
                title="Próximamente"
              >
                Ver video (próximamente)
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ServicePage({ slug }) {
  // Botón Atrás → vuelve o te lleva a #servicios
  const Back = () => (
    <div className="mb-8">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) window.history.back();
          else window.location.hash = "#servicios";
        }}
        className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-black hover:bg-white rounded-full px-3 py-2 border border-white/10 hover:border-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Atrás
      </button>
    </div>
  );

  // Intenta tomar info del arreglo services por slug (si lo tienes definido)
  const svc = Array.isArray(services)
    ? services.find((s) => s.slug === slug)
    : null;

  // ── Montajes de DJ: 3 opciones
  if (slug === "montajes-dj") {
    const montajes = [
      {
        key: "sencillo",
        name: "Montaje Sencillo",
        img: "/montaje-sencillo.jpg",
        bullets: [
          'Pantalla TV 32"',
          "Karaoke / Just Dance",
          "1 micrófono inalámbrico",
          "DJ Booth iluminado",
          "2 luces 'Party' LED ",
          "Mix de música en vivo",
          "4 horas",
        ],
      },
      {
        key: "mediano",
        name: "Montaje Mediano",
        img: "/montaje-mediano.jpg",
        bullets: [
          { text: 'Pantalla gigante 100"', upgrade: true },
          "Karaoke / Just Dance",
          { text: "2 micrófonos inalámbricos", upgrade: true },
          "DJ Booth iluminado",
          { text: "2 trussing iluminados", upgrade: true },
          { text: "2 moving heads", upgrade: true },
          { text: "Máquina de humo o haze", upgrade: true },
          "Mix de música en vivo",
          { text: "Animación desde el 'DJ Stage'", upgrade: true },
          { text: "5 horas", upgrade: true },
        ],
      },
      {
        key: "premium",
        name: "Montaje Premium",
        img: "/montaje-premium.jpg",
        bullets: [
          { text: '2 pantallas TV 55"', upgrade: true },
          "Karaoke / Just Dance",
          { text: "2 micrófonos inalámbricos", upgrade: false },
          "DJ Booth iluminado",
          { text: "2 trussing iluminados", upgrade: false },
          { text: "4 moving heads", upgrade: true },
          { text: "Máquina de humo o haze", upgrade: false },
          { text: "8 luces de ambiente", upgrade: true },
          "Mix de música en vivo",
          { text: "Animación desde el 'DJ Stage'", upgrade: false },
          "5 horas",
        ],
      },
    ];

    return (
      <Section id="servicio" className="pt-36 md:pt-40">
        <Back />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            DJ SetUps / Montajes de DJ
          </h1>
          <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
            Elige el montaje que encaje con tu evento. Todos son
            personalizables.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {montajes.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`rounded-3xl overflow-hidden ${neonRing} ${glass} flex flex-col h-full`}
            >
              {/* Media */}
              <div className="aspect-video bg-black/50">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col grow min-h-[480px] md:min-h-[470px]">
                <h3 className="text-xl font-semibold text-white">{m.name}</h3>

                {/* La lista ocupa el espacio disponible */}
                <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                  {m.bullets.map((b) => {
                    const item =
                      typeof b === "string" ? { text: b, upgrade: false } : b;
                    return (
                      <li key={item.text} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5" />
                        <span>{item.text}</span>
                        {item.upgrade && (
                          <span className="ml-auto inline-flex items-center rounded-full px-2 py-0.1 text-[10px] font-medium bg-white/90 text-black border border-white/20">
                            Mejora
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* CTA pegado al fondo en TODAS las tarjetas */}
                <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
                  <a
                    href="#cotizar"
                    className="col-span-2 inline-flex w-full justify-center rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                  >
                    Cotizar este montaje de DJ
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#cotizar"
            className="inline-flex items-center rounded-full px-5 py-3 text-white hover:bg-white/5 border border-white/10"
          >
            ¿Ninguno encaja?
            <span className="ml-2 underline">Personaliza tu paquete</span>
          </a>
        </div>
      </Section>
    );
  }

  // ── Fallback genérico para otros servicios
  return (
    <Section id="servicio" className="pt-36 md:pt-40">
      <Back />
      <div className={`p-6 rounded-2xl ${glass}`}>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          {svc?.title || "Servicio"}
        </h1>
        <p className="mt-2 text-zinc-300">
          {svc?.desc || (
            <>
              Próximamente detalles para{" "}
              <span className="font-medium">“{slug}”</span>.
            </>
          )}
        </p>
        <a
          href="#cotizar"
          className="mt-6 inline-flex rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
        >
          Cotizar ahora
        </a>
      </div>
    </Section>
  );
}

/* =======
   GALERÍA
   ======= */
function Gallery() {
  return (
    <Section id="galeria">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Inspiración real de nuestros eventos
        </h2>
        <p className="mt-3 text-zinc-300">
          Montajes limpios, luz con intención y pistas que invitan a bailar.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryPlaceholders.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`relative rounded-2xl overflow-hidden ${neonRing}`}
          >
            <div
              className={`w-full ${g.ratio} bg-gradient-to-br from-zinc-900 to-black`}
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,_#67e8f9_0%,_transparent_40%),radial-gradient(circle_at_70%_70%,_#f472b6_0%,_transparent_40%)]" />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-200">
                {g.type === "video" ? (
                  <Video className="w-10 h-10" />
                ) : (
                  <Images className="w-10 h-10" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#" className="text-sm underline text-zinc-300">
          Ver más en Instagram
        </a>
      </div>
    </Section>
  );
}

/* =============
   TESTIMONIOS
   ============= */
function Testimonials() {
  return (
    <Section id="testimonios">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-3 text-zinc-300">
          Reseñas verificadas de eventos en toda la isla.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            text: "El sonido fue perfecto y la iluminación transformó el salón.",
            name: "Novia",
            place: "Arecibo",
          },
          {
            text: "Súper profesionales, puntuales y con excelente gusto.",
            name: "Evento corporativo",
            place: "San Juan",
          },
          {
            text: "La pista LED quedó brutal y el DJ mantuvo todo el mundo activo.",
            name: "Prom",
            place: "Mayagüez",
          },
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`p-6 rounded-2xl ${glass}`}
          >
            <p className="text-zinc-200">“{t.text}”</p>
            <p className="mt-3 text-sm text-zinc-400">
              — <span className="font-medium text-zinc-300">{t.name}</span>,{" "}
              {t.place}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#" className="text-sm underline text-zinc-300">
          Ver reseñas
        </a>
      </div>
    </Section>
  );
}

/* =========
   COTIZAR
   ========= */
function QuoteForm() {
  const [form, setForm] = useState({
    tipo: "Boda",
    fecha: "",
    municipio: "",
    venue: "",
    invitados: "",
    paquete: "No estoy seguro",
    servicios: {
      DJ: false,
      Sonido: false,
      Iluminación: false,
      Pista: false,
      "Photo Booth": false,
      "Animación/MC": false,
      Coordinación: false,
      "Efectos especiales": false,
      "Foto/Video": false,
    },
    presupuesto: 0,
    nombre: "",
    whatsapp: "",
    email: "",
    horario: "",
    mensaje: "",
    consentimiento: false,
  });

  const serviceKeys = Object.keys(form.servicios);
  const updateField = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const toggleServicio = (k) =>
    setForm((p) => ({
      ...p,
      servicios: { ...p.servicios, [k]: !p.servicios[k] },
    }));

  function buildSummary() {
    const selected = serviceKeys.filter((k) => form.servicios[k]);
    const serviciosStr = selected.length
      ? selected.join(", ")
      : "(sin seleccionar)";
    return `Tipo: ${form.tipo}\nFecha: ${form.fecha}\nMunicipio: ${form.municipio}\nVenue: ${form.venue}\nInvitados: ${form.invitados}\nPaquete: ${form.paquete}\nServicios: ${serviciosStr}\nPresupuesto aprox.: ${form.presupuesto}\nNombre: ${form.nombre}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nHorario preferido: ${form.horario}\nMensaje: ${form.mensaje}`;
  }

  function submitWhatsApp(e) {
    e.preventDefault();
    if (!form.nombre || !form.whatsapp) {
      alert("Por favor escribe tu nombre y WhatsApp.");
      return;
    }
    const text = `Hola, quiero cotizar.\n\n${buildSummary()}`;
    const base = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}`
      : `https://wa.me/`;
    const url = `${base}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  function submitEmail(e) {
    e.preventDefault();
    const subject = `Cotización ${form.tipo} – ${form.nombre}`;
    const body = `Hola DJ EDY,%0D%0A%0D%0A${encodeURIComponent(
      buildSummary()
    )}%0D%0A%0D%0AGracias.`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = url;
  }

  return (
    <Section id="cotizar">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Personaliza tu experiencia en 1 minuto
        </h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          Elige servicios o paquetes favoritos y recibe tu propuesta por
          WhatsApp o email.
        </p>
      </div>

      <form className="grid md:grid-cols-3 gap-6">
        {/* Col 1 */}
        <div className={`p-6 rounded-2xl ${glass}`}>
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-zinc-300">Tipo de evento</label>
              <select
                value={form.tipo}
                onChange={(e) => updateField("tipo", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              >
                {[
                  "Boda",
                  "Prom",
                  "Cumpleaños",
                  "Corporativo",
                  "Quinceañero",
                  "Otro",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => updateField("fecha", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Municipio</label>
                <input
                  placeholder="Ej. Arecibo"
                  value={form.municipio}
                  onChange={(e) => updateField("municipio", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300">Venue</label>
              <input
                placeholder="Nombre del lugar"
                value={form.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">Invitados</label>
                <input
                  type="number"
                  min={1}
                  placeholder="Ej. 150"
                  value={form.invitados}
                  onChange={(e) => updateField("invitados", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">
                  Presupuesto (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  placeholder="Ej. 2500"
                  value={form.presupuesto}
                  onChange={(e) =>
                    updateField("presupuesto", Number(e.target.value))
                  }
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className={`p-6 rounded-2xl ${glass}`}>
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-zinc-300">Paquete preferido</label>
              <select
                value={form.paquete}
                onChange={(e) => updateField("paquete", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              >
                {["Silver", "Gold", "Platinum", "No estoy seguro"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-300">
                Servicios de interés
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {serviceKeys.map((k) => (
                  <label
                    key={k}
                    className="flex items-center gap-2 text-sm text-zinc-200"
                  >
                    <input
                      type="checkbox"
                      checked={form.servicios[k]}
                      onChange={() => toggleServicio(k)}
                    />{" "}
                    {k}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300">
                Mensaje (opcional)
              </label>
              <textarea
                rows={4}
                placeholder="Cuéntanos tu idea"
                value={form.mensaje}
                onChange={(e) => updateField("mensaje", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Col 3 */}
        <div className={`p-6 rounded-2xl ${glass}`}>
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-zinc-300">
                Nombre y apellidos
              </label>
              <input
                value={form.nombre}
                onChange={(e) => updateField("nombre", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-300">WhatsApp</label>
                <input
                  placeholder="787…"
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300">Horario preferido</label>
              <input
                placeholder="Ej. 2–5pm"
                value={form.horario}
                onChange={(e) => updateField("horario", e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.consentimiento}
                onChange={(e) =>
                  updateField("consentimiento", e.target.checked)
                }
              />
              Acepto ser contactad@ por WhatsApp/email.
            </label>

            <div className="grid gap-3 pt-2">
              <button
                onClick={submitWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
              </button>
              <button
                onClick={submitEmail}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 ${neonRing} text-white hover:bg-white/5`}
              >
                <Mail className="w-5 h-5" /> Enviar por Email
              </button>
              <p className="text-xs text-zinc-500">
                Gracias. Te contactaremos en breve con tu propuesta.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Section>
  );
}

/* ========
   CONTACTO
   ======== */
function Contact() {
  return (
    <Section id="contacto">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Hablemos de tu evento
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-2xl ${glass}`}>
          <div className="flex items-center gap-3 text-zinc-200">
            <PhoneIcon className="w-5 h-5" />
            <a href="#cotizar" className="underline">
              Escribir por WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <Mail className="w-5 h-5" />
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <Instagram className="w-5 h-5" />{" "}
            <a href="#" className="underline">
              Instagram
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <Facebook className="w-5 h-5" />{" "}
            <a href="#" className="underline">
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <MapPin className="w-5 h-5" /> <span>Todo Puerto Rico</span>
          </div>
          <p className="mt-4 text-sm text-zinc-400"></p>
        </div>

        <div className={`p-6 rounded-2xl ${glass}`}>
          <h3 className="text-lg font-medium text-white">Nota</h3>
          <p className="mt-2 text-sm text-zinc-300">
            La disponibilidad de efectos especiales depende de permisos del
            venue y regulaciones de seguridad. Consultar antes de reservar.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ======
   FOOTER
   ====== */
function Footer() {
  return (
    <footer className="pt-10 pb-20 border-t border-white/10">
      <div className={container}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} DJ EDY. Todos los derechos reservados.
          </div>
          <div className="text-zinc-400 text-sm flex gap-4">
            <a href="#" className="hover:text-zinc-200">
              Privacidad
            </a>
            <a href="#" className="hover:text-zinc-200">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================
   APP (control de “pantallas”)
   ========================= */
export default function App() {
  const hash = useHash(); // "#home", "#paquetes", "#cotizar", "#servicio/..."
  const showPackages = hash === "#paquetes";
  const showQuote = hash === "#cotizar";

  // Sub-pantalla de servicio: #servicio/<slug>
  const serviceSlug = hash.startsWith("#servicio/")
    ? decodeURIComponent(hash.slice("#servicio/".length))
    : null;

  // Sube al top al entrar a una sub-pantalla de servicio
  React.useEffect(() => {
    if (serviceSlug) window.scrollTo({ top: 0, behavior: "auto" });
  }, [serviceSlug]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* CSS global para scroll suave */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html { scroll-behavior: smooth; }
              @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
            `,
        }}
      />

      {/* Fondo sutil */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20 bg-cyan-400" />
        <div className="absolute top-1/2 -right-20 w-[35vw] h-[35vw] rounded-full blur-3xl opacity-20 bg-fuchsia-500" />
      </div>

      <Navbar />

      {serviceSlug ? (
        /* ===== Sub-pantalla: SERVICIO ===== */
        <>
          <ServicePage slug={serviceSlug} />
          <Footer />
        </>
      ) : showQuote ? (
        /* ===== Sub-pantalla: COTIZAR ===== */
        <>
          {/* Botón Atrás arriba a la izquierda */}
          <section className="pt-28 pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => {
                  if (window.history.length > 1) window.history.back();
                  else window.location.hash = "#home";
                }}
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-black hover:bg-white rounded-full px-3 py-2 border border-white/10 hover:border-white transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft className="w-4 h-4" /> Atrás
              </button>
            </div>
          </section>

          <QuoteForm />
          <Footer />
        </>
      ) : showPackages ? (
        /* ===== Sub-pantalla: PAQUETES ===== */
        <>
          <Packages />
          <Footer />
        </>
      ) : (
        /* ===== HOME ===== */
        <>
          <Hero />
          <Services />
          <Gallery />
          <Testimonials />
          <Contact />
          <Footer />

          {/* Botón flotante (solo Home) */}
          <a
            href="#cotizar"
            className="fixed md:hidden bottom-6 right-6 rounded-full px-5 py-3 bg-white text-black font-medium shadow-xl"
          >
            Cotizar
          </a>
        </>
      )}
    </div>
  );
}
