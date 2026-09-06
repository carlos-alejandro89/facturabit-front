import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  KeyRound,
  ListTree,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Link, Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { Brand } from "../../../shared/components/Brand";
import { CodeBlock } from "../components/CodeBlock";
import {
  fields,
  invoiceRequestExample,
  requestExample,
  responseExample,
  tokenRequestExample,
  tokenResponseExample,
} from "./DevelopersPage";

const topics = [
  { slug: "autenticacion", label: "Autenticación", group: "Primeros pasos" },
  { slug: "emitir-cfdi", label: "Emitir CFDI", group: "Servicios CFDI" },
  { slug: "cancelar-cfdi", label: "Cancelar CFDI", group: "Servicios CFDI" },
  {
    slug: "estatus-cfdi",
    label: "Consultar Estatus del CFDI",
    group: "Servicios CFDI",
  },
] as const;

function DocsNavigation({ currentTopic }: { currentTopic: string }) {
  return (
    <aside className="hidden border-r border-[var(--color-border)] bg-white lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-5 py-8">
        <div className="flex items-center gap-2 px-2 text-[.66rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-muted)]">
          <ListTree size={15} /> Enlaces
        </div>
        {["Primeros pasos", "Servicios CFDI"].map((group) => (
          <div className="mt-7" key={group}>
            <p className="mb-2 px-3 text-[.58rem] font-extrabold uppercase tracking-[.14em] text-[var(--color-success)]">
              {group}
            </p>
            <nav className="space-y-1">
              {topics
                .filter((topic) => topic.group === group)
                .map((topic) => (
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs transition ${
                        isActive || currentTopic === topic.slug
                          ? "bg-[var(--color-brand)] font-bold !text-white shadow-sm [&_*]:!text-white"
                          : "font-semibold text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-brand)]"
                      }`
                    }
                    key={topic.slug}
                    to={`/desarrolladores/${topic.slug}`}
                  >
                    <span>{topic.label}</span>
                  </NavLink>
                ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AuthenticationDocument() {
  return (
    <article>
      <DocumentHeader
        eyebrow="OAuth 2.0 · Client Credentials"
        title="Autenticación"
        description="Obtén un access token para que tu servidor pueda consumir la API de FacturaBit de forma segura."
      />

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {[
          [KeyRound, "1. Crea credenciales", "Genera un client_id y client_secret desde Panel → Integraciones API."],
          [ShieldCheck, "2. Solicita el token", "Autentícate en /oauth/token con los scopes requeridos, por ejemplo cfdi.emit y cfdi.status."],
          [RefreshCw, "3. Reutiliza y renueva", "Guarda el token temporalmente y renuévalo al expirar o recibir HTTP 401."],
        ].map(([Icon, title, text]) => {
          const StepIcon = Icon as typeof KeyRound;
          return (
            <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5" key={title as string}>
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--color-mint)]/20 text-[var(--color-success)]">
                <StepIcon size={18} />
              </span>
              <h2 className="mt-4 text-sm font-bold text-[var(--color-brand)]">{title as string}</h2>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{text as string}</p>
            </section>
          );
        })}
      </div>

      <DocsSection title="Solicitar un access token" description="Utiliza HTTP Basic para enviar las credenciales y application/x-www-form-urlencoded para los parámetros OAuth.">
        <div className="grid gap-6 xl:grid-cols-2">
          <CodeBlock code={tokenRequestExample} language="bash" />
          <CodeBlock code={tokenResponseExample} />
        </div>
      </DocsSection>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 p-5">
        <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={18} />
        <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
          <strong>No expongas el client_secret en React, aplicaciones móviles o repositorios públicos.</strong>{" "}
          El intercambio debe realizarse exclusivamente desde el backend de tu integración. El secreto se muestra una sola vez.
        </p>
      </div>

      <DocsSection title="Vigencia y renovación" description="El access token es temporal y no requiere intervención manual del usuario.">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard icon={Clock3} label="Vigencia" value="3,600 segundos" />
          <InfoCard icon={RefreshCw} label="Renovación" value="Solicita otro token antes de expirar" />
        </div>
      </DocsSection>

      <NextDocument to="/desarrolladores/emitir-cfdi" label="Emitir CFDI" />
    </article>
  );
}

function EmitCfdiDocument() {
  return (
    <article>
      <DocumentHeader
        eyebrow="Servicios CFDI"
        title="Emitir CFDI"
        description="Envía la información de una operación, firma el XML con el CSD del emisor y obtén el comprobante timbrado."
      />

      <div className="mt-9 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-fit rounded-lg bg-[var(--color-success)] px-3 py-1.5 text-[.62rem] font-extrabold text-white">POST</span>
          <code className="break-all text-xs font-semibold text-[var(--color-brand)]">/api/facturacion/emitir-cfdi?esGlobal=false</code>
        </div>
        <div className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-muted)] sm:grid-cols-2">
          <p><strong className="text-[var(--color-ink)]">Authorization:</strong> Bearer TU_ACCESS_TOKEN</p>
          <p><strong className="text-[var(--color-ink)]">Content-Type:</strong> application/json</p>
        </div>
      </div>

      <DocsSection title="Solicitud HTTP" description="El parámetro esGlobal determina si el comprobante corresponde a una factura global.">
        <CodeBlock code={invoiceRequestExample} language="bash" />
      </DocsSection>

      <DocsSection title="Payload" description="Ejemplo de una factura ordinaria con un concepto gravado con IVA al 16%.">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <CodeBlock code={requestExample} />
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-5 py-4 text-sm font-bold text-[var(--color-brand)]">Campos principales</div>
            <div className="divide-y divide-[var(--color-border)] px-5">
              {fields.map(([name, type, description]) => (
                <div className="grid gap-1 py-3 sm:grid-cols-[7rem_4.5rem_1fr]" key={name}>
                  <code className="text-[.68rem] font-bold text-[var(--color-brand)]">{name}</code>
                  <span className="text-[.62rem] font-semibold text-[var(--color-success)]">{type}</span>
                  <p className="text-[.68rem] leading-5 text-[var(--color-muted)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocsSection>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[var(--color-accent)]/12 p-5">
        <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={17} />
        <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
          Para una factura global agrega <code>periodicidad</code>, <code>meses</code> y <code>yyyy</code>, y envía <code>esGlobal=true</code>. No son obligatorios en una factura ordinaria.
        </p>
      </div>

      <DocsSection title="Respuesta satisfactoria" description="FacturaBit responde con su contrato estándar y coloca los datos del timbrado dentro de data.">
        <CodeBlock code={responseExample} />
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--color-success)]" size={16} />
          Una emisión satisfactoria descuenta un timbre únicamente para entidades con modalidad prepago.
        </p>
      </DocsSection>

      <DocsSection title="Códigos de respuesta" description="Respuestas que debes contemplar en tu integración.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {[
            ["400", "Solicitud inválida", "Revisa el payload y sus validaciones."],
            ["401", "Token inválido", "Solicita un access token nuevo."],
            ["403", "Operación no permitida", "El RFC debe pertenecer a tu organización y el plan debe incluir acceso API."],
            ["429", "Límite de solicitudes", "Espera y aplica backoff progresivo."],
          ].map(([code, title, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[4rem_10rem_1fr]" key={code}>
              <code className="w-fit rounded-lg bg-[var(--color-brand)] px-2.5 py-1 text-xs font-bold text-white">{code}</code>
              <strong className="text-xs">{title}</strong>
              <p className="text-xs leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <NextDocument to="/desarrolladores/cancelar-cfdi" label="Cancelar CFDI" />
    </article>
  );
}

const cancelCfdiRequestExample = `curl --request POST \\
  'https://TU_HOST/api/facturacion/cancelar-cfdi' \\
  --header 'Authorization: Bearer TU_ACCESS_TOKEN' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "rfc": "AAA010101AAA",
    "uuid": "11111111-2222-3333-4444-555555555555",
    "motivo": "02"
  }'`;

const cancelCfdiReplacementExample = `{
  "rfc": "AAA010101AAA",
  "uuid": "11111111-2222-3333-4444-555555555555",
  "motivo": "01",
  "folioSustitucion": "AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE"
}`;

const cancelCfdiResponseExample = `{
  "success": true,
  "mensaje": "CFDI cancelado correctamente.",
  "httpCode": 200,
  "data": {
    "acuseBase64": "PD94bWwgdmVyc2lvbj0iMS4wIi4uLg==",
    "cancelado": true,
    "estatusSat": "Cancelado",
    "codigoEstatusSat": "S - Comprobante obtenido satisfactoriamente.",
    "esCancelable": "Cancelable con aceptación",
    "estatusCancelacion": "Plazo vencido",
    "estatusPorUuid": {
      "11111111-2222-3333-4444-555555555555": "202"
    }
  }
}`;

function CancelCfdiDocument() {
  return (
    <article>
      <DocumentHeader
        eyebrow="Servicios CFDI"
        title="Cancelar CFDI"
        description="Solicita la cancelación de un comprobante timbrado, utilizando el CSD configurado para el emisor y uno de los motivos definidos por el SAT."
      />

      <div className="mt-9 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-fit rounded-lg bg-[var(--color-success)] px-3 py-1.5 text-[.62rem] font-extrabold text-white">POST</span>
          <code className="break-all text-xs font-semibold text-[var(--color-brand)]">/api/facturacion/cancelar-cfdi</code>
        </div>
        <div className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-muted)] sm:grid-cols-2">
          <p><strong className="text-[var(--color-ink)]">Authorization:</strong> Bearer TU_ACCESS_TOKEN</p>
          <p><strong className="text-[var(--color-ink)]">Content-Type:</strong> application/json</p>
        </div>
      </div>

      <DocsSection title="Solicitud HTTP" description="Para los motivos 02, 03 y 04 solo debes enviar el RFC del emisor, el UUID que deseas cancelar y el motivo.">
        <CodeBlock code={cancelCfdiRequestExample} language="bash" />
      </DocsSection>

      <DocsSection title="Campos de la solicitud" description="El CFDI debe pertenecer al RFC y a la organización asociada con tus credenciales.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {[
            ["rfc", "string", "Sí", "RFC del emisor del comprobante. Máximo 13 caracteres."],
            ["uuid", "uuid", "Sí", "Folio fiscal del CFDI que se desea cancelar."],
            ["motivo", "string", "Sí", "Motivo SAT de cancelación: 01, 02, 03 o 04."],
            ["folioSustitucion", "uuid", "Condicional", "UUID del comprobante que sustituye al original. Requerido únicamente con motivo 01."],
          ].map(([name, type, required, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[9rem_5rem_7rem_1fr]" key={name}>
              <code className="text-[.68rem] font-bold text-[var(--color-brand)]">{name}</code>
              <span className="text-[.62rem] font-semibold text-[var(--color-success)]">{type}</span>
              <strong className="text-[.65rem] text-[var(--color-ink)]">{required}</strong>
              <p className="text-[.68rem] leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Motivos de cancelación" description="Selecciona el motivo que corresponda a la operación conforme al catálogo del SAT.">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["01", "Comprobante emitido con errores con relación", "Requiere folioSustitucion."],
            ["02", "Comprobante emitido con errores sin relación", "No requiere UUID de sustitución."],
            ["03", "No se llevó a cabo la operación", "No requiere UUID de sustitución."],
            ["04", "Operación nominativa relacionada en factura global", "No requiere UUID de sustitución."],
          ].map(([code, title, note]) => (
            <div className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5" key={code}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-brand)] text-xs font-extrabold text-white">{code}</span>
              <div><h3 className="text-xs font-bold text-[var(--color-brand)]">{title}</h3><p className="mt-1 text-[.68rem] leading-5 text-[var(--color-muted)]">{note}</p></div>
            </div>
          ))}
        </div>
      </DocsSection>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 p-5">
        <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={18} />
        <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
          Con motivo <strong>01</strong>, <code>folioSustitucion</code> es obligatorio, debe ser un UUID válido y debe ser diferente del UUID que estás cancelando. Para los demás motivos, omite este campo.
        </p>
      </div>

      <DocsSection title="Ejemplo con sustitución" description="Payload requerido para cancelar por errores con relación.">
        <CodeBlock code={cancelCfdiReplacementExample} />
      </DocsSection>

      <DocsSection title="Respuesta satisfactoria" description="FacturaBit devuelve el acuse en Base64 y el resultado reportado por el SAT. Una solicitud procesada puede permanecer pendiente de confirmación.">
        <CodeBlock code={cancelCfdiResponseExample} />
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--color-success)]" size={16} />
          Considera la cancelación concluida únicamente cuando <code>data.cancelado</code> sea <code>true</code>. Si es <code>false</code>, conserva el estado pendiente y consulta nuevamente el comprobante según tu flujo operativo.
        </p>
      </DocsSection>

      <DocsSection title="Códigos de respuesta" description="Respuestas que debes manejar al integrar la cancelación.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {[
            ["400", "Solicitud rechazada", "Revisa los UUID, el motivo, el CSD, los timbres disponibles o la respuesta del PAC."],
            ["401", "Token inválido", "Solicita un access token nuevo."],
            ["403", "Operación no permitida", "El usuario o cliente API no tiene autorización para realizar la operación."],
            ["500", "Error inesperado", "Conserva la respuesta y contacta a soporte si el problema persiste."],
          ].map(([code, title, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[4rem_11rem_1fr]" key={code}>
              <code className="w-fit rounded-lg bg-[var(--color-brand)] px-2.5 py-1 text-xs font-bold text-white">{code}</code>
              <strong className="text-xs">{title}</strong>
              <p className="text-xs leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <NextDocument to="/desarrolladores/estatus-cfdi" label="Consultar Estatus del CFDI" />
    </article>
  );
}

const statusCfdiRequestExample = `curl --request GET \\
  'https://TU_HOST/api/facturacion/estatus-sat?rfc=AAA010101AAA&uuid=11111111-2222-3333-4444-555555555555' \\
  --header 'Authorization: Bearer TU_ACCESS_TOKEN'`;

const statusCfdiResponseExample = `{
  "success": true,
  "mensaje": "Estatus del CFDI consultado correctamente.",
  "httpCode": 200,
  "data": {
    "uuid": "11111111-2222-3333-4444-555555555555",
    "estado": "Vigente",
    "codigoEstatus": "S - Comprobante obtenido satisfactoriamente.",
    "esCancelable": "Cancelable con aceptación",
    "estatusCancelacion": "En proceso",
    "validacionEfos": "200",
    "consultadoEn": "2026-09-05T18:30:00Z"
  }
}`;

function StatusCfdiDocument() {
  return (
    <article>
      <DocumentHeader
        eyebrow="Servicios CFDI"
        title="Consultar Estatus del CFDI"
        description="Consulta directamente el estado vigente del CFDI ante el SAT antes o después de solicitar su cancelación, sin reenviar la operación."
      />

      <div className="mt-9 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-fit rounded-lg bg-[var(--color-brand)] px-3 py-1.5 text-[.62rem] font-extrabold text-white">GET</span>
          <code className="break-all text-xs font-semibold text-[var(--color-brand)]">/api/facturacion/estatus-sat?rfc=RFC&amp;uuid=UUID</code>
        </div>
        <div className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-muted)] sm:grid-cols-2">
          <p><strong className="text-[var(--color-ink)]">Authorization:</strong> Bearer TU_ACCESS_TOKEN</p>
          <p><strong className="text-[var(--color-ink)]">Scope:</strong> cfdi.status</p>
        </div>
      </div>

      <DocsSection title="Solicitud HTTP" description="Envía únicamente el RFC del emisor y el UUID. FacturaBit obtiene internamente el receptor, total y los últimos ocho caracteres del sello.">
        <CodeBlock code={statusCfdiRequestExample} language="bash" />
      </DocsSection>

      <DocsSection title="Parámetros" description="Ambos valores deben identificar un CFDI perteneciente a la organización asociada con las credenciales.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          {[
            ["rfc", "string", "RFC de la entidad fiscal emisora."],
            ["uuid", "uuid", "Folio fiscal del comprobante que deseas consultar."],
          ].map(([name, type, description]) => (
            <div className="grid gap-2 border-b border-[var(--color-border)] p-4 last:border-0 sm:grid-cols-[7rem_5rem_1fr]" key={name}>
              <code className="text-[.68rem] font-bold text-[var(--color-brand)]">{name}</code>
              <span className="text-[.62rem] font-semibold text-[var(--color-success)]">{type}</span>
              <p className="text-[.68rem] leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Respuesta" description="La respuesta normaliza el contrato SOAP del SAT a JSON y registra la hora de consulta en UTC.">
        <CodeBlock code={statusCfdiResponseExample} />
      </DocsSection>

      <DocsSection title="Cómo interpretar el resultado" description="Usa la combinación de estado y estatus de cancelación para decidir el siguiente paso.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Vigente", "El CFDI continúa activo. Revisa esCancelable antes de solicitar una cancelación."],
            ["En proceso", "La solicitud ya fue recibida y todavía espera resolución."],
            ["Cancelado", "La cancelación ya fue confirmada por el SAT."],
          ].map(([title, description]) => (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5" key={title}>
              <h3 className="text-sm font-bold text-[var(--color-brand)]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 p-5">
        <CircleAlert className="mt-0.5 shrink-0 text-[var(--color-accent-hover)]" size={18} />
        <p className="text-xs leading-6 text-[var(--color-brand-deep)]">
          Esta operación es de solo lectura: consultar el estatus nunca vuelve a enviar una solicitud de cancelación.
        </p>
      </div>
    </article>
  );
}

function DocumentHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="border-b border-[var(--color-border)] pb-8">
      <p className="text-[.65rem] font-extrabold uppercase tracking-[.15em] text-[var(--color-success)]">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-.05em] text-[var(--color-brand)]">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{description}</p>
    </header>
  );
}

function DocsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-[var(--color-border)] pt-8 first:border-0">
      <h2 className="font-display text-xl font-semibold text-[var(--color-brand)]">{title}</h2>
      <p className="mt-2 mb-5 text-xs leading-6 text-[var(--color-muted)]">{description}</p>
      {children}
    </section>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-mint)]/20 text-[var(--color-success)]"><Icon size={18} /></span>
      <div><span className="text-[.62rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">{label}</span><strong className="mt-1 block text-sm text-[var(--color-brand)]">{value}</strong></div>
    </div>
  );
}

