export const veterinarias = [
  {
    id: 1,
    nombre: "Hospital Veterinario Norte",
    direccion: "Av. Cabildo 2450, Belgrano",
    zona: "Belgrano",
    ciudad: "Buenos Aires",
    telefono: "+54 11 4781-2345",
    email: "contacto@hospvetenorte.com",
    horarios: "Lun–Vie 8:00–20:00 · Sáb 9:00–14:00 · Urgencias 24 hs",
    servicios: ["Banco de sangre", "Transfusiones", "Urgencias 24 hs", "Internación"],
    descripcion:
      "Hospital de referencia en CABA con banco de sangre propio para caninos y felinos. Contamos con médicos especialistas en hematología veterinaria y equipamiento de última generación.",
    activa: true,
    solicitudesActivas: [1, 5],
  },
  {
    id: 2,
    nombre: "Clínica Veterinaria Felina Palermo",
    direccion: "Thames 1780, Palermo",
    zona: "Palermo",
    ciudad: "Buenos Aires",
    telefono: "+54 11 4832-9910",
    email: "info@felinapalermo.com.ar",
    horarios: "Lun–Sáb 9:00–19:00",
    servicios: ["Especialista en felinos", "Transfusiones", "Banco de sangre felino"],
    descripcion:
      "Clínica especializada exclusivamente en medicina felina. Realizamos transfusiones de sangre para gatos con médicos especializados en hematología felina.",
    activa: true,
    solicitudesActivas: [2, 4],
  },
  {
    id: 3,
    nombre: "Centro Veterinario del Oeste",
    direccion: "Av. Rivadavia 5820, Caballito",
    zona: "Caballito",
    ciudad: "Buenos Aires",
    telefono: "+54 11 4922-0043",
    email: "centrovetdeloes@gmail.com",
    horarios: "Lun–Vie 8:00–21:00 · Sáb 9:00–17:00",
    servicios: ["Banco de sangre", "Transfusiones", "Cirugías complejas"],
    descripcion:
      "Centro veterinario integral con banco de sangre canino. Realizamos transfusiones como parte de cirugías complejas y tratamientos oncológicos.",
    activa: true,
    solicitudesActivas: [3],
  },
  {
    id: 4,
    nombre: "VetSur Hospital",
    direccion: "Av. Directorio 1340, Flores",
    zona: "Flores",
    ciudad: "Buenos Aires",
    telefono: "+54 11 4637-5500",
    email: "emergencias@vetsur.com.ar",
    horarios: "Urgencias 24 hs · Consultas Lun–Dom 8:00–20:00",
    servicios: ["Urgencias 24 hs", "Transfusiones de emergencia", "Internación"],
    descripcion:
      "Hospital de alta complejidad con servicio de urgencias las 24 horas. Especializados en medicina de emergencia y cuidados intensivos veterinarios.",
    activa: true,
    solicitudesActivas: [5],
  },
  {
    id: 5,
    nombre: "Clínica Veterinaria San Isidro",
    direccion: "Av. Centenario 245, San Isidro",
    zona: "San Isidro",
    ciudad: "GBA Norte",
    telefono: "+54 11 4743-1122",
    email: "clisanisidro@vet.com.ar",
    horarios: "Lun–Vie 9:00–19:00 · Sáb 9:00–13:00",
    servicios: ["Transfusiones", "Cirugías", "Análisis clínicos"],
    descripcion:
      "Clínica veterinaria de zona norte del Gran Buenos Aires. Realizamos transfusiones en coordinación con bancos de sangre de hospitales adheridos.",
    activa: true,
    solicitudesActivas: [6],
  },
]

