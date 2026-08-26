import { getSession } from "../../auth/services/authService";

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  httpCode: number;
  data?: T | null;
}

export interface FiscalEntity {
  guid: string;
  satRegimenFiscalId?: number | null;
  satRegimenFiscalClave?: string | null;
  satRegimenFiscalNombre?: string | null;
  razonSocial: string;
  rfc: string;
  registroPatronal?: string | null;
  calle?: string | null;
  numExt?: string | null;
  numInt?: string | null;
  colonia?: string | null;
  ciudad?: string | null;
  estado?: string | null;
  codigoPostal: string;
  esPrepago: boolean;
  certificadoVigente: boolean;
  nombreComercial?: string | null;
  telefonoComercial?: string | null;
  telefonoComercial2?: string | null;
  correoComercial?: string | null;
}

export interface UpsertFiscalEntity {
  guid?: string;
  satRegimenFiscalId?: number | null;
  razonSocial: string;
  rfc: string;
  registroPatronal?: string;
  calle?: string;
  numExt?: string;
  numInt?: string;
  colonia?: string;
  ciudad?: string;
  estado?: string;
  codigoPostal: string;
  nombreComercial?: string;
  telefonoComercial?: string;
  telefonoComercial2?: string;
  correoComercial?: string;
}

const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(/\/$/, "");

async function authorizedRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw new Error("No fue posible comunicarse con FacturaBit.");
  }

  let result: ApiResponse<T> | undefined;
  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    // La respuesta de infraestructura podría no contener JSON.
  }

  if (!response.ok || !result?.success || result.data == null) {
    throw new Error(result?.mensaje ?? "No fue posible completar la operación.");
  }
  return result.data;
}

export function getFiscalEntities(signal?: AbortSignal) {
  return authorizedRequest<FiscalEntity[]>("/api/entidades-fiscales", { signal });
}

export function upsertFiscalEntity(payload: UpsertFiscalEntity) {
  return authorizedRequest<FiscalEntity>("/api/entidades-fiscales/emisores", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
