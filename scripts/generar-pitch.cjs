const PptxGenJS = require('pptxgenjs')

const pptx = new PptxGenJS()

// ── Tema ────────────────────────────────────────────────
const ROJO    = 'C0102B'   // rose-700 oscuro (títulos, acentos)
const ROJO2   = 'E11D48'   // rose-600 (botones, iconos)
const TEAL    = '0D9488'   // teal-600
const BG      = 'FFF1F2'   // rose-50
const BGDARK  = '1E293B'   // slate-800
const BLANCO  = 'FFFFFF'
const GRIS    = '64748B'   // slate-500
const GRIS2   = 'F1F5F9'   // slate-100

pptx.layout = 'LAYOUT_WIDE'    // 13.33 × 7.5 in
pptx.author = 'PatitasDonantes'
pptx.company = 'PatitasDonantes'

// ── helpers ─────────────────────────────────────────────
function addBg(slide, color = BG) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color } })
}

function redBar(slide, h = 0.08) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.42, w: '100%', h, fill: { color: ROJO2 } })
}

function slideNum(slide, n) {
  slide.addText(String(n), {
    x: 12.8, y: 7.1, w: 0.5, h: 0.25,
    fontSize: 9, color: GRIS, align: 'right',
  })
}

function tag(slide, txt, x, y, color = ROJO2) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.9, h: 0.32, fill: { color }, rectRadius: 0.06 })
  slide.addText(txt, { x, y, w: 1.9, h: 0.32, fontSize: 10, bold: true, color: BLANCO, align: 'center' })
}

function bullet(slide, items, x, y, w) {
  items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.ellipse, { x, y: y + i * 0.42, w: 0.12, h: 0.12, fill: { color: ROJO2 } })
    slide.addText(item, { x: x + 0.22, y: y + i * 0.42 - 0.01, w: w - 0.22, h: 0.38, fontSize: 13, color: BGDARK })
  })
}

function card(slide, x, y, w, h, fillColor = BLANCO) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: 'E2E8F0', width: 0.75 },
    shadow: { type: 'outer', blur: 8, offset: 3, angle: 270, color: '00000015', opacity: 0.08 },
    rectRadius: 0.12,
  })
}

// ══════════════════════════════════════════════
// SLIDE 1 — PORTADA
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  // fondo degradado simulado con dos rectángulos
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: BGDARK } })
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: ROJO, transparency: 82 } })

  // Pata grande decorativa (texto enorme)
  s.addText('🐾', { x: 8.5, y: 1.5, w: 4.5, h: 4.5, fontSize: 200, align: 'center', transparency: 85 })

  // Logo badge
  s.addShape(pptx.ShapeType.roundRect, { x: 1, y: 1.2, w: 0.5, h: 0.5, fill: { color: ROJO2 }, rectRadius: 0.08 })
  s.addText('💧', { x: 1, y: 1.2, w: 0.5, h: 0.5, fontSize: 18, align: 'center' })

  s.addText('PatitasDonantes', { x: 1.6, y: 1.25, w: 5, h: 0.42, fontSize: 22, bold: true, color: BLANCO })

  s.addText('El sistema que conecta\ndonantes de sangre\ncon mascotas que lo necesitan', {
    x: 1, y: 2.1, w: 7.5, h: 2,
    fontSize: 38, bold: true, color: BLANCO, lineSpacingMultiple: 1.2,
  })

  s.addText('Plataforma digital · Gestión de donantes y solicitudes · Red de veterinarias', {
    x: 1, y: 4.5, w: 8, h: 0.4,
    fontSize: 14, color: 'FCA5A5',
  })

  // Barra inferior roja
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: ROJO2 } })
  s.addText('2026 — Presentación Comercial', {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fontSize: 11, color: 'FECDD3', align: 'center',
  })
}

