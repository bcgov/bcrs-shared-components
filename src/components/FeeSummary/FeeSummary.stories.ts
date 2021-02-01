import { FeeSummary } from './index'
import { EntityTypes, FilingCodes } from '@/enums'
import { FilingDataIF } from '@/interfaces'

export default {
  title: 'component/FeeSummary',
  component: FeeSummary,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FeeSummary },
  template: '<fee-summary v-bind="$props" />' // $props comes from args below
})

const filingData: FilingDataIF = {
  filingTypeCode: FilingCodes.ALTERATION,
  entityType: EntityTypes.BC_CORPORATION,
  priority: false
}

export const Default = Template.bind({})
Default.args = {
  showFeeSummary: true,
  filingData: filingData,
  payApiUrl: 'https://pay-api-dev.pathfinder.gov.bc.ca/api/v1/',
  hasConflicts: false,
  isBusySaving: false,
  isSummaryMode: false
}
