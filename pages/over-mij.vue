<template>
  <main class="site-main" id="about">
    <section class="site-section">
      <div class="container grid">
        <div class="media aspect-ratio aspect-ratio--square rellax">
          <div class="content">
            <img src="https://via.placeholder.com/480x480" alt="">
          </div>
        </div>

        <div class="texts rellax" data-rellax-speed="2" data-rellax-tablet-speed="4">
          <div class="title">
            <h1>Lorem ipsum dolor sit amet</h1>
          </div>

          <div class="text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare cursus orci in iaculis. Pellentesque aliquam, nunc eu porttitor suscipit, urna velit rhoncus metus, eget iaculis massa lorem et justo. Curabitur auctor erat nec orci venenatis vulputate. Proin ac turpis mattis, sodales nisi iaculis, lobortis est. In hac habitasse platea dictumst. Mauris at tellus convallis, eleifend tortor ut, hendrerit turpis.</p>
            <p>Suspendisse ultrices lacus nulla, at mattis urna sagittis sed. Aenean tellus mauris, mattis ut sagittis vitae, ultricies interdum turpis. Morbi tempor semper lectus. In vehicula sapien odio, quis luctus ante molestie ultricies. Donec convallis nibh quis metus faucibus elementum. Donec eu est varius, fringilla purus quis, luctus mauris. In hac habitasse platea dictumst.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Rellax from "rellax";

export default {
  // nuxtI18n: {
  //   paths: {
  //     nl: "/over-mij",
  //     en: "/about"
  //   }
  // }

  mounted() {
    this.parallax();
  },

  methods: {
    parallax() {
      new Rellax();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/utilities/aspect-ratio";

#about {
  .grid {
    @include respond-below(md) {
      grid-row-gap: rem(40px);
    }
  }

  .media,
  .texts {
    @include respond-above(md) {
      grid-row: 1;
    }
  }

  .media {
    grid-column: 1 / span 12;

    @include respond-above(xs) {
      grid-column: 2 / span 10;
    }

    @include respond-above(sm) {
      grid-column: 3 / span 8;
    }

    @include respond-above(md) {
      grid-column: 1 / span 7;
    }

    @include respond-above(lg) {
      grid-column: 2 / span 6;
    }
  }

  .texts {
    grid-column: 1 / span 12;

    @include respond-above(md) {
      position: relative;
      z-index: 1;
      grid-column: 6 / span 7;
      margin-top: rem(200px);
    }

    @include respond-above(lg) {
      grid-column: 6 / span 6;
      margin-top: rem(250px)
    }
  }
}
</style>
