export type PainMapZone = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  whatHappens: string;
  approach: string;
  goal: string;
  point: {
    top: string;
    left: string;
  };
  icon: "neck" | "shoulder" | "back" | "lumbar" | "hip" | "knee" | "ankle" | "jaw";
};

export const painMapZones: PainMapZone[] = [
  {
    id: "cervical",
    slug: "cervical",
    name: "Cuello y cervicales",
    subtitle: "Rigidez, tensión, cefaleas",
    description:
      "Una de las zonas donde más trabajamos. El dolor cervical puede generar cefaleas, mareos, tensión en hombros y limitación en tu día a día.",
    whatHappens:
      "Sobrecarga muscular, estrés, respiración superficial, alteraciones de movilidad cervical, mandíbula o columna torácica.",
    approach:
      "Evaluamos cuello, mandíbula, respiración, escápulas y columna torácica para decidir el tratamiento más efectivo.",
    goal: "Reducir dolor, mejorar movilidad, recuperar tolerancia al trabajo y prevenir recaídas.",
    point: { top: "16%", left: "50%" },
    icon: "neck"
  },
  {
    id: "hombro",
    slug: "hombro",
    name: "Hombro",
    subtitle: "Dolor al levantar el brazo",
    description:
      "El hombro no trabaja solo. Escápula, columna, cuello y carga influyen en cómo levantas el brazo, entrenas o descansas.",
    whatHappens: "Pérdida de control escapular, sobrecarga, limitación de movilidad o baja tolerancia al esfuerzo.",
    approach: "Integramos terapia manual, movilidad, fuerza progresiva y educación de carga.",
    goal: "Recuperar movimiento útil, reducir dolor y volver a entrenar o usar el brazo con confianza.",
    point: { top: "24%", left: "62%" },
    icon: "shoulder"
  },
  {
    id: "espalda-alta",
    slug: "espalda-alta",
    name: "Espalda alta",
    subtitle: "Tensión interescapular",
    description:
      "La espalda alta suele reflejar carga sostenida, postura rígida, respiración limitada o falta de movilidad torácica.",
    whatHappens: "Rigidez torácica, tensión muscular, estrés y falta de variabilidad de movimiento.",
    approach: "Trabajamos movilidad torácica, respiración, cuello, escápulas y control postural dinámico.",
    goal: "Reducir tensión, mejorar expansión torácica y liberar movimiento.",
    point: { top: "31%", left: "50%" },
    icon: "back"
  },
  {
    id: "lumbar",
    slug: "lumbar",
    name: "Espalda baja / lumbar",
    subtitle: "Lumbalgia, rigidez",
    description:
      "El dolor lumbar no siempre necesita reposo. Muchas veces necesita recuperar capacidad, confianza y progresión.",
    whatHappens: "Baja tolerancia a la carga, miedo al movimiento, rigidez o debilidad funcional.",
    approach: "Valoramos movilidad, fuerza, control lumbopélvico y exposición gradual al movimiento.",
    goal: "Moverte con menos miedo, más fuerza y más seguridad.",
    point: { top: "48%", left: "50%" },
    icon: "lumbar"
  },
  {
    id: "cadera",
    slug: "cadera",
    name: "Cadera",
    subtitle: "Dolor al moverte",
    description: "La cadera conecta columna, pelvis y piernas. Cuando pierde movilidad o fuerza, muchas zonas compensan.",
    whatHappens: "Rigidez articular, debilidad, sobrecarga muscular o falta de control en apoyo.",
    approach: "Combinamos movilidad, fuerza, control de pelvis y progresión funcional.",
    goal: "Mejorar movimiento, apoyo y tolerancia a caminar, entrenar o subir escaleras.",
    point: { top: "58%", left: "48%" },
    icon: "hip"
  },
  {
    id: "rodilla",
    slug: "rodilla",
    name: "Rodilla",
    subtitle: "Dolor, inestabilidad",
    description:
      "La rodilla necesita fuerza, control y confianza. No se trata solo de que duela menos, sino de que vuelva a tolerar carga.",
    whatHappens: "Déficit de fuerza, mala gestión de carga, inestabilidad o miedo al impacto.",
    approach: "Trabajamos fuerza progresiva, control de cadera/tobillo y retorno gradual a la actividad.",
    goal: "Mejorar estabilidad, fuerza y confianza al caminar, correr o entrenar.",
    point: { top: "74%", left: "57%" },
    icon: "knee"
  },
  {
    id: "tobillo-pie",
    slug: "tobillo-pie",
    name: "Tobillo y pie",
    subtitle: "Esguinces, fascitis, dolor",
    description:
      "Apoyar no siempre significa estar recuperado. El pie y el tobillo necesitan movilidad, fuerza y control.",
    whatHappens: "Pérdida de movilidad, déficit propioceptivo, debilidad del pie o mala tolerancia al impacto.",
    approach: "Reeducamos apoyo, fuerza intrínseca del pie, movilidad de tobillo y estabilidad.",
    goal: "Reducir recaídas, mejorar apoyo y volver a moverte con seguridad.",
    point: { top: "91%", left: "55%" },
    icon: "ankle"
  },
  {
    id: "atm",
    slug: "atm-migrana",
    name: "ATM y mandíbula",
    subtitle: "Mandíbula, cefaleas, bruxismo",
    description: "Mandíbula, cuello, respiración y sistema nervioso pueden formar parte del mismo patrón.",
    whatHappens: "Bruxismo, tensión mandibular, sobrecarga cervical, estrés o alteraciones respiratorias.",
    approach: "Evaluamos ATM, cuello, respiración, hábitos y sensibilidad del sistema nervioso.",
    goal: "Reducir tensión, mejorar movilidad mandibular y modular cefaleas asociadas.",
    point: { top: "11%", left: "54%" },
    icon: "jaw"
  }
];
