<template>
  <header id="site-header" class="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li v-for="navItem in navItems" :key="navItem.id">
            <NuxtLink :to="navItem.itemLink">
              <span
                v-if="navItem.iconUrl !== null"
                class="site-navigation__icon"
              >
                <img :src="navItem.iconUrl" alt="" />
              </span>

              <span class="site-navigation__title">
                <span v-text="navItem.itemLabel"></span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import myMixins from '~/plugins/mixins'

export default {
  name: 'Header',

  mixins: [myMixins],

  data() {
    return {
      navItems: [],
    }
  },

  created() {
    this.makeNav()
  },

  methods: {
    async makeNav() {
      const endpoint =
        '/api/singletons/get/site_menu?token=7c4ceaf1719a244f87bd8710de20cb'

      await this.$axios
        .$get(endpoint)
        .then((response) => {
          const resMenuItems = response.items

          resMenuItems.forEach((resMenuItem) => {
            this.makeNavItem(resMenuItem)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async makeNavItem(resMenuItem) {
      const menuItemAttrs = resMenuItem.value

      const targetSingleton = menuItemAttrs.singleton_name

      const endpoint = `/api/singletons/get/${targetSingleton}?token=7c4ceaf1719a244f87bd8710de20cb`

      await this.$axios
        .$get(endpoint)
        .then((response) => {
          const singletonAttrs = response.attributes

          const iconUrl = this.isEmpty(singletonAttrs.icon.path)
            ? null
            : `${this.$axios.defaults.baseURL}/${singletonAttrs.icon.path}`

          const itemLabel = this.isEmpty(menuItemAttrs.label)
            ? singletonAttrs.title
            : menuItemAttrs.label

          let itemLink = this.isEmpty(singletonAttrs.slug)
            ? null
            : `/${singletonAttrs.slug}`

          if (itemLink === '/home') {
            itemLink = '/'
          }

          const item = {
            iconUrl,
            itemLabel,
            itemLink,
          }

          this.navItems.push(item)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
