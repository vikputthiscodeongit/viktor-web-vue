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

            const groupArr = groupObj.value;

            groupArr.forEach((fieldObj) => {
              const fieldIndex = groupArr.indexOf(fieldObj);

              this.generateFormFieldData(fieldObj, groupIndex, fieldIndex);
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    generateFormFieldData(fieldObj, groupIndex, fieldIndex) {
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
    }
  }
};
</script>
