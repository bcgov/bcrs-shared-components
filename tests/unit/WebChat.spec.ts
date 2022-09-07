import axios from 'axios'
import sinon from 'sinon'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import { WebChat } from '@/components/web-chat'

// Prevent the warning "[Vuetify] Unable to locate target [data-app]"
document.body.setAttribute('data-app', 'true')

Vue.use(Vuetify)

const vuetify = new Vuetify({})

describe('WebChat component', () => {
  let wrapper: any

  beforeEach(async () => {
    // stub webchat status endpoint
    sinon.stub(axios, 'get').withArgs('myhost/basePath/webchatStatus')
      .returns(new Promise((resolve) => resolve({ data: { 'status': 'open' } })))

    wrapper = mount(WebChat, {
      vuetify,
      propsData: {
        axios,
        isMobile: false,
        webChatReason: 'Test',
        webChatStatusUrl: 'myhost/basePath/webchatStatus',
        webChatUrl: 'myhost/basePath/webchatUrl'
      }
    })
    await Vue.nextTick()
  })

  afterEach(() => {
    sinon.restore()
    wrapper.destroy()
  })

  it('renders the components', () => {
    expect(wrapper.findComponent(WebChat).exists()).toBe(true)
    expect(wrapper.find('#chat-button-wrapper').exists()).toBe(true)
    expect(wrapper.find('#open-tooltip-message').exists()).toBe(false)
    expect(wrapper.find('#closed-tooltip-message').exists()).toBe(false)
    expect(wrapper.find('#unavailable-tooltip-message').exists()).toBe(false)
  })

  it('displays the tooltip for the open webchat status', async (done) => {
    expect(wrapper.vm.chatStatus).toBe('open')

    await wrapper.find('#chat-button-wrapper').trigger('mouseenter')

    requestAnimationFrame(() => {
      expect(wrapper.find('#open-tooltip-message').text())
        .toBe('Click here to chat live with Helpdesk staff.')
      done()
    })
  })

  it('displays the tooltip for the closed webchat status', async (done) => {
    wrapper.vm.chatStatus = 'closed'

    await wrapper.find('#chat-button-wrapper').trigger('mouseenter')

    requestAnimationFrame(() => {
      expect(wrapper.find('#closed-tooltip-message').text().replace(/\s+/g, ' '))
        .toBe('We are closed. The Service BC Contact Centre is open Monday through Friday 7:30am – ' +
          '5:00pm Pacific Time excluding BC statutory holidays.'.replace(/\s+/g, ' '))
      done()
    })
  })

  it('displays the tooltip for the unavailable webchat status', async (done) => {
    wrapper.vm.chatStatus = 'response error'

    await wrapper.find('#chat-button-wrapper').trigger('mouseenter')

    requestAnimationFrame(() => {
      expect(wrapper.find('#unavailable-tooltip-message').text())
        .toBe('Webchat is temporarily unavailable.')
      done()
    })
  })
})
