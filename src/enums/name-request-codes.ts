//
// Various codes found in NR objects.
// (may be sorted by code)
//

// ref: https://github.com/bcgov/namex/blob/main/api/namex/constants/__init__.py
// ref: https://github.com/bcgov/lear/blob/main/legal-api/src/legal_api/resources/v1/nr_type_map.py
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
  CONVERT_BEN = 'BECV', // from LTD to BEN
  CONVERT_CCC = 'CCV', // from LTD to CCC
  CONVERT_CORP = 'BECR', // from BEN to LTD
  CONVERT_ULBE = 'ULBE', // from ULC to BEN
  CONVERT_ULC = 'UC', // from LTD to ULC
  CONVERT_ULCB = 'ULCB', // from ULC to LTD

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
  RESTORATION_ULC = 'RUL',

  // others, may be legacy or future
  LC = 'LC', // new XPRO_LL_PARTNR
  CLC = 'CLC', // change XPRO_LL_PARTNR
  RLC = 'RLC', // restoration XPRO_LL_PARTNR
  AL = 'AL', // assumed name XPRO_LL_PARTNR
  LL = 'LL', // new LL_PARTNERSHIP
  CLL = 'CLL', // change LL_PARTNERSHIP
  XLL = 'XLL', // new XPRO_LL_PARTNR
  XCLL = 'XCLL', // change XPRO_LL_PARTNR
  LP = 'LP', // new LIM_PARTNERSHIP
  CLP = 'CLP', // change LIM_PARTNERSHIP
  SO = 'SO', // new SOCIETY
  ASO = 'ASO', // amlagamate SOCIETY
  CSO = 'CSO', // change SOCIETY
  RSO = 'RSO', // restoration SOCIETY
  CTSO = 'CTSO', // move SOCIETY
  CSSO = 'CSSO', // convert SOCIETY
  XSO = 'XSO', // new XPRO_SOCIETY
  XCSO = 'XCSO', // change XPRO_SOCIETY
  XRSO = 'XRSO', // restoration XPRO_SOCIETY
  XASO = 'XASO', // assumed name XPRO_SOCIETY
  XCASO = 'XCASO', // achg XPRO_SOCIETY
  XCP = 'XCP', // new XPRO_COOP
  XCCP = 'XCCP', // change XPRO_COOP
  XRCP = 'XRCP', // restoration XPRO_COOP
  FI = 'FI', // new FINANCIAL
  CFI = 'CFI', // change FINANCIAL
  RFI = 'RFI', // restoration FINANCIAL
  PA = 'PA', // new PRIVATE_ACT
  PAR = 'PAR', // new PARISHES
  BEAM = 'BEAM', // amalgamate BCOMP
}

export enum NrRequestActionCodes {
  AMALGAMATE = 'AML',
  ASSUMED = 'ASSUMED', // FUTURE: should be AS (as in LEAR)?
  CHANGE_NAME = 'CHG',
  CONVERSION = 'CNV', // aka Alteration
  DBA = 'DBA', // doing business as
  MOVE = 'MVE', // continuation in
  NEW_BUSINESS = 'NEW', // incorporate or register
  RESTORE = 'REH', // restore or reinstate
  RENEW = 'REN', // restore with new name request
  RESTORATION = 'REST', // FUTURE: unused? delete?
  RESUBMIT = 'RESUBMIT', // FUTURE: unused? delete?

  INFO = 'INFO' // special value for sub-menu
}
