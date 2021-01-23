import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
import { nl } from "@braid/vue-formulate-i18n";

Vue.use(VueFormulate, {
  plugins: [ nl ]
});
