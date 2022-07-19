import axios from 'axios'
import { WebChat } from './index'

export default {
  title: 'component/WebChat',
  component: WebChat,
  argTypes: {}
}

// set window parameters
window['webChatUrl'] = 'https://testchatservices.maximusbc.ca/Home/Chat'
window['webChatReason'] = 'SBC_Registries'
window['webChatStatusUrl'] = 'https://mcap-schedule-3a0694-test.apps.silver.devops.gov.bc.ca/api/status/SBC_Registries'

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WebChat },
  // $props comes from args below
  template: '<web-chat v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  axios: axios.create(),
  isMobile: false
}
