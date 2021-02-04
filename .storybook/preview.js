import 'core-js/stable' // to polyfill ECMAScript features
import 'regenerator-runtime/runtime' // to use transpiled generator functions
import '@mdi/font/css/materialdesignicons.min.css' // ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import { addDecorator } from '@storybook/vue'

import '@/assets/styles/base.scss'
import '@/assets/styles/layout.scss'
import '@/assets/styles/overrides.scss'

Vue.use(Vuetify)
Vue.use(Vuelidate)

addDecorator(() => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  template: `
    <v-app class="app-container theme--light">
      <story />
    </v-app>
    `
}))

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
