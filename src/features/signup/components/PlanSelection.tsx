import { ArrowLeft, Check, Clock3, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  type SubscriptionPlanId,
  subscriptionPlans,
} from "../../../shared/models/subscriptionPlan";

interface PlanSelectionProps {
  onBack: () => void;
  onContinue: (plan: SubscriptionPlanId) => void;
}

export function PlanSelection({ onBack, onContinue }: PlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId | null>(
    null,
  );

  return (
    <div>
      <button
        type="button"
        className="mb-8 flex items-center gap-2 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-brand)]"
        onClick={onBack}
      >
        <ArrowLeft size={15} /> Volver a tus datos
      </button>
      <p className="eyebrow-light">Paso 2 de 2</p>
      <h1 className="mt-4 font-display text-[2.2rem] font-medium tracking-[-.045em] text-[var(--color-ink)]">
        Elige cómo comenzar
      </h1>
      <p className="mt-2.5 text-sm leading-6 text-[var(--color-muted)]">
        Selecciona un paquete de timbres o conoce FacturaBit gratis durante 7
        días.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {subscriptionPlans.map((plan) => {
          const selected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] shadow-[0_14px_30px_rgba(15,61,56,.18)]"
                  : "border-[var(--color-border)] bg-white hover:border-[var(--color-mint)]"
              }`}
            >
              {plan.recommended && (
                <span
                  className={`absolute right-3 top-3 text-[.56rem] font-extrabold uppercase tracking-[.12em] ${
                    selected
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-success)]"
                  }`}
                >
                  Recomendado
                </span>
              )}
              <span
                className={`text-xs font-bold ${
                  selected
                    ? "text-[var(--color-mint)]"
                    : "text-[var(--color-brand)]"
                }`}
              >
                {plan.name}
              </span>
              <span
                className={`mt-2 block font-display text-xl font-semibold ${
                  selected ? "text-white" : "text-[var(--color-ink)]"
                }`}
              >
                {plan.price}
              </span>
              <span
                className={`mt-1 block text-[.68rem] ${
                  selected
                    ? "text-[var(--color-brand-muted)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {plan.timbres}
              </span>
              {selected && (
                <span className="absolute bottom-3 right-3 grid size-5 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-brand-deep)]">
                  <Check size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setSelectedPlan("prueba")}
        className={`mt-3 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
          selectedPlan === "prueba"
            ? "border-[var(--color-brand)] bg-[var(--color-brand)] shadow-[0_14px_30px_rgba(15,61,56,.18)]"
            : "border-[var(--color-border)] bg-white hover:border-[var(--color-mint)]"
        }`}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
          <Clock3 size={19} />
        </span>
        <span className="flex-1">
          <strong
            className={`flex items-center gap-2 text-sm ${
              selectedPlan === "prueba"
                ? "text-white"
                : "text-[var(--color-brand)]"
            }`}
          >
            Prueba gratuita <Sparkles size={14} />
          </strong>
          <span
            className={`mt-1 block text-[.7rem] ${
              selectedPlan === "prueba"
                ? "text-[var(--color-brand-muted)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Explora la plataforma durante 7 días antes de elegir un paquete.
          </span>
        </span>
        {selectedPlan === "prueba" && (
          <span className="grid size-5 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-brand-deep)]">
            <Check size={12} />
          </span>
        )}
      </button>

      <button
        className="btn-primary mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-45"
        type="button"
        disabled={!selectedPlan}
        onClick={() => selectedPlan && onContinue(selectedPlan)}
      >
        {selectedPlan === "prueba"
          ? "Activar prueba de 7 días"
          : "Continuar con este plan"}
      </button>
    </div>
  );
}
