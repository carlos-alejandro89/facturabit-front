import { Ban, CheckCircle2, CircleAlert, Clock3, Copy, Download, FileCode2, MessageSquareText, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-brand-deep)]/40 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.4rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(3,41,36,.24)]">
        <header className="flex items-start justify-between border-b border-[var(--color-border)] bg-[linear-gradient(105deg,rgba(229,248,242,.72),rgba(255,255,255,.98)_46%)] px-6 py-5">
          <div className="flex items-center gap-3.5"><span className="grid size-11 place-items-center rounded-xl bg-[var(--color-brand)] text-white shadow-[0_6px_16px_rgba(9,74,66,.14)]">{kind === "xml" ? <FileCode2 size={19} strokeWidth={1.7} /> : <MessageSquareText size={19} strokeWidth={1.7} />}</span><div><p className="text-[.54rem] font-bold uppercase tracking-[.13em] text-[var(--color-success)]">{kind === "xml" ? "Documento fiscal" : "Comunicación del PAC"}</p><div className="mt-1 flex flex-wrap items-center gap-2.5"><h2 className="font-display text-xl font-semibold tracking-[-.025em]">CFDI {document.folio}</h2>{kind === "pac" && <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[.58rem] font-semibold ${status.soft} ${status.text}`}><StatusIcon size={12} strokeWidth={2} />{status.label}</span>}</div><p className="mt-1 text-[.62rem] text-[var(--color-muted)]">Detalle de la operación y respuesta registrada</p></div></div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-brand)]" aria-label="Cerrar"><X size={18} /></button>
        </header>
        <div className="grid gap-2.5 border-b border-[var(--color-border)] bg-[#fafcfb] px-6 py-3.5 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-3.5 py-3"><small className="text-[.52rem] font-semibold uppercase tracking-[.08em] text-[var(--color-muted)]">Folio fiscal</small><strong className={`mt-1 block truncate text-[.66rem] ${document.uuid ? "text-[var(--color-ink)]" : "text-[#a86d00]"}`}>{document.uuid || "Pendiente de asignar"}</strong></div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-3.5 py-3"><small className="text-[.52rem] font-semibold uppercase tracking-[.08em] text-[var(--color-muted)]">Emisor</small><strong className="mt-1 block truncate text-[.66rem]">{document.issuer}</strong><span className="text-[.56rem] text-[var(--color-muted)]">RFC {document.issuerRfc}</span></div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-3.5 py-3"><small className="text-[.52rem] font-semibold uppercase tracking-[.08em] text-[var(--color-muted)]">Receptor</small><strong className="mt-1 block truncate text-[.66rem]">{document.receiver}</strong><span className="text-[.56rem] text-[var(--color-muted)]">RFC {document.receiverRfc}</span></div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-6">
          {kind === "pac" ? <div className={`overflow-hidden rounded-2xl border ${status.border} bg-white`}><div className={`flex items-center gap-3 border-b ${status.border} ${status.soft} px-5 py-3.5 ${status.text}`}><span className="grid size-8 place-items-center rounded-full bg-white/75"><StatusIcon size={16} strokeWidth={2} /></span><div><p className="text-[.53rem] font-semibold uppercase tracking-[.09em] opacity-75">Resultado de la operación</p><strong className="mt-0.5 block text-xs">{status.label}</strong></div></div><div className="p-5"><p className="text-[.54rem] font-semibold uppercase tracking-[.09em] text-[var(--color-muted)]">Mensaje registrado</p><p className="mt-3 whitespace-pre-wrap text-xs leading-6 text-[var(--color-ink)]">{document.message}</p>{!document.message?.trim() && <p className="mt-3 text-xs text-[var(--color-muted)]">El campo Mensaje del comprobante no contiene información.</p>}</div></div> : isLoading ? <div className="space-y-3">{["w-2/3", "w-full", "w-5/6", "w-full", "w-3/4"].map((width, index) => <div key={index} className={`app-skeleton h-3 ${width}`} />)}</div> : <pre className="overflow-auto rounded-2xl bg-[#092f2b] p-5 text-[.68rem] leading-5 text-[#bfe9dc]">{xml}</pre>}
        </div>
        <footer className="flex justify-between border-t border-[var(--color-border)] px-6 py-4"><div className="flex gap-2">{kind === "xml" && xml && <><button type="button" onClick={copyXml} className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-[.65rem] font-semibold text-[var(--color-brand)]"><Copy size={14} />Copiar</button><button type="button" onClick={downloadXml} className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-[.65rem] font-semibold text-[var(--color-brand)]"><Download size={14} />Descargar</button></>}</div><button type="button" onClick={onClose} className="rounded-xl bg-[var(--color-brand)] px-5 py-2 text-[.67rem] font-semibold text-white">Cerrar</button></footer>
      </div>
    </div>
  );
}
