import type { Meta } from '@storybook/vue'
import { DetailComment } from './index'

const meta: Meta<typeof DetailComment> = {
  title: 'component/DetailComment'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DetailComment },
  template: '<detail-comment v-bind="$props" />' // $props comes from args below
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
