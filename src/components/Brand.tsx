import { FileCheck2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3"
      aria-label="FacturaBit, inicio"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-accent)] text-[var(--color-brand)] shadow-[var(--shadow-accent)]">
        <FileCheck2 size={21} strokeWidth={2.4} />
      </span>
      <span
        className={`font-display text-xl font-extrabold tracking-[-0.03em] ${inverse ? "text-white" : "text-[var(--color-brand)]"}`}
      >
        Factura<span className="text-[var(--color-accent)]">Bit</span>
      </span>
    </Link>
  );
}
