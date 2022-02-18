import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { ContactInfo } from '@/components/ContactInfo'
import { ContactPointIF } from '@/interfaces'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

// Input field selectors to test changes to the DOM elements.
const emailSelector: string = '#txt-email'
const confirmEmailSelector: string = '#txt-confirm-email'
const phoneSelector: string = '#txt-phone'
const extensionSelector: string = '#txt-phone-extension'
const formSelector: string = '[name="business-contact-form"]'
const readOnlyEmailSelector: string = '#lbl-email'
const readOnlyPhoneSelector: string = '#lbl-phone'
const correctButtonSelector: string = '#btn-correct-contact-info'
const undoButtonSelector: string = '#btn-undo-contact-info'
const doneButtonSelector: string = '#done-btn'
const cancelBtnSelector: string = '#cancel-btn'

const originalBusinessContactInfo: ContactPointIF = {
  email: 'abc@test.com',
  confirmEmail: 'abc@test.com',
  phone: '(555) 555-5555',
  extension: ''
}

const editedBusinessContactInfo: ContactPointIF = {
  email: 'abc@test.com',
  confirmEmail: 'abc@test.com',
  phone: '(666) 555-5555',
  extension: '123'
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
  hasBusinessContactInfoChange: boolean = false,
  customMsg: string = null):
  Wrapper<ContactInfo> {
  return mount(ContactInfo, {
    propsData: {
      businessContact: contactInfo,
      originalBusinessContact: originalContactInfo,
      hasBusinessContactInfoChange: hasBusinessContactInfoChange,
      customMsg: customMsg
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

    expect(wrapper.find(correctButtonSelector).exists()).toBe(true)
    expect(wrapper.find(undoButtonSelector).exists()).toBe(false)
    wrapper.destroy()
  })

  it('Shows undo button if there are corrections to business info', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, editedBusinessContactInfo, true)

    expect(wrapper.find(correctButtonSelector).exists()).toBe(false)
    expect(wrapper.find(undoButtonSelector).exists()).toBe(true)
    wrapper.destroy()
  })

  it('Shows business contact form with values populated when correct button is clicked', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.find('#btn-correct-contact-info').trigger('click')
    await Vue.nextTick()

    expect(wrapper.find(formSelector).exists()).toBe(true)
    expect((<HTMLInputElement> wrapper.find(emailSelector).element).value).toEqual(originalBusinessContactInfo.email)
    expect((<HTMLInputElement> wrapper.find(confirmEmailSelector).element).value)
      .toEqual(originalBusinessContactInfo.email)
    expect((<HTMLInputElement> wrapper.find(phoneSelector).element).value).toEqual(originalBusinessContactInfo.phone)
    expect((<HTMLInputElement> wrapper.find(extensionSelector).element).value)
      .toEqual(originalBusinessContactInfo.extension)
    expect(wrapper.find(doneButtonSelector).exists()).toBe(true)
    expect(wrapper.find(cancelBtnSelector).exists()).toBe(true)
  })

  it('Loads the component with the default msg', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.find('#btn-correct-contact-info').trigger('click')
    await Vue.nextTick()

    expect(wrapper.findAll('.info-text').at(0).text()).toEqual('There is no fee to change ' +
      'Registered Office Contact Information. Any changes made will be applied immediately.')

    wrapper.destroy()
  })

  it('Loads the component with a custom label', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo)
    wrapper.setProps({ contactLabel: 'Business' })

    wrapper.find('#btn-correct-contact-info').trigger('click')
    await Vue.nextTick()

    expect(wrapper.findAll('.info-text').at(0).text()).toEqual('There is no fee to change ' +
      'Business Contact Information. Any changes made will be applied immediately.')

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
    wrapper.find('#btn-correct-contact-info').trigger('click')
    await Vue.nextTick()

    expect(wrapper.findAll('.info-text').at(0).text()).toEqual('mock custom message')

    wrapper.destroy()
  })
})
