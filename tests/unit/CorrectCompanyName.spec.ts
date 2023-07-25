import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectCompanyName from '@/components/correct-name/CorrectCompanyName.vue'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'

const vuetify = new Vuetify({})

const inputSelector = '#company-name-textfield'

function getLastEvent (wrapper: Wrapper<CorrectCompanyName>, name: string): any {
  const eventsList: Array<any> = wrapper.emitted(name)
  if (eventsList) {
    const events: Array<any> = eventsList[eventsList.length - 1]
    return events[0]
  }
  return null
}

const defaultProps = {
  companyName: 'Old Company Name',
  formType: null,
  validate: false
}

describe('CorrectCompanyName', () => {
  let wrapperFactory: any
  let wrapper: any

  beforeEach(() => {
    wrapperFactory = (propsData: any) => {
      return mount(CorrectCompanyName, {
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

  // *** TODO: wrapper should be destroyed due to avoid wasting memory?
  it('renders the CorrectCompanyName Component', async () => {
    wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectCompanyName).exists()).toBe(true)
  })

  it('verifies the text field populated from prop', async () => {
    wrapper = wrapperFactory()
    const companyNameInput = wrapper.find(inputSelector)

    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('Old Company Name')

    // formValid set false initially
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('verifies it is invalid with no Company Name', async () => {
    wrapper = wrapperFactory()
    const companyNameInput = wrapper.find(inputSelector)
    wrapper.vm.$data.textfield = ''

    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('')
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('verifies the done emission when the change is complete', async () => {
    wrapper = wrapperFactory()
    const companyNameInput = wrapper.find(inputSelector)
    wrapper.vm.$data.textfield = 'New Company Name'

    await flushPromises()

    // Verify data
    expect(companyNameInput.element.value).toBe('New Company Name')
    expect(getLastEvent(wrapper, 'valid')).toBe(true)

    // Submit Change
    await wrapper.setProps({ formType: CorrectNameOptions.CORRECT_NAME })
    await flushPromises()

    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // Verify Data change
    expect(getLastEvent(wrapper, 'update:companyName')).toBe('New Company Name')
  })
})
