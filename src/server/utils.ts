import superjson from 'superjson'

export function superJsonResponse<T>(data: T, status: number = 200): Response {
  const serialized = superjson.stringify(data)
  return new Response(serialized, {
    status,
    headers: { 'Content-Type': 'application/superjson' },
  })
}
