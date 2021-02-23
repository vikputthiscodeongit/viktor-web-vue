<template>
  <section class="site-section">
    <div class="container grid">
      <div class="media aspect-ratio aspect-ratio--square">
        <div class="content">
          <img src="https://via.placeholder.com/480x480" alt="">
        </div>
      </div>

      <div class="title">
        <h1>Lorem ipsum dolor sit amet</h1>
      </div>

      <div class="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare cursus orci in iaculis. Pellentesque aliquam, nunc eu porttitor suscipit, urna velit rhoncus metus, eget iaculis massa lorem et justo. Curabitur auctor erat nec orci venenatis vulputate. Proin ac turpis mattis, sodales nisi iaculis, lobortis est. In hac habitasse platea dictumst. Mauris at tellus convallis, eleifend tortor ut, hendrerit turpis. Suspendisse ultrices lacus nulla, at mattis urna sagittis sed. Aenean tellus mauris, mattis ut sagittis vitae, ultricies interdum turpis. Morbi tempor semper lectus. In vehicula sapien odio, quis luctus ante molestie ultricies. Donec convallis nibh quis metus faucibus elementum. Donec eu est varius, fringilla purus quis, luctus mauris. In hac habitasse platea dictumst.</p>
        <p>Vestibulum convallis tortor nec consectetur tempor. Praesent a nunc nec ipsum fermentum rhoncus sed a nulla. Vestibulum vulputate orci nec mi ultricies, sed vehicula quam semper. Suspendisse a augue erat. Vivamus vel tincidunt odio. Aliquam ut nulla ac massa venenatis posuere. Nullam vulputate gravida turpis, sit amet vulputate ex hendrerit at. Aenean varius justo et sapien dapibus, vel tincidunt urna molestie. Praesent fringilla odio consectetur, tincidunt eros vel, bibendum sem. Integer non gravida lorem, eleifend vulputate sem.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // nuxtI18n: {
  //   paths: {
  //     nl: "/over-mij",
  //     en: "/about"
  //   }
  // }
};
</script>

<style lang="scss">
@import "~/assets/scss/utilities/aspect-ratio";

.grid {
  grid-template-columns: repeat(12, minmax(10px, 1fr));

  @include respond-above(md) {
    grid-template-rows: rem(200px) repeat(2, auto);
  }

  @include respond-above(lg) {
    grid-template-rows: rem(250px) repeat(2, auto);
  }

  @include respond-above(xxl) {
    grid-template-rows: rem(300px) repeat(2, auto);
  }
}

.media {
  grid-column: 1 / span 12;

  @include respond-below(md) {
    margin-bottom: rem(40px);
  }

  @include respond-above(md) {
    grid-column: 1 / span 7;
    grid-row: 1 / span 3;
  }

  @include respond-above(lg) {
    grid-column: 1 / span 6;
  }
}

.title,
.text {
  grid-column: 1 / span 12;

  @include respond-above(md) {
    position: relative;
    z-index: 1;
    grid-column: 5 / span 8;
  }

  @include respond-above(lg) {
    grid-column: 5 / span 6;
  }

  @include respond-above(xl) {
    grid-column: 6 / span 5;
  }
}

.title {
  @include respond-above(md) {
    grid-row: 2;
  }
}

.text {
  @include respond-above(md) {
    grid-row: 3;
  }
}
</style>
