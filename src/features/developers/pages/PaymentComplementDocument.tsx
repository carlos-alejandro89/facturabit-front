import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";

const requestExample = `curl --request POST \\
  'https://TU_HOST/api/facturacion/emitir-complemento-pago' \\
  --header 'Authorization: Bearer TU_ACCESS_TOKEN' \\
  --header 'Content-Type: application/json' \\
  --data @complemento-pago.json`;

const payloadExample = `{
  "serie": "P",
  "folioInterno": "1050",
  "fecha": "2026-11-10T12:30:00",
  "cveFormaPago": "03",
  "formaPago": "Transferencia electrónica de fondos",
  "rfcEmisor": "AAA010101AAA",
  "emisor": "EMPRESA DEMO SA DE CV",
  "cveRegimenEmisor": "601",
  "regimenEmisor": "General de Ley Personas Morales",
  "lugarExpedicion": "64000",
  "rfcReceptor": "BBB010101BBB",
  "receptor": "CLIENTE DEMO SA DE CV",
  "cveRegimenReceptor": "601",
  "regimenReceptor": "General de Ley Personas Morales",
  "domicilioFiscalReceptor": "64000",
  "complementoInfo": {
    "fechaPago": "2026-11-10T09:15:00",
    "totalPago": 1160.00,
    "documentos": [
      {
        "folio": "A-1049",
        "idDocumento": "11111111-2222-3333-4444-555555555555",
        "importePagado": 1160.00,
        "importeSaldoAnterior": 1160.00,
        "importeSaldoInsoluto": 0.00,
        "numParcialidad": 1,
        "baseDR": 1000.000000,
        "importeDR": 160.000000
      }
    ]
  }
}`;

const responseExample = `{
  "success": true,
  "mensaje": "Complemento de pago timbrado correctamente.",
  "httpCode": 200,
  "data": {
    "uuid": "AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE",
    "fechaTimbrado": "2026-11-10T12:30:05",
    "noCertificadoSat": "00001000000500000000",
    "noCertificadoEmisor": "00001000000500000001",
    "selloSat": "...",
    "selloEmisor": "...",
    "cadenaOriginalSat": "...",
    "cfdiXmlBase64": "PD94bWwgdmVyc2lvbj0iMS4wIi4uLg=="
  }
}`;

const receiptFields = [
  ["serie", "string", "No", "Serie interna del complemento; puedes omitirla cuando no aplique."],
  ["folioInterno", "string", "Sí", "Folio interno utilizado para identificar y almacenar el complemento."],
  ["fecha", "date-time", "No", "Fecha de emisión. Si se omite, Carti utiliza la fecha actual."],
  ["cveFormaPago", "string", "Sí", "Clave SAT de la forma en que se recibió el pago, por ejemplo 03."],
  ["rfcEmisor", "string", "Sí", "RFC de una entidad fiscal asociada con las credenciales de integración."],
  ["emisor", "string", "Sí", "Nombre o razón social del emisor conforme a su constancia fiscal."],
  ["cveRegimenEmisor", "string", "Sí", "Clave SAT del régimen fiscal del emisor."],
  ["lugarExpedicion", "string", "Sí", "Código postal desde el que se expide el comprobante."],
  ["rfcReceptor", "string", "Sí", "RFC del receptor del complemento."],
  ["receptor", "string", "Sí", "Nombre o razón social del receptor."],
  ["cveRegimenReceptor", "string", "Sí", "Clave SAT del régimen fiscal del receptor."],
  ["domicilioFiscalReceptor", "string", "Sí", "Código postal fiscal del receptor."],
];

const paymentFields = [
  ["fechaPago", "date-time", "Fecha y hora en que se recibió el pago."],
  ["totalPago", "number", "Monto total recibido; debe ser mayor que cero."],
  ["documentos", "array", "Uno o más CFDI pagados con esta operación."],
];

const relatedDocumentFields = [
  ["idDocumento", "uuid", "UUID del CFDI que se está pagando."],
  ["folio", "string", "Folio del documento relacionado; es opcional."],
  ["numParcialidad", "integer", "Número consecutivo del pago; debe ser mayor que cero."],
  ["importeSaldoAnterior", "number", "Saldo pendiente antes de aplicar este pago."],
  ["importePagado", "number", "Importe aplicado al documento."],
  ["importeSaldoInsoluto", "number", "Saldo restante después del pago."],
  ["baseDR", "number", "Base del IVA 16 % correspondiente al importe pagado."],
  ["importeDR", "number", "IVA 16 % correspondiente al importe pagado."],
];

