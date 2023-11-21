import type { Meta } from '@storybook/vue3'
import { BaseDatePicker } from './index'

const meta: Meta<typeof BaseDatePicker> = {
  title: 'component/BaseDatePicker'
}
export default meta

const Template = (args) => ({
  components: { BaseDatePicker },
  setup () {
    return { args }
  },
  template: '<base-date-picker v-bind="args" />'
})

export const Basic = Template.bind({})
Basic['args'] = {
  enableTimePicker: false
}
