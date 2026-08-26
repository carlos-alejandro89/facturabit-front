import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import pepeGuide from "../../../assets/brand/pepe-guide.png";
import { Brand } from "../../../shared/components/Brand";
import {
  findSubscriptionPlan,
  getSubscriptionGuid,
  type SubscriptionPlanId,
  subscriptionPlans,
} from "../../../shared/models/subscriptionPlan";
import { PlanSelection } from "../components/PlanSelection";
import { SignUpForm, type SignUpFormData } from "../components/SignUpForm";
import { createFiscalEntity } from "../services/createFiscalEntity";
import { login, saveSession } from "../../auth/services/authService";

type SignUpStep = "details" | "plan" | "ready";

function getPlanFromUrl(value: string | null): SubscriptionPlanId | null {
  if (
    value === "prueba" ||
    subscriptionPlans.some((plan) => plan.id === value)
  ) {
    return value as SubscriptionPlanId;
  }
  return null;
}

function getPlanName(planId: SubscriptionPlanId | null) {
  if (planId === "prueba") return "Prueba gratuita de 7 días";
  return subscriptionPlans.find((plan) => plan.id === planId)?.name;
}

export function SignUpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPlan = getPlanFromUrl(searchParams.get("plan"));
  const [step, setStep] = useState<SignUpStep>("details");
  const [details, setDetails] = useState<SignUpFormData>();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId | null>(
    initialPlan,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const continueFromDetails = (data: SignUpFormData) => {
    setDetails(data);
    setStep(selectedPlan ? "ready" : "plan");
  };

  const continueWithPlan = (plan: SubscriptionPlanId) => {
    setSelectedPlan(plan);
    setStep("ready");
  };

  const finishRegistration = async () => {
    if (!details || !selectedPlan) return;

    const plan = findSubscriptionPlan(selectedPlan);
    const subscriptionGuid = getSubscriptionGuid(selectedPlan);
    if (!subscriptionGuid) {
      setSubmitError("La suscripción seleccionada no es válida.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      const created = await createFiscalEntity({
        ...details,
        SuscripcionGuid: subscriptionGuid,
      });

      const session = await login(details.Email, created.passwordTemporal);
      saveSession(session, true);

      navigate("/panel", {
        state: {
          registration: {
            fullName: details.FullName,
            businessName: details.NombreRedComercial,
            planName: getPlanName(selectedPlan),
            planPrice: plan?.price,
            planId: selectedPlan,
            requiresPayment: selectedPlan !== "prueba",
            entidadFiscalGuid: created.entidadFiscal.guid,
            ordenCompraGuid: created.ordenCompraGuid,
            folioOrdenCompra: created.folioOrdenCompra,
            passwordTemporal: created.passwordTemporal,
            passwordExpiresAt: created.passwordExpiresAt,
          },
        },
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible completar el registro.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="flex min-h-screen flex-col bg-[#fbfcfb] px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <Brand />
        <div className="my-auto w-full max-w-[30rem] py-10">
          {step === "details" && (
            <>
              <Link
                className="mb-8 flex w-fit items-center gap-2 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-brand)]"
                to="/"
              >
                <ArrowLeft size={15} /> Volver al inicio
              </Link>
              <p className="eyebrow-light">Paso 1 de 2</p>
              <h1 className="mt-4 font-display text-[2.2rem] font-medium tracking-[-.045em] text-[var(--color-ink)]">
                Crea tu cuenta
              </h1>
              <p className="mt-2.5 text-sm leading-6 text-[var(--color-muted)]">
                Cuéntanos sobre tu negocio para preparar tu espacio de
                facturación.
              </p>

              <SignUpForm
                initialData={details}
                selectedPlanName={getPlanName(selectedPlan)}
                onSubmit={continueFromDetails}
              />

              <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  className="font-bold text-[var(--color-brand)]"
                  to={selectedPlan ? `/login?plan=${selectedPlan}` : "/login"}
                >
                  Inicia sesión
                </Link>
              </p>
            </>
          )}

          {step === "plan" && (
            <PlanSelection
              onBack={() => setStep("details")}
              onContinue={continueWithPlan}
            />
          )}

          {step === "ready" && (
            <div>
              <button
                type="button"
                className="mb-8 flex items-center gap-2 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-brand)]"
                onClick={() =>
                  setStep(
                    selectedPlan === initialPlan && initialPlan
                      ? "details"
                      : "plan",
                  )
                }
              >
                <ArrowLeft size={15} /> Revisar selección
              </button>
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-success)]">
                <CheckCircle2 size={25} />
              </span>
              <p className="eyebrow-light mt-7">Registro preparado</p>
              <h1 className="mt-4 font-display text-[2.2rem] font-medium tracking-[-.045em] text-[var(--color-ink)]">
                Todo está listo
              </h1>
              <p className="mt-2.5 text-sm leading-6 text-[var(--color-muted)]">
                Verifica la opción elegida antes de crear tu espacio en
                FacturaBit.
              </p>
              <div className="mt-7 rounded-2xl border border-[var(--color-border)] bg-white p-5">
                <p className="text-[.68rem] font-bold uppercase tracking-[.12em] text-[var(--color-muted)]">
                  Opción seleccionada
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-[var(--color-brand)]">
                  {getPlanName(selectedPlan)}
                </p>
                <p className="mt-3 text-xs text-[var(--color-muted)]">
                  Cuenta para {details?.NombreRedComercial}
                </p>
              </div>
              <button
                className="btn-primary mt-5 w-full justify-center disabled:cursor-wait disabled:opacity-60"
                type="button"
                disabled={isSubmitting}
                onClick={finishRegistration}
              >
                {isSubmitting
                  ? "Creando tu espacio..."
                  : selectedPlan === "prueba"
                    ? "Activar prueba"
                    : "Crear cuenta"}
              </button>
              {submitError && (
                <p
                  className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-[var(--color-muted)]">
          © 2026 FacturaBit · Privacidad · Soporte
        </p>
      </section>

      <section className="login-art relative hidden overflow-hidden bg-[var(--color-brand)] lg:flex lg:items-end lg:justify-center">
        <div className="absolute -right-[8%] -top-[8%] size-[500px] rounded-full bg-[var(--color-mint)]/15 blur-[100px]" />
        <div className="absolute left-[12%] top-[11%] size-[470px] rounded-full border border-white/[.07]" />
        <div className="absolute left-[25%] top-[22%] size-[310px] rounded-full border border-white/[.06]" />

        <div className="absolute left-12 top-14 z-10 max-w-sm xl:left-16 xl:top-20">
          <p className="inline-flex items-center gap-2 text-[.66rem] font-bold uppercase tracking-[.14em] text-[var(--color-mint)]">
            <Sparkles size={14} /> Tu espacio comienza aquí
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.04em] text-white">
            Facturación clara desde el primer día.
          </h2>
          <div className="mt-6 space-y-3 text-xs text-[var(--color-brand-muted)]">
            <p className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-[var(--color-mint)]" />
              Configuración sencilla para tu empresa
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--color-mint)]" />
              Información protegida y acceso seguro
            </p>
          </div>
        </div>

        <img
          src={pepeGuide}
          alt="Pepe te da la bienvenida a FacturaBit"
          className="relative z-[1] max-h-[72%] w-auto max-w-[78%] object-contain object-bottom drop-shadow-[0_28px_40px_rgba(4,31,29,.4)]"
        />
      </section>
    </main>
  );
}
