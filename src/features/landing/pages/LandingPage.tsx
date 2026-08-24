import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Braces,
  CheckCircle2,
  ChevronDown,
  Code2,
  CreditCard,
  Database,
  FileSignature,
  History,
  Menu,
  PackageOpen,
  ReceiptText,
  ShieldCheck,
  UsersRound,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import pepeGuide from "../../../assets/brand/pepe-guide.png";
import { Brand } from "../../../shared/components/Brand";
import { InvoiceVisual } from "../components/InvoiceVisual";

const features = [
  {
    icon: UsersRound,
    title: "Administra tus clientes",
    text: "Organiza la información fiscal de tus clientes y tenla disponible al momento de facturar.",
  },
  {
    icon: PackageOpen,
    title: "Catálogo de productos",
    text: "Centraliza productos, servicios, claves SAT, unidades y precios para agilizar cada emisión.",
  },
  {
    icon: CreditCard,
    title: "Complementos de pago",
    text: "Emite complementos de recepción de pagos desde un proceso claro y conectado con tus CFDI.",
  },
  {
    icon: Ban,
    title: "Cancelación desde FacturaBit",
    text: "Cancela tus comprobantes sin salir de la aplicación ni ingresar directamente al portal del SAT.",
  },
];

const faqs = [
  [
    "¿Puedo administrar varias empresas?",
    "Sí. FacturaBit está pensado para operar múltiples RFC desde una sola cuenta, con información separada y controlada.",
  ],
  [
    "¿Mis certificados están protegidos?",
    "Sí. Tus certificados se validan antes de almacenarse y la contraseña de la llave privada se protege mediante cifrado AES-256-GCM, un estándar de seguridad que garantiza la confidencialidad e integridad de la información.",
  ],
  [
    "¿Qué necesito para comenzar?",
    "Solo los datos fiscales de tu empresa, tu CSD vigente y unos minutos para configurar tu cuenta.",
  ],
  [
    "¿Puedo recuperar los timbres vencidos?",
    'Sí. Cuenta con un periodo de 15 días después de la fecha de vencimiento para adquirir una "Vigencia Extra". También puede comprar un nuevo plan de timbres; los timbres recuperables se sumarán a su paquete nuevo. Si no utiliza alguna de estas opciones de redención dentro del periodo indicado, el contador se reiniciará automáticamente y los timbres ya no podrán recuperarse.',
  ],
  [
    "¿Debo conservar las facturas electrónicas que emita?",
    "Sí. Por ley debe almacenar o respaldar tanto el XML como la representación impresa en PDF mediante medios magnéticos, ópticos o cualquier otro almacenamiento informático durante cinco años. Los planes PRO y Premium respaldan sus CFDI durante el periodo definido por ley y le permiten consultarlos cuando lo requiera.",
  ],
];

