export type ClinicalModule = {
  slug: string;
  title: string;
  emotionalLine: string;
  description: string;
  icon: "cervical" | "lumbar" | "atm" | "hombro" | "rodilla" | "tobillo" | "dolor" | "performance";
  hero: string;
  anatomyImage: string;
  whatHappens: string[];
  commonMistakes: string[];
  howWeWork: string[];
  goals: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const clinicalModules: ClinicalModule[] = [
  {
    slug: "cervical",
    title: "Tratamiento cervical",
    emotionalLine: "Cuando el cuello deja de ser solo tensión y empieza a limitar tu descanso, tu trabajo o tu seguridad al moverte.",
    description: "Cuello, cefaleas, pantalla, estrés y movimiento leídos como un sistema.",
    icon: "cervical",
    hero: "Cuando el cuello deja de ser solo tensión y empieza a limitar tu descanso, tu trabajo o tu seguridad al moverte, no basta con descargar la zona. Analizamos respiración, mandíbula, escápulas, columna y tolerancia a la carga para decidir qué necesita cambiar.",
    anatomyImage: "/anatomy/cervical.jpg",
    whatHappens: ["Rigidez mantenida", "Cefaleas asociadas", "Tensión por carga mental o postural"],
    commonMistakes: ["Buscar solo alivio rápido", "Repetir masajes sin estrategia", "Evitar movimiento por miedo"],
    howWeWork: ["Valoramos cuello, hombro, respiración y mandíbula", "Reducimos irritación cuando procede", "Reintroducimos movilidad y fuerza progresiva"],
    goals: ["Menos sensibilidad", "Más movilidad útil", "Más confianza para trabajar, entrenar y descansar"],
    faq: [
      { question: "¿Se puede tratar dolor cervical a domicilio?", answer: "Sí, si el caso encaja clínicamente. Podemos valorar movilidad, carga, síntomas y contexto en casa." },
      { question: "¿El tratamiento cervical es solo masaje?", answer: "No. Puede incluir terapia manual, educación, ejercicio, control de carga y tecnología si aporta valor." }
    ]
  },
  {
    slug: "lumbar",
    title: "Tratamiento lumbar",
    emotionalLine: "Para una espalda que mejora, vuelve a doler y te hace dudar de cada movimiento.",
    description: "Dolor lumbar, rigidez, recaídas y capacidad de carga con una ruta clara.",
    icon: "lumbar",
    hero: "El dolor lumbar no siempre necesita reposo. Muchas veces necesita recuperar capacidad, confianza y una progresión bien medida. Trabajamos movilidad, control, fuerza y exposición gradual al movimiento.",
    anatomyImage: "/anatomy/lumbar.jpg",
    whatHappens: ["La espalda baja tolera peor la carga", "El miedo condiciona cómo te mueves", "La mejoría no siempre recupera capacidad"],
    commonMistakes: ["Reposo excesivo", "Ejercicios genéricos sin dosis", "Volver de golpe cuando ya no duele"],
    howWeWork: ["Identificamos irritabilidad y tolerancia", "Ajustamos movimiento y carga", "Construimos fuerza y seguridad progresiva"],
    goals: ["Moverte sin anticipar dolor", "Tolerar carga diaria", "Recuperar confianza en tu espalda"],
    faq: [
      { question: "¿La lumbalgia se puede trabajar en casa?", answer: "Sí. Muchos casos pueden abordarse con valoración, educación, movimiento dosificado y progresión." },
      { question: "¿Siempre hace falta tecnología?", answer: "No. La tecnología se usa solo cuando mejora la decisión clínica o el proceso." }
    ]
  },
  {
    slug: "atm-migrana",
    title: "ATM y migraña",
    emotionalLine: "Mandíbula, cuello y cefaleas no siempre son problemas separados.",
    description: "Bruxismo, ATM, dolor facial y migraña desde una lectura integrada.",
    icon: "atm",
    hero: "Mandíbula, cuello, respiración y sistema nervioso pueden formar parte de un mismo patrón. El objetivo no es perseguir síntomas aislados, sino entender qué factores sostienen la tensión y cómo modularlos.",
    anatomyImage: "/anatomy/atm.jpg",
    whatHappens: ["Tensión mandibular", "Cefaleas o dolor facial", "Cuello y ATM se influyen mutuamente"],
    commonMistakes: ["Tratar solo la mandíbula", "Ignorar cuello y respiración", "No observar hábitos diarios"],
    howWeWork: ["Valoramos ATM, cuello y sensibilidad", "Aplicamos terapia manual si procede", "Damos pautas de control y descarga"],
    goals: ["Reducir tensión", "Mejorar control mandibular", "Entender detonantes y señales"],
    faq: [
      { question: "¿Tratáis bruxismo?", answer: "Trabajamos sus manifestaciones musculares y de control, sin sustituir la valoración odontológica cuando sea necesaria." },
      { question: "¿ATM y cuello pueden estar relacionados?", answer: "Sí. En muchos casos comparten tensión, sensibilidad y patrones de carga." }
    ]
  },
  {
    slug: "hombro",
    title: "Hombro",
    emotionalLine: "Cuando levantar el brazo, entrenar o dormir empieza a depender del dolor.",
    description: "Movilidad, control escapular, fuerza y retorno progresivo a la carga.",
    icon: "hombro",
    hero: "El hombro no trabaja solo. Escápula, columna torácica, cuello, fuerza y carga influyen en cómo levantas el brazo, entrenas o duermes. Buscamos recuperar movimiento útil y tolerancia progresiva.",
    anatomyImage: "/anatomy/shoulder.jpg",
    whatHappens: ["Dolor al elevar", "Pérdida de fuerza", "Compensaciones de cuello y escápula"],
    commonMistakes: ["Forzar rangos irritables", "Evitar todo esfuerzo", "No progresar fuerza"],
    howWeWork: ["Leemos movilidad y control", "Ajustamos irritabilidad", "Progresamos fuerza y gestos relevantes"],
    goals: ["Mover el brazo con más seguridad", "Recuperar carga", "Volver a entrenar o trabajar con criterio"],
    faq: [
      { question: "¿Todo dolor de hombro necesita reposo?", answer: "No. La clave suele ser ajustar dosis, rango y progresión según tolerancia." },
      { question: "¿Se trabaja también la escápula?", answer: "Sí. El hombro funciona con tronco, cuello, escápula y carga." }
    ]
  },
  {
    slug: "espalda-alta",
    title: "Espalda alta",
    emotionalLine: "Cuando la tensión entre escápulas, cuello y respiración empieza a limitar tu día.",
    description: "Tensión interescapular, rigidez torácica y carga postural sostenida.",
    icon: "lumbar",
    hero: "La espalda alta suele reflejar carga sostenida, postura rígida, respiración limitada o falta de movilidad torácica. Trabajamos cuello, escápulas, columna torácica y control respiratorio para recuperar variabilidad de movimiento.",
    anatomyImage: "/anatomy/shoulder.jpg",
    whatHappens: ["Rigidez torácica", "Tensión muscular persistente", "Respiración limitada o postura sostenida"],
    commonMistakes: ["Tratar solo la contractura", "Mantener posturas rígidas sin pausas", "No revisar cuello, escápulas y respiración"],
    howWeWork: ["Valoramos movilidad torácica y cervical", "Integramos respiración y escápulas", "Construimos movilidad útil y control postural dinámico"],
    goals: ["Reducir tensión", "Mejorar expansión torácica", "Moverte con más libertad"],
    faq: [
      { question: "¿La espalda alta puede relacionarse con el cuello?", answer: "Sí. Cuello, escápulas, respiración y columna torácica suelen influirse entre sí." },
      { question: "¿Solo hace falta masajear la zona?", answer: "No siempre. El alivio puede ayudar, pero la clave suele estar en movilidad, carga, respiración y hábitos." }
    ]
  },
  {
    slug: "cadera",
    title: "Cadera",
    emotionalLine: "Cuando caminar, subir escaleras o entrenar empieza a depender de cómo responde tu cadera.",
    description: "Movilidad, apoyo, pelvis, fuerza y tolerancia funcional.",
    icon: "rodilla",
    hero: "La cadera conecta columna, pelvis y piernas. Cuando pierde movilidad o fuerza, muchas zonas compensan. Combinamos movilidad, fuerza, control de pelvis y progresión funcional para mejorar apoyo y tolerancia.",
    anatomyImage: "/anatomy/lumbar.jpg",
    whatHappens: ["Rigidez articular", "Debilidad o baja tolerancia al apoyo", "Compensaciones en pelvis, lumbar o rodilla"],
    commonMistakes: ["Estirar sin construir fuerza", "Ignorar el apoyo y la pelvis", "Volver a cargar sin progresión"],
    howWeWork: ["Valoramos movilidad y fuerza", "Integramos pelvis, columna y pierna", "Progresamos apoyo, carga y gestos funcionales"],
    goals: ["Mejorar movimiento", "Ganar confianza al apoyar", "Tolerar caminar, entrenar o subir escaleras"],
    faq: [
      { question: "¿El dolor de cadera puede venir de la lumbar?", answer: "A veces sí. Por eso valoramos columna, pelvis, apoyo y fuerza antes de decidir el plan." },
      { question: "¿Se puede trabajar la cadera a domicilio?", answer: "Sí, si el caso encaja. Podemos valorar movilidad, fuerza y control funcional en casa." }
    ]
  },
  {
    slug: "rodilla",
    title: "Rodilla",
    emotionalLine: "Para una rodilla que te frena al correr, subir escaleras o volver al deporte.",
    description: "Carga, control, fuerza y progresión para recuperar confianza en el apoyo.",
    icon: "rodilla",
    hero: "La rodilla necesita fuerza, control y confianza. No se trata solo de que duela menos, sino de que vuelva a tolerar escaleras, entrenamiento, carrera o actividad diaria.",
    anatomyImage: "/anatomy/knee.jpg",
    whatHappens: ["La carga supera la tolerancia", "Falta fuerza o control", "El gesto deportivo llega demasiado pronto"],
    commonMistakes: ["Volver cuando solo ha bajado el dolor", "No medir progresión", "Evitar fuerza por miedo"],
    howWeWork: ["Valoramos apoyo y control", "Ajustamos carga", "Construimos fuerza y retorno gradual"],
    goals: ["Más estabilidad", "Más tolerancia a impacto", "Vuelta progresiva a actividad"],
    faq: [
      { question: "¿Puedo entrenar con dolor de rodilla?", answer: "Depende de la irritabilidad y la respuesta a la carga. Lo ajustamos caso a caso." },
      { question: "¿La fuerza es importante?", answer: "Sí. Bien dosificada, suele ser parte clave de la recuperación." }
    ]
  },
  {
    slug: "tobillo-pie",
    title: "Tobillo y pie",
    emotionalLine: "El apoyo es la base. Si falla, todo el movimiento cambia.",
    description: "Esguinces, rigidez, propiocepción, pie y retorno seguro al impacto.",
    icon: "tobillo",
    hero: "Después de un esguince, una fascitis o una molestia persistente, apoyar no siempre significa estar recuperado. Trabajamos movilidad, estabilidad, fuerza del pie y retorno progresivo.",
    anatomyImage: "/anatomy/ankle-foot.jpg",
    whatHappens: ["Rigidez tras lesión", "Inseguridad en apoyo", "Compensaciones en rodilla o cadera"],
    commonMistakes: ["Dar el esguince por cerrado demasiado pronto", "No trabajar equilibrio y fuerza", "Volver al impacto sin progresión"],
    howWeWork: ["Valoramos movilidad y apoyo", "Reentrenamos control", "Progresamos fuerza, saltos e impacto"],
    goals: ["Apoyo más seguro", "Menos recaídas", "Mejor respuesta en deporte o vida diaria"],
    faq: [
      { question: "¿Un esguince necesita readaptación?", answer: "A menudo sí, especialmente si hay inseguridad, rigidez o recaídas." },
      { question: "¿Trabajáis pie además de tobillo?", answer: "Sí. El pie forma parte del sistema de apoyo." }
    ]
  },
  {
    slug: "dolor-cronico",
    title: "Dolor persistente",
    emotionalLine: "No estás roto. Tu sistema puede estar demasiado protegido.",
    description: "Dolor persistente, sensibilidad, miedo y recuperación de capacidad.",
    icon: "dolor",
    hero: "Cuando el dolor lleva tiempo, el cuerpo necesita algo más que tratamiento puntual. Necesita educación, regulación, movimiento dosificado y seguimiento para recuperar seguridad.",
    anatomyImage: "/anatomy/chronic-pain.jpg",
    whatHappens: ["El sistema de alarma se sensibiliza", "El miedo reduce movimiento", "La vida se organiza alrededor del dolor"],
    commonMistakes: ["Buscar una única causa", "Forzar hasta romper tolerancia", "Abandonar por avances pequeños"],
    howWeWork: ["Explicamos el proceso", "Encontramos dosis tolerables", "Construimos capacidad de forma gradual"],
    goals: ["Más comprensión", "Más tolerancia", "Más vida fuera del dolor"],
    faq: [
      { question: "¿El dolor persistente significa daño permanente?", answer: "No necesariamente. Puede implicar sensibilidad aumentada y necesita un enfoque progresivo." },
      { question: "¿Se puede mejorar capacidad con dolor persistente?", answer: "Sí, con educación, dosis adecuadas y seguimiento." }
    ]
  },
  {
    slug: "lesiones-deportivas",
    title: "Lesiones deportivas",
    emotionalLine: "Volver al deporte no es esperar a que deje de doler.",
    description: "Readaptación, retorno progresivo, fuerza, control y rendimiento.",
    icon: "performance",
    hero: "Volver al deporte no es solo esperar a que deje de doler. Es reconstruir capacidad, velocidad, fuerza, coordinación y confianza con una progresión inteligente.",
    anatomyImage: "/anatomy/sports-injury.jpg",
    whatHappens: ["El tejido mejora antes que el rendimiento", "La confianza no vuelve sola", "El gesto deportivo exige progresión"],
    commonMistakes: ["Volver por sensaciones", "Saltarse fuerza", "No medir impacto, velocidad o fatiga"],
    howWeWork: ["Definimos demandas del deporte", "Progresamos fuerza y control", "Ajustamos retorno por fases"],
    goals: ["Volver con criterio", "Reducir recaídas", "Recuperar capacidad deportiva"],
    faq: [
      { question: "¿Cuándo puedo volver a entrenar?", answer: "Depende de la lesión, tolerancia y demandas. Se decide por criterios, no solo por ausencia de dolor." },
      { question: "¿La readaptación sustituye a la fisioterapia?", answer: "No. Se integra con tratamiento, ejercicio y seguimiento." }
    ]
  }
];

export function getClinicalModule(slug: string) {
  return clinicalModules.find((module) => module.slug === slug);
}
