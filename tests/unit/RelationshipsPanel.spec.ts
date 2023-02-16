import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { RelationshipsPanel } from '@/components/relationships-panel'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
  draftRelationships: string[] = []
): Wrapper<RelationshipsPanel> {
  return mount(RelationshipsPanel, {
    propsData: {
      draftRelationships
    },
    vuetify,
    localVue
  })
}

describe('Initialize RelationshipsPanel component', () => {
  it('loads the component', () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent()
    expect(wrapper.findComponent(RelationshipsPanel).exists()).toBe(true)
    wrapper.destroy()
  })

  it('no relationship selected (draft relationship empty)', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent()
    expect(wrapper.vm.$data.selectedRelationships).toEqual([])
    wrapper.destroy()
  })

  it('component emits events when no relationship is selected (validate)', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent()
    await Vue.nextTick()

    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('component emits events when a relationship is selected (validate)', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent(['Heir or Legal Representative'])
    await Vue.nextTick()

    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits events (array) when relationships are selected', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent(['Heir or Legal Representative'])
    // Officer selected
    const input = wrapper.find('#officer-checkbox')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('changed').pop()[0])
      .toEqual(['Heir or Legal Representative', 'Officer'])
    wrapper.destroy()
  })
})