const plans = [
  {
    id: "inicial",
    name: "Plan Inicial",
    price: "$649.00",
    features: [
      "100 timbres",
      "1 año de vigencia",
      "1 formato PDF estándar",
      "$199 Vigencia Extra",
    ],
  },
  {
    id: "basico",
    name: "Plan Básico",
    price: "$1,099.00",
    features: [
      "200 timbres",
      "1 año de vigencia",
      "1 formato PDF estándar",
      "$159 Vigencia Extra",
    ],
  },
  {
    id: "pro",
    name: "Plan PRO",
    price: "$1,999.00",
    recommended: true,
    features: [
      "500 timbres",
      "2 años de vigencia",
      "1 formato PDF personalizado",
      "Respaldo de archivos XML y PDF",
      "$129 Vigencia Extra",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$3,299.00",
    features: [
      "1,000 timbres",
      "2 años de vigencia",
      "1 formato PDF personalizado",
      "Respaldo de archivos XML y PDF",
      "$99 Vigencia Extra",
    ],
  },
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-surface)] pt-20 text-[var(--color-ink)]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-white/95 shadow-[0_8px_30px_rgba(15,61,56,.06)] backdrop-blur-md">
        <div className="container-shell flex h-20 items-center justify-between">
          <Brand />
          <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            <a href="#soluciones" className="nav-link">
              Soluciones
            </a>
            <a href="#beneficios" className="nav-link">
              Beneficios
            </a>
            <a href="#nosotros" className="nav-link">
              Nosotros
            </a>
            <a href="#precios" className="nav-link">
              Precios
            </a>
            <a href="#preguntas" className="nav-link">
              Preguntas
            </a>
            <Link to="/desarrolladores" className="nav-link">
              Desarrolladores
            </Link>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link className="btn-ghost" to="/login">
              Iniciar sesión
            </Link>
            <Link className="btn-primary" to="/registro">
              Comenzar ahora <ArrowRight size={17} />
            </Link>
          </div>
          <button
            className="icon-button lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[var(--color-border)] bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 font-semibold">
              <a href="#soluciones">Soluciones</a>
              <a href="#beneficios">Beneficios</a>
              <a href="#nosotros">Nosotros</a>
              <a href="#precios">Precios</a>
              <a href="#preguntas">Preguntas</a>
              <Link to="/desarrolladores">Desarrolladores</Link>
              <Link to="/login">Iniciar sesión</Link>
              <Link className="btn-primary justify-center" to="/registro">
                Comenzar ahora
              </Link>
            </div>
          </div>
        )}
      </header>
      <section className="hero-grid relative bg-[var(--color-brand)] text-white">
        <div className="hero-glow" />
        <div className="container-shell relative grid min-h-[610px] items-center gap-10 py-12 lg:grid-cols-[.92fr_1.08fr] lg:py-14">
          <div className="max-w-[620px]">
            <div className="eyebrow">
              <Zap size={15} fill="currentColor" /> Facturación inteligente para
              México
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,4.8vw,4.8rem)] font-semibold leading-[.98] tracking-[-.055em]">
              Tu negocio.
              <br />
              Tus facturas.
              <br />
              <span className="text-[var(--color-accent)]">
                Sin complicaciones.
              </span>
            </h1>
            <p className="mt-6 max-w-[540px] text-base leading-7 text-[var(--color-brand-muted)] sm:text-lg">
              Emite CFDI, controla tus folios y mantén tu operación fiscal en
              orden desde un solo lugar.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="btn-primary btn-large justify-center"
                to="/registro"
              >
                Comenzar ahora <ArrowRight size={19} />
              </Link>
              <a
                className="btn-outline btn-large justify-center"
                href="#soluciones"
              >
                Conocer la plataforma
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-brand-muted)]">
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[var(--color-mint)]" />{" "}
                Compatible con CFDI 4.0
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--color-mint)]" />{" "}
                CSD protegido
              </span>
            </div>
          </div>
          <InvoiceVisual />
        </div>
      </section>
      <section id="soluciones" className="section-space bg-white">
        <div className="container-shell">
          <div className="section-heading">
            <span>Todo bajo control</span>
            <h2>Una operación fiscal más clara</h2>
            <p>
              Las herramientas esenciales para facturar con rapidez, visibilidad
              y confianza.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }, index) => (
              <article className="feature-card" key={title}>
                <span className="feature-number">0{index + 1}</span>
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#beneficios">
                  Conocer más <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="beneficios"
        className="section-space bg-[var(--color-paper)]"
      >
        <div className="container-shell">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-10 lg:p-12">
            <div className="section-heading mx-auto max-w-3xl text-center">
              <span>Útil e innovador</span>
              <h2>Siempre actualizado. Todo bajo control.</h2>
              <p>
                Una plataforma intuitiva que evoluciona con las disposiciones
                del SAT y centraliza la operación de tus CFDI sin costos
                sorpresa.
              </p>
            </div>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative rounded-[1.6rem] bg-[var(--color-brand)] p-7 text-white sm:p-9">
                <div className="absolute right-7 top-7 size-28 rounded-full bg-[var(--color-accent)]/15 blur-xl" />
                <p className="relative text-xs font-bold uppercase tracking-[.18em] text-[var(--color-mint)]">
                  Operación centralizada
                </p>
                <p className="relative mt-5 max-w-md font-display text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl">
                  Emita, consulte y cancele desde un mismo espacio.
                </p>
                <p className="relative mt-3 text-sm leading-6 text-[var(--color-brand-muted)]">
                  Cada movimiento permanece conectado y disponible para su
                  seguimiento.
                </p>
                <div className="relative mt-7 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[.06]">
                  {[
                    ["CFDI emitido", "Vigente"],
                    ["Complemento de pago", "Disponible"],
                    ["Solicitud de cancelación", "En seguimiento"],
                  ].map(([label, status]) => (
                    <div
                      className="flex items-center justify-between gap-4 px-4 py-3 text-xs"
                      key={label}
                    >
                      <span className="text-white/70">{label}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-mint)]">
                        <BadgeCheck size={14} /> {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="space-y-5">
                {[
                  "Actualizaciones alineadas con las disposiciones del SAT",
                  "Administración de clientes y catálogo de productos",
                  "Emisión, complementos de pago y cancelación en un solo lugar",
                ].map((item) => (
                  <li
                    className="flex items-center gap-3 text-sm font-semibold sm:text-base"
                    key={item}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)]">
                      <BadgeCheck size={17} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid items-center gap-8 border-t border-[var(--color-border)] pt-10 lg:grid-cols-[1.08fr_.92fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-success)]">
                  Cancelación integrada
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] text-[var(--color-brand)]">
                  Cancele sin complicaciones.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                  Realice la cancelación desde la misma aplicación, consulte el
                  resultado y conserve la trazabilidad sin entrar al portal del
                  SAT.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-[var(--color-brand)]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-success-soft)] px-3.5 py-2">
                    <BadgeCheck size={15} /> Flujo centralizado
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-paper)] px-3.5 py-2">
                    <History size={15} /> Historial consultable
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--color-brand)] p-7 text-white sm:p-8">
                <div className="absolute -right-10 -top-10 size-44 rounded-full bg-[var(--color-accent)]/15 blur-2xl" />
                <div className="relative flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)] text-[var(--color-brand-deep)]">
                    <FileSignature size={21} />
                  </span>
                  <div>
                    <p className="text-[.68rem] font-bold uppercase tracking-[.14em] text-[var(--color-mint)]">
                      CFDI A-1048
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold">
                      Solicitud de cancelación
                    </h3>
                  </div>
                </div>
                <div className="relative mt-6 space-y-2.5 border-l border-white/20 pl-5 text-xs">
                  <p className="text-white/55">Solicitud recibida</p>
                  <p className="text-white/55">Enviada al servicio SAT</p>
                  <p className="font-semibold text-[var(--color-accent)]">
                    Cancelación procesada correctamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="nosotros" className="section-space bg-[var(--color-paper)]">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="feature-icon">
                <History />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[var(--color-success)]">
                Nuestra historia
              </p>
              <p className="mt-3 font-display text-5xl font-semibold tracking-[-.05em] text-[var(--color-brand)]">
                Desde 2014
              </p>
            </div>
            <div className="section-heading text-left">
              <span>Brindamos soluciones en facturación electrónica</span>
              <h2>Experiencia que evoluciona con su empresa.</h2>
              <p>
                En 2014 el SAT declaró la Facturación Electrónica (CFDI) como
                obligatoria para todos los contribuyentes. Desde entonces
                proveemos soluciones de facturación electrónica a diferentes
                sectores del mercado.
              </p>
              <p>
                Diseñamos y desarrollamos software de acuerdo con las
                necesidades de su empresa: desde integraciones con sistemas de
                gestión existentes hasta nuevas soluciones construidas a partir
                de sus requerimientos.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="soluciones-empresariales"
        className="section-space relative overflow-hidden bg-[#eaf3ef]"
      >
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[var(--color-mint)]/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 size-72 rounded-full bg-white/70 blur-3xl" />
        <div className="container-shell relative">
          <div>
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-success)]">
                  Soluciones empresariales
                </p>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)] sm:text-4xl">
                  Infraestructura fiscal construida para tu operación.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] lg:justify-self-end">
                Llevamos la experiencia de FacturaBit a los procesos que ocurren
                antes y después del timbrado: recepción de comprobantes,
                facturación desde tickets e integración con tus sistemas.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Database,
                  title: "Bóveda digital de CFDI",
                  label: "Recepción de proveedores",
                  text: "Un portal para recibir y organizar los comprobantes que tus proveedores entregan a la empresa.",
                  capabilities: [
                    "Recepción de archivos XML y PDF",
                    "Validación fiscal y estructural",
                    "Consulta y resguardo centralizado",
                  ],
                },
                {
                  icon: ReceiptText,
                  title: "Portales de autofacturación",
                  label: "Facturación desde tickets",
                  text: "Tus clientes localizan su compra, capturan sus datos fiscales y obtienen la factura sin intervención de tu equipo.",
                  capabilities: [
                    "Consulta por ticket o folio",
                    "Captura de datos fiscales",
                    "Entrega automática de XML y PDF",
                  ],
                },
                {
                  icon: Workflow,
                  title: "Integraciones a medida",
                  label: "Conecta tus sistemas",
                  text: "Incorporamos emisión, cancelación y consulta de CFDI directamente en el flujo que tu empresa ya utiliza.",
                  capabilities: [
                    "ERP, punto de venta y e-commerce",
                    "Integración mediante API JSON",
                    "Reglas y procesos particulares",
                  ],
                },
              ].map(({ icon: Icon, title, label, text, capabilities }) => (
                <article
                  className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_36px_rgba(15,61,56,.055)]"
                  key={title}
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-[var(--color-success-soft)] text-[var(--color-success)]">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <p className="mt-5 text-[.62rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-success)]">
                    {label}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-[-.025em] text-[var(--color-brand)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    {text}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[var(--color-border)] pt-4">
                    {capabilities.map((capability) => (
                      <li
                        className="flex items-start gap-2 text-[.7rem] leading-5 text-[var(--color-muted)]"
                        key={capability}
                      >
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-[var(--color-success)]"
                          size={14}
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-lg font-semibold text-[var(--color-brand)]">
                  ¿Tu empresa necesita un flujo diferente?
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Cuéntanos cómo recibes, emites o integras CFDI y diseñaremos
                  el flujo alrededor de tu operación.
                </p>
              </div>
              <a
                className="btn-dark whitespace-nowrap"
                href="mailto:hola@facturabit.mx?subject=Proyecto%20empresarial%20FacturaBit"
              >
                Hablemos de tu proyecto <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="mt-14 grid overflow-hidden rounded-[2rem] bg-[var(--color-brand-deep)] text-white shadow-[var(--shadow-card)] lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <div className="eyebrow">
                <Code2 size={15} /> Para desarrolladores
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-.04em]">
                Integra el timbrado en tu propia plataforma.
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-[var(--color-brand-muted)]">
                Envía la información de tu factura en JSON y recibe el CFDI
                timbrado, su UUID, sellos y XML listo para almacenar.
              </p>
              <p className="mt-6 font-semibold text-[var(--color-accent)]">
                Hecho por desarrolladores, para desarrolladores.
              </p>
            </div>
            <div className="border-t border-white/10 bg-black/15 p-8 lg:border-l lg:border-t-0 sm:p-12">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <i className="size-2 rounded-full bg-red-300" />
                <i className="size-2 rounded-full bg-yellow-300" />
                <i className="size-2 rounded-full bg-green-300" />
                <span className="ml-2">POST /api/facturacion/emitir-cfdi</span>
              </div>
              <pre className="mt-7 overflow-x-auto text-sm leading-7 text-[var(--color-brand-muted)]">
                <code>
                  {
                    '{\n  "rfcEmisor": "AAA010101AAA",\n  "rfcReceptor": "XAXX010101000",\n  "conceptos": [ ... ]\n}'
                  }
                </code>
              </pre>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-mint)]">
                  <Braces size={18} /> Integración simple mediante JSON
                </div>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent)] transition hover:text-white"
                  to="/desarrolladores"
                >
                  Consultar documentación <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="precios"
        className="section-space relative overflow-hidden bg-[var(--color-paper)]"
      >
        <div className="absolute -left-32 top-20 size-80 rounded-full bg-[var(--color-mint)]/15 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-72 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
        <div className="container-shell relative">
          <div className="section-heading mx-auto max-w-3xl text-center">
            <span>Precios flexibles</span>
            <h2>Un plan para cada etapa.</h2>
            <p>
              No importa si usted es una persona física o una gran empresa:
              contamos con opciones que se adaptan a su volumen de facturación.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-[.9fr_.9fr_1.12fr_.9fr] xl:items-center">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-[1.5rem] border transition duration-300 ${
                  plan.recommended
                    ? "min-h-[440px] border-[var(--color-brand)] bg-[var(--color-brand)] p-7 text-white shadow-[0_22px_55px_rgba(15,61,56,.2)] sm:p-8"
                    : "min-h-[380px] border-[var(--color-border)] bg-white p-5 text-[var(--color-ink)] shadow-[var(--shadow-card)] sm:p-6"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-accent)] px-4 py-2 text-[.68rem] font-extrabold uppercase tracking-[.16em] text-[var(--color-brand-deep)]">
                    Recomendado
                  </span>
                )}
                <p
                  className={`font-semibold ${
                    plan.recommended
                      ? "text-sm text-[var(--color-mint)]"
                      : "text-xs text-[var(--color-muted)]"
                  }`}
                >
                  {plan.name}
                </p>
                <p
                  className={`mt-3 font-display font-semibold tracking-[-.05em] ${
                    plan.recommended
                      ? "text-[2.65rem] text-white"
                      : "text-[2rem] text-[var(--color-brand)]"
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-1 text-[.68rem] ${
                    plan.recommended
                      ? "text-white/50"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  Pago por paquete
                </p>

                <ul
                  className={`flex-1 ${
                    plan.recommended ? "mt-7 space-y-4" : "mt-6 space-y-3"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 leading-5 ${
                        plan.recommended
                          ? "text-sm text-white/85"
                          : "text-[.78rem] text-[var(--color-muted)]"
                      }`}
                    >
                      <CheckCircle2
                        size={plan.recommended ? 17 : 15}
                        className={`mt-1 shrink-0 ${
                          plan.recommended
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-success)]"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/registro?plan=${plan.id}`}
                  className={`inline-flex items-center justify-center rounded-xl px-5 font-bold transition ${
                    plan.recommended
                      ? "mt-8 min-h-12 bg-[var(--color-accent)] text-sm text-[var(--color-brand-deep)] hover:-translate-y-0.5"
                      : "mt-7 min-h-10 border border-[var(--color-border)] text-xs text-[var(--color-brand)] hover:border-[var(--color-mint)] hover:bg-[var(--color-success-soft)]"
                  }`}
                >
                  Elegir {plan.name}
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-6 text-[var(--color-muted)]">
            Precios expresados en MXN. La Vigencia Extra permite ampliar el
            periodo de recuperación de sus timbres conforme a las condiciones
            del servicio.
          </p>
        </div>
      </section>
      <section id="preguntas" className="section-space bg-white">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-success-soft)] shadow-[var(--shadow-card)]">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-[var(--color-mint)]/20 blur-3xl" />
            <div className="relative grid items-end gap-8 px-6 pt-10 sm:px-10 lg:grid-cols-[.72fr_1.28fr] lg:px-14 lg:pt-0">
              <div className="order-2 flex justify-center lg:order-1">
                <img
                  src={pepeGuide}
                  alt="Pepe, guía fiscal de FacturaBit"
                  className="max-h-[430px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_20px_28px_rgba(15,61,56,.18)]"
                />
              </div>
              <div className="order-1 pb-2 lg:order-2 lg:py-14">
                <div className="eyebrow-light">Pepe te acompaña</div>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)] sm:text-4xl">
                  Tu guía para facturar con confianza.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-[var(--color-muted)]">
                  Hola, soy Pepe. Te acompañaré para configurar tus datos
                  fiscales, proteger tus certificados y emitir tus CFDI sin
                  complicaciones.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Configura tu empresa"],
                    ["02", "Carga tu certificado"],
                    ["03", "Emite tu primer CFDI"],
                  ].map(([number, label]) => (
                    <div
                      className="rounded-xl border border-white/80 bg-white/65 p-4 backdrop-blur"
                      key={number}
                    >
                      <span className="text-xs font-bold text-[var(--color-success)]">
                        {number}
                      </span>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-brand)]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-7 flex items-center gap-2 text-sm font-bold text-[var(--color-brand)]">
                  ¿Tienes alguna duda? Pepe tiene la respuesta.
                </p>
              </div>
            </div>

            <div className="relative mx-3 mb-3 rounded-[1.5rem] bg-white px-5 py-9 sm:mx-6 sm:mb-6 sm:px-8 lg:mx-10 lg:mb-10 lg:px-12 lg:py-12">
              <div className="grid gap-4 border-b border-[var(--color-border)] pb-8 md:grid-cols-[.75fr_1.25fr] md:items-end">
                <div>
                  <span className="eyebrow-light">Pepe responde</span>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] text-[var(--color-brand)]">
                    Preguntas frecuentes
                  </h2>
                </div>
                <p className="max-w-xl leading-7 text-[var(--color-muted)] md:justify-self-end">
                  Consulta las respuestas a las dudas más comunes sobre el uso,
                  seguridad y conservación de tus CFDI.
                </p>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {faqs.map(([question, answer], index) => (
                  <button
                    className="faq-row"
                    key={question}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>
                      <b>{question}</b>
                      {openFaq === index && <p>{answer}</p>}
                    </span>
                    <ChevronDown
                      className={openFaq === index ? "rotate-180" : ""}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-accent)] py-16">
        <div className="container-shell flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[-.035em] text-[var(--color-brand-deep)] sm:text-3xl">
              Tu próxima factura puede ser más simple.
            </p>
            <p className="mt-2 text-[var(--color-brand-deep)]/75">
              Entra a tu cuenta y retoma el control de tu operación.
            </p>
          </div>
          <Link className="btn-dark btn-large" to="/login">
            Ingresar a FacturaBit <ArrowRight size={19} />
          </Link>
        </div>
      </section>
      <footer className="bg-[var(--color-brand-deep)] py-14 text-white">
        <div className="container-shell grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Brand inverse />
            <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--color-brand-muted)]">
              Facturación electrónica profesional, segura y simple para empresas
              mexicanas.
            </p>
          </div>
          <div>
            <h3 className="footer-title">Producto</h3>
            <a href="#soluciones">Soluciones</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#nosotros">Nosotros</a>
            <Link to="/panel">Panel</Link>
          </div>
          <div>
            <h3 className="footer-title">Cuenta</h3>
            <Link to="/login">Iniciar sesión</Link>
            <a href="#preguntas">Ayuda</a>
            <a href="mailto:hola@facturabit.mx">Contacto</a>
          </div>
        </div>
        <div className="container-shell mt-12 border-t border-white/10 pt-7 text-xs text-white/45">
          © 2026 FacturaBit. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}
