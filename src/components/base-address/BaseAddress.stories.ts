import type { Meta } from '@storybook/vue'
import { BaseAddress } from './index'
import Vuetify from 'vuetify'

const meta: Meta<typeof BaseAddress> = {
  title: 'component/BaseAddress'
}
export default meta

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { BaseAddress },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})

export const DefaultBaseAddress = Template.bind({})
DefaultBaseAddress['args'] = {
  editing: true,
  schema: null,
  address: {}
}
export const FilledInBaseAddress = Template.bind({})
FilledInBaseAddress['args'] = {
  editing: true,
  schema: null,
  address: {
    streetAddress: '1234 Sesame Street',
    streetAddressAdditional: '4th Floor',
    addressCity: 'Victoria',
    addressRegion: 'British Columbia',
    addressCountry: 'Canada',
    postalCode: 'V8N 1A1',
    deliveryInstructions: 'Leave at front door'
  },
  noPoBox: true
}
