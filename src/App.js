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
  Heart,
  GraduationCap,
  Cake,
  Briefcase,
  PartyPopper,
} from "lucide-react";

/* =========================
   CONFIGURACIÓN / CONSTANTES
   ========================= */

const WHATSAPP_NUMBER = "17873568786";
const CONTACT_EMAIL = "dj3dy3@gmail.com";

const PRIMARY_LOGO = "/4toDisenoLogo.png";
const FALLBACK_LOGO = "/WhitelogoDjEdyNew.png";

const HERO_VIDEO = "/hero-video.mp4";
const HERO_FALLBACK_IMAGE = "/hero-fallback.jpg";

const neonRing = "ring-1 ring-offset-0 ring-white/10";
const glass = "backdrop-blur-md bg-white/5 border border-white/10";
const sectionPad = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* =========================
   TIPOS DE EVENTOS
   ========================= */
const eventTypes = [
  {
    id: "bodas",
    name: "Bodas",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "El día más especial merece la mejor producción",
  },
  {
    id: "proms",
    name: "Proms / Graduaciones",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    description: "Una noche inolvidable para celebrar logros",
  },
  {
    id: "cumpleanos",
    name: "Cumpleaños / Sociales",
    icon: Cake,
    color: "from-purple-500 to-pink-500",
    description: "Celebra tu día con energía y estilo",
  },
  {
    id: "corporativos",
    name: "Eventos Corporativos",
    icon: Briefcase,
    color: "from-slate-500 to-zinc-500",
    description: "Profesionalismo y elegancia para tu empresa",
  },
  {
    id: "quinceaneros",
    name: "Quinceañeros",
    icon: PartyPopper,
    color: "from-fuchsia-500 to-purple-500",
    description: "Una celebración mágica y memorable",
  },
];

/* =========================
   PAQUETES POR TIPO DE EVENTO
   ========================= */
