import { authClient } from "./auth-client";

export function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const cookies = authClient.getCookie();

  const headers = {
    Cookie: cookies,
  } satisfies HeadersInit;

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
    credentials: "omit",
  });
}
