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
      "Pantalla TV 32\" Opcional",
      "Karaoke / Just Dance",
      "1 micrófono inalámbrico",
      "DJ Booth iluminado",
      "2 luces Party LED",
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
      "Pantalla gigante 100\" o TV 55\"",
      "Karaoke / Just Dance",
      "2 micrófonos inalámbricos",
      "DJ Booth iluminado",
      "2 trussing iluminados",
      "2 luces Moving Heads",
      "Máquina de humo o haze",
      "Mixeo de música en vivo",
      "Animación desde el DJ Stage",
      "5 horas",
    ],
    ideal: "Eventos medianos (50-150 personas)",
  },
  {
    id: "premium",
    name: "Montaje Premium",
    price: "Desde $XXX",
    images: ["/montaje-Premium.jpg", "/montaje-Premium-2.PNG", "/montajeSencillo.jpg", "/montaje-Premium-3.jpg"],  // ← images plural
    features: [
      "2 pantallas TV 55\"",
      "Karaoke / Just Dance",
      "2 micrófonos inalámbricos",
      "DJ Booth iluminado",
      "2 trussing iluminados",
      "2 luces Moving Heads Gobo",
      "2 luces Moving Heads BeeEye",
      "Máquina de humo o haze",
      "Mixeo de música en vivo",
      "Animación desde el DJ Stage",
      "5 horas",
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

/* MONTAJES - Layout 3+4 con servicios actualizados */
function MontajesPage() {
  const [showPriceFlow, setShowPriceFlow] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    personas: "",
    lugar: "",
    nombre: "",
    whatsapp: "",
    email: ""
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);

  const serviciosAdicionales = [
    // FILA 1 - 3 GRANDES
    { id: "pista", name: "Pista de Baile LED", image: "/pista-led-service.jpg", size: "large" },
    { id: "luces", name: "Luces de Ambientación", image: "/luces-ambiente-service.jpg", size: "large" },
    { id: "sonido", name: "Sonido Ceremonias o Cocteles", image: "/sonido-ceremonia-service.jpg", size: "large" },
    
    // FILA 2 - 4 PEQUEÑAS
    { id: "fotografia", name: "Fotografía", image: "/fotografia-service.png", size: "small" },
    { id: "photobooth", name: "Photo Booth 360°", image: "/photobooth-service.png", size: "small" },
    { id: "chispas", name: "Chispas Frías", image: "/chispas-frias-service.jpg", size: "small" },
    { id: "animacion", name: "Animación & MC", image: "/animacion-service.png", size: "small" },
  ];

  const toggleExtra = (id) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const continuarAFormulario = () => {
    setStep(2);
  };

  const enviarSolicitud = async () => {
    // Validación
    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor escribe tu nombre");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMessage("Por favor escribe tu número de WhatsApp");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (formData.whatsapp.length !== 10) {
      setErrorMessage("El WhatsApp debe tener 10 dígitos");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setSending(true);

    try {
      const extrasSeleccionados = serviciosAdicionales.filter(s => selectedExtras.includes(s.id));
      const extrasTexto = extrasSeleccionados.length > 0
        ? extrasSeleccionados.map(e => `- ${e.name}`).join('\n')
        : "Ninguno";

      const templateParams = {
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        email: formData.email || "No proporcionó",
        fecha: formData.fecha || "Por definir",
        personas: formData.personas || "Por definir",
        lugar: formData.lugar || "Por definir",
        extras: extrasTexto
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_hik8xkn',
          template_id: 'template_eiagx3a',
          user_id: 'rITQraGRa7eL9gr9P',
          template_params: templateParams
        })
      });

      if (response.ok) {
        setStep(3);
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      setErrorMessage("Error al enviar. Intenta de nuevo.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setSending(false);
    }
  };

  const resetFlow = () => {
    setShowPriceFlow(false);
    setStep(1);
    setSelectedExtras([]);
    setFormData({ fecha: "", personas: "", lugar: "", nombre: "", whatsapp: "", email: "" });
  };

  const largeServices = serviciosAdicionales.filter(s => s.size === "large");
  const smallServices = serviciosAdicionales.filter(s => s.size === "small");

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="#home" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Volver
          </a>
        </div>
      </section>

      {!showPriceFlow ? (
        <Section className="pt-0">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Montajes de DJ
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Solo DJ + Sonido + Luces básicas
            </p>
          </div>

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
                {setup.id === "mediano" && (
                  <div className="p-4 pb-0">
                    <span className="inline-block text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                      MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="p-4 pb-0">
                  <ImageCarousel images={setup.images} alt={setup.name} />
                </div>

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

          <div className="text-center mb-16">
            <button
              onClick={() => setShowPriceFlow(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full text-xl font-bold hover:bg-zinc-200 transition-all hover:scale-105 shadow-2xl"
            >
              Ver Precios de Montajes <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center">
            <p className="text-zinc-400 mb-4">
              ¿Buscas algo más completo?
            </p>
            <a href="#paquetes" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors">
              Ver paquetes completos <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </Section>
      ) : (
        <>
          {/* STEP 1: SELECCIÓN DE EXTRAS CON LAYOUT 3+4 */}
          {step === 1 && (
            <Section className="pt-0">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    ¿Te interesan servicios adicionales?
                  </h2>
                  <p className="text-lg text-zinc-400">
                    Selecciona los que quieras cotizar (opcional)
                  </p>
                </div>

                {/* MOBILE: Primera tarjeta grande + resto en grid 2 columnas */}
                <div className="md:hidden space-y-6 mb-12">
                  {/* Primera tarjeta destacada */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => toggleExtra(serviciosAdicionales[0].id)}
                    className={`w-full relative overflow-hidden rounded-2xl aspect-[16/9] transition-all ${
                      selectedExtras.includes(serviciosAdicionales[0].id)
                        ? "ring-4 ring-white/50 scale-95"
                        : "hover:scale-105"
                    }`}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${serviciosAdicionales[0].image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {selectedExtras.includes(serviciosAdicionales[0].id) && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <Check className="w-5 h-5 text-black" />
                      </div>
                    )}

                    <div className="relative h-full p-4 flex flex-col justify-end">
                      <p className="text-lg font-semibold text-white text-center">
                        {serviciosAdicionales[0].name}
                      </p>
                    </div>
                  </motion.button>

                  {/* Resto en grid 2 columnas */}
                  <div className="grid grid-cols-2 gap-4">
                    {serviciosAdicionales.slice(1).map((servicio, idx) => (
                      <motion.button
                        key={servicio.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (idx + 1) * 0.1 }}
                        onClick={() => toggleExtra(servicio.id)}
                        className={`relative overflow-hidden rounded-2xl aspect-square transition-all ${
                          selectedExtras.includes(servicio.id)
                            ? "ring-4 ring-white/50 scale-95"
                            : "hover:scale-105"
                        }`}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${servicio.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        
                        {selectedExtras.includes(servicio.id) && (
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <Check className="w-5 h-5 text-black" />
                          </div>
                        )}

                        <div className="relative h-full p-4 flex flex-col justify-end">
                          <p className="text-sm font-semibold text-white text-center">
                            {servicio.name}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* DESKTOP: Layout 3 grandes + 4 pequeñas */}
                <div className="hidden md:block space-y-6 mb-12">
                  {/* Fila 1: 3 grandes */}
                  <div className="grid grid-cols-3 gap-6">
                    {largeServices.map((servicio, idx) => (
                      <motion.button
                        key={servicio.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => toggleExtra(servicio.id)}
                        className={`relative overflow-hidden rounded-2xl aspect-[4/3] transition-all ${
                          selectedExtras.includes(servicio.id)
                            ? "ring-4 ring-white/50 scale-95"
                            : "hover:scale-105"
                        }`}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${servicio.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        
                        {selectedExtras.includes(servicio.id) && (
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <Check className="w-5 h-5 text-black" />
                          </div>
                        )}

                        <div className="relative h-full p-4 flex flex-col justify-end">
                          <p className="text-base font-semibold text-white text-center">
                            {servicio.name}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Fila 2: 4 pequeñas */}
                  <div className="grid grid-cols-4 gap-6">
                    {smallServices.map((servicio, idx) => (
                      <motion.button
                        key={servicio.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (idx + 3) * 0.1 }}
                        onClick={() => toggleExtra(servicio.id)}
                        className={`relative overflow-hidden rounded-2xl aspect-square transition-all ${
                          selectedExtras.includes(servicio.id)
                            ? "ring-4 ring-white/50 scale-95"
                            : "hover:scale-105"
                        }`}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${servicio.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        
                        {selectedExtras.includes(servicio.id) && (
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <Check className="w-5 h-5 text-black" />
                          </div>
                        )}

                        <div className="relative h-full p-4 flex flex-col justify-end">
                          <p className="text-sm font-semibold text-white text-center">
                            {servicio.name}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setShowPriceFlow(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={continuarAFormulario}
                    className="px-10 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-zinc-200 transition-colors"
                  >
                    Continuar
                  </button>
                </div>

                {selectedExtras.length > 0 && (
                  <p className="text-center text-sm text-zinc-400 mt-6">
                    {selectedExtras.length} servicio{selectedExtras.length > 1 ? 's' : ''} seleccionado{selectedExtras.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </Section>
          )}

          {/* STEP 2: FORMULARIO */}
          {step === 2 && (
            <Section className="pt-0">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Completa tu información
                  </h2>
                  <p className="text-lg text-zinc-400">
                    Te enviaremos los precios por WhatsApp
                  </p>
                </div>

                <div className={`p-8 rounded-2xl ${glass} space-y-6`}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">¿Cuándo es tu evento?</label>
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">¿Cuántas personas?</label>
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
                    <label className="text-sm text-zinc-400 mb-2 block">¿Dónde será?</label>
                    <input
                      placeholder="Nombre del salón o lugar"
                      value={formData.lugar}
                      onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-zinc-400 mb-2 block">Tu nombre *</label>
                        <input
                          placeholder="Juan Pérez"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-zinc-400 mb-2 block">WhatsApp *</label>
                        <input
                          type="tel"
                          placeholder="7871234567"
                          value={formData.whatsapp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({...formData, whatsapp: value});
                          }}
                          maxLength={10}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        {formData.whatsapp && formData.whatsapp.length < 10 && (
                          <p className="text-xs text-red-400 mt-1">Debe tener 10 dígitos</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-zinc-400 mb-2 block">Email (opcional)</label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      disabled={sending}
                      className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={enviarSolicitud}
                      disabled={sending}
                      className="flex-1 px-6 py-4 bg-white text-black rounded-xl text-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? "Enviando..." : "Solicitar Precios"}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 text-center">
                    * Campos requeridos
                  </p>
                </div>
              </div>
            </Section>
          )}

          {/* STEP 3: CONFIRMACIÓN */}
          {step === 3 && (
            <Section className="pt-0">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-12 rounded-2xl ${glass}`}
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    ¡Solicitud enviada!
                  </h2>
                  
                  <p className="text-lg text-zinc-300 mb-8">
                    Te enviaremos los precios por WhatsApp al{' '}
                    <a 
                      href={`https://wa.me/1${formData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-green-400 hover:text-green-300 underline"
                    >
                      {formData.whatsapp}
                    </a>
                    {' '}en breve.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={resetFlow}
                      className="w-full px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
                    >
                      Volver a Montajes
                    </button>
                    <a
                      href="#home"
                      className="block w-full px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
                    >
                      Ir al Inicio
                    </a>
                  </div>
                </motion.div>
              </div>
            </Section>
          )}
        </>
      )}

      {/* NOTIFICACIÓN DE ERROR */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              <p className="font-medium">{errorMessage}</p>
            </div>
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
    videoRecap: "/pista-recap.mp4",  
    description: "Transforma tu pista de baile con tecnología LED de última generación. Dos modelos disponibles con instalación profesional incluida.",
    
    // Video recap (opcional - si quieres mostrarlo arriba)
    videoRecap: "/pista-recap.mp4",
    
    packages: [
      {
        name: "Pista 3D, Mirror & Frost",
        // Carrusel de fotos en vez de una sola imagen
        images: [
          "/pista-3d-1.jpg"
        ],
        sizes: [
          { size: "10x10"},
          { size: "12x12"},
          { size: "14x14"},
          { size: "16x16"},
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
        // Carrusel de fotos
        images: [
          "/pista-blanca-1.jpg",
          "/pista-blanca-2.JPG",
          "/pista-blanca-3.JPG"
        ],
        sizes: [
          { size: "10x10"},
          { size: "12x12"},
          { size: "14x14"},
          { size: "16x16"},
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

            {/* PISTAS DE BAILE */}
            {slug === "pistas-de-baile" && service.packages && (
              <div className="space-y-12">
                
                {/* Video Recap */}
                {service.videoRecap && (
                  <div className="mb-12 rounded-2xl overflow-hidden">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full max-h-[500px] object-cover"
                    >
                      <source src={service.videoRecap} type="video/mp4" />
                    </video>
                  </div>
                )}
            
                {service.packages.map((pkg, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${glass}`}>
                  <h3 className="text-3xl font-bold text-white mb-6">{pkg.name}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <ImageCarousel images={pkg.images} alt={pkg.name} />
                    
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
            
           <a href="#cotizar"
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
/* ==========================================
   SISTEMA DE COTIZACIÓN FINAL COMPLETO
   Con navegación por rutas hash
   ========================================== */

// DATOS COMPLETOS DE SERVICIOS
const SERVICIOS_DATA = {
  montajes: {
    nombre: "Montajes DJ",
    opciones: [
      {
        id: "sencillo",
        nombre: "Montaje Sencillo",
        imagenes: ["/montaje-Sencillo.jpg", "/montajeSencillo.jpg"],
        duracion: "4 horas",
        incluye: [
          "Pantalla TV 32\" Opcional",
          "Karaoke / Just Dance",
          "1 micrófono inalámbrico",
          "DJ Booth iluminado",
          "2 luces Party LED",
          "Mixeo de música en vivo"
        ]
      },
      {
        id: "mediano",
        nombre: "Montaje Mediano",
        imagenes: ["/montajeMediano.jpg", "/montaje-Mediano.jpg"],
        duracion: "5 horas",
        incluye: [
          "Pantalla gigante 100\" o TV 55\"",
          "Karaoke / Just Dance",
          "2 micrófonos inalámbricos",
          "DJ Booth iluminado",
          "2 trussing iluminados",
          "2 luces Moving Heads",
          "Máquina de humo o haze",
          "Mixeo de música en vivo",
          "Animación desde el DJ Stage"
        ]
      },
      {
        id: "premium",
        nombre: "Montaje Premium",
        imagenes: ["/montaje-Premium.jpg", "/montajePremium.jpg"],
        duracion: "6 horas",
        incluye: [
          "2 pantallas TV 55\"",
          "Karaoke / Just Dance",
          "2 micrófonos inalámbricos",
          "DJ Booth iluminado",
          "2 trussing iluminados",
          "2 luces Moving Heads Gobo",
          "2 luces Moving Heads BeeEye",
          "Máquina de humo o haze",
          "Mixeo de música en vivo",
          "Animación desde el DJ Stage"
        ]
      }
    ]
  },
  
  pistas: {
    nombre: "Pistas de Baile LED",
    opciones: [
      {
        id: "3d",
        nombre: "Pista 3D Mirror & Frost",
        imagen: "/pista-3d-1.jpg",
        tipo: "3D con efectos espejo",
        incluye: ["Efectos 3D interactivos", "Acabado espejo", "Efecto frost", "Instalación profesional"],
        tamanos: ["10x10", "12x12", "14x14", "16x16"]
      },
      {
        id: "blanca",
        nombre: "Pista Blanca con Puntos LED",
        imagen: "/pista-blanca-1.jpg",
        tipo: "Puntos LED de colores o blanco",
        incluye: ["Puntos LED programables (colores o blanco)", "Base blanca elegante", "Múltiples patrones", "Instalación profesional"],
        tamanos: ["10x10", "12x12", "14x14", "16x16"]
      }
    ]
  },

  sonidoCeremonia: {
    nombre: "Sonido Ceremonia/Cóctel",
    opciones: [
      {
        id: "ceremonia",
        nombre: "Sonido Ceremonia/Cóctel",
        imagen: "/sonido-ceremonia-service.jpg",
        duracion: "1 hora",
        incluye: [
          "1 bocina de batería",
          "1 micrófono inalámbrico",
          "Cualquier tipo de música",
          "Operador incluido"
        ]
      }
    ]
  },

  lucesAmbiente: {
    nombre: "Luces de Ambiente",
    opciones: [
      {
        id: "ambiente",
        nombre: "Luces LED de Ambiente",
        imagen: "/luces-ambiente-service.jpg",
        duracion: "~5 horas de batería",
        incluye: [
          "Luces LED de batería inalámbricas",
          "Duración aproximada de 5 horas",
          "Paquetes disponibles: 10, 14, 16, 20, 28, 35 luces",
          "Se pueden añadir más según necesidad",
          "Instalación y retiro incluido"
        ]
      }
    ]
  },
  
  fotografia: {
    nombre: "Fotografía",
    opciones: [
      {
        id: "profesional",
        nombre: "Fotografía Profesional",
        imagen: "/fotografia-service.png",
        duracion: "4 horas",
        incluye: [
          "Cámara profesional Canon M50",
          "Flash en cámara",
          "Fotógrafo experimentado",
          "Cobertura completa",
          "Entrega digital",
          "Edición básica"
        ]
      }
    ]
  },
  
  photobooth: {
    nombre: "Photo Booth",
    opciones: [
      {
        id: "360",
        nombre: "Photo Booth 360°",
        imagen: "/photobooth-service.png",
        incluye: [
          "Plataforma grande (5-7 personas)",
          "Videos con edición en cámara lenta",
          "Mesa con props (collares, gafas, sombreros)",
          "Separadores estilo alfombra roja",
          "Alfombra debajo de la maquinaria",
          "Entrega digital instantánea",
          "Operador dedicado"
        ],
        duraciones: ["2 horas", "3 horas"]
      },
      {
        id: "estatico",
        nombre: "Photo Booth Estático",
        imagen: "/photobooth-service.png",
        incluye: [
          "Cabina profesional",
          "Mesa con props (collares, gafas, sombreros)",
          "Separadores estilo alfombra roja",
          "Alfombra debajo de la maquinaria",
          "Compartir redes sociales",
          "Operador dedicado",
          "NO incluye impresión"
        ],
        duraciones: ["2 horas", "3 horas"]
      }
    ]
  },
  
  efectos: {
    nombre: "Efectos Especiales",
    opciones: [
      {
        id: "truss-gobos",
        nombre: "Decoración Lumínica para Venue",
        imagen: "/efectos-service.jpg",
        subtitulo: "Truss con Moving Heads",
        opciones: [
          "2 truss 10' con 4 luces",
          "4 truss 10' con 8 luces"
        ],
        incluye: [
          "Tela blanca",
          "Trussing de 10 pies",
          "Moving Heads profesionales",
          "Gobos y colores a escoger",
          "Técnico de luces dedicado",
          "Consola digital de programación profesional",
          "Proyección en paredes del venue",
          "Instalación completa"
        ]
      },
      {
        id: "chispas",
        nombre: "Chispas Frías",
        imagen: "/chispas-frias-service.jpg",
        detalles: "3 tiros de 15 segundos en momentos que elija",
        incluye: [
          "2 máquinas de chispas frías",
          "Pirotecnia segura",
          "Altura hasta 15 pies",
          "Técnico certificado",
          "Ideal para primer baile",
          "3 tiros de 15 segundos"
        ]
      },
      {
        id: "humo-vertical",
        nombre: "Humo Vertical",
        imagen: "/efectos-service.jpg",
        detalles: "2 máquinas, 4 horas",
        incluye: ["2 máquinas profesionales", "Tiros ilimitados", "Fluido incluido", "Técnico dedicado"]
      },
      {
        id: "confeti",
        nombre: "Confeti",
        imagen: "/efectos-service.jpg",
        incluye: [
          "Confeti del color elegido",
          "Lanzamiento aéreo profesional",
          "Control de timing",
          "Sujeto a permisos del venue"
        ]
      },
      {
        id: "espuma",
        nombre: "Máquina de Espuma",
        imagen: "/efectos-service.jpg",
        incluye: ["Espuma no tóxica", "Cañón de alta potencia", "Sujeto a permisos del venue"]
      },
      {
        id: "humo-bajo",
        nombre: "Humo Bajo (Baile en Nubes)",
        imagen: "/efectos-service.jpg",
        incluye: ["Efecto nube baja", "Humo denso", "Ideal para primer baile", "Máquina de hielo seco"],
        disponible: false
      }
    ]
  },
  
  pantallas: {
    nombre: "Pantallas & Visuales",
    opciones: [
      {
        id: "led",
        nombre: "Pantalla LED Modular 13x7",
        imagen: "/pantallas-service.png",
        detalles: "Waterproof - Ideal para exteriores",
        incluye: [
          "Alta resolución",
          "Tamaño ajustable",
          "Waterproof - Resistente al agua",
          "Uso en exteriores e interiores",
          "Instalación profesional",
          "Técnico dedicado"
        ]
      },
      {
        id: "proyeccion",
        nombre: "Sistema de Proyección 100\"",
        imagen: "/pantallas-service.png",
        incluye: ["Pantalla profesional", "Proyector alta luminosidad", "Montaje incluido"]
      }
    ]
  },
  
  animacion: {
    nombre: "Animación & Coordinación",
    opciones: [
      {
        id: "animador",
        nombre: "Animador Profesional",
        imagen: "/animacion-service.png",
        duracion: "4 horas",
        incluye: ["Interacción con invitados", "Juegos y actividades", "Manejo de público"]
      },
      {
        id: "mc",
        nombre: "Maestro de Ceremonias",
        imagen: "/animacion-service.png",
        duracion: "3 horas",
        incluye: ["Conducción del evento", "Anuncios oficiales", "Voz profesional"]
      },
      {
        id: "batucada",
        nombre: "Batucada",
        imagen: "/animacion-service.png",
        detalles: "3-5 integrantes",
        incluye: ["Percusión en vivo", "Animación energética"]
      },
      {
        id: "coordinador",
        nombre: "Coordinador de Eventos",
        imagen: "/animacion-service.png",
        incluye: ["Planificación completa", "Coordinación con proveedores", "Supervisión del evento"]
      }
    ]
  },

  sonido: {
    nombre: "Sonido Profesional",
    esInformativa: true,
    descripcion: "Contamos con equipos de sonido para todo tipo de eventos, desde venues pequeños hasta grandes producciones en exteriores. Nuestro inventario incluye sistemas Line Array, subwoofers de alta potencia, consolas digitales y mucho más. Cada evento es único y requiere una configuración específica.",
    opciones: [
      {
        id: "consulta",
        nombre: "Sonido Personalizado",
        imagen: "/sonido-service.jpg",
        esContacto: true,
        incluye: [
          "Sistemas desde pequeños hasta grandes producciones",
          "Line Array profesional",
          "Subwoofers de alta potencia",
          "Consolas digitales",
          "Micrófonos inalámbricos profesionales",
          "Técnico de sonido dedicado",
          "Configuración personalizada según tu evento"
        ]
      }
    ]
  },
  
  luces: {
    nombre: "Iluminación Profesional",
    esInformativa: true,
    descripcion: "Ofrecemos soluciones de iluminación para todo tipo de eventos y venues. Desde iluminación básica hasta diseños complejos con moving heads, lasers y estructuras trussing personalizadas. Cuéntanos sobre tu evento y te orientaremos con la mejor opción.",
    opciones: [
      {
        id: "consulta",
        nombre: "Iluminación Personalizada",
        imagen: "/iluminacion-service.jpg",
        esContacto: true,
        incluye: [
          "Moving Heads Gobo y Wash",
          "Barras LED profesionales",
          "Sistemas laser",
          "Estructuras trussing personalizables",
          "Diseño de iluminación según venue",
          "Técnicos profesionales",
          "Configuración personalizada según tu evento"
        ]
      }
    ]
  }
};

// COMPONENTE DE FORMULARIO (se renderiza cuando hash === "#formulario-cotizacion")
function FormularioCotizacion({ selectedServices }) {
  const [formData, setFormData] = useState({
    fecha: "",
    personas: "",
    lugar: "",
    nombre: "",
    whatsapp: "",
    email: ""
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const enviarCotizacion = async () => {
    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor escribe tu nombre");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length !== 10) {
      setErrorMessage("El WhatsApp debe tener 10 dígitos");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setSending(true);

    try {
      const serviciosTexto = selectedServices.map(s => `• ${s.nombre}`).join('\n');
      
      const response = await fetch('/api/generate-quote-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          whatsapp: formData.whatsapp,
          email: formData.email || "No proporcionó",
          fecha: formData.fecha || "Por definir",
          personas: formData.personas || "Por definir",
          lugar: formData.lugar || "Por definir",
          servicios: serviciosTexto,
          total: "Por cotización"
        })
      });
      
      if (response.ok) {
        setShowConfirmation(true);
      } else {
        throw new Error('Error generando PDF');
      }
    } catch (error) {
      setErrorMessage("Error al enviar. Intenta de nuevo.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setSending(false);
    }
  };

  if (showConfirmation) {
    return (
      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-2xl mx-auto p-12 rounded-2xl ${glass} text-center`}
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              ¡Solicitud enviada!
            </h2>
            
            <p className="text-lg text-zinc-300 mb-8">
              Te enviaremos los precios por WhatsApp al{' '}
              <a 
                href={`https://wa.me/1${formData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-green-400 hover:text-green-300 underline"
              >
                {formData.whatsapp}
              </a>
              {' '}en breve.
            </p>

            <a
              href="#home"
              className="inline-block px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
            >
              Volver al Inicio
            </a>
          </motion.div>
        </div>

        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                <X className="w-6 h-6" />
                <p className="font-medium">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.location.hash = "#home"}
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a servicios
        </button>

        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Completa tu información
            </h2>

            <div className={`p-8 rounded-2xl ${glass} space-y-6`}>
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Servicios seleccionados:</h3>
                {selectedServices.map((service, idx) => (
                  <p key={idx} className="text-zinc-300 text-sm mb-1">
                    • {service.nombre}
                  </p>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">¿Cuándo es tu evento?</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">¿Cuántas personas?</label>
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
                <label className="text-sm text-zinc-400 mb-2 block">¿Dónde será?</label>
                <input
                  placeholder="Nombre del salón o lugar"
                  value={formData.lugar}
                  onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Tu nombre *</label>
                    <input
                      placeholder="Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="7871234567"
                      value={formData.whatsapp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({...formData, whatsapp: value});
                      }}
                      maxLength={10}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Email (opcional)</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={enviarCotizacion}
                disabled={sending}
                className="w-full px-6 py-4 bg-white text-black rounded-xl text-lg font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Enviar Solicitud"}
              </button>

              <p className="text-xs text-zinc-500 text-center">* Campos requeridos</p>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <X className="w-6 h-6" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// COMPONENTE PRINCIPAL QUOTEFLOW
function QuoteFlow() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
      setSelectedServices(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  }, [selectedServices]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const toggleExpanded = (categoryId, optionId) => {
    const key = `${categoryId}-${optionId}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const nextImage = (categoryId, optionId, totalImages) => {
    const key = `${categoryId}-${optionId}`;
    setCurrentImageIndex(prev => ({
      ...prev,
      [key]: ((prev[key] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (categoryId, optionId, totalImages) => {
    const key = `${categoryId}-${optionId}`;
    setCurrentImageIndex(prev => ({
      ...prev,
      [key]: ((prev[key] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const toggleSelection = (categoryId, option, size = null, duration = null) => {
    const itemId = size 
      ? `${categoryId}-${option.id}-${size}` 
      : duration
        ? `${categoryId}-${option.id}-${duration}`
        : `${categoryId}-${option.id}`;
    
    const isSelected = selectedServices.some(s => s.id === itemId);
    
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== itemId));
    } else {
      let nombre = option.nombre;
      if (size) nombre += ` ${size}`;
      if (duration) nombre += ` - ${duration}`;
      
      setSelectedServices([...selectedServices, {
        id: itemId,
        categoryId,
        nombre
      }]);
    }
  };

  const clearSelection = () => {
    setSelectedServices([]);
    localStorage.removeItem('selectedServices');
  };

  const categoriasOrden = ['montajes', 'pistas', 'fotografia', 'photobooth', 'efectos', 'pantallas', 'animacion', 'sonidoCeremonia', 'lucesAmbiente', 'sonido', 'luces'];

  return (
    <>
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            

            {/* NAVEGACIÓN CON DROPDOWN */}
            <div className="sticky top-20 z-50 mb-8">
              {/* VERSIÓN DESKTOP - HOVER */}
              <div className="hidden md:block relative">
                <div className="group">
                  {/* BOTÓN TRIGGER */}
                  <div className={`${glass} backdrop-blur-xl rounded-2xl p-5 cursor-pointer border border-white/20 hover:border-white/40 transition-all`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-base mb-1">Navegar por secciones</p>
                        <p className="text-zinc-400 text-sm">Selecciona una categoría para ir directamente</p>
                      </div>
                      <ChevronDown className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* DROPDOWN AL HOVER */}
                  <div className="absolute top-full left-0 right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-black/98 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-6">
                      <div className="grid grid-cols-3 gap-3">
                        {categoriasOrden.map(catId => (
                          <button
                            key={catId}
                            onClick={() => scrollToSection(catId)}
                            className="group/btn px-4 py-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/10 hover:border-white/30 text-white font-medium transition-all text-left hover:scale-105 hover:shadow-lg"
                          >
                            <span className="text-sm">{SERVICIOS_DATA[catId].nombre}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VERSIÓN MÓVIL - EXPANDIBLE */}
              <div className="md:hidden">
                <div className={`${glass} backdrop-blur-xl rounded-2xl border border-white/20`}>
                  <button
                    onClick={() => setExpandedItems(prev => ({...prev, navMenu: !prev.navMenu}))}
                    className="w-full p-5 flex items-center justify-between"
                  >
                    <div className="text-left">
                      <p className="text-white font-semibold text-base mb-1">Ir a sección</p>
                      <p className="text-zinc-400 text-xs">Toca para ver todas</p>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-white transition-transform duration-300 ${expandedItems.navMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedItems.navMenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <div className="p-5 grid grid-cols-2 gap-3">
                          {categoriasOrden.map((catId, idx) => (
                            <motion.button
                              key={catId}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => {
                                scrollToSection(catId);
                                setExpandedItems(prev => ({...prev, navMenu: false}));
                              }}
                              className="px-4 py-3 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 active:scale-95 text-white font-medium transition-all text-center text-sm"
                            >
                              {SERVICIOS_DATA[catId].nombre}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>


            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Servicios disponibles para tu evento
            </h1>
            <p className="text-zinc-400 text-center mb-16">
              Explora nuestros servicios y cotiza lo que necesites
            </p>

            {/* MONTAJES DJ CON CAROUSEL */}
            <div id="section-montajes" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-3">
                Montajes DJ
              </h2>
              <p className="text-zinc-400 mb-8">
                Elige el montaje base para tu evento
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {SERVICIOS_DATA.montajes.opciones.map(option => {
                  const itemKey = `montajes-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);
                  const currentIdx = currentImageIndex[itemKey] || 0;
                  const imagenes = option.imagenes || [option.imagen];

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                      <div className="relative h-48 group">
                        <img 
                          src={imagenes[currentIdx]} 
                          alt={option.nombre} 
                          className="w-full h-full object-cover"
                        />
                        
                        {imagenes.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage('montajes', option.id, imagenes.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                            <button
                              onClick={() => nextImage('montajes', option.id, imagenes.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {imagenes.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                    idx === currentIdx ? 'bg-white' : 'bg-white/40'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{option.nombre}</h3>
                        <p className="text-sm text-zinc-400 mb-6">{option.duracion}</p>

                        <button
                          onClick={() => toggleExpanded('montajes', option.id)}
                          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Más información</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <div className="p-4 rounded-lg bg-white/5 mb-4">
                                <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                  {option.incluye.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleSelection('montajes', option)}
                          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            isSelected 
                              ? 'bg-white text-black' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? '✓ Seleccionado para cotizar' : 'Seleccionar para cotizar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEPARADOR */}
            <div className="my-24">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  También puedes añadir estos servicios
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full"></div>
              </div>
            </div>

            {/* SONIDO CEREMONIA + LUCES AMBIENTE - LADO A LADO */}
            <div className="mb-20 grid md:grid-cols-2 gap-8">
              {/* SONIDO CEREMONIA */}
              <div id="section-sonidoCeremonia">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {SERVICIOS_DATA.sonidoCeremonia.nombre}
                </h2>

                {SERVICIOS_DATA.sonidoCeremonia.opciones.map(option => {
                  const itemKey = `sonidoCeremonia-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-56 object-cover" />
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{option.nombre}</h3>
                        <p className="text-sm text-zinc-400 mb-6">{option.duracion}</p>

                        <button
                          onClick={() => toggleExpanded('sonidoCeremonia', option.id)}
                          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Más información</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <div className="p-4 rounded-lg bg-white/5 mb-4">
                                <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                  {option.incluye.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleSelection('sonidoCeremonia', option)}
                          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            isSelected 
                              ? 'bg-white text-black' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? '✓ Seleccionado para cotizar' : 'Seleccionar para cotizar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LUCES AMBIENTE */}
              <div id="section-lucesAmbiente">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {SERVICIOS_DATA.lucesAmbiente.nombre}
                </h2>

                {SERVICIOS_DATA.lucesAmbiente.opciones.map(option => {
                  const itemKey = `lucesAmbiente-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-56 object-cover" />
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{option.nombre}</h3>
                        <p className="text-sm text-zinc-400 mb-6">{option.duracion}</p>

                        <button
                          onClick={() => toggleExpanded('lucesAmbiente', option.id)}
                          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Más información</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <div className="p-4 rounded-lg bg-white/5 mb-4">
                                <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                  {option.incluye.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleSelection('lucesAmbiente', option)}
                          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            isSelected 
                              ? 'bg-white text-black' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? '✓ Seleccionado para cotizar' : 'Seleccionar para cotizar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PISTAS */}
            <div id="section-pistas" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                Pistas de Baile LED
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {SERVICIOS_DATA.pistas.opciones.map(option => {
                  const itemKey = `pistas-${option.id}`;
                  const isExpanded = expandedItems[itemKey];

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-56 object-cover" />
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{option.nombre}</h3>
                        <p className="text-sm text-zinc-400 mb-6">{option.tipo}</p>

                        <button
                          onClick={() => toggleExpanded('pistas', option.id)}
                          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Más información</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <div className="p-4 rounded-lg bg-white/5 mb-4">
                                <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                  {option.incluye.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <p className="text-sm text-zinc-400 mb-3 font-medium">Selecciona el tamaño para cotizar:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {option.tamanos.map(size => {
                            const sizeId = `pistas-${option.id}-${size}`;
                            const isSelected = selectedServices.some(s => s.id === sizeId);
                            
                            return (
                              <button
                                key={size}
                                onClick={() => toggleSelection('pistas', option, size)}
                                className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
                                  isSelected 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                {isSelected ? `✓ ${size}` : size}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FOTOGRAFÍA - CENTRALIZADA Y GRANDE */}
            <div id="section-fotografia" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Fotografía Profesional
              </h2>

              {SERVICIOS_DATA.fotografia.opciones.map(option => {
                const itemKey = `fotografia-${option.id}`;
                const isExpanded = expandedItems[itemKey];
                const isSelected = selectedServices.some(s => s.id === itemKey);

                return (
                  <div key={option.id} className={`max-w-3xl mx-auto rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                    <img src={option.imagen} alt={option.nombre} className="w-full h-80 object-cover" />
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{option.nombre}</h3>
                      <p className="text-sm text-zinc-400 mb-6">{option.duracion}</p>

                      <button
                        onClick={() => toggleExpanded('fotografia', option.id)}
                        className="w-full mb-4 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-base font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Más información</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-6 overflow-hidden"
                          >
                            <div className="p-5 rounded-lg bg-white/5 mb-4">
                              <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                              <ul className="space-y-2.5 text-base text-zinc-300">
                                {option.incluye.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => toggleSelection('fotografia', option)}
                        className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-white text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isSelected ? '✓ Seleccionado para cotizar' : 'Seleccionar para cotizar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PHOTO BOOTH */}
            <div id="section-photobooth" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                Photo Booth
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {SERVICIOS_DATA.photobooth.opciones.map(option => {
                  const itemKey = `photobooth-${option.id}`;
                  const isExpanded = expandedItems[itemKey];

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-48 object-cover" />
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-6">{option.nombre}</h3>

                        <button
                          onClick={() => toggleExpanded('photobooth', option.id)}
                          className="w-full mb-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Más información</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <div className="p-4 rounded-lg bg-white/5 mb-4">
                                <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                  {option.incluye.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <p className="text-sm text-zinc-400 mb-3 font-medium">Selecciona la duración:</p>
                        <div className="grid grid-cols-2 gap-3">
                          {option.duraciones.map(dur => {
                            const durId = `photobooth-${option.id}-${dur}`;
                            const isSelected = selectedServices.some(s => s.id === durId);
                            
                            return (
                              <button
                                key={dur}
                                onClick={() => toggleSelection('photobooth', option, null, dur)}
                                className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
                                  isSelected 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                {isSelected ? `✓ ${dur}` : dur}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EFECTOS ESPECIALES - ACTUALIZADO */}
            <div id="section-efectos" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                Efectos Especiales
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICIOS_DATA.efectos.opciones.map(option => {
                  const itemKey = `efectos-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);
                  const isDisabled = option.disponible === false;

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''} ${isDisabled ? 'opacity-60' : ''}`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-40 object-cover" />
                      
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-white">{option.nombre}</h3>
                            {option.subtitulo && <p className="text-xs text-zinc-400 mt-1">{option.subtitulo}</p>}
                          </div>
                          {isDisabled && (
                            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 whitespace-nowrap ml-2">
                              No disponible
                            </span>
                          )}
                        </div>
                        {option.detalles && <p className="text-xs text-zinc-400 mb-4">{option.detalles}</p>}
                        {option.opciones && (
                          <div className="mb-4 p-3 rounded-lg bg-white/5">
                            <p className="text-xs text-zinc-400 mb-2 font-medium">OPCIONES:</p>
                            <ul className="space-y-1.5 text-xs text-zinc-300">
                              {option.opciones.map((opt, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-white mt-0.5">•</span>
                                  <span>{opt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {option.incluye && (
                          <>
                            <button
                              onClick={() => toggleExpanded('efectos', option.id)}
                              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              <span>Más información</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mb-4 overflow-hidden"
                                >
                                  <div className="p-3 rounded-lg bg-white/5 mb-4">
                                    <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
                                    <ul className="space-y-1.5 text-xs text-zinc-300">
                                      {option.incluye.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}

                        <button
                          onClick={() => !isDisabled && toggleSelection('efectos', option)}
                          disabled={isDisabled}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isDisabled
                              ? 'bg-white/5 text-zinc-500 cursor-not-allowed'
                              : isSelected 
                                ? 'bg-white text-black' 
                                : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isDisabled ? 'No disponible' : isSelected ? '✓ Seleccionado' : 'Seleccionar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PANTALLAS */}
            <div id="section-pantallas" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                {SERVICIOS_DATA.pantallas.nombre}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {SERVICIOS_DATA.pantallas.opciones.map(option => {
                  const itemKey = `pantallas-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-40 object-cover" />
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2">{option.nombre}</h3>
                        {option.detalles && <p className="text-xs text-zinc-400 mb-4">{option.detalles}</p>}

                        {option.incluye && (
                          <>
                            <button
                              onClick={() => toggleExpanded('pantallas', option.id)}
                              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              <span>Más información</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mb-4 overflow-hidden"
                                >
                                  <div className="p-3 rounded-lg bg-white/5 mb-4">
                                    <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
                                    <ul className="space-y-1.5 text-xs text-zinc-300">
                                      {option.incluye.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}

                        <button
                          onClick={() => toggleSelection('pantallas', option)}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isSelected 
                              ? 'bg-white text-black' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ANIMACIÓN */}
            <div id="section-animacion" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                {SERVICIOS_DATA.animacion.nombre}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICIOS_DATA.animacion.opciones.map(option => {
                  const itemKey = `animacion-${option.id}`;
                  const isExpanded = expandedItems[itemKey];
                  const isSelected = selectedServices.some(s => s.id === itemKey);

                  return (
                    <div key={option.id} className={`rounded-2xl ${glass} overflow-hidden ${isSelected ? 'ring-2 ring-white/40' : ''}`}>
                      <img src={option.imagen} alt={option.nombre} className="w-full h-40 object-cover" />
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2">{option.nombre}</h3>
                        {option.detalles && <p className="text-xs text-zinc-400 mb-4">{option.detalles}</p>}
                        {option.duracion && <p className="text-xs text-zinc-400 mb-4">{option.duracion}</p>}

                        {option.incluye && (
                          <>
                            <button
                              onClick={() => toggleExpanded('animacion', option.id)}
                              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              <span>Más información</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mb-4 overflow-hidden"
                                >
                                  <div className="p-3 rounded-lg bg-white/5 mb-4">
                                    <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
                                    <ul className="space-y-1.5 text-xs text-zinc-300">
                                      {option.incluye.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}

                        <button
                          onClick={() => toggleSelection('animacion', option)}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isSelected 
                              ? 'bg-white text-black' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SONIDO - CARD INFORMATIVA */}
            <div id="section-sonido" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                {SERVICIOS_DATA.sonido.nombre}
              </h2>

              {SERVICIOS_DATA.sonido.opciones.map(option => {
                const itemKey = `sonido-${option.id}`;
                const isExpanded = expandedItems[itemKey];

                return (
                  <div key={option.id} className={`max-w-3xl mx-auto rounded-2xl ${glass} overflow-hidden`}>
                    <img src={option.imagen} alt={option.nombre} className="w-full h-64 object-cover" />
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">{option.nombre}</h3>
                      <p className="text-zinc-300 mb-6 leading-relaxed">
                        {SERVICIOS_DATA.sonido.descripcion}
                      </p>

                      <button
                        onClick={() => toggleExpanded('sonido', option.id)}
                        className="w-full mb-6 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Ver qué incluye</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-6 overflow-hidden"
                          >
                            <div className="p-4 rounded-lg bg-white/5 mb-4">
                              <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                              <ul className="space-y-2 text-sm text-zinc-300">
                                {option.incluye.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <a
                        href={`https://wa.me/17873568786?text=Hola, me interesa información sobre Sonido Profesional para mi evento`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-xl text-center font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors"
                      >
                        Contáctanos por WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LUCES - CARD INFORMATIVA */}
            <div id="section-luces" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                {SERVICIOS_DATA.luces.nombre}
              </h2>

              {SERVICIOS_DATA.luces.opciones.map(option => {
                const itemKey = `luces-${option.id}`;
                const isExpanded = expandedItems[itemKey];

                return (
                  <div key={option.id} className={`max-w-3xl mx-auto rounded-2xl ${glass} overflow-hidden`}>
                    <img src={option.imagen} alt={option.nombre} className="w-full h-64 object-cover" />
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">{option.nombre}</h3>
                      <p className="text-zinc-300 mb-6 leading-relaxed">
                        {SERVICIOS_DATA.luces.descripcion}
                      </p>

                      <button
                        onClick={() => toggleExpanded('luces', option.id)}
                        className="w-full mb-6 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Ver qué incluye</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-6 overflow-hidden"
                          >
                            <div className="p-4 rounded-lg bg-white/5 mb-4">
                              <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                              <ul className="space-y-2 text-sm text-zinc-300">
                                {option.incluye.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <a
                        href={`https://wa.me/17873568786?text=Hola, me interesa información sobre Iluminación Profesional para mi evento`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-xl text-center font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors"
                      >
                        Contáctanos por WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* BOTONES FLOTANTES */}
      {selectedServices.length > 0 && (
        <>
          {/* DESKTOP - ABAJO DERECHA */}
          <motion.a
            href="#formulario-cotizacion"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden md:flex fixed bottom-6 right-6 px-6 py-3 bg-white text-black rounded-full text-base font-bold shadow-2xl hover:scale-105 transition-transform z-50 items-center gap-2"
          >
            Solicitar cotización ({selectedServices.length})
          </motion.a>

          {/* MÓVIL - ABAJO CENTRO */}
          <motion.a
            href="#formulario-cotizacion"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black rounded-full text-base font-bold shadow-2xl hover:scale-105 transition-transform z-50"
          >
            Solicitar ({selectedServices.length})
          </motion.a>

          {/* LIMPIAR SELECCIÓN */}
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={clearSelection}
            className="fixed bottom-24 right-6 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full text-sm font-medium shadow-xl transition-colors z-50"
          >
            Limpiar selección
          </motion.button>
        </>
      )}
    </>
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
  const showFormulario = hash === "#formulario-cotizacion";


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

          <QuoteFlow />
          <Footer />
        </>

      ) : showFormulario ? (
        /* ===== Sub-pantalla: FORMULARIO COTIZACIÓN ===== */
        <>
          <FormularioCotizacion 
            selectedServices={JSON.parse(localStorage.getItem('selectedServices') || '[]')}
          />
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
          <QuoteFlow />
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
