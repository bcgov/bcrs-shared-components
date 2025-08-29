import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectNameRequestStaff from '@/components/correct-name/CorrectNameRequestStaff.vue'

// mock console.warn to hide "[Vuetify] Unable to locate target XXX"
console.warn = vitest.fn()
// mock window.alert to fix "TypeError: alert is not a function"
window.alert = vitest.fn()

const vuetify = new Vuetify({})

function getLastEvent (wrapper: Wrapper<any>, name: string): any {
  const eventsList = wrapper.emitted(name) as Array<any>
  if (eventsList) {
    const events = eventsList[eventsList.length - 1] as Array<any>
    return events[0]
  }
  return null
}

const nameRequest = {
  state: 'APPROVED',
  expirationDate: '2022-05-19',
  names: [{
    state: 'APPROVED',
    name: 'Bobs Plumbing'
  }],
  nrNum: 'NR 1234567',
  requestTypeCd: 'BC',
  legalType: 'BC',
  corpNum: 'BC0871437',
  request_action_cd: 'CNV'
}

const fetchAndValidateNr = (nrNumber) => {
  if (nrNumber !== nameRequest.nrNum) {
    throw new Error('wrong NR number')
  }

  return Promise.resolve(nameRequest)
}

const defaultProps = {
  businessId: 'BC0871437',
  entityType: 'BC',
  fetchAndValidateNr,
  formType: null,
  nameRequest: nameRequest,
  validate: true
}

describe('CorrectNameRequestStaff', () => {
  let wrapperFactory: any
  let wrapper: any

  beforeEach(() => {
    wrapperFactory = (propsData: any) => {
      return mount(CorrectNameRequestStaff, {
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

  it('renders the CorrectNameRequestStaff Component', async () => {
    wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectNameRequestStaff).exists()).toBe(true)
  })

  it('verify the text fields and the label', async () => {
    wrapper = wrapperFactory()

    const textFields = wrapper.findAll('.text-input-field')
    const nrInput = textFields.at(0)

    expect(nrInput.text()).toContain('Enter the NR Number')
  })

  it('verifies inputs when valid', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true) // default formValid is not false

    wrapper.vm.nrNumber = 'NR 1234567'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)
  })

  it('verifies invalid NR', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = '123123NR'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(false)
  })

  it('emits true when the form is valid', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = 'NR 1234567'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('emits valid and saved when the process is done and the Name Request accepted', async () => {
    wrapper = wrapperFactory()

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    await wrapper.setProps({ formType: 'correct-new-nr-staff' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(getLastEvent(wrapper, 'saved')).toBe(true)
  })
})
