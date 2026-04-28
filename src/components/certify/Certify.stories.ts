import type { Meta } from '@storybook/vue'
import { Certify } from './index'

const meta: Meta<typeof Certify> = {
  title: 'component/Certify'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Certify },
  // $props comes from args below
  template: '<certify v-bind="$props" :style="{ \'background-color\': \'white\' }" />'
})

export const Default = Template.bind({})
Default['args'] = {
  currentDate: '2020-01-17',
  isStaff: false,
  certifiedBy: '',
  isCertified: false,
  message: 'Note: It is an offence to make a false or misleading statement in respect of a material fact in a \n' +
    'record submitted to the Corporate Registry for filing. See section 427 of the Business Corporations Act.',
  entityDisplay: 'BC Company',
  disableEdit: false,
  showLegalName: true,
  authorizationMode: 'certify',
  invalidSection: true
}
