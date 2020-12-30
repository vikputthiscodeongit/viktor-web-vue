<template>
  <header id="site-header" class="site-header">
    <div class="site-menu">
      {{ navItems }}

      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li v-for="navItem in navItems" :key="navItem.id">
            <a class="site-navigation__link" href="#" target="_self">
              <span class="site-navigation__icon">
                <img src="#" alt="" />
              </span>

              <span class="site-navigation__title">
                <span v-text="navItem.itemLabel"></span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

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
        '/singletons/get/site_menu?token=88dbdd6d5e5a0de6d44cd76e8418a0'

      await this.$axios
        .$get(endpoint)
        .then((response) => {
          const responseItems = response.items

          responseItems.forEach((responseItem) => {
            this.makeNavItem(responseItem)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async makeNavItem(responseItem) {
      const targetSingleton = responseItem.value.singleton_name

      const endpoint = `/singletons/get/${targetSingleton}?token=88dbdd6d5e5a0de6d44cd76e8418a0`

      await this.$axios
        .$get(endpoint)
        .then((response) => {
          const singletonAttrs = response.attributes
          console.log(singletonAttrs)

          let iconUrl = null

          if (
            singletonAttrs.icon.path !== '' &&
            typeof singletonAttrs.icon.path !== 'undefined'
          ) {
            iconUrl = singletonAttrs.icon.path
          }

          let itemLabel = null

          if (
            responseItem.value.label !== '' &&
            typeof responseItem.value.label !== 'undefined'
          ) {
            console.log('a')

            itemLabel = responseItem.value.label
          } else {
            console.log('b')

            itemLabel = singletonAttrs.title
          }

          let itemSlug = null

          if (
            singletonAttrs.slug !== '' &&
            typeof singletonAttrs.slug !== 'undefined'
          ) {
            itemSlug = singletonAttrs.slug
          }

          const item = {
            iconUrl,
            itemLabel,
            itemSlug,
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
