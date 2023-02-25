import { CorpTypeCd, NameRequestStates, NrRequestActionCodes, NrRequestTypeCodes }
  from '@bcrs-shared-components/enums'
import { AddressIF } from './addresses-interface'
import { ApiDateTimeUtc } from './date-interfaces'

/**
 * Name request applicant interface.
 * Includes only the properties we care about.
 */
export interface NrApplicantIF {
  addrLine1: string
  addrLine2: string
  addrLine3: string
  city: string
  countryTypeCd: string
  emailAddress: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  postalCd: string
  stateProvinceCd: string
}

/**
 * Name request name interaface.
 * Includes only the properties we care about.
 */
export interface NrNameIF {
  name: string
  state: NameRequestStates
}

/**
 * Interface for name request objects we fetch from Namex (via Legal API).
 * Includes only the properties we care about.
 */
export interface NameRequestIF {
  applicants: NrApplicantIF // object not array
  consentFlag: string // R, N, Y or null
  corpNum?: string // eg, "BC1234567"
  expirationDate: ApiDateTimeUtc
  furnished: string // eg, "Y"
  legalType: CorpTypeCd
  names: Array<NrNameIF>
  nrNum: string // eg, "NR 1234567"
  priorityCd: string // eg, "N"
  requestTypeCd: NrRequestTypeCodes
  request_action_cd: NrRequestActionCodes // eslint-disable-line camelcase
  state: NameRequestStates
}

// NB: use cloneDeep when assigning EmptyOrgPerson
export const EmptyNameRequest: NameRequestIF = {
  applicants: {} as NrApplicantIF,
  consentFlag: null,
  expirationDate: null,
  furnished: null,
  legalType: null,
  names: [],
  nrNum: '',
  priorityCd: null,
  requestTypeCd: null,
  request_action_cd: null,
  state: null
}

/**
 * Interface for name request objects we submit to Legal API.
 * See:
 * https://github.com/bcgov/business-schemas/blob/master/src/registry_schemas/schemas/name_request.json
 */
export interface NrSchemaIF {
  nrNumber: string // max 10 chars
  legalName: string
  legalType: CorpTypeCd
  requestType: string // eg, "New Business"
  status: string
  expires: ApiDateTimeUtc
  consent: string
  submittedBy: string
  address: AddressIF
}
