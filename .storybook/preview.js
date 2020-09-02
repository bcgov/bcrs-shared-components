import 'core-js/stable' // to polyfill ECMAScript features
import 'regenerator-runtime/runtime' // to use transpiled generator functions
import '@mdi/font/css/materialdesignicons.min.css' // ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import Affix from 'vue-affix'
import Vue2Filters from 'vue2-filters' // needed by SbcFeeSummary

//import DetailComment from '../src/components/DetailComment.vue'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(Affix)
Vue.use(Vue2Filters)

//Vue.component('detail-comment', DetailComment);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
