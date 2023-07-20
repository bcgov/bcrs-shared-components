import type { Meta } from '@storybook/vue'
import { EffectiveDateTime } from './index'
import Vuetify from 'vuetify'

const meta: Meta<typeof EffectiveDateTime> = {
  title: 'component/EffectiveDateTime'
}
export default meta

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { EffectiveDateTime },
  template: '<effective-date-time v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  parseInitial: true,
  currentJsDate: new Date(),
  effectiveDateTime: {
    valid: false,
    isFutureEffective: null,
    effectiveDate: null
  },
  isAppValidate: false
}
