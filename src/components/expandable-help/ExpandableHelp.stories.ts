import type { Meta } from '@storybook/vue'
import { ExpandableHelp } from './index'

const meta: Meta<typeof ExpandableHelp> = {
  title: 'component/ExpandableHelp'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ExpandableHelp },
  // $props comes from args below
  template: `
    <expandable-help v-bind="$props">
      <template #content>${args.content}</template>
    </expandable-help`,
  methods: {}
})

export const base = Template.bind({})
base['args'] = {
  helpLabel: 'Show Sample Help',
  content: `sample help text`
}
