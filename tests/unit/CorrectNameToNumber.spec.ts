import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectNameToNumber from '@/components/correct-name/CorrectNameToNumber.vue'
import { CorpTypeCd, CorrectNameOptions } from '@bcrs-shared-components/enums'

const vuetify = new Vuetify({})

function getLastEvent (wrapper: Wrapper<CorrectNameToNumber>, name: string): any {
  const eventsList: Array<any> = wrapper.emitted(name)
  if (eventsList) {
    const events: Array<any> = eventsList[eventsList.length - 1]
    return events[0]
  }
  return null
}

const defaultProps = {
  businessId: 'BC0871437',
  entityType: CorpTypeCd.BC_COMPANY,
  formType: null,
  validate: false
}

describe('CorrectNameToNumber', () => {
  let wrapperFactory: any

  beforeEach(() => {
    // *** TODO: set this as a prop
    // store.state.stateModel.nameRequest = {
    //   legalName: 'Bobs Plumbing',
    //   legalType: 'BEN'
    // }

    wrapperFactory = (propsData: any) => {
      return mount(CorrectNameToNumber, {
        propsData: {
          ...defaultProps,
          ...propsData
        },
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
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await flushPromises()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')

    // formValid set false initially
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('verifies the emission when checkbox state changes', async () => {
    const wrapper = wrapperFactory()
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await flushPromises()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')

    // Select Name to Number Checkbox
    await nameToNumberInput.trigger('click')

    // Verify local state change and event emission
    expect(nameToNumberInput.attributes('aria-checked')).toBe('true')

    // Submit Change
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER })
    await flushPromises()

    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. LTD.')
  })

  it('verifies the form submission and verify global state change', async () => {
    const wrapper = wrapperFactory()
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await flushPromises()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')

    // Select Name to Number Checkbox
    await nameToNumberInput.trigger('click')

    // Verify local state change and event emission
    expect(nameToNumberInput.attributes('aria-checked')).toBe('true')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(getLastEvent(wrapper, 'update:companyName')).toBe(null)

    // Submit Change
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data changes
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. LTD.')

    // Submit Change
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER, entityType: CorpTypeCd.BC_ULC_COMPANY })
    await flushPromises()

    // Verify Data changes
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. LTD.')
  })

  it('verifies the form submission, verify global state change, verify name rules', async () => {
    const wrapper = wrapperFactory()
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await flushPromises()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')

    // Select Name to Number Checkbox
    await nameToNumberInput.trigger('click')

    // Verify local state change and event emission
    expect(nameToNumberInput.attributes('aria-checked')).toBe('true')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(getLastEvent(wrapper, 'update:companyName')).toBe(null)

    // Submit Change
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER, entityType: CorpTypeCd.BC_ULC_COMPANY })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data changes
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. UNLIMITED LIABILITY COMPANY')
  })
})
