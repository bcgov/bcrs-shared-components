import { EffectiveDateTime } from './index'
import Vuetify from 'vuetify'

export default {
  title: 'component/EffectiveDateTime',
  component: EffectiveDateTime,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { EffectiveDateTime },
  template: '<effective-date-time v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default.args = {
  parseInitial: true,
  currentJsDate: new Date(),
  effectiveDateTime: {
    valid: false,
    isFutureEffective: null,
    effectiveDate: null
  },
  isAppValidate: false
}
