import { ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, Mail, ShieldCheck, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  requestPasswordRecovery,
  resetPassword,
  verifyPasswordRecoveryCode,
} from "../services/authService";

type RecoveryStep = "email" | "code" | "password";

interface PasswordRecoveryModalProps {
  initialEmail?: string;
  onClose: () => void;
  onCompleted: (email: string) => void;
}

export function PasswordRecoveryModal({
  initialEmail = "",
  onClose,
  onCompleted,
}: PasswordRecoveryModalProps) {
  const [step, setStep] = useState<RecoveryStep>("email");
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const requestCode = async (event?: FormEvent) => {
    event?.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    try {
      const message = await requestPasswordRecovery(email.trim());
      toast.success("Revisa tu correo", { description: message });
      setStep("code");
    } catch (value) {
      setError(value instanceof Error ? value.message : "No fue posible enviar el código.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyCode = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    try {
      await verifyPasswordRecoveryCode(email.trim(), code);
      setStep("password");
    } catch (value) {
      setError(value instanceof Error ? value.message : "El código no es válido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const changePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setIsSubmitting(true);
    setError(undefined);
    try {
      const message = await resetPassword(email.trim(), code, newPassword, confirmPassword);
      toast.success("Contraseña actualizada", { description: message });
      onCompleted(email.trim());
    } catch (value) {
      setError(value instanceof Error ? value.message : "No fue posible actualizar la contraseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    email: {
      eyebrow: "Recuperación de acceso",
      title: "Recupera tu contraseña",
      description: "Escribe el correo asociado con tu cuenta. Te enviaremos un código de seis dígitos.",
      icon: Mail,
    },
    code: {
      eyebrow: "Verificación",
      title: "Revisa tu correo",
      description: `Enviamos un código a ${email.trim()}. Estará vigente durante 10 minutos.`,
      icon: ShieldCheck,
    },
    password: {
      eyebrow: "Último paso",
      title: "Crea una contraseña nueva",
      description: "Usa al menos ocho caracteres y evita reutilizar tu contraseña anterior.",
      icon: KeyRound,
    },
  }[step];
  const StepIcon = content.icon;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#082f2a]/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="password-recovery-title">
      <section className="w-full max-w-[30rem] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(5,48,42,.28)]">
        <header className="relative border-b border-[var(--color-border)] px-7 pb-6 pt-7 sm:px-8">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="absolute right-5 top-5 grid size-9 place-items-center rounded-full text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" aria-label="Cerrar recuperación"><X size={18} /></button>
          <span className="grid size-12 place-items-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-brand)]"><StepIcon size={21} strokeWidth={1.7} /></span>
          <p className="mt-5 text-[.6rem] font-extrabold uppercase tracking-[.16em] text-[var(--color-success)]">{content.eyebrow}</p>
          <h2 id="password-recovery-title" className="mt-2 font-display text-2xl font-semibold tracking-[-.035em] text-[var(--color-ink)]">{content.title}</h2>
          <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{content.description}</p>
          <div className="mt-5 flex gap-2" aria-hidden="true">{["email", "code", "password"].map((item, index) => <span key={item} className={`h-1 flex-1 rounded-full ${index <= ["email", "code", "password"].indexOf(step) ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]"}`} />)}</div>
        </header>

        {step === "email" && <form onSubmit={requestCode} className="space-y-5 px-7 py-7 sm:px-8">
          <label className="field-label">Correo electrónico<div className="field mt-1.5"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@empresa.com" autoComplete="email" required autoFocus /></div></label>
          {error && <p role="alert" className="rounded-xl bg-[#fff0ee] px-4 py-3 text-xs text-[#a84940]">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Enviando código…" : "Enviar código"}</button>
        </form>}

        {step === "code" && <form onSubmit={verifyCode} className="space-y-5 px-7 py-7 sm:px-8">
          <label className="field-label">Código de seguridad<input className="mt-2 h-16 w-full rounded-2xl border border-[var(--color-border)] bg-[#fbfcfb] text-center font-display text-2xl font-bold tracking-[.45em] text-[var(--color-brand)] outline-none transition focus:border-[var(--color-brand)]" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" autoComplete="one-time-code" required autoFocus /></label>
          {error && <p role="alert" className="rounded-xl bg-[#fff0ee] px-4 py-3 text-xs text-[#a84940]">{error}</p>}
          <button type="submit" disabled={isSubmitting || code.length !== 6} className="btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Verificando…" : "Verificar código"}</button>
          <div className="flex items-center justify-between text-[.67rem]"><button type="button" onClick={() => { setError(undefined); setStep("email"); }} className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-muted)]"><ArrowLeft size={13} /> Cambiar correo</button><button type="button" onClick={() => requestCode()} disabled={isSubmitting} className="font-bold text-[var(--color-brand)]">Reenviar código</button></div>
        </form>}

        {step === "password" && <form onSubmit={changePassword} className="space-y-4 px-7 py-7 sm:px-8">
          <label className="field-label">Contraseña nueva<div className="field mt-1.5"><KeyRound size={16} /><input type={showPassword ? "text" : "password"} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={8} maxLength={200} autoComplete="new-password" required autoFocus /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
          <label className="field-label">Confirma la contraseña<div className="field mt-1.5"><CheckCircle2 size={16} /><input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} maxLength={200} autoComplete="new-password" required /></div></label>
          {error && <p role="alert" className="rounded-xl bg-[#fff0ee] px-4 py-3 text-xs text-[#a84940]">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Actualizando…" : "Guardar contraseña"}</button>
        </form>}
      </section>
    </div>
  );
}
