import  { setup }  from '@storybook/vue3';
import type { App } from 'vue'
import '@/assets/styles/base.scss'
import '@/assets/styles/layout.scss'
import '@/assets/styles/overrides.scss'

import vuetify from '../src/plugins/vuetify'

setup((app:App) => {
  app.use(vuetify);
})

// you can define global your Vuetify decorators
export const decorators = [
  (story: any) => ({
    components: { story },
    template: `
      <v-app class="app-container theme--light">
        <story />
      </v-app>
    `
    })
]
