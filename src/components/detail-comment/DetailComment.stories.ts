import type { Meta } from '@storybook/vue3'
import { DetailComment } from './index'

const meta: Meta<typeof DetailComment> = {
  title: 'component/DetailComment'
}
export default meta

const Template = (args) => ({
  components: { DetailComment },
  setup () {
    return { args }
  },
  template: '<detail-comment v-bind="args" />'
})

export const Outlined = Template.bind({})
Outlined['args'] = {
  placeholder: 'Provide a detail comment',
  textAreaStyle: 'outlined',
  maxLength: 4096
}

export const Filled = Template.bind({})
Filled['args'] = {
  placeholder: 'Provide a detail comment',
  textAreaStyle: 'filled',
  maxLength: 1000,
  rowCount: 2
}
