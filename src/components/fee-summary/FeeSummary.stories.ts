import { FeeSummary } from './index'
import { FilingCodes } from '@bcrs-shared-components/enums'
import { FilingDataIF } from '@bcrs-shared-components/interfaces'
import { CorpTypeCd } from '@bcrs-shared-components/enums'

export default {
  title: 'component/FeeSummary',
  component: FeeSummary,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FeeSummary },
  template: '<div style="max-width: 350px"><fee-summary v-bind="$props" /></div>' // $props comes from args below
})

const filingData: FilingDataIF = {
  filingTypeCode: FilingCodes.ALTERATION,
  entityType: CorpTypeCd.BC_CORPORATION,
  priority: false
}

const changeFilingData: FilingDataIF = {
  filingTypeCode: FilingCodes.CHANGE_OF_REGISTRATION,
  entityType: CorpTypeCd.SOLE_PROP,
  priority: false
}

export const Default = Template.bind({})
Default.args = {
  filingData: filingData,
  payApiUrl: 'https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/',
  hasConflicts: false,
  isLoading: false,
  confirmLabel: 'Continue',
  errorMessage: ''
}

export const summaryMode = Template.bind({})
summaryMode.args = {
  filingData: filingData,
  payApiUrl: 'https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/',
  hasConflicts: false,
  isLoading: false,
  confirmLabel: 'File and Pay',
  errorMessage: '',
  isSummaryMode: true
}