const packagesByEvent = {
  bodas: [
    {
      name: "Silver",
      tagline: "Elegancia esencial",
      price: "Desde $XXX",
      includes: [
        "Montaje Mediano (Pantalla 100\", DJ Booth, 2 Trussing)",
        "Pista de baile 12x12",
        "2 horas PhotoBooth 360°",
        "10 luces de ambientación",
        "Hora loca (foam sticks)",
      ],
      ideal: "Bodas íntimas (80-120 personas)",
    },
    {
      name: "Gold",
      tagline: "El favorito de novios",
      price: "Desde $XXX",
      featured: true,
      includes: [
        "Montaje Premium (2 Pantallas 55\", trussing iluminado)",
        "Pista de baile 16x16",
        "3 horas PhotoBooth 360°",
        "16 luces de ambientación",
        "Hora loca completa",
        "Chispas frías (primer baile)",
        "Neblina 'baile en nubes'",
      ],
      ideal: "Bodas medianas (120-200 personas)",
    },
    {
      name: "Platinum",
      tagline: "Producción de lujo",
      price: "Desde $XXX",
      includes: [
        "Montaje Premium + Pantalla Gigante adicional",
        "Pista de baile 16x16",
        "3 horas PhotoBooth 360°",
        "22 luces de ambientación",
        "Hora loca VIP",
        "Chispas frías ilimitadas",
        "Neblina 'baile en nubes'",
        "Batucada (3-5 integrantes)",
        "Maestro de Ceremonias profesional",
      ],
      ideal: "Bodas grandes (200+ personas)",
    },
  ],
  proms: [
    {
      name: "Silver",
      tagline: "Fiesta garantizada",
      price: "Desde $XXX",
      includes: [
        "Montaje Mediano (Pantalla 100\")",
        "Pista de baile 12x12",
        "2 horas PhotoBooth 360°",
        "10 luces de ambientación",
        "Hora loca",
      ],
      ideal: "Graduaciones pequeñas (50-80 personas)",
    },
    {
      name: "Gold",
      tagline: "Experiencia completa",
      price: "Desde $XXX",
      featured: true,
      includes: [
        "Montaje Premium con LED wall",
        "Pista de baile 16x16",
        "3 horas PhotoBooth 360°",
        "16 luces de ambientación + lasers",
        "Hora loca + glow sticks",
        "Confeti (si el venue lo permite)",
      ],
      ideal: "Proms medianos (80-150 personas)",
    },
    {
      name: "Platinum",
      tagline: "Noche épica",
      price: "Desde $XXX",
      includes: [
        "Montaje Premium + múltiples pantallas",
        "Pista de baile 16x16",
        "3 horas PhotoBooth 360°",
        "22 luces + efectos especiales",
        "Silent Party (50 audífonos)",
        "Neon Party completa",
        "Animador profesional",
      ],
      ideal: "Proms grandes (150+ personas)",
    },
  ],
  cumpleanos: [
    {
      name: "Silver",
      tagline: "Celebración vibrante",
      price: "Desde $XXX",
      includes: [
        "Montaje Sencillo (TV 32\", DJ Booth)",
        "Pista de baile 12x12 (opcional)",
        "2 horas PhotoBooth estático",
        "10 luces de ambientación",
      ],
      ideal: "Fiestas íntimas (30-50 personas)",
    },
    {
      name: "Gold",
      tagline: "Fiesta memorable",
      price: "Desde $XXX",
      featured: true,
      includes: [
        "Montaje Mediano (Pantalla 100\")",
        "Pista de baile 12x12",
        "3 horas PhotoBooth 360°",
        "16 luces de ambientación",
        "Hora loca",
      ],
      ideal: "Fiestas medianas (50-100 personas)",
    },
    {
      name: "Platinum",
      tagline: "Party extremo",
      price: "Desde $XXX",
      includes: [
        "Montaje Premium",
        "Pista de baile 16x16",
        "3 horas PhotoBooth 360°",
        "22 luces de ambientación",
        "Espuma party (si venue lo permite)",
        "Hora loca deluxe",
      ],
      ideal: "Fiestas grandes (100+ personas)",
    },
  ],
  corporativos: [
    {
      name: "Silver",
      tagline: "Profesional y funcional",
      price: "Desde $XXX",
      includes: [
        "Montaje sobrio sin luces excesivas",
        "Sonido para speeches (2 micros)",
        "Pantalla para presentaciones",
        "Música de ambiente controlada",
      ],
      ideal: "Reuniones y cocktails (30-80 personas)",
    },
    {
      name: "Gold",
      tagline: "Evento corporativo premium",
      price: "Desde $XXX",
      featured: true,
      includes: [
        "Montaje Premium con branding",
        "Sonido profesional + 3 micros",
        "Pantalla gigante para visuales",
        "Iluminación elegante (colores corporativos)",
        "DJ + playlist empresarial",
      ],
      ideal: "Eventos medianos (80-150 personas)",
    },
    {
      name: "Platinum",
      tagline: "Producción ejecutiva",
      price: "Desde $XXX",
      includes: [
        "Montaje Premium + múltiples pantallas",
        "Sonido premium + micros inalámbricos",
        "Iluminación integral con branding",
        "Coordinador de evento",
        "Fotógrafo profesional",
      ],
      ideal: "Eventos grandes (150+ personas)",
    },
  ],
  quinceaneros: [
    {
      name: "Silver",
      tagline: "Quinceañera especial",
      price: "Desde $XXX",
      includes: [
        "Montaje Mediano",
        "Pista de baile 12x12",
        "2 horas PhotoBooth 360°",
        "10 luces de ambientación",
        "Hora loca",
      ],
      ideal: "Celebraciones íntimas (50-80 personas)",
    },
    {
      name: "Gold",
      tagline: "Quinceañera de ensueño",
      price: "Desde $XXX",
      featured: true,
      includes: [
        "Montaje Premium",
        "Pista LED 16x16",
        "3 horas PhotoBooth 360°",
        "16 luces temáticas",
        "Entrada con chispas frías",
        "Neblina 'baile en nubes'",
        "Hora loca temática",
      ],
      ideal: "Quinces medianos (80-150 personas)",
    },
    {
      name: "Platinum",
      tagline: "Quinceañera de película",
      price: "Desde $XXX",
      includes: [
        "Montaje Premium + pantallas adicionales",
        "Pista LED 16x16 con diseño custom",
        "3 horas PhotoBooth 360°",
        "22 luces + proyección de monograma",
        "Entrada teatral completa",
        "Efectos especiales ilimitados",
        "Batucada",
        "MC + Animador",
      ],
      ideal: "Quinces grandes (150+ personas)",
    },
  ],
};

