import { ArrowLeft, Check, CreditCard, LockKeyhole, Plus, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PanelPageHeader } from "../../../shared/components/PanelPageHeader";

export interface SavedPaymentCard {
  id: string;
  brand: "Visa" | "Mastercard";
  lastFour: string;
  expiry: string;
  holder: string;
}

interface PaymentCardFormProps {
  planName: string;
  planPrice?: string;
  planDetail?: string;
  savedCards?: SavedPaymentCard[];
  onComplete: () => void;
  onCancel: () => void;
}

export function PaymentCardForm({ planName, planPrice, planDetail, savedCards = [], onComplete, onCancel }: PaymentCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(savedCards[0]?.id);
  const [addingCard, setAddingCard] = useState(savedCards.length === 0);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onComplete();
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  return (
    <div className="mx-auto w-full max-w-[82rem]">
      <PanelPageHeader
        eyebrow="Suscripción FacturaBit"
        title="Completa tu suscripción"
        description="Revisa tu paquete y elige cómo deseas realizar el pago."
        onBack={onCancel}
        backLabel="Volver al panel"
      />

      <form className="mt-5 pb-24" onSubmit={submit}>
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,.7fr)]">
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_6px_20px_rgba(20,59,53,.025)] sm:p-6">
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-5">
            <span className="grid size-10 place-items-center rounded-lg bg-[var(--color-success-soft)]/70 text-[var(--color-brand)]"><CreditCard size={18} /></span>
            <div>
              <h3 className="font-display text-base font-semibold text-[var(--color-brand)]">Método de pago</h3>
              <p className="mt-1 text-xs text-[var(--color-muted)]">Tus datos se transmiten mediante una conexión segura.</p>
            </div>
          </div>

          {savedCards.length > 0 && !addingCard ? (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[var(--color-muted)]">Tus tarjetas</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {savedCards.map((card) => {
                  const selected = selectedCardId === card.id;
                  return (
                    <button type="button" key={card.id} onClick={() => setSelectedCardId(card.id)} className={`relative rounded-xl border p-4 text-left transition ${selected ? "border-[var(--color-brand)]/70 bg-[var(--color-success-soft)]/55 shadow-[0_5px_16px_rgba(15,61,56,.05)]" : "border-[var(--color-border)] hover:border-[var(--color-mint)]"}`}>
                      <div className="flex items-start justify-between">
                        <span className="grid size-9 place-items-center rounded-lg bg-white text-[var(--color-brand)] shadow-sm"><CreditCard size={17} /></span>
                        {selected && <span className="grid size-5 place-items-center rounded-full bg-[var(--color-brand)] text-white"><Check size={12} /></span>}
                      </div>
                      <p className="mt-5 font-display text-sm font-semibold text-[var(--color-ink)]">{card.brand} •••• {card.lastFour}</p>
                      <p className="mt-1 text-[.68rem] text-[var(--color-muted)]">{card.holder} · Vence {card.expiry}</p>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand)]" onClick={() => setAddingCard(true)}><Plus size={15} /> Agregar otra tarjeta</button>
            </div>
          ) : (
            <div className="login-form mt-6 space-y-4">
              {savedCards.length > 0 && <button type="button" className="mb-2 flex items-center gap-2 text-xs font-bold text-[var(--color-brand)]" onClick={() => setAddingCard(false)}><ArrowLeft size={14} /> Usar una tarjeta guardada</button>}
              <label className="field-label">Nombre del titular<div className="field"><input name="cardholder" placeholder="Como aparece en la tarjeta" autoComplete="cc-name" maxLength={100} required={addingCard} /></div></label>
              <label className="field-label">Número de tarjeta<div className="field"><CreditCard size={16} strokeWidth={1.7} /><input name="cardNumber" value={cardNumber} onChange={(event) => formatCardNumber(event.target.value)} placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" minLength={19} required={addingCard} /></div></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="field-label">Vencimiento<div className="field"><input name="expiry" placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" pattern="(0[1-9]|1[0-2])/[0-9]{2}" maxLength={5} required={addingCard} /></div></label>
                <label className="field-label">CVV<div className="field"><LockKeyhole size={15} strokeWidth={1.7} /><input name="cvv" type="password" placeholder="•••" inputMode="numeric" autoComplete="cc-csc" pattern="[0-9]{3,4}" maxLength={4} required={addingCard} /></div></label>
              </div>
              <label className="flex items-start gap-2 pt-1 text-xs leading-5 text-[var(--color-muted)]"><input type="checkbox" defaultChecked className="mt-1 accent-[var(--color-brand)]" />Guardar esta tarjeta para compras futuras.</label>
            </div>
          )}
        </section>

        <aside className="overflow-hidden rounded-2xl bg-[var(--color-brand)] text-white shadow-[0_14px_36px_rgba(8,49,45,.14)] xl:sticky xl:top-24">
          <div className="p-6 sm:p-7">
            <p className="text-[.6rem] font-semibold uppercase tracking-[.14em] text-[var(--color-mint)]">Resumen de compra</p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-[-.035em] text-white">{planName}</h3>
            {planDetail && <p className="mt-2 text-xs text-[var(--color-brand-muted)]">{planDetail}</p>}
            <div className="my-5 h-px bg-white/10" />
            <div className="space-y-3 text-xs text-[var(--color-brand-muted)]">
              <p className="flex justify-between gap-4"><span>Paquete</span><strong className="text-right font-semibold text-white">{planName}</strong></p>
              <p className="flex justify-between gap-4"><span>Moneda</span><strong className="font-semibold text-white">MXN</strong></p>
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
              <span className="text-sm font-semibold">Total</span>
              <div className="text-right"><strong className="font-display text-[1.7rem] font-semibold text-[var(--color-accent)]">{planPrice ?? "$0"}</strong><small className="ml-1 text-[.62rem] text-[var(--color-brand-muted)]">MXN</small></div>
            </div>
          </div>
          <div className="border-t border-white/5 bg-[var(--color-brand-deep)]/45 px-6 py-5 sm:px-7">
            <p className="flex items-start gap-2 text-[.66rem] leading-5 text-[var(--color-brand-muted)]"><ShieldCheck className="mt-0.5 shrink-0 text-[var(--color-mint)]" size={14} />Flujo simulado: los datos ingresados todavía no se procesan ni se almacenan.</p>
          </div>
        </aside>
        </div>
        <div className="dashboard-action-bar flex items-center justify-between gap-4 border-t border-[var(--color-border)] bg-white/95 px-5 py-3 backdrop-blur-xl sm:px-7">
          <button type="button" onClick={onCancel} className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)]"><ArrowLeft size={15} /> Regresar</button>
          <button className="btn-primary min-w-52 justify-center" type="submit">{addingCard ? "Guardar tarjeta y pagar" : "Pagar con esta tarjeta"}</button>
        </div>
      </form>
    </div>
  );
}
