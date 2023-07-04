import type { Meta } from '@storybook/vue'
import { RelationshipTypes } from '@bcrs-shared-components/enums'
import { RelationshipsPanel } from './index'

const meta: Meta<typeof RelationshipsPanel> = {
  title: 'component/RelationshipsPanel'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RelationshipsPanel },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  bgHex: `#fff`,
  showValidationErrors: false
}

export const twoRelationshipsSelected = Template.bind({})
twoRelationshipsSelected['args'] = {
  draftRelationships: [RelationshipTypes.HEIR_LEGAL_REP, RelationshipTypes.SHAREHOLDER]
}

export const greenBackground = Template.bind({})
greenBackground['args'] = {
  bgHex: '#00FF00'
}

export const showValidationErrors = Template.bind({})
showValidationErrors['args'] = {
  showValidationErrors: true
}