/* =========================
   MONTAJES DE DJ (OPCIÓN BÁSICA)
   ========================= */
const djSetups = [
  {
    id: "sencillo",
    name: "Montaje Sencillo",
    emoji: "🎯",
    price: "Desde $XXX",
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
    ideal: "Eventos pequeños o presupuesto ajustado",
  },
  {
    id: "mediano",
    name: "Montaje Mediano",
    emoji: "🚀",
    price: "Desde $XXX",
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
    ideal: "Eventos medianos, mejor relación precio-calidad",
  },
  {
    id: "premium",
    name: "Montaje Premium",
    emoji: "💎",
    price: "Desde $XXX",
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
    ideal: "Eventos elegantes o formales",
  },
];

/* =========================
   SERVICIOS EXTRAS (MENÚ)
   ========================= */
const extraServices = {
  iluminacion: [
    {
      name: "Luces de Ambientación",
      desc: "Focos LED inalámbricos en colores personalizables según decoración",
      icon: Lightbulb,
    },
    {
      name: "Estructuras Trussing",
      desc: "Estructuras profesionales con iluminación integrada",
      icon: Building2,
    },
    {
      name: "Proyección de Monograma",
      desc: "Tu logo o iniciales proyectados en pared o piso",
      icon: Video,
    },
  ],
  pistas: [
    {
      name: "Pista de Baile Iluminada",
      desc: "Piso interactivo LED personalizable (12x12 o 16x16)",
      icon: Sparkles,
    },
  ],
  fotografia: [
    {
      name: "PhotoBooth 360°",
      desc: "Plataforma giratoria para videos interactivos",
      icon: Camera,
    },
    {
      name: "PhotoBooth Estático",
      desc: "Cabina clásica con impresión o entrega digital",
      icon: Camera,
    },
    {
      name: "Fotografía Profesional",
      desc: "Cobertura completa del evento",
      icon: Camera,
    },
    {
      name: "Videografía",
      desc: "Video profesional con highlight edit",
      icon: Video,
    },
  ],
  efectos: [
    {
      name: "Chispas Frías",
      desc: "Pirotecnia segura para momentos especiales",
      icon: Sparkles,
    },
    {
      name: "Neblina 'Baile en Nubes'",
      desc: "Humo bajo para efecto mágico en la pista",
      icon: Sparkles,
    },
    {
      name: "Confeti",
      desc: "Máquina lanzadora (sujeto a permisos del venue)",
      icon: PartyPopper,
    },
  ],
  animacion: [
    {
      name: "Maestro de Ceremonias",
      desc: "Voz oficial que conduce y anima el evento",
      icon: Mic2,
    },
    {
      name: "Animador",
      desc: "Interacción y dinamismo con los invitados",
      icon: Mic2,
    },
    {
      name: "Batucada",
      desc: "3-5 integrantes con percusión para animar",
      icon: Music2,
    },
    {
      name: "Hora Loca",
      desc: "Tubos de foam y accesorios neón",
      icon: PartyPopper,
    },
  ],
};

