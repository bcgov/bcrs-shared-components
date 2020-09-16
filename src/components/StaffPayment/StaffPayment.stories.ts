import { StaffPayment } from './index'
import { StaffPaymentOptions } from '@/enums'
import { StaffPaymentIF } from '@/interfaces'

export default {
  title: 'component/StaffPayment',
  component: StaffPayment,
  argTypes: {
  }
}

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
Default.args = {
  staffPaymentData: staffPaymentData
}
