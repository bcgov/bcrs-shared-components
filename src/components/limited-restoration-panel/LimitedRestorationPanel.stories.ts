import type { Meta } from '@storybook/vue'
import { LimitedRestorationPanel } from './index'

const meta: Meta<typeof LimitedRestorationPanel> = {
  title: 'component/LimitedRestorationPanel'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LimitedRestorationPanel },
  template: '<limited-restoration-panel v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  months: 0
}

export const twentyFourMonths = Template.bind({})
twentyFourMonths['args'] = {
  months: 24
}

export const oneMonth = Template.bind({})
oneMonth['args'] = {
  months: 1
}

export const thirtySixMonths = Template.bind({})
thirtySixMonths['args'] = {
  months: 36,
  maxNumberOfMonths: 36
}
