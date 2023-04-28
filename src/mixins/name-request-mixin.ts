import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { NameRequestStates, NrRequestActionCodes } from '@bcrs-shared-components/enums'
import { NameRequestIF } from '@bcrs-shared-components/interfaces'

/**
 * Mixin that provides some useful Name Request utilities.
 */
@Component({})
export default class NameRequestMixin extends Vue {
  /**
   * Validates a name request against the applicant's information.
   * Throws an error if there is a problem.
   * @param nameRequest the name request object
   * @param nrRequestActionCode the request action code to match
   * @param businessId the business identifier to match
   * @param phone the applicant's phone number to match
   * @param email the applicant's email address to match
   * @returns the name request object
   */
  validateNameRequest (
    nameRequest: NameRequestIF,
    nrRequestActionCode: NrRequestActionCodes,
    businessId?: string,
    phone?: string,
    email?: string
  ): NameRequestIF {
    // ensure NR is valid
    const invalid = this.isNrInvalid(nameRequest)
    if (invalid) {
      throw new Error(`Invalid Name Request: ${invalid}`)
    }

    if (nameRequest.request_action_cd !== nrRequestActionCode) {
      throw new Error('Incorrect Request Action Code')
    }

    // match business id
    if (businessId && nameRequest.corpNum !== businessId) {
      throw new Error('Incorrect Business ID')
    }

    // match email
    if (email && nameRequest.applicants?.emailAddress !== email) {
      throw new Error('Incorrect Email Address')
    }

    // match phone
    if (phone && nameRequest.applicants?.phoneNumber !== phone) {
      throw new Error('Incorrect Phone Number')
    }

    // ensure NR is consumable
    const state = this.getNrState(nameRequest)
    if (state !== NameRequestStates.APPROVED && state !== NameRequestStates.CONDITIONAL) {
      throw new Error(`Invalid Name Request state: ${state}`)
    }

    return nameRequest
  }

  /**
   * Returns error message if the Name Request data is invalid (or null if valid).
   * @param nameRequest the name request object
   * @param requestActionCode the request action code to match
   */
  isNrInvalid (nameRequest: NameRequestIF): string {
    if (!nameRequest) return 'Invalid NR object'
    if (!nameRequest.applicants) return 'Invalid NR applicants'
    if (!nameRequest.expirationDate) return 'Invalid NR expiration date\n(NR may still be processing)'
    if (!nameRequest.legalType) return 'Invalid NR legal type'
    if (!this.getNrApprovedName(nameRequest)) return 'Invalid NR approved name'
    if (!nameRequest.nrNum) return 'Invalid NR number'
    if (!nameRequest.requestTypeCd) return 'Invalid NR request type code'
    if (!nameRequest.request_action_cd) return 'Invalid NR request action code'
    if (!nameRequest.state) return 'Invalid NR state'
    return null
  }

  /**
   * Returns the Name Request's state.
   * @param nameRequest the name request object
   */
  getNrState (nameRequest: NameRequestIF): NameRequestStates {
    // ensure a NR object is provided
    if (!nameRequest) return null

    // if the NR is awaiting consent, it is not consumable
    // null = consent not required
    // R = consent received
    // N = consent waived
    // Y = consent required
    if (nameRequest.state === NameRequestStates.CONDITIONAL &&
      nameRequest.consentFlag !== null && nameRequest.consentFlag !== 'R' && nameRequest.consentFlag !== 'N') {
      return NameRequestStates.NEED_CONSENT
    }

    // if the NR's root state is not APPROVED or CONDITIONAL, it is not consumable
    // NB: EXPIRED or CONSUMED should not return NOT_APPROVED
    if (![NameRequestStates.APPROVED, NameRequestStates.CONDITIONAL,
      NameRequestStates.EXPIRED, NameRequestStates.CONSUMED].includes(nameRequest.state)) {
      return NameRequestStates.NOT_APPROVED
    }

    // otherwise, the NR is consumable
    return nameRequest.state // APPROVED or CONDITIONAL or CONSUMED or EXPIRED
  }

  /**
   * Returns the Name Request's approved name (or undefined or null if not found).
   * @param nameRequest the name request object
   */
  getNrApprovedName (nameRequest: NameRequestIF): string {
    if (nameRequest?.names?.length > 0) {
      return nameRequest.names
        .find(name => [NameRequestStates.APPROVED, NameRequestStates.CONDITION].includes(name.state))?.name
    }
    return null // invalid NR or names array
  }

  /**
   * Maps the request action code to a display description.
   * @param requestActionCode the request action code
   */
  getNrRequestDesc (requestActionCode: NrRequestActionCodes): string {
    switch (requestActionCode) {
      case NrRequestActionCodes.NEW_BUSINESS: return 'New Business'
      case NrRequestActionCodes.CHANGE_NAME: return 'Change of Name'
      case NrRequestActionCodes.CONVERSION: return 'Conversion'
      case NrRequestActionCodes.RESTORE: return 'Restoration'
    }
    return null // should never happen
  }
}
