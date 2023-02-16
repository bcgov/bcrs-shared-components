import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { ApprovalType } from '@/components/approval-type'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  draftCourtOrderNumber: string = '',
  draftApprovedByRegistrar: boolean = false,
  notice: string = '',
  application: string = '',
  filingType: string = 'restoration'
): Wrapper<ApprovalType> {
  return mount(ApprovalType, {
    propsData: {
      draftCourtOrderNumber,
      draftApprovedByRegistrar,
      notice,
      application,
      filingType
    },
    vuetify,
    localVue
  })
}

describe('Initialize ApprovalType component', () => {
  it('loads the component', () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    expect(wrapper.findComponent(ApprovalType).exists()).toBe(true)
    wrapper.destroy()
  })

  it('component default state has no fields populated', () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    expect(wrapper.vm.$data.courtOrderNumber).toBe('')
    expect(wrapper.vm.$data.approvalTypeSelected).toBe('')
    expect(wrapper.vm.$data.valid).toBe(true)
    wrapper.destroy()
  })

  it('if isConversionToFullRestoration prop true, alternative wording shown', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    expect(wrapper.find('label.v-label.theme--light').text())
      .toEqual('This restoration is approved by court order.')

    // Prompt validates through prop
    wrapper.setProps({
      filingType: 'conversion to full restoration'
    })
    await Vue.nextTick()
    expect(wrapper.find('label.v-label.theme--light').text())
      .toEqual('This conversion to full restoration is approved by court order.')
    wrapper.destroy()
  })

  it('component emits events when court order number entered', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Select court order radio to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    radio.setChecked(true)
    await Vue.nextTick()
    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('89123456')

    expect(wrapper.emitted('emitCourtNumberChange').pop()[0]).toEqual('89123456')
    expect(wrapper.emitted('emitRadioButtonChange').pop()[0]).toEqual('VIA COURT ORDER')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits events when court order radio selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Input text into text-field
    const input = wrapper.find('#court-order-radio')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('emitRadioButtonChange').pop()[0]).toEqual('VIA COURT ORDER')
    expect(wrapper.vm.$data.courtOrderNumRules).not.toEqual([])
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('fails valid if the court number is too small', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Select court order radio to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    radio.setChecked(true)
    await Vue.nextTick()
    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('1234')

    expect(wrapper.emitted('emitCourtNumberChange').pop()[0]).toEqual('1234')
    expect(wrapper.emitted('emitRadioButtonChange').pop()[0]).toEqual('VIA COURT ORDER')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('validates if the court number is too large', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Select court order radio to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    radio.setChecked(true)
    await Vue.nextTick()
    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('123456789012345678901')

    expect(wrapper.emitted('emitCourtNumberChange').pop()[0]).toEqual('123456789012345678901')
    expect(wrapper.emitted('emitRadioButtonChange').pop()[0]).toEqual('VIA COURT ORDER')
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('loads draft data correctly when court order selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent('1234-567890')
    expect(wrapper.vm.$data.courtOrderNumber).toBe('1234-567890')
    expect(wrapper.vm.$data.approvalTypeSelected).toEqual('VIA COURT ORDER')
    wrapper.destroy()
  })

  it('loads draft data correctly when approved by registrar selected', () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent(
      '',
      true
    )

    expect(wrapper.vm.$data.courtOrderNumber).toBe('')
    expect(wrapper.vm.$data.approvalTypeSelected).toBe('VIA REGISTRAR')
    wrapper.destroy()
  })

  it('component emits events (dates) when approved by registrar selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent(
      '',
      true,
      '2023-02-05',
      '2023-01-19'
    )
    await Vue.nextTick()

    expect(wrapper.emitted('emitNoticeDate').pop()[0]).toEqual('2023-02-05')
    expect(wrapper.emitted('emitApplicationDate').pop()[0]).toEqual('2023-01-19')
    wrapper.destroy()
  })
})