export const donantes = [
  {
    id: 1,
    nombre: "Laika",
    especie: "perro",
    raza: "Border Collie",
    edad: 3,
    peso: 18,
    sexo: "hembra",
    tipoSangre: "DEA 1.1-",
    zona: "Palermo",
    ciudad: "Buenos Aires",
    estado: "disponible",
    ultimaDonacion: null,
    donacionesTotales: 0,
    propietario: {
      nombre: "Valentina Ruiz",
      telefono: "+54 11 4523-7890",
      email: "v.ruiz@email.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Laika es una border collie muy tranquila y sociable. Nunca donó pero está en perfectas condiciones de salud y sus dueños están muy comprometidos con la causa.",
    emoji: "🐕",
    gradiente: "from-indigo-400 to-indigo-600",
  },
  {
    id: 2,
    nombre: "Thor",
    especie: "perro",
    raza: "Labrador Retriever",
    edad: 5,
    peso: 32,
    sexo: "macho",
    tipoSangre: "DEA 1.1+",
    zona: "San Isidro",
    ciudad: "GBA Norte",
    estado: "disponible",
    ultimaDonacion: "2026-03-10",
    donacionesTotales: 3,
    propietario: {
      nombre: "Rodrigo Méndez",
      telefono: "+54 11 4742-6610",
      email: "rmendez@mail.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Thor es un donante experimentado con 3 donaciones anteriores. Muy dócil, soporta muy bien el procedimiento. Su dueño está siempre disponible para coordinar.",
    emoji: "🐶",
    gradiente: "from-amber-400 to-amber-600",
  },
  {
    id: 3,
    nombre: "Milo",
    especie: "perro",
    raza: "Golden Retriever",
    edad: 4,
    peso: 28,
    sexo: "macho",
    tipoSangre: "DEA 4",
    zona: "Caballito",
    ciudad: "Buenos Aires",
    estado: "en_descanso",
    ultimaDonacion: "2026-05-18",
    donacionesTotales: 2,
    propietario: {
      nombre: "Patricia Sosa",
      telefono: "+54 11 4923-4411",
      email: "psosa@correo.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Milo donó hace menos de un mes y está en período de descanso. Estará disponible nuevamente a partir de agosto. Tiene sangre de tipo universal DEA 4.",
    emoji: "🐾",
    gradiente: "from-yellow-400 to-yellow-600",
  },
  {
    id: 4,
    nombre: "Coco",
    especie: "perro",
    raza: "Beagle",
    edad: 6,
    peso: 14,
    sexo: "macho",
    tipoSangre: "DEA 1.1+",
    zona: "Villa Urquiza",
    ciudad: "Buenos Aires",
    estado: "disponible",
    ultimaDonacion: "2025-12-05",
    donacionesTotales: 5,
    propietario: {
      nombre: "Marcelo Giménez",
      telefono: "+54 11 4524-8833",
      email: "marcelogi@email.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Coco es nuestro donante estrella con 5 donaciones. Conoce perfectamente el proceso y lo tolera con mucha calma. ¡Un verdadero héroe de cuatro patas!",
    emoji: "🐕",
    gradiente: "from-orange-400 to-orange-600",
  },
  {
    id: 5,
    nombre: "Nala",
    especie: "perro",
    raza: "Husky Siberiano",
    edad: 2,
    peso: 22,
    sexo: "hembra",
    tipoSangre: "DEA 1.1-",
    zona: "Belgrano",
    ciudad: "Buenos Aires",
    estado: "en_evaluacion",
    ultimaDonacion: null,
    donacionesTotales: 0,
    propietario: {
      nombre: "Lucía Ferrero",
      telefono: "+54 11 4781-0099",
      email: "lferrero@webmail.com",
    },
    vacunado: true,
    desparasitado: false,
    descripcion:
      "Nala está siendo evaluada para ingresar al programa de donantes. Sus dueños completaron el formulario de inscripción y esperamos el resultado del chequeo veterinario.",
    emoji: "🐺",
    gradiente: "from-blue-400 to-blue-600",
  },
  {
    id: 6,
    nombre: "Luna",
    especie: "gato",
    raza: "Europeo Común",
    edad: 3,
    peso: 4,
    sexo: "hembra",
    tipoSangre: "Tipo A",
    zona: "Almagro",
    ciudad: "Buenos Aires",
    estado: "disponible",
    ultimaDonacion: "2025-11-20",
    donacionesTotales: 1,
    propietario: {
      nombre: "Sofía Bravi",
      telefono: "+54 11 4861-2200",
      email: "sofibravi@gmail.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Luna es una gatita muy tranquila. Se portó excelente en su única donación anterior. Tipo A, el más común entre los felinos. Disponible para coordinar cualquier día de semana.",
    emoji: "🐱",
    gradiente: "from-purple-400 to-purple-600",
  },
  {
    id: 7,
    nombre: "Simba",
    especie: "gato",
    raza: "Maine Coon",
    edad: 4,
    peso: 6,
    sexo: "macho",
    tipoSangre: "Tipo B",
    zona: "Palermo",
    ciudad: "Buenos Aires",
    estado: "disponible",
    ultimaDonacion: null,
    donacionesTotales: 0,
    propietario: {
      nombre: "Diego Acosta",
      telefono: "+54 11 4832-5567",
      email: "dacosta@correo.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Simba tiene sangre de Tipo B, la más escasa en felinos (sólo 3–5% de los gatos). Nunca donó pero tiene excelente estado de salud. Su dueño es veterinario y está muy comprometido.",
    emoji: "🦁",
    gradiente: "from-rose-400 to-rose-600",
  },
  {
    id: 8,
    nombre: "Mochi",
    especie: "gato",
    raza: "Persa",
    edad: 5,
    peso: 5,
    sexo: "hembra",
    tipoSangre: "Tipo A",
    zona: "Recoleta",
    ciudad: "Buenos Aires",
    estado: "disponible",
    ultimaDonacion: "2026-01-14",
    donacionesTotales: 2,
    propietario: {
      nombre: "Andrea Villalba",
      telefono: "+54 11 4804-9920",
      email: "avillalba@mail.com",
    },
    vacunado: true,
    desparasitado: true,
    descripcion:
      "Mochi es una persa de carácter muy tranquilo. Con 2 donaciones previas ya es una donante experimentada. Su último chequeo fue en mayo y salió todo perfecto.",
    emoji: "😺",
    gradiente: "from-pink-400 to-pink-600",
  },
]

export const solicitudes = [
  {
    id: 1,
    mascota: "Max",
    especie: "perro",
    raza: "Pastor Alemán",
    edad: 4,
    tipoSangre: "DEA 1.1+",
    urgencia: "urgente",
    veterinariaId: 1,
    descripcion:
      "Max sufrió un accidente de tránsito y necesita una transfusión de manera urgente. Tiene anemia severa post-traumática. El pronóstico es reservado sin intervención inmediata.",
    fechaCreacion: "2026-06-22",
    fechaNecesidad: "2026-06-23",
    cantidadML: 450,
    contacto: "Dr. Alejandro Martínez",
    telefono: "+54 11 4781-2345",
    estado: "activa",
    propietario: "Familia González",
  },
  {
    id: 2,
    mascota: "Bella",
    especie: "gato",
    raza: "Siamés",
    edad: 2,
    tipoSangre: "Tipo A",
    urgencia: "urgente",
    veterinariaId: 2,
    descripcion:
      "Bella ingresó con hemólisis inmunomediada aguda. Necesita sangre de Tipo A con urgencia para estabilizarla. Se encuentra internada en la clínica.",
    fechaCreacion: "2026-06-22",
    fechaNecesidad: "2026-06-23",
    cantidadML: 60,
    contacto: "Dra. Camila Ortega",
    telefono: "+54 11 4832-9910",
    estado: "activa",
    propietario: "Natalia Pino",
  },
  {
    id: 3,
    mascota: "Bruno",
    especie: "perro",
    raza: "Dóberman",
    edad: 3,
    tipoSangre: "DEA 1.1-",
    urgencia: "moderado",
    veterinariaId: 3,
    descripcion:
      "Bruno será operado la próxima semana por una masa esplénica. Se prevé pérdida de sangre significativa y queremos tener reserva disponible antes de la cirugía.",
    fechaCreacion: "2026-06-20",
    fechaNecesidad: "2026-06-28",
    cantidadML: 350,
    contacto: "Dr. Sebastián Paz",
    telefono: "+54 11 4922-0043",
    estado: "activa",
    propietario: "Tomás Herrera",
  },
  {
    id: 4,
    mascota: "Princesa",
    especie: "gato",
    raza: "Ragdoll",
    edad: 6,
    tipoSangre: "Tipo B",
    urgencia: "programado",
    veterinariaId: 2,
    descripcion:
      "Princesa tiene anemia crónica por enfermedad renal. Necesitamos sangre de Tipo B para una transfusión de sostén programada para fin de mes.",
    fechaCreacion: "2026-06-18",
    fechaNecesidad: "2026-06-30",
    cantidadML: 80,
    contacto: "Dra. Camila Ortega",
    telefono: "+54 11 4832-9910",
    estado: "activa",
    propietario: "Roberto Almada",
  },
  {
    id: 5,
    mascota: "Rocky",
    especie: "perro",
    raza: "Rottweiler",
    edad: 5,
    tipoSangre: "DEA 1.1+",
    urgencia: "urgente",
    veterinariaId: 4,
    descripcion:
      "Rocky ingresó por intoxicación con raticidas. Presenta coagulopatía severa y requiere transfusión urgente de sangre entera DEA 1.1+ para revertir el cuadro.",
    fechaCreacion: "2026-06-22",
    fechaNecesidad: "2026-06-22",
    cantidadML: 500,
    contacto: "Dr. Fabián Torres",
    telefono: "+54 11 4637-5500",
    estado: "activa",
    propietario: "Claudia Bravo",
  },
  {
    id: 6,
    mascota: "Oliver",
    especie: "perro",
    raza: "Golden Mix",
    edad: 7,
    tipoSangre: "DEA 4",
    urgencia: "moderado",
    veterinariaId: 5,
    descripcion:
      "Oliver comenzó quimioterapia por linfoma. La quimio le genera anemia moderada y necesitaremos transfusiones de soporte periódicas. Sangre DEA 4 (universal).",
    fechaCreacion: "2026-06-19",
    fechaNecesidad: "2026-06-27",
    cantidadML: 300,
    contacto: "Dra. Marcela Ríos",
    telefono: "+54 11 4743-1122",
    estado: "activa",
    propietario: "Carlos Suárez",
  },
]

// Compatibilidad de sangre canina
// DEA 1.1- puede donar a cualquier perro (donante universal)
// DEA 1.1+ puede donar solo a DEA 1.1+
// DEA 4 puede donar a cualquier perro (compatible con todos)
export function getCompatibleDonors(solicitud, todosLosDonantes) {
  return todosLosDonantes.filter((d) => {
    if (d.especie !== solicitud.especie) return false
    if (d.estado !== "disponible") return false

    if (solicitud.especie === "perro") {
      if (d.tipoSangre === "DEA 1.1-") return true
      if (d.tipoSangre === "DEA 4") return true
      if (d.tipoSangre === solicitud.tipoSangre) return true
      return false
    }

    if (solicitud.especie === "gato") {
      if (solicitud.tipoSangre === "Tipo A") return d.tipoSangre === "Tipo A" || d.tipoSangre === "Tipo AB"
      if (solicitud.tipoSangre === "Tipo B") return d.tipoSangre === "Tipo B" || d.tipoSangre === "Tipo AB"
      if (solicitud.tipoSangre === "Tipo AB") return true
      return d.tipoSangre === solicitud.tipoSangre
    }

    return false
  })
}

export function getCompatibleRequests(donante, todasLasSolicitudes) {
  return todasLasSolicitudes.filter((s) => {
    if (s.especie !== donante.especie) return false
    if (s.estado !== "activa") return false

    if (donante.especie === "perro") {
      if (donante.tipoSangre === "DEA 1.1-") return true
      if (donante.tipoSangre === "DEA 4") return true
      if (donante.tipoSangre === s.tipoSangre) return true
      return false
    }

    if (donante.especie === "gato") {
      if (s.tipoSangre === "Tipo A") return donante.tipoSangre === "Tipo A" || donante.tipoSangre === "Tipo AB"
      if (s.tipoSangre === "Tipo B") return donante.tipoSangre === "Tipo B" || donante.tipoSangre === "Tipo AB"
      if (s.tipoSangre === "Tipo AB") return true
      return donante.tipoSangre === s.tipoSangre
    }

    return false
  })
}

export function getVetById(id) {
  return veterinarias.find((v) => v.id === Number(id))
}

export function getDonorById(id) {
  return donantes.find((d) => d.id === Number(id))
}

export function getSolicitudById(id) {
  return solicitudes.find((s) => s.id === Number(id))
}
