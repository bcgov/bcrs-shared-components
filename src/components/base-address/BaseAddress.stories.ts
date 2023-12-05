import { Meta, StoryObj } from '@storybook/vue3'
import BaseAddress from './BaseAddress.vue'
import { AddressIF } from './interfaces/address-interface'
import { DefaultSchema } from './resources/default-schema'

export default {
  title: 'Component/BaseAddress',
  component: BaseAddress,
} as Meta

const Template = (args: AddressIF) => ({
  components: { BaseAddress },
  setup() {
    return { args }
  },
  template: '<BaseAddress v-bind="args" />',
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
}

export const WithData = Template.bind({})
WithData['args'] = {
  street: '123 Main St',
  streetAdditional: 'Apt 4',
  city: 'Springfield',
  region: 'IL',
  postalCode: '62704',
  country: 'USA',
  deliveryInstructions: 'Leave at front door',
  schema: DefaultSchema,
}

export const WithValidation = Template.bind({})
WithValidation['args'] = {
  ...WithData['args'],
  // Additional logic for showcasing validation can be added here
}