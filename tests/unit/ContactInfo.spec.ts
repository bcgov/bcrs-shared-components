import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { ContactInfo } from '@/components/contact-info'
import { ContactPointIF } from '@/interfaces'
import VueRouter from 'vue-router'

const vuetify = new Vuetify({})
const localVue = createLocalVue()
localVue.use(VueRouter)

// Input field selectors to test changes to the DOM elements.
const emailSelector = '#txt-email'
const confirmEmailSelector = '#txt-confirm-email'
const phoneSelector = '#txt-phone'
const extensionSelector = '#txt-phone-extension'
const formSelector = '[name="business-contact-form"]'
const readOnlyEmailSelector = '#lbl-email'
const readOnlyPhoneSelector = '#lbl-phone'
const editButtonSelector = '#contact-info-edit-btn'
const undoButtonSelector = '#contact-info-undo-btn'
const doneButtonSelector = '#contact-info-done-btn'
const cancelBtnSelector = '#contact-info-cancel-btn'

const originalBusinessContactInfo: ContactPointIF = {
  email: 'abc@test.com',
  confirmEmail: 'abc@test.com',
  phone: '(555) 555-5555',
  extension: null
}

const editedBusinessContactInfo: ContactPointIF = {
  email: 'abc@test.com',
  confirmEmail: 'abc@test.com',
  phone: '(666) 555-5555',
  extension: 123
}

/**
 * Creates and mounts a component, so that it can be tested.
 *
 * @param originalContactInfo The contact info in the original IA.
 * @param contactInfo The contact info in the store.
 * @param hasBusinessContactInfoChange Boolean indicating changes
 * @returns a Wrapper<BusinessContactInfo> object with the given parameters.
 */
function createComponent (
  originalContactInfo: ContactPointIF,
  contactInfo: ContactPointIF,
  hasBusinessContactInfoChange = false,
  customMsg = null as string,
  disableActionTooltip = false,
  editLabel = ''):
  Wrapper<ContactInfo> {
  return mount(ContactInfo, {
    propsData: {
      businessContact: contactInfo,
      originalBusinessContact: originalContactInfo,
      hasBusinessContactInfoChange: hasBusinessContactInfoChange,
      customMsg: customMsg,
      disableActionTooltip: disableActionTooltip,
      editLabel: editLabel
    },
    vuetify,
    localVue
  })
}

describe('Business Contact Info component', () => {
  it('Loads the component in read only mode and displays data', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    expect(wrapper.find(readOnlyEmailSelector).text()).toEqual(originalBusinessContactInfo.email)

    expect(wrapper.find(readOnlyPhoneSelector).text()).toEqual(originalBusinessContactInfo.phone)
    wrapper.destroy()
  })

  it('Loads the component in read only mode and shows corrected labels', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, editedBusinessContactInfo)

    expect(wrapper.find(readOnlyEmailSelector).text()).toEqual(editedBusinessContactInfo.email)
    expect(wrapper.find(readOnlyPhoneSelector).text()).toContain(editedBusinessContactInfo.phone)
    expect(wrapper.find(readOnlyPhoneSelector).text()).toContain('Ext: ' + editedBusinessContactInfo.extension)
    wrapper.destroy()
  })

  it('Shows correct button for no change in contact info', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)

    expect(wrapper.find(editButtonSelector).exists()).toBe(true)
    expect(wrapper.find(undoButtonSelector).exists()).toBe(false)
    wrapper.destroy()
  })

  it('Shows undo button if there are corrections to business info', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, editedBusinessContactInfo, true)

    expect(wrapper.find(editButtonSelector).exists()).toBe(false)
    expect(wrapper.find(undoButtonSelector).exists()).toBe(true)
    wrapper.destroy()
  })

  it('Shows business contact form with values populated when correct button is clicked', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.find(editButtonSelector).trigger('click')
    await Vue.nextTick()

    expect(wrapper.find(formSelector).exists()).toBe(true)
    expect((<HTMLInputElement> wrapper.find(emailSelector).element).value).toEqual(originalBusinessContactInfo.email)
    expect((<HTMLInputElement> wrapper.find(confirmEmailSelector).element).value)
      .toEqual(originalBusinessContactInfo.email)
    expect((<HTMLInputElement> wrapper.find(phoneSelector).element).value).toEqual(originalBusinessContactInfo.phone)
    expect((<HTMLInputElement> wrapper.find(extensionSelector).element).value).toBe('') // empty
    expect(wrapper.find(doneButtonSelector).exists()).toBe(true)
    expect(wrapper.find(cancelBtnSelector).exists()).toBe(true)
  })

  it('Loads the component with the default msg', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.find(editButtonSelector).trigger('click')
    await Vue.nextTick()

    expect(wrapper.find('.summary-section .col-sm-9').text())
      .toContain('There is no fee or filing to change Registered Office Contact Information.')

    wrapper.destroy()
  })

  it('Loads the component with a custom label', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.setProps({ contactLabel: 'Business' })

    wrapper.find(editButtonSelector).trigger('click')
    await Vue.nextTick()

    expect(wrapper.find('.summary-section .col-sm-9').text())
      .toContain('There is no fee or filing to change Business Contact Information.')

    wrapper.destroy()
  })

  it('Loads the component with a custom msg', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(
        originalBusinessContactInfo,
        originalBusinessContactInfo,
        null,
        'mock custom message'
      )
    wrapper.find(editButtonSelector).trigger('click')
    await Vue.nextTick()

    expect(wrapper.find('.summary-section .col-sm-9').text()).toBe('mock custom message')

    wrapper.destroy()
  })

  it('Displays correctly when the phone number is optional', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(
        originalBusinessContactInfo,
        originalBusinessContactInfo
      )
    wrapper.find(editButtonSelector).trigger('click')
    await Vue.nextTick()

    // Verify base label
    expect(wrapper.findAll('label').at(6).text()).toEqual('Phone Number')

    // Set optional prop
    wrapper.setProps({ optionalPhone: true })
    await Vue.nextTick()

    // Verify optional label
    expect(wrapper.findAll('label').at(6).text()).toEqual('Phone Number (Optional)')

    wrapper.destroy()
  })
})
