import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import { shallowMount } from '@vue/test-utils'
import { FeeSummary } from '@/components/FeeSummary'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})

describe('DetailComment', () => {
  let propsData = {
    showFeeSummary: true,
    filingData: { 'filingTypeCode': 'ALTER', 'entityType': 'BC', 'priority': false },
    payApiUrl: 'https://pay-api-dev.pathfinder.gov.bc.ca/api/v1/',
    hasConflicts: false,
    isBusySaving: false,
    isSummaryMode: false
  }

  const wrapperFactory = (propsData: any) => {
    return shallowMount(FeeSummary, {
      propsData: {
        ...propsData
      },
      vuetify
    })
  }

  it('initializes correctly', () => {
    const wrapper = wrapperFactory(null)
    const vm: any = wrapper.vm

    // verify default properties
    expect(vm.showFeeSummary).toBe(false)
    expect(vm.filingData).toBeNull()
    expect(vm.payApiUrl).toBe('')
    expect(vm.hasConflicts).toBe(false)
    expect(vm.isBusySaving).toBe(false)
    expect(vm.isSummaryMode).toBe(false)

    // verify that v-model is not updated
    expect(wrapper.emitted('action')).toBeUndefined()

    // verify that component mounts
    expect(wrapper.find(FeeSummary).exists()).toBe(true)
  })

  it('handles props correctly', () => {
    const wrapper = wrapperFactory(propsData)
    const vm: any = wrapper.vm

    expect(wrapper.find('#fee-summary').exists()).toBe(true)
  })

  it('does not render when showFeeSummary is false', () => {
    const propsModified = { ...propsData, showFeeSummary: false }

    const wrapper = wrapperFactory(propsModified)

    expect(wrapper.find('#fee-summary').exists()).toBe(false)
  })

  it('disables the confirm btn when there are conflicts', () => {
    const propsModified = { ...propsData, hasConflicts: true }

    const wrapper = wrapperFactory(propsModified)

    expect(wrapper.find('#confirm-btn').attributes('disabled')).toBeTruthy()
  })

  it('displays the btns text and state correctly', async () => {
    const wrapper = wrapperFactory(propsData)

    const saveResumeBtn = wrapper.find('#save-resume-btn')
    expect(saveResumeBtn.attributes('disabled')).toBeUndefined()
    expect(saveResumeBtn.text()).toBe('Resume Later')

    const cancelBtn = wrapper.find('#cancel-btn')
    expect(cancelBtn.attributes('disabled')).toBeUndefined()
    expect(cancelBtn.text()).toBe('Cancel')

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toBe('Review and Certify')
  })

  it('displays the updated confirm text when in summary mode.', async () => {
    const propsModified = { ...propsData, isSummaryMode: true }
    const wrapper = wrapperFactory(propsModified)

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toBe('File and Pay')
  })

  // it('emits events when value model is changed', async () => {
  //   const wrapper = shallowMount(FeeSummar,
  //     {
  //       vuetify
  //     })
  //   const vm: any = wrapper.vm
  //
  //   // const element = wrapper.find('#detail-comment-textarea')
  //   // element.setValue('testing 4 5 6')
  //
  //   // apparently you can't set a textarea's value, so do it explicitly
  //   // NB: need to wait for debounce
  //   vm.onValueChanged('testing 4 5 6')
  //   await sleep(300)
  //   vm.emitInput('testing 4 5 6')
  //
  //   // verify valid and input events
  //   expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
  //   expect(wrapper.emitted('input').pop()).toEqual(['testing 4 5 6'])
  //
  //   wrapper.destroy()
  // })
})
