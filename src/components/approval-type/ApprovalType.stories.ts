import { ApprovalType } from './index'

export default {
  title: 'component/ApprovalType',
  component: ApprovalType,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ApprovalType },
  template: '<approval-type v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default.args = {}

export const defaultCourtOrderOnly = Template.bind({})
defaultCourtOrderOnly.args = {
  isCourtOrderOnly: true
}

export const conversionToFullRestoration = Template.bind({})
conversionToFullRestoration.args = {
  isConversionToFullRestoration: true
}

export const draftViaRegistrar = Template.bind({})
draftViaRegistrar.args = {
  approvedByRegistrar: true
}

export const draftViaCourtOrder = Template.bind({})
draftViaCourtOrder.args = {
  draftCourtOrderNumber: '99-1234567'
}
