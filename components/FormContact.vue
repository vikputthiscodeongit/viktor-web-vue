<template>
  <FormulateForm
    :schema="formGroups"
  />
  <!-- <form>
    <FormulateInput
      v-for="field in formFields"
      :key="field.name"
      :label="field.label"
      :type="field.type"
      :name="field.name"
      :placeholder="field.placeholder"
    />
  </form> -->
</template>

<script>
export default {
  name: "FormContact",

  data() {
    return {
      formGroups: [],
      formFields: []
    }
  },

  mounted() {
    this.generateFormGroupsData();

    this.formFields = [
      {
        type: 'group',
        repeatable: true,
        name: 'addresses',
        addLabel: '+ Address',
        children: [
          {
            name: 'street',
            label: 'Street address'
          },
          {
            name: 'city',
            label: 'City',
          },
          {
            component: 'div',
            class: 'double-row',
            children: [
              {
                name: 'state',
                type: 'select',
                label: 'State',
                options: {
                  va: 'Virginia',
                  fl: 'Florida',
                  ne: 'Nebraska',
                  ca: 'California'
                },
              },
              {
                name: 'zip',
                label: 'Zip',
              },
            ]
          }
        ]
      }
    ];

    console.log(this.formGroups);
    console.log(this.formFields);
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
