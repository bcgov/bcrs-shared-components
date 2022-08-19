import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, Wrapper } from '@vue/test-utils'
import { Certify } from '@/components/certify'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

// Input field selectors to test changes to the DOM elements.
const certifiedBySelector: string = 'input[type=text]'
const isCertifiedSelector: string = 'input[type=checkbox]'
const statementSelector: string = '.certify-stmt'

const trimmedCertifier = 'Some Certifier'
const whitespaceCertifier = '  Some  Certifier  '
const defaultDate = '2019-01-01'

/**
 * Returns the last event for a given name, to be used for testing event propagation in response to component changes.
 *
 * @param wrapper the wrapper for the component that is being tested.
 * @param name the name of the event that is to be returned.
 *
 * @returns the value of the last named event for the wrapper.
 */
function getLastEvent (wrapper: Wrapper<Certify>, name: string): any {
  const eventsList: Array<any> = wrapper.emitted(name)
  const events: Array<any> = eventsList[eventsList.length - 1]

  return events[0]
}

/**
 * Creates and mounts a component, so that it can be tested.
 *
 * @param certifiedBy the value to pass to the component for the name input. The default value is "undefined".
 * @param isCertified the value to pass to the component for the checkbox. The default value is "undefined". *
 * @returns a Wrapper<Certify> object with the given parameters.
 */
function createComponent (
  certifiedBy: string = undefined,
  isCertified: boolean = undefined,
  isStaff: boolean = undefined,
  currentDate: string = defaultDate,
  validate: boolean = false,
  invalidSection: boolean = false,
  statements: Array<string> = [],
  enableMailTo: boolean = false,
  businessEmail: string = '',
  completingPartyEmail: string = '',
  disableEdit: boolean = false
): Wrapper<Certify> {
  return mount(Certify, {
    propsData: {
      currentDate,
      certifiedBy,
      isCertified,
      isStaff,
      validate,
      invalidSection,
      statements,
      enableMailTo,
      businessEmail,
      completingPartyEmail,
      disableEdit
    },
    vuetify
  })
}

