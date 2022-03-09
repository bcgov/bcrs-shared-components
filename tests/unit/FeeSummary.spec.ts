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
    payApiUrl: 'https://pay-api-dev.apps.silver.devops.gov.bc.ca/api/v1/',
    hasConflicts: true,
    isLoading: true,
    confirmLabel: 'Continue',
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
    expect(vm.isLoading).toBe(false)
    expect(vm.confirmLabel).toBe('Confirm')
    expect(vm.errorMessage).toBe('')

    // verify that v-model was not updated
    expect(wrapper.emitted('action')).toBeUndefined()

    // verify that component was mounted
    expect(wrapper.findComponent(FeeSummary).exists()).toBe(true)
  })

  it('displays default btn states and text correctly', async () => {
    const wrapper = wrapperFactory(null)

    // Verify back btn not rendered outside summary mode
    const backBtn = wrapper.find('#back-btn')
    expect(backBtn.exists()).toBe(false)

    const saveResumeBtn = wrapper.find('#save-resume-later-btn')
    expect(saveResumeBtn.attributes('disabled')).toBeUndefined()
    expect(saveResumeBtn.text()).toBe('Save and Resume Later')

    const cancelBtn = wrapper.find('#cancel-btn')
    expect(cancelBtn.attributes('disabled')).toBeUndefined()
    expect(cancelBtn.text()).toBe('Cancel')

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toContain('Confirm')

    const errorMsg = wrapper.find('.error-msg')
    expect(errorMsg.exists()).toBe(false)
  })

  it('handles props correctly', () => {
    const wrapper = wrapperFactory(propsData)
    const vm: any = wrapper.vm

    // verify properties
    expect(vm.filingData).toEqual(propsData.filingData)
    expect(vm.payApiUrl).toEqual(propsData.payApiUrl)
    expect(vm.hasConflicts).toEqual(propsData.hasConflicts)
    expect(vm.isLoading).toEqual(propsData.isLoading)
    expect(vm.confirmLabel).toEqual(propsData.confirmLabel)
    expect(vm.errorMessage).toEqual(propsData.errorMessage)
  })

  it('disables the Confirm btn when there are conflicts', () => {
    const propsModified = { hasConflicts: true }

    const wrapper = wrapperFactory(propsModified)

    expect(wrapper.find('#confirm-btn').attributes('disabled')).toBeTruthy()
  })

  it('displays the component correctly in summary mode', async () => {
    const propsModified = { confirmLabel: 'Click me', isSummaryMode: true }
    const wrapper = wrapperFactory(propsModified)

    // Verify back btn rendered in summary mode
    const backBtn = wrapper.find('#back-btn')
    expect(backBtn.exists()).toBe(true)
    expect(backBtn.text()).toContain('Back')

    const confirmBtn = wrapper.find('#confirm-btn')
    expect(confirmBtn.attributes('disabled')).toBeUndefined()
    expect(confirmBtn.text()).toContain('Click me')
  })
})
