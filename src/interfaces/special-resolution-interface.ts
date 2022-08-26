/**
 * A filing's special resolution object from the API. See:
 * https://github.com/bcgov/business-schemas/blob/master/src/registry_schemas/schemas/special_resolution.json
 */

import { PersonIF } from './person-interface'

export interface SpecialResolutionIF {
  meetingDate?: string
  resolution: string
  resolutionDate?: string
  signingDate?: string
  signatory?: PersonIF
  resolutionConfirmed?: boolean // Needs to be implemented in business schema https://github.com/bcgov/business-schemas/pull/107
  [propName: string]: any // excess properties
}
