import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Menu,
  X,
} from "lucide-react";

/* =========================
   CONFIGURACIÓN / CONSTANTES
   ========================= */

/* Teléfono para WhatsApp: sin + ni espacios. Ej: "17873568786" */
const WHATSAPP_NUMBER = "17873568786";
/* Email de contacto */
const CONTACT_EMAIL = "djedypr@gmail.com";

/* Rutas de logos (en /public). Coloca tus archivos ahí */
const PRIMARY_LOGO = "/4toDisenoLogo.png";
const FALLBACK_LOGO = "/WhitelogoDjEdyNew.png";

/* VIDEO HERO - Coloca tu video en /public */
const HERO_VIDEO = "/hero-video.mp4"; // 👈 Pon tu video aquí
const HERO_FALLBACK_IMAGE = "/hero-fallback.jpg"; // Imagen de respaldo

/* Utilidades estilo (clases tipo Tailwind) */
const neonRing = "ring-1 ring-offset-0 ring-white/10";
const glass = "backdrop-blur-md bg-white/5 border border-white/10";
const sectionPad = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* Servicios (para la grilla del Home) */
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
    media: "/montajeSencillo.jpg",
    features: [
      "Pantalla TV 32\"",
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
      "Pantalla gigante 100\"",
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
      "2 pantallas TV 55\"",
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

/* Paquetes */
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

/* Opciones de "eventos" */
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

// Hook para leer el hash
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash || "#home");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

// Componente Section
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`${sectionPad} ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

/* ======
   NAVBAR
   ====== */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#home" },
    { label: "Servicios", href: "#servicios" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className={container}>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <img
                src={PRIMARY_LOGO}
                alt="DJ EDY"
                className="h-14 md:h-20 w-auto"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_LOGO;
                }}
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cotizar"
                className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                Cotizar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-zinc-300 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cotizar"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-5 py-3 bg-white text-black rounded-full text-center font-medium"
              >
                Cotizar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =====
   HERO
   ===== */
function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
            {/* Fallback mientras carga */}
            {!videoLoaded && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
              />
            )}
          </>
        ) : (
          // Error: mostrar imagen
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
          />
        )}
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className={`${container} relative z-10 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Experiencias que
            <br />
            transforman eventos
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Producción profesional de eventos en Puerto Rico. DJ, sonido, iluminación y más.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cotizar"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full text-base font-semibold hover:bg-zinc-200 transition-all shadow-2xl"
            >
              Cotizar mi evento
            </a>
            <a
              href="#servicios"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full text-base font-semibold hover:bg-white/10 transition-all"
            >
              Ver servicios
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========
   SERVICES
   ======== */
