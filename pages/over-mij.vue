<template>
  <section class="site-section">
    <div class="container grid">
      <div class="media aspect-ratio aspect-ratio--default">
        <div class="content">
          <img src="https://via.placeholder.com/480x480" alt="">
        </div>
      </div>

      <div class="title">
        <h1>
          <!-- Title -->
        </h1>
      </div>

      <div class="text">
        <!-- Text -->
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
}
</style>
