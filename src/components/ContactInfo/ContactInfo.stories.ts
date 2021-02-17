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

export const Outlined = Template.bind({})
Outlined.args = {
  businessContact: ContactData,
  originalBusinessContact: ContactData,
  'has-business-contact-info-change': false,
  'edit-label': 'Change',
  'edited-label': 'Changed'
}

export const Filled = Template.bind({})
Filled.args = {
  businessContact: ContactData,
  originalBusinessContact: ContactData,
  'has-business-contact-info-change': false,
  'edit-label': 'Change',
  'edited-label': 'Changed'
}
