import { Building2, CheckCircle2, Eye, EyeOff, FileCheck2, FileKey2, ImagePlus, KeyRound, PencilLine, Plus, ShieldCheck, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import type { EmitterSummary } from "./EmitterCard";
import { AddEmitterForm } from "./AddEmitterForm";
import { getDigitalCertificates, uploadDigitalCertificate, type CertificateInfo, type DigitalCertificateRecord } from "../services/certificateService";
import { CertificatePanelSkeleton } from "../../../shared/components/Skeleton";

interface EmitterConfigurationProps {
  emitter: EmitterSummary;
  onBack: () => void;
  onUpdated: (emitter: EmitterSummary) => void;
}

export function EmitterConfiguration({ emitter, onBack, onUpdated }: EmitterConfigurationProps) {
  const [cerFile, setCerFile] = useState<File>();
  const [keyFile, setKeyFile] = useState<File>();
  const [certificatePassword, setCertificatePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editingFiscalData, setEditingFiscalData] = useState(false);
  const [activeSection, setActiveSection] = useState<"fiscal" | "certificate" | "identity">("fiscal");
  const [isUploadingCertificate, setIsUploadingCertificate] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState<CertificateInfo>();
  const [certificates, setCertificates] = useState<DigitalCertificateRecord[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  useEffect(() => {
    if (activeSection !== "certificate") return;
    const controller = new AbortController();
    let active = true;
    setIsLoadingCertificates(true);
    getDigitalCertificates(emitter.rfc, controller.signal)
      .then((items) => { if (active) setCertificates(items); })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        if (active) toast.error(error instanceof Error ? error.message : "No fue posible cargar los certificados.");
      })
      .finally(() => { if (active) setIsLoadingCertificates(false); });
    return () => { active = false; controller.abort(); };
  }, [activeSection, emitter.rfc]);

  const saveCertificate = async () => {
    if (!cerFile || !keyFile || !certificatePassword) return;
    setIsUploadingCertificate(true);
    try {
      const info = await uploadDigitalCertificate(
        emitter.rfc,
        cerFile,
        keyFile,
        certificatePassword,
      );
      setCertificateInfo(info);
      setCertificates(await getDigitalCertificates(emitter.rfc));
      setCerFile(undefined);
      setKeyFile(undefined);
      setCertificatePassword("");
      setShowCertificateForm(false);
      onUpdated({ ...emitter, certificateStatus: "Vigente" });
      toast.success("Certificado validado y guardado correctamente.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No fue posible guardar el certificado.");
    } finally {
      setIsUploadingCertificate(false);
    }
  };

  if (editingFiscalData) {
    return (
      <AddEmitterForm
        initialEmitter={emitter}
        onBack={() => setEditingFiscalData(false)}
        onCreated={(updatedEmitter) => {
          onUpdated(updatedEmitter);
          setEditingFiscalData(false);
        }}
      />
    );
  }

  return (
    <div>
      <PanelPageHeader
        eyebrow="Configuración del emisor"
        title={emitter.commercialName}
        description={`${emitter.rfc} · ${emitter.businessName}`}
        onBack={onBack}
        backLabel="Volver a emisores"
        action={<span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-success-soft)]/65 px-3 py-1.5 text-[.68rem] font-medium text-[var(--color-success)]"><CheckCircle2 size={14} /> Emisor activo</span>}
      />

      <nav className="mt-5 flex w-full gap-1 rounded-xl border border-[var(--color-border)] bg-white p-1" aria-label="Configuración del emisor">
        {([
          { id: "fiscal", label: "Datos fiscales", icon: Building2 },
          { id: "certificate", label: "Certificado digital", icon: FileKey2 },
          { id: "identity", label: "Identidad visual", icon: ImagePlus },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => setActiveSection(id)} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[.68rem] font-medium transition ${activeSection === id ? "bg-[var(--color-brand)] text-white shadow-sm" : "text-[var(--color-muted)] hover:bg-[var(--color-success-soft)]/35 hover:text-[var(--color-brand)]"}`} aria-current={activeSection === id ? "page" : undefined}>
            <Icon size={14} strokeWidth={1.7} /> <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-4 w-full">
        {activeSection === "fiscal" && (
          <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[var(--color-success-soft)]/55 text-[var(--color-brand)]"><Building2 size={17} strokeWidth={1.6} /></span>
                <div><h3 className="font-display text-sm font-medium">Datos fiscales</h3><p className="mt-0.5 text-[.64rem] text-[var(--color-muted)]">Información utilizada en tus comprobantes.</p></div>
              </div>
              <button type="button" onClick={() => setEditingFiscalData(true)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-3 text-[.68rem] font-medium text-[var(--color-brand-deep)] shadow-[0_4px_12px_rgba(247,183,51,.16)] transition hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]"><PencilLine size={14} /> Editar</button>
            </div>
            <dl className="grid gap-x-10 gap-y-5 p-5 text-[.7rem] sm:grid-cols-2 xl:grid-cols-3">
              <div className="sm:col-span-2 xl:col-span-1"><dt className="text-[var(--color-muted)]">Razón social</dt><dd className="mt-1.5 font-medium">{emitter.businessName}</dd></div>
              <div><dt className="text-[var(--color-muted)]">RFC</dt><dd className="mt-1.5 font-medium">{emitter.rfc}</dd></div>
              <div><dt className="text-[var(--color-muted)]">Domicilio fiscal</dt><dd className="mt-1.5 font-medium">C.P. {emitter.postalCode}</dd></div>
              <div className="sm:col-span-2 xl:col-span-3"><dt className="text-[var(--color-muted)]">Régimen fiscal</dt><dd className="mt-1.5 font-medium">{emitter.taxRegime}</dd></div>
            </dl>
          </section>
        )}

        {activeSection === "certificate" && (isLoadingCertificates ? <CertificatePanelSkeleton /> :
        <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[var(--color-success-soft)]/55 text-[var(--color-brand)]"><FileKey2 size={17} strokeWidth={1.6} /></span><div><h3 className="font-display text-sm font-medium">Certificados de sello digital</h3><p className="mt-0.5 text-[.64rem] text-[var(--color-muted)]">Administra los certificados utilizados para firmar tus CFDI.</p></div></div>
            {certificates.length > 0 && <button type="button" onClick={() => setShowCertificateForm((current) => !current)} className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-[.68rem] font-medium transition ${showCertificateForm ? "border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-[#f7f9f8]" : "bg-[var(--color-accent)] text-[var(--color-brand-deep)] shadow-[0_4px_12px_rgba(247,183,51,.16)] hover:bg-[var(--color-accent-hover)]"}`}>{showCertificateForm ? <X size={14} /> : <Plus size={14} />}{showCertificateForm ? "Cerrar captura" : "Cargar nuevo certificado"}</button>}
          </div>

          {(certificates.length === 0 || showCertificateForm) && <div className={`p-5 ${certificates.length === 0 ? "mx-auto max-w-2xl py-8" : "border-b border-[var(--color-border)]"}`}>
            {certificates.length === 0 && <div className="mb-5 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><ShieldCheck size={21} strokeWidth={1.5} /></span><h4 className="mt-4 font-display text-base font-medium">Protege y habilita la emisión de CFDI</h4><p className="mx-auto mt-2 max-w-lg text-[.68rem] leading-5 text-[var(--color-muted)]">Realiza la primera carga del certificado público, su llave privada y contraseña. FacturaBit validará que correspondan y estén dentro de su periodo de vigencia.</p></div>}
            {certificateInfo && <p className="mb-4 rounded-xl border border-[var(--color-success)]/20 bg-[var(--color-success-soft)]/35 p-3 text-[.64rem] text-[var(--color-success)]">Serie {certificateInfo.numeroSerie} validada correctamente.</p>}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={`flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-dashed px-3 py-3 text-[.68rem] transition hover:bg-[#fafcfb] ${cerFile ? "border-[var(--color-success)]/35 bg-[var(--color-success-soft)]/25 text-[var(--color-success)]" : "border-[#cfd9d5] text-[var(--color-brand)]"}`}>{cerFile ? <FileCheck2 size={14} /> : <Upload size={14} />}<span className="min-w-0"><strong className="block truncate font-medium">{cerFile?.name ?? "Seleccionar .cer"}</strong><small className="mt-0.5 block text-[.58rem] text-[var(--color-muted)]">Certificado público</small></span><input type="file" accept=".cer,application/pkix-cert" className="hidden" onChange={(event) => setCerFile(event.target.files?.[0])} /></label>
              <label className={`flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-dashed px-3 py-3 text-[.68rem] transition hover:bg-[#fafcfb] ${keyFile ? "border-[var(--color-success)]/35 bg-[var(--color-success-soft)]/25 text-[var(--color-success)]" : "border-[#cfd9d5] text-[var(--color-brand)]"}`}>{keyFile ? <FileCheck2 size={14} /> : <Upload size={14} />}<span className="min-w-0"><strong className="block truncate font-medium">{keyFile?.name ?? "Seleccionar .key"}</strong><small className="mt-0.5 block text-[.58rem] text-[var(--color-muted)]">Llave privada</small></span><input type="file" accept=".key,application/octet-stream" className="hidden" onChange={(event) => setKeyFile(event.target.files?.[0])} /></label>
            </div>
            <label className="field-label mt-4 block">Contraseña de la llave privada<div className="field mt-1.5"><KeyRound size={14} strokeWidth={1.6} /><input type={showPassword ? "text" : "password"} value={certificatePassword} onChange={(event) => setCertificatePassword(event.target.value)} placeholder="Contraseña del archivo .key" autoComplete="new-password" required /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button></div></label>
            <button type="button" onClick={saveCertificate} disabled={!cerFile || !keyFile || !certificatePassword || isUploadingCertificate} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-[.68rem] font-medium text-white transition hover:bg-[var(--color-brand-deep)] disabled:cursor-not-allowed disabled:opacity-40"><ShieldCheck size={14} /> {isUploadingCertificate ? "Validando certificado…" : certificates.length === 0 ? "Validar y guardar primer certificado" : "Validar y guardar certificado"}</button>
          </div>}

          {certificates.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[46rem] text-left text-[.64rem]"><thead className="border-b border-[var(--color-border)] bg-[#fafbf9] text-[.57rem] uppercase tracking-[.07em] text-[var(--color-muted)]"><tr><th className="px-5 py-3 font-medium">Número de serie</th><th className="px-3 py-3 font-medium">Válido desde</th><th className="px-3 py-3 font-medium">Válido hasta</th><th className="px-3 py-3 font-medium">Protección</th><th className="px-5 py-3 text-right font-medium">Estado</th></tr></thead><tbody className="divide-y divide-[var(--color-border)]">{certificates.map((certificate) => <tr key={certificate.id} className="transition hover:bg-[#fafcfb]"><td className="px-5 py-4"><strong className="block max-w-48 truncate font-medium text-[var(--color-ink)]" title={certificate.numeroSerie}>{certificate.numeroSerie}</strong><span className="mt-1 block text-[.56rem] text-[var(--color-muted)]">{certificate.archivoCer}</span></td><td className="whitespace-nowrap px-3 py-4 text-[var(--color-muted)]">{new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(certificate.validoDesde))}</td><td className="whitespace-nowrap px-3 py-4 text-[var(--color-muted)]">{new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(certificate.validoHasta))}</td><td className="px-3 py-4 text-[var(--color-muted)]">AES-256-GCM · {certificate.tamanoClave} bits</td><td className="px-5 py-4 text-right"><span className={`inline-flex rounded-full px-2.5 py-1 text-[.57rem] font-medium ${certificate.estado === "Vigente" ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : certificate.estado === "Próximo" ? "bg-[#fff5db] text-[#9a6505]" : "bg-[#fff0f0] text-[#b43b3b]"}`}>{certificate.estado}</span></td></tr>)}</tbody></table></div>}
        </section>)}

        {activeSection === "identity" && (
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-success-soft)]/55 text-[var(--color-brand)]"><ImagePlus size={18} strokeWidth={1.6} /></span>
          <h3 className="mt-5 font-display text-base font-medium">Identidad visual</h3>
          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">Personaliza el logotipo que aparecerá en la representación impresa.</p>
          <label className="mt-5 grid min-h-28 cursor-pointer place-items-center rounded-xl border border-dashed border-[#cfd9d5] bg-[#fafbfb] p-4 text-center hover:bg-white">
            <span>
              <ImagePlus className="mx-auto text-[var(--color-muted)]" size={20} strokeWidth={1.5} />
              <strong className="mt-2 block text-[.7rem] font-medium text-[var(--color-brand)]">Subir logotipo</strong>
              <small className="mt-1 block text-[.62rem] text-[var(--color-muted)]">PNG, JPG o SVG · Máx. 2 MB</small>
            </span>
            <input type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" />
          </label>
        </section>)}
      </div>
    </div>
  );
}
