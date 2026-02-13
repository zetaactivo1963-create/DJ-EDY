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
  { id: "bodas", name: "Bodas", image: "/evento-bodas.jpg" },
  { id: "quinceaneros", name: "Quinceañeros", image: "/evento-quinceaneros.jpg" },
  { id: "proms", name: "Proms / Graduaciones", image: "/evento-proms.jpg" },
  { id: "corporativos", name: "Eventos Corporativos", image: "/evento-corporativos.jpg" },
  { id: "cumpleanos", name: "Cumpleaños / Sociales", image: "/evento-cumpleanos.jpg" },
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
    price: "Desde $XXX",
    image: "/montajeSencillo.jpg",
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
    image: "/montajeMediano.jpg",
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
    image: "/montajePremium.jpg",
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
    ideal: "Eventos grandes o formales (150+ personas)",
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
   BEST SELLERS - MOBILE FIRST, SUPER SIMPLE
   ============ */
function BestSellers() {
  return (
    <Section id="bestsellers" className="bg-black">
      {/* 1. PAQUETES - Card Gigante */}
      <motion.a
        href="#paquetes"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-3xl min-h-[600px] mb-6 block hover:scale-[1.01] transition-transform"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/montajePremium.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        
        {/* Título CENTRADO ARRIBA */}
        <div className="absolute top-0 left-0 right-0 pt-12 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Paquetes Completos
          </h2>
        </div>
        
        {/* Contenido abajo */}
        <div className="relative h-full p-8 md:p-16 flex flex-col justify-end">
          <p className="text-xl md:text-2xl text-white/90 mb-3 text-center">
            Todo incluido para tu evento
          </p>
          <p className="text-base text-white/70 mb-8 text-center">
            DJ · Sonido · Iluminación · Pista · Efectos
          </p>
          <div className="flex items-center justify-center gap-2 text-white text-lg font-semibold">
            Ver paquetes <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </motion.a>

      {/* 2. MONTAJES DJ - Card Grande CON FOTO */}
      <motion.a
        href="#montajes"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group relative overflow-hidden rounded-3xl min-h-[500px] mb-6 block hover:scale-[1.01] transition-transform"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/montajeSencillo.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        
        {/* Título CENTRADO ARRIBA */}
        <div className="absolute top-0 left-0 right-0 pt-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Montajes DJ
          </h2>
        </div>
        
        <div className="relative h-full p-8 md:p-16 flex flex-col justify-end">
          <p className="text-lg md:text-xl text-white/90 mb-3 text-center">
            Lo esencial: DJ + Sonido + Luces
          </p>
          <p className="text-base text-white/70 mb-8 text-center">
            Opción más económica
          </p>
          <div className="flex items-center justify-center gap-2 text-white text-lg font-semibold">
            Ver montajes <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </motion.a>

      {/* 3 y 4: Pista + Fotografía */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Pista de Baile */}
        <ServiceCard
          href="#servicio/pistas-de-baile"
          image="/pista-led-service.jpg"
          title="Pista de Baile"
          subtitle="LED iluminada · Diferentes tamaños"
          delay={0.2}
        />

        {/* Fotografía */}
        <ServiceCard
          href="#servicio/fotografia"
          image="/fotografia-service.jpg"
          title="Fotografía"
          subtitle="Cobertura completa de tu evento"
          delay={0.25}
        />
      </div>

      {/* 5 y 6: Photo Booths + Efectos */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ServiceCard
          href="#servicio/photo-booths"
          image="/photobooth-service.jpg"
          title="Photo Booths"
          subtitle="360° · Estático · Digital"
          delay={0.3}
        />

        <ServiceCard
          href="#servicio/efectos-especiales"
          image="/efectos-service.jpg"
          title="Efectos Especiales"
          subtitle="Chispas · Confeti · Humo"
          delay={0.35}
        />
      </div>

      {/* 7 y 8: Sonido + Iluminación & Trussing */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ServiceCard
          href="#servicio/sonido-profesional"
          image="/sonido-service.jpg"
          title="Sonido"
          subtitle="Line Array · Técnico dedicado"
          delay={0.4}
        />

        <ServiceCard
          href="#servicio/iluminacion-trussing"
          image="/iluminacion-service.jpg"
          title="Iluminación & Trussing"
          subtitle="Moving Heads · LED · Estructuras"
          delay={0.45}
        />
      </div>

      {/* 9 y 10: Pantallas + Animación */}
      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard
          href="#servicio/pantallas-visuales"
          image="/pantallas-service.jpg"
          title="Pantallas / Visuales"
          subtitle="Pantallas LED · Proyección"
          delay={0.5}
        />

        <ServiceCard
          href="#servicio/animacion-coordinacion"
          image="/animacion-service.jpg"
          title="Animación & Coordinación"
          subtitle="MC · Animador · Coordinador"
          delay={0.55}
        />
      </div>

      {/* Explicación SIMPLIFICADA */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <div className={`p-8 rounded-2xl ${glass}`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Cómo funciona?
          </h3>
          <div className="text-left space-y-4 text-lg text-zinc-300">
            <p>
              <strong className="text-white">Paquetes:</strong> Todo incluido. Un solo precio con DJ, sonido, luces, pista, efectos y más.
            </p>
            <p>
              <strong className="text-white">Montajes:</strong> Solo lo básico (DJ + sonido + luces). Más económico.
            </p>
            <p>
              <strong className="text-white">Servicios individuales:</strong> Añade lo que necesites a tu paquete o montaje.
            </p>
          </div>
        </div>
      </div>
    </Section>
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
      
      {/* Título CENTRADO ARRIBA */}
      <div className="absolute top-0 left-0 right-0 pt-8 px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-base text-white/80">{subtitle}</p>
      </div>
      
      <div className="relative h-full p-8 flex items-end justify-center">
        <div className="flex items-center gap-2 text-white font-semibold">
          Ver más <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

/* ========
   PAQUETES - SELECTOR SIMPLE (SIN ICONOS)
   Mobile-first para 40-50 años
   ======== */

// Tipos de eventos SIMPLIFICADOS
const eventTypesSimple = [
  { id: "bodas", name: "Bodas", image: "/evento-bodas.jpg" },
  { id: "quinceaneros", name: "Quinceañeros", image: "/evento-quinceaneros.jpg" },
  { id: "proms", name: "Proms / Graduaciones", image: "/evento-proms.jpg" },
  { id: "corporativos", name: "Eventos Corporativos", image: "/evento-corporativos.jpg" },
  { id: "cumpleanos", name: "Cumpleaños / Sociales", image: "/evento-cumpleanos.jpg" },
];

function PackagesPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null); // Para modal ampliado

  // Si no hay evento seleccionado, mostrar selector
  if (!selectedEvent) {
    return (
      <>
        <section className="pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-lg text-white hover:text-zinc-300"
            >
              <ArrowLeft className="w-5 h-5" /> Volver
            </a>
          </div>
        </section>

        <Section className="pt-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Qué tipo de evento es?
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Selecciona tu evento para ver los paquetes disponibles
            </p>
          </div>

          {/* Botones GRANDES y SIMPLES */}
          <div className="grid gap-4 max-w-2xl mx-auto">
            {eventTypesSimple.map((event) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedEvent(event.id)}
                className="group relative overflow-hidden rounded-2xl min-h-[120px] hover:scale-[1.02] transition-all"
              >
                {/* Foto de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors" />
                
                {/* Texto */}
                <div className="relative h-full flex items-center justify-center p-6">
                  <h3 className="text-3xl font-bold text-white text-center">
                    {event.name}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </Section>
      </>
    );
  }

  // Mostrar paquetes del evento seleccionado
  const eventName = eventTypesSimple.find((e) => e.id === selectedEvent)?.name;
  const packages = packagesByEvent[selectedEvent] || [];

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedEvent(null)}
            className="inline-flex items-center gap-2 text-lg text-white hover:text-zinc-300"
          >
            <ArrowLeft className="w-5 h-5" /> Cambiar evento
          </button>
        </div>
      </section>

      <Section className="pt-0">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Paquetes para {eventName}
          </h1>
          <p className="text-lg text-zinc-400">
            Selecciona un paquete para ver más detalles
          </p>
        </div>

        {/* Paquetes en CARDS SIMPLES */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <motion.button
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-8 rounded-2xl ${glass} hover:bg-white/15 transition-all text-left ${
                pkg.featured ? "ring-2 ring-white/30" : ""
              }`}
            >
              {pkg.featured && (
                <div className="mb-4">
                  <span className="text-sm font-bold text-white bg-white/20 px-4 py-2 rounded-full">
                    ⭐ MÁS POPULAR
                  </span>
                </div>
              )}
              
              <h3 className="text-3xl font-bold text-white mb-3">{pkg.name}</h3>
              <p className="text-lg text-zinc-400 mb-4">{pkg.tagline}</p>
              <p className="text-2xl font-bold text-white mb-6">{pkg.price}</p>
              
              <div className="text-center pt-4">
                <span className="text-white font-semibold">
                  Ver detalles →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="mt-12 text-center space-y-4">
          <a
            href="#montajes"
            className="inline-block px-8 py-4 bg-white/10 text-white rounded-full text-lg hover:bg-white/20 transition-colors"
          >
            Ver solo montajes DJ (más económico)
          </a>
        </div>
      </Section>

      {/* MODAL AMPLIADO - Detalles del paquete */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Paquete {selectedPackage.name}
                  </h2>
                  <p className="text-xl text-zinc-400">{selectedPackage.tagline}</p>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Precio GRANDE */}
              <div className="mb-8 p-6 bg-white/5 rounded-2xl">
                <p className="text-3xl font-bold text-white text-center">
                  {selectedPackage.price}
                </p>
              </div>

              {/* Lo que incluye */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Incluye:</h3>
                <ul className="space-y-3">
                  {selectedPackage.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-zinc-300">
                      <Check className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal para */}
              <div className="mb-8 p-6 bg-white/5 rounded-2xl">
                <p className="text-sm text-zinc-400 mb-2">Ideal para:</p>
                <p className="text-xl text-white">{selectedPackage.ideal}</p>
              </div>

              {/* Botón de cotizar GRANDE */}
              <a
                href="#cotizar"
                className="block w-full text-center px-8 py-5 bg-white text-black rounded-full text-xl font-bold hover:bg-zinc-200 transition-colors"
              >
                Cotizar este paquete
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ========
   MONTAJES DE DJ - CON FOTOS (sin emojis)
   Mobile-first, botones grandes
   ======== */

const djSetupsWithPhotos = [
  {
    id: "sencillo",
    name: "Montaje Sencillo",
    price: "Desde $XXX",
    image: "/montajeSencillo.jpg",
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
    image: "/montajeMediano.jpg",
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
    image: "/montajePremium.jpg",
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
    ideal: "Eventos grandes o formales (150+ personas)",
  },
];

function MontajesPage() {
  const [selectedMontaje, setSelectedMontaje] = useState(null);

  return (
    <>
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-lg text-white hover:text-zinc-300"
          >
            <ArrowLeft className="w-5 h-5" /> Volver
          </a>
        </div>
      </section>

      <Section className="pt-0">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Montajes de DJ
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-4">
            Solo DJ + Sonido + Luces básicas
          </p>
          <p className="text-lg text-zinc-500">
            (Puedes añadir servicios extras después)
          </p>
        </div>

        {/* Montajes en CARDS CON FOTO */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {djSetupsWithPhotos.map((setup) => (
            <motion.button
              key={setup.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedMontaje(setup)}
              className={`relative overflow-hidden rounded-2xl ${glass} hover:bg-white/15 transition-all group`}
            >
              {/* Foto del montaje */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${setup.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Título sobre la foto */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {setup.name}
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {setup.price}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="text-sm text-zinc-400 mb-4">{setup.ideal}</p>
                
                <div className="text-center pt-4">
                  <span className="text-white font-semibold">
                    Ver detalles →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navegación */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-6 text-lg">
            ¿Buscas algo más completo?
          </p>
          <a
            href="#paquetes"
            className="inline-block px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
          >
            Ver paquetes completos
          </a>
        </div>
      </Section>

      {/* MODAL AMPLIADO */}
      <AnimatePresence>
        {selectedMontaje && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedMontaje(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Foto grande */}
              <div className="relative h-80 overflow-hidden rounded-t-3xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedMontaje.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                
                {/* Botón cerrar */}
                <button
                  onClick={() => setSelectedMontaje(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {selectedMontaje.name}
                  </h2>
                  <p className="text-3xl font-bold text-white">
                    {selectedMontaje.price}
                  </p>
                </div>
              </div>

              <div className="p-8">
                {/* Incluye */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Incluye:</h3>
                  <ul className="space-y-3">
                    {selectedMontaje.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-zinc-300">
                        <Check className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal para */}
                <div className="mb-8 p-6 bg-white/5 rounded-2xl">
                  <p className="text-sm text-zinc-400 mb-2">Ideal para:</p>
                  <p className="text-xl text-white">{selectedMontaje.ideal}</p>
                </div>

                {/* Botón */}
                <a
                  href="#cotizar"
                  className="block w-full text-center px-8 py-5 bg-white text-black rounded-full text-xl font-bold hover:bg-zinc-200 transition-colors"
                >
                  Cotizar este montaje
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



/* ===========================
   INDIVIDUAL SERVICE PAGES
   (Inserta esto ANTES de ServicesPage en App.js, alrededor de línea 1226)
   =========================== */

function IndividualServicePage({ slug }) {
  // Data detallada de cada servicio
  const serviceData = {
    "sonido-profesional": {
      title: "Sonido Profesional",
      subtitle: "Line Array de alta fidelidad",
      description: "Sistema de sonido profesional con ecualización avanzada y técnico dedicado. Adaptable a cualquier espacio y aforo.",
      features: [
        {
          title: "Sistema Line Array",
          items: [
            "6 bocinas dB-Technologies T8",
            "Cada una con bocinas internas de 8\", 6.5\" y drivers de 1\"",
            "2 subwoofers dB-Technologies S30",
            "Cada subwoofer con 2 bocinas de 18\"",
          ]
        },
        {
          title: "Control & Mezcla",
          items: [
            "Consola digital MIDAS M32 para mezcla profesional",
            "Sistema de networking y ecualización avanzada",
            "Técnico de sonido dedicado",
            "Ecualización y ajustes en vivo",
          ]
        },
        {
          title: "Microfonía",
          items: [
            "6 micrófonos inalámbricos Shure",
            "Microfonería completa para bandas",
            "Cablería y stands profesionales",
            "In-ear monitoring disponible",
          ]
        },
        {
          title: "Instalación",
          items: [
            "Cablería profesional completa (señal, corriente, networking)",
            "Stands y accesorios para montaje seguro",
            "Montaje y desmontaje incluidos",
            "Supervisión durante todo el evento",
          ]
        },
      ],
      capacity: "Contamos con más de 24 cajas y 6 subwoofers dobles. Sistema escalable para cualquier tipo de espacio y aforo.",
      images: [
        "/sonido-1.jpg",
        "/sonido-2.jpg",
        "/sonido-3.jpg",
        "/sonido-4.jpg",
      ],
      cta: "Este servicio se cotiza según las necesidades del evento. Agenda una reunión para discutir tu proyecto.",
    },

    "iluminacion": {
      title: "Iluminación Profesional",
      subtitle: "Diseño lumínico integral",
      description: "Sistema completo de iluminación inteligente con técnico dedicado. Desde arquitectónica hasta efectos dinámicos de concierto.",
      features: [
        {
          title: "Luces Inteligentes",
          items: [
            "Más de 16 luces móviles globo inteligente",
            "Más de 34 luces móviles Wash",
            "Control DMX y programación de escenas",
            "Sincronización con música",
          ]
        },
        {
          title: "Iluminación LED",
          items: [
            "Barras LED RGB de alto brillo",
            "Uplighting arquitectónico",
            "Iluminación de pista personalizable",
            "Control de color y temperatura",
          ]
        },
        {
          title: "Efectos Especiales",
          items: [
            "Lasers profesionales",
            "Color Strike estilo concierto",
            "Máquinas de humo vertical",
            "Máquina Haze para efectos atmosféricos",
          ]
        },
        {
          title: "Estructuras",
          items: [
            "Estructuras trussing modulares",
            "Diseños custom según el espacio",
            "Técnico de luces dedicado",
            "Montaje y programación incluidos",
          ]
        },
      ],
      capacity: "Inventario completo de iluminación profesional. Desde montajes íntimos hasta producciones de gran escala.",
      images: [
        "/iluminacion-1.jpg",
        "/iluminacion-2.jpg",
        "/iluminacion-3.jpg",
        "/iluminacion-4.jpg",
      ],
      cta: "Cotización personalizada según el diseño y tamaño del evento. Contáctanos para una propuesta.",
    },

    "pistas-de-baile": {
      title: "Pistas de Baile",
      subtitle: "Pistas LED interactivas",
      description: "Dos modelos disponibles de pistas iluminadas profesionales. Instalación segura y acabados premium.",
      features: [
        {
          title: "Pista 3D Full Infinity",
          items: [
            "Efecto 3D con profundidad infinita",
            "Iluminación LED full color",
            "Patrones y animaciones personalizables",
            "Acabado espejo premium",
          ]
        },
        {
          title: "Pista Clásica Iluminada",
          items: [
            "Superficie blanca con puntos LED",
            "Iluminación reactiva a la música",
            "Diseño elegante y atemporal",
            "Perfecto para eventos formales",
          ]
        },
        {
          title: "Instalación",
          items: [
            "Montaje profesional y nivelado",
            "Sistema anti-resbalante",
            "Transiciones suaves en los bordes",
            "Desmontaje incluido",
          ]
        },
      ],
      capacity: "Disponibles en diferentes tamaños: 12x12, 16x16 y configuraciones custom.",
      images: [
        "/pista-infinity.jpg",
        "/pista-clasica.jpg",
      ],
      cta: "Consulta disponibilidad y precio según el tamaño requerido.",
    },

    "photo-booths": {
      title: "Photo Booths",
      subtitle: "Captura los mejores momentos",
      description: "Dos opciones disponibles para que tus invitados se lleven recuerdos inolvidables.",
      features: [
        {
          title: "360° Photo Booth",
          items: [
            "Plataforma giratoria profesional",
            "Video desde todos los ángulos",
            "Cámara de alta resolución",
            "Brazo mecánico con movimiento suave",
          ]
        },
        {
          title: "Photo Booth Estático",
          items: [
            "Fotos de alta calidad",
            "Envío instantáneo por mensaje de texto",
            "Filtros y marcos personalizables",
            "Impresión opcional",
          ]
        },
        {
          title: "Entrega",
          items: [
            "Galería digital completa",
            "Envío automático a los invitados",
            "Branding personalizado disponible",
            "Props y accesorios incluidos",
          ]
        },
      ],
      capacity: "Ambos modelos disponibles con operador incluido.",
      images: [
        "/photobooth-360.jpg",
        "/photobooth-estatico.jpg",
      ],
      cta: "Añade este servicio a tu paquete o montaje.",
    },

    "efectos-especiales": {
      title: "Efectos Especiales",
      subtitle: "Momentos wow garantizados",
      description: "Efectos seguros y espectaculares para darle ese toque especial a tu evento.",
      features: [
        {
          title: "Chispas Frías",
          items: [
            "Máquinas de chispa fría seguras",
            "Efecto visual impactante",
            "Ideales para primer baile o entrada",
            "Sujeto a permisos del venue",
          ]
        },
        {
          title: "Confeti",
          items: [
            "Máquinas lanzadoras profesionales",
            "Confeti biodegradable disponible",
            "Efecto espectacular para momentos clave",
            "Requiere autorización del venue",
          ]
        },
        {
          title: "Humo & Neblina",
          items: [
            "Máquinas de humo vertical",
            "Máquina Haze para efectos atmosféricos",
            "Humo bajo para \"baile en nubes\"",
            "Control de densidad y dispersión",
          ]
        },
      ],
      capacity: "Todos los efectos cumplen con estándares de seguridad. Consultamos permisos del venue antes de confirmar.",
      images: [
        "/chispas-frias.jpg",
        "/confeti.jpg",
        "/humo-bajo.jpg",
      ],
      cta: "Importante: La disponibilidad de estos efectos depende de los permisos y regulaciones del venue.",
    },

    "animacion-mc": {
      title: "Animación & MC",
      subtitle: "La energía que tu evento necesita",
      description: "Maestro de ceremonias, animadores y coordinadores profesionales. Contamos con una red amplia de talento de confianza.",
      features: [
        {
          title: "Maestro de Ceremonias",
          items: [
            "Conducción profesional del evento",
            "Manejo de protocolos y agenda",
            "Voz clara y carismática",
            "Experiencia en eventos corporativos y sociales",
          ]
        },
        {
          title: "Animador",
          items: [
            "Interacción dinámica con invitados",
            "Juegos y actividades",
            "Energía y carisma",
            "Perfecto para eventos juveniles",
          ]
        },
        {
          title: "Coordinador de Evento",
          items: [
            "Manejo de timeline completo",
            "Coordinación con suplidores",
            "Comunicación con el venue",
            "Supervisión de montaje y desmontaje",
          ]
        },
        {
          title: "Extras",
          items: [
            "Batucada (3-5 integrantes)",
            "Hora loca con accesorios",
            "Equipo coordinado y profesional",
          ]
        },
      ],
      capacity: "Red amplia de contactos verificados. Recomendamos profesionales según el tipo y estilo de tu evento.",
      images: [
        "/mc.jpg",
        "/animador.jpg",
        "/coordinador.jpg",
      ],
      cta: "Trabajamos con los mejores profesionales. Cotización según el servicio y duración requerida.",
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

  return (
    <>
      {/* Botón atrás */}
      <section className="pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </a>
        </div>
      </section>

      {/* Hero del servicio */}
      <Section className="pt-0">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-2xl text-zinc-400 mb-6">{service.subtitle}</p>
          <p className="text-lg text-zinc-300 leading-relaxed">
            {service.description}
          </p>
        </div>
      </Section>

      {/* Galería de fotos */}
      {service.images && service.images.length > 0 && (
        <Section className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {service.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden bg-zinc-900"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Features detalladas */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {service.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl ${glass}`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {feature.title}
              </h3>
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Capacidad / Info adicional */}
      {service.capacity && (
        <Section className="py-12">
          <div className={`p-8 rounded-2xl ${glass} max-w-3xl mx-auto text-center`}>
            <h3 className="text-xl font-semibold text-white mb-4">
              Capacidad y disponibilidad
            </h3>
            <p className="text-zinc-300 leading-relaxed">{service.capacity}</p>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className={`p-8 rounded-2xl ${glass}`}>
            <p className="text-zinc-300 mb-6 leading-relaxed">{service.cta}</p>
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
            >
              Cotizar este servicio <ChevronRight className="w-5 h-5" />
            </a>
          </div>
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
