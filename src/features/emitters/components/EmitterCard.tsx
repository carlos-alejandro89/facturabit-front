import { Building2, ChevronRight, CircleCheck, MapPin } from "lucide-react";

export interface EmitterSummary {
  id: string;
  businessName: string;
  commercialName: string;
  rfc: string;
  taxRegime: string;
  postalCode: string;
  certificateStatus: "Vigente" | "Pendiente";
  taxRegimeId?: number;
  email?: string;
  phone?: string;
  street?: string;
  exteriorNumber?: string;
  interiorNumber?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface EmitterCardProps {
  emitter: EmitterSummary;
  onConfigure: (emitter: EmitterSummary) => void;
}

export function EmitterCard({ emitter, onConfigure }: EmitterCardProps) {
  const certificateReady = emitter.certificateStatus === "Vigente";

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_3px_12px_rgba(20,59,53,.025)]">
      <header className="flex flex-col justify-between gap-4 bg-[var(--color-brand)] px-5 py-4 text-white sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[var(--color-mint)]">
            <Building2 size={17} strokeWidth={1.6} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-medium text-white">{emitter.commercialName}</h3>
            <p className="mt-1 truncate text-[.64rem] text-[var(--color-brand-muted)]">{emitter.businessName}</p>
          </div>
        </div>
        <span className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[.61rem] font-medium ${certificateReady ? "bg-[var(--color-mint)]/15 text-[var(--color-mint)]" : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"}`}>
          <CircleCheck size={12} strokeWidth={1.8} /> CSD {emitter.certificateStatus.toLowerCase()}
        </span>
      </header>

      <div className="grid items-center gap-5 px-5 py-5 sm:grid-cols-[.65fr_1.35fr_.55fr_auto] sm:px-6">
        <div>
          <span className="text-[.6rem] font-medium uppercase tracking-[.08em] text-[var(--color-muted)]">RFC</span>
          <strong className="mt-1.5 block text-xs font-medium text-[var(--color-ink)]">{emitter.rfc}</strong>
        </div>
        <div>
          <span className="text-[.6rem] font-medium uppercase tracking-[.08em] text-[var(--color-muted)]">Régimen fiscal</span>
          <strong className="mt-1.5 block truncate text-xs font-medium text-[var(--color-ink)]">{emitter.taxRegime}</strong>
        </div>
        <div>
          <span className="text-[.6rem] font-medium uppercase tracking-[.08em] text-[var(--color-muted)]">Domicilio</span>
          <strong className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-ink)]"><MapPin size={11} /> C.P. {emitter.postalCode}</strong>
        </div>
        <button type="button" onClick={() => onConfigure(emitter)} className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)]/45 px-4 py-2.5 text-[.7rem] font-medium text-[var(--color-brand)] transition hover:border-[var(--color-brand)]/25 hover:bg-[var(--color-success-soft)]/45">
          Configurar <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}
