import type { Meta } from '@storybook/vue3'
import { InputFieldDatePicker } from './index'

const meta: Meta<typeof InputFieldDatePicker> = {
  title: 'component/InputFieldDatePicker'
}
export default meta

const Template = (args) => ({
  components: { InputFieldDatePicker },
  setup () {
    return { args }
  },
  template: '<input-field-date-picker v-bind="args" />'
})

export const Basic = Template.bind({})
Basic['args'] = {}
