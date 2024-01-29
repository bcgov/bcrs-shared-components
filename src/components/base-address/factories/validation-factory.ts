import { ref } from 'vue'

import { AddressValidationRules } from '@bcrs-shared-components/enums'

/* Sets up form validation functions */
export function useBaseValidations () {
  /* this variable must be named the same as your ref=___ in your form */
  const addressForm = ref(null)
  const resetValidation = () => {
    addressForm.value?.resetValidation()
  }
  const validate = () => {
    addressForm.value?.validate()
  }
  return { addressForm, resetValidation, validate }
}

/* Rules used in most schemas */
export const baseRules = {
  [AddressValidationRules.BC]: (v: string) => v === 'BC' || v === 'British Columbia' || 'Address must be in BC',
  [AddressValidationRules.CANADA]: (v: string) => v === 'CA' || 'Address must be in Canada',
  [AddressValidationRules.MAX_LENGTH]: (max: number) => {
    return (v: string) => (v || '').length <= max || `Maximum ${max} characters`
  },
  [AddressValidationRules.MIN_LENGTH]: (min: number) => {
    return (v: string) => (v || '').length >= min || `Minimum ${min} characters`
  },
  [AddressValidationRules.POSTAL_CODE]: (v: string) => (
    /^\s*[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d\s*$/i.test(v) ||
    'Must be a valid postal code'
  ),
  [AddressValidationRules.REQUIRED]: (v: string) => v?.length > 0 || 'This field is required',
  [AddressValidationRules.ZIP_CODE]: (v: string) => (
    /^\s*[0-9]{5}([\s-]?[0-9]{4})?\s*$/i.test(v) ||
    'Must be a valid zip code'
  )
}

/* Array of validation rules used by input elements to prevent extra whitespace. */
export const spaceRules = [
  (v: string) => !/^\s/g.test(v) || 'Invalid spaces' // leading spaces
]
