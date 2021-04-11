<template>
  <FormulateForm
    @submit="submitForm"
    name="form-contact"
  >
    <FormulateInput
      type="group"
      name="groupUserData"
    >
      <FormulateInput
        :outer-class="['formulate-input--ifl']"
        type="text"
        name="name"
        label="Naam"
        placeholder="Peter Beuk"
        validation="optional"
      />

      <FormulateInput
        :outer-class="['formulate-input--ifl']"
        type="email"
        name="email"
        label="E-mailadres *"
        placeholder="emailadres@voorbeeld.nl"
        validation="^required|email|max:128"
      />
    </FormulateInput>

    <FormulateInput
      type="group"
      name="groupMessageData"
    >
      <FormulateInput
        :outer-class="['formulate-input--ifl']"
        type="text"
        name="subject"
        label="Onderwerp *"
        placeholder="Ik wil het met je hebben over..."
        validation="^required|max:128"
      />

      <FormulateInput
        :outer-class="['formulate-input--ifl']"
        type="textarea"
        name="message"
        label="Bericht *"
        placeholder="Wat een mooie website dit is. Wow, echt leuk. Super tof. Bla bla, die bla bloep."
        rows="8"
        validation="^required|min:12"
      />
    </FormulateInput>

    <FormulateInput
      type="group"
      name="groupSubmitMessage"
    >
      <FormulateInput
        :outer-class="['formulate-input--inline', 'formulate-input--captcha-answer']"
        :label="this.captcha.addition"
        :validation-rules="{ correct: ({ value }) => Number(value) === this.captcha.numbers[2] }"
        type="text"
        name="captchaAnswer"
        inputmode="numeric"
        validation="^required|correct"
      />

      <FormulateInput
        type="submit"
        label="Verstuur bericht"
      />
    </FormulateInput>
  </FormulateForm>
</template>

<script>
export default {
  name: "FormContact",

  data() {
    return {
      captcha: {
        "numbers": [],
        "addition": "Loading maths..."
      }
    };
  },

  mounted() {
    this.generateAddition();
  },

  methods: {
    generateRandInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generateAddition() {
      const numbers = [];

      for (let i = 0; i < 2; i++) {
        const digit = this.generateRandInt(0, 10);
        numbers.push(digit);
      }

      const solution = numbers[0] + numbers[1];
      numbers.push(solution);

      this.captcha.numbers = numbers;

      const addition = `${numbers[0]} + ${numbers[1]} =`;

      this.captcha.addition = addition;
    },

    resetForm() {
      this.$formulate.reset("form-contact");

      this.$formulate.resetValidation("form-contact");

      this.generateAddition();
    },

    async submitForm(data, { $config: { emailJsServiceId, emailJsTemplateId, emailJsUserId, emailJsApiToken }}) {
      console.log("Form submit triggered.");

      try {
        const userData  = data.groupUserData[0];
        const userName  = userData.name;
        const userEmail = userData.email;
        const userId    = userName ? userName : userEmail;

        const msgData    = data.groupMessageData[0];
        const msgSubject = msgData.subject;
        const msgBody    = msgData.message;

        await this.$axios({
          method: "post",
          baseURL: false,
          url: "https://api.emailjs.com/api/v1.0/email/send",
          data: {
            service_id: emailJsServiceId,
            template_id: emailJsTemplateId,
            user_id: emailJsUserId,
            template_params: {
              userName,
              userEmail,
              userId,
              msgSubject,
              msgBody
            },
            accessToken: emailJsApiToken
          }
        });

        console.log("Mail sent!");

        this.resetForm();
      } catch(error) {
        console.log(error);

        // Show error notice

        // On third try
            // Show mailgo (https://github.com/manzinello/mailgo),
            // email is pre-composed with form data.
      }
    }
  }
};
</script>

<style lang="scss">
.formulate-form {
  margin-top: rem(30px);

  @media (min-width: 768px) and (min-height: 600px) {
    margin-top: rem(40px);
  }

  @media (min-width: 1200px) and (min-height: 720px) {
    font-size: $font-size-lg;
  }
}

.formulate-input {
  position: relative;

  &[data-type="group"] {
    margin-top: 1.875em;

    @media (min-width: 768px) and (min-height: 600px) {
      margin-top: 2.5em;
    }

    &:first-child {
      margin-top: 0;
    }
  }

  & + &:not([data-type="group"]) {
    margin-top: 1.25em;

    @media (min-width: 768px) and (min-height: 600px) {
      margin-top: 1.875em;
    }

    &:first-child {
      margin-top: 0;
    }
  }
}

.formulate-input-wrapper {
  .formulate-input--ifl > & {
    position: relative;
  }

  .formulate-input--inline > & {
    display: flex;
    align-items: center;
  }
}

label {
  display: block;
  font-family: $headings-font-family;
  font-weight: $headings-font-weight;

  .formulate-input--ifl > .formulate-input-wrapper > & {
    $scale: 1 / 0.8125;

    position: absolute;
    top: 0.125em;
    left: 0.125em;
    right: 0.125em;
    z-index: 1;
    margin-bottom: 0;
    padding: 0.8125em * $scale 0.75em * $scale 0.3125em * $scale;
    line-height: 1;
    font-size: 0.8125em;
    font-weight: $font-weight-base;
    color: $blue;
    background-color: $off-white-dark;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;

    @media (prefers-contrast: high) {
      background-color: $white;
    }
  }

  .formulate-input--inline > .formulate-input-wrapper > & {
    flex-shrink: 0;
    margin-bottom: 0;
    margin-right: 0.5em;
  }
}

.formulate-input-element {
  // Input types that preferably should not be targeted, but are with this selector in its current form:
  // button, checkbox, color, file, hidden, image, radio, range, reset & submit.
  .formulate-input--inline.formulate-input--captcha-answer > .formulate-input-wrapper > & {
    &::after {
      content: "*";
      vertical-align: top;
      font-weight: $headings-font-weight;
    }
  }

  > input,
  > textarea {
    width: 100%;
    padding: 0.75em;
    background-color: $off-white-dark;
    border: 0.125em solid $off-white-dark;
    border-radius: 0.25em;
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
      padding-top: 1.9375em;
      padding-bottom: 0.5em;
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
    // General (IE, maybe others)
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
      height: 4.3125em; // Setting a fixed height is sadly the only way to guarantee consistent appearance across browsers.
    }

    .formulate-input--inline > .formulate-input-wrapper > & {
      &[type="number"],
      &[inputmode="numeric"] {
        width: 4em;
      }
    }
  }

  > textarea {
    display: block;
  }

  > button {
    display: inline-flex;
    align-items: center;
    padding: 0.875em 1.375em;
    text-decoration: none;
    font-family: $btn-font-family;
    font-weight: $btn-font-weight;
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
      box-shadow: 0 0 0.5em 0.125em rgba(0, 0, 0, 0.2);
      outline: none;
    }

    &__spinner {
      margin-left: 0.5em;

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
