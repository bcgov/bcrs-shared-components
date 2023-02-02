import { RelationshipTypes } from '@/enums/relationship-types'
import { RelationshipsPanel } from './index'

export default {
  title: 'component/RelationshipsPanel',
  component: RelationshipsPanel,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RelationshipsPanel },
  template: '<relationships-panel v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default.args = {}

export const twoRelationshipsSelected = Template.bind({})
twoRelationshipsSelected.args = {
  draftRelationships: [RelationshipTypes.HEIR_LEGAL_REP, RelationshipTypes.SHAREHOLDER]
}
