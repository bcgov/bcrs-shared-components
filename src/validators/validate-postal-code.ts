/**
 * Canadian postal code regex (eg, accepts A1A 1A1 or A1A1A1).
 * Ref: https://en.wikipedia.org/wiki/Postal_codes_in_Canada
 */
const CanadaPostalCodeRegex = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i

/** Custom validator for postal codes. */
export function validatePostalCode (value: string, parentVm: any): boolean {
  // if Canada, validate postal code format
  if (parentVm.addressCountry === 'CA') return CanadaPostalCodeRegex.test(value)
  // otherwise, no validation
  return true
}
