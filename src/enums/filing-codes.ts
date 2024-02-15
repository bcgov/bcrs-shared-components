/** Filing codes to send to Pay API. */
export enum FilingCodes {
  ADDRESS_CHANGE_BC = 'BCADD', // BCOMP - Change of Address
  ADDRESS_CHANGE_OT = 'OTADD', // Others - Change of Address
  AGM_EXTENSION = 'AGMDT',
  AGM_LOCATION_CHANGE = 'AGMLC',
  AFFIDAVIT = 'AFDVT',
  ALTERATION = 'ALTER',
  ALTERATION_BC_TO_ULC = 'NOALU', // different fee for BC to ULC
  AMALGAMATION_HORIZONTAL = 'AMALH', // Amalgamation Application (Horizontal Short Form)
  AMALGAMATION_REGULAR = 'AMALR', // Amalgamation Application (Regular)
  AMALGAMATION_VERTICAL = 'AMALV', // Amalgamation Application (Vertical Short Form)
  AMALGAMATION_OUT = 'AMALO', // Amalgamation Out
  ANNUAL_REPORT_BC = 'BCANN', // BCOMP - Annual Report
  ANNUAL_REPORT_OT = 'OTANN', // Others - Annual Report
  CHANGE_OF_REGISTRATION = 'FMCHANGE',
  CONSENT_AMALGAMATION_OUT = 'IAMGO', // Consent To Amalgamation Out
  CONSENT_CONTINUATION_OUT = 'CONTO', // Consent To Continuation Out
  CONTINUATION_IN = 'CONTI',
  CONTINUATION_OUT = 'COUTI',
  CORRECTION = 'CRCTN', // Correction - for both BCOMP and Others
  DIRECTOR_CHANGE_BC = 'BCCDR', // BCOMP - Change of Directors
  DIRECTOR_CHANGE_OT = 'OTCDR', // Others - Change of Directors
  DISSOLUTION_ADMINISTRATIVE = 'DIS_ADMIN',
  DISSOLUTION_COURT_ORDERED_LIQUIDATION = 'DIS_COLQD',
  DISSOLUTION_INVOLUNTARY = 'DIS_INVOL',
  DISSOLUTION_RESTORED_IN_ERROR = 'DIS_RSTR',
  DISSOLUTION_VOLUNTARY = 'DIS_VOL',
  DISSOLUTION_VOLUNTARY_LIQUIDATION = 'DIS_LQD',
  FM_CHANGE = 'FMCHANGE',
  FM_CONVERSION = 'FMCONV',
  FM_CORRECTION = 'FMCORR',
  FREE_DIRECTOR_CHANGE_BC = 'BCFDR', // BCOMP - Free Change of Directors
  FREE_DIRECTOR_CHANGE_OT = 'OTFDR', // Others - Free Change of Directors
  INCORPORATION_BC = 'BCINC',
  INCORPORATION_BEN = 'BCINC',
  INCORPORATION_CC = 'BCINC',
  INCORPORATION_CP = 'OTINC',
  INCORPORATION_ULC = 'BCINC',
  REGISTRATION_GP = 'FRREG',
  REGISTRATION_SP = 'FRREG',
  RESTORATION_FULL = 'RESTF', // for BC/BEN/CC/ULC
  RESTORATION_LIMITED = 'RESTL', // for BC/BEN/CC/ULC
  RESTORATION_LTD_EXTEND = 'RESXL', // for BC/BEN/CC/ULC
  RESTORATION_LTD_TO_FULL = 'RESXF', // for BC/BEN/CC/ULC
  SPECIAL_RESOLUTION = 'SPRLN',
  SPECIAL_RESOLUTION_NAME_CHANGE = 'OTCON'
}