describe('Certify', () => {
  it('has date displayed', () => {
    const wrapper: Wrapper<Certify> = createComponent()

    // The text should contain the date.
    expect(wrapper.text()).toContain(defaultDate)
  })

  it('has statement with certifier', () => {
    const wrapper: Wrapper<Certify> = createComponent(trimmedCertifier)
    const statement: Wrapper<Vue> = wrapper.find(statementSelector)

    // The text should contain the certifier name.
    expect(statement.text()).toContain(trimmedCertifier)
  })

  it('does not disable the input field by default', () => {
    const wrapper: Wrapper<Certify> = createComponent()

    expect(wrapper.find('#certified-by-textfield').exists()).toBe(true)
    expect(wrapper.find('#certified-by-textfield').attributes('disabled')).toBeUndefined()
  })

  it('has statement with trimmed certifier', () => {
    const wrapper: Wrapper<Certify> = createComponent(whitespaceCertifier)
    const statement: Wrapper<Vue> = wrapper.find(statementSelector)

    // The text should contain the trimmed certifier name.
    expect(statement.text()).toContain(trimmedCertifier)
  })

  it('is invalid when no props are defined', () => {
    const wrapper: Wrapper<Certify> = createComponent()

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('is invalid when just certifiedBy is defined', () => {
    const wrapper: Wrapper<Certify> = createComponent(trimmedCertifier, undefined)

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('is invalid when just isCertified is defined', () => {
    const wrapper: Wrapper<Certify> = createComponent(undefined, true)

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('is invalid when just isStaff is defined', () => {
    const wrapper: Wrapper<Certify> = createComponent(undefined, undefined, true)

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('is valid when both certifiedBy and isCertified are defined', () => {
    const wrapper: Wrapper<Certify> = createComponent(trimmedCertifier, true)

    // The last "valid" event should indicate that the form is valid.
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('applies error class when invalid', () => {
    const wrapper: Wrapper<Certify> =
      createComponent(null, true, false, null, false, true)

    expect(wrapper.find('.invalid-section').exists()).toBe(true)
    expect(wrapper.find('.error-text').exists()).toBe(true)
  })

  it('calls validateFields when prompted by prop', async () => {
    const wrapper: Wrapper<Certify> =
      createComponent(null, true, false, null, false, true)
    const vm: any = wrapper.vm

    expect(vm.validate).toBe(false)

    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(vm.validate).toBe(true)
  })

  it('is valid when both certifiedBy, isCertified, and is staff are defined', () => {
    const wrapper: Wrapper<Certify> = createComponent(trimmedCertifier, true, true)

    // The last "valid" event should indicate that the form is valid.
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('is valid when certifier is defined and contains whitespace', () => {
    const wrapper: Wrapper<Certify> = createComponent(whitespaceCertifier, true)

    // The last "valid" event should indicate that the form is valid.
    expect(getLastEvent(wrapper, 'valid')).toBe(true)
  })

  it('is invalid when certifier is just whitespace', () => {
    const wrapper: Wrapper<Certify> = createComponent('  ', true)

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('is still invalid when certifier is just whitespace and form is certified', () => {
    const wrapper: Wrapper<Certify> = createComponent('  ', false)
    const checkboxElement: Wrapper<Vue> = wrapper.find(isCertifiedSelector)
    checkboxElement.setChecked()

    // The last "valid" event should indicate that the form is invalid.
    expect(getLastEvent(wrapper, 'valid')).toBe(false)
  })

  it('has update event for certifiedBy', () => {
    const wrapper: Wrapper<Certify> = createComponent()
    const inputElement: Wrapper<Vue> = wrapper.find(certifiedBySelector)
    inputElement.setValue(trimmedCertifier)

    // The last "update:certifiedBy" event should match the input.
    expect(getLastEvent(wrapper, 'update:certifiedBy')).toMatch(trimmedCertifier)
  })

  it('has update event for trimmed certifiedBy', () => {
    const wrapper: Wrapper<Certify> = createComponent()
    const inputElement: Wrapper<Vue> = wrapper.find(certifiedBySelector)
    inputElement.setValue(whitespaceCertifier)

    // The last "update:certifiedBy" event should be a trimmed version of the input.
    expect(getLastEvent(wrapper, 'update:certifiedBy')).toMatch(trimmedCertifier)
  })

  it('has update event for isCertified', () => {
    const wrapper: Wrapper<Certify> = createComponent()
    const checkboxElement: Wrapper<Vue> = wrapper.find(isCertifiedSelector)
    checkboxElement.setChecked()

    // The last "update:isCertified" event should indicate that the checkbox is checked.
    expect(getLastEvent(wrapper, 'update:isCertified')).toBe(true)
  })

  it('hides the mail-to section by default', () => {
    const wrapper: Wrapper<Certify> =
      createComponent(null, true, false, null, false, true, [])

    expect(wrapper.find('.email-addresses').exists()).toBe(false)
  })

  it('displays the mail-to section', () => {
    const wrapper: Wrapper<Certify> =
      createComponent(null, true, false, null, false, true, [], true, 'mockBusinessEmail', 'mockPartyEmail')

    expect(wrapper.find('.email-addresses').exists()).toBe(true)
    expect(wrapper.find('#business-email').text()).toContain('mockBusinessEmail')
    expect(wrapper.find('#completing-party-email').text()).toContain('mockPartyEmail')
  })

  it('disables input field when prop is passed true', () => {
    const wrapper: Wrapper<Certify> = createComponent(null, true, false, null, false, false, [], true,
      'mockBusinessEmail', 'mockPartyEmail', true)

    expect(wrapper.find('#certified-by-textfield').exists()).toBe(true)
    expect(wrapper.find('#certified-by-textfield').attributes('disabled')).toBeTruthy()
  })
})
