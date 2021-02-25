<template>
  <main class="site-main" id="home">
    <section class="site-section">
      <div class="container-fluid grid">
        <div class="home-title">
          <h1>
            <span>Viktor </span>
            <span>Chin</span>
          </h1>
        </div>

        <div class="about-strings-wrapper">
          <div class="about-strings about-strings--typed"></div>

          <div class="about-strings about-strings--static sr-only">
            <span
              v-for="string in aboutStrings"
              :key="string.id"
              v-text="string + ' '"
            />
          </div>
        </div>

        <div class="blob blob--1">
          <img :src="require('~/assets/blobs/blob-1.svg')" alt="">
        </div>

        <div class="blob blob--2">
          <img :src="require('~/assets/blobs/blob-2.svg')" alt="">
        </div>

        <div class="blob blob--3">
          <img :src="require('~/assets/blobs/blob-3.svg')" alt="">
        </div>

        <div class="blob blob--4">
          <img :src="require('~/assets/blobs/blob-4.svg')" alt="">
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TypeIt from "typeit";

export default {
  data() {
    return {
      aboutStrings: [
        "Homo sapiens",
        "Webdeveloper",
        "Autoliefhebber",
        "Hobbyfotograaf"
      ]
    }
  },

  mounted() {
    this.typeAboutStrings();
  },

  methods: {
    typeAboutStrings() {
      new TypeIt(".about-strings--typed", {
        speed: 75,
        deleteSpeed: 45,
        loop: true
      })
        // 1
        .type(this.aboutStrings[0], {delay: 2000})
        .delete(null, {delay: 1100})
        // 2
        .type("Webdevlo", {delay: 500})
        .move(-2, {speed: 150, delay: 500})
        .type("e", {delay: 500})
        .move(2, {speed: 100, delay: 500})
        .type("per", {delay: 2250})
        .delete(null, {delay: 1000})
        // 3
        .type(this.aboutStrings[2], {delay: 2000})
        .delete(null, {delay: 1000})
        // 4
        .type("Hobbu-", {delay: 1000})
        .delete(2, {delay: 550})
        .type("yfotograaf", {delay: 2400})
        .go();
    }
  }
};
</script>

<style lang="scss">
#home {
  .grid {
    grid-template-columns: repeat(12, minmax(10px, 1fr));
    grid-template-rows: repeat(3, 1fr);
    min-height: calc(100vh - #{rem(56px)} - (2 * #{rem(20px)}));

    @include respond-above(sm) {
      min-height: calc(100vh - #{rem(62px)} - #{rem(8px)} - (2 * #{rem(20px)}));
    }

    @media (min-height: 720px) {
      padding-top: 10vh;
      padding-bottom: 10vh;
    }
  }

  .home-title {
    grid-column: 3 / span 8;
    grid-row: 1;

    h1 {
      font-size: rem(44px);

      @include respond-above(md) {
        font-size: rem(52px);
      }

      @include respond-above(xl) {
        font-size: rem(72px);
      }
    }

    span {
      display: block;

      &:last-child {
        margin-left: 0.75em;
      }
    }
  }

  .about-strings {
    &-wrapper {
      grid-column: 4 / span 6;
      grid-row: 2;
    }

    &--typed {
      font-size: rem(22px);

      @include respond-above(md) {
        font-size: rem(26px);
      }

      @include respond-above(xl) {
        font-size: rem(36px);
      }
    }
  }

  .blob {
    position: absolute;
  }
}
</style>
