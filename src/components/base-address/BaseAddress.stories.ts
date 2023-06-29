import { BaseAddress } from './index'
import Vuetify from 'vuetify'

export default {
  title: 'component/Breadcrumb',
  component: BaseAddress,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { BaseAddress },
  template: '<BaseAddress v-bind="$props" />' // $props comes from args below
})

export const homeRoute = Template.bind({})
homeRoute.args = {
  baseaddress: [
    {
      text: 'Base Address'
    }
  ]
}
