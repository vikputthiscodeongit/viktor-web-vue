<template>
  <div class="blob blob--left">
    <img :src="require('~/assets/blobs/blob-1.svg')" alt="">
  </div>
</template>

<script>
export default {
  name: "BlobLeft"
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

  &--left {
    bottom: rem(-120px);
    left: rem(-190px);

    @media (min-width: 1200px) and (min-height: 720px) {
      left: rem(-288px);
    }
  }
}
</style>
