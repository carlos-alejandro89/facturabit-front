import {
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  FilePlus2,
  LayoutDashboard,
  KeyRound,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import officialIsotype from "../../../assets/brand/facturabit-app-icon-v2.png";
import pepeDashboardWelcome from "../../../assets/brand/pepe-dashboard-official.png";
import { Brand } from "../../../shared/components/Brand";
import { DashboardSummarySkeleton } from "../../../shared/components/Skeleton";
import { useInitialLoading } from "../../../shared/hooks/useInitialLoading";
import { EmittersPage } from "../../emitters/pages/EmittersPage";
import { DocumentsPage } from "../../documents/pages/DocumentsPage";
import { ApiIntegrationsPage } from "../../integrations/pages/ApiIntegrationsPage";
import { clearSession, getSession } from "../../auth/services/authService";
import { createLogoutSoundDataUri } from "../../auth/utils/errorSound";
import {
  PaymentCardForm,
  type SavedPaymentCard,
} from "../components/PaymentCardForm";

interface DashboardLocationState {
  registration?: {
    fullName: string;
    businessName: string;
    planName?: string;
    planPrice?: string;
    planId?: string;
    requiresPayment: boolean;
  };
  purchase?: {
    planName: string;
    planPrice?: string;
    planId?: string;
    requiresPayment: boolean;
    savedCards?: SavedPaymentCard[];
  };
}

const stats = [
  {
    label: "CFDI emitidos",
    value: "1,284",
    detail: "+12.5% este mes",
    icon: ReceiptText,
  },
  {
    label: "Timbres disponibles",
    value: "846",
    detail: "Plan prepago",
    icon: CircleDollarSign,
  },
  {
    label: "Entidades fiscales",
    value: "3",
    detail: "Todas activas",
    icon: Users,
  },
];
const logoutSound = createLogoutSoundDataUri();

export function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getSession();
  const [playLogout] = useSound(logoutSound, { volume: 0.12 });
  const registration = (location.state as DashboardLocationState | null)
    ?.registration;
  const purchase = (location.state as DashboardLocationState | null)?.purchase;
  const paymentRequest = registration?.requiresPayment
    ? registration
    : purchase?.requiresPayment
      ? purchase
      : undefined;
  const [showPayment, setShowPayment] = useState(Boolean(paymentRequest));
  const [planActivated, setPlanActivated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<"summary" | "documents" | "emitters" | "integrations">("summary");
  const isSummaryLoading = useInitialLoading();
  const firstName = session?.fullName.trim().split(/\s+/)[0] || registration?.fullName.trim().split(/\s+/)[0] || "Usuario";
  const initials = session?.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "FB";

  const logout = () => {
    clearSession();
    playLogout();
    window.setTimeout(() => navigate("/login", { replace: true }), 180);
  };

  const completePayment = () => {
    setShowPayment(false);
    setPlanActivated(true);
  };

  return (
    <main className={`dashboard-shell min-h-screen bg-[var(--color-dashboard)] text-[var(--color-ink)] ${sidebarCollapsed ? "dashboard-sidebar-collapsed" : ""}`}>
      {mobileMenuOpen && (
        <button
          className="fixed inset-0 z-20 bg-[var(--color-brand-deep)]/35 backdrop-blur-sm lg:hidden"
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-[var(--color-border)] bg-white py-5 transition-[width,transform] duration-300 ${sidebarCollapsed ? "w-[4.75rem] px-3" : "w-[15rem] px-4"} ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className={`flex h-10 items-center ${sidebarCollapsed ? "justify-center" : "px-1"}`}>
          {sidebarCollapsed ? (
            <img
              src={officialIsotype}
              alt="FacturaBit"
              className="size-9 rounded-[.7rem] object-contain"
            />
          ) : (
            <Brand />
          )}
        </div>
        <nav className="mt-9 space-y-1.5">
          <button type="button" onClick={() => { setActiveView("summary"); setShowPayment(false); setMobileMenuOpen(false); }} className={`sidebar-link w-full ${activeView === "summary" && !showPayment ? "active" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`} title="Resumen">
            <LayoutDashboard /> {!sidebarCollapsed && <span>Resumen</span>}
          </button>
          <button type="button" onClick={() => { setActiveView("documents"); setShowPayment(false); setMobileMenuOpen(false); }} className={`sidebar-link w-full ${activeView === "documents" ? "active" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`} title="Comprobantes">
            <ReceiptText /> {!sidebarCollapsed && <span>Comprobantes</span>}
          </button>
          <button type="button" onClick={() => { setActiveView("emitters"); setShowPayment(false); setMobileMenuOpen(false); }} className={`sidebar-link w-full ${activeView === "emitters" ? "active" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`} title="Emisores">
            <Users /> {!sidebarCollapsed && <span>Emisores</span>}
          </button>
          <button type="button" onClick={() => { setActiveView("integrations"); setShowPayment(false); setMobileMenuOpen(false); }} className={`sidebar-link w-full ${activeView === "integrations" ? "active" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`} title="Integraciones API">
            <KeyRound /> {!sidebarCollapsed && <span>Integraciones API</span>}
          </button>
        </nav>
        {!sidebarCollapsed && <div className="organization-gold-card mt-auto rounded-xl p-3.5">
          <p className="text-[.58rem] font-bold uppercase tracking-[.12em] text-[var(--color-brand-deep)]/70">
            Organización
          </p>
          <p className="mt-2 text-xs font-bold text-[var(--color-brand-deep)]">
            {session?.redComercial.nombreRedComercial || registration?.businessName || "FacturaBit"}
          </p>
          <p className="mt-1 text-[.65rem] font-semibold text-[var(--color-brand-deep)]/75">
            {registration?.planName || session?.rol || "Cuenta activa"}
          </p>
        </div>}
        <button className={`sidebar-link logout-button w-full ${sidebarCollapsed ? "mt-auto justify-center px-0" : "mt-3"}`} type="button" onClick={logout} title="Cerrar sesión">
          <LogOut /> {!sidebarCollapsed && <span>Cerrar sesión</span>}
        </button>
      </aside>
      <section className={`transition-[padding] duration-300 ${sidebarCollapsed ? "lg:pl-[4.75rem]" : "lg:pl-[15rem]"}`}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-white/85 px-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <button className="icon-button lg:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Abrir menú">
              <Menu />
            </button>
            <button className="icon-button hidden lg:grid" onClick={() => setSidebarCollapsed((current) => !current)} aria-label={sidebarCollapsed ? "Expandir menú" : "Contraer menú"}>
              {sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </button>
            <div>
              <p className="text-[.58rem] font-semibold uppercase tracking-[.12em] text-[var(--color-muted)]">
                Panel de usuario
              </p>
              <h1 className="font-display text-base font-semibold tracking-[-.02em]">
                Buenos días, {firstName}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-button">
              <Search />
            </button>
            <button className="icon-button relative">
              <Bell />
              <i className="absolute right-2 top-2 size-2 rounded-full bg-[var(--color-accent)]" />
            </button>
            <div className="ml-1 grid size-9 place-items-center rounded-full bg-[var(--color-brand)] text-[.68rem] font-semibold text-white">
              {initials}
            </div>
          </div>
        </header>
        <div className="p-5 sm:p-7 xl:p-8">
          {showPayment && paymentRequest?.planName ? (
            <PaymentCardForm
              planName={paymentRequest.planName}
              planPrice={paymentRequest.planPrice}
              planDetail={paymentRequest.planId ? `Paquete ${paymentRequest.planId.toUpperCase()}` : undefined}
              savedCards={"savedCards" in paymentRequest ? paymentRequest.savedCards : undefined}
              onCancel={() => setShowPayment(false)}
              onComplete={completePayment}
            />
          ) : activeView === "documents" ? (
            <DocumentsPage />
          ) : activeView === "emitters" ? (
            <EmittersPage />
          ) : activeView === "integrations" ? (
            <ApiIntegrationsPage />
          ) : (
          isSummaryLoading ? (
            <DashboardSummarySkeleton />
          ) : <>
          {planActivated && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[var(--color-mint)]/40 bg-[var(--color-success-soft)] px-5 py-4 text-sm text-[var(--color-brand)]">
              <CheckCircle2 size={19} className="text-[var(--color-success)]" />
              <span>
                <strong>{paymentRequest?.planName}</strong> fue activado
                correctamente.
              </span>
            </div>
          )}
          <section className="relative isolate overflow-hidden rounded-[1.65rem] bg-[var(--color-brand)] px-6 pb-6 pt-7 text-white shadow-[0_20px_50px_rgba(9,74,66,.16)] sm:px-8 sm:pb-7 lg:min-h-[19rem] lg:px-10 lg:pt-9">
            <div className="pointer-events-none absolute -right-24 -top-44 size-[28rem] rounded-full border border-white/[.07]" />
            <div className="pointer-events-none absolute -right-10 -top-16 size-[20rem] rounded-full border border-white/[.06]" />
            <div className="absolute inset-y-0 right-0 hidden w-[36%] bg-gradient-to-l from-[var(--color-brand-deep)]/35 to-transparent lg:block" />

            <div className="relative z-10 max-w-[68%] max-lg:max-w-full">
              <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--color-mint)]">
                  Resumen operativo
                </p>
                <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-display text-[1.75rem] font-medium tracking-[-.04em] text-white sm:text-[2rem]">
                    Todo marcha en orden, {firstName}.
                  </h2>
                  <button
                    className="group relative inline-flex h-10 shrink-0 items-center gap-2.5 overflow-hidden rounded-xl bg-[var(--color-accent)] px-4 text-[.7rem] font-bold text-[var(--color-brand-deep)] shadow-[0_9px_22px_rgba(255,183,45,.2)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_13px_28px_rgba(255,183,45,.34)] active:translate-y-0"
                    type="button"
                  >
                    <span className="absolute inset-y-0 -left-10 w-7 -skew-x-12 bg-white/35 transition-all duration-500 ease-out group-hover:left-[115%]" />
                    <FilePlus2 className="relative transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" size={17} strokeWidth={1.8} />
                    <span className="relative">Nuevo CFDI</span>
                    <ChevronRight className="relative transition-transform duration-300 group-hover:translate-x-1" size={15} strokeWidth={1.9} />
                  </button>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--color-brand-muted)] sm:text-sm">
                  Tu operación fiscal, clara y disponible desde un solo lugar.
                </p>
              </div>

              <div className="mt-7 grid border-t border-white/10 pt-5 sm:grid-cols-3 sm:border-t-0 sm:pt-0 lg:mt-8">
                {stats.map(({ label, value, detail, icon: Icon }, index) => (
                  <article className={`flex items-center gap-3 py-3 sm:block sm:px-5 sm:py-0 sm:text-center ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : "sm:pl-0"}`} key={label}>
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-[var(--color-mint)] sm:mx-auto sm:mb-3">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-[.72rem] font-medium text-[var(--color-brand-muted)]">{label}</p>
                      <strong className="mt-1 block font-display text-[1.45rem] font-semibold tracking-[-.035em] text-white">{value}</strong>
                      <small className="mt-1 block text-[.62rem] font-medium text-[var(--color-mint)]">{detail}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <img
              src={pepeDashboardWelcome}
              alt="Pepe te da la bienvenida al panel de FacturaBit"
              className="pointer-events-none absolute -bottom-[20%] right-[.5%] z-[2] hidden h-[122%] w-auto max-w-[38%] object-contain object-bottom drop-shadow-[0_18px_28px_rgba(2,29,26,.28)] lg:block xl:right-[2.5%]"
            />
          </section>
          <div className="mt-7 grid gap-7 xl:grid-cols-[1.6fr_1fr]">
            <section className="dashboard-card">
              <div className="card-header">
                <div>
                  <h3>Comprobantes recientes</h3>
                  <p>Últimos movimientos de facturación</p>
                </div>
                <button>
                  Ver todos <ChevronRight size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Folio</th>
                      <th>Receptor</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>A-1048</b>
                      </td>
                      <td>Comercial del Centro</td>
                      <td>22 ago 2026</td>
                      <td>$18,560.00</td>
                      <td>
                        <span className="badge-success">Vigente</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>A-1047</b>
                      </td>
                      <td>Servicios Delta</td>
                      <td>21 ago 2026</td>
                      <td>$7,420.50</td>
                      <td>
                        <span className="badge-success">Vigente</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>A-1046</b>
                      </td>
                      <td>Grupo Horizonte</td>
                      <td>20 ago 2026</td>
                      <td>$32,190.00</td>
                      <td>
                        <span className="badge-muted">Cancelado</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className="dashboard-card">
              <div className="card-header">
                <div>
                  <h3>Acciones rápidas</h3>
                  <p>Lo más usado por tu equipo</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  [FilePlus2, "Emitir un CFDI", "Crea una nueva factura"],
                  [FileCheck2, "Consultar folio", "Revisa su estado fiscal"],
                  [Users, "Cambiar entidad", "Administra otro RFC"],
                ].map(([Icon, title, text]) => {
                  const ActionIcon = Icon as typeof FilePlus2;
                  return (
                    <button className="quick-action" key={title as string}>
                      <span>
                        <ActionIcon />
                      </span>
                      <div>
                        <b>{title as string}</b>
                        <small>{text as string}</small>
                      </div>
                      <ChevronRight />
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
          </>
          )}
        </div>
      </section>
    </main>
  );
}
