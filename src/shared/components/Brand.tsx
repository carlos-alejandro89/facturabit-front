import { Link } from "react-router-dom";
import officialLogo from "../../assets/brand/cart-logo-primary.png";
import footerLogo from "../../assets/brand/cart-logo-footer.png";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center"
      aria-label="Carti, inicio"
    >
      <img
        src={inverse ? footerLogo : officialLogo}
        alt="Carti · Tu facturación, más simple."
        className={inverse ? "h-10 w-auto object-contain sm:h-11" : "h-9 w-auto object-contain sm:h-10"}
      />
    </Link>
  );
}
