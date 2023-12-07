import type { Meta } from '@storybook/vue3'
import { RangeDatePicker } from './index'

const meta: Meta<typeof RangeDatePicker> = {
  title: 'component/RangeDatePicker'
}
export default meta

const Template = (args) => ({
  components: { RangeDatePicker },
  setup () {
    return { args }
  },
  template: '<range-date-picker v-bind="args" />'
})

export const Basic = Template.bind({})
Basic['args'] = {}
