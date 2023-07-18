import 'core-js/stable' // to polyfill ECMAScript features
import 'regenerator-runtime/runtime' // to use transpiled generator functions
import '@mdi/font/css/materialdesignicons.min.css' // ensure you are using css-loader
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { Preview } from '@storybook/vue'
import '@/assets/styles/base.scss'
import '@/assets/styles/layout.scss'
import '@/assets/styles/overrides.scss'

Vue.use(Vue2Filters) // needed by SbcFeeSummary
Vue.use(Vuelidate) // needed by BaseAddress
Vue.use(Vuetify)

const preview: Preview = {
  decorators: [
    (story) => ({
      components: { story },
      vuetify: new Vuetify({ iconfont: 'mdi' }),
      template: `
        <v-app class="app-container theme--light">
          <story />
        </v-app>
      `
      })
  ]
}

export default preview
