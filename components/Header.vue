<template>
  <header class="site-header">
    <div class="site-menu">
      <nav class="site-navigation">
        <ul class="site-navigation__buttons" aria-label="Pagina's">
          <li
            v-for="navItem in navItems"
            :key="navItem.id"
            class="site-navigation__button"
          >
            <NuxtLink
              :to="navItem.itemLink"
              class="site-navigation__link"
            >
              <span
                v-if="navItem.iconUrl !== null"
                class="site-navigation__icon"
              >
                <img
                  :src="navItem.iconUrl"
                  alt=""
                >
              </span>

              <span class="site-navigation__title">
                <span v-text="navItem.itemLabel" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import isEmpty from "lodash/isEmpty";

export default {
  name: "Header",

  data() {
    return {
      navItems: []
    };
  },

  created() {
    this.makeNav();
  },

  methods: {
    makeNav() {
      const endpoint = "/api/singletons/get/site_menu?token=7c4ceaf1719a244f87bd8710de20cb";

      this.getMenuData(endpoint);
    },

    async getMenuData(endpoint) {
      try {
        const response = await this.$axios.$get(endpoint);

        const menuItems = response.items;

        menuItems.forEach((menuItem, i) => {
          const menuItemIndex = i;

          this.getSingletonData(menuItem, menuItemIndex);
        });
      } catch(error) {
        console.log(error);
      }
    },

    async getSingletonData(menuItem, menuItemIndex) {
      try {
        const menuItemLabel = menuItem.value.label;
        const singletonName = menuItem.value.singleton_name;

        const endpoint = `/api/singletons/get/${singletonName}?token=7c4ceaf1719a244f87bd8710de20cb`;

        const response = await this.$axios.get(endpoint);
        console.log(response);

        let singletonAttrs = response.data.attributes;

        if (this.$i18n.locale !== this.$i18n.defaultLocale) {
          singletonAttrs = `response.data.attributes_${this.$i18n.locale}`;
        }

        this.makeNavItem(singletonAttrs, menuItemIndex, menuItemLabel);
      } catch(error) {
        console.log(error);
      }
    },

    makeNavItem(singletonAttrs, menuItemIndex, menuItemLabel) {
      try {
        const iconUrl = isEmpty(singletonAttrs.icon.path)
          ? null
          : `${this.$axios.defaults.baseURL}/${singletonAttrs.icon.path}`;

        const itemLabel = isEmpty(menuItemLabel)
          ? singletonAttrs.title
          : menuItemLabel;

        let itemLink = isEmpty(singletonAttrs.slug)
          ? null
          : `/${singletonAttrs.slug}`;

        if (itemLink === "/home") {
          itemLink = "/";
        }

        const item = {
          iconUrl,
          itemLabel,
          itemLink
        };

        this.navItems.splice(menuItemIndex, 0, item);
      } catch(error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.site-header {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  height: rem(56px);
  background-color: $white;
  box-shadow: 0 0 rem(5px) 0 rgba(0, 0, 0, 0.25);

  @include respond-above(sm) {
    bottom: rem(8px);
    left: 50%;
    width: rem(480px);
    height: rem(62px);
    border-radius: rem(6px);
    box-shadow: 0 0 rem(6px) rem(1px) rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
  }

  @include respond-above(md) {
    width: rem(540px);
  }

  @include respond-above(xl) {
    width: rem(640px);
  }
}

.site-menu {
  display: flex;
  justify-content: center;

  .site-header > & {
    height: 100%;
  }
}

.site-navigation {
  &__buttons {
    display: flex;
    height: 100%;
    margin-bottom: 0;
    padding-left: 0;
  }

  &__button {
    width: rem(72px);
    list-style: none;

    @include respond-above(sm) {
      width: rem(80px);
    }

    @include respond-above(md) {
      width: rem(88px);
    }
  }

  &__link {
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center; // Not setting align-items causes erroneous alignment in IE11.
    width: 100%;
    height: 100%;
    padding-top: rem(2px);
    opacity: 0.4;
    text-align: center;
    text-decoration: none;
    color: $body-color;
    transition: $transition-base;
    transition-property: opacity, color;

    @include respond-above(sm) {
      padding-top: rem(4px);
    }

    &:hover,
    &:focus,
    &[aria-current="page"] {
      opacity: 1;
    }

    &:hover,
    &:focus {
      color: $body-color;
    }

    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline-offset: 0;
    }

    &[aria-current="page"] {
      color: $primary;
    }

    &::after {
      $height: rem(1px);

      content: "";
      position: absolute;
      top: calc(100% - #{$height});
      left: 0;
      right: 0;
      display: inline-block;
      height: $height;
      opacity: 0;
      background-color: currentColor;
      transition: opacity $transition-base;

      @at-root .site-navigation__link:hover::after,
               .site-navigation__link[aria-current="page"]::after {
        opacity: 1;
      }
    }
  }

  &__icon,
  &__title {
    width: 100%;
  }

  &__title {
    font: $headings-font-weight 0.625rem/ 1.15 $headings-font-family;

    @include respond-above(sm) {
      font-size: rem(11px);
    }
  }

  &__icon {
    margin-bottom: rem(6px);
    height: rem(25px);

    @include respond-above(sm) {
      height: rem(30px);
      margin-bottom: rem(8px);
    }

    img {
      width: auto;
      height: 100%;
      vertical-align: baseline;
    }
  }
}
</style>