// ══════════════════════════════════════════════
// SLIDE 2 — EL PROBLEMA
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s, GRIS2)

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.08, h: '100%', fill: { color: ROJO2 } })

  s.addText('El problema', { x: 0.3, y: 0.4, w: 8, h: 0.5, fontSize: 13, bold: true, color: ROJO2, charSpacing: 2 })
  s.addText('Cada día, mascotas mueren\npor falta de donantes de sangre', {
    x: 0.3, y: 0.85, w: 7.5, h: 1.3,
    fontSize: 34, bold: true, color: BGDARK, lineSpacingMultiple: 1.15,
  })

  // 3 tarjetas problema
  const problemas = [
    { icon: '🔍', titulo: 'Sin visibilidad', desc: 'Los dueños no saben dónde conseguir donantes cuando su mascota lo necesita urgente.' },
    { icon: '⏱️', titulo: 'Tiempo crítico', desc: 'En emergencias, buscar donante por contactos personales demora horas que no hay.' },
    { icon: '🏥', titulo: 'Vets aisladas', desc: 'Las veterinarias no tienen un sistema centralizado para coordinar donaciones.' },
  ]

  problemas.forEach((p, i) => {
    const x = 0.3 + i * 4.3
    card(s, x, 2.5, 4.0, 2.0, BLANCO)
    s.addText(p.icon, { x, y: 2.55, w: 0.7, h: 0.7, fontSize: 28, align: 'center' })
    s.addText(p.titulo, { x: x + 0.75, y: 2.6, w: 3.1, h: 0.35, fontSize: 15, bold: true, color: BGDARK })
    s.addText(p.desc, { x: x + 0.1, y: 3.05, w: 3.75, h: 1.1, fontSize: 11.5, color: GRIS, lineSpacingMultiple: 1.3 })
  })

  // Stat destacada
  card(s, 0.3, 4.8, 12.7, 1.2, 'FFF1F2')
  s.addShape(pptx.ShapeType.roundRect, { x: 0.3, y: 4.8, w: 12.7, h: 1.2, fill: { color: 'FFF1F2' }, line: { color: 'FECDD3', width: 1 }, rectRadius: 0.12 })
  s.addText('"El banco de sangre veterinario más cercano puede estar a 40 km — y muchas mascotas no llegan."', {
    x: 0.6, y: 5.05, w: 12.1, h: 0.7,
    fontSize: 15, italic: true, color: ROJO, align: 'center',
  })

  redBar(s); slideNum(s, 2)
}

