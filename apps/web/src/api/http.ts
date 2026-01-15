const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    let message = `HTTP error ${response.status}`;
    try {
      const data = await response.json();
      if (data && typeof data === 'object' && 'message' in data) {
        message = String((data as { message?: unknown }).message ?? message);
      } else {
        message = JSON.stringify(data);
      }
    } catch {
      // Keep default message when response body is not JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
