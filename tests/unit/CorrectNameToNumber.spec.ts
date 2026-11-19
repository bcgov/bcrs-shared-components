import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectNameToNumber from '@/components/correct-name/CorrectNameToNumber.vue'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'
import { CorpTypeCd } from '@bcrs-shared-components/corp-type-module'

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
  let wrapper: any

  beforeEach(() => {
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

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the CorrectNameToNumber Component', async () => {
    wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectNameToNumber).exists()).toBe(true)
  })

  it('verifies the checkbox default state', async () => {
    wrapper = wrapperFactory()
    const nameToNumberInput = wrapper.find('#correct-name-to-number-checkbox')

    await flushPromises()

    // Verify data
    expect(nameToNumberInput.attributes('aria-checked')).toBe('false')

    // formValid set false initially
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('verifies the emission when checkbox state changes', async () => {
    wrapper = wrapperFactory()
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
    wrapper = wrapperFactory()
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
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER,
      entityType: CorpTypeCd.BC_ULC_COMPANY })
    await flushPromises()

    // Verify Data changes
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. LTD.')
  })

  it('verifies the form submission, verify global state change, verify name rules', async () => {
    wrapper = wrapperFactory()
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
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER,
      entityType: CorpTypeCd.BC_ULC_COMPANY })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data changes
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('0871437 B.C. UNLIMITED LIABILITY COMPANY')
  })

  describe('numbered name', () => {
    // Changing formType is what triggers the submit watcher in the component
    async function submit (propsData: any): Promise<string> {
      wrapper = wrapperFactory(propsData)
      await flushPromises()
      await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME_TO_NUMBER })
      await flushPromises()
      return getLastEvent(wrapper, 'update:companyName')
    }

    const cases: Array<[string, string, CorpTypeCd, string]> = [
      ['BC company', 'BC0871437', CorpTypeCd.BC_COMPANY, '0871437 B.C. LTD.'],
      ['BC ULC', 'BC0871437', CorpTypeCd.BC_ULC_COMPANY, '0871437 B.C. UNLIMITED LIABILITY COMPANY'],
      ['BC CCC', 'BC0871437', CorpTypeCd.BC_CCC, '0871437 B.C. COMMUNITY CONTRIBUTION COMPANY LTD.'],
      ['continued-in (C)', 'C1234567', CorpTypeCd.CONTINUE_IN, '1234567 B.C. LTD.'],
      ['continued-in ULC (CUL)', 'C1234567', CorpTypeCd.ULC_CONTINUE_IN,
        '1234567 B.C. UNLIMITED LIABILITY COMPANY'],
      ['continued-in CCC', 'C1234567', CorpTypeCd.CCC_CONTINUE_IN,
        '1234567 B.C. COMMUNITY CONTRIBUTION COMPANY LTD.']
    ]

    it.each(cases)('builds the correct name for %s', async (_label, businessId, entityType, expected) => {
      expect(await submit({ businessId, entityType })).toBe(expected)
    })

    it('falls back to "Unknown" when the business id is empty', async () => {
      expect(await submit({ businessId: '' })).toBe('Unknown B.C. LTD.')
    })
  })
})
