import { createVuetify } from 'vuetify'
import { mount, VueWrapper } from '@vue/test-utils'
import { LimitedRestorationPanel } from '@/components/limited-restoration-panel'
import VueRouter from 'vue-router'
import { nextTick } from 'vue'

// suppress the "[Vuetify] Unable to locate target [data-app]" warning
document.body.setAttribute('data-app', 'true')

const vuetify = createVuetify()

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  months = 0,
  maxNumberOfMonths = 24
): VueWrapper {
  return mount(LimitedRestorationPanel, {
    props: {
      months,
      maxNumberOfMonths
    },
    vuetify,
    VueRouter
  })
}

describe('Initialize LimitedRelationshipsPanel component', () => {
  let wrapper: any

  it('loads the component with default values', () => {
    wrapper = createDefaultComponent()

    expect(wrapper.findComponent(LimitedRestorationPanel).exists()).toBe(true)
    expect(wrapper.vm.$data.radioValue).toEqual('customMonths')
    expect(wrapper.vm.$data.inputValue).toEqual('0')

    wrapper.unmount()
  })

  it('loads with a preset expiry (24 months)', async () => {
    wrapper = createDefaultComponent(24)
    await nextTick()

    expect(wrapper.vm.$data.radioValue).toEqual('24')

    wrapper.unmount()
  })

  it('loads with a custom expiry (1 month)', async () => {
    wrapper = createDefaultComponent(1)
    await nextTick()

    expect(wrapper.vm.$data.radioValue).toEqual('customMonths')
    expect(wrapper.vm.$data.inputValue).toEqual('1')

    wrapper.unmount()
  })

  it('emits correct events when preset expiry (24 months) radio is selected', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    await wrapper.find('#radio-24').setChecked()
    expect(wrapper.emitted()).toHaveProperty('valid')
    expect(wrapper.emitted().valid).toBeTruthy()
    expect(wrapper.emitted().months).toHaveLength(1)
    expect(wrapper.vm.$data.radioValue).toEqual('24')

    wrapper.unmount()
  })

  it('emits valid=false when input 25 months', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')

    expect(wrapper.vm.valid).toBeFalsy()

    wrapper.unmount()
  })

  it.skip('emits events when we select a preset expiry (24 months)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    await wrapper.find('#radio-24').setChecked()
    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(24)

    wrapper.unmount()
  })

  it.skip('emits events when we select a custom expiry (1 month)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('1')
    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(1)

    wrapper.unmount()
  })

  it.skip('emits valid=false when we select 25 months with a max of 24', async () => {
    wrapper = createDefaultComponent()
    await nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)

    wrapper.unmount()
  })

  it.skip('emits valid=true when we select 25 months with a max of 36', async () => {
    wrapper = createDefaultComponent(undefined, 36)
    await nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)

    wrapper.unmount()
  })
})
