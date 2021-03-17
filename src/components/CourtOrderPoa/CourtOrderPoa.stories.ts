import { CourtOrderPoa } from './index'

export default {
  title: 'component/CourtOrderPoa',
  component: CourtOrderPoa,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CourtOrderPoa },
  template: '<court-order-poa v-bind="$props" />' // $props comes from args below
})

// const ContactData: ContactPointIF = {
//   email: 'mock@email.com',
//   confirmEmail: 'mock@email.com',
//   phone: '2501234567',
//   extension: ''
// }

// const ContactDataChanged: ContactPointIF = {
//   email: 'newMock@email.com',
//   confirmEmail: 'newMock@email.com',
//   phone: '2509876543',
//   extension: '123'
// }

export const courtOrderPoa = Template.bind({})
courtOrderPoa.args = {
  validate: false
}

// export const ChangedAlteration = Template.bind({})
// ChangedAlteration.args = {
//   businessContact: ContactDataChanged,
//   originalBusinessContact: ContactDataChanged,
//   hasBusinessContactInfoChange: true,
//   editLabel: 'Change',
//   editedLabel: 'Changed'
// }
//
// export const FilledCorrection = Template.bind({})
// FilledCorrection.args = {
//   businessContact: ContactData,
//   originalBusinessContact: ContactData,
//   hasBusinessContactInfoChange: false,
//   editLabel: 'Correct',
//   editedLabel: 'Corrected'
// }
