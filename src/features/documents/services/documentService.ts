import { getSession } from "../../auth/services/authService";

interface ApiResponse<T> { success: boolean; mensaje?: string | null; data?: T | null; }

export interface DocumentIssuer { guid: string; rfc: string; razonSocial: string; nombreComercial?: string | null; }
export interface FiscalDocumentRecord {
  guid: string;
  folio: string;
  serie?: string | null;
  receptorRfc: string;
  receptorNombre: string;
  total: number;
  tipo: string;
  estatus: string;
  mensaje: string;
  folioFiscal?: string | null;
  fecha: string;
  pathXmlCfdi?: string | null;
  emisor: DocumentIssuer;
}
export interface FiscalDocumentsPage { items: FiscalDocumentRecord[]; pagina: number; tamanoPagina: number; totalRegistros: number; totalPaginas: number; }
export interface DocumentQuery { emisorGuid?: string; busqueda?: string; estatus?: string; pagina?: number; tamanoPagina?: number; signal?: AbortSignal; }
export interface FiscalDocumentXml { comprobanteGuid: string; nombreArchivo: string; contenido: string; }

const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(/\/$/, "");

export async function getFiscalDocuments(query: DocumentQuery = {}) {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
  const params = new URLSearchParams();
  if (query.emisorGuid) params.set("emisorGuid", query.emisorGuid);
  if (query.busqueda) params.set("busqueda", query.busqueda);
  if (query.estatus) params.set("estatus", query.estatus);
  params.set("pagina", String(query.pagina ?? 1));
  params.set("tamanoPagina", String(query.tamanoPagina ?? 20));

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/comprobantes?${params}`, { signal: query.signal, headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error("No fue posible comunicarse con FacturaBit.");
  }
  const result = await response.json().catch(() => undefined) as ApiResponse<FiscalDocumentsPage> | undefined;
  if (!response.ok || !result?.success || !result.data) throw new Error(result?.mensaje ?? "No fue posible consultar los comprobantes.");
  return result.data;
}

export async function getFiscalDocumentXml(guid: string, signal?: AbortSignal) {
  const token = getSession()?.token;
  if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/comprobantes/${encodeURIComponent(guid)}/xml`, { signal, headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error("No fue posible comunicarse con FacturaBit.");
  }
  const result = await response.json().catch(() => undefined) as ApiResponse<FiscalDocumentXml> | undefined;
  if (!response.ok || !result?.success || !result.data) throw new Error(result?.mensaje ?? "No fue posible consultar el XML.");
  return result.data;
}
