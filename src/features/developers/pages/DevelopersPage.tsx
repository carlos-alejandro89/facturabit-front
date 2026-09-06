import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Code2,
  KeyRound,
  ListTree,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "../../../shared/components/Brand";
import { CodeBlock } from "../components/CodeBlock";

export const tokenRequestExample = `curl --request POST 'https://TU_HOST/oauth/token' \\
  --user 'fb_live_TU_CLIENT_ID:fb_secret_TU_CLIENT_SECRET' \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --data-urlencode 'grant_type=client_credentials' \\
  --data-urlencode 'scope=cfdi.emit cfdi.status'`;

export const tokenResponseExample = `{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "cfdi.emit cfdi.status"
}`;

export const invoiceRequestExample = `curl --request POST \\
  'https://TU_HOST/api/facturacion/emitir-cfdi?esGlobal=false' \\
  --header 'Authorization: Bearer TU_ACCESS_TOKEN' \\
  --header 'Content-Type: application/json' \\
  --data @factura.json`;

export const requestExample = `{
  "serie": "A",
  "folioInterno": "1049",
  "fecha": "2026-08-24T10:30:00Z",
  "cveMetodoPago": "PUE",
  "metodoPago": "Pago en una sola exhibición",
  "cveFormaPago": "03",
  "formaPago": "Transferencia electrónica de fondos",
  "subTotal": 1000.00,
  "descuentos": 0.00,
  "impuestos": 160.00,
  "total": 1160.00,
  "rfcEmisor": "AAA010101AAA",
  "emisor": "EMPRESA DEMO SA DE CV",
  "cveRegimenEmisor": "601",
  "regimenEmisor": "General de Ley Personas Morales",
  "lugarExpedicion": "64000",
  "rfcReceptor": "XAXX010101000",
  "receptor": "PUBLICO EN GENERAL",
  "cveRegimenReceptor": "616",
  "regimenReceptor": "Sin obligaciones fiscales",
  "domicilioFiscalReceptor": "64000",
  "cveUsoCFDI": "S01",
  "usoCFDI": "Sin efectos fiscales",
  "conceptos": [
    {
      "claveProdServ": "81112100",
      "noIdentificacion": "SERV-001",
      "descripcion": "Servicio de desarrollo de software",
      "cantidad": 1,
      "claveUnidad": "E48",
      "unidad": "Unidad de servicio",
      "valorUnitario": 1000.00,
      "importe": 1000.00,
      "objetoImp": "02",
      "descuento": 0.00,
      "impuestos": [
        {
          "importeImpuesto": 160.00,
          "baseImpuesto": 1000.00,
          "impuesto": "002",
          "tasaOCuota": "0.160000"
        }
      ]
    }
  ]
}`;

export const responseExample = `{
  "success": true,
  "mensaje": "CFDI timbrado correctamente.",
  "httpCode": 200,
  "data": {
    "uuid": "00000000-0000-0000-0000-000000000000",
    "fechaTimbrado": "2026-08-24T10:30:05",
    "noCertificadoSat": "00001000000500000000",
    "noCertificadoEmisor": "00001000000500000001",
    "selloSat": "...",
    "selloEmisor": "...",
    "cadenaOriginalSat": "...",
    "cfdiXmlBase64": "..."
  }
}`;

export const fields = [
  ["serie", "string?", "Serie del comprobante. Es opcional."],
  ["folioInterno", "string", "Identificador interno de la factura."],
  ["fecha", "date-time", "Fecha de emisión del comprobante."],
  ["cveMetodoPago", "string", "Clave SAT del método de pago: PUE o PPD."],
  ["cveFormaPago", "string", "Clave SAT de la forma de pago."],
  ["subTotal", "number", "Suma de importes antes de descuentos e impuestos."],
  ["descuentos", "number", "Total de descuentos; envía 0 cuando no aplique."],
  ["impuestos", "number", "Total de impuestos trasladados."],
  ["total", "number", "Total final del CFDI."],
  ["rfcEmisor", "string", "RFC de la entidad fiscal que realiza la emisión."],
  ["rfcReceptor", "string", "RFC del receptor del comprobante."],
  ["conceptos", "array", "Uno o más conceptos con sus impuestos."],
];

