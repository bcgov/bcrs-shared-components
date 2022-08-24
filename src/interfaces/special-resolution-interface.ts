/**
 * A filing's special resolution object from the API. See:
 * https://github.com/bcgov/business-schemas/blob/master/src/registry_schemas/schemas/special_resolution.json
 */

import { PersonIF } from './person-interface'

export interface SpecialResolutionIF {
    meetingDate?: Date
    resolution: string
    resolutionDate?: Date
    signingDate?: Date
    signatory?: PersonIF
    [propName: string]: any // excess properties
}
