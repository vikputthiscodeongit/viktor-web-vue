<template>
  <main class="site-main" id="home">
    <section class="site-section">
      <div class="container grid">
        <div class="home-title">
          <h1>
            <span>Viktor </span>
            <span>Chin</span>
          </h1>
        </div>

        <div class="about-strings-wrapper">
          <div class="about-strings about-strings--typed" aria-hidden="true"></div>

          <div class="about-strings about-strings--static sr-only">
            <span
              v-for="string in aboutStrings"
              :key="string.id"
              v-text="string + ' '"
            />
          </div>
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
    this.typeStrings();
  },

  methods: {
    typeStrings() {
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
  @media (min-height: 600px) {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  @media (min-height: 1050px) {
    padding-top: 17.5vh;
    padding-bottom: 17.5vh;
  }

  .grid {
    grid-row-gap: rem(18px);

    @media (min-height: 480px) {
      grid-template-rows: repeat(3, 1fr);
      min-height: calc(100vh - #{rem(56px)} - (2 * #{rem(20px)}));

      @include respond-above(sm) {
        min-height: calc(100vh - #{rem(62px)} - #{rem(8px)} - (2 * #{rem(20px)}));
      }
    }

    @media (min-height: 600px) {
      min-height: calc(100vh - #{rem(56px)} - (2 * 10vh));

      @include respond-above(sm) {
        min-height: calc(100vh - #{rem(62px)} - #{rem(8px)} - (2 * 10vh));
      }

      @include respond-above(md) {
        grid-template-rows: unset;
        grid-row-gap: rem(48px);
        min-height: unset;
      }
    }

    @media (min-height: 720px) and (min-width: 1200px) {
      grid-row-gap-bottom: rem(56px);
    }

    @media (min-height: 1050px) {
      min-height: calc(100vh - #{rem(56px)} - (2 * 17.5vh));

      @include respond-above(sm) {
        min-height: calc(100vh - #{rem(62px)} - #{rem(8px)} - (2 * 17.5vh));
      }

      @include respond-above(md) {
        min-height: unset;
      }
    }
  }

  .home-title {
    grid-column: 1 / span 12;
    grid-row: 1;

    @include respond-above(xs) {
      grid-column: 2 / span 10;
    }

    @media (min-height: 480px) {
      align-self: flex-end;
    }

    @media (min-width: 768px) and (min-height: 600px) {
      align-self: unset;
    }

    h1 {
      font-size: rem(40px);

      @media (min-width: 768px) and (min-height: 600px) {
        font-size: rem(48px);
      }

      @media (min-width: 1200px) and (min-height: 720px) {
        font-size: rem(58px);
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
      grid-column: 2 / span 10;
      grid-row: 2;
      align-self: center;

      @include respond-above(xs) {
        grid-column: 3 / span 8;
      }

      @media (min-width: 768px) and (min-height: 600px) {
        align-self: unset;
      }
    }

    &--typed {
      font-size: rem(24px);

      @media (min-width: 768px) and (min-height: 600px) {
        font-size: rem(28px);
      }

      @media (min-width: 1200px) and (min-height: 720px) {
        font-size: rem(32px);
      }
    }
  }

  .blob {
    position: fixed;
    z-index: -1;
    opacity: 0.333333;
    width: rem(400px);

    @media (min-width: 992px) and (min-height: 600px) {
      width: rem(500px);
    }

    @media (min-width: 1200px) and (min-height: 720px) {
      width: rem(640px);
    }

    &--left {
      bottom: rem(-120px);
      left: rem(-190px);

      @media (min-width: 1200px) and (min-height: 720px) {
        left: rem(-288px);
      }
    }

    &--right {
      top: rem(-120px);
      right: rem(-180px);
      display: none;

      @media (min-width: 375px), (min-height: 400px) {
        display: block;
      }

      @media (min-width: 1200px) and (min-height: 720px) {
        top: rem(-144px);
      }
    }
  }
}
</style>
