import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import { ExpandableHelp } from '@/components/expandable-help'

const vuetify = new Vuetify({})

describe('ExpandableHelp', () => {
  const wrapperFactory = (label = '' as string, content = '') => {
    return mount(ExpandableHelp, {
      propsData: { helpLabel: label || undefined },
      slots: { content },
      vuetify
    })
  }

  it('initializes', () => {
    const wrapper = wrapperFactory()

    // verify that component mounts
    expect(wrapper.findComponent(ExpandableHelp).exists()).toBe(true)

    // verify default help label
    expect(wrapper.find('.help-label').text()).toBe('Show Help')

    // verify content is not shown
    expect(wrapper.find('.help-section').isVisible()).toBe(false)
  })

  it('displays custom help label', () => {
    const wrapper = wrapperFactory('Custom Help Label')

    // verify custom help label
    expect(wrapper.find('.help-label').text()).toBe('Custom Help Label')
  })

  it('shows/hides content using top button', async () => {
    const wrapper = wrapperFactory(null, 'sample help content')
    const vm = wrapper.vm as any

    // click top help button to show the content
    await vm.$el.querySelector('.top.help-btn').click()

    // verify updated button label
    expect(wrapper.find('.help-label').text()).toBe('Hide Help')

    // verify content is shown
    expect(wrapper.find('.help-section').isVisible()).toBe(true)
    expect(wrapper.find('.help-section').text()).toContain('sample help content')

    // click top help button to hide the content
    await vm.$el.querySelector('.top.help-btn').click()

    // verify original button label
    expect(wrapper.find('.help-label').text()).toBe('Show Help')

    // verify content is not shown
    expect(wrapper.find('.help-section').isVisible()).toBe(false)
  })

  it('shows content using top button and hides it using bottom button', async () => {
    const wrapper = wrapperFactory(null, 'sample help content')
    const vm = wrapper.vm as any

    // click top help button to show the content
    await vm.$el.querySelector('.top.help-btn').click()

    // verify content is shown
    expect(wrapper.find('.help-section').isVisible()).toBe(true)
    expect(wrapper.find('.help-section').text()).toContain('sample help content')

    // click bottom help button to hide the content
    await vm.$el.querySelector('.bottom.help-btn').click()

    // verify content is not shown
    expect(wrapper.find('.help-section').isVisible()).toBe(false)
  })
})
