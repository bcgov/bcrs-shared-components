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
  street: '',
  streetAdditional: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  deliveryInstructions: '',
  schema: DefaultSchema,
  editing: true
}

export const WithData = Template.bind({})
WithData['args'] = {
  street: '1234 Sesame Street',
  streetAdditional: '4th Floor',
  city: 'Victoria',
  region: 'BC',
  postalCode: 'V8N 1A1',
  country: 'Canada',
  deliveryInstructions: 'Leave at front door',
  schema: DefaultSchema,
  editing: true
}

export const WithValidation = Template.bind({})
WithValidation['args'] = {
  ...WithData['args']
  // Additional logic for showcasing validation can be added here
}
