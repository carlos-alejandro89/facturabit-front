import { getSession } from "../../auth/services/authService";

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  httpCode: number;
  data?: T | null;
}

export interface ApiClient {
  guid: string;
  nombre: string;
  clientId: string;
  scopes: string[];
  activo: boolean;
  expiresAt?: string | null;
  lastUsedAt?: string | null;
  createdAt: string;
}

export interface CreatedApiClient {
  guid: string;
  nombre: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  createdAt: string;
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
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error("No fue posible comunicarse con FacturaBit.");
  }

  let result: ApiResponse<T> | undefined;
  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    // Una respuesta de infraestructura puede no incluir JSON.
  }

  if (!response.ok || !result?.success || result.data == null) {
    throw new Error(result?.mensaje ?? "No fue posible completar la operación.");
  }

  return result.data;
}

export function getApiClients(signal?: AbortSignal) {
  return authorizedRequest<ApiClient[]>("/api/integraciones", { signal });
}

export function createApiClient(nombre: string) {
  return authorizedRequest<CreatedApiClient>("/api/integraciones", {
    method: "POST",
    body: JSON.stringify({ nombre, scopes: ["cfdi.emit", "cfdi.status"] }),
  });
}

export function revokeApiClient(guid: string) {
  return authorizedRequest<boolean>(`/api/integraciones/${encodeURIComponent(guid)}`, {
    method: "DELETE",
  });
}
