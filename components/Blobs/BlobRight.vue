<template>
  <div class="blob blob--right">
    <img :src="require('~/assets/blobs/blob-2.svg')" alt="">
  </div>
</template>

<script>
export default {
  name: "BlobRight"
};
</script>

<style lang="scss">
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
</style>
