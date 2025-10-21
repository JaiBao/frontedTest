import axios from 'axios'

export default defineEventHandler(async (event) => {
  const { apiTarget } = useRuntimeConfig()
  const res = await axios.get(`${apiTarget}/api/user`, { validateStatus: () => true })

  const payload = res.data
  const users = Array.isArray(payload) ? payload : (payload?.data ?? [])

  setResponseStatus(event, res.status)
  return users
})
