import { getStoredToken, clearAuthStorage } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  details: any;
  constructor(message: string, status: number, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  auth?: boolean;
  body?: any;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = true, headers, body, ...rest } = options;
  const token = getStoredToken();
  const requestHeaders = new Headers(headers);

  if (auth && token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const isFormData = body instanceof FormData;
  if (body && !isFormData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body && !isFormData && typeof body !== "string" ? JSON.stringify(body) : body,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthStorage();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message || "API Error", response.status, errorData);
  }

  if (response.status === 204) return {} as T;
  return response.json();
}
