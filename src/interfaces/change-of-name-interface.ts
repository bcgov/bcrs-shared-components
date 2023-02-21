import { NameRequestIF } from './name-request-interfaces'

export interface ChangeOfNameNameRequestIF {
  nameRequest: NameRequestIF
}

export interface ChangeOfNameLegalNameIF {
  legalName: string
}

/**
 * A filing's business object from the API. See:
 * https://github.com/bcgov/business-schemas/blob/master/src/registry_schemas/schemas/change_of_name.json
 * This requires either nameRequest or legalName:
 *   "anyOf": [
 *       {"required": ["legalName"]},
 *       {"required": ["nameRequest"]}
 *   ]
 */
export type ChangeOfNameIF = ChangeOfNameLegalNameIF | ChangeOfNameNameRequestIF
