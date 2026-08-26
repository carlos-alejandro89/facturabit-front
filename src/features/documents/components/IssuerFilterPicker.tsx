import { Building2, Check, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { FiscalEntity } from "../../emitters/services/emitterService";

interface IssuerFilterPickerProps {
  issuers: FiscalEntity[];
  value: string;
  onChange: (guid: string) => void;
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function IssuerFilterPicker({ issuers, value, onChange }: IssuerFilterPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftValue, setDraftValue] = useState(value);
  const selected = issuers.find((issuer) => issuer.guid === value);
  const draft = issuers.find((issuer) => issuer.guid === draftValue);
  const filtered = useMemo(() => issuers.filter((issuer) =>
    `${issuer.razonSocial} ${issuer.nombreComercial ?? ""} ${issuer.rfc}`.toLowerCase().includes(query.toLowerCase())), [issuers, query]);

  const open = () => { setDraftValue(value); setQuery(""); setIsOpen(true); };
  const confirm = () => { onChange(draftValue); setIsOpen(false); };

  return (
    <>
      <div className="flex min-h-16 w-full items-center gap-3.5 rounded-2xl border border-[var(--color-brand)]/15 bg-[linear-gradient(90deg,rgba(229,248,242,.72),rgba(255,255,255,.96))] px-4 py-2.5 shadow-[0_5px_18px_rgba(20,59,53,.035)]">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-[.66rem] font-semibold text-white shadow-[0_5px_12px_rgba(9,74,66,.14)]">
          {selected ? initials(selected.nombreComercial || selected.razonSocial) : <Users size={15} strokeWidth={1.7} />}
        </span>
        <div className="min-w-0 flex-1">
          <small className="block text-[.53rem] font-semibold uppercase tracking-[.1em] text-[var(--color-success)]">Emisor de la consulta</small>
          <strong className="mt-0.5 block truncate text-xs font-semibold text-[var(--color-ink)]">{selected?.nombreComercial || selected?.razonSocial || "Todos los emisores"}</strong>
          <span className="mt-0.5 block truncate text-[.6rem] text-[var(--color-muted)]">{selected ? `${selected.razonSocial} · RFC ${selected.rfc}` : "Vista consolidada de todas las razones sociales"}</span>
        </div>
        <button type="button" onClick={open} className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-[.65rem] font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">Cambiar emisor</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-brand-deep)]/40 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="issuer-picker-title">
          <div className="flex max-h-[min(46rem,90vh)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.4rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(3,41,36,.24)]">
            <header className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-5">
              <div><h2 id="issuer-picker-title" className="font-display text-xl font-semibold tracking-[-.03em]">Elegir emisor</h2><p className="mt-1 text-xs text-[var(--color-muted)]">Busca por razón social, nombre comercial o RFC.</p></div>
              <button type="button" onClick={() => setIsOpen(false)} className="grid size-9 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" aria-label="Cerrar"><X size={18} /></button>
            </header>

            <div className="grid min-h-0 flex-1 md:grid-cols-[1.05fr_.95fr]">
              <section className="flex min-h-0 flex-col border-b border-[var(--color-border)] md:border-b-0 md:border-r">
                <div className="p-4"><label className="flex h-10 items-center gap-2.5 rounded-xl border border-[#dfe6e2] px-3 focus-within:border-[var(--color-brand)]/45"><Search size={15} className="text-[var(--color-muted)]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-0 bg-transparent text-xs outline-none" placeholder="Nombre, razón social o RFC..." /></label></div>
                <p className="px-5 pb-2 text-[.55rem] font-semibold uppercase tracking-[.09em] text-[var(--color-muted)]">{filtered.length + 1} opciones</p>
                <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                  <button type="button" onClick={() => setDraftValue("")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${draftValue === "" ? "bg-[var(--color-success-soft)]" : "hover:bg-[var(--color-paper)]"}`}><span className="grid size-10 place-items-center rounded-xl bg-white text-[var(--color-brand)] shadow-sm"><Users size={17} /></span><div className="flex-1"><strong className="block text-xs">Todos los emisores</strong><small className="text-[.62rem] text-[var(--color-muted)]">Vista consolidada de la organización</small></div>{draftValue === "" && <Check size={16} className="text-[var(--color-success)]" />}</button>
                  {filtered.map((issuer) => <button key={issuer.guid} type="button" onClick={() => setDraftValue(issuer.guid)} className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${draftValue === issuer.guid ? "bg-[var(--color-success-soft)]" : "hover:bg-[var(--color-paper)]"}`}><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-[.65rem] font-semibold text-white shadow-sm">{initials(issuer.nombreComercial || issuer.razonSocial)}</span><div className="min-w-0 flex-1"><strong className="block truncate text-xs">{issuer.nombreComercial || issuer.razonSocial}</strong><small className="block truncate text-[.61rem] text-[var(--color-muted)]">{issuer.razonSocial} · RFC {issuer.rfc}</small></div>{draftValue === issuer.guid && <Check size={16} className="shrink-0 text-[var(--color-success)]" />}</button>)}
                </div>
              </section>

              <section className="grid min-h-[18rem] place-items-center bg-[#fcfdfc] p-7">
                <div className="w-full max-w-xs text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><Building2 size={23} strokeWidth={1.5} /></span>
                  <p className="mt-4 text-[.58rem] font-semibold uppercase tracking-[.1em] text-[var(--color-success)]">Filtro de comprobantes</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{draft?.nombreComercial || draft?.razonSocial || "Todos los emisores"}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{draft ? `${draft.razonSocial} · RFC ${draft.rfc}` : "Se mostrarán los CFDI de todos los emisores vinculados a tu organización."}</p>
                </div>
              </section>
            </div>

            <footer className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] px-6 py-4"><button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-xs font-semibold text-[var(--color-muted)]">Cancelar</button><button type="button" onClick={confirm} className="rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-xs font-bold text-[var(--color-brand-deep)] shadow-[0_7px_18px_rgba(255,183,45,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(255,183,45,.3)]">Usar este emisor</button></footer>
          </div>
        </div>
      )}
    </>
  );
}
