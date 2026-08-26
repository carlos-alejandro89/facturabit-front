import { getSession } from "../../auth/services/authService";

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  data?: T | null;
}

export interface SatRegimenFiscal {
  id: number;
  guid: string;
  clave: string;
  nombre: string;
}

const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(/\/$/, "");

export async function getSatRegimenesFiscales(signal?: AbortSignal): Promise<SatRegimenFiscal[]> {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/sat/regimenes-fiscales`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error("No fue posible consultar el catálogo de regímenes fiscales.");
  }

  let result: ApiResponse<SatRegimenFiscal[]> | undefined;
  try {
    result = (await response.json()) as ApiResponse<SatRegimenFiscal[]>;
  } catch {
    // Una falla de infraestructura podría no contener JSON.
  }

  if (!response.ok || !result?.success || !result.data) {
    throw new Error(result?.mensaje ?? "No fue posible consultar los regímenes fiscales.");
  }

  return result.data;
}
