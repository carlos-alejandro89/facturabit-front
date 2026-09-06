import { ArrowRight, BadgeDollarSign, Ban, Building2, CalendarDays, CheckCircle2, CircleAlert, Clock3, Copy, Download, Fingerprint, FileCheck2, UserRound, X } from "lucide-react";
import { toast } from "sonner";

export interface DocumentModalData {
  folio: string;
  uuid?: string | null;
  issuer: string;
  issuerRfc: string;
  receiver: string;
  receiverRfc: string;
  status: string;
  message: string;
  issuedAt: string;
  total: string;
}

interface DocumentDetailModalProps {
  kind: "pac" | "xml";
  document: DocumentModalData;
  xml?: string;
  fileName?: string;
  isLoading?: boolean;
  onClose: () => void;
}

export function DocumentDetailModal({ kind, document, xml, fileName, isLoading, onClose }: DocumentDetailModalProps) {
  const copyXml = async () => { if (xml) { await navigator.clipboard.writeText(xml); toast.success("XML copiado al portapapeles."); } };
  const downloadXml = () => { if (!xml) return; const url = URL.createObjectURL(new Blob([xml], { type: "application/xml;charset=utf-8" })); const anchor = window.document.createElement("a"); anchor.href = url; anchor.download = fileName || `${document.folio}.xml`; anchor.click(); URL.revokeObjectURL(url); };
  const status = (() => {
    const value = document.status.toLowerCase();
    if (value.includes("error")) return { Icon: CircleAlert, label: "Error", text: "text-[#b34238]", soft: "bg-[#fff1ef]", border: "border-[#f2c8c3]" };
    if (value.includes("cancel")) return { Icon: Ban, label: "Cancelado", text: "text-[#666966]", soft: "bg-[#f2f2f0]", border: "border-[#dedfdb]" };
    if (value.includes("proceso") || value.includes("solicitud")) return { Icon: Clock3, label: "En proceso", text: "text-[#a86d00]", soft: "bg-[#fff7e4]", border: "border-[#f2d89e]" };
    return { Icon: CheckCircle2, label: document.status, text: "text-[var(--color-success)]", soft: "bg-[var(--color-success-soft)]", border: "border-[var(--color-mint)]/40" };
  })();
  const StatusIcon = status.Icon;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-brand-deep)]/35 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.35rem] border border-[#dfe5e1] bg-white shadow-[0_24px_70px_rgba(3,41,36,.20)]">
        <span className="absolute inset-x-0 top-0 z-10 h-1 bg-[linear-gradient(90deg,var(--color-warning),#f5cb65_32%,var(--color-mint)_72%,var(--color-brand))]" />
        <header className="px-7 pb-5 pt-6">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--color-brand)] text-white shadow-[0_8px_22px_rgba(9,74,66,.16)]"><FileCheck2 size={21} strokeWidth={1.7} /></span><div className="min-w-0"><p className="text-[.55rem] font-bold uppercase tracking-[.14em] text-[var(--color-success)]">Comprobante fiscal</p><h2 className="mt-1 font-display text-[1.65rem] font-semibold tracking-[-.035em] text-[var(--color-ink)]">{document.folio}</h2><p className="mt-1 max-w-xl text-[.66rem] leading-5 text-[var(--color-muted)]">Detalle y trazabilidad de la operación fiscal.</p></div></div>
            <div className="flex items-center gap-2">{kind === "pac" && <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[.62rem] font-semibold ${status.border} ${status.soft} ${status.text}`}><StatusIcon size={13} strokeWidth={2} />{status.label}</span>}<button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-[#f4f6f4] hover:text-[var(--color-brand)]" aria-label="Cerrar"><X size={18} /></button></div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-auto border-t border-[var(--color-border)] px-7 py-5">
          {kind === "pac" ? <div className="space-y-6">
            <section className="grid items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[linear-gradient(105deg,#f8fcfa,#fff_48%,#fffaf0)] px-4 py-3.5 sm:grid-cols-[1fr_auto_1fr]"><div className="flex min-w-0 items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-brand)] text-white shadow-[0_6px_16px_rgba(9,74,66,.12)]"><Building2 size={16} strokeWidth={1.7} /></span><div className="min-w-0"><p className="text-[.5rem] font-bold uppercase tracking-[.11em] text-[var(--color-success)]">Emisor</p><strong className="mt-1 block truncate text-[.68rem] font-semibold">{document.issuer}</strong><span className="text-[.57rem] text-[var(--color-muted)]">RFC {document.issuerRfc}</span></div></div><div className="hidden items-center gap-1.5 sm:flex"><span className="h-px w-5 bg-[var(--color-border)]" /><span className="grid size-7 place-items-center rounded-full border border-[#efd69a] bg-[#fff8e5] text-[#a86d00]"><ArrowRight size={13} strokeWidth={1.8} /></span><span className="h-px w-5 bg-[var(--color-border)]" /></div><div className="flex min-w-0 items-center gap-3 sm:justify-end"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><UserRound size={16} strokeWidth={1.7} /></span><div className="min-w-0 sm:text-right"><p className="text-[.5rem] font-bold uppercase tracking-[.11em] text-[var(--color-success)]">Receptor</p><strong className="mt-1 block truncate text-[.68rem] font-semibold">{document.receiver}</strong><span className="text-[.57rem] text-[var(--color-muted)]">RFC {document.receiverRfc}</span></div></div></section>
            <section>
              <p className="text-[.55rem] font-bold uppercase tracking-[.12em] text-[var(--color-muted)]">Resumen del comprobante</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1.45fr_.8fr_.8fr]">
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--color-mint)]/50 bg-[var(--color-success-soft)]/55 p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--color-success)] shadow-sm"><Fingerprint size={17} strokeWidth={1.8} /></span><div className="min-w-0"><p className="text-[.52rem] font-bold uppercase tracking-[.1em] text-[var(--color-success)]">Folio fiscal</p><strong className={`mt-1.5 block break-all text-[.67rem] font-semibold leading-5 ${document.uuid ? "text-[var(--color-ink)]" : "text-[#a86d00]"}`}>{document.uuid || "Pendiente de asignar"}</strong></div></div>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[#fafbf9] p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--color-brand)] shadow-sm"><CalendarDays size={17} strokeWidth={1.8} /></span><div><p className="text-[.52rem] font-bold uppercase tracking-[.1em] text-[var(--color-muted)]">Emisión</p><strong className="mt-1.5 block text-[.68rem] font-semibold leading-5 text-[var(--color-ink)]">{document.issuedAt}</strong></div></div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#efd69a] bg-[linear-gradient(145deg,#fff8e5,#fffdf8)] p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#a86d00] shadow-sm"><BadgeDollarSign size={18} strokeWidth={1.8} /></span><div><p className="text-[.52rem] font-bold uppercase tracking-[.1em] text-[#9b6a0a]">Total</p><strong className="mt-1 block font-display text-base font-semibold text-[var(--color-brand)]">{document.total}</strong><span className="text-[.52rem] font-medium uppercase tracking-[.08em] text-[#9b6a0a]">MXN</span></div></div>
              </div>
            </section>
            <section className={`rounded-2xl border ${status.border} ${status.soft} px-5 py-4`}><div className={`flex items-center gap-2 ${status.text}`}><StatusIcon size={17} strokeWidth={2} /><p className="text-[.57rem] font-bold uppercase tracking-[.11em]">Resultado de la operación</p></div><p className="mt-3 whitespace-pre-wrap text-[.76rem] leading-6 text-[var(--color-ink)]">{document.message?.trim() || "El campo Mensaje del comprobante no contiene información."}</p></section>
          </div> : isLoading ? <div className="space-y-3">{["w-2/3", "w-full", "w-5/6", "w-full", "w-3/4"].map((width, index) => <div key={index} className={`app-skeleton h-3 ${width}`} />)}</div> : <pre className="overflow-auto rounded-2xl bg-[#092f2b] p-5 text-[.68rem] leading-5 text-[#bfe9dc]">{xml}</pre>}
        </div>
        <footer className="flex items-center justify-between border-t border-[var(--color-border)] bg-[#fcfcfb] px-7 py-4"><div className="flex gap-2">{kind === "xml" && xml && <><button type="button" onClick={copyXml} className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-[.65rem] font-semibold text-[var(--color-brand)]"><Copy size={14} />Copiar</button><button type="button" onClick={downloadXml} className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-[.65rem] font-semibold text-[var(--color-brand)]"><Download size={14} />Descargar</button></>}</div><button type="button" onClick={onClose} className="rounded-xl bg-[var(--color-brand)] px-5 py-2 text-[.67rem] font-semibold text-white transition hover:bg-[var(--color-brand-deep)]">Cerrar</button></footer>
      </div>
    </div>
  );
}
