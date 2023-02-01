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

export const noRelationships = Template.bind({})
noRelationships.args = {
  draftRelationships: []
}