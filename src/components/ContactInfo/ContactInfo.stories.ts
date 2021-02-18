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
  confirmEmail: '',
  phone: '2501234567',
  extension: ''
}

export const FilledAlteration = Template.bind({})
FilledAlteration.args = {
  businessContact: ContactData,
  originalBusinessContact: ContactData,
  hasBusinessContactInfoChange: false,
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