// ══════════════════════════════════════════════
// SLIDE 3 — LA SOLUCIÓN
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s)

  s.addText('La solución', { x: 0.6, y: 0.4, w: 8, h: 0.4, fontSize: 13, bold: true, color: ROJO2, charSpacing: 2 })
  s.addText('PatitasDonantes — una plataforma\nque conecta en segundos', {
    x: 0.6, y: 0.75, w: 8, h: 1.1,
    fontSize: 32, bold: true, color: BGDARK, lineSpacingMultiple: 1.15,
  })

  // Diagrama central de conexión
  // Donante
  card(s, 0.4, 2.1, 3.2, 2.8, BLANCO)
  s.addText('🐕🐈', { x: 0.4, y: 2.2, w: 3.2, h: 0.7, fontSize: 36, align: 'center' })
  s.addText('DONANTE', { x: 0.4, y: 3.0, w: 3.2, h: 0.35, fontSize: 11, bold: true, color: ROJO2, align: 'center', charSpacing: 1.5 })
  s.addText('Mascotas sanas\nregistradas en la red', { x: 0.4, y: 3.35, w: 3.2, h: 0.6, fontSize: 11, color: GRIS, align: 'center' })
  s.addText('✓ Tipo de sangre\n✓ Disponibilidad\n✓ Ubicación', { x: 0.5, y: 3.95, w: 3.0, h: 0.8, fontSize: 10.5, color: TEAL })

  // Flecha izquierda
  s.addShape(pptx.ShapeType.rect, { x: 3.7, y: 3.42, w: 1.4, h: 0.12, fill: { color: ROJO2 } })
  s.addShape(pptx.ShapeType.rect, {
    x: 4.85, y: 3.24, w: 0, h: 0,
    fill: { color: ROJO2 },
  })

  // Logo central
  card(s, 5.05, 2.4, 3.2, 2.2, BGDARK)
  s.addText('🐾', { x: 5.05, y: 2.5, w: 3.2, h: 1.0, fontSize: 48, align: 'center' })
  s.addText('PatitasDonantes', { x: 5.05, y: 3.5, w: 3.2, h: 0.35, fontSize: 13, bold: true, color: BLANCO, align: 'center' })
  s.addText('Algoritmo de matching\npor tipo de sangre', { x: 5.05, y: 3.85, w: 3.2, h: 0.55, fontSize: 10.5, color: 'FCA5A5', align: 'center' })

  // Flecha derecha
  s.addShape(pptx.ShapeType.rect, { x: 8.35, y: 3.42, w: 1.4, h: 0.12, fill: { color: ROJO2 } })

  // Receptor
  card(s, 9.75, 2.1, 3.2, 2.8, BLANCO)
  s.addText('🏥', { x: 9.75, y: 2.2, w: 3.2, h: 0.7, fontSize: 36, align: 'center' })
  s.addText('VETERINARIA', { x: 9.75, y: 3.0, w: 3.2, h: 0.35, fontSize: 11, bold: true, color: TEAL, align: 'center', charSpacing: 1.5 })
  s.addText('Clínicas adheridas\na la red', { x: 9.75, y: 3.35, w: 3.2, h: 0.6, fontSize: 11, color: GRIS, align: 'center' })
  s.addText('✓ Solicitan sangre\n✓ Reciben matches\n✓ Coordinan donación', { x: 9.85, y: 3.95, w: 3.0, h: 0.8, fontSize: 10.5, color: TEAL })

  // Estadísticas bottom
  const stats = [
    { v: '< 2 min', l: 'para encontrar un match' },
    { v: '100%', l: 'sin lucro' },
    { v: '24/7', l: 'urgencias disponibles' },
  ]
  stats.forEach((st, i) => {
    const x = 0.6 + i * 4.3
    s.addText(st.v, { x, y: 5.2, w: 4.0, h: 0.55, fontSize: 28, bold: true, color: ROJO2, align: 'center' })
    s.addText(st.l, { x, y: 5.75, w: 4.0, h: 0.3, fontSize: 11, color: GRIS, align: 'center' })
  })

  redBar(s); slideNum(s, 3)
}

