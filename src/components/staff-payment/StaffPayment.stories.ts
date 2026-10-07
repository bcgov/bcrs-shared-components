import type { Meta } from '@storybook/vue'
import { StaffPayment } from './index'
import { StaffPaymentOptions } from '@bcrs-shared-components/enums'
import { StaffPaymentIF } from '@bcrs-shared-components/interfaces'

const meta: Meta<typeof StaffPayment> = {
  title: 'component/StaffPayment'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StaffPayment },
  template: '<staff-payment v-bind="$props" />' // $props comes from args below
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

export const BcolWithLowerCaseDatNumber = Template.bind({})
BcolWithLowerCaseDatNumber['args'] = {
  staffPaymentData: {
    ...staffPaymentData,
    option: StaffPaymentOptions.BCOL,
    bcolAccountNumber: '123456',
    datNumber: 'c1234567'
  } as StaffPaymentIF,
  validate: true
}
