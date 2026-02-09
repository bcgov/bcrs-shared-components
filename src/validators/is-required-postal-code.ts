/**
 * Countries that do not use postal codes.
 * Postal code is not required for addresses in these countries.
 */
const NO_POSTAL_CODE_COUNTRY_CODES = new Set([
  'AO', 'AG', 'AW', 'BS', 'BZ', 'BJ', 'BM', 'BO', 'BQ', 'BW', 'BF', 'BI',
  'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CK', 'CI', 'CW', 'DJ', 'DM', 'GQ',
  'ER', 'FJ', 'TF', 'GA', 'GM', 'GH', 'GD', 'GY', 'HM', 'HK',
  'KI', 'KP', 'LY', 'MO', 'MW', 'ML', 'MR', 'NR',
  'AN', 'NU', 'QA', 'RW', 'KN', 'ST', 'SC', 'SL', 'SX', 'SB', 'SO', 'SR', 'SY',
  'TL', 'TG', 'TK', 'TO', 'TT', 'TV', 'UG', 'AE', 'VU', 'YE', 'ZW'
])

/**
 * Custom validator for postal code required.
 * Returns true if postal code has a value, or if the country doesn't use postal codes.
 */
export function isRequiredPostalCode (value: string, parentVm: any): boolean {
  // If the country doesn't use postal codes, no value is required
  if (NO_POSTAL_CODE_COUNTRY_CODES.has(parentVm.addressCountry)) {
    return true
  }
  // Otherwise, postal code is required
  return !!value?.trim()
}
