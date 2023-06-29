import { BaseAddress } from './index'
import Vuetify from 'vuetify'

export default {
  title: 'component/BaseAddress',
  component: BaseAddress,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { BaseAddress },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})

export const DefaultBaseAddress = Template.bind({})
DefaultBaseAddress.args = {
  editing: true,
  schema: {},
  address: {}
}
export const FilledInBaseAddress = Template.bind({})
FilledInBaseAddress.args = {
  editing: true,
  schema: {},
  address: {
    streetAddress: '1234 Sesame Street',
    streetAddressAdditional: '4th Floor',
    addressCity: 'Victoria',
    addressRegion: 'British Columbia',
    postalCode: 'V8N 1A1',
    deliveryInstructions: 'Leave at front door'
  },
  noPoBox: true
}