export function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md">
        <div className="container-shell flex h-16 items-center justify-between">
          <div className="[&_img]:!h-9">
            <Brand />
          </div>
          <p className="hidden text-xs font-semibold text-[var(--color-muted)] md:block">
            API · Documentación para desarrolladores
          </p>
          <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-[var(--color-brand)] transition hover:bg-[var(--color-paper)]" to="/">
            <ArrowLeft size={15} /> Volver al sitio
          </Link>
        </div>
      </header>

      <section id="inicio" className="border-b border-white/10 bg-[var(--color-brand)] py-11 text-white">
        <div className="container-shell grid items-center gap-9 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-[.62rem] font-extrabold uppercase tracking-[.15em] text-[var(--color-mint)]">
              <Code2 size={14} /> FacturaBit API
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.15rem,4vw,3.45rem)] font-semibold leading-[1.04] tracking-[-.05em]">
              Documentación de integración
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-brand-muted)]">
              Autentica tu aplicación y conecta la emisión de CFDI con tu ERP,
              punto de venta o plataforma mediante una API JSON segura.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn-primary" href="#autenticacion">
                Comenzar integración <ArrowRight size={16} />
              </a>
              <a className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-xs font-bold text-white transition hover:border-white/40 hover:bg-white/[.06]" href="#emitir">
                Ver endpoint
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b2926]/75 shadow-[0_18px_50px_rgba(3,27,25,.18)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="size-2 rounded-full bg-[#ff7d86]" />
              <span className="size-2 rounded-full bg-[var(--color-accent)]" />
              <span className="size-2 rounded-full bg-[var(--color-mint)]" />
              <span className="ml-2 text-[.58rem] font-bold uppercase tracking-[.13em] text-white/40">Quick start</span>
            </div>
            <div className="divide-y divide-white/10 px-5">
              {[
                ["OAuth 2.0", "POST /oauth/token"],
                ["Bearer", "POST /api/facturacion/emitir-cfdi"],
                ["Respuesta", "UUID · sellos · XML Base64"],
              ].map(([label, value]) => (
                <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4" key={label}>
                  <span className="text-[.6rem] font-extrabold uppercase tracking-wider text-[var(--color-mint)]">{label}</span>
                  <code className="break-all text-[.68rem] text-white/80">{value}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[var(--color-border)] bg-white px-4 py-3 xl:hidden">
        <label className="mx-auto flex max-w-xl items-center gap-3 text-xs font-semibold text-[var(--color-brand)]">
          <ListTree size={17} />
          <span className="shrink-0">Ir a</span>
          <select
            className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-xs outline-none"
            defaultValue="emitir"
            onChange={(event) => {
              document.getElementById(event.target.value)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <option value="autenticacion">Autenticación</option>
            <option value="emitir">Emitir CFDI</option>
            <option value="cancelar">Cancelar CFDI</option>
            <option value="estatus-cfdi">Consultar Estatus del CFDI</option>
          </select>
        </label>
      </div>

      <div className="xl:grid xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-[var(--color-border)] bg-white xl:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-9">
            <div className="flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-muted)]">
              <ListTree size={15} /> Enlaces
            </div>

            <nav className="mt-7 space-y-8 text-xs">
              <div>
                <p className="mb-3 px-3 text-[.62rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-success)]">
                  Primeros pasos
                </p>
                <a className="block rounded-xl px-3 py-2.5 font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" href="#autenticacion">
                  Autenticación
                </a>
              </div>

              <div>
                <p className="mb-3 px-3 text-[.62rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-success)]">
                  Servicios CFDI
                </p>
                <div className="space-y-1">
                  <a className="block rounded-xl bg-[var(--color-brand)] px-3 py-2.5 font-bold text-white shadow-sm" href="#emitir">
                    Emitir CFDI
                  </a>
                  <a className="flex items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" href="#cancelar">
                    Cancelar CFDI
                    <span className="text-[.55rem] font-bold uppercase tracking-wider text-[var(--color-accent-hover)]">Próximamente</span>
                  </a>
                  <a className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 font-semibold leading-5 text-[var(--color-muted)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]" href="#estatus-cfdi">
                    Consultar Estatus del CFDI
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        <div className="min-w-0">

      <section id="autenticacion" className="section-space bg-[var(--color-paper)]">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow-light">OAuth 2.0 · Client Credentials</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)]">
              Autentica tu integración
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Genera tus credenciales en <strong>Panel → Integraciones API</strong> y
              solicita un token antes de consumir el servicio. Este flujo está
              diseñado para comunicación servidor a servidor.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              [KeyRound, "1. Crea tus credenciales", "FacturaBit mostrará el client_secret una sola vez. Guárdalo en un gestor de secretos."],
              [ShieldCheck, "2. Solicita un token", "Envía client_id y client_secret a /oauth/token con el scope cfdi.emit."],
              [RefreshCw, "3. Reutiliza y renueva", "Conserva el token durante expires_in y solicita otro cuando expire o recibas HTTP 401."],
            ].map(([Icon, title, text]) => {
              const StepIcon = Icon as typeof KeyRound;
              return (
                <article className="rounded-2xl border border-[var(--color-border)] bg-white p-6" key={title as string}>
                  <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-mint)]/20 text-[var(--color-success)]">
                    <StepIcon size={19} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-[var(--color-brand)]">{title as string}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{text as string}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-7 grid gap-7 xl:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold text-[var(--color-brand)]">Solicitar access token</h3>
              <CodeBlock code={tokenRequestExample} language="bash" />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-[var(--color-brand)]">Respuesta OAuth</h3>
              <CodeBlock code={tokenResponseExample} />
            </div>
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 p-5">
            <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={18} />
            <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
              <strong>No coloques el client_secret en React, aplicaciones móviles ni código público.</strong>{" "}
              El intercambio de credenciales y el almacenamiento temporal del token deben ocurrir en tu backend.
              Si pierdes el secreto, revoca la integración y genera credenciales nuevas.
            </p>
          </div>
        </div>
      </section>

      <section id="emitir" className="scroll-mt-20">
      <section id="endpoint" className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow-light">Emisión de CFDI</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)]">
              Tu primera solicitud
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Envía una solicitud HTTP POST con contenido JSON. El parámetro{" "}
              <code>esGlobal</code> determina si se trata de una factura global.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5 sm:flex-row sm:items-center">
              <span className="w-fit rounded-lg bg-[var(--color-success)] px-3 py-1.5 text-[.65rem] font-extrabold text-white">
                POST
              </span>
              <code className="break-all text-xs font-semibold text-[var(--color-brand)]">
                /api/facturacion/emitir-cfdi?esGlobal=false
              </code>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 text-xs leading-6 text-[var(--color-muted)]">
              <p>
                <strong className="text-[var(--color-ink)]">
                  Content-Type:
                </strong>{" "}
                application/json
              </p>
              <p>
                <strong className="text-[var(--color-ink)]">
                  Authorization:
                </strong>{" "}
                Bearer TU_ACCESS_TOKEN
              </p>
              <p>
                <strong className="text-[var(--color-ink)]">esGlobal:</strong>{" "}
                usa <code>true</code> únicamente para facturas globales.
              </p>
            </div>
            <CodeBlock code={invoiceRequestExample} language="bash" />
          </div>
        </div>
      </section>

      <section id="payload" className="section-space bg-[var(--color-paper)]">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="eyebrow-light">Cuerpo de la solicitud</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)]">
              Payload para timbrar una factura
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Este ejemplo representa una factura ordinaria con un concepto
              gravado con IVA al 16%.
            </p>
          </div>
          <div className="mt-9 grid gap-7 xl:grid-cols-[1.05fr_.95fr]">
            <CodeBlock code={requestExample} />
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--color-brand)]">
                Campos principales
              </h3>
              <div className="mt-5 divide-y divide-[var(--color-border)]">
                {fields.map(([name, type, description]) => (
                  <div
                    className="grid gap-1 py-3 sm:grid-cols-[7.5rem_5rem_1fr]"
                    key={name}
                  >
                    <code className="text-xs font-bold text-[var(--color-brand)]">
                      {name}
                    </code>
                    <span className="text-[.68rem] font-semibold text-[var(--color-success)]">
                      {type}
                    </span>
                    <p className="text-[.72rem] leading-5 text-[var(--color-muted)]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[var(--color-accent)]/15 p-4">
                <CircleAlert
                  className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]"
                  size={17}
                />
                <p className="text-xs leading-5 text-[var(--color-brand-deep)]">
                  Para una factura global agrega <code>periodicidad</code>,{" "}
                  <code>meses</code> y <code>yyyy</code>, y envía{" "}
                  <code>esGlobal=true</code>. Estos campos no son necesarios en
                  una factura ordinaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="respuesta" className="section-space bg-white">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow-light">Respuesta satisfactoria</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)]">
              Datos del timbrado
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Todos los endpoints utilizan la respuesta estándar de FacturaBit.
              En <code>data</code> encontrarás el UUID, los sellos y el XML
              timbrado.
            </p>
            <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
              <CheckCircle2
                className="mt-0.5 shrink-0 text-[var(--color-success)]"
                size={16}
              />
              Una respuesta satisfactoria descuenta un timbre únicamente para
              entidades con modalidad prepago.
            </p>
          </div>
          <CodeBlock code={responseExample} />
        </div>
      </section>

      <section className="section-space bg-[var(--color-paper)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow-light">Operación segura</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.045em] text-[var(--color-brand)]">
              Consideraciones de integración
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              El token dura 3,600 segundos. No solicites uno por cada CFDI:
              consérvalo en memoria o caché y renuévalo poco antes de expirar.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            {[
              ["400", "Solicitud inválida", "Revisa grant_type, scope y el formato application/x-www-form-urlencoded."],
              ["401", "Credenciales o token inválidos", "Genera un token nuevo; si el secreto fue revocado, crea otra integración."],
              ["403", "Operación no permitida", "El RFC emisor debe pertenecer a tu organización y tu plan debe incluir acceso API."],
              ["429", "Límite de solicitudes", "Espera antes de reintentar y aplica backoff progresivo en tu integración."],
            ].map(([code, title, description]) => (
              <div className="grid gap-2 border-b border-[var(--color-border)] p-5 last:border-b-0 sm:grid-cols-[4rem_11rem_1fr]" key={code}>
                <code className="w-fit rounded-lg bg-[var(--color-brand)] px-2.5 py-1 text-xs font-bold text-white">{code}</code>
                <strong className="text-xs text-[var(--color-ink)]">{title}</strong>
                <p className="text-xs leading-5 text-[var(--color-muted)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {[
            ["cancelar", "Cancelar CFDI", "Documentaremos aquí la solicitud de cancelación, sus motivos y la respuesta del PAC."],
            ["estatus-cfdi", "Consultar Estatus del CFDI", "Consulta el estado vigente de un comprobante directamente ante el SAT."],
          ].map(([id, title, description]) => (
            <article className="scroll-mt-24 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-paper)] p-6" id={id} key={id}>
              <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-[.6rem] font-extrabold uppercase tracking-[.12em] text-[var(--color-accent-hover)]">
                Próximamente
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-[var(--color-brand)]">{title}</h2>
              <p className="mt-2 text-xs leading-6 text-[var(--color-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>
      </section>
        </div>
      </div>

      <footer className="bg-[var(--color-brand-deep)] py-10 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <Brand inverse />
          <p className="text-xs text-white/45">
            Documentación inicial de la API · 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
