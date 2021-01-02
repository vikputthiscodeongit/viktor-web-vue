<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<style lang="scss">
body {
  min-width: $body-min-width;
  margin-left: auto;
  margin-right: auto;
  text-size-adjust: 100%;

  // TODO: DEZE MEDIA QUERY WORDT ONTERECHT GETRIGGERED OP MIJN LAPTOP IN CHROME (en mogelijk Firefox).
  @media (-webkit-min-device-pixel-ratio: 2) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

ol, ul {
  &:last-child {
    margin-bottom: 0;
  }
}

a {
  transition: $transition-base;
  transition-property: text-decoration-color, color, outline;

  &:focus {
    outline: rem(2px) solid currentColor; // Not defining outline-color as currentColor results in :focus outline-color equalling <body> color in IE.
    outline-offset: rem(2px);

    .using-mouse & {
      outline: none;
    }
  }
}

h1, .h1,
h2, .h2 {
  line-height: $headings-line-height;
  font-family: $headings-font-family;
  font-weight: $headings-font-weight;
}

h1, .h1 {
  font-size: $h1-font-size;
}

h2, .h2 {
  font-size: $h2-font-size;
}

.title {
  + * {
    margin-top: rem(24px);

    @include respond-above(md) {
      margin-top: rem(30px);
    }
  }

  .title + & {
    margin-top: rem(8px);

    @include respond-above(md) {
      margin-top: rem(12px);
    }
  }
}

p {
  &:last-child {
    margin-bottom: 0;
  }
}

.text {
  .text + &,
  .media + & {
    margin-top: rem(20px);

    @include respond-above(md) {
      margin-top: rem(24px);
    }
  }
}

// This code block is taken directly from Bootstrap 4.5.3's Grid component (_grid.scss).
.container,
.container-fluid {
  @include make-container();
}

@each $breakpoint, $container-max-width in $container-max-widths {
  .container-#{$breakpoint} {
    @extend .container-fluid;
  }

  @include media-breakpoint-up($breakpoint, $grid-breakpoints) {
    %responsive-container-#{$breakpoint} {
      max-width: $container-max-width;
    }

    $extend-breakpoint: true;

    @each $name, $width in $grid-breakpoints {
      @if ($extend-breakpoint) {
        .container#{breakpoint-infix($name, $grid-breakpoints)} {
          @extend %responsive-container-#{$breakpoint};
        }

        @if ($breakpoint == $name) {
          $extend-breakpoint: false;
        }
      }
    }
  }
}
//

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
</style>
