import { shallowMount } from '@vue/test-utils'
import MixinTester from '@/mixin-tester.vue'
import { nextTick } from 'vue'

describe('Validation Mixin', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    const wrapper = shallowMount(MixinTester)
    vm = wrapper.vm
    await nextTick()
  })

  it('returns correct Vuetify Rules object createVuetifyRulesObject()', () => {
    expectTypeOf(vm.createVuetifyRulesObject('addressLocal')).toBeObject()
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('streetAddress')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('streetAddressAdditional')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('addressCity')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('addressRegion')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('postalCode')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('addressCountry')
    expect(vm.createVuetifyRulesObject('addressLocal')).toHaveProperty('deliveryInstructions')
  })
})
