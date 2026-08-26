export interface CommercialNetworkSession {
  guid: string;
  nombreRedComercial: string;
}

export interface AuthSession {
  token: string;
  expiresAt: string;
  accountGuid: string;
  redComercial: CommercialNetworkSession;
  email: string;
  fullName: string;
  rol: string;
  requiereCambioPassword: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  mensaje?: string | null;
  httpCode: number;
  data?: T | null;
}

const SESSION_KEY = "facturabit.auth.session";
const apiUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:5159").replace(
  /\/$/,
  "",
);

export async function login(email: string, password: string): Promise<AuthSession> {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(
      "No fue posible comunicarse con FacturaBit. Verifica que el servicio esté disponible.",
    );
  }

  let result: ApiResponse<AuthSession> | undefined;
  try {
    result = (await response.json()) as ApiResponse<AuthSession>;
  } catch {
    // Algunos errores de infraestructura pueden no contener un cuerpo JSON.
  }

  if (!response.ok || !result?.success || !result.data) {
    throw new Error(
      result?.mensaje ?? "No fue posible iniciar sesión. Inténtalo nuevamente.",
    );
  }

  return result.data;
}

export function saveSession(session: AuthSession, persistent = true) {
  clearSession();
  const storage = persistent ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    if (!session.token || new Date(session.expiresAt).getTime() <= Date.now()) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

