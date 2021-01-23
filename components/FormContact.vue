<template>
  <FormulateForm
    v-model="formValues"
    :schema="formGroups"
  />
</template>

<script>
export default {
  name: "FormContact",

  data() {
    return {
      formGroups: [],
      formValues: {}
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
        this.formGroups[groupIndex] = {
          type: "group",
          children: []
        }
      }

      const label = fieldObj.value.label;
      const input = fieldObj.value.input;

      const field = {
        label: label.text,
        type: input.type,
        name: input.name,
        placeholder: input.placeholder
      };

      this.formGroups[groupIndex].children.push(field);
    }
  }
};
</script>
