import { AddressValidationRules } from '@/enums'
import { SchemaIF } from '@/interfaces'
import { baseRules, spaceRules } from '@/components/base-address/factories/validation-factory'

/* example of what to pass in for the schema */
export const DefaultSchema: SchemaIF = {
  street: [
    baseRules[AddressValidationRules.REQUIRED],
    baseRules[AddressValidationRules.MAX_LENGTH](50),
    ...spaceRules
  ],
  streetAdditional: [
    baseRules[AddressValidationRules.MAX_LENGTH](50),
    ...spaceRules
  ],
  city: [
    baseRules[AddressValidationRules.REQUIRED],
    baseRules[AddressValidationRules.MAX_LENGTH](40),
    ...spaceRules
  ],
  country: [
    baseRules[AddressValidationRules.REQUIRED],
    ...spaceRules
  ],
  region: [
    baseRules[AddressValidationRules.REQUIRED],
    ...spaceRules
  ],
  /* NOTE: Canada/US postal code and zip code regex rules
   * are added automatically as extra rules based on country
   * inside the address components
   */
  postalCode: [
    baseRules[AddressValidationRules.REQUIRED],
    baseRules[AddressValidationRules.MAX_LENGTH](15),
    ...spaceRules
  ],
  deliveryInstructions: [
    baseRules[AddressValidationRules.MAX_LENGTH](80),
    ...spaceRules
  ]
}
