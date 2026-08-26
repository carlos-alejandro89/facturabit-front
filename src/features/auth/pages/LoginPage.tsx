import {
  ArrowLeft,
  BadgeCheck,
  Eye,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useSound from "use-sound";
import pepeLoginTablet from "../../../assets/brand/pepe-login-tablet.png";
import { Brand } from "../../../shared/components/Brand";
import { findSubscriptionPlan } from "../../../shared/models/subscriptionPlan";
import { login, saveSession } from "../services/authService";
import { createErrorSoundDataUri, createSuccessSoundDataUri } from "../utils/errorSound";

interface LoginLocationState {
  from?: string;
}

const errorSound = createErrorSoundDataUri();
const successSound = createSuccessSoundDataUri();

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedPlan = findSubscriptionPlan(searchParams.get("plan"));
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [playError] = useSound(errorSound, { volume: 0.16 });
  const [playSuccess] = useSound(successSound, { volume: 0.13 });
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      const session = await login(email.trim(), password);
      saveSession(session, rememberMe);
      playSuccess();
      toast.success("Sesión iniciada", {
        description: `Bienvenido de nuevo, ${session.fullName.split(/\s+/)[0]}.`,
      });
      const requestedPath = (location.state as LoginLocationState | null)?.from;

      navigate(requestedPath?.startsWith("/panel") ? requestedPath : "/panel", {
        replace: true,
        state: selectedPlan
          ? {
              purchase: {
                planName: selectedPlan.name,
                planPrice: selectedPlan.price,
                planId: selectedPlan.id,
                requiresPayment: true,
                savedCards: [],
              },
            }
          : undefined,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No fue posible iniciar sesión.";
      setSubmitError(message);
      playError();
      toast.error("No pudimos iniciar tu sesión", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="grid min-h-screen bg-white lg:h-screen lg:min-h-0 lg:grid-cols-2 lg:overflow-hidden">
      <section className="flex min-h-screen flex-col bg-[#fbfcfb] px-6 py-8 sm:px-12 lg:h-screen lg:min-h-0 lg:px-16 xl:px-24">
        <Brand />
        <div className="mt-12 w-full max-w-[32rem] pb-8 sm:mt-14 lg:mt-16 xl:mt-20">
          <Link
            className="mb-10 flex w-fit items-center gap-2 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-brand)]"
            to="/"
          >
            <ArrowLeft size={15} /> Volver al inicio
          </Link>
          <div>
            <p className="eyebrow-light">Acceso seguro</p>
            <h1 className="mt-4 font-display text-[2.35rem] font-medium tracking-[-.045em] text-[var(--color-ink)]">
              Bienvenido
            </h1>
            <p className="mt-2.5 text-sm leading-6 text-[var(--color-muted)]">
              Ingresa a tu cuenta para gestionar tu facturación.
            </p>
          </div>
          <form className="login-form mt-8 space-y-4" onSubmit={submit}>
            {selectedPlan && (
              <div className="flex items-center justify-between rounded-xl bg-[var(--color-success-soft)] px-4 py-3 text-xs text-[var(--color-brand)]">
                <span>Continuarás con</span>
                <strong>{selectedPlan.name}</strong>
              </div>
            )}
            <label className="field-label">
              Correo electrónico
              <div className="field">
                <Mail size={16} strokeWidth={1.7} />
                <input type="email" placeholder="tu@empresa.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </div>
            </label>
            <label className="field-label">
              Contraseña
              <div className="field">
                <LockKeyhole size={16} strokeWidth={1.7} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar contraseña"
                >
                  <Eye size={16} strokeWidth={1.7} />
                </button>
              </div>
            </label>
            <div className="flex flex-col gap-3 pt-1 text-xs sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  className="accent-[var(--color-brand)]"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />{" "}
                Recordarme
              </label>
              <a href="#" className="font-semibold text-[var(--color-brand)]">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              className="btn-primary mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
            {submitError && <span className="sr-only" role="alert">{submitError}</span>}
          </form>
          <p className="mt-7 text-center text-xs text-[var(--color-muted)]">
            ¿Aún no tienes cuenta?{" "}
            <Link
              className="font-bold text-[var(--color-brand)]"
              to="/registro"
            >
              Solicita acceso
            </Link>
          </p>
        </div>
        <p className="mt-auto pt-8 text-xs text-[var(--color-muted)]">
          © 2026 FacturaBit · Privacidad · Soporte
        </p>
      </section>
      <section className="login-art relative hidden overflow-hidden bg-[var(--color-brand)] lg:block lg:h-screen">
        <div className="absolute -right-[10%] -top-[10%] size-[500px] rounded-full bg-[var(--color-mint)]/15 blur-[100px]" />
        <div className="absolute left-[12%] top-[11%] size-[470px] rounded-full border border-white/[.07]" />
        <div className="absolute left-[25%] top-[22%] size-[310px] rounded-full border border-white/[.06]" />

        <div className="absolute left-12 top-14 z-10 max-w-sm xl:left-16 xl:top-20">
          <p className="inline-flex items-center gap-2 text-[.66rem] font-bold uppercase tracking-[.14em] text-[var(--color-mint)]">
            <Sparkles size={14} /> Pepe te acompaña
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.04em] text-white">
            ¡Qué gusto verte de nuevo!
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-brand-muted)]">
            Todo está listo para continuar tu operación justo donde la dejaste.
          </p>
          <div className="mt-6 space-y-3 text-xs text-[var(--color-brand-muted)]">
            <p className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-[var(--color-mint)]" />
              Tu información fiscal siempre disponible
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--color-mint)]" />
              Acceso protegido y operación segura
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[1] flex h-[76%] items-start justify-center overflow-hidden">
          <img
            src={pepeLoginTablet}
            alt="Pepe, asistente de FacturaBit"
            className="h-[135%] w-auto max-w-none translate-x-[4%] object-contain object-top drop-shadow-[0_28px_40px_rgba(4,31,29,.4)]"
          />
        </div>
      </section>
    </main>
  );
}
