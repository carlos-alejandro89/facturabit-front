import {
  CircleDashed,
  CircleX,
  Download,
  EllipsisVertical,
  FilePlus2,
  Files,
  Search,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PanelHeaderButton, PanelHeaderIconButton, PanelPageHeader } from "../../../shared/components/PanelPageHeader";

type DocumentStatus = "Vigente" | "Cancelado" | "En proceso" | "Error";

interface FiscalDocument {
  id: string;
  folio: string;
  receiver: string;
  rfc: string;
  issuedAt: string;
  total: string;
  type: string;
  status: DocumentStatus;
}

const documents: FiscalDocument[] = [
  { id: "1", folio: "F-1024", receiver: "Soluciones Tech, S.A. de C.V.", rfc: "STE990101XYZ", issuedAt: "24 oct 2026", total: "$1,250.00", type: "Ingreso", status: "Vigente" },
  { id: "2", folio: "F-1025", receiver: "Inmobiliaria Global", rfc: "IGL850505ABC", issuedAt: "25 oct 2026", total: "$4,500.00", type: "Ingreso", status: "Cancelado" },
  { id: "3", folio: "P-0087", receiver: "Distribuidora Norte", rfc: "DNO020101HJK", issuedAt: "25 oct 2026", total: "$890.00", type: "Pago", status: "En proceso" },
  { id: "4", folio: "F-1027", receiver: "Servicios Logísticos", rfc: "SLO121212PPP", issuedAt: "26 oct 2026", total: "$2,100.00", type: "Ingreso", status: "Vigente" },
  { id: "5", folio: "NC-0012", receiver: "Consultoría Gamma", rfc: "CGA450101QWE", issuedAt: "26 oct 2026", total: "$5,600.00", type: "Egreso", status: "Error" },
];

const filters = ["Todos", "Vigente", "En proceso", "Cancelado", "Error"] as const;

const statusStyles: Record<DocumentStatus, string> = {
  Vigente: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  Cancelado: "bg-[#f0efed] text-[#5f625f]",
  "En proceso": "bg-[var(--color-accent)]/15 text-[#a96f00]",
  Error: "bg-[#fff0ee] text-[#b44e42]",
};

export function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Todos");

  const filteredDocuments = useMemo(() => documents.filter((document) => {
    const matchesQuery = `${document.folio} ${document.receiver} ${document.rfc}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = activeFilter === "Todos" || document.status === activeFilter;
    return matchesQuery && matchesStatus;
  }), [activeFilter, query]);

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

      <section className="mt-5 rounded-2xl border border-[var(--color-border)] bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="flex min-h-10 flex-1 items-center gap-2.5 rounded-xl border border-[#e4e9e6] px-3 text-[var(--color-muted)] focus-within:border-[var(--color-brand)]/40">
            <Search size={15} strokeWidth={1.6} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-0 bg-transparent text-xs outline-none" placeholder="Buscar por folio, receptor o RFC" />
          </label>
          <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-4 text-[.7rem] font-medium text-[var(--color-brand)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">
            <Download size={14} /> Exportar
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[.58rem] font-semibold uppercase tracking-[.1em] text-[var(--color-muted)]">Estatus</span>
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`rounded-full px-3 py-1.5 text-[.63rem] font-medium transition ${activeFilter === filter ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-paper)] text-[var(--color-muted)] hover:text-[var(--color-brand)]"}`}>
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[58rem] border-collapse text-left">
            <thead className="bg-[#fcfbf8] text-[.58rem] uppercase tracking-[.08em] text-[var(--color-muted)]">
              <tr>
                <th className="px-5 py-3.5">Folio / serie</th><th className="px-5 py-3.5">Receptor</th><th className="px-5 py-3.5">Tipo</th><th className="px-5 py-3.5">Emisión</th><th className="px-5 py-3.5">Total</th><th className="px-5 py-3.5">Estatus</th><th className="w-16 px-5 py-3.5"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="border-t border-[var(--color-border)] transition hover:bg-[#fcfdfc]">
                  <td className="px-5 py-4 text-xs font-semibold text-[var(--color-brand)]">{document.folio}</td>
                  <td className="px-5 py-4"><strong className="block text-xs font-medium">{document.receiver}</strong><small className="mt-1 block text-[.6rem] text-[var(--color-muted)]">RFC: {document.rfc}</small></td>
                  <td className="px-5 py-4 text-[.68rem] text-[var(--color-muted)]">{document.type}</td>
                  <td className="px-5 py-4 text-[.68rem] text-[var(--color-muted)]">{document.issuedAt}</td>
                  <td className="px-5 py-4 text-xs font-semibold">{document.total} <small className="font-normal text-[var(--color-muted)]">MXN</small></td>
                  <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[.6rem] font-medium ${statusStyles[document.status]}`}>{document.status}</span></td>
                  <td className="px-5 py-4"><button type="button" className="grid size-8 place-items-center rounded-lg text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" aria-label={`Opciones de ${document.folio}`}><EllipsisVertical size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-3 sm:flex-row">
          <p className="text-[.63rem] text-[var(--color-muted)]">Mostrando {filteredDocuments.length} de {documents.length} comprobantes</p>
          <div className="flex gap-1.5"><button className="grid size-8 place-items-center rounded-lg border border-[var(--color-border)] text-[.65rem]">1</button><button className="grid size-8 place-items-center rounded-lg text-[.65rem] text-[var(--color-muted)]">2</button><button className="grid size-8 place-items-center rounded-lg text-[.65rem] text-[var(--color-muted)]">3</button></div>
        </footer>
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Emitidos este mes", value: "24", icon: Files, tone: "text-[var(--color-success)] bg-[var(--color-success-soft)]" },
          { label: "En proceso", value: "2", icon: CircleDashed, tone: "text-[#a96f00] bg-[var(--color-accent)]/15" },
          { label: "Cancelados", value: "4", icon: CircleX, tone: "text-[#666] bg-[#f0efed]" },
          { label: "Monto mensual", value: "$42,350", icon: WalletCards, tone: "text-[var(--color-brand)] bg-[var(--color-paper)]" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-3.5">
            <span className={`grid size-9 place-items-center rounded-lg ${tone}`}><Icon size={16} strokeWidth={1.6} /></span>
            <div><small className="block text-[.55rem] font-medium uppercase tracking-[.08em] text-[var(--color-muted)]">{label}</small><strong className="mt-1 block font-display text-base font-semibold">{value}</strong></div>
          </article>
        ))}
      </div>
    </div>
  );
}
