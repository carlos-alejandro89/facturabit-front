import {
  Bell,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Menu,
  ReceiptText,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "../components/Brand";

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
export function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-dashboard)] text-[var(--color-ink)]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-[var(--color-border)] bg-white px-5 py-7 lg:flex">
        <div className="px-3">
          <Brand />
        </div>
        <nav className="mt-12 space-y-2">
          <a className="sidebar-link active" href="#">
            <LayoutDashboard /> Resumen
          </a>
          <a className="sidebar-link" href="#">
            <ReceiptText /> Comprobantes
          </a>
          <a className="sidebar-link" href="#">
            <Users /> Entidades fiscales
          </a>
          <a className="sidebar-link" href="#">
            <Settings /> Configuración
          </a>
        </nav>
        <div className="mt-auto rounded-2xl bg-[var(--color-paper)] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Cuenta actual
          </p>
          <p className="mt-2 font-bold">Acme México, S.A.</p>
          <p className="text-sm text-[var(--color-muted)]">AAA010101AAA</p>
        </div>
        <Link className="sidebar-link mt-3" to="/">
          <LogOut /> Cerrar sesión
        </Link>
      </aside>
      <section className="lg:pl-72">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[var(--color-border)] bg-white/90 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button className="icon-button lg:hidden">
              <Menu />
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Panel de usuario
              </p>
              <h1 className="font-display text-xl font-bold">
                Buenos días, Carlos
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
            <div className="ml-2 grid size-10 place-items-center rounded-full bg-[var(--color-brand)] font-bold text-white">
              CA
            </div>
          </div>
        </header>
        <div className="p-5 sm:p-8 xl:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow-light">Resumen operativo</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-.035em] sm:text-3xl">
                Todo marcha en orden.
              </h2>
              <p className="mt-2 text-[var(--color-muted)]">
                Aquí tienes la actividad más reciente de tu cuenta.
              </p>
            </div>
            <button className="btn-primary btn-large">
              <FilePlus2 size={18} /> Emitir CFDI
            </button>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {stats.map(({ label, value, detail, icon: Icon }) => (
              <article className="stat-card" key={label}>
                <div className="flex items-start justify-between">
                  <span>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </span>
                  <i>
                    <Icon />
                  </i>
                </div>
                <p>{detail}</p>
              </article>
            ))}
          </div>
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
        </div>
      </section>
    </main>
  );
}
