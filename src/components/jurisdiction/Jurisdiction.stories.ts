import type { Meta } from '@storybook/vue'
import { Jurisdiction } from './index'

const meta: Meta<typeof Jurisdiction> = {
  title: 'component/Jurisdiction'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Jurisdiction },
  template: '<jurisdiction v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  showUsaJurisdictions: false
}

export const JurisdictionInitialValue = Template.bind({})
JurisdictionInitialValue['args'] = {
  showUsaJurisdictions: false,
  initialValue: {
    group: 0,
    text: 'Alberta',
    value: 'AB',
    separator: false
  }
}
