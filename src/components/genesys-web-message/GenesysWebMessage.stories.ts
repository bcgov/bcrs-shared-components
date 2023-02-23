import { GenesysWebMessage } from './index'

export default {
  title: 'component/GenesysWebMessage',
  component: GenesysWebMessage,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GenesysWebMessage },
  template: '<genesys-web-message v-bind="$props" />' // $props comes from args below
})

export const nameRequest = Template.bind({})
nameRequest.args = {
  deploymentKey: '5c012aaa-1f17-4d0b-8da2-bea9c1133d5d'
}

export const SPGP = Template.bind({})
SPGP.args = {
  deploymentKey: '42ed05f4-d545-436b-ba2c-94b66ed3396f'
}
