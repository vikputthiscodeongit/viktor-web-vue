export default {
  methods: {
    cssValue(el, prop) {
      const styles = window.getComputedStyle(el),
            value  = styles.getPropertyValue(prop);

      return value;
    },

    strToInt(string) {
      return parseInt(string, 10);
    }
  }
};
