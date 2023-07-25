import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { mount, Wrapper } from '@vue/test-utils'
import CorrectNameRequest from '@/components/correct-name/CorrectNameRequest.vue'

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
  request_action_cd: 'CNV',
  applicants: {
    phoneNumber: '250 516 8257',
    emailAddress: 'mock@example.com'
  }
}

const fetchAndValidateNr = (nrNumber, businessId, applicantPhone, applicantEmail) => {
  if (nrNumber !== nameRequest.nrNum) return null
  if (applicantEmail && applicantEmail !== nameRequest.applicants.emailAddress) return null
  if (applicantPhone && applicantPhone !== nameRequest.applicants.phoneNumber) return null

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

describe('CorrectNameRequest', () => {
  let wrapperFactory: any
  let wrapper: any

  beforeEach(() => {
    wrapperFactory = (propsData: any) => {
      return mount(CorrectNameRequest, {
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

  it('renders the CorrectNameRequest Component', async () => {
    wrapper = wrapperFactory()

    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
  })

  it('verify the text fields and there label', async () => {
    wrapper = wrapperFactory()

    const textFields = wrapper.findAll('.text-input-field')
    const nrInput = textFields.at(0)
    const phoneInput = textFields.at(1)
    const emailInput = textFields.at(2)

    expect(nrInput.text()).toContain('Enter the NR Number')
    expect(phoneInput.text()).toContain('Applicant\'s Phone Number')
    expect(emailInput.text()).toContain('Applicant\'s Notification Email')
  })

  it('verifies inputs when valid', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true) // default formValid is not false

    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '123 456 7890'
    wrapper.vm.applicantEmail = 'mock@example.com'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)
  })

  it('verifies invalid NR', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = '123123NR'
    wrapper.vm.applicantEmail = 'mock@example.com'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(false)
  })

  it('verifies invalid email', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = '123123NR'
    wrapper.vm.applicantEmail = 'mockemail.com'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(false)
  })

  it('verifies invalid phone', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = '123123NR'
    wrapper.vm.applicantPhone = '123 456 7890 1212'

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(false)
  })

  it('verifies missing values', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = '123123NR'
    wrapper.vm.applicantPhone = ''
    wrapper.vm.applicantEmail = ''

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(false)
  })

  it('emits true when the form is valid', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('emits false when the form is invalid', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = ''
    wrapper.vm.applicantEmail = ''

    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)
    expect(getLastEvent(wrapper, 'valid')).toBe(null)
  })

  it('emits done and true when the process is done and the Name Request accepted', async () => {
    wrapper = wrapperFactory()

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
    expect(getLastEvent(wrapper, 'saved')).toBe(true)
  })

  it('emits done and false when the process is done but Name Request phone is rejected', async () => {
    wrapper = wrapperFactory()

    // Verify Invalid before input
    wrapper.vm.nrNumber = ''
    wrapper.vm.applicantPhone = ''
    wrapper.vm.applicantEmail = ''
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8258'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'saved')).toBe(false)
  })

  it('emits done and false when the process is done but Name Request email is rejected', async () => {
    wrapper = wrapperFactory()

    // Verify Invalid before input
    wrapper.vm.nrNumber = ''
    wrapper.vm.applicantPhone = ''
    wrapper.vm.applicantEmail = ''
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = 'mockBad@email.com'
    await wrapper.setProps({ formType: 'correct-new-nr' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'saved')).toBe(false)
  })

  it('emits done and prompts confirm dialog when the Name Request is a type mismatch', async () => {
    wrapper = wrapperFactory()

    // Verify Invalid before input
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr', entityType: 'B' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify Confirm Dialog
    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectNameRequest).text()).toContain('Name Request Type Does Not Match')
  })

  it('emits done and verify Name Request accepted for NEW GP filing', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'saved')).toBe(true)
  })

  it('emits done and verify Name Request is a type mismatch for NEW SP filing', async () => {
    wrapper = wrapperFactory()

    // *** TODO: set these as props
    // store.state.stateModel.tombstone.currentDate = '2021-01-20'
    // store.state.stateModel.tombstone.entityType = 'SP'

    // *** TODO: set this as a prop
    // GET NR Data
    // get.withArgs('nameRequests/NR 1234567')
    //   .returns(Promise.resolve({
    //     data:
    //       {
    //         state: 'APPROVED',
    //         expirationDate: '2022-05-19',
    //         names: [{
    //           state: 'APPROVED',
    //           name: 'Bobs Plumbing'
    //         }],
    //         nrNum: 'NR 1234567',
    //         requestTypeCd: 'SP',
    //         request_action_cd: 'CHG',
    //         applicants: {
    //           phoneNumber: '250 516 8257',
    //           emailAddress: 'mock@example.com'
    //         }
    //       }
    //   }))

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr', entityType: 'SP' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify Confirm Dialog
    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectNameRequest).text()).toContain('Name Request Type Does Not Match')
  })

  it('emits done and verify data changes', async () => {
    wrapper = wrapperFactory()

    // Verify valid before input
    expect(wrapper.vm.formValid).toBe(true)

    // Set values and submit form
    wrapper.vm.nrNumber = 'NR 1234567'
    wrapper.vm.applicantPhone = '250 516 8257'
    wrapper.vm.applicantEmail = ''
    await wrapper.setProps({ formType: 'correct-new-nr' })
    await flushPromises()

    expect(wrapper.vm.formValid).toBe(true)

    // verify form emission
    expect(getLastEvent(wrapper, 'saved')).toBe(true)

    // verify data change
    const updatedNr = getLastEvent(wrapper, 'update:nameRequest')
    expect(updatedNr.legalType).toBe('BC')
    expect(updatedNr.legalName).toBeUndefined()
    expect(updatedNr.nrNumber).toBeUndefined()

    expect(getLastEvent(wrapper, 'update:companyName')).toBe('Bobs Plumbing')
  })
})
