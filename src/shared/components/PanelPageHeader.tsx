import { ArrowLeft } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PanelHeaderIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function PanelHeaderIconButton({ label, className = "", children, ...props }: PanelHeaderIconButtonProps) {
  return (
    <button
      type="button"
      className={`grid size-9 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-muted)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-brand-deep)] focus-visible:border-[var(--color-accent)] focus-visible:bg-[var(--color-accent)] focus-visible:text-[var(--color-brand-deep)] ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}

export function PanelHeaderButton({ label, className = "", children, ...props }: PanelHeaderIconButtonProps) {
  return (
    <button
      type="button"
      className={`group inline-flex h-9 max-w-9 shrink-0 items-center justify-start gap-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white px-[.6rem] text-[.7rem] font-medium whitespace-nowrap text-[var(--color-brand)] transition-[max-width,gap,padding,border-color,background-color,color] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] hover:max-w-48 hover:gap-2 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:pr-3.5 hover:text-[var(--color-brand-deep)] focus-visible:max-w-48 focus-visible:gap-2 focus-visible:border-[var(--color-accent)] focus-visible:bg-[var(--color-accent)] focus-visible:pr-3.5 focus-visible:text-[var(--color-brand-deep)] [&>svg]:shrink-0 ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
      <span className="max-w-0 translate-x-1.5 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:max-w-36 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-36 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        {label}
      </span>
    </button>
  );
}

interface PanelPageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  action?: ReactNode;
}

export function PanelPageHeader({
  eyebrow,
  title,
  description,
  onBack,
  backLabel = "Regresar",
  action,
}: PanelPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {onBack && (
          <PanelHeaderIconButton
            onClick={onBack}
            label={backLabel}
          >
            <ArrowLeft size={16} strokeWidth={1.7} />
          </PanelHeaderIconButton>
        )}
        <div className="min-w-0">
          <p className="eyebrow-light">{eyebrow}</p>
          <h2 className="mt-1.5 font-display text-2xl font-medium tracking-[-.035em] text-[var(--color-ink)]">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-3xl text-xs leading-5 text-[var(--color-muted)]">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex shrink-0 items-center gap-2 sm:self-center">{action}</div>}
    </header>
  );
}
