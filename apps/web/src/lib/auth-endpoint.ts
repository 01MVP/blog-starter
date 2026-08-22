import "@tanstack/react-start/server-only";
import { auth } from "#/lib/auth";

export async function callAuthEndpoint(path: string, body: object, request: Request) {
  const url = new URL(path, request.url);
  const headers = new Headers(request.headers);
  headers.set("content-type", "application/json");

  return auth.handler(
    new Request(url, {
      body: JSON.stringify(body),
      headers,
      method: "POST",
    }),
  );
}

export async function readAuthPayload<TPayload>(response: Response) {
  try {
    return (await response.clone().json()) as TPayload;
  } catch {
    return null;
  }
}
