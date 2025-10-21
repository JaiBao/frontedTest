type ApiEnvelope<T> = { code?: number; message?: string; data?: T }

export default defineEventHandler(async (event) => {
  const { apiTarget } = useRuntimeConfig()

  try {
    const payload = await $fetch<ApiEnvelope<any[]>>(`${apiTarget}/api/user`, {
      method: 'GET',
    })

    const users = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : []

    setResponseStatus(event, 200)
    return users
  } catch (err: any) {
    console.error('[server/api/user.get] proxy error:', err?.status || err?.code || err)
    setResponseStatus(event, 502)
    return []
  }
})
