<template>
  <div id="layout-components">
    <Header />

    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$el.addEventListener("mousedown", () => {
      this.$el.classList.add("using-mouse");
    });

    this.$el.addEventListener("keydown", () => {
      this.$el.classList.remove("using-mouse");
    });
  }
}
</script>

<style lang="scss">
body {
  min-width: rem(320px);
  margin-left: auto;
  margin-right: auto;
  text-size-adjust: 100%;
  scrollbar-width: thin;

  // TODO: DEZE MEDIA QUERY WORDT ONTERECHT GETRIGGERED OP MIJN LAPTOP IN CHROME (en mogelijk Firefox).
  // @media (-webkit-min-device-pixel-ratio: 2) {
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  // }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: $off-white-light;

    &-track {
      background-color: $off-white-light;
      border-radius: 100px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &-thumb {
      background-color: $gray-light;
      border-radius: 100px;
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
    }
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
  font-size: rem(28px);

  @include respond-above(md) {
    font-size: rem(32px);
  }

  @include respond-above(xl) {
    font-size: rem(38px);
  }
}

h2, .h2 {
  font-size: rem(24px);

  @include respond-above(md) {
    font-size: rem(26px);
  }

  @include respond-above(xl) {
    font-size: rem(30px);
  }
}

// .title {
//   + * {
//     margin-top: rem(24px);

//     @include respond-above(md) {
//       margin-top: rem(30px);
//     }
//   }

//   .title + & {
//     margin-top: rem(8px);

//     @include respond-above(md) {
//       margin-top: rem(12px);
//     }
//   }
// }

.title {
  margin-bottom: rem(24px);

  @include respond-above(md) {
    margin-bottom: rem(30px);
  }
}

p {
  &:last-child {
    margin-bottom: 0;
  }
}

// .text {
//   .text + &,
//   .media + & {
//     margin-top: rem(20px);

//     @include respond-above(md) {
//       margin-top: rem(24px);
//     }
//   }
// }

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

.grid {
  display: grid;
}

.site-main {
  position: relative;
  min-height: calc(100vh - #{rem(56px)});
  margin-bottom: rem(56px);
  padding-top: rem(20px);
  padding-bottom: rem(20px);

  @include respond-above(sm) {
    min-height: calc(100vh - (#{rem(62px)} + #{rem(8px)}));
    margin-bottom: rem(62px) + rem(8px);
  }
}
</style>
