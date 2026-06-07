import { Activity, Brain, Dumbbell, HeartPulse, MapPin, Move3D, Stethoscope, Zap } from "lucide-react";

export const siteConfig = {
  name: "Fisiovanguardia",
  tagline: "Menos improvisación. Más criterio.",
  description:
    "Fisioterapia avanzada a domicilio en Madrid Norte con criterio clínico, tecnología y estrategia de recuperación.",
  url: "https://fisiovanguardia.com",
  phone: "+34 675 982 253",
  whatsappNumber: "34675982253",
  founders: ["Darío Estrada", "Vanesa Andrade"],
  areas: ["Chamartín", "Tetuán", "Las Tablas", "Sanchinarro", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos"]
};

export const navItems = [
  { label: "Servicios", href: "/fisioterapia-a-domicilio" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Artículos", href: "/articulos" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "MOVE OS", href: "/move-os" }
];

export const socialLinks = [
  { label: "YouTube", href: "https://youtube.com/@fisiovanguardia" },
  { label: "Instagram", href: "https://instagram.com/fisiovanguardia" },
  { label: "TikTok", href: "https://tiktok.com/@fisiovanguardia" },
  { label: "X", href: "https://x.com/fisiovanguardia" },
  { label: "Facebook", href: "https://facebook.com/fisiovanguardia" },
  { label: "LinkedIn Dario", href: "https://linkedin.com/in/dario-estrada" },
  { label: "LinkedIn Vanesa", href: "https://linkedin.com/in/vanesa-andrade" }
];

export const services = [
  {
    title: "Dolor cervical",
    copy: "Para cuello rígido, tensión, cefaleas y sobrecarga por trabajo, estrés o falta de movimiento real.",
    icon: Brain
  },
  {
    title: "Dolor lumbar",
    copy: "Para lumbalgia, rigidez, miedo a moverte o recaídas que vuelven cuando menos lo necesitas.",
    icon: Activity
  },
  {
    title: "Lesiones deportivas",
    copy: "Readaptación funcional, retorno progresivo al entrenamiento y criterio para volver sin jugar a la ruleta.",
    icon: Dumbbell
  },
  {
    title: "ATM / mandíbula",
    copy: "Para tensión mandibular, bruxismo, dolor facial y cefaleas asociadas a cuello y sistema nervioso.",
    icon: Stethoscope
  },
  {
    title: "Dolor crónico",
    copy: "Acompañamiento progresivo para dejar de vivir reaccionando al dolor.",
    icon: HeartPulse
  },
  {
    title: "Entrenamiento inteligente",
    copy: "Fuerza, control y movimiento para recuperar capacidad sin romperte por el camino.",
    icon: Move3D
  }
];

export const technologies = [
  "Ecografía funcional",
  "Indiba / diatermia",
  "Electrólisis cuando procede",
  "Ejercicio terapéutico",
  "Reeducación del movimiento",
  "Seguimiento digital futuro con MOVE OS"
];

export const methodSteps = [
  { step: "01", title: "Entendemos", copy: "Valoramos contexto, síntomas, historia y objetivos reales." },
  { step: "02", title: "Decidimos", copy: "Priorizamos lo que aporta valor clínico en tu caso." },
  { step: "03", title: "Tratamos", copy: "Aplicamos terapia manual, tecnología y educación cuando procede." },
  { step: "04", title: "Movemos", copy: "Construimos fuerza, control y confianza progresiva." },
  { step: "05", title: "Seguimos", copy: "Ajustamos el plan para que el avance no dependa de improvisar." }
];

export const faqItems = [
  {
    question: "¿Qué incluye una sesión de fisioterapia a domicilio?",
    answer:
      "Incluye valoración clínica, razonamiento del caso, tratamiento manual cuando procede, ejercicio terapéutico, educación y una propuesta clara de siguientes pasos."
  },
  {
    question: "¿Qué zonas del norte de Madrid cubrís?",
    answer:
      "Trabajamos principalmente en Chamartín, Tetuán, Las Tablas, Sanchinarro, Alcobendas, San Sebastián de los Reyes, Tres Cantos y otras zonas del norte de Madrid según agenda."
  },
  {
    question: "¿Cuándo elegir domicilio y cuándo consulta?",
    answer:
      "El domicilio tiene sentido si necesitas comodidad, continuidad, evitar desplazamientos o integrar la recuperación en tu entorno. Si tu caso exige equipamiento muy específico, te lo diremos con claridad."
  },
  {
    question: "¿Se puede tratar dolor lumbar en casa?",
    answer:
      "Sí. Muchos casos de dolor lumbar pueden valorarse y tratarse en casa con una combinación de educación, terapia manual, movimiento progresivo y estrategia de carga."
  },
  {
    question: "¿La fisioterapia a domicilio sirve para lesiones deportivas?",
    answer:
      "Si la lesión permite trabajo domiciliario, podemos orientar readaptación, fuerza, control motor y retorno progresivo al entrenamiento con criterio clínico."
  },
  {
    question: "¿Cómo reservar una visita?",
    answer:
      "Puedes solicitar tu visita desde el formulario de reserva, el asistente de recepción o WhatsApp. Revisamos tu caso y te proponemos disponibilidad."
  },
  {
    question: "¿Qué diferencia a Fisiovanguardia de una clínica tradicional?",
    answer:
      "No planteamos sesiones sueltas sin dirección. Combinamos criterio clínico, tecnología cuando aporta valor, trato humano y una estrategia preparada para evolucionar hacia MOVE OS."
  }
];

export const trustItems = [
  "+15 años de experiencia clínica",
  "Fisioterapia avanzada a domicilio",
  "Madrid Norte",
  "Dolor, lesiones y movimiento",
  "Método preparado para MOVE OS"
];

export const socialCards = [
  { channel: "YouTube", title: "Anatomía de la lesión, dolor explicado y MOVE OS.", cta: "Ver canal", href: socialLinks[0].href },
  { channel: "Instagram", title: "Ejercicio terapéutico, casos, movimiento y criterio clínico.", cta: "Seguir en Instagram", href: socialLinks[1].href },
  { channel: "TikTok", title: "Mitos, verdades y educación rápida sobre dolor y movimiento.", cta: "Ver vídeos", href: socialLinks[2].href },
  { channel: "X", title: "Reflexiones clínicas, innovación y salud digital.", cta: "Seguir en X", href: socialLinks[3].href },
  { channel: "Facebook", title: "Comunidad, novedades y recursos.", cta: "Ver Facebook", href: socialLinks[4].href }
];

export const iconHighlights = [
  { label: "Valoración", icon: Stethoscope },
  { label: "Tratamiento", icon: Zap },
  { label: "Movimiento", icon: Move3D },
  { label: "Seguimiento", icon: MapPin }
];
