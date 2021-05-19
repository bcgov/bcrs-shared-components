import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'

import { CourtOrderPoa } from '@/components/CourtOrderPoa'
import VueRouter from 'vue-router'

Vue.use(Vuetify)

let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a component, so that it can be tested.
 *
 * @param autoValidation The validation prompt.
 * @param draftCourtOrderNumber The draft court number.
 * @param draftPlanOfArrangement The draft plan of arrangement.
 * @returns a Wrapper<CourtOrderPoa> object with the given parameters.
 */
function createComponent (
  autoValidation: boolean = false,
  draftCourtOrderNumber: string = '',
  hasDraftPlanOfArrangement: boolean = false,
  displaySideLabels: boolean = undefined
): Wrapper<CourtOrderPoa> {
  return mount(CourtOrderPoa, {
    propsData: {
      autoValidation,
      draftCourtOrderNumber,
      hasDraftPlanOfArrangement,
      displaySideLabels
    },
    vuetify,
    localVue
  })
}

describe('Court Order and Plan of Arrangement component', () => {
  it('loads the component', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()
    expect(wrapper.findComponent(CourtOrderPoa).exists()).toBe(true)

    wrapper.destroy()
  })

  it('validates if poa is selected and court order number is empty', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Prompt validates through prop
    wrapper.setProps({ autoValidation: true })
    await Vue.nextTick()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)
    expect(wrapper.find('#court-num-form').text()).toContain('A Court Order number is required')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)

    wrapper.destroy()
  })

  it('does NOT validate for required court order number if poa is NOT selected', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Prompt validates through prop
    wrapper.setProps({ autoValidation: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toBe('Court Order Number')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(true)

    wrapper.destroy()
  })

  it('validates if courtOrderNumberRequired and court order number is empty', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Prompt validates through prop
    wrapper.setProps({
      autoValidation: true,
      courtOrderNumberRequired: true
    })
    await Vue.nextTick()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)
    expect(wrapper.find('#court-num-form').text()).toContain('A Court Order number is required')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)

    wrapper.destroy()
  })

  it('validates if the court number is too small', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Prompt validates through prop
    wrapper.setProps({ autoValidation: true })
    await Vue.nextTick()

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('Test')
    await Vue.nextTick()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)
    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Verify it continues invalid
    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')
    expect(wrapper.emitted().emitValid.length).toBe(1)

    wrapper.destroy()
  })

  it('validates if the court number is too large', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Prompt validates through prop
    wrapper.setProps({ autoValidation: true })
    await Vue.nextTick()

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('Testing for an invalid character length court order number')
    await Vue.nextTick()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)
    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Verify it continues invalid
    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')
    expect(wrapper.emitted().emitValid.length).toBe(1)

    wrapper.destroy()
  })

  it('validates if the court number correctly', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('mockCorrectNumber')
    await Vue.nextTick()

    // Prompt validates through prop
    wrapper.setProps({ autoValidation: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toContain('Court Order Number')
    expect(wrapper.vm.$data.valid).toBe(true)
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(true)

    wrapper.destroy()
  })

  it('loads draft data correctly', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent(null, '1234-567890', true)
    await Vue.nextTick()

    // Verify draft num
    expect(wrapper.vm.$data.courtOrderNumber).toBe('1234-567890')

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    wrapper.destroy()
  })

  it('validates it does not show side labes when disabled', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    expect(wrapper.find('#court-order-label').exists()).toBeTruthy()
    expect(wrapper.find('#poa-label').exists()).toBeTruthy()

    wrapper.setProps({ displaySideLabels: false })
    await Vue.nextTick()

    expect(wrapper.find('#court-order-label').exists()).toBeFalsy()
    expect(wrapper.find('#poa-label').exists()).toBeFalsy()

    wrapper.destroy()
  })
})
