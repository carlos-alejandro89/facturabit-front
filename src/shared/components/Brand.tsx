import { Link } from "react-router-dom";
import officialLogo from "../../assets/brand/facturabit-logo-official.png";
import inverseLogo from "../../assets/brand/facturabit-logo-inverse.png";

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
            ? "h-16 w-auto object-contain sm:h-20"
            : "h-11 w-auto object-contain sm:h-12"
        }
      />
    </Link>
  );
}
