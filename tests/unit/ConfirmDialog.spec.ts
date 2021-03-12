import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import { mount } from '@vue/test-utils'
import { ConfirmDialog } from '@/components/confirm-dialog'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})

interface OptionsObject {
  width?: number | string,
  zIndex?: number,
  persistent?: boolean,
  yes?: string,
  no?: string,
  cancel?: string
}

describe('ConfirmDialog', () => {
  const options: OptionsObject = {
    width: 400,
    zIndex: 200,
    persistent: false,
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel'
  }

  const wrapperFactory = (attach: string) => {
    return mount(ConfirmDialog, {
      propsData: {
        attach
      },
      vuetify
    })
  }

  it('initializes correctly', () => {
    const wrapper = wrapperFactory('')

    // verify that component mounts
    expect(wrapper.find(ConfirmDialog).exists()).toBe(true)
  })

  it('opens the confirm dialog with the correct data set', async () => {
    const wrapper = wrapperFactory('')
    const vm: any = wrapper.vm

    vm.open('Mock Title', 'mock confirm dialog message', options)
    await Vue.nextTick()

    // verify that component mounts
    expect(wrapper.find(ConfirmDialog).exists()).toBe(true)
    expect(wrapper.find('#confirm-title').text()).toBe('Mock Title')
    expect(wrapper.find('#confirm-text').text()).toBe('mock confirm dialog message')
    expect(wrapper.find('#dialog-yes-button').text()).toBe('Yes')
    expect(wrapper.find('#dialog-no-button').text()).toBe('No')
    expect(wrapper.find('#dialog-cancel-button').text()).toBe('Cancel')
  })

  it('opens the confirm dialog with an alternative data set', async () => {
    const wrapper = wrapperFactory('')
    const vm: any = wrapper.vm
    options.yes = 'Confirm'
    options.no = 'Remove'
    options.cancel = 'Close'

    vm.open('New Mock Confirm', 'new mock confirm message', options)
    await Vue.nextTick()

    // verify that component mounts
    expect(wrapper.find(ConfirmDialog).exists()).toBe(true)
    expect(wrapper.find('#confirm-title').text()).toBe('New Mock Confirm')
    expect(wrapper.find('#confirm-text').text()).toBe('new mock confirm message')
    expect(wrapper.find('#dialog-yes-button').text()).toBe('Confirm')
    expect(wrapper.find('#dialog-no-button').text()).toBe('Remove')
    expect(wrapper.find('#dialog-cancel-button').text()).toBe('Close')
  })
})
