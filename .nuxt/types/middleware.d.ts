import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = never
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.0_db0@0.3.2_eslint@9._qlvqzus7hrnjitf5sr4apyd3pi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}