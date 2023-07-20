//
// Various codes found in NR objects.
// (may be sorted by code)
//

// ref: https://github.com/bcgov/namex/blob/main/api/namex/constants/__init__.py
export enum NrRequestTypeCodes {
  // change name (or resubmit)
  CHANGE_BEN = 'BEC',
  CHANGE_CCC = 'CCC',
  CHANGE_COOP = 'CCP',
  CHANGE_CORP = 'CCR', // BC Limited
  CHANGE_FIRM = 'CFR', // SP, DBA or GP
  CHANGE_ULC = 'CUL',

  // continuation in (move or resubmit)
  CONTINUATION_IN_BEN = 'BECT',
  CONTINUATION_IN_CCC = 'CCCT',
  CONTINUATION_IN_COOP = 'CTC',
  CONTINUATION_IN_CORP = 'CT',
  CONTINUATION_IN_ULC = 'ULCT',

  // convert (or resubmit)
  CONVERT_BEN = 'BECV',
  CONVERT_CCC = 'CCV',
  CONVERT_CORP = 'BECR',
  CONVERT_ULC = 'UC',

  // new (or resubmit)
  NEW_BC = 'BC', // BC Benefit Company Incorporation
  NEW_CCC = 'CC', // CCC - Incorporation/Amalgamation
  NEW_COOP = 'CP', // Cooperative - Incorporation/Amalgamation
  NEW_CORP = 'CR', // BC Company - Incorporation/Amalgamation
  NEW_FIRM = 'FR', // Sole Proprietorship/General Partnership/DBA - Registration
  NEW_ULC = 'UL', // Unlimited Liability Company
  NEW_XPRO_CORP = 'XCR', // Corporation (Foreign) - Extrapro Registration/Amalgamation

  // restoration
  RESTORATION_CCC = 'RCC',
  RESTORATION_COOP = 'RCP',
  RESTORATION_CORP = 'RCR', // BC Limited
  RESTORATION_SOC = 'RSO',
  RESTORATION_BEN = 'BERE',
  RESTORATION_ULC = 'RUL'
}

export enum NrRequestActionCodes {
  AMALGAMATE = 'AML',
  ASSUMED = 'ASSUMED', // FUTURE: should be AS?
  CHANGE_NAME = 'CHG',
  CONVERSION = 'CNV',
  DBA = 'DBA', // doing business as
  MOVE = 'MVE', // continuation in
  NEW_BUSINESS = 'NEW', // incorporate or register
  RESTORE = 'REH', // restore or reinstate
  RENEW = 'REN', // restore with new name request
  RESTORATION = 'REST', // FUTURE: unused? delete?
  RESUBMIT = 'RESUBMIT', // FUTURE: unused? delete?

  INFO = 'INFO' // special value for sub-menu
}
