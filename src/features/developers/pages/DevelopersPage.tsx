import {
  ArrowLeft,
  ArrowRight,
  Braces,
  CheckCircle2,
  CircleAlert,
  Code2,
  FileJson2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "../../../shared/components/Brand";
import { CodeBlock } from "../components/CodeBlock";

const requestExample = `{
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

const responseExample = `{
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

const fields = [
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
        <div className="container-shell flex h-20 items-center justify-between">
          <Brand />
          <nav className="hidden items-center gap-7 text-xs font-semibold md:flex">
            <a href="#inicio">Introducción</a>
            <a href="#endpoint">Endpoint</a>
            <a href="#payload">Payload</a>
            <a href="#respuesta">Respuesta</a>
          </nav>
          <Link className="btn-ghost" to="/">
            <ArrowLeft size={16} /> Volver
          </Link>
        </div>
      </header>

      <section id="inicio" className="bg-[var(--color-brand)] py-20 text-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">
              <Code2 size={15} /> FacturaBit para desarrolladores
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.055em]">
              De JSON a un CFDI timbrado.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-brand-muted)]">
              Integra la facturación electrónica en tu ERP, punto de venta o
              plataforma. Envía la información de la operación y FacturaBit
              construye, firma y timbra el XML válido ante el SAT.
            </p>
            <a className="btn-primary btn-large mt-8" href="#endpoint">
              Ver primera solicitud <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [
                Braces,
                "JSON claro",
                "Un contrato sencillo para integrar desde cualquier tecnología.",
              ],
              [
                ShieldCheck,
                "Proceso seguro",
                "Firma con el CSD configurado para la entidad emisora.",
              ],
              [
                FileJson2,
                "Respuesta útil",
                "Recibe UUID, sellos y el XML timbrado en Base64.",
              ],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Braces;
              return (
                <div
                  className="rounded-2xl border border-white/10 bg-white/[.055] p-5"
                  key={title as string}
                >
                  <ItemIcon className="text-[var(--color-mint)]" size={20} />
                  <h2 className="mt-3 text-sm font-bold">{title as string}</h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-brand-muted)]">
                    {text as string}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
                <strong className="text-[var(--color-ink)]">esGlobal:</strong>{" "}
                usa <code>true</code> únicamente para facturas globales.
              </p>
            </div>
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
