import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { ApprovalType } from '@/components/approval-type'
import VueRouter from 'vue-router'

const vuetify = new Vuetify({})
const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  courtOrderNumber = '',
  approvedByRegistrar = false,
  noticeDate = '',
  applicationDate = '',
  filingType = 'restoration',
  isExtension = false
): Wrapper<ApprovalType> {
  return mount(ApprovalType, {
    propsData: {
      courtOrderNumber,
      approvedByRegistrar,
      noticeDate,
      applicationDate,
      filingType,
      isExtension
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
    expect(wrapper.vm.$data.courtOrderNumberText).toBe('')
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
    await radio.setChecked(true)

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    await input.setValue('89123456')

    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('89123456')
    expect(wrapper.emitted('radioButtonChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits events when court order radio selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Input text into text-field
    const input = wrapper.find('#court-order-radio')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('radioButtonChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.vm.$data.courtOrderNumRules).not.toEqual([])
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
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

    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('1234')
    expect(wrapper.emitted('radioButtonChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
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

    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('123456789012345678901')
    expect(wrapper.emitted('radioButtonChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('loads draft data correctly when court order selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent('1234-567890')
    expect(wrapper.vm.$data.courtOrderNumberText).toBe('1234-567890')
    expect(wrapper.vm.$data.approvalTypeSelected).toEqual('courtOrder')
    wrapper.destroy()
  })

  it('loads draft data correctly when approved by registrar selected', () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent(
      '',
      true
    )

    expect(wrapper.vm.$data.courtOrderNumberText).toBe('')
    expect(wrapper.vm.$data.approvalTypeSelected).toBe('registrar')
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

    expect(wrapper.emitted('update:noticeDate').pop()[0]).toEqual('2023-02-05')
    expect(wrapper.emitted('update:applicationDate').pop()[0]).toEqual('2023-01-19')
    wrapper.destroy()
  })

  it('loads draft data correctly when court order selected when draft is extension', () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent('1234-567890', false, '', '', 'restoration', true)
    expect(wrapper.vm.$data.courtOrderNumberText).toBe('1234-567890')
    expect(wrapper.vm.$data.approvalTypeSelected).toEqual('courtOrder')
    wrapper.destroy()
  })
})
