<template>
  <header class="site-header" id="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li v-for="menuItem in menuItems">
            <a class="site-navigation__link" href="http://viktor-personal-wp.local/" target="_self">
              <span class="site-navigation__icon">
                <img src="http://viktor-personal-wp.local/wp-content/uploads/teenyicons-icon-home-alt.svg" alt="">
              </span>

              <span class="site-navigation__title">
                <span v-text="menuItem.value.page_name"></span>
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

    mounted() {
        const api = {
            url: "http://viktor-cms.local/api/",

            tokenParam: "?token=4392f66d425f4a9210e31f5a58a753"
        };

        this.axios
            .get(api.url + "singletons/get/site_menu" + api.tokenParam)
            .then(response => {
                const data = response.data;
                console.log(data)

                this.menuItems = data.items;
            })
            .catch(error => {
                console.log(error);
            });
    },

    data() {
        menuItems: null
    }
}
</script>
