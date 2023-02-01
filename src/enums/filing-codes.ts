/** Filing codes to send to pay. */
export enum FilingCodes {
  AFFIDAVIT = 'AFDVT',
  ALTERATION = 'ALTER',
  CHANGE_OF_REGISTRATION = 'FMCHANGE',
  CORRECTION = 'CRCTN',
  DISSOLUTION_VOLUNTARY = 'DIS_VOL',
  DISSOLUTION_INVOLUNTARY = 'DIS_INVOL',
  DISSOLUTION_ADMINISTRATIVE = 'DIS_ADMIN',
  DISSOLUTION_VOLUNTARY_LIQUIDATION = 'DIS_LQD',
  DISSOLUTION_COURT_ORDERED_LIQUIDATION = 'DIS_COLQD',
  DISSOLUTION_RESTORED_IN_ERROR = 'DIS_RSTR',
  FM_CHANGE = 'FMCHANGE',
  FM_CONVERSION = 'FMCONV',
  FM_CORRECTION = 'FMCORR',
  INCORPORATION_BC = 'BCINC',
  INCORPORATION_BEN = 'BCINC',
  INCORPORATION_CC = 'BCINC',
  INCORPORATION_CP = 'OTINC',
  INCORPORATION_ULC = 'BCINC',
  REGISTRATION_SP = 'FRREG',
  REGISTRATION_GP = 'FRREG',
  RESTORATION_FULL = 'RESTF', // for BC/BEN/CC/ULC
  RESTORATION_LIMITED = 'RESTL', // for BC/BEN/CC/ULC
  RESTORATION_LTD_TO_FULL = 'RESXF', // for BC/BEN/CC/ULC
  RESTORATION_LTD_EXTEND = 'RESXL', // for BC/BEN/CC/ULC
  SPECIAL_RESOLUTION = 'SPRLN',
  SPECIAL_RESOLUTION_NAME_CHANGE = 'OTCON'
}
