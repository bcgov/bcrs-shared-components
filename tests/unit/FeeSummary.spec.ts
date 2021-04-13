import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import { shallowMount } from '@vue/test-utils'
import { FeeSummary } from '@/components/FeeSummary'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})

describe('DetailComment', () => {
  const propsData = {
    filingData: {
      filingTypeCode: 'ALTER',
      entityType: 'BC',
      priority: false
    },
    payApiUrl: 'https://pay-api-dev.pathfinder.gov.bc.ca/api/v1/',
    hasConflicts: true,
    isBusySaving: true,
    isSummaryMode: true,
    errorMessage: 'Some error'
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
    expect(vm.filingData).toBeNull()
    expect(vm.payApiUrl).toBe('')
    expect(vm.hasConflicts).toBe(false)
    expect(vm.isBusySaving).toBe(false)
    expect(vm.isSummaryMode).toBe(false)
    expect(vm.errorMessage).toBe('')

    // verify that v-model was not updated
    expect(wrapper.emitted('action')).toBeUndefined()

    // verify that component was mounted
    expect(wrapper.findComponent(FeeSummary).exists()).toBe(true)
  })

  it('displays default btn states and text correctly', async () => {
    const wrapper = wrapperFactory(null)

    const saveResumeBtn = wrapper.find('#save-resume-btn')
    expect(saveResumeBtn.attributes('disabled')).toBeUndefined()
    expect(saveResumeBtn.text()).toBe('Save and Resume Later')

    const deleteAllBtn = wrapper.find('#delete-all-btn')
    expect(deleteAllBtn.attributes('disabled')).toBeUndefined()
    expect(deleteAllBtn.text()).toBe('Delete All')

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toBe('Review and Certify')

    const errorMsg = wrapper.find('.error-msg')
    expect(errorMsg.exists()).toBe(false)
  })

  it('handles props correctly', () => {
    const wrapper = wrapperFactory(propsData)
    const vm: any = wrapper.vm

    // verify default properties
    expect(vm.filingData).toEqual(propsData.filingData)
    expect(vm.payApiUrl).toEqual(propsData.payApiUrl)
    expect(vm.hasConflicts).toEqual(propsData.hasConflicts)
    expect(vm.isBusySaving).toEqual(propsData.isBusySaving)
    expect(vm.isSummaryMode).toEqual(propsData.isSummaryMode)
    expect(vm.errorMessage).toEqual(propsData.errorMessage)
  })

  it('disables the Confirm btn when there are conflicts', () => {
    const propsModified = { hasConflicts: true }

    const wrapper = wrapperFactory(propsModified)

    expect(wrapper.find('#confirm-btn').attributes('disabled')).toBeTruthy()
  })

  it('displays the alternate Confirm btn text in summary mode', async () => {
    const propsModified = { isSummaryMode: true }
    const wrapper = wrapperFactory(propsModified)

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toBe('File and Pay')
  })
})
