import type { Meta } from '@storybook/vue'
import { HelpBusinessNumber } from './index'

const meta: Meta<typeof HelpBusinessNumber> = {
  title: 'component/HelpBusinessNumber'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HelpBusinessNumber },
  template: '<help-business-number v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  isTypeSoleProp: false,
  isTypePartnership: false
}