// ══════════════════════════════════════════════
// SLIDE 4 — CÓMO FUNCIONA
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s, BLANCO)

  s.addText('¿Cómo funciona?', { x: 0.6, y: 0.35, w: 12, h: 0.45, fontSize: 13, bold: true, color: ROJO2, charSpacing: 2 })
  s.addText('Tres pasos. Simple para todos.', {
    x: 0.6, y: 0.75, w: 9, h: 0.55,
    fontSize: 30, bold: true, color: BGDARK,
  })

  const pasos = [
    {
      n: '01', icon: '❤️', color: ROJO2,
      titulo: 'Registrás tu mascota',
      desc: 'El dueño completa el perfil del donante: especie, raza, peso, tipo de sangre, vacunas y datos de contacto.',
      sub: 'Formulario guiado · Tarda 3 minutos',
    },
    {
      n: '02', icon: '🔔', color: TEAL,
      titulo: 'Recibís alertas de compatibilidad',
      desc: 'Cuando una veterinaria carga una solicitud urgente, el sistema identifica donantes compatibles y los notifica.',
      sub: 'Algoritmo de matching por tipo de sangre',
    },
    {
      n: '03', icon: '✅', color: '059669',
      titulo: 'Coordinás la donación',
      desc: 'Dueño y veterinaria se contactan directamente para acordar el día y hora. El proceso de extracción dura ~45 min.',
      sub: 'Seguro · Sin costo · Salva una vida',
    },
  ]

  pasos.forEach((p, i) => {
    const y = 1.55 + i * 1.7

    // Número grande de fondo
    s.addText(p.n, {
      x: 0.3, y: y - 0.05, w: 1.1, h: 1.4,
      fontSize: 72, bold: true, color: p.color, transparency: 85,
    })

    // Icono
    s.addText(p.icon, { x: 0.45, y: y + 0.2, w: 0.7, h: 0.7, fontSize: 28, align: 'center' })

    // Línea conectora (no en el último)
    if (i < 2) {
      s.addShape(pptx.ShapeType.rect, { x: 0.77, y: y + 0.95, w: 0.06, h: 0.75, fill: { color: 'E2E8F0' } })
    }

    // Texto
    s.addText(p.titulo, { x: 1.3, y, w: 7.5, h: 0.38, fontSize: 17, bold: true, color: BGDARK })
    s.addText(p.desc, { x: 1.3, y: y + 0.38, w: 7.5, h: 0.65, fontSize: 12, color: GRIS, lineSpacingMultiple: 1.3 })

    // Tag badge
    s.addShape(pptx.ShapeType.roundRect, { x: 1.3, y: y + 1.05, w: 3.2, h: 0.26, fill: { color: p.color, transparency: 88 }, rectRadius: 0.04 })
    s.addText(p.sub, { x: 1.3, y: y + 1.05, w: 3.2, h: 0.26, fontSize: 9.5, color: p.color, bold: true })
  })

  // Panel derecho — screenshot mockup
  card(s, 9.2, 1.4, 3.9, 5.2, GRIS2)
  s.addText('📱', { x: 9.2, y: 1.7, w: 3.9, h: 1.2, fontSize: 60, align: 'center' })
  s.addText('App Web', { x: 9.2, y: 2.9, w: 3.9, h: 0.35, fontSize: 14, bold: true, color: BGDARK, align: 'center' })
  s.addText('Responsive · funciona en\ncualquier dispositivo', { x: 9.4, y: 3.25, w: 3.5, h: 0.5, fontSize: 11, color: GRIS, align: 'center' })
  s.addShape(pptx.ShapeType.rect, { x: 9.4, y: 3.9, w: 3.5, h: 0.06, fill: { color: 'E2E8F0' } })

  const features = ['Solicitudes urgentes', 'Donantes compatibles', 'Red de veterinarias', 'Panel de administración']
  features.forEach((f, i) => {
    s.addShape(pptx.ShapeType.ellipse, { x: 9.5, y: 4.1 + i * 0.42, w: 0.14, h: 0.14, fill: { color: ROJO2 } })
    s.addText(f, { x: 9.75, y: 4.08 + i * 0.42, w: 3.1, h: 0.3, fontSize: 11, color: BGDARK })
  })

  redBar(s); slideNum(s, 4)
}

