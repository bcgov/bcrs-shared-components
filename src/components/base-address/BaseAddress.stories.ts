import { Meta } from '@storybook/vue3'
import BaseAddress from './BaseAddress.vue'
import { AddressIF } from '@bcrs-shared-components/interfaces'
import { DefaultSchema } from './resources/default-schema'

export default {
  title: 'Component/BaseAddress',
  component: BaseAddress
} as Meta

const Template = (args: AddressIF) => ({
  components: { BaseAddress },
  setup () {
    return { args }
  },
  template: '<BaseAddress v-bind="args" />'
})

export const Default = Template.bind({})
Default['args'] = {
  value: {
    streetAddress: '',
    streetAddressAdditional: '',
    addressCity: '',
    addressRegion: '',
    postalCode: '',
    deliveryInstructions: ''
  },
  schema: DefaultSchema,
  editing: true
}

export const WithData = Template.bind({})
WithData['args'] = {
  value: {
    streetAddress: '1234 Sesame Street',
    streetAddressAdditional: '4th Floor',
    addressCity: 'Victoria',
    addressRegion: 'British Columbia',
    addressCountry: 'Canada',
    postalCode: 'V8N 1A1',
    deliveryInstructions: 'Leave at front door'
  },
  schema: DefaultSchema,
  editing: true
}

export const WithValidation = Template.bind({})
WithValidation['args'] = {
  ...WithData['args']
  // Additional logic for showcasing validation can be added here
}
