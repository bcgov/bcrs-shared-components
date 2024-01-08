import { Meta } from '@storybook/vue3'
import CompletingParty from './CompletingParty.vue'
import { AddressIF } from '@bcrs-shared-components/interfaces'
import { DefaultSchema } from './resources/default-schema'

export default {
  title: 'Component/CompletingParty',
  component: CompletingParty
} as Meta

const Template = (args: AddressIF) => ({
  components: { CompletingParty },
  setup () {
    return { args }
  },
  template: '<completing-party v-bind="args" />'
})

export const Default = Template.bind({})
Default['args'] = {
  completingParty: {
    firstName: 'Cameron',
    middleName: 'D',
    lastName: 'Bowler',
    mailingAddress: {
      addressCity: 'Victoria',
      addressCountry: 'Canada',
      addressRegion: 'BC',
      deliveryInstructions: 'Test test test',
      postalCode: 'V8V 1S8',
      streetAddress: '1234',
      streetAddressAdditional: 'Test Street Additional',
      schema: DefaultSchema
    }
  },
  editing: true,
  addressSchema: DefaultSchema
}
