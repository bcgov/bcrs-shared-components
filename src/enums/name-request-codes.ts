//
// Various codes found in NR objects.
// (may be sorted by code)
//

export enum NrEntityTypeCodes {
  BC_COMPANY = 'BC',
  COOP = 'CP',
  BC_CORPORATION = 'CR',
  DBA = 'DBA',
  NR_SOLE_PROP = 'FR',
  PARTNERSHIP = 'GP',
  BC_UNLIMITED = 'UL',
  XPRO_CORPORATION = 'XCR',
}

export enum NrRequestTypeCodes {
  BC_COMPANY = 'BC',
  CONTINUATION_IN_BEN = 'BECT',
  RESTORATION_BEN = 'BERE',
  COOP = 'CP',
  BC_CORPORATION = 'CR',
  CONTINUATION_IN_BC = 'CT',
  NR_SOLE_PROP = 'FR',
  RCR = 'RCR',
  RSO = 'RSO',
  RESTORATION_ULC = 'RUL',
  BC_UNLIMITED = 'UL',
  CONTINUATION_IN_ULC = 'ULCT',
  XPRO_CORPORATION = 'XCR',
}

export enum NrRequestActionCodes {
  AMALGAMATE = 'AML',
  ASSUMED = 'ASSUMED', // FUTURE: should be AS?
  CHANGE_NAME = 'CHG',
  CONVERSION = 'CNV',
  DBA = 'DBA',
  MOVE = 'MVE',
  NEW_BUSINESS = 'NEW',
  RESTORE = 'REH',
  RENEW = 'REN',
  RESTORATION = 'REST', // FUTURE: is this used?
  RESUBMIT = 'RESUBMIT', // FUTURE: is this used?
}
