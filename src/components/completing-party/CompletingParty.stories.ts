import { Meta } from '@storybook/vue3'
import CompletingParty from './CompletingParty.vue'
import { AddressIF } from '@bcrs-shared-components/interfaces'
import { DefaultSchema } from '@bcrs-shared-components/base-address/resources/default-schema'

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
      streetAddressAdditional: 'Test Street Additional'
    }
  },
  enableAddEdit: false,
  addressSchema: DefaultSchema,
  validate: false,
  invalidSection: false
}
