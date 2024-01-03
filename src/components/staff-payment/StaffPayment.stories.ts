import type { Meta } from '@storybook/vue3'
import { StaffPayment } from './index'
import { StaffPaymentOptions } from '@bcrs-shared-components/enums'
import { StaffPaymentIF } from '@bcrs-shared-components/interfaces'

const meta: Meta<typeof StaffPayment> = {
  title: 'component/StaffPayment'
}
export default meta

const Template = (args) => ({
  components: { StaffPayment },
  setup () {
    return { args }
  },
  template: '<staff-payment v-bind="args" />'
})

const staffPaymentData: StaffPaymentIF = {
  option: StaffPaymentOptions.NONE,
  routingSlipNumber: null,
  bcolAccountNumber: null,
  datNumber: null,
  folioNumber: null,
  isPriority: false
}

export const Default = Template.bind({})
Default['args'] = {
  staffPaymentData: staffPaymentData
}