export function PaymentComplementDocument() {
  return (
    <article>
      <header className="border-b border-[var(--color-border)] pb-8">
        <p className="text-[.65rem] font-extrabold uppercase tracking-[.15em] text-[var(--color-success)]">Servicios CFDI · Pagos 2.0</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-.05em] text-[var(--color-brand)]">Complemento de pago</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
          Genera un CFDI tipo P para registrar pagos recibidos de comprobantes emitidos con método PPD y obtén el XML timbrado con el complemento Pagos 2.0.
        </p>
      </header>

      <div className="mt-9 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-fit rounded-lg bg-[var(--color-success)] px-3 py-1.5 text-[.62rem] font-extrabold text-white">POST</span>
          <code className="break-all text-xs font-semibold text-[var(--color-brand)]">/api/facturacion/emitir-complemento-pago</code>
        </div>
        <div className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-muted)] sm:grid-cols-3">
          <p><strong className="text-[var(--color-ink)]">Authorization:</strong> Bearer TU_ACCESS_TOKEN</p>
          <p><strong className="text-[var(--color-ink)]">Content-Type:</strong> application/json</p>
          <p><strong className="text-[var(--color-ink)]">Scope:</strong> cfdi.emit</p>
        </div>
      </div>

      <Section title="Solicitud HTTP" description="Solicita el access token con cfdi.emit y envía el cuerpo JSON desde el backend de tu integración.">
        <CodeBlock code={requestExample} language="bash" />
      </Section>

      <Section title="Payload" description="Este ejemplo registra el pago total de una factura en una sola parcialidad mediante transferencia electrónica.">
        <CodeBlock code={payloadExample} />
      </Section>

      <Section title="Datos del comprobante de pago" description="Identifican el CFDI tipo P, al emisor, al receptor y la forma en que se recibió el pago.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {receiptFields.map(([name, type, required, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[10rem_5rem_4rem_1fr]" key={name}>
              <code className="text-[.68rem] font-bold text-[var(--color-brand)]">{name}</code>
              <span className="text-[.62rem] font-semibold text-[var(--color-success)]">{type}</span>
              <strong className="text-[.65rem] text-[var(--color-ink)]">{required}</strong>
              <p className="text-[.68rem] leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Información del pago" description="complementoInfo contiene la fecha, el monto recibido y los documentos relacionados.">
        <div className="grid gap-5 xl:grid-cols-2">
          <FieldCard title="complementoInfo" fields={paymentFields} />
          <FieldCard title="documentos[]" fields={relatedDocumentFields} wide />
        </div>
      </Section>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 p-5">
        <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={18} />
        <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
          <strong>Validaciones importantes.</strong> La suma de <code>importePagado</code> debe coincidir con <code>totalPago</code>. En cada documento, <code>importeSaldoInsoluto</code> debe ser igual a <code>importeSaldoAnterior - importePagado</code>. La integración actual genera pagos en MXN con traslado de IVA al 16 %.
        </p>
      </div>

      <Section title="Datos generados por Carti" description="No debes enviar estos valores: el servicio los establece conforme al estándar Pagos 2.0.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["CFDI tipo P", "TipoDeComprobante P, moneda XXX, subtotal y total en cero."],
            ["Uso CFDI CP01", "El receptor se registra con el uso Pagos."],
            ["Concepto de pago", "Clave 84111506, unidad ACT y objeto de impuesto 01."],
          ].map(([title, description]) => (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5" key={title}>
              <h3 className="text-sm font-bold text-[var(--color-brand)]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Respuesta satisfactoria" description="El contrato es el mismo que en la emisión de un CFDI e incluye el XML timbrado en Base64.">
        <CodeBlock code={responseExample} />
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--color-success)]" size={16} />
          Conserva el UUID y el XML. Una emisión satisfactoria descuenta un timbre cuando el emisor utiliza modalidad prepago.
        </p>
      </Section>

      <Section title="Códigos de respuesta" description="Respuestas que debes manejar en la integración.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {[
            ["400", "Solicitud inválida", "Revisa importes, saldos, parcialidades, documentos, CSD y respuesta del PAC."],
            ["401", "Token inválido", "Solicita un access token nuevo."],
            ["403", "Operación no permitida", "El token requiere cfdi.emit y el RFC debe pertenecer a tu organización."],
            ["429", "Límite de solicitudes", "Espera y aplica backoff progresivo antes de reintentar."],
            ["500", "Error inesperado", "Conserva la respuesta y contacta a soporte si el problema persiste."],
          ].map(([code, title, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[4rem_11rem_1fr]" key={code}>
              <code className="w-fit rounded-lg bg-[var(--color-brand)] px-2.5 py-1 text-xs font-bold text-white">{code}</code>
              <strong className="text-xs">{title}</strong>
              <p className="text-xs leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-12 flex justify-end border-t border-[var(--color-border)] pt-6">
        <Link className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-5 py-3 text-xs font-bold text-[var(--color-brand)] transition hover:border-[var(--color-mint)]" to="/desarrolladores/cancelar-cfdi">
          Siguiente: Cancelar CFDI <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-[var(--color-border)] pt-8">
      <h2 className="font-display text-xl font-semibold text-[var(--color-brand)]">{title}</h2>
      <p className="mt-2 mb-5 text-xs leading-6 text-[var(--color-muted)]">{description}</p>
      {children}
    </section>
  );
}

function FieldCard({ title, fields, wide = false }: { title: string; fields: string[][]; wide?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
      <div className="border-b border-[var(--color-border)] px-5 py-4 text-sm font-bold text-[var(--color-brand)]">{title}</div>
      {fields.map(([name, type, description]) => (
        <div className={`grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 ${wide ? "sm:grid-cols-[10rem_5rem_1fr]" : "sm:grid-cols-[8rem_5rem_1fr]"}`} key={name}>
          <code className="text-[.68rem] font-bold text-[var(--color-brand)]">{name}</code>
          <span className="text-[.62rem] font-semibold text-[var(--color-success)]">{type}</span>
          <p className="text-[.68rem] leading-5 text-[var(--color-muted)]">{description}</p>
        </div>
      ))}
    </div>
  );
}
