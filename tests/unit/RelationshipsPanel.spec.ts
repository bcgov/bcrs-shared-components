import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import { RelationshipsPanel } from '@/components/relationships-panel'
import { ApprovalType } from '@/components/approval-type'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a blank, un-populated component
 */
function createDefaultComponent (
    draftRelationships: string[] = ['Heir or Legal Representative']
): Wrapper<RelationshipsPanel> {
  return mount(RelationshipsPanel, {
    propsData: {
        draftRelationships,
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
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent([])
    expect(wrapper.vm.$data.selectedRelationships).toEqual([])
    wrapper.destroy()
  })

  it('component emits events when no relationship is selected (validate)', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent([])
    await Vue.nextTick()

    expect(wrapper.emitted('emitRelationshipsValid').pop()[0]).toEqual(false)
    wrapper.destroy()
  })

  it('component emits events when a relationship is selected (validate)', async () => {
    const wrapper: Wrapper<RelationshipsPanel> = createDefaultComponent()
    await Vue.nextTick()

    expect(wrapper.emitted('emitRelationshipsValid').pop()[0]).toEqual(true)
    wrapper.destroy()
  })

  it('component emits events (array) when a relationships are selected', async () => {
    const wrapper: Wrapper<ApprovalType> = createDefaultComponent()
    // Shareholder selected
    const input = wrapper.find('#shareholder-checkbox')
    input.setChecked()
    await Vue.nextTick()

    expect(wrapper.emitted('emitRelationshipsChanged').pop()[0]).toEqual(['Heir or Legal Representative', 'Shareholder'])
    wrapper.destroy()
  })

})
