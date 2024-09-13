import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { LimitedRestorationPanel } from '@/components/limited-restoration-panel'
import VueRouter from 'vue-router'

const vuetify = new Vuetify({})
const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  months = 0,
  maxNumberOfMonths = 24
): Wrapper<LimitedRestorationPanel> {
  return mount(LimitedRestorationPanel, {
    propsData: {
      months,
      maxNumberOfMonths
    },
    vuetify,
    localVue
  })
}

describe('Initialize RelationshipsPanel component', () => {
  it('loads the component', () => {
    const wrapper = createDefaultComponent()

    expect(wrapper.findComponent(LimitedRestorationPanel).exists()).toBe(true)

    wrapper.destroy()
  })

  it('loads with a preset expiry (24 months)', () => {
    const wrapper = createDefaultComponent(24)

    expect(wrapper.vm.$data.radioValue).toEqual('24')

    wrapper.destroy()
  })

  it('loads with a custom expiry (1 month)', () => {
    const wrapper = createDefaultComponent(1)

    expect(wrapper.vm.$data.radioValue).toEqual('customMonths')
    expect(wrapper.vm.$data.inputValue).toEqual('1')

    wrapper.destroy()
  })

  it('emits events when we select a preset expiry (24 months)', async () => {
    const wrapper = createDefaultComponent()

    await wrapper.find('#radio-24').setChecked()

    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(24)

    wrapper.destroy()
  })

  it('emits events when we select a custom expiry (1 month)', async () => {
    const wrapper = createDefaultComponent()

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('1')
    await Vue.nextTick()

    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(1)

    wrapper.destroy()
  })

  it('emits valid=false when we select 25 months with a max of 24', async () => {
    const wrapper = createDefaultComponent()

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')

    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    expect(wrapper.emitted('months').pop()[0]).toEqual(null)

    wrapper.destroy()
  })

  it('emits valid=true when we select 25 months with a max of 36', async () => {
    const wrapper = createDefaultComponent(undefined, 36)

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')

    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(25)

    wrapper.destroy()
  })
})