/* ==============
   HELPERS / UI
   ============== */

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash || "#home");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

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
    { label: "Paquetes", href: "#paquetes" },
    { label: "Montajes DJ", href: "#montajes" },
    { label: "Servicios", href: "#servicios" },
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
            <a href="#home" className="flex items-center">
              <img
                src={PRIMARY_LOGO}
                alt="DJ EDY"
                className="h-14 md:h-18 w-auto"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_LOGO;
                }}
              />
            </a>

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
            {!videoLoaded && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
              />
            )}
          </>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className={`${container} relative z-10 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Tu evento perfecto
            <br />
            empieza aquí
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Paquetes completos para bodas, proms, cumpleaños y más. DJ + sonido + iluminación + efectos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#bestsellers"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full text-base font-semibold hover:bg-zinc-200 transition-all shadow-2xl"
            >
              Explorar servicios
            </a>
            <a
              href="#cotizar"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full text-base font-semibold hover:bg-white/10 transition-all"
            >
              Cotizar evento
            </a>
          </div>
        </motion.div>

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

/* ============
   BEST SELLERS
   ============ */
function BestSellers() {
  return (
    <Section id="bestsellers" className="bg-black">
      {/* Cards grandes: Paquetes vs Montajes */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* PAQUETES - Card grande */}
        <motion.a
          href="#paquetes"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-8 md:p-12 min-h-[400px] flex flex-col justify-between hover:scale-[1.02] transition-transform"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Lo más vendido
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Paquetes Completos
            </h2>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              La experiencia completa para tu evento.
              <br />
              <span className="text-base text-white/70">
                DJ + Sonido + Iluminación + Pista + Efectos + Más
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-white font-semibold">
            Explorar paquetes <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        </motion.a>

        {/* MONTAJES - Card grande */}
        <motion.a
          href="#montajes"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-700 to-zinc-900 p-8 md:p-12 min-h-[400px] flex flex-col justify-between hover:scale-[1.02] transition-transform"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Music2 className="w-4 h-4" />
              Opción básica
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Solo Montaje DJ
            </h2>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              Lo esencial para tu evento.
              <br />
              <span className="text-base text-white/70">
                DJ + Sonido + Luces básicas + Pantalla
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-white font-semibold">
            Ver montajes <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </motion.a>
      </div>

      {/* Cards medianas: Servicios individuales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Sonido */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Headphones className="w-10 h-10 text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Sonido</h3>
            <p className="text-xs text-zinc-400">Profesional</p>
          </div>
        </motion.a>

        {/* Iluminación */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Lightbulb className="w-10 h-10 text-yellow-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Iluminación</h3>
            <p className="text-xs text-zinc-400">Arquitectónica</p>
          </div>
        </motion.a>

        {/* Pistas */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Sparkles className="w-10 h-10 text-fuchsia-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Pistas LED</h3>
            <p className="text-xs text-zinc-400">Iluminadas</p>
          </div>
        </motion.a>

        {/* Photo Booth */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Camera className="w-10 h-10 text-pink-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Photo Booth</h3>
            <p className="text-xs text-zinc-400">360° & más</p>
          </div>
        </motion.a>

        {/* Efectos */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Sparkles className="w-10 h-10 text-orange-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Efectos</h3>
            <p className="text-xs text-zinc-400">Chispas, humo</p>
          </div>
        </motion.a>

        {/* Animación */}
        <motion.a
          href="#servicios"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 aspect-square flex flex-col justify-between hover:bg-zinc-800 transition-colors"
        >
          <Mic2 className="w-10 h-10 text-green-400" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Animación</h3>
            <p className="text-xs text-zinc-400">MC & más</p>
          </div>
        </motion.a>
      </div>

      {/* Explicación clara */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-4">
          ¿Paquete o Montaje? Te explicamos
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className={`p-6 rounded-xl ${glass}`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-fuchsia-500/20">
                <Package className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Paquetes</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white">Todo incluido:</strong> DJ, sonido, iluminación, pista de baile, 
                  photo booth, efectos especiales y más. Un solo precio, sin complicaciones. 
                  Perfecto si quieres la experiencia completa.
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${glass}`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Music2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Montajes</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white">Lo esencial:</strong> Solo DJ + sonido + luces básicas + pantalla. 
                  Precio más accesible. Puedes añadir servicios extras después si quieres. 
                  Ideal si tienes presupuesto ajustado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ========
   PAQUETES - SELECTOR DE TIPO DE EVENTO
   ======== */
function PackagesPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!selectedEvent) {
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
              Elige tu tipo de evento
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Cada evento es único. Selecciona el tuyo para ver paquetes diseñados específicamente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, idx) => {
              const Icon = event.icon;
              return (
                <motion.button
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedEvent(event.id)}
                  className={`group p-8 rounded-2xl ${glass} hover:bg-white/10 transition-all text-left cursor-pointer`}
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${event.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                  <p className="text-zinc-400 mb-4">{event.description}</p>
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    Ver paquetes <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Section>
      </>
    );
  }

  // Mostrar paquetes del evento seleccionado
  const eventData = eventTypes.find((e) => e.id === selectedEvent);
  const packages = packagesByEvent[selectedEvent] || [];

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedEvent(null)}
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Cambiar tipo de evento
          </button>
        </div>
      </section>

      <Section className="pt-0">
        <div className="text-center mb-16">
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${eventData.color} mb-4`}>
            {React.createElement(eventData.icon, { className: "w-10 h-10 text-white" })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Paquetes para {eventData.name}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {eventData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`p-8 rounded-2xl ${glass} hover:bg-white/10 transition-all ${
                pkg.featured ? "ring-2 ring-white/20 scale-105" : ""
              }`}
            >
              {pkg.featured && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-zinc-400 mb-2">{pkg.tagline}</p>
              <p className="text-2xl font-bold text-white mb-6">{pkg.price}</p>
              
              <div className="mb-6">
                <p className="text-sm text-zinc-500 mb-3">Incluye:</p>
                <ul className="space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-white/5">
                <p className="text-xs text-zinc-400 mb-1">Ideal para:</p>
                <p className="text-sm text-white">{pkg.ideal}</p>
              </div>

              <a
                href="#cotizar"
                className="block w-full text-center px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
              >
                Cotizar este paquete
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">
            ¿Prefieres armar tu propio paquete o solo necesitas un montaje de DJ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#montajes"
              className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              Ver montajes de DJ
            </a>
            <a
              href="#servicios"
              className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              Ver servicios individuales
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ========
   MONTAJES DE DJ (OPCIÓN BÁSICA)
   ======== */
function MontajesPage() {
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
            Montajes de DJ
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Si solo necesitas DJ + sonido + iluminación básica, estos son nuestros montajes. 
            <br />
            <span className="text-zinc-500 text-base mt-2 block">
              (Puedes añadir servicios extras después)
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {djSetups.map((setup, idx) => (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`p-8 rounded-2xl ${glass} hover:bg-white/10 transition-all`}
            >
              <div className="text-5xl mb-4">{setup.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{setup.name}</h3>
              <p className="text-2xl font-bold text-white mb-6">{setup.price}</p>
              
              <ul className="space-y-2 mb-6">
                {setup.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 p-4 rounded-lg bg-white/5">
                <p className="text-xs text-zinc-400 mb-1">Ideal para:</p>
                <p className="text-sm text-white">{setup.ideal}</p>
              </div>

              <a
                href="#cotizar"
                className="block w-full text-center px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
              >
                Cotizar montaje
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">
            ¿Buscas una experiencia completa? Nuestros paquetes incluyen múltiples servicios
          </p>
          <a
            href="#paquetes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
          >
            Ver paquetes completos <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </Section>
    </>
  );
}

/* ========
   SERVICIOS (MENÚ)
   ======== */
function ServicesPage() {
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

      <Section id="servicios" className="pt-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Servicios adicionales
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Complementa tu paquete o montaje con estos servicios
          </p>
        </div>

        {/* Iluminación */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">💡 Iluminación & Escenarios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {extraServices.iluminacion.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`p-6 rounded-xl ${glass}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pistas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">🎉 Pistas de baile</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {extraServices.pistas.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`p-6 rounded-xl ${glass}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fotografía */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">📸 Foto & Video</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraServices.fotografia.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`p-6 rounded-xl ${glass}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Efectos */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">✨ Efectos especiales</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {extraServices.efectos.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`p-6 rounded-xl ${glass}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animación */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">🎤 Coordinación & Animación</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraServices.animacion.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`p-6 rounded-xl ${glass}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-zinc-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-zinc-400 mb-4">¿Listo para cotizar tu evento con los servicios que necesitas?</p>
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
          >
            Cotizar mi evento <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </Section>
    </>
  );
}

