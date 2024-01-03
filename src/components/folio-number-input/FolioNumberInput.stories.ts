import type { Meta } from '@storybook/vue3'
import { FolioNumberInput } from './index'

const meta: Meta<typeof FolioNumberInput> = {
  title: 'component/FolioNumberInput'
}
export default meta

const Template = (args) => ({
  components: { FolioNumberInput },
  setup () {
    return { args }
  },
  template: '<folio-number-input v-bind="args" />'
})

export const Default = Template.bind({})
Default['args'] = {
  folioNumber: '01234567890123456789012345678901234567890123456789ABC@123/*!$ ...'
}
