import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { RelationshipsPanel } from '@/components/relationships-panel'

Vue.use(Vuetify)
let vuetify = new Vuetify({})
const localVue = createLocalVue()

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (draftRelationships = [], showValidationErrors = false) {
  return mount(RelationshipsPanel, {
    propsData: {
      draftRelationships,
      showValidationErrors
    },
    vuetify,
    localVue
  })
}

describe('Test RelationshipsPanel component', () => {
  it('loads the component', () => {
    const wrapper = createDefaultComponent()
    expect(wrapper.findComponent(RelationshipsPanel).exists()).toBe(true)
    wrapper.destroy()
  })

  it('no relationship selected (draft relationship empty)', () => {
    const wrapper = createDefaultComponent()
    expect(wrapper.vm.$data.selectedRelationships).toEqual([])
    wrapper.destroy()
  })

  it('component emits a valid=true event when at least one relationship selected', async () => {
    const wrapper = createDefaultComponent()
    wrapper.find('#shareholder-checkbox').trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits valid=false event when last relationship is unchecked', async () => {
    const wrapper = createDefaultComponent(['Shareholder'])
    wrapper.find('#shareholder-checkbox').trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('component emits a valid=true event when two relationships selected', async () => {
    const wrapper = createDefaultComponent(['Court Ordered Party'])
    wrapper.find('#shareholder-checkbox').trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits change event when relationships are selected', async () => {
    const wrapper = createDefaultComponent(['Heir or Legal Representative'])
    // Officer selected
    const input = wrapper.find('#officer-checkbox')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('changed').pop()[0])
      .toEqual(['Heir or Legal Representative', 'Officer'])
    wrapper.destroy()
  })

  it('setting component prop showValidationErrors=true displays validation errors', async () => {
    const wrapper = createDefaultComponent(['Shareholder'], true)
    const shareholderCheckbox = wrapper.find('#shareholder-checkbox')
    shareholderCheckbox.trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    expect(wrapper.vm.$data.displayErrorState).toEqual(true)
    wrapper.destroy()
  })

  it('setting component prop showValidationErrors=false hides validation errors', async () => {
    const wrapper = createDefaultComponent(['Shareholder'], false)
    const shareholderCheckbox = wrapper.find('#shareholder-checkbox')
    shareholderCheckbox.trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    expect(wrapper.vm.$data.displayErrorState).toEqual(false)
    wrapper.destroy()
  })
})
