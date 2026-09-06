import { Link } from "react-router-dom";
import officialLogo from "../../assets/brand/facturabit-logo-primary-v2.png";
import inverseLogo from "../../assets/brand/facturabit-logo-inverse-v2.png";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center"
      aria-label="FacturaBit, inicio"
    >
      <img
        src={inverse ? inverseLogo : officialLogo}
        alt="FacturaBit · Factura. Gestiona. Crece."
        className={
          inverse
            ? "h-14 w-auto object-contain sm:h-16"
            : "h-10 w-auto object-contain mix-blend-multiply sm:h-11"
        }
      />
    </Link>
  );
}
