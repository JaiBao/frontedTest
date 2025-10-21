import axios from 'axios'

export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()
  const res = await axios.get(`${apiBase}/api/user`, { validateStatus: () => true })

  const payload = res.data
  const users = Array.isArray(payload) ? payload : (payload?.data ?? [])

  setResponseStatus(event, res.status)
  return users
})
