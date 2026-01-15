const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const hasBody = response.status !== 204;

  const parseBody = async () => {
    if (!hasBody) {
      return undefined;
    }
    const text = await response.text();
    if (!text) {
      return undefined;
    }
    if (isJson) {
      return JSON.parse(text);
    }
    return text;
  };

  if (!response.ok) {
    let message = `HTTP error ${response.status}`;
    try {
      const data = await parseBody();
      if (data && typeof data === 'object' && 'message' in data) {
        message = String((data as { message?: unknown }).message ?? message);
      } else if (typeof data === 'string') {
        message = data || message;
      }
    } catch {
      // Keep default message when response body is not JSON.
    }
    throw new Error(message);
  }

  return (await parseBody()) as T;
}
