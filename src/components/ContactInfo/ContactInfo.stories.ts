import { ContactInfo } from './index'
import { ContactIF } from '@/interfaces'

export default {
  title: 'component/ContactInfo',
  component: ContactInfo,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ContactInfo },
  template: '<contact-info v-bind="$props" />' // $props comes from args below
})

const ContactData: ContactIF = {
  email: 'mock@email.com',
  confirmEmail: 'mock@email.com',
  phone: '2501234567',
  extension: ''
}

const ContactDataChanged: ContactIF = {
  email: 'newMock@email.com',
  confirmEmail: 'newMock@email.com',
  phone: '2509876543',
  extension: '123'
}

export const FilledAlteration = Template.bind({})
FilledAlteration.args = {
  businessContact: ContactData,
  originalBusinessContact: ContactData,
  hasBusinessContactInfoChange: false,
  editLabel: 'Change',
  editedLabel: 'Changed'
}

export const ChangedAlteration = Template.bind({})
ChangedAlteration.args = {
  businessContact: ContactDataChanged,
  originalBusinessContact: ContactDataChanged,
  hasBusinessContactInfoChange: true,
  editLabel: 'Change',
  editedLabel: 'Changed'
}

export const FilledCorrection = Template.bind({})
FilledCorrection.args = {
  businessContact: ContactData,
  originalBusinessContact: ContactData,
  hasBusinessContactInfoChange: false,
  editLabel: 'Correct',
  editedLabel: 'Corrected'
}
