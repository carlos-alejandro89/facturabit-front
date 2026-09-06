import { Ban, Braces, CheckCircle2, Clock3, KeyRound, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PanelHeaderButton, PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import { Skeleton } from "../../../shared/components/Skeleton";
import { CreateApiClientModal } from "../components/CreateApiClientModal";
import { createApiClient, getApiClients, revokeApiClient, type ApiClient, type CreatedApiClient } from "../services/apiClientService";

export function ApiIntegrationsPage() {
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<CreatedApiClient>();
  const [revoking, setRevoking] = useState<string>();
  const [revokeTarget, setRevokeTarget] = useState<ApiClient>();

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    getApiClients(signal)
      .then(setClients)
      .catch((error: unknown) => { if (error instanceof Error && error.name !== "AbortError") toast.error(error.message); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { const controller = new AbortController(); load(controller.signal); return () => controller.abort(); }, [load]);

  const create = async (name: string) => {
    setCreating(true);
    try {
      const result = await createApiClient(name);
      setCreated(result);
      setClients((current) => [{ ...result, activo: true, expiresAt: null, lastUsedAt: null }, ...current]);
      toast.success("Credencial API creada correctamente.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No fue posible crear la credencial.");
    } finally { setCreating(false); }
  };

  const revoke = async (client: ApiClient) => {
    setRevoking(client.guid);
    try {
      await revokeApiClient(client.guid);
      setClients((current) => current.map((item) => item.guid === client.guid ? { ...item, activo: false } : item));
      setRevokeTarget(undefined);
      toast.success("Credencial revocada correctamente.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No fue posible revocar la credencial.");
    } finally { setRevoking(undefined); }
  };

  const closeModal = () => { setShowCreate(false); setCreated(undefined); };

  return (
    <div className="mx-auto w-full max-w-[82rem]">
      <PanelPageHeader eyebrow="Conectividad" title="Integraciones API" description="Administra las credenciales utilizadas por tus sistemas para emitir CFDI de forma segura." action={<PanelHeaderButton label="Nueva integración" onClick={() => setShowCreate(true)}><Plus size={17} strokeWidth={1.7} /></PanelHeaderButton>} />

      <section className="mt-5 grid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white lg:grid-cols-[1.35fr_.65fr]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><Braces size={17} /></span><div><h3 className="text-sm font-semibold">OAuth 2.0 · Client Credentials</h3><p className="mt-1 max-w-2xl text-[.7rem] leading-5 text-[var(--color-muted)]">Cada sistema recibe una identidad independiente. Puedes revocarla sin afectar el acceso de tus usuarios ni de otras integraciones.</p></div></div>
        </div>
        <div className="flex items-center gap-3 border-t border-[var(--color-border)] bg-[var(--color-paper)]/45 px-5 py-4 lg:border-l lg:border-t-0">
          <ShieldCheck size={18} className="text-[var(--color-success)]" /><div><p className="text-[.66rem] font-semibold">Secretos protegidos</p><p className="mt-0.5 text-[.61rem] text-[var(--color-muted)]">Nunca se almacenan en texto plano.</p></div>
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_3px_12px_rgba(20,59,53,.025)]">
        <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4 sm:px-6"><div><h3 className="text-sm font-semibold">Credenciales de aplicación</h3><p className="mt-1 text-[.65rem] text-[var(--color-muted)]">{loading ? "Consultando…" : `${clients.length} ${clients.length === 1 ? "integración registrada" : "integraciones registradas"}`}</p></div></header>
        {loading ? <ApiClientsSkeleton /> : clients.length === 0 ? (
          <div className="grid place-items-center px-5 py-14 text-center"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><KeyRound size={20} /></span><h4 className="mt-4 text-sm font-semibold">Conecta tu primer sistema</h4><p className="mt-1 max-w-md text-[.68rem] leading-5 text-[var(--color-muted)]">Genera credenciales para tu ERP, punto de venta o plataforma de comercio electrónico.</p><button type="button" onClick={() => setShowCreate(true)} className="mt-5 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-[.68rem] font-bold text-[var(--color-brand-deep)]">Crear integración</button></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[47rem] text-left"><thead className="bg-[#fcfbf8]"><tr>{["Integración", "Client ID", "Permisos", "Último uso", "Estado", ""].map((title) => <th key={title} className="px-5 py-3 text-[.58rem] font-bold uppercase tracking-[.09em] text-[var(--color-muted)] sm:px-6">{title}</th>)}</tr></thead><tbody>{clients.map((client) => <tr key={client.guid} className="border-t border-[var(--color-border)]"><td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-success-soft)] text-[var(--color-brand)]"><Braces size={15} /></span><div><strong className="block text-[.72rem] font-semibold">{client.nombre}</strong><small className="mt-1 block text-[.58rem] text-[var(--color-muted)]">Creada {formatDate(client.createdAt)}</small></div></div></td><td className="px-5 py-4"><code className="rounded-md bg-[var(--color-paper)] px-2 py-1 text-[.6rem]">{maskClientId(client.clientId)}</code></td><td className="px-5 py-4"><span className="rounded-full bg-[var(--color-success-soft)] px-2.5 py-1 text-[.58rem] font-semibold text-[var(--color-success)]">cfdi.emit</span></td><td className="px-5 py-4 text-[.66rem] text-[var(--color-muted)]">{client.lastUsedAt ? formatDateTime(client.lastUsedAt) : "Sin actividad"}</td><td className="px-5 py-4"><StatusBadge active={client.activo} /></td><td className="px-5 py-4 text-right"><button disabled={!client.activo || revoking === client.guid} onClick={() => setRevokeTarget(client)} type="button" className="group inline-flex size-8 items-center justify-center rounded-lg text-[var(--color-muted)] transition hover:bg-[#fff0ed] hover:text-[#b53b32] disabled:cursor-not-allowed disabled:opacity-35" aria-label={`Revocar ${client.nombre}`} title="Revocar credencial"><Trash2 size={15} strokeWidth={1.7} /></button></td></tr>)}</tbody></table></div>
        )}
      </section>

      {showCreate && <CreateApiClientModal created={created} isSubmitting={creating} onCreate={create} onClose={closeModal} />}
      {revokeTarget && <RevokeModal client={revokeTarget} isSubmitting={revoking === revokeTarget.guid} onCancel={() => setRevokeTarget(undefined)} onConfirm={() => void revoke(revokeTarget)} />}
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) { return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[.59rem] font-semibold ${active ? "bg-[#e6f8f1] text-[#14765a]" : "bg-[#f1f2f1] text-[#68716e]"}`}>{active ? <CheckCircle2 size={12} /> : <Ban size={12} />}{active ? "Activa" : "Revocada"}</span>; }
function maskClientId(value: string) { return value.length > 20 ? `${value.slice(0, 12)}••••${value.slice(-5)}` : value; }
function formatDate(value: string) { return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)); }
function formatDateTime(value: string) { return <span className="inline-flex items-center gap-1.5"><Clock3 size={12} />{new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value))}</span>; }
function ApiClientsSkeleton() { return <div className="divide-y divide-[var(--color-border)]">{[0, 1, 2].map((row) => <div key={row} className="grid grid-cols-[1.4fr_1fr_.7fr_1fr_.6fr_2rem] items-center gap-5 px-6 py-4"><div className="flex items-center gap-3"><Skeleton className="size-8 rounded-lg" /><div className="space-y-2"><Skeleton className="h-2.5 w-32" /><Skeleton className="h-2 w-20" /></div></div><Skeleton className="h-6 w-36 rounded-md" /><Skeleton className="h-6 w-20 rounded-full" /><Skeleton className="h-2.5 w-24" /><Skeleton className="h-6 w-16 rounded-full" /><Skeleton className="size-7 rounded-lg" /></div>)}</div>; }
function RevokeModal({ client, isSubmitting, onCancel, onConfirm }: { client: ApiClient; isSubmitting: boolean; onCancel: () => void; onConfirm: () => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-brand-deep)]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-[1.5rem] border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(5,51,45,.24)]"><span className="grid size-10 place-items-center rounded-xl bg-[#fff0ed] text-[#b53b32]"><Trash2 size={18} /></span><h2 className="mt-4 font-display text-xl font-medium tracking-[-.035em]">Revocar integración</h2><p className="mt-2 text-[.7rem] leading-5 text-[var(--color-muted)]"><strong className="text-[var(--color-ink)]">{client.nombre}</strong> dejará de obtener nuevos access tokens. Esta acción no afecta otras integraciones.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-xl px-4 py-2.5 text-[.7rem] font-semibold text-[var(--color-muted)] hover:bg-[var(--color-paper)]">Conservar</button><button type="button" disabled={isSubmitting} onClick={onConfirm} className="rounded-xl bg-[#b53b32] px-4 py-2.5 text-[.7rem] font-bold text-white transition hover:bg-[#963027] disabled:opacity-50">{isSubmitting ? "Revocando…" : "Revocar credencial"}</button></div></div></div>; }
