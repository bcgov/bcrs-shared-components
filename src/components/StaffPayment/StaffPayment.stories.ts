import { StaffPayment } from './index'
import { StaffPaymentOptions } from '@/enums'

export default {
  title: 'component/StaffPayment',
  component: StaffPayment,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StaffPayment },
  template: '<staff-payment v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  staffPaymentData: {
    option: StaffPaymentOptions.NONE,
    routingSlipNumber: null,
    bcolAccountNumber: null,
    datNumber: null,
    folioNumber: null,
    isPriority: false
  }
}
