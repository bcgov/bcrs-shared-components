/**
 * A filing's business object from the API. See:
 * https://github.com/bcgov/business-schemas/blob/master/src/registry_schemas/schemas/change_of_name.json
 * This requires either nameRequest or legalName:
*   "anyOf": [
        {"required": ["legalName"]},
        {"required": ["nameRequest"]}
    ]
 */

import { NameRequestIF } from './name-request-interface'

export interface ChangeOfNameIF {
    nameRequest?: NameRequestIF
    legalName?: string
}
