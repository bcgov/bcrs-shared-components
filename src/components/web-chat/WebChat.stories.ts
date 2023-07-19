import type { Meta } from '@storybook/vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { WebChat } from './index'
import Vuetify from 'vuetify'

const meta: Meta<typeof WebChat> = {
  title: 'component/WebChat'
}
export default meta

const webChatReason = 'WebChatReason'
const webChatStatusUrl = 'https://web-chat-status-url'
const webChatUrl = 'https://web-chat-url'

// set the mock adapter on the default instance
const mock = new MockAdapter(axios)

// mock GET request
mock.onGet(webChatStatusUrl).reply(200, { status: 'open' })

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { WebChat },
  template: '<web-chat v-bind="$props" />' // $props comes from args below
})

export const base = Template.bind({})
base['args'] = {
  axios: axios.create(),
  isMobile: false,
  webChatReason,
  webChatStatusUrl,
  webChatUrl
}
