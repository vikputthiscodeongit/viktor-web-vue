<template>
  <main class="site-main" id="contact">
    <section class="site-section">
      <div class="container grid">
        <div class="title">
          <h1>Lorem ipsum dolor sit amet</h1>
        </div>

        <div class="text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare cursus orci in iaculis. Pellentesque aliquam, nunc eu porttitor suscipit, urna velit rhoncus metus, eget iaculis massa lorem et justo.</p>
        </div>

        <FormContact />
      </div>
    </section>
  </main>
</template>

<style lang="scss">
#contact {
  .grid > * {
    grid-column: 1 / span 12;

    @include respond-above(md) {
      grid-column: 2 / span 10;
    }
  }

  .title {
    grid-row: 1;
  }

  .text {
    grid-row: 2;
  }

  .formulate-form {
    grid-row: 3;
  }
}
</style>
