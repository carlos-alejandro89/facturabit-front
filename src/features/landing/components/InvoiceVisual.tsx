import {
  ArrowRight,
  BadgeCheck,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { label: "Panel FacturaBit", eyebrow: "Control operativo" },
  { label: "Bóveda digital", eyebrow: "Recepción de CFDI" },
  { label: "Autofacturación", eyebrow: "Del ticket al CFDI" },
  { label: "Integraciones", eyebrow: "Para desarrolladores" },
];

function PanelScene() {
  return (
    <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[#f8faf9] shadow-[0_25px_60px_rgba(4,28,26,.3)]">
      <div className="flex h-10 items-center justify-between border-b border-[var(--color-border)] bg-white px-4">
        <div className="window-dots flex gap-1.5">
          <i />
          <i />
          <i />
        </div>
        <span className="flex items-center gap-1.5 text-[.5rem] font-bold text-[var(--color-success)]">
          <span className="size-1.5 rounded-full bg-[var(--color-mint)]" /> En
          línea
        </span>
      </div>
      <div className="grid grid-cols-[3rem_1fr]">
        <div className="border-r border-[var(--color-border)] bg-white p-2.5">
          <span className="grid size-7 place-items-center rounded-lg bg-[var(--color-brand)] text-white">
            <LayoutDashboard size={13} />
          </span>
          {[ReceiptText, FileText, Database].map((Icon, index) => (
            <span
              className="mt-2.5 grid size-7 place-items-center text-[var(--color-muted)]"
              key={index}
            >
              <Icon size={13} />
            </span>
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-end justify-between">
            <div>
              <small className="text-[.46rem] uppercase tracking-wider text-[var(--color-success)]">
                Resumen
              </small>
              <p className="mt-1 text-xs font-bold text-[var(--color-brand)]">
                Todo marcha en orden
              </p>
            </div>
            <span className="rounded-lg bg-[var(--color-accent)] px-2.5 py-1.5 text-[.48rem] font-bold text-[var(--color-brand-deep)]">
              + CFDI
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Emitidos", "1,284"],
              ["Timbres", "846"],
              ["RFC", "3"],
            ].map(([label, value]) => (
              <div
                className="rounded-lg border border-[var(--color-border)] bg-white p-2.5"
                key={label}
              >
                <small className="block text-[.4rem] text-[var(--color-muted)]">
                  {label}
                </small>
                <strong className="mt-1 block text-sm text-[var(--color-brand)]">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-14 items-end gap-1 rounded-lg border border-[var(--color-border)] bg-white px-3 pb-2">
            {[35, 55, 42, 70, 61, 84, 76, 92].map((height, index) => (
              <i
                className="flex-1 rounded-t-sm bg-[var(--color-mint)]/55"
                style={{ height: `${height}%` }}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VaultScene() {
  return (
    <div className="relative mx-auto flex h-[300px] w-full max-w-[500px] items-center justify-center">
      <ShieldCheck
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 top-0 rotate-[8deg] text-[var(--color-mint)]/[.075]"
        size={142}
        strokeWidth={0.9}
      />
      <div className="absolute left-[3%] top-[10%] space-y-3">
        {["XML", "PDF", "CFDI"].map((type, index) => (
          <div
            className="flex w-24 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-white shadow-lg"
            style={{ marginLeft: `${index * 13}px` }}
            key={type}
          >
            <FileText size={14} className="text-[var(--color-mint)]" />
            <span className="text-[.55rem] font-bold">{type}</span>
          </div>
        ))}
      </div>
      <ArrowRight
        className="absolute left-[36%] text-[var(--color-accent)]"
        size={25}
      />
      <div className="ml-[35%] grid size-52 place-items-center rounded-[2rem] border border-white/15 bg-[var(--color-brand-soft)] shadow-[0_28px_65px_rgba(4,28,26,.4)]">
        <div className="grid size-28 place-items-center rounded-full border-4 border-white/10 bg-[var(--color-brand-deep)] text-[var(--color-mint)]">
          <Database size={42} strokeWidth={1.4} />
        </div>
        <span className="absolute bottom-7 flex items-center gap-1.5 text-[.55rem] font-bold text-white">
          <CheckCircle2 size={12} className="text-[var(--color-mint)]" />{" "}
          Resguardo seguro
        </span>
      </div>
    </div>
  );
}

function SelfInvoiceScene() {
  return (
    <div className="relative mx-auto flex min-h-[300px] w-full max-w-[500px] items-center justify-center gap-5">
      <ShoppingBag
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 top-3 rotate-[-14deg] text-white/[.075]"
        size={86}
        strokeWidth={1}
      />
      <ShoppingCart
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 top-1 rotate-[12deg] text-[var(--color-mint)]/[.09]"
        size={94}
        strokeWidth={1}
      />
      <Ticket
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[43%] rotate-[8deg] text-white/[.065]"
        size={88}
        strokeWidth={1}
      />

      <div className="relative z-10 rotate-[-4deg] rounded-[1.3rem] border border-white/15 bg-white p-5 shadow-[0_22px_50px_rgba(4,28,26,.28)]">
        <ShoppingBag size={24} className="text-[var(--color-brand)]" />
        <p className="mt-4 text-[.5rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          Ticket de compra
        </p>
        <div className="mt-3 space-y-2">
          <i className="block h-1.5 w-24 rounded bg-[var(--color-border)]" />
          <i className="block h-1.5 w-16 rounded bg-[var(--color-border)]" />
        </div>
        <p className="mt-5 text-right text-sm font-bold text-[var(--color-brand)]">
          $1,160
        </p>
      </div>
      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-brand-deep)] shadow-lg">
        <ArrowRight size={20} />
      </span>
      <div className="relative z-10 rotate-[3deg] rounded-[1.3rem] border border-[var(--color-mint)]/40 bg-[var(--color-success-soft)] p-5 shadow-[0_22px_50px_rgba(4,28,26,.28)]">
        <BadgeCheck size={25} className="text-[var(--color-success)]" />
        <p className="mt-4 text-[.5rem] font-bold uppercase tracking-wider text-[var(--color-success)]">
          CFDI timbrado
        </p>
        <div className="mt-3 space-y-2">
          <i className="block h-1.5 w-24 rounded bg-[var(--color-mint)]/35" />
          <i className="block h-1.5 w-16 rounded bg-[var(--color-mint)]/35" />
        </div>
        <p className="mt-5 flex items-center gap-1 text-[.5rem] font-bold text-[var(--color-success)]">
          <CheckCircle2 size={11} /> XML + PDF
        </p>
      </div>
    </div>
  );
}

function IntegrationScene() {
  return (
    <div className="relative mx-auto w-full max-w-[510px] overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#0b2926] p-6 shadow-[0_28px_65px_rgba(4,28,26,.4)]">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-[.52rem] text-white/45">
        <i className="size-2 rounded-full bg-red-300" />
        <i className="size-2 rounded-full bg-yellow-300" />
        <i className="size-2 rounded-full bg-green-300" />
        <span className="ml-2">POST /api/facturacion/emitir-cfdi</span>
      </div>
      <div className="grid gap-5 pt-5 sm:grid-cols-[1fr_auto]">
        <pre className="text-[.58rem] leading-5 text-[var(--color-brand-muted)]">
          <code>{`{
  "rfcEmisor": "AAA010101AAA",
  "conceptos": [ ... ]
}`}</code>
        </pre>
        <div className="grid content-center gap-2">
          {["ERP", "POS", "E-commerce"].map((system) => (
            <span
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.05] px-3 py-2 text-[.5rem] font-bold text-white"
              key={system}
            >
              <Code2 size={11} className="text-[var(--color-mint)]" />
              {system}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[.52rem] font-semibold text-[var(--color-mint)]">
        <Braces size={13} /> Integración simple mediante JSON
      </p>
    </div>
  );
}

const scenes = [PanelScene, VaultScene, SelfInvoiceScene, IntegrationScene];

export function InvoiceVisual() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const ActiveScene = scenes[activeSlide];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative mx-auto h-[430px] w-full max-w-[610px] sm:h-[470px]"
      aria-label="Servicios de FacturaBit"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-[18%] rounded-full bg-[var(--color-mint)]/15 blur-[80px]" />
      <div className="absolute left-[4%] top-2 z-10 flex origin-left scale-105 items-center gap-3 rounded-full border border-white/10 bg-white/[.06] px-4 py-2 backdrop-blur-md lg:scale-110">
        <div>
          <p className="text-[.46rem] font-bold uppercase tracking-[.14em] text-[var(--color-mint)]">
            {slides[activeSlide].eyebrow}
          </p>
          <p className="mt-0.5 font-display text-xs font-semibold text-white">
            {slides[activeSlide].label}
          </p>
        </div>
        <span className="border-l border-white/10 pl-3 text-[.46rem] font-semibold text-white/35">
          0{activeSlide + 1} / 04
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-14 flex items-center justify-center pr-8 sm:top-16 sm:pr-9">
        <div
          key={activeSlide}
          className="w-full origin-center scale-105 sm:scale-110 lg:scale-[1.16] xl:scale-[1.2]"
        >
          <ActiveScene />
        </div>
      </div>

      <nav
        className="absolute -right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-white/10 bg-white/[.055] px-2.5 py-3.5 shadow-[0_14px_35px_rgba(4,28,26,.18)] backdrop-blur-md sm:-right-6 lg:-right-9 xl:-right-12"
        aria-label="Seleccionar servicio"
      >
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.label}
            onClick={() => setActiveSlide(index)}
            className={`rounded-full transition-all duration-300 ${activeSlide === index ? "h-7 w-1.5 bg-[var(--color-accent)] shadow-[0_0_12px_rgba(255,184,45,.45)]" : "size-1.5 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Ver ${slide.label}`}
            aria-current={activeSlide === index}
          />
        ))}
      </nav>
    </div>
  );
}
