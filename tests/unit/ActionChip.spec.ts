import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import { ActionChip } from '@/components/action-chip'

const vuetify = new Vuetify({})

describe('ActionChip', () => {
  const wrapperFactory = (action = null, editedLabel = null as string) => {
    return mount(ActionChip, {
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
    const wrapper = wrapperFactory()

    // verify that component mounts
    expect(wrapper.findComponent(ActionChip).exists()).toBe(true)
  })

  it('displays the added chip correctly', () => {
    const wrapper = wrapperFactory('ADDED')

    // verify chip text
    expect(wrapper.find('#added-chip').text()).toBe('ADDED')
  })

  it('displays the edited chip correctly for a correction', async () => {
    const wrapper = wrapperFactory('EDITED', 'CORRECTED')

    // verify chip text
    expect(wrapper.find('#edited-chip').text()).toBe('CORRECTED')
  })

  it('displays the edited chip correctly for an alteration', () => {
    const wrapper = wrapperFactory('EDITED', 'CHANGED')

    // verify chip text
    expect(wrapper.find('#edited-chip').text()).toBe('CHANGED')
  })

  it('displays the added chip correctly', () => {
    const wrapper = wrapperFactory('REMOVED')

    // verify chip text
    expect(wrapper.find('#removed-chip').text()).toBe('REMOVED')
  })
})