// ══════════════════════════════════════════════
// SLIDE 5 — FUNCIONALIDADES
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s, GRIS2)

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.2, fill: { color: BGDARK } })
  s.addText('Funcionalidades del sistema', {
    x: 0.6, y: 0.15, w: 12.1, h: 0.5,
    fontSize: 26, bold: true, color: BLANCO,
  })
  s.addText('Todo lo que necesitás en una sola plataforma', {
    x: 0.6, y: 0.65, w: 10, h: 0.35,
    fontSize: 13, color: 'CBD5E1',
  })

  const modulos = [
    {
      icon: '🩸', titulo: 'Solicitudes de sangre',
      items: ['Niveles de urgencia (urgente / moderado / programado)', 'Formulario guiado con datos del paciente', 'Matching automático con donantes disponibles', 'Contacto directo con la veterinaria'],
      color: ROJO2,
    },
    {
      icon: '🐾', titulo: 'Gestión de donantes',
      items: ['Registro completo con perfil de salud', 'Estados: disponible / en evaluación / en descanso', 'Historial de donaciones y última fecha', 'Búsqueda por zona, especie y tipo de sangre'],
      color: TEAL,
    },
    {
      icon: '🏥', titulo: 'Red de veterinarias',
      items: ['Alta de veterinarias desde panel admin', 'Filtro por zona y servicios ofrecidos', 'Solicitudes activas por clínica', 'Activar / desactivar participación'],
      color: '7C3AED',
    },
    {
      icon: '⚙️', titulo: 'Panel de administración',
      items: ['Login seguro para el equipo operativo', 'Gestión completa de veterinarias adheridas', 'Cambios reflejados en tiempo real', 'Preparado para escalar con backend'],
      color: 'D97706',
    },
  ]

  modulos.forEach((m, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = 0.35 + col * 6.6
    const y = 1.35 + row * 2.8

    card(s, x, y, 6.3, 2.55, BLANCO)
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 0.55, h: 2.55, fill: { color: m.color, transparency: 88 }, rectRadius: 0.12 })
    s.addText(m.icon, { x: x + 0.6, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 22 })
    s.addText(m.titulo, { x: x + 0.6, y: y + 0.65, w: 5.4, h: 0.38, fontSize: 14, bold: true, color: BGDARK })
    m.items.forEach((item, j) => {
      s.addShape(pptx.ShapeType.ellipse, { x: x + 0.68, y: y + 1.12 + j * 0.35, w: 0.1, h: 0.1, fill: { color: m.color } })
      s.addText(item, { x: x + 0.87, y: y + 1.07 + j * 0.35, w: 5.15, h: 0.3, fontSize: 10.5, color: BGDARK })
    })
  })

  redBar(s); slideNum(s, 5)
}

// ══════════════════════════════════════════════
// SLIDE 6 — TECNOLOGÍA
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s)

  s.addText('Tecnología', { x: 0.6, y: 0.35, w: 8, h: 0.4, fontSize: 13, bold: true, color: ROJO2, charSpacing: 2 })
  s.addText('Rápido, moderno y listo\npara conectar con cualquier backend', {
    x: 0.6, y: 0.72, w: 8.5, h: 1.1,
    fontSize: 30, bold: true, color: BGDARK, lineSpacingMultiple: 1.15,
  })

  const stack = [
    { nombre: 'React 18', desc: 'UI declarativa con componentes reutilizables', color: '0EA5E9' },
    { nombre: 'Tailwind CSS', desc: 'Diseño responsive sin escribir CSS personalizado', color: '06B6D4' },
    { nombre: 'React Router', desc: 'Navegación SPA fluida entre todas las pantallas', color: '7C3AED' },
    { nombre: 'React Context', desc: 'Estado global compartido entre admin y sitio público', color: TEAL },
    { nombre: 'Vite', desc: 'Build instantáneo — producción en < 3 segundos', color: 'F59E0B' },
    { nombre: 'Netlify', desc: 'Deploy automático desde GitHub en cada push', color: '00C7B7' },
  ]

  stack.forEach((tech, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    const x = 0.5 + col * 4.3
    const y = 2.0 + row * 1.8

    card(s, x, y, 4.0, 1.55, BLANCO)
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 4.0, h: 0.25, fill: { color: tech.color }, rectRadius: 0.12 })
    s.addText(tech.nombre, { x: x + 0.15, y: y + 0.32, w: 3.7, h: 0.38, fontSize: 16, bold: true, color: BGDARK })
    s.addText(tech.desc, { x: x + 0.15, y: y + 0.72, w: 3.7, h: 0.6, fontSize: 11, color: GRIS, lineSpacingMultiple: 1.3 })
  })

  // Nota arquitectura
  card(s, 0.5, 5.55, 12.45, 0.95, 'F0FDF4')
  s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 5.55, w: 12.45, h: 0.95, fill: { color: 'F0FDF4' }, line: { color: '86EFAC', width: 1 }, rectRadius: 0.12 })
  s.addText('🔌', { x: 0.65, y: 5.65, w: 0.5, h: 0.65, fontSize: 22 })
  s.addText('Arquitectura preparada para backend', { x: 1.2, y: 5.65, w: 5, h: 0.3, fontSize: 13, bold: true, color: '166534' })
  s.addText('El prototipo actual usa datos hardcodeados en memoria. En fase 2, los componentes se conectan a una API REST o GraphQL sin reescribir la UI.', {
    x: 1.2, y: 5.95, w: 11.4, h: 0.42,
    fontSize: 11, color: '15803D',
  })

  redBar(s); slideNum(s, 6)
}

