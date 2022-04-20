import { CompletingParty } from './index'

export default {
  title: 'component/CompletingParty',
  component: CompletingParty,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CompletingParty },
  template: '<v-card flat ><completingParty v-bind="$props" /></v-card>'
})

export const Default = Template.bind({})
Default.args = {
  currentCompletingParty: {
    firstName: 'Cameron',
    middleName: 'D',
    lastName: 'Bowler',
    mailingAddress: {
      addressCity: 'Victoria',
      addressCountry: 'Canada',
      addressRegion: 'BC',
      deliveryInstructions: 'Test test test',
      postalCode: 'V8V 1s8',
      streetAddress: '1234',
      streetAddressAdditional: 'Test Street Additional'
    }
  },
  enableAddEdit: false,
  addressSchema: null,
  validate: false
}

export const unknownCompletingParty = Template.bind({})
unknownCompletingParty.args = {
  currentCompletingParty: null,
  addressSchema: null,
  enableAddEdit: true,
  validate: false
}
