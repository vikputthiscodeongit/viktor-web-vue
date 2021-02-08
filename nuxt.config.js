export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Viktor Chin",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "Chin, Kon, Sung, Chin-Kon-Sung"
      },
      {
        hid: "description",
        name: "description",
        content: "Viktor Chin, a man who's very keen on motorised vehicles, nature, music, photography and many other things. By the way, I also build websites :)."
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/scss/bootstrap/bootstrap.scss"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/vue-formulate"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxtjs/style-resources"
  ],

  styleResources: {
    scss: [
      "sass-rem/_rem.scss",
      "bootstrap/scss/_functions.scss",
      "~/assets/scss/bootstrap/_variables.scss",
      "bootstrap/scss/_variables.scss",
      "bootstrap/scss/_mixins.scss",
      "~/assets/scss/mixins/mixins.scss"
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-i18n"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "https://cms.viktorchin.nl"
  },

  pwa: {
    icon: {
      sizes: [ 192, 512 ]
    }
  },

  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "nl",
    detectBrowserLanguage: {
      alwaysRedirect: true, // I probably want to revert this setting to default on live.
      onlyOnNoPrefix: true,
      cookieKey: "site_language"
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
