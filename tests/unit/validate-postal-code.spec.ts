import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { validatePostalCode } from '@/validators'

const Dummy = Vue.component('DummyComponent', { template: '<div />' })

describe('Validate Postal Code', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    // (this can be any component since we are not really using it)
    const wrapper = shallowMount(Dummy)
    vm = wrapper.vm
    await Vue.nextTick()
  })

  it.each([
    '', // empty value is valid
    'A1A 1A1',
    'A1A1A1',
    'a1a 1a1',
    'a1a1a1'
  ])('accepts valid postal code "%s" for Canada', (postalCode) => {
    expect(validatePostalCode(postalCode, { addressCountry: 'CA' })).toBe(true)
  })

  it.each([
    '123456',
    'A1A-1A1',
    'AA1 1A1',
    'A11 1A1',
    'A1 A1A1',
    'A1A 1AA',
    'A1A 11A',
    ' A1A 1A1',
    'A1A  1A1',
    'A1A 1A1 ',
    'D1D 1D1', // D is not allowed in Canadian postal codes
    'W1W 1W1', // W is not allowed in Canadian postal codes
    'Z1Z 1Z1' // Z is not allowed in Canadian postal codes
  ])('rejects invalid postal code "%s" for Canada', (postalCode) => {
    expect(validatePostalCode(postalCode, { addressCountry: 'CA' })).toBe(false)
  })

  it.each([
    '',
    'invalid',
    'A1A 1A1',
    'A1A-1A1',
    'D1D 1D1',
    'W1W 1W1',
    'Z1Z 1Z1'
  ])('accepts any postal code "%s" for non-Canada', (postalCode) => {
    expect(validatePostalCode(postalCode, { addressCountry: 'XX' })).toBe(true)
  })
})
