<template>
  <header class="site-header" id="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li
            v-bind:key="navItem.id"
            v-for="navItem in navItems"
          >
            <a class="site-navigation__link" href="#" target="_self">
              <span class="site-navigation__icon">
                <img src="#" alt="">
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
  name: "Header",

  data() {
    return {
      navItems: []
    }
  },

  mounted() {
    this.axios
      .get("http://viktor-cms.local/api/singletons/get/site_menu?token=4392f66d425f4a9210e31f5a58a753")
      .then(response => {
        console.log(response);

        const data = response.data;

        const navItemsArray = data.items;

        navItemsArray.forEach(navItemArray => {
          const navItem = navItemArray.value;

          this.navItems.push(navItem);
        });

        console.log(this.navItems);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {

  },

  computed: {

  }
}
</script>
