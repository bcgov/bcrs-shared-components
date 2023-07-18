import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectCompanyName from '@/components/correct-name/CorrectCompanyName.vue'

function getLastEvent (wrapper: Wrapper<CorrectCompanyName>, name: string): any {
  const eventsList = wrapper.emitted(name) as Array<any>
  if (eventsList) {
    const events = eventsList[eventsList.length - 1] as Array<any>
    return events[0]
  }
  return null
}

describe.skip('CorrectCompanyName', () => {
  let vuetify: any
  let wrapperFactory: any

  beforeEach(() => {
    // *** TODO: assign this outside describe block?
    vuetify = new Vuetify({})

    // *** TODO: set this as a prop
    // store.state.stateModel.nameRequest.legalName = 'Bobs Plumbing'

    wrapperFactory = (propsData: any) => {
      return mount(CorrectCompanyName, {
        propsData,
        vuetify
      })
    }
  })

  it('renders the CorrectCompanyName Component', async () => {
    const wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectCompanyName).exists()).toBe(true)
  })

  it('verifies the text field populated from prop', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')

    // *** TODO: replace these with await Vue.nextTick() after wrapper?
    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('Bobs Plumbing')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('verifies it is invalid with no Company Name', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')
    wrapper.vm.companyName = null

    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('')
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('verifies the done emission when the change is complete', async () => {
    const wrapper = wrapperFactory()
    const companyNameInput = wrapper.find('#company-name-input')
    wrapper.vm.companyName = 'Bob\'s Plumbing Ltd.'

    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('Bob\'s Plumbing Ltd.')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)

    // Submit Change
    await wrapper.setProps({ formType: 'correct-name' })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data change
    expect(getLastEvent(wrapper, 'update:nameRequest')).toBe('Bob\'s Plumbing Ltd.')
  })
})
