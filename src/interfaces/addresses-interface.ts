/**
 * Interface to define a base address.
 * See:
 * https://github.com/bcgov/business-schemas/blob/main/src/registry_schemas/schemas/address.json
 */
export interface AddressIF {
  addressCity: string // max 40 chars
  addressCountry: string
  addressRegion?: string // max 2 chars
  addressType?: string
  deliveryInstructions?: string // max 80 chars
  postalCode: string // max 15 chars
  streetAddress: string // max 50 chars
  streetAddressAdditional?: string // max 50 chars
}

/** Empty address for initializing address objects. */
export const EmptyAddress: AddressIF = {
  addressCity: '',
  addressCountry: '',
  addressRegion: '', // FUTURE: change to undefined?
  addressType: null, // FUTURE: change to undefined?
  deliveryInstructions: '',
  postalCode: '',
  streetAddress: '',
  streetAddressAdditional: '' // FUTURE: change to undefined?
}

/** Interface to define the joint base addresses. */
export interface BaseAddressObjIF {
  mailingAddress: AddressIF
  // Delivery Address is required for directors and offices.
  // Delivery Address is optional for completing party and incorporators.
  deliveryAddress?: AddressIF
}

/** Interface to define the incorporation addresses. */
export interface IncorporationAddressIf {
  registeredOffice: BaseAddressObjIF
  // Records Address is required for BCOMPs.
  // Records Address may be optional for other app types.
  recordsOffice?: BaseAddressObjIF
}

export interface BaseAddressType extends Vue {
  $refs: any
}
