import { createVuetify } from 'vuetify'
import { mount, VueWrapper } from '@vue/test-utils'
import { LimitedRestorationPanel } from '@/components/limited-restoration-panel'
import VueRouter from 'vue-router'
import { nextTick } from 'vue'

// suppress the "[Vuetify] Unable to locate target [data-app]" warning
document.body.setAttribute('data-app', 'true')

const vuetify = createVuetify()
// const localVue = createLocalVue()
// localVue.use(VueRouter)

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

describe('Initialize RelationshipsPanel component', () => {
  let wrapper: any

  it('loads the component', () => {
    wrapper = createDefaultComponent()

    expect(wrapper.findComponent(LimitedRestorationPanel).exists()).toBe(true)

    wrapper.unmount()
  })

  it('loads with a preset expiry (24 months)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    expect(wrapper.vm.$data.radioValue).toEqual('24')

    wrapper.unmount()
  })

  it.skip('loads with a custom expiry (1 month)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    expect(wrapper.vm.$data.radioValue).toEqual('customMonths')
    expect(wrapper.vm.$data.inputValue).toEqual('1')

    wrapper.unmount()
  })

  it.skip('emits events when we select a preset expiry (24 months)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()

    await wrapper.find('#radio-24').setChecked()
    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(24)

    wrapper.destroy()
  })

  it.skip('emits events when we select a custom expiry (1 month)', async () => {
    wrapper = createDefaultComponent()
    await nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('1')
    expect(wrapper.emitted('valid').pop()[0]).toBe(true)
    expect(wrapper.emitted('months').pop()[0]).toEqual(1)

    wrapper.destroy()
  })
  it.skip('emits valid=false when we select 25 months with a max of 24', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent()
    await Vue.nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)

    wrapper.destroy()
  })

  it.skip('emits valid=true when we select 25 months with a max of 36', async () => {
    const wrapper: Wrapper<LimitedRestorationPanel> = createDefaultComponent(undefined, 36)
    await Vue.nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('#radio-custom').setChecked()
    await wrapper.find('#text-field-months').setValue('25')
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)

    wrapper.destroy()
  })
})
