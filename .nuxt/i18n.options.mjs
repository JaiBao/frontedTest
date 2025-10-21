
// @ts-nocheck


export const localeCodes =  [
  "zh-TW",
  "en-US"
]

export const localeLoaders = {
  "zh-TW": [
    {
      key: "locale_tw_46json_41cfeb64",
      load: () => import("#nuxt-i18n/41cfeb64" /* webpackChunkName: "locale_tw_46json_41cfeb64" */),
      cache: true
    }
  ],
  "en-US": [
    {
      key: "locale_en_46json_3b5bb42c",
      load: () => import("#nuxt-i18n/3b5bb42c" /* webpackChunkName: "locale_en_46json_3b5bb42c" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: true
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "zh-TW",
      language: "zh-TW",
      name: "繁體中文",
      files: [
        {
          path: "C:/Users/onlin/Desktop/code/test/frontedTest/i18n/language/tw.json",
          cache: undefined
        }
      ]
    },
    {
      code: "en-US",
      language: "en-US",
      name: "English",
      files: [
        {
          path: "C:/Users/onlin/Desktop/code/test/frontedTest/i18n/language/en.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "zh-TW",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: true,
  langDir: "language/",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: true,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "i18n_redirected",
    cookieSecure: false,
    fallbackLocale: "zh-TW",
    redirectOn: "root",
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "zh-TW",
    language: "zh-TW",
    name: "繁體中文",
    files: [
      {
        path: "C:/Users/onlin/Desktop/code/test/frontedTest/i18n/language/tw.json",
        cache: undefined
      }
    ]
  },
  {
    code: "en-US",
    language: "en-US",
    name: "English",
    files: [
      {
        path: "C:/Users/onlin/Desktop/code/test/frontedTest/i18n/language/en.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../i18n/language/tw.json", async mod => {
    localeLoaders["zh-TW"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("zh-TW")
  })

  import.meta.hot.accept("../i18n/language/en.json", async mod => {
    localeLoaders["en-US"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en-US")
  })



}
/** client-end **/