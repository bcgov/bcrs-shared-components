import Vue from 'vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectNameToNumber from '@/components/correct-name/CorrectNameToNumber.vue'

function getLastEvent (wrapper: Wrapper<CorrectNameToNumber>, name: string): any {
  const eventsList = wrapper.emitted(name) as Array<any>
  if (eventsList) {
    const events = eventsList[eventsList.length - 1] as Array<any>
    return events[0]
  }
  return null
}

describe.skip('CorrectNameToNumber', () => {
  let vuetify: any
  let wrapperFactory: any

  beforeEach(() => {
    // *** TODO: assign this outside describe block?
    vuetify = new Vuetify({})

    // *** TODO: set this as a prop
    // store.state.stateModel.nameRequest = {
    //   legalName: 'Bobs Plumbing',
    //   legalType: 'BEN'
    // }

    wrapperFactory = (propsData: any) => {
      return mount(CorrectNameToNumber, {
        propsData,
        vuetify
      })
    }
  })

  it('renders the CorrectNameToNumber Component', async () => {
    const wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectNameToNumber).exists()).toBe(true)
  })

  it('verifies the checkbox default state', async () => {
    const wrapper = wrapperFactory()
    await Vue.nextTick()

    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('valid')).toBeUndefined()
    expect(wrapper.emitted('update:nameRequest').legalName).toBe('Bobs Plumbing')
  })

  it('verifies the emission when checkbox state changes', async () => {
    const wrapper = wrapperFactory()
    await Vue.nextTick()

    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('valid')).toBeUndefined()

    // Select Name to Number Checkbox
    await nameToNumberInput.trigger('click')

    // Verify local state change and event emission
    expect(nameToNumberInput.attributes('aria-checked')).toBe('true')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    const nameRequest = wrapper.emitted('update:nameRequest')
    expect(nameRequest.legalType).toBe('BEN')
    expect(nameRequest.legalName).toBe('Bobs Plumbing')
  })

  it('verifies the form submission and verify global state change', async () => {
    const wrapper = wrapperFactory()
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await Vue.nextTick()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('valid')).toBeUndefined()

    // Select Name to Number Checkbox
    await nameToNumberInput.trigger('click')

    // Verify local state change and event emission
    expect(nameToNumberInput.attributes('aria-checked')).toBe('true')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(wrapper.emitted('update:nameRequest').legalName).toBe('Bobs Plumbing')

    // Submit Change
    await wrapper.setProps({ formType: 'correct-name-to-number' })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data changes
    const nameRequest = wrapper.emitted('update:nameRequest')
    expect(nameRequest.legalType).toBe('BEN')
    expect(nameRequest.legalName).toBeUndefined()
    expect(nameRequest.nrNumber).toBeUndefined()
  })
})
