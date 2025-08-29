import type { Meta } from '@storybook/vue'
import { CorrectName } from './index'

const meta: Meta<typeof CorrectName> = {
  title: 'component/CorrectName'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CorrectName },
  template: '<correct-name v-bind="$props" />' // $props comes from args below
})

export const correctName = Template.bind({})
correctName['args'] = {
  businessId: 'BC1234567',
  entityType: 'BC',
  nameRequest: {},
  companyName: 'Old Company Name',
  fetchAndValidateNr: () => {},
  correctionNameChoices: ['correct-name']
}

export const correctNameNR = Template.bind({})
correctNameNR['args'] = {
  businessId: 'BC1234567',
  entityType: 'BC',
  nameRequest: {},
  companyName: 'Old Company Name',
  fetchAndValidateNr: () => {},
  correctionNameChoices: ['correct-name-to-number', 'correct-new-nr']
}

export const correctNameNRStaff = Template.bind({})
correctNameNRStaff['args'] = {
  businessId: 'BC1234567',
  entityType: 'BC',
  nameRequest: {},
  companyName: 'Old Company Name',
  fetchAndValidateNr: () => {},
  correctionNameChoices: ['correct-name-to-number', 'correct-new-nr-staff']
}
