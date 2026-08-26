import { ArrowLeft, Building2, Mail, MapPin, Phone, Save } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import type { EmitterSummary } from "./EmitterCard";

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
};

export function AddEmitterForm({ onBack, onCreated, initialEmitter }: AddEmitterFormProps) {
  const isEditing = Boolean(initialEmitter);
  const [form, setForm] = useState<EmitterFormData>(() => ({
    ...initialForm,
    businessName: initialEmitter?.businessName ?? "",
    commercialName: initialEmitter?.commercialName ?? "",
    rfc: initialEmitter?.rfc ?? "",
    taxRegime: initialEmitter?.taxRegime ?? "",
    postalCode: initialEmitter?.postalCode ?? "",
  }));

  const updateField = (field: keyof EmitterFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreated({
      id: initialEmitter?.id ?? crypto.randomUUID(),
      businessName: form.businessName.trim().toUpperCase(),
      commercialName: form.commercialName.trim() || form.businessName.trim(),
      rfc: form.rfc.trim().toUpperCase(),
      taxRegime: form.taxRegime,
      postalCode: form.postalCode,
      certificateStatus: initialEmitter?.certificateStatus ?? "Pendiente",
    });
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
            <label className="field-label">Régimen fiscal<select value={form.taxRegime} onChange={(event) => updateField("taxRegime", event.target.value)} className="mt-1.5 w-full rounded-[.7rem] border border-[#e4e9e6] bg-white px-3 py-[.78rem] text-xs outline-none focus:border-[var(--color-brand)]/50" required><option value="">Selecciona un régimen</option><option value="601 · General de Ley Personas Morales">601 · General de Ley Personas Morales</option><option value="603 · Personas Morales con Fines no Lucrativos">603 · Personas Morales con Fines no Lucrativos</option><option value="605 · Sueldos y Salarios">605 · Sueldos y Salarios</option><option value="612 · Personas Físicas con Actividades Empresariales">612 · Personas Físicas con Actividades Empresariales</option><option value="626 · Régimen Simplificado de Confianza">626 · Régimen Simplificado de Confianza</option></select></label>
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
          <button type="submit" className="btn-primary min-w-44 justify-center"><Save size={15} /> {isEditing ? "Guardar cambios" : "Guardar emisor"}</button>
        </div>
      </form>
    </div>
  );
}
