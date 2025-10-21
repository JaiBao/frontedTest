import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const instance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 15000,
  })
  instance.interceptors.request.use((cfg: InternalAxiosRequestConfig) => cfg)
  instance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => Promise.reject(error)
  )
  return { provide: { axios: instance } }
})
