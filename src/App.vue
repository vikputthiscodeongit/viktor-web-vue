<template>
  <header class="site-header" id="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li class="site-navigation__button">
            <a class="site-navigation__link" href="http://viktor-personal-wp.local/" target="_self">
              <span class="site-navigation__icon">
                <img src="http://viktor-personal-wp.local/wp-content/uploads/teenyicons-icon-home-alt.svg" alt="">
              </span>

              <span class="site-navigation__title">
                <span>Home</span>
              </span>
            </a>
          </li>

          <li class="site-navigation__button">
            <a class="site-navigation__link" href="http://viktor-personal-wp.local/about/">
              <span class="site-navigation__icon">
                <img src="http://viktor-personal-wp.local/wp-content/uploads/teenyicons-icon-user-square.svg" alt="">
              </span>

              <span class="site-navigation__title">
                <span>Over mij</span>
              </span>
            </a>
          </li>

          <li class="site-navigation__button">
            <a class="site-navigation__link" href="http://viktor-personal-wp.local/contact/">
              <span class="site-navigation__icon">
                <img src="http://viktor-personal-wp.local/wp-content/uploads/teenyicons-icon-message-text-alt.svg" alt="">
              </span>

              <span class="site-navigation__title">
                <span>Contact</span>
              </span>
            </a>
          </li>

          <li class="site-navigation__button">
            <a class="site-navigation__link" href="http://viktor-personal-wp.local/website-settings/">
              <span class="site-navigation__icon">
                <img src="http://viktor-personal-wp.local/wp-content/uploads/teenyicons-icon-cog.svg" alt="">
              </span>

              <span class="site-navigation__title">
                <span>Instellingen</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
