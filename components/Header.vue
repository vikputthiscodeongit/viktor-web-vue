<template>
  <header id="site-header" class="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li v-for="navItem in navItems" :key="navItem.id">
            <a class="site-navigation__link" href="#" target="_self">
              <span class="site-navigation__icon">
                <img src="#" alt="" />
              </span>

              <span class="site-navigation__title">
                <span v-text="navItem.page_name"></span>
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

  async fetch() {
    const request = await this.$axios.get(
      '/singletons/get/site_menu?token=4392f66d425f4a9210e31f5a58a753'
    )
    const data = request.data

    const navItems = data.items
    console.log(navItems)
  },

  data() {},

  computed: {},

  created() {},

  mounted() {},

  methods: {},
}
</script>