function NextDocument({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-12 flex justify-end border-t border-[var(--color-border)] pt-6">
      <Link className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-5 py-3 text-xs font-bold text-[var(--color-brand)] transition hover:border-[var(--color-mint)]" to={to}>
        Siguiente: {label} <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function DeveloperTopicPage() {
  const { topic = "autenticacion" } = useParams();
  const navigate = useNavigate();
  const validTopic = topics.some((item) => item.slug === topic);
  if (!validTopic) return <Navigate to="/desarrolladores/autenticacion" replace />;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md">
        <div className="container-shell flex h-16 items-center justify-between">
          <div className="[&_img]:!h-9"><Brand /></div>
          <p className="hidden text-xs font-semibold text-[var(--color-muted)] md:block">API · Documentación para desarrolladores</p>
          <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-[var(--color-brand)] transition hover:bg-[var(--color-paper)]" to="/">
            <ArrowLeft size={15} /> Volver al sitio
          </Link>
        </div>
      </header>

      <div className="border-b border-[var(--color-border)] bg-white px-4 py-3 lg:hidden">
        <label className="mx-auto flex max-w-xl items-center gap-3 text-xs font-semibold text-[var(--color-brand)]">
          <ListTree size={17} /><span className="shrink-0">Documento</span>
          <select className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-xs outline-none" value={topic} onChange={(event) => navigate(`/desarrolladores/${event.target.value}`)}>
            {topics.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}
          </select>
        </label>
      </div>

      <div className="flex-1 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <DocsNavigation currentTopic={topic} />
        <div className="min-w-0 px-5 py-9 sm:px-8 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-6xl">
            {topic === "autenticacion" && <AuthenticationDocument />}
            {topic === "emitir-cfdi" && <EmitCfdiDocument />}
            {topic === "cancelar-cfdi" && <CancelCfdiDocument />}
            {topic === "estatus-cfdi" && <StatusCfdiDocument />}
          </div>
        </div>
      </div>

      <footer className="border-t border-[var(--color-border)] bg-white">
        <div className="container-shell flex flex-col gap-2 py-5 text-[.66rem] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="font-bold text-[var(--color-brand)]">FacturaBit API</strong>
            {" · "}Documentación para desarrolladores
          </p>
          <p>Factura. Gestiona. Crece. · 2026</p>
        </div>
      </footer>
    </main>
  );
}
