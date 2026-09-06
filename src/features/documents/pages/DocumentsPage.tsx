import {
  CircleDashed,
  CircleX,
  Ban,
  ChevronLeft,
  ChevronRight,
  Download,
  EllipsisVertical,
  FilePlus2,
  Files,
  FileCode2,
  FileText,
  MessageSquareText,
  Search,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { PanelHeaderButton, PanelHeaderIconButton, PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import { DocumentsTableSkeleton } from "../../../shared/components/Skeleton";
import { getFiscalEntities, type FiscalEntity } from "../../emitters/services/emitterService";
import { getFiscalDocuments, getFiscalDocumentXml, type FiscalDocumentRecord } from "../services/documentService";
import { IssuerFilterPicker } from "../components/IssuerFilterPicker";
import { DocumentDetailModal, type DocumentModalData } from "../components/DocumentDetailModal";

type DocumentStatus = "Vigente" | "Cancelado" | "En proceso" | "Error";

interface FiscalDocument {
  id: string;
  folio: string;
  receiver: string;
  rfc: string;
  issuedAt: string;
  total: string;
  totalValue: number;
  type: string;
  status: DocumentStatus;
  issuer: string;
  issuerRfc: string;
  uuid?: string | null;
  message: string;
  hasXml: boolean;
}

const filters = ["Todos", "Vigente", "En proceso", "Cancelado", "Error"] as const;

const statusStyles: Record<DocumentStatus, string> = {
  Vigente: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  Cancelado: "bg-[#f0efed] text-[#5f625f]",
  "En proceso": "bg-[var(--color-accent)]/15 text-[#a96f00]",
  Error: "bg-[#fff0ee] text-[#b44e42]",
};

function normalizeStatus(status: string): DocumentStatus {
  const value = status.trim().toUpperCase();
  if (value.includes("ERROR")) return "Error";
  if (value.includes("CANCEL")) return "Cancelado";
  if (value.includes("VIGENTE")) return "Vigente";
  return "En proceso";
}

function mapDocument(document: FiscalDocumentRecord): FiscalDocument {
  return {
    id: document.guid,
    folio: [document.serie, document.folio].filter(Boolean).join("-") || "Sin folio",
    receiver: document.receptorNombre,
    rfc: document.receptorRfc,
    issuedAt: new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(document.fecha)),
    total: new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(document.total),
    totalValue: document.total,
    type: document.tipo,
    status: normalizeStatus(document.estatus),
    issuer: document.emisor.nombreComercial || document.emisor.razonSocial,
    issuerRfc: document.emisor.rfc,
    uuid: document.folioFiscal,
    message: document.mensaje,
    hasXml: Boolean(document.pathXmlCfdi),
  };
}

export function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Todos");
  const [selectedIssuer, setSelectedIssuer] = useState("");
  const [issuers, setIssuers] = useState<FiscalEntity[]>([]);
  const [documents, setDocuments] = useState<FiscalDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowMenu, setRowMenu] = useState<{ id: string; top: number; right: number }>();
  const [detailModal, setDetailModal] = useState<{ kind: "pac" | "xml"; document: FiscalDocument; xml?: string; fileName?: string; loading?: boolean }>();

  useEffect(() => {
    const controller = new AbortController();
    getFiscalEntities(controller.signal).then(setIssuers).catch((error: unknown) => {
      if (error instanceof Error && error.name !== "AbortError") toast.error(error.message);
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setIsLoading(true);
      getFiscalDocuments({ emisorGuid: selectedIssuer || undefined, busqueda: query || undefined, estatus: activeFilter === "Todos" ? undefined : activeFilter, pagina: page, tamanoPagina: 20, signal: controller.signal })
        .then((result) => { setDocuments(result.items.map(mapDocument)); setTotalRecords(result.totalRegistros); setTotalPages(result.totalPaginas); })
        .catch((error: unknown) => { if (error instanceof Error && error.name !== "AbortError") toast.error(error.message); })
        .finally(() => { if (!controller.signal.aborted) setIsLoading(false); });
    }, 250);
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [activeFilter, page, query, selectedIssuer]);

  const filteredDocuments = useMemo(() => documents, [documents]);
  const metrics = useMemo(() => ({
    issued: documents.filter((document) => document.status === "Vigente").length,
    pending: documents.filter((document) => document.status === "En proceso").length,
    cancelled: documents.filter((document) => document.status === "Cancelado").length,
    total: documents.reduce((sum, document) => sum + document.totalValue, 0),
  }), [documents]);

  const modalDocument = (document: FiscalDocument): DocumentModalData => ({
    folio: document.folio,
    uuid: document.uuid,
    issuer: document.issuer,
    issuerRfc: document.issuerRfc,
    receiver: document.receiver,
    receiverRfc: document.rfc,
    status: document.status,
    message: document.message,
    issuedAt: document.issuedAt,
    total: document.total,
  });

  const showXml = async (document: FiscalDocument) => {
    setRowMenu(undefined);
    setDetailModal({ kind: "xml", document, loading: true });
    try {
      const result = await getFiscalDocumentXml(document.id);
      setDetailModal({ kind: "xml", document, xml: result.contenido, fileName: result.nombreArchivo });
    } catch (error) {
      setDetailModal(undefined);
      toast.error(error instanceof Error ? error.message : "No fue posible consultar el XML.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[82rem]">
      <PanelPageHeader
        eyebrow="Operación fiscal"
        title="CFDI emitidos"
        description="Consulta, descarga y administra los comprobantes fiscales de tus emisores."
        action={
          <>
            <PanelHeaderButton label="Nuevo CFDI"><FilePlus2 size={17} strokeWidth={1.7} /></PanelHeaderButton>
            <PanelHeaderIconButton label="Más opciones"><EllipsisVertical size={17} strokeWidth={1.7} /></PanelHeaderIconButton>
          </>
        }
      />

      <div className="mt-5">
        <IssuerFilterPicker issuers={issuers} value={selectedIssuer} onChange={(guid) => { setSelectedIssuer(guid); setPage(1); }} />
      </div>

      <section className="mt-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_5px_20px_rgba(20,59,53,.025)]">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] px-4 pt-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
          <nav className="flex min-w-0 gap-1 overflow-x-auto" aria-label="Filtrar por estatus">
            {filters.map((filter) => (
              <button key={filter} type="button" onClick={() => { setActiveFilter(filter); setPage(1); }} className={`relative shrink-0 px-3 py-4 text-[.66rem] font-medium transition after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:transition ${activeFilter === filter ? "text-[var(--color-brand)] after:bg-[var(--color-accent)]" : "text-[var(--color-muted)] after:bg-transparent hover:text-[var(--color-brand)]"}`}>
                {filter}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 pb-3 lg:pb-0">
            <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#e4e9e6] px-3 text-[var(--color-muted)] focus-within:border-[var(--color-brand)]/40 lg:w-64 lg:flex-none">
              <Search size={14} strokeWidth={1.6} />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="min-w-0 flex-1 border-0 bg-transparent text-[.68rem] outline-none" placeholder="Buscar comprobante..." />
            </label>
            <button type="button" className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 text-[.65rem] font-medium text-[var(--color-brand)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">
              <Download size={14} /> <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

      {isLoading ? <DocumentsTableSkeleton embedded /> : <>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[58rem] border-collapse text-left">
            <thead className="bg-[#fcfbf8] text-[.58rem] uppercase tracking-[.08em] text-[var(--color-muted)]">
              <tr>
                <th className="px-5 py-3.5">Folio / serie</th>{!selectedIssuer && <th className="px-5 py-3.5">Emisor</th>}<th className="px-5 py-3.5">Receptor</th><th className="px-5 py-3.5">Emisión</th><th className="px-5 py-3.5">Total</th><th className="px-5 py-3.5">Estatus</th><th className="w-16 px-5 py-3.5"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 && (
                <tr className="border-t border-[var(--color-border)]">
                  <td colSpan={selectedIssuer ? 6 : 7} className="px-5 py-12 text-center text-xs text-[var(--color-muted)]">
                    No encontramos comprobantes con los filtros seleccionados.
                  </td>
                </tr>
              )}
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="border-t border-[var(--color-border)] transition hover:bg-[#fcfdfc]">
                  <td className="px-5 py-4 text-xs font-semibold text-[var(--color-brand)]">{document.folio}</td>
                  {!selectedIssuer && <td className="px-5 py-4"><strong className="block text-xs font-medium">{document.issuer}</strong><small className="mt-1 block text-[.6rem] text-[var(--color-muted)]">RFC: {document.issuerRfc}</small></td>}
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-[.62rem] font-semibold text-white">{document.receiver.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span><div className="min-w-0"><strong className="block max-w-[14rem] truncate text-xs font-medium">{document.receiver}</strong><small className="mt-1 block text-[.6rem] text-[var(--color-muted)]">RFC: {document.rfc}</small></div></div></td>
                  <td className="px-5 py-4 text-[.68rem] text-[var(--color-muted)]">{document.issuedAt}</td>
                  <td className="px-5 py-4 text-xs font-semibold">{document.total} <small className="font-normal text-[var(--color-muted)]">MXN</small></td>
                  <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[.6rem] font-medium ${statusStyles[document.status]}`}>{document.status}</span></td>
                  <td className="relative px-5 py-4"><div className="flex justify-end"><div className={`absolute right-[3.65rem] top-1/2 z-10 flex -translate-y-1/2 items-center overflow-visible rounded-full border border-[var(--color-border)] bg-white p-1 shadow-[0_8px_24px_rgba(8,52,46,.12)] transition-all duration-200 ease-out ${rowMenu?.id === document.id ? "visible translate-x-0 opacity-100" : "invisible translate-x-2 opacity-0"}`}>
                    <span className="group/action relative"><button type="button" onClick={() => { setRowMenu(undefined); toast.warning("La representación PDF aún no está disponible para este comprobante."); }} className="grid size-8 place-items-center rounded-full text-[#c84b3f] transition hover:bg-[#fff0ed]" aria-label="Abrir PDF"><FileText size={15} strokeWidth={1.8} /></button><span className="pointer-events-none absolute bottom-[calc(100%+.5rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#171918] px-2.5 py-1.5 text-[.55rem] font-medium text-white opacity-0 shadow-lg transition group-hover/action:opacity-100">PDF</span></span>
                    <span className="group/action relative"><button type="button" onClick={() => showXml(document)} disabled={!document.hasXml} className="grid size-8 place-items-center rounded-full text-[var(--color-success)] transition hover:bg-[var(--color-success-soft)] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Abrir XML"><FileCode2 size={15} strokeWidth={1.8} /></button><span className="pointer-events-none absolute bottom-[calc(100%+.5rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#171918] px-2.5 py-1.5 text-[.55rem] font-medium text-white opacity-0 shadow-lg transition group-hover/action:opacity-100">XML</span></span>
                    <span className="group/action relative"><button type="button" onClick={() => { setRowMenu(undefined); toast.warning("El flujo de cancelación solicitará el motivo antes de enviarse al SAT."); }} className="grid size-8 place-items-center rounded-full text-[#a84940] transition hover:bg-[#fff0ed]" aria-label="Cancelar CFDI"><Ban size={15} strokeWidth={1.8} /></button><span className="pointer-events-none absolute bottom-[calc(100%+.5rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#171918] px-2.5 py-1.5 text-[.55rem] font-medium text-white opacity-0 shadow-lg transition group-hover/action:opacity-100">Cancelar</span></span>
                    <span className="group/action relative"><button type="button" onClick={() => { setRowMenu(undefined); setDetailModal({ kind: "pac", document }); }} className="grid size-8 place-items-center rounded-full text-[var(--color-brand)] transition hover:bg-[var(--color-success-soft)]" aria-label="Ver respuesta del PAC"><MessageSquareText size={15} strokeWidth={1.8} /></button><span className="pointer-events-none absolute bottom-[calc(100%+.5rem)] right-0 whitespace-nowrap rounded-lg bg-[#171918] px-2.5 py-1.5 text-[.55rem] font-medium text-white opacity-0 shadow-lg transition group-hover/action:opacity-100">Respuesta PAC</span></span>
                  </div><button type="button" onClick={() => setRowMenu((current) => current?.id === document.id ? undefined : { id: document.id, top: 0, right: 0 })} className={`grid size-8 place-items-center rounded-lg transition ${rowMenu?.id === document.id ? "bg-[var(--color-brand)] text-white shadow-[0_5px_14px_rgba(9,74,66,.18)]" : "text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]"}`} aria-label={`Opciones de ${document.folio}`}><EllipsisVertical size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-3 sm:flex-row">
          <p className="text-[.63rem] text-[var(--color-muted)]">Mostrando {filteredDocuments.length} de {totalRecords} comprobantes</p>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="grid size-8 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] transition hover:border-[var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft size={14} /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).filter((number) => totalPages <= 5 || number === 1 || number === totalPages || Math.abs(number - page) <= 1).map((number, index, visible) => <span key={number} className="contents">{index > 0 && number - visible[index - 1] > 1 && <span className="grid size-8 place-items-center text-[.65rem] text-[var(--color-muted)]">…</span>}<button type="button" onClick={() => setPage(number)} className={`grid size-8 place-items-center rounded-lg text-[.65rem] transition ${page === number ? "bg-[var(--color-accent)] font-semibold text-[var(--color-brand-deep)]" : "text-[var(--color-muted)] hover:bg-[var(--color-paper)]"}`}>{number}</button></span>)}
            <button type="button" disabled={page >= totalPages || totalPages === 0} onClick={() => setPage((current) => current + 1)} className="grid size-8 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] transition hover:border-[var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight size={14} /></button>
          </div>
        </footer>
      </>}
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Vigentes en esta vista", value: String(metrics.issued), icon: Files, tone: "text-[var(--color-success)] bg-[var(--color-success-soft)]" },
          { label: "En proceso", value: String(metrics.pending), icon: CircleDashed, tone: "text-[#a96f00] bg-[var(--color-accent)]/15" },
          { label: "Cancelados", value: String(metrics.cancelled), icon: CircleX, tone: "text-[#666] bg-[#f0efed]" },
          { label: "Monto en esta vista", value: new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(metrics.total), icon: WalletCards, tone: "text-[var(--color-brand)] bg-[var(--color-paper)]" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-3.5">
            <span className={`grid size-9 place-items-center rounded-lg ${tone}`}><Icon size={16} strokeWidth={1.6} /></span>
            <div><small className="block text-[.55rem] font-medium uppercase tracking-[.08em] text-[var(--color-muted)]">{label}</small><strong className="mt-1 block font-display text-base font-semibold">{value}</strong></div>
          </article>
        ))}
      </div>

      {detailModal && <DocumentDetailModal kind={detailModal.kind} document={modalDocument(detailModal.document)} xml={detailModal.xml} fileName={detailModal.fileName} isLoading={detailModal.loading} onClose={() => setDetailModal(undefined)} />}
    </div>
  );
}
