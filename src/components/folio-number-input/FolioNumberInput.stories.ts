import type { Meta } from '@storybook/vue'
import { FolioNumberInput } from './index'

const meta: Meta<typeof FolioNumberInput> = {
  title: 'component/FolioNumberInput'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FolioNumberInput },
  template: '<folio-number-input v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  folioNumber: '01234567890123456789012345678901234567890123456789ABC@123/*!$ ...'
}
