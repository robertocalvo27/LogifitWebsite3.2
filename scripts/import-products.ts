const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const mockProducts = {
  "smartwatch-fatigue-monitor-x1": {
    name: "SmartWatch Fatigue Monitor X1",
    slug: "smartwatch-fatigue-monitor-x1",
    status1: "active",
    price: 299,
    shortDescription: "Monitoreo avanzado de fatiga con tecnología de última generación y pantalla AMOLED",
    description: "El SmartWatch Fatigue Monitor X1 representa lo último en tecnología de monitoreo de fatiga. Equipado con sensores de alta precisión y algoritmos avanzados de IA, este dispositivo detecta y previene la fatiga en tiempo real. Su pantalla AMOLED de alta resolución ofrece una excelente visibilidad en cualquier condición de luz, mientras que su batería de larga duración garantiza un monitoreo continuo durante toda la jornada laboral.",
    ctaType: "demo",
    ctaText: "Solicitar Demo",
    ctaLink: "/productos/smartwatch-x1",
    ProductFeature: [
      {
        title: "Monitoreo Continuo",
        description: "Seguimiento 24/7 de signos vitales y patrones de sueño",
        icon: "Activity"
      },
      {
        title: "Alertas en Tiempo Real",
        description: "Notificaciones inmediatas cuando se detectan signos de fatiga",
        icon: "Bell"
      },
      {
        title: "Batería de Larga Duración",
        description: "Hasta 72 horas de uso continuo con una sola carga",
        icon: "Battery"
      },
      {
        title: "Resistente al Agua",
        description: "Certificación IP68 para uso en condiciones adversas",
        icon: "Droplet"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Tipo de Pantalla",
        value: "AMOLED 1.4\" de alta resolución"
      },
      {
        label: "Duración de Batería",
        value: "72 horas en uso continuo"
      },
      {
        label: "Sensores",
        value: "Ritmo cardíaco, SpO2, Acelerómetro, Giroscopio"
      },
      {
        label: "Conectividad",
        value: "Bluetooth 5.0, WiFi"
      },
      {
        label: "Resistencia al Agua",
        value: "IP68 (hasta 50m)"
      }
    ],
    ProductBenefit: [
      {
        title: "Prevención Proactiva",
        description: "Anticipa y previene situaciones de riesgo por fatiga",
        icon: "Shield"
      },
      {
        title: "Análisis Avanzado",
        description: "Reportes detallados y tendencias de fatiga",
        icon: "BarChart2"
      },
      {
        title: "Fácil Integración",
        description: "Compatible con sistemas de gestión de flotas",
        icon: "Link"
      },
      {
        title: "Soporte 24/7",
        description: "Asistencia técnica disponible todo el día",
        icon: "HeadPhones"
      }
    ],
    reviews: [
      {
        author: "Juan Pérez",
        rating: 5,
        date: "2024-02-28",
        title: "Excelente para la seguridad",
        comment: "Implementamos estos dispositivos en nuestra flota y hemos visto una reducción significativa en incidentes por fatiga. La batería dura lo prometido y las alertas son precisas.",
        verified: true,
        likes: 15,
        company: "Transportes Seguros SA"
      },
      {
        author: "María González",
        rating: 5,
        date: "2024-02-15",
        title: "Tecnología confiable",
        comment: "La precisión en la detección de fatiga es impresionante. El soporte técnico es excelente y la integración con nuestros sistemas fue sencilla.",
        verified: true,
        likes: 12,
        company: "Logística Express"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsCount: 2,
    images: []
  },
  "smartband-fatigue-pro": {
    name: "SmartBand Fatigue Pro",
    slug: "smartband-fatigue-pro",
    status1: "active",
    price: 199,
    shortDescription: "Pulsera inteligente ultraligera con monitoreo avanzado de fatiga",
    description: "La SmartBand Fatigue Pro es la solución ideal para monitoreo de fatiga en entornos profesionales. Su diseño ergonómico y ultraligero garantiza comodidad durante largas jornadas, mientras que sus sensores de última generación proporcionan datos precisos sobre niveles de fatiga y alertas preventivas. Perfecta para conductores profesionales y operadores de maquinaria que requieren un monitoreo constante sin interferir con sus actividades.",
    ctaType: "contact",
    ctaText: "Contactar Ventas",
    ctaLink: "/productos/smartband-pro",
    ProductFeature: [
      {
        title: "Diseño Ultraligero",
        description: "Peso de solo 28g para máxima comodidad",
        icon: "Feather"
      },
      {
        title: "Monitoreo Inteligente",
        description: "Detección automática de patrones de fatiga",
        icon: "Brain"
      },
      {
        title: "Conectividad Avanzada",
        description: "Sincronización instantánea con la plataforma",
        icon: "Wifi"
      },
      {
        title: "Modo Profesional",
        description: "Configuraciones específicas para diferentes industrias",
        icon: "Settings"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Tipo de Pantalla",
        value: "OLED 0.96\" táctil"
      },
      {
        label: "Autonomía",
        value: "7 días de uso continuo"
      },
      {
        label: "Peso",
        value: "28 gramos"
      },
      {
        label: "Sensores",
        value: "Ritmo cardíaco, Movimiento, Temperatura"
      },
      {
        label: "Resistencia",
        value: "IP67 resistente al agua y polvo"
      }
    ],
    ProductBenefit: [
      {
        title: "Confort Garantizado",
        description: "Diseño ergonómico para uso prolongado",
        icon: "Smile"
      },
      {
        title: "Datos en Tiempo Real",
        description: "Monitoreo continuo con alertas instantáneas",
        icon: "Clock"
      },
      {
        title: "Bajo Mantenimiento",
        description: "Durabilidad y resistencia comprobada",
        icon: "Tool"
      },
      {
        title: "ROI Comprobado",
        description: "Reducción demostrada de incidentes",
        icon: "TrendingUp"
      }
    ],
    reviews: [
      {
        author: "Carlos Rodríguez",
        rating: 5,
        date: "2024-02-20",
        title: "Perfecta para nuestra flota",
        comment: "Implementamos estas pulseras en toda nuestra flota de conductores. La duración de la batería es excelente y los datos son muy precisos. El soporte técnico es excepcional.",
        verified: true,
        likes: 18,
        company: "TransCargo Internacional"
      },
      {
        author: "Ana Martínez",
        rating: 4,
        date: "2024-02-10",
        title: "Muy buena inversión",
        comment: "Excelente relación calidad-precio. La comodidad es notable y los conductores la aceptaron muy bien. Las alertas son precisas y han ayudado a prevenir situaciones de riesgo.",
        verified: true,
        likes: 14,
        company: "Logística del Norte"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsCount: 2,
    images: []
  },
  "fatigue-monitor-station": {
    name: "Fatigue Monitor Station",
    slug: "fatigue-monitor-station",
    status1: "active",
    price: 499,
    shortDescription: "Estación de monitoreo completa para control de fatiga en instalaciones",
    description: "La Fatigue Monitor Station es una solución integral para el control de fatiga en puntos fijos. Ideal para controles de acceso, salas de control y puntos de verificación. Combina tecnología de reconocimiento facial con análisis de patrones de fatiga para garantizar que el personal esté en condiciones óptimas antes de iniciar sus labores. Incluye software de gestión y reportes en tiempo real.",
    ctaType: "quote",
    ctaText: "Solicitar Cotización",
    ctaLink: "/productos/fatigue-station",
    ProductFeature: [
      {
        title: "Análisis Facial Avanzado",
        description: "Reconocimiento facial y detección de micro expresiones",
        icon: "Eye"
      },
      {
        title: "Reportes en Tiempo Real",
        description: "Dashboard con métricas y alertas instantáneas",
        icon: "PieChart"
      },
      {
        title: "Control de Acceso",
        description: "Integración con sistemas de seguridad",
        icon: "Lock"
      },
      {
        title: "Multi-Usuario",
        description: "Soporte para múltiples perfiles y turnos",
        icon: "Users"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "LCD 15\" táctil industrial"
      },
      {
        label: "Cámara",
        value: "4K con visión nocturna"
      },
      {
        label: "Procesamiento",
        value: "Intel i5 industrial grade"
      },
      {
        label: "Conectividad",
        value: "Ethernet, WiFi, 4G opcional"
      },
      {
        label: "Alimentación",
        value: "110/220V con backup UPS"
      }
    ],
    ProductBenefit: [
      {
        title: "Control Centralizado",
        description: "Gestión centralizada de múltiples puntos",
        icon: "Target"
      },
      {
        title: "Cumplimiento Normativo",
        description: "Ayuda a cumplir regulaciones de seguridad",
        icon: "CheckSquare"
      },
      {
        title: "Instalación Profesional",
        description: "Servicio completo de instalación y configuración",
        icon: "Tool"
      },
      {
        title: "Escalabilidad",
        description: "Fácil expansión según necesidades",
        icon: "Maximize"
      }
    ],
    reviews: [
      {
        author: "Roberto Sánchez",
        rating: 5,
        date: "2024-01-15",
        title: "Excelente para control de acceso",
        comment: "Instalamos tres unidades en diferentes puntos de acceso. La precisión en la detección de fatiga es excepcional y la integración con nuestro sistema de control de acceso fue perfecta.",
        verified: true,
        likes: 22,
        company: "Minera del Sur"
      },
      {
        author: "Patricia López",
        rating: 5,
        date: "2024-01-28",
        title: "Solución completa",
        comment: "La estación cumple perfectamente su función. El soporte técnico durante la instalación fue excelente y los reportes nos ayudan a tomar decisiones informadas.",
        verified: true,
        likes: 17,
        company: "Industrias Químicas SA"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 90 },
      { stars: 4, percentage: 8 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsCount: 2,
    images: []
  },
  "xiaomi-mi-band-9": {
    name: "Xiaomi Mi Band 9",
    slug: "xiaomi-mi-band-9",
    status1: "active",
    price: 59.99,
    shortDescription: "Pulsera inteligente con monitoreo avanzado de fatiga, sueño y alertas de somnolencia para entornos industriales",
    description: "La Xiaomi Mi Band 9 ha sido adaptada para el monitoreo de fatiga en entornos industriales. Con su pantalla AMOLED de 1.62\" más brillante y nítida, permite visualizar alertas de fatiga y somnolencia en tiempo real. Su sistema de monitoreo continuo detecta patrones de sueño irregulares, niveles de oxígeno en sangre y variabilidad de la frecuencia cardíaca para identificar signos tempranos de fatiga. Ideal para conductores profesionales, operadores de maquinaria y trabajadores en turnos rotativos. Su batería de larga duración proporciona hasta 14 días de monitoreo continuo, garantizando la seguridad durante toda la jornada laboral.",
    ctaType: "demo",
    ctaText: "Solicitar Demo",
    ctaLink: "/productos/xiaomi-mi-band-9",
    ProductFeature: [
      {
        title: "Detección de Fatiga",
        description: "Algoritmos avanzados que identifican signos tempranos de fatiga y somnolencia",
        icon: "AlertTriangle"
      },
      {
        title: "Monitoreo de Sueño Profesional",
        description: "Análisis detallado de ciclos de sueño para prevenir fatiga acumulada",
        icon: "Moon"
      },
      {
        title: "Alertas de Somnolencia",
        description: "Vibraciones y notificaciones cuando se detectan signos de microsueños",
        icon: "Bell"
      },
      {
        title: "Batería de Larga Duración",
        description: "14 días de monitoreo continuo para turnos extendidos sin interrupciones",
        icon: "Battery"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "AMOLED 1.62\" (326 PPI) visible en condiciones industriales"
      },
      {
        label: "Sensores",
        value: "Ritmo cardíaco, SpO2, Acelerómetro, Giroscopio, Sensor de movimiento ocular"
      },
      {
        label: "Batería",
        value: "14 días en monitoreo continuo de fatiga"
      },
      {
        label: "Resistencia",
        value: "5ATM, resistente a polvo y entornos industriales"
      },
      {
        label: "Conectividad",
        value: "Bluetooth 5.2 con alertas a supervisores"
      },
      {
        label: "Peso",
        value: "27 gramos para uso cómodo en turnos prolongados"
      }
    ],
    ProductBenefit: [
      {
        title: "Prevención de Accidentes",
        description: "Reduce riesgos laborales al detectar fatiga antes de que cause incidentes",
        icon: "Shield"
      },
      {
        title: "Gestión de Turnos Rotativos",
        description: "Ayuda a adaptar los ciclos de sueño para trabajadores con horarios variables",
        icon: "Clock"
      },
      {
        title: "Monitoreo de Salud Ocupacional",
        description: "Seguimiento de indicadores clave para prevenir enfermedades laborales",
        icon: "Heart"
      },
      {
        title: "Integración con Sistemas de Seguridad",
        description: "Compatible con plataformas de gestión de fatiga empresarial",
        icon: "Link"
      }
    ],
    reviews: [
      {
        author: "Carlos Rodríguez",
        rating: 5,
        date: "2024-02-05",
        title: "Excelente para nuestra flota de transporte",
        comment: "Implementamos estas pulseras en nuestra flota de conductores de larga distancia y hemos reducido los incidentes por fatiga en un 60%. El sistema de alertas funciona perfectamente y la batería dura todo el ciclo de trabajo.",
        verified: true,
        likes: 24,
        company: "Transportes Seguros S.A."
      },
      {
        author: "Laura Martínez",
        rating: 4,
        date: "2024-01-20",
        title: "Gran solución para turnos nocturnos",
        comment: "Nuestros operadores de maquinaria en turnos nocturnos han mejorado significativamente su alerta gracias al monitoreo continuo. Las alertas de microsueños han evitado situaciones potencialmente peligrosas. Solo le falta integración directa con nuestro sistema central.",
        verified: true,
        likes: 18,
        company: "Minera del Norte"
      },
      {
        author: "Javier Méndez",
        rating: 5,
        date: "2024-02-12",
        title: "Indispensable para gestión de fatiga",
        comment: "Como responsable de seguridad industrial, puedo confirmar que estas pulseras han revolucionado nuestra gestión de fatiga. Los datos que proporciona nos permiten optimizar horarios y prevenir la fatiga acumulada en nuestro personal.",
        verified: true,
        likes: 31,
        company: "Industrias Químicas Avanzadas"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 78 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsCount: 3,
    images: []
  },
  "amazfit-band-7": {
    name: "AMAZFIT BAND 7",
    slug: "amazfit-band-7",
    status1: "active",
    price: 89.99,
    shortDescription: "Sistema avanzado de monitoreo de fatiga con 18 días de autonomía | Detección de microsueños | Alertas de somnolencia en tiempo real",
    description: "Amazfit Band 7, adaptada para entornos industriales, ofrece un sistema integral de monitoreo de fatiga y somnolencia. Su pantalla AMOLED de 1.47 pulgadas con 282 PPI permite visualizar claramente alertas y niveles de fatiga incluso en condiciones de baja visibilidad. Con 18 días de autonomía, garantiza la protección continua durante turnos extendidos y semanas completas de trabajo. Su tecnología de detección de microsueños analiza patrones de movimiento ocular y variabilidad cardíaca para identificar signos tempranos de somnolencia, enviando alertas vibratorias al trabajador y notificaciones al supervisor cuando es necesario. Ideal para conductores profesionales, operadores de maquinaria pesada y trabajadores en entornos de alto riesgo.",
    ctaType: "quote",
    ctaText: "Cotiza Aquí",
    ctaLink: "/productos/amazfit-band-7",
    ProductFeature: [
      {
        title: "Detección de Microsueños",
        description: "Identifica episodios de microsueños mediante análisis de movimiento ocular y cardíaco",
        icon: "Eye"
      },
      {
        title: "Monitoreo Continuo de Fatiga",
        description: "Análisis 24/7 de signos vitales para prevenir fatiga acumulada",
        icon: "Activity"
      },
      {
        title: "Alertas Multinivel",
        description: "Sistema de alertas vibratorias y visuales con escalado a supervisores",
        icon: "Bell"
      },
      {
        title: "Autonomía Extendida",
        description: "18 días de monitoreo continuo para ciclos completos de trabajo",
        icon: "Battery"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "AMOLED 1.47\" HD (282 PPI) visible en condiciones industriales"
      },
      {
        label: "Batería",
        value: "232 mAh, hasta 18 días de monitoreo continuo"
      },
      {
        label: "Sensores",
        value: "Ritmo cardíaco, SpO2, Acelerómetro, Detector de movimiento ocular"
      },
      {
        label: "Resistencia",
        value: "5 ATM, resistente a polvo y entornos industriales"
      },
      {
        label: "Conectividad",
        value: "Bluetooth 5.0 con alertas remotas a sistema central"
      }
    ],
    ProductBenefit: [
      {
        title: "Prevención Proactiva",
        description: "Detecta fatiga antes de que cause accidentes o incidentes laborales",
        icon: "Shield"
      },
      {
        title: "Análisis de Patrones de Sueño",
        description: "Identifica problemas de sueño que afectan el rendimiento laboral",
        icon: "Moon"
      },
      {
        title: "Gestión de Fatiga Corporativa",
        description: "Integración con sistemas de gestión de seguridad industrial",
        icon: "Briefcase"
      },
      {
        title: "Reportes de Cumplimiento",
        description: "Documentación para normativas de seguridad y salud ocupacional",
        icon: "FileText"
      }
    ],
    reviews: [
      {
        author: "Roberto Sánchez",
        rating: 5,
        date: "2024-01-18",
        title: "Fundamental para nuestra operación minera",
        comment: "Implementamos estas pulseras en nuestros operadores de maquinaria pesada y hemos reducido los incidentes por fatiga en un 70%. El sistema de alertas es muy efectivo y la duración de la batería permite cubrir turnos completos sin interrupciones.",
        verified: true,
        likes: 22,
        company: "Minera Continental"
      },
      {
        author: "María Fernández",
        rating: 4,
        date: "2024-02-05",
        title: "Excelente para gestión de fatiga en transporte",
        comment: "Nuestra flota de transporte de materiales peligrosos utiliza estas pulseras con resultados sobresalientes. La detección temprana de somnolencia ha evitado situaciones potencialmente catastróficas. El análisis de sueño nos ayuda a optimizar los horarios de los conductores.",
        verified: true,
        likes: 15,
        company: "Transportes Seguros"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsCount: 2,
    images: []
  },
  "honor-band-6": {
    name: "HONOR BAND 6",
    slug: "honor-band-6",
    status1: "active",
    price: 79.99,
    shortDescription: "Sistema de monitoreo de fatiga con pantalla AMOLED de 1.47″ | Detección de somnolencia | Análisis de calidad de sueño para prevención de fatiga",
    description: "La Honor Band 6, adaptada para entornos industriales, ofrece un sistema completo de monitoreo de fatiga y somnolencia. Su pantalla AMOLED de 1.47″ permite visualizar claramente niveles de alerta y fatiga en tiempo real. Con tecnología TruSeen 4.0, monitorea continuamente la frecuencia cardíaca y detecta anomalías que indican fatiga o somnolencia. Su análisis científico del sueño TruSleep identifica patrones irregulares que contribuyen a la fatiga acumulada, proporcionando recomendaciones para mejorar la calidad del descanso. Con 14 días de autonomía y resistencia al agua 5ATM, es ideal para trabajadores en entornos industriales, conductores profesionales y operadores de maquinaria.",
    ctaType: "quote",
    ctaText: "Cotiza Aquí",
    ctaLink: "/productos/honor-band-6",
    ProductFeature: [
      {
        title: "Monitoreo de Fatiga TruSeen 4.0",
        description: "Detección continua de signos vitales asociados a fatiga y somnolencia",
        icon: "Activity"
      },
      {
        title: "Análisis de Sueño TruSleep",
        description: "Evaluación científica de la calidad del sueño para prevenir fatiga acumulada",
        icon: "Moon"
      },
      {
        title: "Alertas de Somnolencia",
        description: "Sistema de vibración y notificaciones para prevenir microsueños",
        icon: "Bell"
      },
      {
        title: "Autonomía Extendida",
        description: "14 días de monitoreo continuo para turnos prolongados",
        icon: "Battery"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "AMOLED 1.47\" visible en condiciones industriales"
      },
      {
        label: "Batería",
        value: "14 días en monitoreo continuo de fatiga"
      },
      {
        label: "Sensores",
        value: "TruSeen 4.0 (ritmo cardíaco), SpO2, Acelerómetro"
      },
      {
        label: "Resistencia",
        value: "5 ATM, resistente a entornos industriales"
      },
      {
        label: "Carga",
        value: "Magnética rápida (5 min = 2 días de monitoreo)"
      }
    ],
    ProductBenefit: [
      {
        title: "Prevención de Accidentes Laborales",
        description: "Reduce riesgos al detectar fatiga antes de incidentes",
        icon: "Shield"
      },
      {
        title: "Gestión de Fatiga Acumulada",
        description: "Identifica patrones de sueño deficientes que aumentan el riesgo laboral",
        icon: "TrendingDown"
      },
      {
        title: "Adaptación a Turnos Rotativos",
        description: "Ayuda a trabajadores a ajustar sus ciclos de sueño en horarios variables",
        icon: "Clock"
      },
      {
        title: "Cumplimiento Normativo",
        description: "Contribuye a cumplir regulaciones de seguridad y salud ocupacional",
        icon: "CheckSquare"
      }
    ],
    reviews: [
      {
        author: "Juan Pérez",
        rating: 5,
        date: "2024-01-25",
        title: "Excelente para nuestra planta industrial",
        comment: "Implementamos estas pulseras en operadores de maquinaria en turnos rotativos. La detección de fatiga funciona muy bien y hemos reducido significativamente los incidentes. El análisis de sueño nos ayuda a optimizar los horarios de los trabajadores.",
        verified: true,
        likes: 18,
        company: "Industrias Metalúrgicas S.A."
      },
      {
        author: "Ana Gómez",
        rating: 4,
        date: "2024-02-10",
        title: "Muy efectiva para conductores",
        comment: "Nuestra flota de transporte utiliza estas pulseras con buenos resultados. Las alertas de somnolencia son precisas y la batería dura lo suficiente para rutas de larga distancia. La carga rápida es especialmente útil para conductores con poco tiempo de descanso.",
        verified: true,
        likes: 12,
        company: "Transportes Nacionales"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsCount: 2,
    images: []
  },
  "huawei-band-7": {
    name: "HUAWEI BAND 7",
    slug: "huawei-band-7",
    status1: "active",
    price: 99.99,
    shortDescription: "Sistema ultradelgado de monitoreo de fatiga | Detección avanzada de somnolencia | Análisis profesional del sueño para entornos industriales",
    description: "La HUAWEI Band 7 es un sistema profesional de monitoreo de fatiga diseñado para entornos industriales. Con solo 9.99mm de grosor y 16g de peso, ofrece comodidad durante jornadas laborales completas. Su tecnología TruSeen 4.0 monitorea continuamente signos vitales para detectar patrones asociados a fatiga y somnolencia, mientras que TruSleep 2.0 analiza científicamente la calidad del sueño para prevenir fatiga acumulada. Con alertas multinivel, notifica al trabajador mediante vibraciones y puede escalar alertas a supervisores en casos críticos. Su batería de 14 días garantiza protección continua durante turnos extendidos, ideal para conductores profesionales, operadores de maquinaria pesada y trabajadores en entornos de alto riesgo.",
    ctaType: "quote",
    ctaText: "Cotiza Aquí",
    ctaLink: "/productos/huawei-band-7",
    ProductFeature: [
      {
        title: "Diseño Ultraligero Industrial",
        description: "9.99mm y 16g para máxima comodidad en jornadas laborales completas",
        icon: "Feather"
      },
      {
        title: "Detección Avanzada de Fatiga",
        description: "TruSeen 4.0 identifica patrones cardíacos asociados a somnolencia",
        icon: "AlertTriangle"
      },
      {
        title: "Análisis Profesional del Sueño",
        description: "TruSleep 2.0 evalúa científicamente la calidad del descanso",
        icon: "Moon"
      },
      {
        title: "Alertas Multinivel",
        description: "Sistema escalable de notificaciones para trabajador y supervisores",
        icon: "Bell"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "AMOLED 1.47\" (194x368 píxeles) visible en condiciones industriales"
      },
      {
        label: "Dimensiones",
        value: "44.35 x 26 x 9.99 mm, optimizado para uso industrial"
      },
      {
        label: "Peso",
        value: "16 gramos, diseñado para uso continuo en jornadas laborales"
      },
      {
        label: "Batería",
        value: "14 días en monitoreo continuo de fatiga"
      },
      {
        label: "Resistencia",
        value: "5 ATM, resistente a entornos industriales adversos"
      },
      {
        label: "Sensores",
        value: "TruSeen 4.0, SpO2, Acelerómetro, Giroscopio, Detector de movimientos oculares"
      }
    ],
    ProductBenefit: [
      {
        title: "Prevención Proactiva de Accidentes",
        description: "Reduce riesgos laborales al detectar fatiga antes de incidentes",
        icon: "Shield"
      },
      {
        title: "Gestión Científica del Sueño",
        description: "Optimiza patrones de descanso para trabajadores en turnos variables",
        icon: "Clock"
      },
      {
        title: "Integración con Sistemas de Seguridad",
        description: "Compatible con plataformas de gestión de fatiga empresarial",
        icon: "Link"
      },
      {
        title: "Documentación para Cumplimiento Normativo",
        description: "Genera reportes para regulaciones de seguridad industrial",
        icon: "FileText"
      }
    ],
    reviews: [
      {
        author: "Miguel Ángel Rodríguez",
        rating: 5,
        date: "2024-01-30",
        title: "Fundamental para nuestra operación petrolera",
        comment: "Implementamos estas pulseras en nuestros operadores de plataformas y hemos reducido los incidentes por fatiga en un 80%. El sistema de alertas es muy preciso y la integración con nuestro centro de monitoreo funciona perfectamente.",
        verified: true,
        likes: 27,
        company: "Petróleo & Gas Internacional"
      },
      {
        author: "Elena Torres",
        rating: 5,
        date: "2024-02-08",
        title: "Excelente para gestión de fatiga en transporte",
        comment: "Nuestra flota de transporte de materiales peligrosos utiliza estas pulseras con resultados sobresalientes. La detección temprana de somnolencia ha evitado situaciones potencialmente catastróficas. El análisis de sueño nos ayuda a optimizar los horarios de los conductores.",
        verified: true,
        likes: 19,
        company: "Transportes Seguros S.A."
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 80 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsCount: 2,
    images: []
  },
  "smartband-gtl2": {
    name: "SMARTBAND GTL2",
    slug: "smartband-gtl2",
    status1: "active",
    price: 49.00,
    shortDescription: "Sistema económico de monitoreo de fatiga | Detección básica de somnolencia | Ideal para implementaciones a gran escala",
    description: "La Smartband GTL2 es una solución económica pero efectiva para el monitoreo de fatiga en entornos industriales. Diseñada para implementaciones a gran escala, ofrece las funcionalidades esenciales para la prevención de accidentes por fatiga y somnolencia. Su sistema monitorea continuamente ritmo cardíaco, oxígeno en sangre y patrones de movimiento para detectar signos tempranos de fatiga. Con alertas vibratorias, notifica al trabajador cuando detecta indicios de somnolencia. Su batería de 7 días cubre turnos completos y su resistencia al agua la hace adecuada para diversos entornos industriales. Una solución costo-efectiva para flotas de transporte, plantas industriales y equipos de construcción.",
    ctaType: "contact",
    ctaText: "Contactar",
    ctaLink: "/productos/smartband-gtl2",
    ProductFeature: [
      {
        title: "Monitoreo Básico de Fatiga",
        description: "Detección de signos vitales asociados a somnolencia y fatiga",
        icon: "Activity"
      },
      {
        title: "Alertas de Somnolencia",
        description: "Notificaciones vibratorias cuando se detectan signos de microsueños",
        icon: "Bell"
      },
      {
        title: "Seguimiento de Ciclos de Sueño",
        description: "Análisis básico de patrones de sueño para prevenir fatiga acumulada",
        icon: "Moon"
      },
      {
        title: "Diseño Resistente Industrial",
        description: "Construcción durable para entornos de trabajo exigentes",
        icon: "Shield"
      }
    ],
    TechnicalSpecification: [
      {
        label: "Pantalla",
        value: "Táctil a color visible en condiciones industriales"
      },
      {
        label: "Batería",
        value: "7 días de monitoreo continuo de fatiga"
      },
      {
        label: "Resistencia",
        value: "IP67, resistente a polvo y salpicaduras"
      },
      {
        label: "Sensores",
        value: "Ritmo cardíaco, SpO2, Acelerómetro"
      },
      {
        label: "Compatibilidad",
        value: "Android 4.4+ e iOS 8.0+ con app de gestión de fatiga"
      }
    ],
    ProductBenefit: [
      {
        title: "Solución Económica Escalable",
        description: "Ideal para implementaciones a gran escala en flotas o plantas",
        icon: "TrendingUp"
      },
      {
        title: "Prevención Básica de Accidentes",
        description: "Reduce riesgos laborales al detectar signos de fatiga",
        icon: "Shield"
      },
      {
        title: "Fácil Implementación",
        description: "Rápida adopción con mínima curva de aprendizaje",
        icon: "CheckCircle"
      },
      {
        title: "Monitoreo Centralizado",
        description: "Gestión de múltiples dispositivos desde plataforma central",
        icon: "Monitor"
      }
    ],
    reviews: [
      {
        author: "Pedro Ramírez",
        rating: 4,
        date: "2024-01-15",
        title: "Excelente relación costo-beneficio",
        comment: "Implementamos estas pulseras en nuestra flota de 200 vehículos y la relación costo-beneficio es excelente. La detección básica de fatiga funciona bien y hemos reducido los incidentes. Ideal para implementaciones a gran escala.",
        verified: true,
        likes: 14,
        company: "Logística Nacional S.A."
      },
      {
        author: "María Jiménez",
        rating: 4,
        date: "2024-02-03",
        title: "Buena solución para nuestra planta",
        comment: "Utilizamos estas pulseras para operadores de maquinaria en nuestra planta. Las alertas de somnolencia son efectivas y la batería dura lo suficiente para turnos completos. Una solución económica pero funcional para la prevención de accidentes.",
        verified: true,
        likes: 9,
        company: "Industrias Metálicas del Sur"
      }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 60 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsCount: 2,
    images: []
  }
};

// Interfaces
interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

interface TechnicalSpecification {
  label: string;
  value: string;
}

interface ProductBenefit {
  title: string;
  description: string;
  icon: string;
}

interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
  company: string;
}

interface RatingDistribution {
  stars: number;
  percentage: number;
}

interface ProductData {
  name: string;
  slug: string;
  status1: string;
  price: number;
  shortDescription: string;
  description: string;
  ctaType: string;
  ctaText: string;
  ctaLink: string;
  ProductFeature: ProductFeature[];
  TechnicalSpecification: TechnicalSpecification[];
  ProductBenefit: ProductBenefit[];
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  reviewsCount: number;
  images: any[];
}

// Interfaces para los componentes en Strapi
interface StrapiProductFeature extends ProductFeature {
  id?: number;
}

interface StrapiTechnicalSpecification extends TechnicalSpecification {
  id?: number;
}

interface StrapiProductBenefit extends ProductBenefit {
  id?: number;
}

interface StrapiReview extends Review {
  id?: number;
}

interface StrapiRatingDistribution extends RatingDistribution {
  id?: number;
}

interface StrapiProduct {
  id: number;
  ProductFeature: StrapiProductFeature[];
  TechnicalSpecification: StrapiTechnicalSpecification[];
  ProductBenefit: StrapiProductBenefit[];
  reviews: StrapiReview[];
  ratingDistribution: StrapiRatingDistribution[];
}

interface ComponentsToDisconnect {
  [key: string]: number[];
  ProductFeature: number[];
  ProductBenefit: number[];
  TechnicalSpecification: number[];
  reviews: number[];
  ratingDistribution: number[];
}

interface PreparedComponent {
  __component: string;
  connect?: number;
  disconnect?: number[];
  [key: string]: any;
}

interface PreparedComponents {
  ProductFeature: PreparedComponent[];
  ProductBenefit: PreparedComponent[];
  TechnicalSpecification: PreparedComponent[];
  reviews: PreparedComponent[];
  ratingDistribution: PreparedComponent[];
  [key: string]: PreparedComponent[];
}

function prepareDataForStrapi(productData: ProductData) {
  return {
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    shortDescription: productData.shortDescription,
    price: productData.price,
    status1: productData.status1,
    ctaType: productData.ctaType,
    ctaText: productData.ctaText,
    ctaLink: productData.ctaLink,
    reviewsCount: productData.reviewsCount,
    ProductFeature: productData.ProductFeature,
    ProductBenefit: productData.ProductBenefit,
    TechnicalSpecification: productData.TechnicalSpecification,
    reviews: productData.reviews,
    ratingDistribution: productData.ratingDistribution
  };
}

async function importProducts() {
  try {
    console.log('Iniciando importación de productos...');
    console.log('URL base de Strapi:', STRAPI_URL);
    console.log('Token configurado:', STRAPI_API_TOKEN ? 'Sí' : 'No');
    
    // Lista de productos a cargar
    const productsToImport = [
      "xiaomi-mi-band-9",
      "amazfit-band-7",
      "honor-band-6",
      "huawei-band-7",
      "smartband-gtl2"
    ] as const;
    
    // Cargar cada producto
    for (const slug of productsToImport) {
      const productData = mockProducts[slug];
      console.log(`\nCreando producto: ${productData.name}`);
      
      try {
        const preparedData = prepareDataForStrapi(productData);
        const createUrl = `${STRAPI_URL}/api/products`;
        
        console.log('Datos preparados:', JSON.stringify(preparedData, null, 2));
        
        const createResponse = await axios.post(createUrl, {
          data: preparedData
        }, {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`✅ Producto creado: ${productData.name}`);
      } catch (error: any) {
        console.error(`\n❌ Error creando ${productData.name}:`);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
          console.error('Error:', error.message);
        }
      }
    }
    
    console.log('\n✅ Proceso completado');
  } catch (error: any) {
    console.error('\n❌ Error general:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Ejecutar el script
importProducts().catch(console.error);