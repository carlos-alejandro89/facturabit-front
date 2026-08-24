import { CreditCard, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { type FormEvent, useState } from "react";

interface PaymentCardFormProps {
  planName: string;
  planPrice?: string;
  onComplete: () => void;
  onClose: () => void;
}

export function PaymentCardForm({
  planName,
  planPrice,
  onComplete,
  onClose,
}: PaymentCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onComplete();
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[var(--color-brand-deep)]/55 px-4 py-8 backdrop-blur-sm">
      <section
        className="w-full max-w-[31rem] rounded-[1.6rem] border border-white/60 bg-white p-6 shadow-[0_28px_90px_rgba(4,31,29,.3)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
      >
        <div className="flex items-start justify-between gap-5">
          <span className="grid size-11 place-items-center rounded-xl bg-[var(--color-success-soft)] text-[var(--color-brand)]">
            <CreditCard size={21} />
          </span>
          <button
            type="button"
            className="icon-button !size-9"
            onClick={onClose}
            aria-label="Cerrar formulario de pago"
          >
            <X size={16} />
          </button>
        </div>

        <p className="eyebrow-light mt-6">Activa tu paquete</p>
        <h2
          id="payment-title"
          className="mt-3 font-display text-2xl font-semibold tracking-[-.04em] text-[var(--color-ink)]"
        >
          Agrega un método de pago
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Completa los datos para activar <strong>{planName}</strong>
          {planPrice ? ` por ${planPrice} MXN.` : "."}
        </p>

        <form className="login-form mt-7 space-y-4" onSubmit={submit}>
          <label className="field-label">
            Nombre del titular
            <div className="field">
              <input
                name="cardholder"
                placeholder="Como aparece en la tarjeta"
                autoComplete="cc-name"
                maxLength={100}
                required
              />
            </div>
          </label>
          <label className="field-label">
            Número de tarjeta
            <div className="field">
              <CreditCard size={16} strokeWidth={1.7} />
              <input
                name="cardNumber"
                value={cardNumber}
                onChange={(event) => formatCardNumber(event.target.value)}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                minLength={19}
                required
              />
            </div>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="field-label">
              Vencimiento
              <div className="field">
                <input
                  name="expiry"
                  placeholder="MM/AA"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                  maxLength={5}
                  required
                />
              </div>
            </label>
            <label className="field-label">
              CVV
              <div className="field">
                <LockKeyhole size={15} strokeWidth={1.7} />
                <input
                  name="cvv"
                  type="password"
                  placeholder="•••"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                  required
                />
              </div>
            </label>
          </div>

          <p className="flex items-start gap-2 rounded-xl bg-[var(--color-paper)] px-4 py-3 text-[.68rem] leading-5 text-[var(--color-muted)]">
            <ShieldCheck
              className="mt-0.5 shrink-0 text-[var(--color-success)]"
              size={15}
            />
            Flujo simulado: los datos ingresados no se procesan ni se almacenan.
          </p>
          <button className="btn-primary w-full justify-center" type="submit">
            Guardar tarjeta y activar plan
          </button>
        </form>
      </section>
    </div>
  );
}