// ══════════════════════════════════════════════
// SLIDE 7 — PROPUESTA DE VALOR
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: BGDARK } })
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: ROJO, transparency: 90 } })

  s.addText('¿Por qué PatitasDonantes?', {
    x: 0.8, y: 0.4, w: 11.7, h: 0.5,
    fontSize: 13, bold: true, color: 'FCA5A5', charSpacing: 2,
  })
  s.addText('No es solo una app.\nEs infraestructura para salvar vidas.', {
    x: 0.8, y: 0.85, w: 10, h: 1.2,
    fontSize: 30, bold: true, color: BLANCO, lineSpacingMultiple: 1.2,
  })

  const valores = [
    { icon: '⚡', titulo: 'Velocidad', desc: 'Solicitud publicada → donantes notificados en segundos. En urgencias, cada minuto cuenta.' },
    { icon: '🎯', titulo: 'Compatibilidad exacta', desc: 'El algoritmo filtra automáticamente por especie, tipo de sangre y disponibilidad.' },
    { icon: '🔗', titulo: 'Comunidad conectada', desc: 'Veterinarias, dueños y mascotas en un mismo ecosistema. Todos ganan.' },
    { icon: '📊', titulo: 'Trazabilidad', desc: 'Historial de donaciones, estados actualizados, y panel de gestión en tiempo real.' },
    { icon: '📱', titulo: 'Sin fricción', desc: 'Funciona en el celular del bolsillo. No requiere descarga de ninguna aplicación.' },
    { icon: '🚀', titulo: 'Escalable', desc: 'El prototipo está listo. La arquitectura permite agregar backend, notificaciones y más.' },
  ]

  valores.forEach((v, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    const x = 0.5 + col * 4.3
    const y = 2.3 + row * 2.15

    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 4.0, h: 1.95, fill: { color: BLANCO, transparency: 92 }, line: { color: BLANCO, transparency: 75 }, rectRadius: 0.1 })
    s.addText(v.icon, { x, y: y + 0.1, w: 0.8, h: 0.7, fontSize: 28, align: 'center' })
    s.addText(v.titulo, { x: x + 0.8, y: y + 0.15, w: 3.1, h: 0.35, fontSize: 14, bold: true, color: BLANCO })
    s.addText(v.desc, { x: x + 0.15, y: y + 0.6, w: 3.75, h: 1.1, fontSize: 11, color: 'CBD5E1', lineSpacingMultiple: 1.3 })
  })

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.1, w: '100%', h: 0.4, fill: { color: ROJO2 } })
  s.addText('Un proyecto de impacto social · Con tecnología de primer nivel', {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fontSize: 12, color: 'FECDD3', align: 'center',
  })
}

