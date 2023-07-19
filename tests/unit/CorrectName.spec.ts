import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import { CorrectName } from '@/components/correct-name'
import CorrectCompanyName from '@/components/correct-name/CorrectCompanyName.vue'
import CorrectNameRequest from '@/components/correct-name/CorrectNameRequest.vue'
import CorrectNameToNumber from '@/components/correct-name/CorrectNameToNumber.vue'

Vue.use(Vuetify)

const vuetify = new Vuetify({})

const defaultProps = {
  businessId: 'BC1234567',
  entityType: 'BC',
  nameRequest: {},
  companyName: 'Old Company Name',
  fetchAndValidateNr: () => {},
  formType: ''
}

describe('CorrectName', () => {
  let wrapperFactory: any

  beforeEach(() => {
    wrapperFactory = async (propsData: any) => {
      const wrapper = shallowMount(CorrectName, {
        propsData,
        vuetify
      })
      await Vue.nextTick()
      return wrapper
    }
  })

  it('renders the CorrectName Component and default subcomponents', async () => {
    const wrapper = await wrapperFactory({
      ...defaultProps,
      correctionNameChoices: ['correct-new-nr']
    })

    expect(wrapper.findComponent(CorrectName).exists()).toBe(true)
  })

  it('renders the CorrectNameRequest when a numbered company', async () => {
    const wrapper = await wrapperFactory({
      ...defaultProps,
      correctionNameChoices: ['correct-new-nr']
    })

    // Verify correct sub components are mounted
    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectCompanyName).exists()).toBe(false)
    expect(wrapper.findComponent(CorrectNameToNumber).exists()).toBe(false)
  })

  it('renders the Correction selector when correcting a Named Company', async () => {
    const wrapper = await wrapperFactory({
      ...defaultProps,
      correctionNameChoices: ['correct-name', 'correct-new-nr', 'correct-name-to-number']
    })

    // Verify correct sub components are mounted
    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectCompanyName).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectNameToNumber).exists()).toBe(true)

    const selectorTitles = wrapper.vm.$el.querySelectorAll('.names-option-title')
    const correctCompanyName = selectorTitles[0]
    const correctNameToNumber = selectorTitles[1]
    const correctNewNr = selectorTitles[2]

    expect(correctCompanyName.textContent).toBe('Edit the company name')
    expect(correctNameToNumber.textContent).toBe('Use the incorporation number as the name')
    expect(correctNewNr.textContent).toBe('Use a new name request number')
  })
})
