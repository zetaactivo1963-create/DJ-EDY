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
const CONTACT_EMAIL = "djedypr@gmail.com";

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

const montajes = [
  {
    id: "sencillo",
    name: "Montaje Sencillo",
    price: "Desde $XXX",
    images: ["/montaje-Sencillo.jpg", "/montaje-Sencillo-2.jpg"],  // ← images plural
    features: [
      "Pantalla TV 32\"",
      "Karaoke / Just Dance",
      "1 micrófono inalámbrico",
      "DJ Booth iluminado",
      "2 luces Party 5 en 1",
      "Mixeo de música en vivo",
      "4 horas",
    ],
    ideal: "Eventos pequeños (30-50 personas)",
  },
  {
    id: "mediano",
    name: "Montaje Mediano",
    price: "Desde $XXX",
    images: ["/montajeMediano.jpg", "/montajeMediano-2.PNG", "/montajeMediano-3.jpg"],  // ← images plural
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
    ideal: "Eventos medianos (50-150 personas)",
  },
  {
    id: "premium",
    name: "Montaje Premium",
    price: "Desde $XXX",
    images: ["/montaje-Premium.jpg", "/montaje-Premium-2.PNG", "/montaje-Premium-3.jpg"],  // ← images plural
    features: [
      "2 pantallas TV 55\"",
      "Karaoke / Just Dance",
      "2 micrófonos inalámbricos",
      "DJ Booth iluminado",
      "2 trussing iluminados",
      "2 luces Moving Heads",
      "Máquina de humo o haze",
      "Mixeo de música en vivo",
      "Sonido para ceremonia",
      "5 horas + 1 hr extra",
    ],
    ideal: "Eventos grandes (150+ personas)",
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

/* Helper Component */
function ServiceCard({ href, image, title, subtitle, delay }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-3xl min-h-[400px] hover:scale-[1.01] transition-transform block"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute top-0 left-0 right-0 pt-8 px-6 text-center z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-base text-white/90 drop-shadow-lg">{subtitle}</p>
      </div>
      
      <div className="relative h-full p-8 flex items-end justify-center z-10">
        <div className="flex items-center gap-2 text-white font-semibold drop-shadow-lg">
          Ver más <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.a>
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
   BEST SELLERS - MOBILE FIRST, SUPER SIMPLE
   ============ */
function BestSellers() {
  return (
    <Section id="bestsellers" className="bg-black">
      {/* 1. PAQUETES */}
      <motion.a
        href="#paquetes"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-3xl min-h-[600px] mb-6 block hover:scale-[1.01] transition-transform"
      >
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/montajePremium.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />      
          
        <div className="relative z-10 h-full p-8 md:p-16 flex flex-col">
          <div className="pt-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Paquetes Completos</h2>
            <p className="text-lg md:text-xl text-white/90 mt-3">Varios servicios: Montaje DJ + Pista + PhotoBooth</p>
            <p className="text-base text-white/70 mt-2">Opción más completa</p>
          </div>
          <div className="mt-auto flex items-center justify-center gap-2 text-white text-lg font-semibold pb-2">
            Ver Paquetes <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </motion.a>

      {/* 2. MONTAJES DJ */}
      <motion.a
        href="#montajes"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group relative overflow-hidden rounded-3xl min-h-[500px] mb-6 block hover:scale-[1.01] transition-transform"
      >
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/montajeSencillo.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        
        <div className="relative z-10 h-full p-8 md:p-16 flex flex-col">
          <div className="pt-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Montajes DJ</h2>
            <p className="text-lg md:text-xl text-white/90 mt-3">Lo esencial: DJ + Sonido + Luces</p>
            <p className="text-base text-white/70 mt-2">Opción más económica</p>
          </div>
          <div className="mt-auto flex items-center justify-center gap-2 text-white text-lg font-semibold pb-2">
            Ver montajes <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </motion.a>

      {/* Grid 2x2 servicios */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ServiceCard href="#servicio/pistas-de-baile" image="/pista-led-service.jpg" title="Pista de Baile" subtitle="LED iluminada · Diferentes tamaños" delay={0.2} />
        <ServiceCard href="#servicio/fotografia" image="/fotografia-service.png" title="Fotografía" subtitle="Cobertura completa" delay={0.25} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ServiceCard href="#servicio/photo-booths" image="/photobooth-service.png" title="Photo Booths" subtitle="360° · Estático · Digital" delay={0.3} />
        <ServiceCard href="#servicio/efectos-especiales" image="/efectos-service.jpg" title="Efectos Especiales" subtitle="Chispas · Confeti · Humo" delay={0.35} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ServiceCard href="#servicio/sonido-profesional" image="/sonido-service.jpg" title="Sonido" subtitle="Line Array · Técnico dedicado" delay={0.4} />
        <ServiceCard href="#servicio/iluminacion-trussing" image="/iluminacion-service.jpg" title="Iluminación & Trussing" subtitle="Moving Heads · LED · Estructuras" delay={0.45} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard href="#servicio/pantallas-visuales" image="/pantallas-service.png" title="Pantallas / Visuales" subtitle="Pantallas LED · Proyección" delay={0.5} />
        <ServiceCard href="#servicio/animacion-coordinacion" image="/animacion-service.png" title="Animación & Coordinación" subtitle="MC · Animador · Coordinador" delay={0.55} />
      </div>

      {/* Explicación */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <div className={`p-8 rounded-2xl ${glass}`}>
          <h3 className="text-2xl font-bold text-white mb-4">¿Cómo funciona?</h3>
          <div className="text-left space-y-4 text-lg text-zinc-300">
            <p><strong className="text-white">Paquetes:</strong> Todo incluido. Un solo precio.</p>
            <p><strong className="text-white">Montajes:</strong> Solo lo básico. Más económico.</p>
            <p><strong className="text-white">Servicios:</strong> Añade lo que necesites.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Helper Component para Event Cards */
function EventCard({ event, idx, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-8 min-h-[200px] 
        bg-gradient-to-br ${event.color} 
        border-2 ${event.borderColor}
        backdrop-blur-sm transition-all hover:scale-105`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${event.accentColor}`} />
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {event.name}
        </h3>
        <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors">
          <span className="text-sm font-medium">Ver paquetes</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  );
}

/* PAQUETES - Diseño corporativo profesional */
function PackagesPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    { id: "bodas", name: "Bodas", color: "from-slate-600/20 to-slate-700/20", borderColor: "border-slate-500/30 hover:border-slate-400/60", accentColor: "bg-slate-400" },
    { id: "quinceaneros", name: "Quinceañeros", color: "from-zinc-600/20 to-zinc-700/20", borderColor: "border-zinc-500/30 hover:border-zinc-400/60", accentColor: "bg-zinc-400" },
    { id: "proms", name: "Proms / Graduaciones", color: "from-gray-600/20 to-gray-700/20", borderColor: "border-gray-500/30 hover:border-gray-400/60", accentColor: "bg-gray-400" },
    { id: "corporativos", name: "Eventos Corporativos", color: "from-neutral-600/20 to-neutral-700/20", borderColor: "border-neutral-500/30 hover:border-neutral-400/60", accentColor: "bg-neutral-400" },
    { id: "cumpleanos", name: "Cumpleaños / Sociales", color: "from-stone-600/20 to-stone-700/20", borderColor: "border-stone-500/30 hover:border-stone-400/60", accentColor: "bg-stone-400" },
  ];

  if (!selectedEvent) {
    return (
      <>
        <section className="pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="#home" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Volver
            </a>
          </div>
        </section>

        <Section className="pt-0">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selecciona tu tipo de evento
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Paquetes diseñados específicamente para cada ocasión
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Móvil: Stack vertical */}
            <div className="grid grid-cols-1 md:hidden gap-6">
              {events.map((event, idx) => (
                <EventCard key={event.id} event={event} idx={idx} onClick={() => setSelectedEvent(event.id)} />
              ))}
            </div>

            {/* Desktop: 3 arriba + 2 abajo centradas */}
            <div className="hidden md:block space-y-6">
              {/* Fila 1: 3 cards */}
              <div className="grid grid-cols-3 gap-6">
                {events.slice(0, 3).map((event, idx) => (
                  <EventCard key={event.id} event={event} idx={idx} onClick={() => setSelectedEvent(event.id)} />
                ))}
              </div>
              
              {/* Fila 2: 2 cards centradas */}
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                {events.slice(3, 5).map((event, idx) => (
                  <EventCard key={event.id} event={event} idx={idx + 3} onClick={() => setSelectedEvent(event.id)} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      </>
    );
  }

  // Mostrar paquetes
  const eventName = ["Bodas", "Quinceañeros", "Proms", "Eventos Corporativos", "Cumpleaños / Sociales"][
    ["bodas", "quinceaneros", "proms", "corporativos", "cumpleanos"].indexOf(selectedEvent)
  ];
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Paquetes para {eventName}
          </h1>
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
                Cotizar
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">
            ¿Prefieres solo montaje DJ?
          </p>
          <a href="#montajes" className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors inline-block">
            Ver montajes (opción económica)
          </a>
        </div>
      </Section>
    </>
  );
}


/* ===========================
   CARRUSEL + LIGHTBOX COMPONENT
   =========================== */

function ImageCarousel({ images, alt }) {
  // Validación segura
  if (!images || images.length === 0) {
    return <div className="h-48 bg-zinc-900 rounded-xl" />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextImage();
    if (distance < -minSwipeDistance) prevImage();
  };


  return (
    <>
      <div 
        className="relative h-48 overflow-hidden cursor-pointer group"
        onClick={openLightbox}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${alt} - ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-6 h-6" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-8 h-8 rotate-180" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/* MONTAJES - Sin precios, con modal de cotización */
function MontajesPage() {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    personas: "",
    lugar: "",
    nombre: "",
    whatsapp: ""
  });

  const extrasDisponibles = [
    { id: "pista", name: "Pista de Baile LED", price: "$850-$1,100" },
    { id: "photobooth", name: "Photo Booth 360°", price: "$450-$550" },
    { id: "efectos", name: "Efectos Especiales", price: "Desde $250" },
    { id: "fotografia", name: "Fotografía Profesional", price: "Desde $350" },
    { id: "iluminacion", name: "Iluminación Extra", price: "Por cotización" },
    { id: "animacion", name: "Animación & MC", price: "Desde $450" },
  ];

  const toggleExtra = (id) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const enviarWhatsApp = () => {
    if (!formData.nombre || !formData.whatsapp) {
      alert("Por favor completa tu nombre y WhatsApp");
      return;
    }

    const extrasTexto = selectedExtras.length > 0
      ? `\n\n🎉 SERVICIOS ADICIONALES:\n${selectedExtras.map(id => {
          const extra = extrasDisponibles.find(e => e.id === id);
          return `• ${extra.name}: ${extra.price}`;
        }).join('\n')}`
      : "";

    const mensaje = `Hola ${formData.nombre}! 👋

Aquí están los precios para tu evento:

🎧 MONTAJES DJ:
• Sencillo: $550 (4 hrs)
• Mediano: $750 (5 hrs) ⭐ Más popular
• Premium: $850 (5 hrs)${extrasTexto}

📋 Info de tu evento:
• Fecha: ${formData.fecha || "Por definir"}
• Personas: ${formData.personas || "Por definir"}
• Lugar: ${formData.lugar || "Por definir"}

¿Te interesa alguno? Responde y coordinamos!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setShowPriceModal(false);
  };

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="#home" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
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
            Solo DJ + Sonido + Luces básicas
          </p>
        </div>

        {/* Montajes sin precios ni botones */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {montajes.map((setup, idx) => (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`rounded-2xl ${glass} overflow-hidden ${
                setup.id === "mediano" ? "ring-2 ring-white/20" : ""
              }`}
            >
              {/* Badge MÁS POPULAR */}
              {setup.id === "mediano" && (
                <div className="p-4 pb-0">
                  <span className="inline-block text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                    🏆 MÁS POPULAR
                  </span>
                </div>
              )}

              {/* CARRUSEL DE FOTOS */}
              <div className="p-4 pb-0">
                <ImageCarousel images={setup.images} alt={setup.name} />
              </div>

              {/* Info */}
              <div className="p-8 pt-6">
                <h3 className="text-2xl font-bold text-white mb-6">{setup.name}</h3>
                
                <ul className="space-y-2">
                  {setup.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTÓN GRANDE PARA VER PRECIOS */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowPriceModal(true)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full text-xl font-bold hover:bg-zinc-200 transition-all hover:scale-105 shadow-2xl"
          >
            💰 Ver Precios de Montajes <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Link a paquetes completos */}
        <div className="text-center">
          <p className="text-zinc-400 mb-4">
            ¿Buscas algo más completo?
          </p>
          <a href="#paquetes" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors">
            Ver paquetes completos <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </Section>

      {/* MODAL DE COTIZACIÓN */}
      <AnimatePresence>
        {showPriceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPriceModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Recibe los precios al instante</h2>
                <button
                  onClick={() => setShowPriceModal(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Checkboxes de extras */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  ¿Te interesan servicios adicionales? (opcional)
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {extrasDisponibles.map((extra) => (
                    <label
                      key={extra.id}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                        selectedExtras.includes(extra.id)
                          ? "bg-white/10 border-2 border-white/30"
                          : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm text-white font-medium">{extra.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formulario */}
              <div className="space-y-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">📅 ¿Cuándo es tu evento?</label>
                    <input
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">👥 ¿Cuántas personas?</label>
                    <input
                      type="number"
                      placeholder="100"
                      value={formData.personas}
                      onChange={(e) => setFormData({...formData, personas: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">📍 ¿Dónde será?</label>
                  <input
                    placeholder="Nombre del salón o lugar"
                    value={formData.lugar}
                    onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">Tu nombre *</label>
                      <input
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">WhatsApp *</label>
                      <input
                        placeholder="787-XXX-XXXX"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón enviar */}
              <button
                onClick={enviarWhatsApp}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-bold transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                Enviar y recibir precios
              </button>

              <p className="text-xs text-zinc-500 text-center mt-4">
                * Campos requeridos. Recibirás los precios al instante por WhatsApp.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/* ===========================
   INDIVIDUAL SERVICE PAGES - VERSIÓN COMPLETA
   =========================== */

function IndividualServicePage({ slug }) {
  const serviceData = {
    "pistas-de-baile": {
      title: "Pistas de Baile LED",
      subtitle: "Iluminación interactiva para tu evento",
      hero: "/pista-hero.jpg",
      description: "Transforma tu pista de baile con tecnología LED de última generación. Dos modelos disponibles con instalación profesional incluida.",
      
      packages: [
        {
          name: "Pista 3D, Mirror & Frost",
          image: "/pista-3d.jpg",
          sizes: [
            { size: "10x10", price: "$850" },
            { size: "12x12", price: "$950" },
            { size: "14x14", price: "$1,050" },
            { size: "16x16", price: "$1,100" },
          ],
          features: [
            "Efectos 3D interactivos",
            "Acabado espejo",
            "Efecto frost (escarcha)",
            "Instalación profesional",
            "Técnico dedicado",
          ]
        },
        {
          name: "Pista Blanca con Puntos LED",
          image: "/pista-blanca.jpg",
          sizes: [
            { size: "10x10", price: "$750" },
            { size: "12x12", price: "$850" },
            { size: "14x14", price: "$950" },
            { size: "16x16", price: "$1,000" },
          ],
          features: [
            "Puntos LED programables",
            "Base blanca elegante",
            "Múltiples patrones",
            "Instalación profesional",
            "Técnico dedicado",
          ]
        }
      ]
    },

    "fotografia": {
      title: "Fotografía Profesional",
      subtitle: "Captura cada momento especial",
      hero: "/foto-hero.jpg",
      description: "Cobertura fotográfica completa de tu evento con equipo profesional y entrega digital.",
      
      package: {
        name: "Paquete Básico",
        price: "Desde $XXX",
        image: "/foto-paquete.jpg",
        duration: "4 horas",
        includes: [
          "1 cámara profesional de alta resolución",
          "1 flash profesional",
          "1 fotógrafo experimentado",
          "Cobertura completa del evento",
          "Recorrido por todas las áreas",
          "4 horas de servicio",
          "Todas las fotos capturadas",
          "Entrega digital por link de descarga",
          "Edición básica de color",
        ]
      }
    },

    "photo-booths": {
      title: "Photo Booths",
      subtitle: "Recuerdos instantáneos para tus invitados",
      hero: "/photobooth-hero.jpg",
      description: "Experiencias fotográficas interactivas que tus invitados amarán. Desde cabinas 360° hasta clásicas estáticas.",
      
      packages: [
        {
          name: "Photo Booth 360°",
          image: "/booth-360.jpg",
          prices: [
            { duration: "2 horas", price: "$450" },
            { duration: "3 horas", price: "$550" },
          ],
          features: [
            "Plataforma giratoria profesional",
            "Cámara de alta velocidad",
            "Videos en cámara lenta",
            "Entrega digital instantánea",
            "Operador dedicado",
            "Props y accesorios incluidos",
            "Branding personalizable",
          ]
        },
        {
          name: "Photo Booth Estático",
          image: "/booth-estatico.jpg",
          prices: [
            { duration: "2 horas", price: "$400" },
          ],
          features: [
            "Cabina profesional",
            "Impresión instantánea",
            "Compartir por redes sociales",
            "Entrega digital",
            "Operador dedicado",
            "Props y accesorios incluidos",
            "Backdrop personalizable",
          ]
        },
      ],

      optional: {
        name: "Cabina Inflable",
        price: "+$150",
        image: "/cabina-inflable.jpg",
        specs: "10' x 10' x 8' (alto)",
        features: [
          "Cabina inflable completa",
          "Iluminación LED integrada",
          "Espacio para 6-8 personas",
          "Montaje e instalación incluidos",
        ]
      }
    },

    "efectos-especiales": {
      title: "Efectos Especiales",
      subtitle: "Momentos mágicos e inolvidables",
      hero: "/efectos-hero.jpg",
      description: "Crea momentos wow con nuestros efectos especiales profesionales. Desde chispas frías hasta máquinas de humo.",
      
      effects: [
        {
          name: "Chispas Frías",
          price: "$350",
          image: "/chispas.jpg",
          specs: "3 tiros de 15 segundos",
          features: [
            "Pirotecnia segura (fría al tacto)",
            "3 disparos de 15 segundos cada uno",
            "Altura hasta 15 pies",
            "Ideal para primer baile",
            "Técnico certificado incluido",
            "Seguro y aprobado en venues",
          ]
        },
        {
          name: "Máquinas de Humo Vertical",
          price: "$250",
          image: "/humo-vertical.jpg",
          specs: "2 máquinas incluidas",
          features: [
            "2 máquinas profesionales",
            "Tiros prácticamente ilimitados",
            "Efecto columna vertical",
            "Fluido profesional incluido",
            "Control remoto",
            "Técnico dedicado",
          ]
        },
        {
          name: "Máquina de Confeti",
          price: "Por cotización",
          image: "/confeti.jpg",
          features: [
            "Lanzamiento aéreo profesional",
            "Confeti biodegradable disponible",
            "Control de timing preciso",
            "Sujeto a permisos del venue",
          ]
        },
        {
          name: "Máquina de Espuma",
          price: "Por cotización",
          image: "/espuma.jpg",
          features: [
            "Espuma profesional no tóxica",
            "Ideal para fiestas juveniles",
            "Cañón de alta potencia",
            "Sujeto a permisos del venue",
          ]
        },
        {
          name: "Humo Bajo (Baile en Nubes)",
          price: "Por cotización",
          image: "/humo-bajo.jpg",
          features: [
            "Efecto de nube baja",
            "Humo denso que permanece abajo",
            "Ideal para primer baile",
            "Máquina profesional de hielo seco",
          ]
        },
      ]
    },

    "sonido-profesional": {
      title: "Sonido Profesional Line Array",
      subtitle: "Audio de calidad para cualquier evento",
      hero: "/sonido-hero.jpg",
      description: "Sistemas de sonido profesional desde eventos íntimos hasta conciertos. Técnicos certificados y equipo de primera línea.",
      
      systemBase: {
        name: "Sistema Base Line Array",
        image: "/sonido-base.jpg",
        note: "Precio por cotización según evento",
        includes: [
          "6 bocinas Line Array dB-Technologies T8",
          "Cada una con bocinas internas de 8\", 6.5\" y drivers de 1\"",
          "2 subwoofers dB-Technologies S30",
          "Cada uno con 2 bocinas de 18\"",
          "Sistema de networking y ecualización avanzada",
          "Consola digital MIDAS M32 para mezcla profesional",
          "Técnico de sonido dedicado",
          "Ecualización, ajustes en vivo y supervisión",
          "Cablería profesional completa (señal, corriente, networking)",
          "Stands y accesorios para montaje seguro",
          "6 micrófonos inalámbricos Shure",
          "Microfonería, cablería y stands para bandas",
          "Montaje y desmontaje antes/después del evento",
          "Precio especial para 2 días consecutivos sin desmontaje",
        ]
      },

      systemComplete: {
        name: "Sistema Completo (Eventos Grandes)",
        image: "/sonido-completo.jpg",
        note: "Cotización personalizada según especificaciones",
        specs: [
          "Hasta 24 cajas de bocinas Line Array",
          "Hasta 8 bajos dobles de alta potencia",
          "Microfonería profesional completa",
          "Apto para bandas, artistas, exterior/interior",
          "Cualquier capacidad de público",
        ],
        quoteFactors: [
          "Artistas o bandas participantes",
          "Ubicación del evento (interior/exterior)",
          "Capacidad del venue",
          "Cantidad de personas esperadas",
          "Croquis y especificaciones técnicas",
          "Riders técnicos de artistas",
        ]
      },

      gallery: [
        "/sonido-1.jpg",
        "/sonido-2.jpg",
        "/sonido-3.jpg",
        "/sonido-4.jpg",
      ]
    },

    "iluminacion-trussing": {
      title: "Iluminación & Trussing",
      subtitle: "Diseño lumínico profesional",
      hero: "/luces-hero.jpg",
      description: "Desde iluminación básica hasta shows de luces completos. Estructuras trussing de cualquier tamaño para tu evento.",
      
      note: "Cotización personalizada según el tipo de evento y necesidades específicas",

      lighting: {
        name: "Equipos de Iluminación",
        inventory: [
          "16+ Moving Heads Gobo (efectos proyectados)",
          "36+ luces móviles Wash (barrido de color)",
          "Barras LED profesionales",
          "Color Strikes Chauvet",
          "Sistemas laser profesionales",
          "Técnicos profesionales de iluminación",
        ]
      },

      trussing: {
        name: "Estructuras Trussing",
        options: [
          "Estructuras de cualquier tipo y tamaño",
          "Diseños totalmente personalizables",
          "Desde montajes básicos hasta complejos",
          "Arcos, torres, grids, estructuras aéreas",
          "Instalación profesional certificada",
        ]
      },

      applications: [
        {
          name: "Obras de Teatro",
          image: "/luces-teatro.jpg",
          description: "Iluminación dramática y control de escena"
        },
        {
          name: "Conciertos",
          image: "/luces-concierto.jpg",
          description: "Shows de luces sincronizados con música"
        },
        {
          name: "Eventos Corporativos",
          image: "/luces-corporativo.jpg",
          description: "Iluminación elegante con branding"
        },
        {
          name: "Bodas y Sociales",
          image: "/luces-boda.jpg",
          description: "Ambientación romántica y festiva"
        },
      ],

      levels: [
        {
          level: "Básico",
          description: "2-4 luces en tarima con control básico",
          image: "/setup-basico.jpg"
        },
        {
          level: "Intermedio",
          description: "8-12 luces con estructuras y control avanzado",
          image: "/setup-medio.jpg"
        },
        {
          level: "Completo",
          description: "16+ luces, estructuras complejas, nivel plaza pública",
          image: "/setup-completo.jpg"
        },
      ],

      gallery: [
        "/luces-1.jpg",
        "/luces-2.jpg",
        "/luces-3.jpg",
        "/luces-4.jpg",
        "/luces-5.jpg",
        "/luces-6.jpg",
      ]
    },

    "pantallas-visuales": {
      title: "Pantallas & Visuales",
      subtitle: "Proyección de alta calidad",
      hero: "/pantallas-hero.jpg",
      description: "Pantallas LED modulares y sistemas de proyección profesional para presentaciones, videos y contenido visual.",
      
      ledScreen: {
        name: "Pantalla LED Modular",
        image: "/pantalla-led.jpg",
        recommended: {
          size: "13' x 7'",
          price: "Desde $1,000",
          note: "Precio final según montaje y ubicación"
        },
        features: [
          "Pantalla LED de alta resolución",
          "Tamaño modular completamente ajustable",
          "Tamaño recomendado: 13 pies x 7 pies",
          "Cualquier tamaño disponible bajo pedido",
          "Instalación y montaje profesional",
          "Técnico dedicado para operación",
          "Ideal para videos, presentaciones, livestreams",
        ],
        customSizes: "Configuraciones personalizadas disponibles según necesidades del evento"
      },

      projection: {
        name: "Sistema de Proyección",
        image: "/proyector.jpg",
        price: "Por cotización",
        features: [
          "Pantalla de proyección profesional",
          "Proyectores de alta luminosidad",
          "Múltiples tamaños disponibles",
          "Ideal para presentaciones corporativas",
          "Montaje incluido",
        ]
      },

      applications: [
        "Bodas (videos, fotos, livestream)",
        "Eventos corporativos (presentaciones)",
        "Conciertos (visuales sincronizados)",
        "Conferencias y seminarios",
        "Fiestas (videos musicales, karaoke)",
      ]
    },

    "animacion-coordinacion": {
      title: "Animación & Coordinación",
      subtitle: "Profesionales para el éxito de tu evento",
      hero: "/animacion-hero.jpg",
      description: "Red de profesionales verificados para animar, coordinar y decorar tu evento. Servicios integrados en tu cotización de DJ EDY.",
      
      services: [
        {
          name: "Animador Profesional",
          price: "Desde $450",
          duration: "4 horas de servicio",
          image: "/animador.jpg",
          features: [
            "Interacción constante con invitados",
            "Dinamismo y energía durante el evento",
            "Juegos y actividades grupales",
            "Coordinación de sorpresas",
            "Experiencia en todo tipo de eventos",
            "Manejo de micrófono y público",
          ]
        },
        {
          name: "Coordinador de Eventos",
          price: "Por cotización",
          image: "/coordinador.jpg",
          features: [
            "Planificación y timeline del evento",
            "Coordinación con todos los proveedores",
            "Supervisión de montaje y desmontaje",
            "Solución de problemas en tiempo real",
            "Asegura que todo fluya según plan",
            "Experiencia profesional verificada",
          ]
        },
        {
          name: "Decorador",
          price: "Por cotización",
          image: "/decorador.jpg",
          features: [
            "Diseño y concepto decorativo",
            "Montaje de decoración completo",
            "Coordinación con tema del evento",
            "Múltiples estilos disponibles",
            "Profesionales con portafolio verificado",
          ]
        },
      ],

      note: "Todos estos servicios se incluyen directamente en tu cotización de DJ EDY. Trabajamos con una red de profesionales de confianza con experiencia comprobada."
    },
  };

  const service = serviceData[slug];

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

  // RENDER ESPECÍFICO POR TIPO DE SERVICIO
  return (
    <>
      {/* Header con botón volver */}
      <section className="pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a servicios
          </a>
        </div>
      </section>

      {/* Hero Section */}
      <Section className="pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-2xl text-zinc-400 mb-6">{service.subtitle}</p>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>

          {/* Imagen hero si existe */}
          {service.hero && (
            <div className="mb-16 rounded-2xl overflow-hidden">
              <img src={service.hero} alt={service.title} className="w-full h-96 object-cover" />
            </div>
          )}

          {/* PISTAS DE BAILE */}
          {slug === "pistas-de-baile" && service.packages && (
            <div className="space-y-12">
              {service.packages.map((pkg, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${glass}`}>
                  <h3 className="text-3xl font-bold text-white mb-6">{pkg.name}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <img src={pkg.image} alt={pkg.name} className="rounded-xl w-full h-64 object-cover" />
                    
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Incluye:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pkg.sizes.map((s, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 text-center">
                        <p className="text-2xl font-bold text-white">{s.size}</p>
                        <p className="text-xl text-zinc-400 mt-2">{s.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOTOGRAFÍA */}
          {slug === "fotografia" && service.package && (
            <div className={`p-8 rounded-2xl ${glass}`}>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <img src={service.package.image} alt={service.package.name} className="rounded-xl w-full h-80 object-cover" />
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{service.package.name}</h3>
                  <p className="text-2xl text-zinc-400 mb-2">{service.package.price}</p>
                  <p className="text-lg text-zinc-500 mb-6">{service.package.duration}</p>
                  
                  <ul className="space-y-2">
                    {service.package.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PHOTO BOOTHS */}
          {slug === "photo-booths" && service.packages && (
            <div className="space-y-8">
              {service.packages.map((pkg, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${glass}`}>
                  <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    <div 
                      className="rounded-xl bg-cover bg-center min-h-[400px]"
                      style={{ backgroundImage: `url(${pkg.image})` }}
                    />
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">{pkg.name}</h3>
                      <div className="mb-6">
                        {pkg.prices.map((p, i) => (
                          <div key={i} className="flex justify-between items-center mb-2">
                            <span className="text-zinc-300">{p.duration}</span>
                            <span className="text-2xl font-bold text-white">{p.price}</span>
                          </div>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {service.optional && (
                <div className="p-8 rounded-2xl bg-white/5 border-2 border-white/10">
                  <div className="text-center mb-6">
                    <span className="text-sm font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                      OPCIONAL
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    <div
                      className="rounded-xl w-full min-h-[300px]"
                      style={{
                        backgroundImage: `url(${service.optional.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{service.optional.name}</h3>
                      <p className="text-2xl text-zinc-400 mb-2">{service.optional.price}</p>
                      <p className="text-lg text-zinc-500 mb-6">{service.optional.specs}</p>
                      <ul className="space-y-2">
                        {service.optional.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EFECTOS ESPECIALES */}
          {slug === "efectos-especiales" && service.effects && (
            <div className="grid md:grid-cols-2 gap-6">
              {service.effects.map((effect, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${glass}`}>
                  <img src={effect.image} alt={effect.name} className="rounded-xl w-full h-48 object-cover mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{effect.name}</h3>
                  <p className="text-xl text-zinc-400 mb-1">{effect.price}</p>
                  {effect.specs && <p className="text-sm text-zinc-500 mb-4">{effect.specs}</p>}
                  <ul className="space-y-2">
                    {effect.features.map((f, i) => (
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

          {/* SONIDO PROFESIONAL */}
          {slug === "sonido-profesional" && (
            <div className="space-y-8">
              <div className={`p-8 rounded-2xl ${glass}`}>
                <h3 className="text-3xl font-bold text-white mb-2">{service.systemBase.name}</h3>
                <p className="text-lg text-yellow-400 mb-6">{service.systemBase.note}</p>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <img src={service.systemBase.image} alt={service.systemBase.name} className="rounded-xl w-full h-80 object-cover" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Sistema incluye:</h4>
                    <ul className="space-y-2">
                      {service.systemBase.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border-2 border-white/10">
                <h3 className="text-3xl font-bold text-white mb-2">{service.systemComplete.name}</h3>
                <p className="text-lg text-yellow-400 mb-6">{service.systemComplete.note}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Especificaciones:</h4>
                    <ul className="space-y-2 mb-6">
                      {service.systemComplete.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Factores de cotización:</h4>
                    <ul className="space-y-2">
                      {service.systemComplete.quoteFactors.map((factor, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <span className="text-white">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {service.gallery && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Galería</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.gallery.map((img, i) => (
                      <img key={i} src={img} alt={`Sonido ${i + 1}`} className="rounded-xl w-full h-48 object-cover" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ILUMINACIÓN & TRUSSING */}
          {slug === "iluminacion-trussing" && (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-yellow-400 mb-8">{service.note}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className={`p-6 rounded-2xl ${glass}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.lighting.name}</h3>
                  <ul className="space-y-2">
                    {service.lighting.inventory.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-6 rounded-2xl ${glass}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.trussing.name}</h3>
                  <ul className="space-y-2">
                    {service.trussing.options.map((opt, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {service.applications && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">Aplicaciones</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.applications.map((app, i) => (
                      <div key={i} className={`p-6 rounded-2xl ${glass}`}>
                        <img src={app.image} alt={app.name} className="rounded-xl w-full h-48 object-cover mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">{app.name}</h4>
                        <p className="text-zinc-400">{app.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.levels && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">Niveles de Setup</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {service.levels.map((level, i) => (
                      <div key={i} className={`p-6 rounded-2xl ${glass} text-center`}>
                        <img src={level.image} alt={level.level} className="rounded-xl w-full h-48 object-cover mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-2">{level.level}</h4>
                        <p className="text-zinc-400">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.gallery && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Galería de Proyectos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.gallery.map((img, i) => (
                      <img key={i} src={img} alt={`Iluminación ${i + 1}`} className="rounded-xl w-full h-56 object-cover" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PANTALLAS & VISUALES */}
          {slug === "pantallas-visuales" && (
            <div className="space-y-8">
              <div className={`p-8 rounded-2xl ${glass}`}>
                <h3 className="text-3xl font-bold text-white mb-6">{service.ledScreen.name}</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <img src={service.ledScreen.image} alt={service.ledScreen.name} className="rounded-xl w-full h-80 object-cover" />
                  <div>
                    <div className="mb-6 p-4 rounded-xl bg-white/5">
                      <p className="text-sm text-zinc-400">Tamaño recomendado</p>
                      <p className="text-3xl font-bold text-white">{service.ledScreen.recommended.size}</p>
                      <p className="text-xl text-zinc-400 mt-2">{service.ledScreen.recommended.price}</p>
                      <p className="text-sm text-zinc-500 mt-2">{service.ledScreen.recommended.note}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.ledScreen.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-zinc-400 italic">{service.ledScreen.customSizes}</p>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl ${glass}`}>
                <div className="grid md:grid-cols-2 gap-8">
                  <img src={service.projection.image} alt={service.projection.name} className="rounded-xl w-full h-64 object-cover" />
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{service.projection.name}</h3>
                    <p className="text-xl text-yellow-400 mb-6">{service.projection.price}</p>
                    <ul className="space-y-2">
                      {service.projection.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {service.applications && (
                <div className={`p-6 rounded-2xl ${glass}`}>
                  <h4 className="text-xl font-semibold text-white mb-4">Aplicaciones ideales:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {service.applications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300">
                        <Check className="w-5 h-5 text-white flex-shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ANIMACIÓN & COORDINACIÓN */}
          {slug === "animacion-coordinacion" && service.services && (
            <div className="space-y-8">
              {service.services.map((svc, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${glass}`}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <img src={svc.image} alt={svc.name} className="rounded-xl w-full h-64 object-cover" />
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{svc.name}</h3>
                      <p className="text-2xl text-zinc-400 mb-1">{svc.price}</p>
                      {svc.duration && <p className="text-lg text-zinc-500 mb-6">{svc.duration}</p>}
                      <ul className="space-y-2">
                        {svc.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-zinc-300 text-center">
                  <strong className="text-white">Nota:</strong> {service.note}
                </p>
              </div>
            </div>
          )}

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <p className="text-zinc-400 mb-6 text-lg">¿Te interesa este servicio?</p>
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
            >
              Cotizar ahora <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}



/* SERVICIOS - Lista visual actualizada como home */
function ServicesPage() {
  const serviciosConFotos = [
    { name: "Pista de Baile", image: "/pista-led-service.jpg", href: "#servicio/pistas-de-baile", desc: "LED iluminada · Diferentes tamaños" },
    { name: "Fotografía", image: "/fotografia-service.png", href: "#servicio/fotografia", desc: "Cobertura completa" },
    { name: "Photo Booths", image: "/photobooth-service.png", href: "#servicio/photo-booths", desc: "360° · Estático · Digital" },
    { name: "Efectos Especiales", image: "/efectos-service.jpg", href: "#servicio/efectos-especiales", desc: "Chispas · Confeti · Humo" },
    { name: "Sonido", image: "/sonido-service.jpg", href: "#servicio/sonido-profesional", desc: "Line Array · Técnico dedicado" },
    { name: "Iluminación & Trussing", image: "/iluminacion-service.jpg", href: "#servicio/iluminacion-trussing", desc: "Moving Heads · LED · Estructuras" },
    { name: "Pantallas / Visuales", image: "/pantallas-service.png", href: "#servicio/pantallas-visuales", desc: "Pantallas LED · Proyección" },
    { name: "Animación & Coordinación", image: "/animacion-service.png", href: "#servicio/animacion-coordinacion", desc: "MC · Animador · Coordinador" },
  ];

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="#home" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Volver
          </a>
        </div>
      </section>

      <Section id="servicios" className="pt-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Servicios Disponibles
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Complementa tu paquete o montaje con estos servicios
          </p>
        </div>

        {/* GRID DE SERVICIOS - Igual que home */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {serviciosConFotos.slice(0, 2).map((servicio, idx) => (
            <ServiceCardLarge key={idx} {...servicio} delay={idx * 0.1} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {serviciosConFotos.slice(2, 4).map((servicio, idx) => (
            <ServiceCardLarge key={idx} {...servicio} delay={(idx + 2) * 0.1} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {serviciosConFotos.slice(4, 6).map((servicio, idx) => (
            <ServiceCardLarge key={idx} {...servicio} delay={(idx + 4) * 0.1} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {serviciosConFotos.slice(6, 8).map((servicio, idx) => (
            <ServiceCardLarge key={idx} {...servicio} delay={(idx + 6) * 0.1} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-zinc-400 mb-4 text-lg">¿Listo para cotizar tu evento?</p>
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
          >
            Cotizar mi evento <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </Section>
    </>
  );
}

/* Helper para cards de servicios grandes */
function ServiceCardLarge({ href, image, name, desc, delay }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-3xl min-h-[400px] hover:scale-[1.01] transition-transform block"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      
      {/* Título centrado arriba */}
      <div className="absolute top-0 left-0 right-0 pt-8 px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{name}</h3>
        <p className="text-base text-white/80">{desc}</p>
      </div>
      
      <div className="relative h-full p-8 flex items-end justify-center">
        <div className="flex items-center gap-2 text-white font-semibold">
          Ver más <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.a>
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
   CONTACTO - REDISEÑADO CON BOTONES GRANDES
   ======== */
function Contact() {
  return (
    <Section id="contacto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Hablemos de tu evento
        </h2>
        <p className="text-lg text-zinc-400">
          Elige tu forma favorita de contactarnos
        </p>
      </div>

      {/* BOTONES PRINCIPALES - WhatsApp y Llamar */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 hover:border-green-500/50 transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-green-400 font-medium">(787) 356-8786</p>
              <p className="text-sm text-zinc-400 mt-2">Respuesta inmediata</p>
            </div>
          </div>
        </a>

        <a
          href={`tel:+1${WHATSAPP_NUMBER}`}
          className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Llamar</h3>
              <p className="text-blue-400 font-medium">(787) 356-8786</p>
              <p className="text-sm text-zinc-400 mt-2">Habla directo con nosotros</p>
            </div>
          </div>
        </a>
      </div>

      {/* REDES SOCIALES Y EMAIL */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a
          href="https://instagram.com/dj_edy3"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Instagram</h4>
              <p className="text-sm text-zinc-400 mt-1">@dj_edy3</p>
            </div>
          </div>
        </a>

        <a
          href="https://www.facebook.com/share/1CCCxKhjC8/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Facebook</h4>
              <p className="text-sm text-zinc-400 mt-1">Dj Edy</p>
            </div>
          </div>
        </a>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Email</h4>
              <p className="text-sm text-zinc-400 mt-1">djedypr@gmail.com</p>
            </div>
          </div>
        </a>
      </div>

      {/* UBICACIÓN */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 text-zinc-300">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">Servicio a todo Puerto Rico</span>
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

  // Sub-páginas de servicios individuales: #servicio/<slug>
  const serviceSlug = hash.startsWith("#servicio/")
    ? decodeURIComponent(hash.slice("#servicio/".length))
    : null;

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

      {serviceSlug ? (
        <>
          <IndividualServicePage slug={serviceSlug} />
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