// ══════════════════════════════════════════════
// SLIDE 8 — PRÓXIMOS PASOS
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  addBg(s, BLANCO)

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 5.2, h: '100%', fill: { color: BGDARK } })

  s.addText('🐾', { x: 0.3, y: 0.5, w: 4.5, h: 2.5, fontSize: 120, align: 'center', transparency: 80 })
  s.addText('Próximos\npasos', {
    x: 0.4, y: 0.45, w: 4.4, h: 1.2,
    fontSize: 34, bold: true, color: BLANCO, lineSpacingMultiple: 1.1,
  })
  s.addText('Del prototipo al producto\nlisto para producción', {
    x: 0.4, y: 1.7, w: 4.4, h: 0.7,
    fontSize: 13, color: 'CBD5E1', lineSpacingMultiple: 1.3,
  })

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.8, w: 4.4, h: 0.06, fill: { color: ROJO2 } })
  s.addText('¿Arrancamos?', { x: 0.4, y: 6.0, w: 4.4, h: 0.4, fontSize: 18, bold: true, color: ROJO2 })
  s.addText('contacto@patitasdonantes.com', { x: 0.4, y: 6.45, w: 4.4, h: 0.3, fontSize: 12, color: '94A3B8' })

  const fases = [
    {
      fase: 'Fase 1 · Ya listo', color: '22C55E',
      items: ['Prototipo funcional navegable', 'Admin de veterinarias', 'Matching por tipo de sangre', 'Deploy en Netlify'],
    },
    {
      fase: 'Fase 2 · Backend', color: ROJO2,
      items: ['API REST con Node.js / Supabase', 'Autenticación real de usuarios', 'Notificaciones push / email', 'Base de datos persistente'],
    },
    {
      fase: 'Fase 3 · Crecimiento', color: TEAL,
      items: ['App móvil nativa (React Native)', 'Notificaciones geográficas', 'Estadísticas e impacto', 'Onboarding de veterinarias masivo'],
    },
  ]

  fases.forEach((f, i) => {
    const y = 0.5 + i * 2.2
    card(s, 5.5, y, 7.6, 2.0, GRIS2)

    s.addShape(pptx.ShapeType.roundRect, { x: 5.5, y, w: 7.6, h: 0.38, fill: { color: f.color }, rectRadius: 0.08 })
    s.addText(f.fase, { x: 5.65, y: y + 0.04, w: 7.3, h: 0.3, fontSize: 11, bold: true, color: BLANCO, charSpacing: 1 })

    f.items.forEach((item, j) => {
      s.addText('✓', { x: 5.65, y: y + 0.52 + j * 0.35, w: 0.28, h: 0.3, fontSize: 12, bold: true, color: f.color })
      s.addText(item, { x: 5.93, y: y + 0.5 + j * 0.35, w: 6.9, h: 0.3, fontSize: 12, color: BGDARK })
    })
  })

  redBar(s); slideNum(s, 8)
}

// ══════════════════════════════════════════════
// SLIDE 9 — CIERRE
// ══════════════════════════════════════════════
{
  const s = pptx.addSlide()
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: ROJO2 } })

  s.addText('🐾', { x: 0, y: 0.5, w: '100%', h: 5, fontSize: 280, align: 'center', transparency: 92 })

  s.addText('Cada donación\npuede salvar una vida.', {
    x: 1, y: 1.0, w: 11.3, h: 2.2,
    fontSize: 44, bold: true, color: BLANCO, align: 'center', lineSpacingMultiple: 1.15,
  })

  s.addText('Construyamos PatitasDonantes juntos.', {
    x: 1, y: 3.3, w: 11.3, h: 0.6,
    fontSize: 20, color: 'FECDD3', align: 'center',
  })

  // Badge
  s.addShape(pptx.ShapeType.roundRect, { x: 4.5, y: 4.3, w: 4.3, h: 0.7, fill: { color: BLANCO, transparency: 15 }, rectRadius: 0.12 })
  s.addText('💧 patitasdonantes.netlify.app', {
    x: 4.5, y: 4.3, w: 4.3, h: 0.7,
    fontSize: 15, bold: true, color: BLANCO, align: 'center',
  })

  s.addText('© 2026 PatitasDonantes — Todos los derechos reservados', {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fontSize: 10, color: 'FECDD3', align: 'center',
  })
}

// ── Guardar ─────────────────────────────────────────────
const OUTPUT = 'PatitasDonantes-Pitch.pptx'
pptx.writeFile({ fileName: OUTPUT })
  .then(() => console.log(`✅  Presentación generada: ${OUTPUT}`))
  .catch((err) => { console.error(err); process.exit(1) })
