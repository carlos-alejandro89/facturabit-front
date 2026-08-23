import {
  ArrowLeft,
  Braces,
  Eye,
  FileSignature,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import pepeLoginTablet from "../assets/brand/pepe-login-tablet.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/panel");
  };
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="flex min-h-screen flex-col bg-[#fbfcfb] px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <Brand />
        <div className="my-auto w-full max-w-[25.5rem] py-10">
          <Link
            className="mb-10 flex w-fit items-center gap-2 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-brand)]"
            to="/"
          >
            <ArrowLeft size={15} /> Volver al inicio
          </Link>
          <div>
            <p className="eyebrow-light">Acceso seguro</p>
            <h1 className="mt-4 font-display text-[2.35rem] font-medium tracking-[-.045em] text-[var(--color-ink)]">
              Bienvenido
            </h1>
            <p className="mt-2.5 text-sm leading-6 text-[var(--color-muted)]">
              Ingresa a tu cuenta para gestionar tu facturación.
            </p>
          </div>
          <form className="login-form mt-8 space-y-4" onSubmit={submit}>
            <label className="field-label">
              Correo electrónico
              <div className="field">
                <Mail size={16} strokeWidth={1.7} />
                <input type="email" placeholder="tu@empresa.com" required />
              </div>
            </label>
            <label className="field-label">
              Contraseña
              <div className="field">
                <LockKeyhole size={16} strokeWidth={1.7} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar contraseña"
                >
                  <Eye size={16} strokeWidth={1.7} />
                </button>
              </div>
            </label>
            <div className="flex flex-col gap-3 pt-1 text-xs sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  className="accent-[var(--color-brand)]"
                />{" "}
                Recordarme
              </label>
              <a href="#" className="font-semibold text-[var(--color-brand)]">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              className="btn-primary mt-2 w-full justify-center"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <p className="mt-7 text-center text-xs text-[var(--color-muted)]">
            ¿Aún no tienes cuenta?{" "}
            <a className="font-bold text-[var(--color-brand)]" href="#">
              Solicita acceso
            </a>
          </p>
        </div>
        <p className="text-xs text-[var(--color-muted)]">
          © 2026 FacturaBit · Privacidad · Soporte
        </p>
      </section>
      <section className="login-art relative hidden overflow-hidden bg-[var(--color-brand)] p-10 lg:flex lg:items-start xl:p-14">
        <div className="absolute -right-[10%] -top-[10%] size-[500px] rounded-full bg-[var(--color-mint)]/15 blur-[100px]" />
        <div className="absolute -left-[15%] bottom-[5%] size-[380px] rounded-full bg-[var(--color-accent)]/[.07] blur-[110px]" />
        <div className="absolute left-[15%] top-[9%] size-[520px] rounded-full border border-white/[.07]" />
        <div className="absolute left-[27%] top-[20%] size-[350px] rounded-full border border-white/[.06]" />
        <div className="absolute right-[12%] top-[12%] grid grid-cols-3 gap-2 opacity-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <i key={index} className="size-1.5 rounded-full bg-white" />
          ))}
        </div>
        <div
          className="absolute left-[9%] top-[28%] grid size-12 -rotate-6 place-items-center rounded-xl border border-white/[.07] bg-white/[.025] text-white/[.1]"
          aria-hidden="true"
        >
          <FileSignature size={23} strokeWidth={1.25} />
        </div>
        <div
          className="absolute bottom-[29%] left-[18%] grid size-10 rotate-6 place-items-center rounded-lg border border-white/[.06] bg-white/[.02] text-white/[.08]"
          aria-hidden="true"
        >
          <Braces size={19} strokeWidth={1.25} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-deep)]/65 via-transparent to-transparent" />

        <div className="absolute bottom-0 right-[3%] flex h-[84%] w-[68%] items-end justify-end xl:h-[88%] xl:w-[70%]">
          <img
            src={pepeLoginTablet}
            alt="Pepe, asistente de FacturaBit"
            className="max-h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_28px_40px_rgba(4,31,29,.45)]"
          />
        </div>

        <div className="absolute inset-x-10 bottom-7 z-10 rounded-[1.1rem] border border-white/15 bg-[var(--color-brand-deep)]/42 px-7 py-4 text-center text-white shadow-[0_18px_50px_rgba(4,31,29,.22)] backdrop-blur-xl xl:inset-x-14 xl:bottom-9 xl:px-9 xl:py-5">
          <p className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[.08] px-3 py-1 text-[.62rem] font-bold uppercase tracking-[.13em] text-[var(--color-mint)]">
            <ShieldCheck size={13} /> Pepe te acompaña
          </p>
          <h2 className="mt-2.5 font-display text-[1.3rem] font-semibold leading-tight tracking-[-.035em]">
            ¡Qué gusto verte de nuevo!
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-[.7rem] leading-5 text-[var(--color-brand-muted)]">
            Todo está listo para continuar donde lo dejaste.
          </p>
        </div>
      </section>
    </main>
  );
}
