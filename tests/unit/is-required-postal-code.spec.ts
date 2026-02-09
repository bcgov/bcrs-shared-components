import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { isRequiredPostalCode } from '@/validators'

const Dummy = Vue.component('DummyComponent', { template: '<div />' })

describe('Validate Postal Code Required', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    // (this can be any component since we are not really using it)
    const wrapper = shallowMount(Dummy)
    vm = wrapper.vm
    await Vue.nextTick()
  })

  it.each([
    'A1A 1A1',
    '12345',
    'some-postal-code',
    '   value   '
  ])('returns true when postal code "%s" is provided for a country requiring postal codes', (postalCode) => {
    expect(isRequiredPostalCode(postalCode, { addressCountry: 'CA' })).toBe(true)
    expect(isRequiredPostalCode(postalCode, { addressCountry: 'US' })).toBe(true)
  })

  it.each([
    '',
    '   ',
    null,
    undefined
  ])('returns false when postal code is "%s" for a country requiring postal codes', (postalCode) => {
    expect(isRequiredPostalCode(postalCode as any, { addressCountry: 'CA' })).toBe(false)
    expect(isRequiredPostalCode(postalCode as any, { addressCountry: 'US' })).toBe(false)
  })

  it.each([
    'AO', 'AG', 'AW', 'BS', 'BZ', 'BJ', 'BM', 'BO', 'BQ', 'BW', 'BF', 'BI',
    'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CK', 'CI', 'CW', 'DJ', 'DM', 'GQ',
    'ER', 'FJ', 'TF', 'GA', 'GM', 'GH', 'GD', 'GY', 'HM', 'HK',
    'KI', 'KP', 'LY', 'MO', 'MW', 'ML', 'MR', 'NR',
    'AN', 'NU', 'QA', 'RW', 'KN', 'ST', 'SC', 'SL', 'SX', 'SB', 'SO', 'SR', 'SY',
    'TL', 'TG', 'TK', 'TO', 'TT', 'TV', 'UG', 'AE', 'VU', 'YE', 'ZW'
  ])('returns true for country "%s" even when postal code is empty', (countryCode) => {
    expect(isRequiredPostalCode('', { addressCountry: countryCode })).toBe(true)
    expect(isRequiredPostalCode('   ', { addressCountry: countryCode })).toBe(true)
  })

  it.each([
    'AO', 'HK', 'AE', 'QA', 'ZW'
  ])('returns true for country "%s" when postal code is provided', (countryCode) => {
    expect(isRequiredPostalCode('12345', { addressCountry: countryCode })).toBe(true)
  })
})
