import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import { shallowMount } from '@vue/test-utils'
import { ActionChip } from '@/components/action-chip'
import { ActionTypes } from '@bcrs-shared-components/enums'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})

describe('ActionChip', () => {
  const wrapperFactory = (action: ActionTypes, editedLabel: string = null) => {
    return shallowMount(ActionChip, {
      propsData: {
        actionableItem: {
          action
        },
        editedLabel
      },
      vuetify
    })
  }

  it('initializes correctly', () => {
    const wrapper = wrapperFactory('added')

    // verify that component mounts
    expect(wrapper.find(ActionChip).exists()).toBe(true)
  })

  it('displays the added chip correctly', () => {
    const wrapper = wrapperFactory('added')

    // verify that component mounts
    expect(wrapper.find(ActionChip).exists()).toBe(true)
    expect(wrapper.find('#added-chip').text()).toBe('ADDED')
  })

  it('displays the edited chip correctly for a correction', async () => {
    const wrapper = wrapperFactory('edited', 'CORRECTED')

    // verify that component mounts
    expect(wrapper.find(ActionChip).exists()).toBe(true)
    expect(wrapper.find('#edited-chip').text()).toBe('CORRECTED')
  })

  it('displays the edited chip correctly for an alteration', () => {
    const wrapper = wrapperFactory('edited', 'CHANGED')

    // verify that component mounts
    expect(wrapper.find(ActionChip).exists()).toBe(true)
    expect(wrapper.find('#edited-chip').text()).toBe('CHANGED')
  })

  it('displays the added chip correctly', () => {
    const wrapper = wrapperFactory('removed')

    // verify that component mounts
    expect(wrapper.find(ActionChip).exists()).toBe(true)
    expect(wrapper.find('#removed-chip').text()).toBe('REMOVED')
  })
})
