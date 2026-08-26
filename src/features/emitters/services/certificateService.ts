import { getSession } from "../../auth/services/authService";

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  data?: T | null;
}

export interface CertificateInfo {
  archivo: string;
  archivoKey: string;
  certificadoValido: boolean;
  sujeto: string;
  emisor: string;
  validoDesde: string;
  validoHasta: string;
  tamanoClave?: number | null;
  numeroSerie: string;
  huellaDigital: string;
}

export interface DigitalCertificateRecord {
  id: number;
  archivoCer: string;
  archivoKey: string;
  validoDesde: string;
  validoHasta: string;
  tamanoClave: number;
  numeroSerie: string;
  huellaDigital: string;
  estado: "Vigente" | "Próximo" | "Vencido";
  vigente: boolean;
}

const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(/\/$/, "");

export async function uploadDigitalCertificate(
  rfc: string,
  certificate: File,
  privateKey: File,
  password: string,
): Promise<CertificateInfo> {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");

  const formData = new FormData();
  formData.append("certificado", certificate);
  formData.append("llave", privateKey);
  formData.append("password", password);

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/emisores/${encodeURIComponent(rfc)}/certificado`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  } catch {
    throw new Error("No fue posible comunicarse con FacturaBit.");
  }

  let result: ApiResponse<CertificateInfo> | undefined;
  try {
    result = (await response.json()) as ApiResponse<CertificateInfo>;
  } catch {
    // Una falla de infraestructura podría no contener JSON.
  }

  if (!response.ok || !result?.success || !result.data?.certificadoValido) {
    throw new Error(result?.mensaje ?? "No fue posible validar y guardar el certificado.");
  }

  return result.data;
}

export async function getDigitalCertificates(
  rfc: string,
  signal?: AbortSignal,
): Promise<DigitalCertificateRecord[]> {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/emisores/${encodeURIComponent(rfc)}/certificados`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error("No fue posible consultar los certificados digitales.");
  }

  let result: ApiResponse<DigitalCertificateRecord[]> | undefined;
  try {
    result = (await response.json()) as ApiResponse<DigitalCertificateRecord[]>;
  } catch {
    // Una falla de infraestructura podría no contener JSON.
  }

  if (!response.ok || !result?.success || !result.data) {
    throw new Error(result?.mensaje ?? "No fue posible consultar los certificados digitales.");
  }
  return result.data;
}
