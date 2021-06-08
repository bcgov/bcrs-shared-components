// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { FolioNumberInput } from '@/components/FolioNumberInput'

Vue.use(Vuetify)
const vuetify = new Vuetify({})

describe('Folio Number Input component', () => {
  it('initializes with default props', () => {
    const wrapper = mount(FolioNumberInput, { vuetify })
    const vm: any = wrapper.vm

    // verify myself
    expect(wrapper.findComponent(FolioNumberInput).exists()).toBe(true)
    expect(vm.folioNumber).toBeNull()
    expect(wrapper.find('#folio-number-textfield').exists()).toBe(true)

    wrapper.destroy()
  })

  it('emits valid and emitFolioNumber properly', async () => {
    const wrapper = await mount(FolioNumberInput,
      {
        propsData: {
          validate: false
        },
        vuetify
      })
    const vm: any = wrapper.vm

    // Set an invalid text
    wrapper.find('#folio-number-textfield').setValue('012345678901234567890123456789012345678901234567891')
    await flushPromises()
    // Should emit the new value
    expect(wrapper.emitted('emitFolioNumber').pop()[0]).toEqual('012345678901234567890123456789012345678901234567891')
    // Should not validate
    expect(wrapper.find('#folio-number-form').text()).not.toContain('Cannot exceed 50 characters')

    // Change validate prop to true
    await wrapper.setProps({ validate: true })
    // Should now validate
    expect(wrapper.find('#folio-number-form').text()).toContain('Cannot exceed 50 characters')
    // Verify that component is not valid
    expect(wrapper.emitted('valid').pop()).toEqual([false])

    // Set a valid text
    wrapper.find('#folio-number-textfield').setValue('01234567890123456789012345678901234567890123456789')
    await flushPromises()
    // Should remove validation
    expect(wrapper.find('#folio-number-form').text()).not.toContain('Cannot exceed 50 characters')
    // verify that component is valid
    expect(wrapper.emitted('valid').pop()).toEqual([true])

    wrapper.destroy()
  })
})
