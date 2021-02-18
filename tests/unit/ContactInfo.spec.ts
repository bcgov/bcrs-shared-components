import Vue from 'vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import mockRouter from './MockRouter'

import { ContactInfo } from '@/components/ContactInfo'
import { ContactIF } from '@/interfaces'
import VueRouter from 'vue-router'

Vue.use(Vuetify)

let vuetify = new Vuetify({})

// Events
const haveChangesEvent = 'haveChanges'
const formDataChangeEvent = 'contactInfoChange'

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
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = mockRouter.mock()

/**
 * Returns the last event for a given name, to be used for testing event propagation in response to component changes.
 *
 * @param wrapper the wrapper for the component that is being tested.
 * @param name the name of the event that is to be returned.
 *
 * @returns the value of the last named event for the wrapper.
 */
function getLastEvent (wrapper: Wrapper<ContactInfo>, name: string): any {
  const eventsList: Array<any> = wrapper.emitted(name)
  if (eventsList) {
    const events: Array<any> = eventsList[eventsList.length - 1]
    return events[0]
  }
  return null
}

/**
 * Utility method to get around with the timing issues
 */
async function waitForUpdate (wrapper: Wrapper<Vue>) {
  await Vue.nextTick()
  await flushPromises()
  await Vue.nextTick()
}

const originalBusinessContactInfo: ContactIF = {
  email: 'abc@test.com',
  confirmEmail: 'abc@test.com',
  phone: '(555) 555-5555',
  extension: ''
}

const correctedBusinessContactInfo: ContactIF = {
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
  originalContactInfo: ContactIF, contactInfo: ContactIF, hasBusinessContactInfoChange: boolean = false):
  Wrapper<ContactInfo> {
  return mount(ContactInfo, {
    propsData: {
      businessContact: contactInfo,
      originalBusinessContact: originalContactInfo,
      hasBusinessContactInfoChange: hasBusinessContactInfoChange
    },
    vuetify,
    localVue,
    router
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
      createComponent(originalBusinessContactInfo, correctedBusinessContactInfo)

    expect(wrapper.find(readOnlyEmailSelector).text()).toEqual(correctedBusinessContactInfo.email)
    expect(wrapper.find(readOnlyPhoneSelector).text()).toContain(correctedBusinessContactInfo.phone)
    expect(wrapper.find(readOnlyPhoneSelector).text()).toContain('Ext: ' + correctedBusinessContactInfo.extension)
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
      createComponent(originalBusinessContactInfo, correctedBusinessContactInfo, true)

    expect(wrapper.find(correctButtonSelector).exists()).toBe(false)
    expect(wrapper.find(undoButtonSelector).exists()).toBe(true)
    wrapper.destroy()
  })

  it('Shows business contact form with values populated when correct button is clicked', async () => {
    const wrapper: Wrapper<ContactInfo> =
      createComponent(originalBusinessContactInfo, originalBusinessContactInfo, false)
    wrapper.find(correctButtonSelector).trigger('click')
    await waitForUpdate(wrapper)

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
})
