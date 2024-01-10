import type { Meta } from '@storybook/vue3'
import FeeSummary from './FeeSummary.vue'
import { FilingCodes, CorpTypeCd } from '@bcrs-shared-components/enums/'
import { FilingDataIF } from '@bcrs-shared-components/interfaces/'

// for SbcFeeSummary

const meta: Meta<typeof FeeSummary> = {
  title: 'component/FeeSummary'
}
export default meta

const Template = (args: FilingDataIF) => ({
  components: { FeeSummary },
  setup () {
    return { args }
  },
  template: '<div style="max-width: 350px"><fee-summary v-bind="args" /></div>'
})

const filingData = [{
  filingTypeCode: FilingCodes.ALTERATION,
  entityType: CorpTypeCd.CORPORATION,
  priority: false
}] as FilingDataIF[]

export const Default = Template.bind({})
Default['args'] = {
  filingData: filingData,
  payApiUrl: 'https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/',
  hasConflicts: false,
  isLoading: false,
  confirmLabel: 'Continue',
  errorMessage: ''
}

export const summaryMode = Template.bind({})
summaryMode['args'] = {
  filingData: filingData,
  payApiUrl: 'https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/',
  hasConflicts: false,
  isLoading: false,
  confirmLabel: 'File and Pay',
  errorMessage: '',
  isSummaryMode: true
}