/* =======
   GALERÍA
   ======= */
const galleryPlaceholders = [
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "video", ratio: "aspect-video" },
  { type: "foto", ratio: "aspect-[4/5]" },
  { type: "video", ratio: "aspect-video" },
  { type: "foto", ratio: "aspect-[4/5]" },
];

function Gallery() {
  return (
    <Section id="galeria" className="bg-zinc-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Nuestro trabajo
        </h2>
        <p className="text-zinc-400 text-lg">
          Momentos reales de eventos reales
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
          📸 Galería completa próximamente
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
      name: "Alondra Maria Peluyera",
      event: "Boda",
      text: "Compromiso, profesionalismo y un talento excepcional. Todos gozamos en cantidad, te brinda un servicio muy especializado. Recomendado 100% como DJ.",
      rating: 5,
    },
    {
      name: "Yaritza Cruz Hernandez",
      event: "Boda",
      text: "Demasiados de complacidos y agradecidos. Desde el inicio el DJ súper amable, atento y responsable. El día de la boda súper puntual, y el servicio hermoso y de muy alta calidad.",
      rating: 5,
    },
    {
      name: "Hector Christian",
      event: "Graduación",
      text: "Quiero agradecerte por tu entendimiento y compromiso. Te esmeraste en servirnos. Los graduados lo disfrutaron al máximo. Tu trato, profesionalismo y empatía fueron A+.",
      rating: 5,
    },
  ];

  return (
    <Section className="bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Clientes satisfechos
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
            Cuéntanos qué necesitas y te enviamos una propuesta personalizada
          </p>
        </div>

        <form className="grid gap-8">
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
                  <option value="Prom/Graduación">Prom/Graduación</option>
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
                  placeholder="¿Qué servicios te interesan? ¿Alguna petición especial?"
                  value={form.mensaje}
                  onChange={(e) => updateField("mensaje", e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-zinc-100"
                />
              </div>
            </div>
          </div>

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
                  Te contactaremos en breve con tu propuesta personalizada.
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
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="underline">
              (787) 356-8786
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
              href="https://instagram.com/dj_edy3"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @dj_edy3
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <Facebook className="w-5 h-5" />{" "}
            <a
              href="https://facebook.com/DjEdy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              DJ EDY
            </a>
          </div>
          <div className="flex items-center gap-3 text-zinc-200 mt-3">
            <MapPin className="w-5 h-5" /> <span>Todo Puerto Rico</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${glass}`}>
          <h3 className="text-lg font-medium text-white">Nota importante</h3>
          <p className="mt-2 text-sm text-zinc-300">
            La disponibilidad de efectos especiales (chispas frías, confeti, espuma, etc.) 
            depende de los permisos del venue y regulaciones de seguridad. 
            Siempre consultamos antes de confirmar.
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
  const showMontajes = hash === "#montajes";
  const showServices = hash === "#servicios";
  const showQuote = hash === "#cotizar";

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash]);

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

      {showQuote ? (
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
          <PackagesPage />
          <Footer />
        </>
      ) : showMontajes ? (
        <>
          <MontajesPage />
          <Footer />
        </>
      ) : showServices ? (
        <>
          <ServicesPage />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <BestSellers />
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
