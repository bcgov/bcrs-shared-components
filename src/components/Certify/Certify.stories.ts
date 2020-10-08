import { Certify } from './index'

export default {
  title: 'component/Certify',
  component: Certify,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Certify },
  template: '<certify v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default.args = {
  currentDate: '10-10-2020',
  certifiedBy: '',
  isCertified: false,
  message: '',
  entityDisplay: ''
}
