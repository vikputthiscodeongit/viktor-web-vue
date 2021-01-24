<template>
  <FormulateForm
    :schema="formGroups"
  />
</template>

<script>
export default {
  name: "FormContact",

  data() {
    return {
      formGroups: []
    }
  },

  mounted() {
    this.generateFormGroupsData();
    console.log(this.formGroups);
  },

  methods: {
    generateFormGroupsData() {
      const endpoint = "/api/singletons/get/form_contact?token=7c4ceaf1719a244f87bd8710de20cb";

      this.$axios.$get(endpoint)
        .then((response) => {
          // console.log(response);

          const groupsObj = response.groups;
          const groupsArr = groupsObj.group;

          groupsArr.forEach((groupObj) => {
            const groupIndex = groupsArr.indexOf(groupObj);
            let lastGroup = false;

            if (groupIndex === groupsArr.length - 1) {
              lastGroup = true;
            }

            const groupArr = groupObj.value;

            groupArr.forEach((fieldObj) => {
              const fieldIndex = groupArr.indexOf(fieldObj);
              let lastEntry = false;

              if (lastGroup && fieldIndex === groupArr.length - 1) {
                lastEntry = true;
              }

              this.generateFormFieldData(fieldObj, groupIndex, fieldIndex, lastEntry);
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    generateFormFieldData(fieldObj, groupIndex, fieldIndex, lastEntry) {
      if (fieldIndex === 0) {
        this.$set(this.formGroups, groupIndex, {
          type: "group",
          children: []
        });
      }

      const label = fieldObj.value.label;
      const input = fieldObj.value.input;

      const field = {
        label: label.text,
        type: input.type,
        name: input.name,
        placeholder: input.placeholder,
        validation: "optional|"
      };

      if (input.required) {
        field.validation = "^required|";

        if (input.type === "email") {
          field.validation += "email|";
        }
      }

      if (input.minlength !== null) {
        field.validation += `min:${input.minlength}|`;
      }

      if (input.maxlength !== null) {
        field.validation += `max:${input.maxlength}|`;
      }

      field.validation = field.validation.slice(0, -1); // Remove the last |.

      this.$set(this.formGroups[groupIndex].children, fieldIndex, field);

      if (lastEntry) {
        this.$set(this.formGroups, [groupIndex + 1], {
          type: "group",
          children: [
            {
              label: "Send message",
              type: "submit"
            }
          ]
        });
      }
    }
  }
};
</script>

<style lang="scss">
.form {
  margin-top: rem(30px);

  @include respond-above(md) {
    margin-top: rem(40px);
  }

  &__group {
    margin-top: rem(30px);

    @include respond-above(md) {
      margin-top: rem(40px);
    }

    &:first-child,
    &.first-of-class {
      margin-top: 0;
    }
  }
}

.field {
  max-width: $input-max-width;

  @include respond-above(xl) {
    max-width: $input-xl-max-width;
  }

  @include respond-above(xxl) {
    max-width: $input-xxl-max-width;
  }

  &--ifl {
    position: relative;
  }

  &--inline {
    display: flex;
    align-items: center;
  }

  .form__group & {
    margin-top: rem(20px);

    @include respond-above(md) {
      margin-top: rem(30px);
    }

    &:first-child {
      margin-top: 0;
    }
  }
}

label {
  display: block;
  font-family: $headings-font-family;
  font-weight: $headings-font-weight;

  .field--ifl & {
    position: absolute;
    top: rem(2px);
    left: rem(2px);
    right: rem(2px);
    z-index: 1;
    margin-bottom: 0;
    padding: rem(13px) rem(12px) rem(5px);
    line-height: 1;
    font-size: rem(13px);
    font-weight: $font-weight-base;
    color: $blue;
    background-color: $off-white-dark;
    border-top-left-radius: rem(4px);
    border-top-right-radius: rem(4px);

    @media (prefers-contrast: high) {
      background-color: $white;
    }
  }

  .field--inline & {
    flex-shrink: 0;
    margin-bottom: 0;
  }
}

// Input types that preferable should not be targeted, but are with the current selector: button, checkbox, color, file, hidden, image, radio, range, reset & submit.
input,
textarea {
  width: 100%;
  padding: rem(12px);
  line-height: $line-height-base;
  font-size: $font-size-base;
  background-color: $off-white-dark;
  border: rem(2px) solid $off-white-dark;
  border-radius: rem(4px);
  transition: border-color $transition-base;

  @media (prefers-contrast: high) {
    background-color: $white;
    border-color: $black;
  }

  &:focus {
    border-color: $blue;
    outline: none;

    .field.is-valid & {
      border-color: $success;
    }
  }

  .form.invalid .field.is-invalid & {
    border-color: $warning;
  }

  .field--ifl & {
    padding-top: rem(31px);
    padding-bottom: rem(8px);
  }

  .field--inline label + & {
    margin-left: rem(8px);
  }

  //
  // Input placeholder styling
  &::-webkit-input-placeholder {
    color: $gray;
  }

  &::-moz-placeholder {
    color: $gray;
  }

  &:-ms-input-placeholder {
    color: $gray;
  }

  &::placeholder {
    color: $gray;
  }
}

input {
  &[type="checkbox"],
  &[type="radio"] {
    width: auto;
  }

  //
  // Reset default :invalid styles.
  // General (IE, maybe more)
  &:invalid {
    outline: none;
  }

  // Gecko
  &:-moz-ui-invalid {
    box-shadow: none;
  }

  //
  // Autocomplete styling for WebKit-based browsers.
  &:-webkit-autofill,
  &:-internal-autofill-selected {
    box-shadow: 0 0 0 1000px $off-white-dark inset; // Equalling <input> height should suffice?

    @media (prefers-contrast: high) {
      box-shadow: 0 0 0 1000px $white inset;
    }
  }

  .field--ifl & {
    height: rem(69px); // Setting a fixed height is sadly the only way to guarantee consistent appearance across browsers.
  }

  .field--inline & {
    &[type="number"],
    &[inputmode="numeric"] {
      width: rem(64px);
    }
  }
}

textarea {
  display: block;
}

.btn {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: $btn-padding-y $btn-padding-x;
  text-decoration: none;
  font: $btn-font-weight $btn-font-size/$btn-line-height $btn-font-family;
  color: $white;
  background-color: $blue;
  border: none;
  border-radius: $btn-border-radius;
  transition: $btn-transition;
  transition-property: background-color, box-shadow;

  @include respond-above(xs) {
    width: auto;
  }

  &:hover {
    &:not(:disabled) {
      background-color: darken($blue, 5%);
    }

    &:disabled {
      cursor: default;
    }
  }

  &:focus {
    box-shadow: 0 0 rem(8px) rem(2px) rgba(0, 0, 0, 0.2);
    outline: none;
  }

  &__spinner {
    margin-left: rem(8px);

    .btn:not(.is-submitting) & {
      display: none;
    }
  }
}
</style>
