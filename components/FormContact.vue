<template>
  <!-- <FormulateForm
    :schema="formGroups"
  /> -->

  <FormulateForm
    :schema="formSchema"
  />
</template>

<script>
export default {
  name: "FormContact",

  data() {
    return {
      formGroups: [],

      formSchema: [
        {
          type: "group",
          children: [
            {
              label: "Naam",
              name: "name",
              type: "text",
              placeholder: "Peter Beuk",
              validation: "optional",
              outerClass: [ "formulate-input--ifl" ]
            },
            {
              label: "E-mailadres *",
              name: "email",
              type: "email",
              placeholder: "emailadres@voorbeeld.nl",
              validation: "^required|email|max:128",
              outerClass: [ "formulate-input--ifl" ]
            }
          ]
        },
        {
          type: "group",
          children: [
            {
              label: "Onderwerp *",
              name: "subject",
              type: "text",
              placeholder: "Ik wil het met je hebben over...",
              validation: "^required|max:128",
              outerClass: [ "formulate-input--ifl" ]
            },
            {
              label: "Bericht *",
              name: "message",
              type: "textarea",
              placeholder: "Wat een mooie website dit is. Wow, echt leuk. Super tof. Bla bla, die bla bloep.",
              rows: 8,
              validation: "^required|min:16",
              outerClass: [ "formulate-input--ifl" ]
            }
          ]
        },
        {
          type: "group",
          children: [
            {
              label: "Verstuur bericht",
              type: "submit"
            }
          ]
        }
      ]
    };
  },

  mounted() {
    // this.makeForm();
  },

  methods: {
    makeForm() {
      const endpoint = "/api/singletons/get/form_contact?token=7c4ceaf1719a244f87bd8710de20cb";

      this.processFormData(endpoint);
    },

    async processFormData(endpoint) {
      try {
        const response = await this.$axios.$get(endpoint);

        const groupsObj = response.groups;
        const groupsArr = groupsObj.group;

        groupsArr.forEach((groupObj, i) => {
          const groupIndex = i;
          let lastGroup = false;

          if (groupIndex + 1 === groupsArr.length) {
            lastGroup = true;
          }

          const groupArr = groupObj.value;

          groupArr.forEach((fieldObj, i) => {
            const fieldIndex = i;
            let lastEntry = false;

            if (lastGroup && fieldIndex + 1 === groupArr.length) {
              lastEntry = true;
            }

            this.generateFormFieldData(fieldObj, groupIndex, fieldIndex, lastEntry);
          });
        });
      } catch(error) {
        console.log(error);
      }
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
        outerClass: [ `formulate-input--${label.type}` ],
        label: label.text,
        type: input.type,
        name: input.name,
        placeholder: input.placeholder,
        validation: "optional|"
      };

      if (input.type === "textarea") {
        field.rows = 8;
      }

      if (input.required) {
        field.label += " *";

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
.formulate-form {
  margin-top: rem(30px);

  @include respond-above(md) {
    margin-top: rem(40px);
  }
}

.formulate-input {
  position: relative;
  max-width: rem(640px);

  @include respond-above(xl) {
    max-width: rem(800px);
  }

  @include respond-above(xxl) {
    max-width: rem(880px);
  }

  &[data-type="group"] {
    margin-top: rem(30px);

    @include respond-above(md) {
      margin-top: rem(40px);
    }

    &:first-child {
      margin-top: 0;
    }
  }

  & + &:not([data-type="group"]) {
    margin-top: rem(20px);

    @include respond-above(md) {
      margin-top: rem(30px);
    }

    &:first-child {
      margin-top: 0;
    }
  }

  &-wrapper {
    .formulate-input--ifl > & {
      position: relative;
    }

    .formulate-input--inline > & {
      display: flex;
      align-items: center;
    }
  }
}

label {
  display: block;
  font-family: $headings-font-family;
  font-weight: $headings-font-weight;

  .formulate-input--ifl > .formulate-input-wrapper > & {
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

  .formulate-input--inline > .formulate-input-wrapper > & {
    flex-shrink: 0;
    margin-bottom: 0;
    margin-right: rem(8px);
  }
}

.formulate-input-element {
  // Input types that preferably should not be targeted, but are with the current selector: button, checkbox, color, file, hidden, image, radio, range, reset & submit.
  > input,
  > textarea {
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

      .formulate-input[data-has-value]:not([data-has-errors]) > .formulate-input-wrapper > & {
        border-color: $success;
      }
    }

    .formulate-input[data-is-showing-errors] > .formulate-input-wrapper > & {
      border-color: $warning;
    }

    .formulate-input--ifl > .formulate-input-wrapper > & {
      padding-top: rem(31px);
      padding-bottom: rem(8px);
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

  > input {
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

    .formulate-input--ifl > .formulate-input-wrapper > & {
      height: rem(69px); // Setting a fixed height is sadly the only way to guarantee consistent appearance across browsers.
    }

    .formulate-input--inline > .formulate-input-wrapper > & {
      &[type="number"],
      &[inputmode="numeric"] {
        width: rem(64px);
      }
    }
  }

  > textarea {
    display: block;
  }

  > button {
    display: inline-flex;
    align-items: center;
    padding: $btn-padding-y $btn-padding-x;
    text-decoration: none;
    font: $btn-font-weight $btn-font-size/$btn-line-height $btn-font-family;
    color: $white;
    background-color: $blue;
    border: none;
    border-radius: $btn-border-radius;
    transition: $btn-transition;
    transition-property: background-color, box-shadow;

    @include respond-below(xs) {
      justify-content: center;
      width: 100%;
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
}

.formulate-input-errors {
  @include sr-only();
}
</style>
