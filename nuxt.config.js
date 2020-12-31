export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Viktor Chin',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Chin, Kon, Sung, Chin-Kon-Sung'
      },
      {
        hid: 'description',
        name: 'description',
        content: "Viktor Chin, a man who's very keen on motorised vehicles, nature, music, photography and many other things. By the way, I also build websites :)."
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/bootstrap/bootstrap.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      'sass-rem/_rem.scss',
      '~/assets/scss/bootstrap/_variables.scss', // I want the Bootstrap variables to be available even after the Bootstrap components & utilities have been built.
      '~/assets/scss/mixins/mixins.scss',
      '~/assets/scss/_variables.scss'
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://cms.viktorchin.nl'
  },

  bootstrapVue: {
    bootstrapCss: false,
    bootstrapVueCss: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
