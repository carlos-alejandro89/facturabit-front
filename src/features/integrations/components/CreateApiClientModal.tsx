import { Check, Copy, KeyRound, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CreatedApiClient } from "../services/apiClientService";

interface Props {
  created?: CreatedApiClient;
  isSubmitting: boolean;
  onCreate: (name: string) => Promise<void>;
  onClose: () => void;
}

export function CreateApiClientModal({ created, isSubmitting, onCreate, onClose }: Props) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState<"id" | "secret" | "both">();

  const copy = async (value: string, type: "id" | "secret" | "both") => {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    toast.success(type === "both" ? "Credenciales copiadas." : "Dato copiado al portapapeles.");
    window.setTimeout(() => setCopied(undefined), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-brand-deep)]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="api-client-title">
      <div className="w-full max-w-[38rem] overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_28px_90px_rgba(5,51,45,.24)]">
        <header className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-5 sm:px-7">
          <div className="flex gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><KeyRound size={19} strokeWidth={1.7} /></span>
            <div>
              <p className="text-[.6rem] font-bold uppercase tracking-[.15em] text-[var(--color-success)]">Integración segura</p>
              <h2 id="api-client-title" className="mt-1 font-display text-xl font-medium tracking-[-.035em]">{created ? "Guarda tus credenciales" : "Nueva credencial API"}</h2>
              <p className="mt-1 text-[.7rem] leading-5 text-[var(--color-muted)]">{created ? "El secreto no podrá consultarse nuevamente." : "Identifica el sistema que se conectará con FacturaBit."}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]" aria-label="Cerrar"><X size={18} /></button>
        </header>

        {created ? (
          <div className="space-y-4 px-6 py-6 sm:px-7">
            <div className="flex gap-3 rounded-2xl border border-[#efd38d] bg-[#fff8e8] px-4 py-3.5 text-[#76500b]">
              <ShieldCheck size={18} className="mt-0.5 shrink-0" />
              <p className="text-[.7rem] leading-5"><strong>Última oportunidad para copiar el secreto.</strong><br />FacturaBit sólo conserva una versión protegida que no puede recuperarse.</p>
            </div>
            <CredentialField label="Client ID" value={created.clientId} copied={copied === "id"} onCopy={() => copy(created.clientId, "id")} />
            <CredentialField label="Client secret" value={created.clientSecret} copied={copied === "secret"} secret onCopy={() => copy(created.clientSecret, "secret")} />
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={onClose} className="rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-[.7rem] font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-paper)]">Ya lo guardé</button>
              <button type="button" onClick={() => copy(`Client ID: ${created.clientId}\nClient secret: ${created.clientSecret}`, "both")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-[.7rem] font-bold text-[var(--color-brand-deep)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(255,183,45,.25)]"><Copy size={15} /> {copied === "both" ? "Copiadas" : "Copiar ambas"}</button>
            </div>
          </div>
        ) : (
          <form className="px-6 py-6 sm:px-7" onSubmit={(event) => { event.preventDefault(); void onCreate(name.trim()); }}>
            <label className="text-[.7rem] font-semibold text-[var(--color-ink)]" htmlFor="integration-name">Nombre de la integración</label>
            <input id="integration-name" autoFocus maxLength={120} required value={name} onChange={(event) => setName(event.target.value)} placeholder="ERP de producción" className="mt-2 h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3.5 text-xs outline-none transition focus:border-[var(--color-brand)]/45 focus:ring-4 focus:ring-[var(--color-success-soft)]" />
            <div className="mt-4 rounded-2xl bg-[var(--color-paper)]/60 px-4 py-3.5">
              <p className="text-[.61rem] font-bold uppercase tracking-[.1em] text-[var(--color-muted)]">Permiso incluido</p>
              <div className="mt-2 flex items-center gap-2 text-[.72rem] font-medium text-[var(--color-brand)]"><Check size={15} className="text-[var(--color-success)]" /> Emitir CFDI mediante API <code className="ml-auto rounded-md bg-white px-2 py-1 text-[.58rem]">cfdi.emit</code></div>
              <div className="mt-2 flex items-center gap-2 text-[.72rem] font-medium text-[var(--color-brand)]"><Check size={15} className="text-[var(--color-success)]" /> Consultar estatus SAT <code className="ml-auto rounded-md bg-white px-2 py-1 text-[.58rem]">cfdi.status</code></div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-[.7rem] font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-paper)]">Cancelar</button>
              <button disabled={isSubmitting || !name.trim()} className="rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-[.7rem] font-bold text-[var(--color-brand-deep)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" type="submit">{isSubmitting ? "Generando…" : "Generar credencial"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function CredentialField({ label, value, secret, copied, onCopy }: { label: string; value: string; secret?: boolean; copied: boolean; onCopy: () => void }) {
  return <div><span className="text-[.6rem] font-bold uppercase tracking-[.1em] text-[var(--color-muted)]">{label}</span><div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[#fbfcfb] p-2 pl-3.5"><code className="min-w-0 flex-1 break-all text-[.68rem] text-[var(--color-ink)]">{secret ? value : value}</code><button onClick={onCopy} type="button" className="grid size-8 shrink-0 place-items-center rounded-lg text-[var(--color-brand)] transition hover:bg-[var(--color-success-soft)]" aria-label={`Copiar ${label}`}>{copied ? <Check size={15} /> : <Copy size={15} />}</button></div></div>;
}
