import { Component, Vue } from 'vue-property-decorator'

import countries from 'country-list/data.json'
import provinces from 'provinces/provinces.json'

// import these and sort them only once globally
window['countries'] = window['countries'] || countries
  .sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)

window['provinces'] = window['provinces'] || provinces
  .sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)

// global caching to improve performance when called multiple times
window['countryNameCache'] = {}
window['countryRegionsCache'] = {}
window['canadaRegionsNoBCCache'] = {}

/**
 * Mixin that allows VM access to useful country/province data and functions.
 * @link https://www.npmjs.com/package/country-list
 * @lint https://www.npmjs.com/package/provinces
 */
@Component({})
export default class CountriesProvincesMixin extends Vue {
  /**
   * Helper function to return a list of countries.
   * @returns An array of country objects, sorted alphabetically.
   */
  getCountries (): Array<any> {
    return window['countries']
  }

  /**
   * Helper function to return a country's name.
   * @param code The short code of the country.
   * @returns The long name of the country.
   */
  getCountryName (code: string): string {
    if (!code) return null
    if (window['countryNameCache'][code]) return window['countryNameCache'][code]
    const country = window['countries'].find(c => c.code === code)
    const result = country ? country.name : null
    window['countryNameCache'][code] = result
    return result
  }

  /**
   * Helper function to return a country's list of provinces.
   * @param code The short code of the country.
   * @returns An array of province objects, sorted alphabetically.
   */
  getCountryRegions (code: string): Array<any> {
    if (!code) return null
    if (window['countryRegionsCache'][code]) return window['countryRegionsCache'][code]
    const result = window['provinces']
      .filter(p => p.country === code)
      .map(p => ({
        name: p.english || p.name,
        short: (p.short && p.short.length <= 2) ? p.short : '--'
      }))
    window['countryRegionsCache'][code] = result
    return result
  }

  /**
   * Helper function to return a list of Canadian provinces (excluding BC).
   * @returns An array of province objects (excluding BC), sorted alphabetically.
   */
  getCanadaRegionsExcludeBC (): Array<any> {
    const countryCode = 'CA'
    if (window['canadaRegionsNoBCCache'][countryCode]) return window['canadaRegionsNoBCCache'][countryCode]
    const result = window['provinces']
      .filter(p => p.country === 'CA' && p.short !== 'BC')
      .map(p => ({
        name: p.english || p.name,
        short: (p.short && p.short.length <= 2) ? p.short : '--'
      }))
    window['canadaRegionsNoBCCache'][countryCode] = result
    return result
  }
}
