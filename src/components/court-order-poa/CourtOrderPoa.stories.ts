import type { Meta } from '@storybook/vue'
import { CourtOrderPoa } from './index'

const meta: Meta<typeof CourtOrderPoa> = {
  title: 'component/CourtOrderPoa'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CourtOrderPoa },
  template: '<court-order-poa v-bind="$props" />' // $props comes from args below
})

export const courtOrderPoa = Template.bind({})
courtOrderPoa['args'] = {
  validate: false
}

export const courtOrderPoaDraft = Template.bind({})
courtOrderPoaDraft['args'] = {
  draftCourtOrderNumber: '1234-56789',
  hasDraftPlanOfArrangement: true
}
