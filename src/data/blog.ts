export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  readingTime: string;
  date: string;
  thumbnail: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "Fisioterapia a domicilio: cuándo tiene sentido y cuándo no",
    slug: "fisioterapia-a-domicilio-cuando-tiene-sentido",
    category: "Fisioterapia avanzada",
    excerpt: "La fisioterapia en casa puede ser excelente si hay criterio, objetivos y un plan real.",
    author: "Fisiovanguardia",
    readingTime: "5 min",
    date: "2026-05-20",
    thumbnail: "/blog/cervical.jpg",
    body: [
      "La fisioterapia a domicilio no debe ser una versión reducida de la consulta. Tiene sentido cuando permite valorar tu entorno, evitar desplazamientos y sostener mejor el proceso.",
      "No todo caso encaja igual. Si necesitas equipamiento muy específico o pruebas complementarias, la decisión responsable puede ser derivar o combinar formatos.",
      "La clave no es el lugar. Es el razonamiento clínico, la progresión y la capacidad de adaptar el tratamiento a lo que tu cuerpo necesita."
    ]
  },
  {
    title: "Tu dolor cervical no necesita otro masaje",
    slug: "dolor-cervical-no-necesita-otro-masaje",
    category: "Dolor cervical",
    excerpt: "El alivio puntual puede ayudar, pero el cuello necesita entender carga, sistema nervioso y movimiento.",
    author: "Fisiovanguardia",
    readingTime: "4 min",
    date: "2026-05-18",
    thumbnail: "/blog/cervical.jpg",
    body: [
      "El masaje puede aliviar, pero si el dolor vuelve igual, falta una explicación más completa.",
      "El dolor cervical suele mezclar rigidez, estrés, postura mantenida, falta de fuerza y sensibilidad del sistema nervioso.",
      "Un buen plan combina tratamiento, educación y exposición progresiva al movimiento."
    ]
  },
  {
    title: "Dolor lumbar: por qué vuelve aunque se te pase",
    slug: "dolor-lumbar-por-que-vuelve",
    category: "Dolor lumbar",
    excerpt: "Que el dolor baje no significa que tu espalda haya recuperado capacidad.",
    author: "Fisiovanguardia",
    readingTime: "5 min",
    date: "2026-05-16",
    thumbnail: "/blog/lumbar.jpg",
    body: [
      "Muchas lumbalgias mejoran en días, pero reaparecen cuando la carga vuelve a superar la capacidad disponible.",
      "El objetivo no es proteger la espalda para siempre. Es devolverle confianza, tolerancia y recursos.",
      "La recuperación necesita progresión, no una lista de ejercicios sueltos."
    ]
  },
  {
    title: "Bruxismo y cuello: una relación que muchos ignoran",
    slug: "bruxismo-cuello-relacion",
    category: "ATM y cefaleas",
    excerpt: "Mandíbula, cuello y cefaleas pueden formar parte del mismo sistema de tensión y sensibilidad.",
    author: "Fisiovanguardia",
    readingTime: "4 min",
    date: "2026-05-12",
    thumbnail: "/blog/atm.jpg",
    body: [
      "La mandíbula no trabaja aislada. Convive con cuello, respiración, estrés y hábitos de carga.",
      "En algunos casos, el bruxismo se acompaña de dolor facial, cefalea o rigidez cervical.",
      "La fisioterapia puede ayudar a entender el patrón, modular síntomas y mejorar control."
    ]
  },
  {
    title: "Lesiones deportivas: el error de volver cuando ya no duele",
    slug: "lesiones-deportivas-error-volver-sin-dolor",
    category: "Lesiones deportivas",
    excerpt: "Sin dolor no siempre significa estar preparado para competir o entrenar igual.",
    author: "Fisiovanguardia",
    readingTime: "5 min",
    date: "2026-05-10",
    thumbnail: "/blog/lumbar.jpg",
    body: [
      "El dolor es una señal importante, pero no es la única medida de recuperación.",
      "Volver al deporte exige fuerza, tolerancia, control, velocidad y confianza ante gestos específicos.",
      "La readaptación reduce incertidumbre porque convierte la vuelta en una progresión medible."
    ]
  },
  {
    title: "Dolor crónico: no estás roto, estás en un sistema sensibilizado",
    slug: "dolor-cronico-sistema-sensibilizado",
    category: "Dolor crónico",
    excerpt: "El dolor persistente necesita explicación, calma, movimiento progresivo y acompañamiento.",
    author: "Fisiovanguardia",
    readingTime: "6 min",
    date: "2026-05-08",
    thumbnail: "/blog/atm.jpg",
    body: [
      "El dolor crónico no significa que tu cuerpo esté roto. A menudo significa que el sistema de alarma está demasiado sensible.",
      "La recuperación no se basa en forzar, sino en encontrar dosis tolerables de movimiento, seguridad y progresión.",
      "Entender lo que ocurre reduce miedo y abre espacio para recuperar capacidad."
    ]
  }
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
