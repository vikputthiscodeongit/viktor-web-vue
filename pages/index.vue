<template>
  <section
    ref="sectionHome"
    class="site-section"
  >
    <div class="container-fluid grid">
      <div class="home-title">
        <h1>
          <span>Viktor</span>
          <span>Chin</span>
        </h1>
      </div>

      <div class="about-strings-wrapper">
        <div class="about-strings about-strings--typed"></div>

        <div class="about-strings about-strings--static sr-only">
          <span
            v-for="string in aboutStrings"
            :key="string.id"
          />
              v-text="string + ' '"
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
    this.setSiteSectionHeight();

    this.typeAboutStrings();
  },

  methods: {
    setSiteSectionHeight() {
      console.log(this.$refs);

      const main = this.$refs.siteMain;
      const mainHeight = `${main.getBoundingClientRect().height}px`;

      const sectionHome = this.$refs.sectionHome;

      sectionHome.style.height = mainHeight;
    },

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
.grid {
  grid-template-columns: repeat(12, minmax(10px, 1fr));
  // grid-template-rows: repeat(2, auto);
  grid-template-rows: 1fr auto 1fr;
  height: 100%;

  // @include respond-above(xl) {
  //   grid-row-gap: 15vh;
  // }

  @media (min-height: 720px) {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
}

.home-title {
  grid-row: 1;

  @include respond-above(xl) {
    grid-column: 3 / span 8;
  }

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
    grid-row: 2;

    @include respond-above(xl) {
      grid-column: 4 / span 7;
    }
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
</style>
