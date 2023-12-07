import { shallowMount } from '@vue/test-utils'
import MixinTester from '@/mixin-tester.vue'
import { nextTick } from 'vue'

const canadaProvinces = [
  { name: 'Alberta', short: 'AB' },
  { name: 'British Columbia', short: 'BC' },
  { name: 'Manitoba', short: 'MB' },
  { name: 'New Brunswick', short: 'NB' },
  { name: 'Newfoundland and Labrador', short: 'NL' },
  { name: 'Northwest Territories', short: 'NT' },
  { name: 'Nova Scotia', short: 'NS' },
  { name: 'Nunavut', short: 'NU' },
  { name: 'Ontario', short: 'ON' },
  { name: 'Prince Edward Island', short: 'PE' },
  { name: 'Quebec', short: 'QC' },
  { name: 'Saskatchewan', short: 'SK' },
  { name: 'Yukon', short: 'YT' }
]

const canadaProvincesExcludeBC = [
  { name: 'Alberta', short: 'AB' },
  { name: 'Manitoba', short: 'MB' },
  { name: 'New Brunswick', short: 'NB' },
  { name: 'Newfoundland and Labrador', short: 'NL' },
  { name: 'Northwest Territories', short: 'NT' },
  { name: 'Nova Scotia', short: 'NS' },
  { name: 'Nunavut', short: 'NU' },
  { name: 'Ontario', short: 'ON' },
  { name: 'Prince Edward Island', short: 'PE' },
  { name: 'Quebec', short: 'QC' },
  { name: 'Saskatchewan', short: 'SK' },
  { name: 'Yukon', short: 'YT' }
]

describe('Countries Provinces Mixin', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    const wrapper = shallowMount(MixinTester)
    vm = wrapper.vm
    await nextTick()
  })

  it('returns correct country name getCountryName()', () => {
    expect(vm.getCountryName('CA')).toBe('Canada')
  })

  it('returns correct country name getCountryRegions()', () => {
    expect(vm.getCountryRegions('CA')).length(13)
    expect(vm.getCountryRegions('CA')).toMatchObject(canadaProvinces)
  })

  it('returns correct country name getCanadaRegionsExcludeBC()', () => {
    expect(vm.getCanadaRegionsExcludeBC('CA')).length(12)
    expect(vm.getCanadaRegionsExcludeBC('CA')).toMatchObject(canadaProvincesExcludeBC)
  })
})
