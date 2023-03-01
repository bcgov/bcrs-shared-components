import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { LimitedRestorationPanel } from '@/components/limited-restoration-panel'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  currentDate: string = '2023-02-03',
  expiryDate: string = null,
  maxNumberOfMonths: number = 24
): Wrapper<LimitedRestorationPanel> {
  return mount(LimitedRestorationPanel, {
    propsData: {
      currentDate,
      expiryDate,
      maxNumberOfMonths
    },
    vuetify,
    localVue
  })
}

describe('Initialize RelationshipsPanel component', () => {
  it('loads the component', () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    expect(wrapper.findComponent(LimitedRestorationPanel).exists()).toBe(true)
    wrapper.destroy()
  })

  it('It is initialized to 24 months if the expiry field is not provided', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    expect(wrapper.vm.$data.selectMonths).toEqual(24)
    wrapper.destroy()
  })

  it('Load with previously selected expiry 18 months away', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent('2023-02-03', '2024-08-03')
    expect(wrapper.vm.$data.selectMonths).toEqual(18)
    wrapper.destroy()
  })

  it('Load with previously selected expiry 14 months away', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent('2023-02-03', '2024-04-03')
    expect(wrapper.vm.$data.selectMonths).toEqual('customMonths')
    expect(wrapper.vm.$data.numberOfMonths).toEqual(14)
    wrapper.destroy()
  })

  it('Component emits correct expiry date when we select 18 months', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    // 18 months selected
    const input = wrapper.find('#eighteen-radio')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('expiry').pop()[0]).toEqual('2024-08-03')
    wrapper.destroy()
  })

  it('Component emits correct expiry date when we select custom Month(s)', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    const limitedRestoration = wrapper.vm as any // wrapper.vm type is Vue

    // Selected Month(s):
    const customMonths = wrapper.find('#custom-months')
    await customMonths.setChecked()

    // Input text into text-field
    const input = wrapper.find('#months-text-field')
    await input.setValue('5')

    expect(limitedRestoration.onMonthsChanged())
    expect(wrapper.emitted('expiry').pop()[0]).toEqual('2023-07-03')
    wrapper.destroy()
  })

  it('Component emits correct validation when we select 2 years', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    const limitedRestoration = wrapper.vm as any // wrapper.vm type is Vue

    expect(limitedRestoration.validate())
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('Component emits correct validation when we select 5 months', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    const limitedRestoration = wrapper.vm as any // wrapper.vm type is Vue

    // Selected Month(s):
    const customMonths = wrapper.find('#custom-months')
    await customMonths.setChecked()

    // Input text into text-field
    const input = wrapper.find('#months-text-field')
    await input.setValue('5')

    expect(limitedRestoration.validate())
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('Component emits correct validation when we select 25 months with a max of 24', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    const limitedRestoration = wrapper.vm as any // wrapper.vm type is Vue

    // Selected Month(s):
    const customMonths = wrapper.find('#custom-months')
    await customMonths.setChecked()

    // Input text into text-field
    const input = wrapper.find('#months-text-field')
    await input.setValue('25')

    expect(limitedRestoration.validate())
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('Component emits correct validation when we select 25 months with a max of 36', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent('2023-02-03', null, 36)
    const limitedRestoration = wrapper.vm as any // wrapper.vm type is Vue

    // Selected Month(s):
    const customMonths = wrapper.find('#custom-months')
    await customMonths.setChecked()

    // Input text into text-field
    const input = wrapper.find('#months-text-field')
    await input.setValue('25')

    expect(limitedRestoration.validate())
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })
})
