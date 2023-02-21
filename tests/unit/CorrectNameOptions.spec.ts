import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import CorrectCompanyName from '@/components/correct-name/CorrectCompanyName.vue'
import CorrectNameOptions from '@/components/correct-name/CorrectNameOptions.vue'
import CorrectNameRequest from '@/components/correct-name/CorrectNameRequest.vue'
import CorrectNameToNumber from '@/components/correct-name/CorrectNameToNumber.vue'

Vue.use(Vuetify)

const vuetify = new Vuetify({})

describe('CorrectNameOptions', () => {
  let wrapperFactory: any
  let correctionNameChoices: any

  beforeEach(() => {
    wrapperFactory = (propsData: any) => {
      return shallowMount(CorrectNameOptions, {
        propsData,
        vuetify
      })
    }
  })

  it('renders the CorrectNameOptions Component and default subcomponents', async () => {
    correctionNameChoices = ['correct-new-nr']

    const wrapper = wrapperFactory({ correctionNameChoices })

    expect(wrapper.findComponent(CorrectNameOptions).exists()).toBe(true)
  })

  it('renders the CorrectNameRequest when a numbered company', async () => {
    correctionNameChoices = ['correct-new-nr']

    const wrapper = wrapperFactory({ correctionNameChoices })
    await Vue.nextTick()

    // Verify correct sub components are mounted
    expect(wrapper.findComponent(CorrectNameRequest).exists()).toBe(true)
    expect(wrapper.findComponent(CorrectCompanyName).exists()).toBe(false)
    expect(wrapper.findComponent(CorrectNameToNumber).exists()).toBe(false)
  })

  it('renders the Correction selector when correcting a Named Company', async () => {
    correctionNameChoices = ['correct-name', 'correct-new-nr', 'correct-name-to-number']

    const wrapper = wrapperFactory({ correctionNameChoices })
    await Vue.nextTick()

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
