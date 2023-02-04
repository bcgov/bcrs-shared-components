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
  expiryDate: string = null
): Wrapper<LimitedRestorationPanel> {
  return mount(LimitedRestorationPanel, {
    propsData: {
      currentDate,
      expiryDate
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

  it('No expiry field exists (going from full to limited restoration), Months: 24', async () => {
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
    // Selected Month(s):
    const customMonths = wrapper.find('#custom-months')
    customMonths.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('expiry').pop()[0]).toEqual('2023-03-03')
    wrapper.destroy()
  })
})
