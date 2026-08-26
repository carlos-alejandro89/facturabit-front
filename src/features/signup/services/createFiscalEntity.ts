import type { SignUpFormData } from "../components/SignUpForm";

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  httpCode: number;
  data?: T | null;
}

export interface CreateFiscalEntityResult {
  entidadFiscal: {
    guid: string;
    razonSocial: string;
    rfc: string;
  };
  passwordTemporal: string;
  passwordExpiresAt: string;
  ordenCompraGuid: string;
  folioOrdenCompra: string;
}

interface CreateFiscalEntityPayload extends SignUpFormData {
  SuscripcionGuid: string;
}

const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(
  /\/$/,
  "",
);

export async function createFiscalEntity(
  payload: CreateFiscalEntityPayload,
): Promise<CreateFiscalEntityResult> {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}/api/entidades-fiscales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "No fue posible comunicarse con FacturaBit. Verifica que el servicio esté disponible.",
    );
  }

  let result: ApiResponse<CreateFiscalEntityResult> | undefined;
  try {
    result = (await response.json()) as ApiResponse<CreateFiscalEntityResult>;
  } catch {
    // El servidor puede responder sin JSON ante un error de infraestructura.
  }

  if (!response.ok || !result?.success || !result.data) {
    throw new Error(
      result?.mensaje ?? "No fue posible completar el registro. Inténtalo nuevamente.",
    );
  }

  return result.data;
}
