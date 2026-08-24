import { Building2, Mail, Phone, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";

export interface SignUpFormData {
  NombreRedComercial: string;
  FullName: string;
  Email: string;
  Telefono: string;
}

const emptyForm: SignUpFormData = {
  NombreRedComercial: "",
  FullName: "",
  Email: "",
  Telefono: "",
};

interface SignUpFormProps {
  initialData?: SignUpFormData;
  selectedPlanName?: string;
  onSubmit: (data: SignUpFormData) => void;
}

export function SignUpForm({
  initialData = emptyForm,
  selectedPlanName,
  onSubmit,
}: SignUpFormProps) {
  const [form, setForm] = useState(initialData);

  const updateField = (field: keyof SignUpFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="login-form mt-8 space-y-4" onSubmit={submit}>
      <label className="field-label">
        Nombre de la red comercial
        <div className="field">
          <Building2 size={16} strokeWidth={1.7} />
          <input
            name="NombreRedComercial"
            value={form.NombreRedComercial}
            onChange={(event) =>
              updateField("NombreRedComercial", event.target.value)
            }
            placeholder="Mi empresa"
            maxLength={200}
            autoComplete="organization"
            required
          />
        </div>
      </label>

      <label className="field-label">
        Nombre completo
        <div className="field">
          <UserRound size={16} strokeWidth={1.7} />
          <input
            name="FullName"
            value={form.FullName}
            onChange={(event) => updateField("FullName", event.target.value)}
            placeholder="Nombre y apellidos"
            maxLength={200}
            autoComplete="name"
            required
          />
        </div>
      </label>

      <label className="field-label">
        Correo electrónico
        <div className="field">
          <Mail size={16} strokeWidth={1.7} />
          <input
            name="Email"
            type="email"
            value={form.Email}
            onChange={(event) => updateField("Email", event.target.value)}
            placeholder="tu@empresa.com"
            maxLength={254}
            autoComplete="email"
            required
          />
        </div>
      </label>

      <label className="field-label">
        Teléfono
        <div className="field">
          <Phone size={16} strokeWidth={1.7} />
          <input
            name="Telefono"
            type="tel"
            value={form.Telefono}
            onChange={(event) => updateField("Telefono", event.target.value)}
            placeholder="55 1234 5678"
            maxLength={30}
            autoComplete="tel"
            required
          />
        </div>
      </label>

      {selectedPlanName && (
        <p className="flex items-center justify-between rounded-xl bg-[var(--color-success-soft)] px-4 py-3 text-xs text-[var(--color-brand)]">
          <span>Plan seleccionado</span>
          <strong>{selectedPlanName}</strong>
        </p>
      )}

      <button className="btn-primary mt-2 w-full justify-center" type="submit">
        Continuar
      </button>
    </form>
  );
}
