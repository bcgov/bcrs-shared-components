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
  approvedByCourtOrder = false,
  filingType = 'restoration',
  noticeDate = '',
  applicationDate = '',
  invalidSection = false,
  isCourtOrderRadio = true,
  validate = false
): Wrapper<ApprovalType> {
  return mount(ApprovalType, {
    propsData: {
      courtOrderNumber,
      approvedByRegistrar,
      approvedByCourtOrder,
      filingType,
      noticeDate,
      applicationDate,
      invalidSection,
      isCourtOrderRadio,
      validate
    },
    vuetify,
    localVue
  })
}

describe('ApprovalType component', () => {
  let wrapper: Wrapper<ApprovalType>
  let vm: any

  beforeEach(() => {
    wrapper = createDefaultComponent()
    vm = wrapper.vm
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('loads the component', () => {
    expect(wrapper.findComponent(ApprovalType).exists()).toBe(true)
  })

  it('populates default property values', () => {
    expect(vm.$data.approvalTypeSelected).toBeNull()
    expect(vm.$data.courtOrderNumberText).toBe('')
    expect(vm.$data.noticeDateText).toBe('')
    expect(vm.$data.applicationDateText).toBe('')
  })

  it('displays default and updated court order button wording', async () => {
    // verify court order radio button default wording
    await wrapper.setProps({
      approvedByCourtOrder: true
    })
    expect(wrapper.find('.v-label').text())
      .toEqual('This restoration is approved by court order.')

    // verify court order radio button updated wording
    await wrapper.setProps({
      filingType: 'conversion to full restoration'
    })
    expect(wrapper.find('.v-label').text())
      .toEqual('This conversion to full restoration is approved by court order.')
  })

  it('emits events when court order is selected and number is entered', async () => {
    // check the court order radio button to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    await radio.setChecked(true)

    // set text-field value
    const input = wrapper.find('#court-order-number-input')
    await input.setValue('89123456')

    // verify emitted events
    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('89123456')
    expect(wrapper.emitted('approvalTypeChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
  })

  it('emits invalid if court order number is too short', async () => {
    await wrapper.setProps({
      validate: true
    })

    // check the court order radio button to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    await radio.setChecked(true)

    // set text-field value
    const input = wrapper.find('#court-order-number-input')
    await input.setValue('1234')

    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('1234')
    expect(wrapper.emitted('approvalTypeChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
  })

  it('emits invalid if court order numbed is too long', async () => {
    await wrapper.setProps({
      validate: true
    })

    // check the court order radio button to show the court order number text-field
    const radio = wrapper.find('#court-order-radio')
    await radio.setChecked(true)

    // set text-field value
    const input = wrapper.find('#court-order-number-input')
    await input.setValue('123456789012345678901')

    expect(wrapper.emitted('courtNumberChange').pop()[0]).toEqual('123456789012345678901')
    expect(wrapper.emitted('approvalTypeChange').pop()[0]).toEqual('courtOrder')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
  })

  it('loads initial data when court order is selected', async () => {
    const wrapper2 = mount(ApprovalType, {
      propsData: {
        courtOrderNumber: '1234-567890',
        approvedByCourtOrder: true,
        validate: true
      },
      vuetify,
      localVue
    })
    const vm2 = wrapper2.vm

    expect(vm2.$data.courtOrderNumberText).toBe('1234-567890')
    expect(vm2.$data.approvalTypeSelected).toEqual('courtOrder')
    expect(wrapper2.emitted('courtNumberChange').pop()[0]).toEqual('1234-567890')
    expect(wrapper2.emitted('valid').pop()[0]).toEqual(true)

    wrapper2.destroy()
  })

  it('loads initial data when registrar is selected', async () => {
    const wrapper2 = mount(ApprovalType, {
      propsData: {
        approvedByRegistrar: true,
        noticeDate: '2023-02-05',
        applicationDate: '2023-01-19',
        validate: true
      },
      vuetify,
      localVue
    })
    const vm2 = wrapper2.vm

    expect(vm2.$data.approvalTypeSelected).toBe('registrar')
    expect(vm2.$data.noticeDateText).toBe('2023-02-05')
    expect(vm2.$data.applicationDateText).toBe('2023-01-19')
    expect(wrapper2.emitted('update:noticeDate').pop()[0]).toEqual('2023-02-05')
    expect(wrapper2.emitted('update:applicationDate').pop()[0]).toEqual('2023-01-19')
    expect(wrapper2.emitted('valid').pop()[0]).toEqual(true)

    wrapper2.destroy()
  })
})
