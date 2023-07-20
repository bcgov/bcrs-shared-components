import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { FolioNumberInput } from '@/components/folio-number-input'

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

  it('should not validate if validate prop is false', async () => {
    const wrapper = mount(FolioNumberInput,
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

    // Should not display validation message
    expect(wrapper.find('#folio-number-form').text()).not.toContain('Cannot exceed 50 characters')

    wrapper.destroy()
  })
  it('should validate when validate prop is true', async () => {
    const wrapper = mount(FolioNumberInput,
      {
        propsData: {
          validate: true
        },
        vuetify
      })
    const vm: any = wrapper.vm

    // Set an invalid text
    wrapper.find('#folio-number-textfield').setValue('012345678901234567890123456789012345678901234567891')
    await flushPromises()

    // Should display validation message
    expect(wrapper.find('#folio-number-form').text()).toContain('Cannot exceed 50 characters')

    // Should emit valid as false
    expect(wrapper.emitted('valid').pop()).toEqual([false])

    wrapper.destroy()
  })

  it('should emit valid and folioNumber', async () => {
    const wrapper = mount(FolioNumberInput,
      {
        propsData: {
          validate: true
        },
        vuetify
      })
    const vm: any = wrapper.vm

    // Set a valid text
    wrapper.find('#folio-number-textfield').setValue('0123456789012345678901234567890123456789!@#$%^&*()')
    await flushPromises()

    // Should not show validation message
    expect(wrapper.find('#folio-number-form').text()).not.toContain('Cannot exceed 50 characters')

    // Should emit valid
    expect(wrapper.emitted('valid').pop()).toEqual([true])

    // Should emit the new value
    expect(wrapper.emitted('emitFolioNumber').pop()[0]).toEqual('0123456789012345678901234567890123456789!@#$%^&*()')

    wrapper.destroy()
  })
})
