import { getAccessToken } from "../auth/get-access-token"

export async function backendFetch(
  path: string,
  options?: RequestInit
) {

  const token = await getAccessToken()

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}