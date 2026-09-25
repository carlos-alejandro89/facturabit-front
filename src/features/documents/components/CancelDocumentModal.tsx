import { AlertTriangle, Ban, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCancellationReasons, type CancellationReason } from "../services/documentService";

interface Props {
  folio: string;
  uuid: string;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (motivo: string, folioSustitucion?: string) => Promise<void>;
}

export function CancelDocumentModal({ folio, uuid, submitting, onClose, onConfirm }: Props) {
  const [reasons, setReasons] = useState<CancellationReason[]>([]);
  const [motivo, setMotivo] = useState("");
  const [replacement, setReplacement] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { getCancellationReasons().then(setReasons).catch((value: unknown) => setError(value instanceof Error ? value.message : "No fue posible cargar el catálogo.")); }, []);
  const selected = reasons.find((reason) => reason.clave === motivo);

  return <div className="fixed inset-0 z-[70] grid place-items-center bg-[#082f2a]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
    <section className="w-full max-w-xl overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_28px_90px_rgba(5,48,42,.25)]">
      <header className="flex items-start justify-between border-b border-[var(--color-border)] px-7 py-6">
        <div className="flex gap-4"><span className="grid size-11 place-items-center rounded-xl bg-[#fff0ed] text-[#b8493d]"><Ban size={20} /></span><div><p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[#b8493d]">Cancelar comprobante</p><h2 className="mt-1 font-display text-2xl font-semibold text-[var(--color-brand-deep)]">CFDI {folio}</h2><p className="mt-1 text-[.66rem] text-[var(--color-muted)]">UUID {uuid}</p></div></div>
        <button type="button" onClick={onClose} disabled={submitting} className="grid size-9 place-items-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-paper)]"><X size={18} /></button>
      </header>
      <div className="space-y-5 px-7 py-6">
        <label className="block"><span className="mb-2 block text-xs font-semibold">Motivo de cancelación</span><select value={motivo} onChange={(event) => setMotivo(event.target.value)} className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 text-xs outline-none focus:border-[var(--color-brand)]"><option value="">Selecciona un motivo del SAT</option>{reasons.map((reason) => <option key={reason.guid} value={reason.clave}>{reason.clave} · {reason.nombre}</option>)}</select></label>
        {selected?.requiereFolioSustitucion && <label className="block"><span className="mb-2 block text-xs font-semibold">UUID del comprobante sustituto</span><input value={replacement} onChange={(event) => setReplacement(event.target.value)} placeholder="00000000-0000-0000-0000-000000000000" className="h-12 w-full rounded-xl border border-[var(--color-border)] px-4 text-xs outline-none focus:border-[var(--color-brand)]" /></label>}
        {error && <p className="flex items-center gap-2 rounded-xl bg-[#fff0ed] px-4 py-3 text-xs text-[#a84940]"><AlertTriangle size={15} />{error}</p>}
      </div>
      <footer className="flex justify-end gap-3 border-t border-[var(--color-border)] px-7 py-5"><button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2.5 text-xs font-semibold text-[var(--color-muted)]">Volver</button><button type="button" disabled={!motivo || Boolean(selected?.requiereFolioSustitucion && !replacement.trim()) || submitting} onClick={() => onConfirm(motivo, replacement.trim() || undefined)} className="rounded-xl bg-[#b8493d] px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45">{submitting ? "Cancelando…" : "Confirmar cancelación"}</button></footer>
    </section>
  </div>;
}
