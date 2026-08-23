import { BadgeCheck, CircleCheck, ReceiptText } from "lucide-react";

export function InvoiceVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px] py-5 lg:py-10"
      aria-label="Vista previa de una factura digital"
    >
      <div className="absolute inset-8 rounded-full bg-[var(--color-mint)]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white p-3 shadow-[var(--shadow-hero)] sm:p-4">
        <div className="flex items-center justify-between rounded-t-[1.4rem] bg-[var(--color-mint)] px-5 py-3">
          <div className="window-dots flex gap-2">
            <i />
            <i />
            <i />
          </div>
          <span className="text-xs font-bold text-[var(--color-brand-deep)]">
            Factura #FB-2026-0482
          </span>
        </div>
        <div className="grid min-h-[330px] grid-cols-[1fr_1.6fr] gap-5 rounded-b-[1.4rem] bg-[var(--color-paper)] p-5 sm:p-7">
          <div className="space-y-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-[var(--color-brand)] text-white">
              <ReceiptText />
            </div>
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-2.5 w-20" />
            <div className="skeleton h-2.5 w-16" />
            <div className="mt-8 rounded-xl bg-white p-3 shadow-sm">
              <div className="skeleton h-2 w-full" />
              <div className="skeleton mt-2 h-2 w-3/4" />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-24" />
              <span className="rounded-full bg-[var(--color-success-soft)] px-3 py-1 text-[10px] font-bold text-[var(--color-success)]">
                TIMBRADA
              </span>
            </div>
            <div className="mt-7 space-y-4">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-11/12" />
              <div className="skeleton h-3 w-full" />
            </div>
            <div className="my-6 border-t border-dashed border-[var(--color-border)]" />
            <div className="ml-auto grid w-3/5 grid-cols-2 gap-3">
              <div className="skeleton h-3" />
              <div className="skeleton h-3" />
              <div className="skeleton h-3" />
              <div className="h-3 rounded-full bg-[var(--color-accent)]/75" />
            </div>
            <div className="mt-7 flex items-center gap-2 rounded-xl bg-[var(--color-success-soft)] p-3 text-xs font-semibold text-[var(--color-success)]">
              <CircleCheck size={17} /> Validación SAT completada
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-1 top-0 flex items-center gap-2 rounded-full border border-white/15 bg-[var(--color-brand-soft)] px-4 py-2 text-xs font-bold text-[var(--color-accent)] shadow-lg sm:right-3">
        <BadgeCheck size={16} /> CFDI 4.0 listo
      </div>
    </div>
  );
}