function Services() {
  return (
    <Section id="servicios" className="bg-gradient-to-b from-black to-zinc-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Nuestros servicios
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Todo lo que necesitas para tu evento en un solo lugar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.a
              key={service.slug}
              href={`#servicio/${service.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group p-8 rounded-2xl ${glass} hover:bg-white/10 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-zinc-100">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-zinc-400 group-hover:text-white transition-colors">
                Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}

/* ==============
   SERVICE PAGE
   ============== */
function ServicePage({ slug }) {
  const service = services.find((s) => s.slug === slug);
  
  if (!service) {
    return (
      <Section>
        <div className="text-center py-20">
          <h2 className="text-2xl text-white mb-4">Servicio no encontrado</h2>
          <a href="#home" className="text-zinc-400 hover:text-white">
            Volver al inicio
          </a>
        </div>
      </Section>
    );
  }

  const Icon = service.icon;
  const isDJSetup = slug === "montajes-dj";

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </a>
        </div>
      </section>

      <Section className="pt-0">
        <div className="flex items-start gap-6 mb-12">
          <div className="p-4 rounded-2xl bg-white/5">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-zinc-400">{service.desc}</p>
          </div>
        </div>

        {isDJSetup && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {djSetups.map((setup) => (
              <div
                key={setup.id}
                className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-colors`}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {setup.name}
                </h3>
                <ul className="space-y-2">
                  {setup.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
          >
            Cotizar este servicio <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </Section>
    </>
  );
}

/* =======
   GALLERY
   ======= */
function Gallery() {
  return (
    <Section id="galeria" className="bg-zinc-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Momentos memorables
        </h2>
        <p className="text-zinc-400 text-lg">
          Explora algunos de nuestros eventos recientes
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryPlaceholders.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`${item.ratio} rounded-xl overflow-hidden bg-zinc-800 hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Images className="w-12 h-12 text-zinc-600" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-zinc-400 text-sm">
          📸 Próximamente: galería completa con fotos y videos reales
        </p>
      </div>
    </Section>
  );
}

/* ============
   TESTIMONIALS
   ============ */
function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      event: "Boda",
      text: "Superaron todas nuestras expectativas. El montaje fue espectacular y la música perfecta para cada momento.",
      rating: 5,
    },
    {
      name: "Carlos Rivera",
      event: "Evento Corporativo",
      text: "Profesionalismo de principio a fin. El sonido y la iluminación fueron impecables.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      event: "Quinceañero",
      text: "¡Increíble! Los efectos especiales y la pista LED hicieron la diferencia. Todos quedaron fascinados.",
      rating: 5,
    },
  ];

  return (
    <Section className="bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className={`p-6 rounded-2xl ${glass}`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-zinc-300 mb-4 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="text-white font-medium">{t.name}</p>
              <p className="text-sm text-zinc-500">{t.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ========
   PACKAGES
   ======== */
function Packages() {
  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </a>
        </div>
      </section>

      <Section className="pt-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Paquetes diseñados para ti
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Escoge el paquete que mejor se ajuste a tu evento. Todos incluyen DJ, sonido y montaje.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`p-8 rounded-2xl ${glass} hover:bg-white/10 transition-all ${
                idx === 1 ? "ring-2 ring-white/20" : ""
              }`}
            >
              {idx === 1 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-zinc-400 mb-6">{pkg.tagline}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cotizar"
                className="block w-full text-center px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
              >
                Seleccionar
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Sugerencias por tipo de evento
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventOptions.map((opt) => (
              <div key={opt.key} className={`p-6 rounded-2xl ${glass}`}>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {opt.label}
                </h3>
                <ul className="space-y-2 mb-4">
                  {opt.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-zinc-400">
                      • {s}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-zinc-500 italic">
                  Sugerencia: {opt.bundle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

/* ==========
   QUOTE FORM
   ========== */
function QuoteForm() {
  const [form, setForm] = useState({
    tipoEvento: "",
    fecha: "",
    personas: "",
    lugar: "",
    mensaje: "",
    nombre: "",
    whatsapp: "",
    email: "",
    horario: "",
    consentimiento: false,
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitWhatsApp = () => {
    if (!form.consentimiento) {
      alert("Por favor acepta ser contactado.");
      return;
    }
    const msg = `
Hola, me gustaría cotizar un evento:
- Tipo: ${form.tipoEvento || "N/A"}
- Fecha: ${form.fecha || "N/A"}
- Personas: ${form.personas || "N/A"}
- Lugar: ${form.lugar || "N/A"}
- Mensaje: ${form.mensaje || "N/A"}

Mis datos:
- Nombre: ${form.nombre || "N/A"}
- Email: ${form.email || "N/A"}
- Horario preferido: ${form.horario || "N/A"}
    `.trim();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const submitEmail = () => {
    if (!form.consentimiento) {
      alert("Por favor acepta ser contactado.");
      return;
    }
    const subject = `Cotización: ${form.tipoEvento || "Evento"}`;
    const body = `
Hola,

Me gustaría cotizar un evento con los siguientes detalles:

Tipo de evento: ${form.tipoEvento || "N/A"}
Fecha: ${form.fecha || "N/A"}
Cantidad de personas: ${form.personas || "N/A"}
Lugar: ${form.lugar || "N/A"}
Mensaje adicional: ${form.mensaje || "N/A"}

Mis datos de contacto:
Nombre: ${form.nombre || "N/A"}
WhatsApp: ${form.whatsapp || "N/A"}
Email: ${form.email || "N/A"}
Horario preferido para contacto: ${form.horario || "N/A"}

Gracias.
    `.trim();
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cotiza tu evento
          </h1>
          <p className="text-xl text-zinc-400">
            Completa el formulario y te contactamos con una propuesta personalizada
          </p>
        </div>

        <form className="grid gap-8">
          {/* Col 1 */}
          <div className={`p-6 rounded-2xl ${glass}`}>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-zinc-300">Tipo de evento</label>
                <select
                  value={form.tipoEvento}
                  onChange={(e) => updateField("tipoEvento", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                >
                  <option value="">Selecciona...</option>
                  <option value="Boda">Boda</option>
                  <option value="Prom">Prom</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Quinceañero">Quinceañero</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-300">Fecha tentativa</label>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={(e) => updateField("fecha", e.target.value)}
                    className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-300">Personas aprox.</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={form.personas}
                    onChange={(e) => updateField("personas", e.target.value)}
                    className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-300">Lugar / Venue</label>
                <input
                  placeholder="Salón, hotel, etc."
                  value={form.lugar}
                  onChange={(e) => updateField("lugar", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
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

          {/* Col 2 */}
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
                  type="button"
                  onClick={submitWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
                </button>
                <button
                  type="button"
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
      </div>
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
            <a
              href="https://instagram.com/djedy.pr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @djedy.pr
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <Facebook className="w-5 h-5" />{" "}
            <a
              href="https://facebook.com/djedypr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              DJ EDY PR
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <MapPin className="w-5 h-5" /> <span>Todo Puerto Rico</span>
          </div>
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
   APP (control de "pantallas")
   ========================= */
export default function App() {
  const hash = useHash();
  const showPackages = hash === "#paquetes";
  const showQuote = hash === "#cotizar";

  const serviceSlug = hash.startsWith("#servicio/")
    ? decodeURIComponent(hash.slice("#servicio/".length))
    : null;

  React.useEffect(() => {
    if (serviceSlug) window.scrollTo({ top: 0, behavior: "auto" });
  }, [serviceSlug]);

  return (
    <div className="min-h-screen bg-black text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html { scroll-behavior: smooth; }
              @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
            `,
        }}
      />

      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20 bg-cyan-400" />
        <div className="absolute top-1/2 -right-20 w-[35vw] h-[35vw] rounded-full blur-3xl opacity-20 bg-fuchsia-500" />
      </div>

      <Navbar />

      {serviceSlug ? (
        <>
          <ServicePage slug={serviceSlug} />
          <Footer />
        </>
      ) : showQuote ? (
        <>
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
        <>
          <Packages />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <Services />
          <Gallery />
          <Testimonials />
          <Contact />
          <Footer />

          <a
            href="#cotizar"
            className="fixed md:hidden bottom-6 right-6 rounded-full px-5 py-3 bg-white text-black font-medium shadow-xl z-50"
          >
            Cotizar
          </a>
        </>
      )}
    </div>
  );
}
