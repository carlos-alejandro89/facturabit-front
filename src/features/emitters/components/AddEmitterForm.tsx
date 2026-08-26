import { ArrowLeft, Building2, Mail, MapPin, Phone, Save } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import type { EmitterSummary } from "./EmitterCard";
import { upsertFiscalEntity } from "../services/emitterService";
import { getSatRegimenesFiscales, type SatRegimenFiscal } from "../services/satRegimenFiscalService";
import { FormDataSkeleton } from "../../../shared/components/Skeleton";

interface AddEmitterFormProps {
  onBack: () => void;
  onCreated: (emitter: EmitterSummary) => void;
  initialEmitter?: EmitterSummary;
}

interface EmitterFormData {
  businessName: string;
  commercialName: string;
  rfc: string;
  taxRegime: string;
  postalCode: string;
  email: string;
  phone: string;
  street: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  taxRegimeId: string;
}

const initialForm: EmitterFormData = {
  businessName: "",
  commercialName: "",
  rfc: "",
  taxRegime: "",
  postalCode: "",
  email: "",
  phone: "",
  street: "",
  exteriorNumber: "",
  interiorNumber: "",
  neighborhood: "",
  city: "",
  state: "",
  taxRegimeId: "",
};

export function AddEmitterForm({ onBack, onCreated, initialEmitter }: AddEmitterFormProps) {
  const isEditing = Boolean(initialEmitter);
  const [form, setForm] = useState<EmitterFormData>(() => ({
    ...initialForm,
    businessName: initialEmitter?.businessName ?? "",
    commercialName: initialEmitter?.commercialName ?? "",
    rfc: initialEmitter?.rfc ?? "",
    taxRegime: initialEmitter?.taxRegime ?? "",
    taxRegimeId: initialEmitter?.taxRegimeId?.toString() ?? "",
    postalCode: initialEmitter?.postalCode ?? "",
    email: initialEmitter?.email ?? "",
    phone: initialEmitter?.phone ?? "",
    street: initialEmitter?.street ?? "",
    exteriorNumber: initialEmitter?.exteriorNumber ?? "",
    interiorNumber: initialEmitter?.interiorNumber ?? "",
    neighborhood: initialEmitter?.neighborhood ?? "",
    city: initialEmitter?.city ?? "",
    state: initialEmitter?.state ?? "",
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [taxRegimes, setTaxRegimes] = useState<SatRegimenFiscal[]>([]);
  const [isLoadingTaxRegimes, setIsLoadingTaxRegimes] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    getSatRegimenesFiscales(controller.signal)
      .then(setTaxRegimes)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        toast.error(error instanceof Error ? error.message : "No fue posible cargar los regímenes fiscales.");
      })
      .finally(() => setIsLoadingTaxRegimes(false));
    return () => controller.abort();
  }, []);

  const updateField = (field: keyof EmitterFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const entity = await upsertFiscalEntity({
        guid: initialEmitter?.id,
        razonSocial: form.businessName.trim(),
        nombreComercial: form.commercialName.trim(),
        rfc: form.rfc.trim(),
        satRegimenFiscalId: Number(form.taxRegimeId),
        codigoPostal: form.postalCode,
        correoComercial: form.email.trim(),
        telefonoComercial: form.phone.trim(),
        calle: form.street.trim(),
        numExt: form.exteriorNumber.trim(),
        numInt: form.interiorNumber.trim(),
        colonia: form.neighborhood.trim(),
        ciudad: form.city.trim(),
        estado: form.state.trim(),
      });
      const taxRegime = [entity.satRegimenFiscalClave, entity.satRegimenFiscalNombre].filter(Boolean).join(" · ");
      onCreated({
        id: entity.guid,
        businessName: entity.razonSocial,
        commercialName: entity.nombreComercial || entity.razonSocial,
        rfc: entity.rfc,
        taxRegime: taxRegime || form.taxRegime,
        taxRegimeId: entity.satRegimenFiscalId ?? undefined,
        postalCode: entity.codigoPostal,
        certificateStatus: initialEmitter?.certificateStatus ?? "Pendiente",
        email: entity.correoComercial ?? "",
        phone: entity.telefonoComercial ?? "",
        street: entity.calle ?? "",
        exteriorNumber: entity.numExt ?? "",
        interiorNumber: entity.numInt ?? "",
        neighborhood: entity.colonia ?? "",
        city: entity.ciudad ?? "",
        state: entity.estado ?? "",
      });
      toast.success(isEditing ? "Emisor actualizado correctamente." : "Emisor creado correctamente.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No fue posible guardar el emisor.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[70rem]">
      <PanelPageHeader
        eyebrow={isEditing ? "Datos fiscales" : "Nuevo emisor"}
        title={isEditing ? "Actualiza la razón social" : "Agrega una razón social"}
        description={isEditing ? "Edita la información fiscal registrada ante el SAT. Los cambios se aplicarán al mismo emisor." : "Captura la información registrada ante el SAT. Después podrás cargar sus certificados y personalizar el formato impreso."}
        onBack={onBack}
        backLabel="Volver a emisores"
      />

      {isLoadingTaxRegimes ? <FormDataSkeleton /> :
      <form className="mt-5 space-y-4 pb-24" onSubmit={submit}>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2.5 border-b border-[var(--color-border)] pb-3">
            <span className="grid size-8 place-items-center rounded-lg bg-[var(--color-success-soft)]/55 text-[var(--color-brand)]"><Building2 size={15} strokeWidth={1.6} /></span>
            <div><h3 className="font-display text-xs font-medium">Identificación fiscal</h3><p className="mt-0.5 text-[.6rem] text-[var(--color-muted)]">Datos principales del contribuyente</p></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field-label">Razón social<div className="field mt-1.5"><input value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} placeholder="Vertex Contable, S.A. de C.V." maxLength={200} required /></div></label>
            <label className="field-label">Nombre comercial<div className="field mt-1.5"><input value={form.commercialName} onChange={(event) => updateField("commercialName", event.target.value)} placeholder="Vertex Contable" maxLength={200} /></div></label>
            <label className="field-label">RFC<div className="field mt-1.5"><input value={form.rfc} onChange={(event) => updateField("rfc", event.target.value.toUpperCase())} placeholder="VCO240101AB1" minLength={12} maxLength={13} pattern="[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}" required /></div></label>
            <label className="field-label">Régimen fiscal<select value={form.taxRegimeId} onChange={(event) => { const selected = taxRegimes.find((regime) => regime.id === Number(event.target.value)); updateField("taxRegimeId", event.target.value); updateField("taxRegime", selected ? `${selected.clave} · ${selected.nombre}` : ""); }} disabled={isLoadingTaxRegimes || taxRegimes.length === 0} className="mt-1.5 w-full rounded-[.7rem] border border-[#e4e9e6] bg-white px-3 py-[.78rem] text-xs outline-none focus:border-[var(--color-brand)]/50 disabled:cursor-wait disabled:bg-[#f7f9f8] disabled:text-[var(--color-muted)]" required><option value="">{isLoadingTaxRegimes ? "Cargando regímenes fiscales…" : taxRegimes.length === 0 ? "Catálogo no disponible" : "Selecciona un régimen"}</option>{taxRegimes.map((regime) => <option key={regime.guid} value={regime.id}>{regime.clave} · {regime.nombre}</option>)}</select></label>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2.5 border-b border-[var(--color-border)] pb-3">
            <span className="grid size-8 place-items-center rounded-lg bg-[var(--color-success-soft)]/55 text-[var(--color-brand)]"><MapPin size={15} strokeWidth={1.6} /></span>
            <div><h3 className="font-display text-xs font-medium">Domicilio fiscal</h3><p className="mt-0.5 text-[.6rem] text-[var(--color-muted)]">Ubicación registrada en la constancia fiscal</p></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="field-label md:col-span-2">Calle<div className="field mt-1.5"><input value={form.street} onChange={(event) => updateField("street", event.target.value)} placeholder="Avenida Reforma" maxLength={150} /></div></label>
            <label className="field-label">Número exterior<div className="field mt-1.5"><input value={form.exteriorNumber} onChange={(event) => updateField("exteriorNumber", event.target.value)} placeholder="120" maxLength={20} /></div></label>
            <label className="field-label">Número interior<div className="field mt-1.5"><input value={form.interiorNumber} onChange={(event) => updateField("interiorNumber", event.target.value)} placeholder="Oficina 4" maxLength={20} /></div></label>
            <label className="field-label">Código postal<div className="field mt-1.5"><input value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="06600" inputMode="numeric" pattern="[0-9]{5}" required /></div></label>
            <label className="field-label">Colonia<div className="field mt-1.5"><input value={form.neighborhood} onChange={(event) => updateField("neighborhood", event.target.value)} placeholder="Juárez" maxLength={100} /></div></label>
            <label className="field-label">Ciudad o municipio<div className="field mt-1.5"><input value={form.city} onChange={(event) => updateField("city", event.target.value)} placeholder="Cuauhtémoc" maxLength={100} /></div></label>
            <label className="field-label">Estado<div className="field mt-1.5"><input value={form.state} onChange={(event) => updateField("state", event.target.value)} placeholder="Ciudad de México" maxLength={100} /></div></label>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field-label">Correo comercial<div className="field mt-1.5"><Mail size={14} /><input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="facturacion@empresa.com" maxLength={254} /></div></label>
            <label className="field-label">Teléfono comercial<div className="field mt-1.5"><Phone size={14} /><input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="55 1234 5678" maxLength={30} /></div></label>
          </div>
        </section>

        <div className="dashboard-action-bar flex items-center justify-between gap-4 border-t border-[var(--color-border)] bg-white/95 px-5 py-3 backdrop-blur-xl sm:px-7">
          <button type="button" onClick={onBack} className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ArrowLeft size={15} /> Cancelar</button>
          <button type="submit" disabled={isSaving} className="btn-primary min-w-44 justify-center disabled:cursor-wait disabled:opacity-60"><Save size={15} /> {isSaving ? "Guardando…" : isEditing ? "Guardar cambios" : "Guardar emisor"}</button>
        </div>
      </form>
      }
    </div>
  );
}
