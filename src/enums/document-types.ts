export enum DocumentClasses {
  CORP = 'CORP', // Corporations
  COOP = 'COOP', // Cooperatives
  FIRM = 'FIRM' // Firms
}

export enum DocumentTypes {
  // COOP
  COFI = 'COFI', // Correction Filing
  COOP_MEMORANDUM = 'COOP_MEMORANDUM', // Cooperative Memorandum
  COOP_MISC = 'COOP_MISC', // Cooperatives miscellaneous documents
  COOP_RULES = 'COOP_RULES', // Cooperative Rules

  // CORP
  AGMAM = 'AGMAM', // AGM Amendment
  AGMEX = 'AGMEX', // AGM Extension
  AGMLC = 'AGMLC', // AGM Location Change
  AMAL = 'AMAL', // Update Due to Amalgamation
  AMLG = 'AMLG', // Amalgamations
  AMLO = 'AMLO', // Amalgamation Out
  ANNR = 'ANNR', // Annual Report
  APCO = 'APCO', // Application to Correct the Registry
  ASNU = 'ASNU', // Assumed Name Undertaking
  ATTN = 'ATTN', // Attorney
  CERT = 'CERT', // Certificates
  CHANGE_NAME = 'CHANGE_NAME', // Change of Name
  CHANGE_OFF = 'CHANGE_OFF', // Change of Officers
  CHANGE_REG = 'CHANGE_REG', // Change of Registration
  CLW = 'CLW', // Client Letters
  CNTA = 'CNTA', // Continuation in Authorization
  CNTI = 'CNTI', // Continuation In
  CNTO = 'CNTO', // Continuation Out
  CNV_LEDGER = 'CNV_LEDGER', // Conversion Ledger
  CNVS = 'CNVS', // Conversions
  COFF = 'COFF', // CORPS Filed Forms
  COMP = 'COMP', // CERTIFICATE OF COMPANIES
  CORC = 'CORC', // Corrections
  CORP_AFFIDAVIT = 'CORP_AFFIDAVIT', // Affidavit
  CORP_MISC = 'CORP_MISC', // Corporations miscellaneous documents
  COSD = 'COSD', // CORPS Supporting Documentation
  COU = 'COU', // INACTIVE/DEPRECATED Court Order
  CRT = 'CRT', // INACTIVE/DEPRECATED Court Order
  CRTO = 'CRTO', // Court Orders
  CRTO_LIQ = 'CRTO_LIQ', // Court Ordered Liquidation
  DIRECTOR_AFFIDAVIT = 'DIRECTOR_AFFIDAVIT', // Director Affidavit
  DIRS = 'DIRS', // Directors
  DISD = 'DISD', // Dissolution Delays
  DISS_ADMIN = 'DISS_ADMIN', // Administrative Dissolution
  DISS_VOL = 'DISS_VOL', // Voluntary Dissolution
  FRMA = 'FRMA', // Form 2's Address Change for Corps
  FZE_ADMIN = 'FZE_ADMIN', // Admin Freeze
  ICORP = 'ICORP', // Incorporation Application
  INTENT_LIQ = 'INTENT_LIQ', // Intent to Liquidate
  INV = 'INV', // INACTIVE/DEPRECATED Investigation
  LTR = 'LTR', // Letter Templates
  MNOR = 'MNOR', // Minister's Order
  NATB = 'NATB', // INACTIVE/DEPRECATED Nature of Business
  NOALA = 'NOALA', // Notice of Alteration
  NWITH = 'NWITH', // Notice of Withdrawal
  OTHER_LEGACY = 'OTHER_LEGACY', // Legacy Other
  PB_OFF = 'PB_OFF', // Put Back Off
  PB_ON = 'PB_ON', // Put Back On
  PLNA = 'PLNA', // Plan of Arrangements
  RECV_APPOINT = 'RECV_APPOINT', // Notice of Appointment of Receiver or Receiver Manager
  RECV_CEASE = 'RECV_CEASE', // Notice of Ceasing to Act as Receiver or Receiver Manager
  REG_BUS = 'REG_BUS', // Registration
  REGN = 'REGN', // Registrar's Notation
  REGO = 'REGO', // Registrar's Order
  RSLN_SPEC = 'RSLN_SPEC', // Transition Application
  RSRI = 'RSRI', // Restoration/Reinstatement
  SUPP = 'SUPP', // Supporting Documents
  SYSR = 'SYSR', // System is the record
  TRANSP_REG = 'TRANSP_REG', // Transparency Register

  // FIRM
  CNVF = 'CNVF', // Conversion of Firm
  COPN = 'COPN', // Change of Proprietor's Name
  DISS = 'DISS', // Dissolution Due to Death
  FIRM_MISC = 'FIRM_MISC', // Firms miscellaneous documents
  PART = 'PART', // Partnerships

  // common
  ADDR = 'ADDR', // Address CORP/FIRM
  CONT = 'CONT', // Consent | COOP/CORP/FIRM
  CORR = 'CORR', // Correspondence | COOP/CORP/FIRM
  FILE = 'FILE' // COLIN Filing | COOP/CORP/FIRM
}

// Map between filing and DRS document type
// SYSR: alteration, appointReceiver, ceaseReceiver, changeOfDirectors,
// incorporationApplication, restoration, noticeOfWithdrawal
export const DOCUMENT_TYPES = {
  adminFreeze: DocumentTypes.FZE_ADMIN,
  agmExtension: DocumentTypes.AGMEX,
  agmLocationChange: DocumentTypes.AGMLC,
  alteration: DocumentTypes.NOALA,
  amalgamationApplication: DocumentTypes.AMLG,
  amalgamationOut: DocumentTypes.AMLO,
  annualReport: DocumentTypes.ANNR,
  changeOfAddress: DocumentTypes.FRMA,
  changeOfName: DocumentTypes.CHANGE_NAME,
  changeOfRegistration: DocumentTypes.CHANGE_REG,
  continuationIn: DocumentTypes.CNTI,
  continuationOut: DocumentTypes.CNTO,
  conversion: {
    CORP: DocumentTypes.CNVS,
    FIRM: DocumentTypes.CNVF
  },
  correction: DocumentTypes.CORC,
  courtOrder: DocumentTypes.CRT,
  incorporationApplication: DocumentTypes.ICORP,
  noticeOfWithdrawal: DocumentTypes.NWITH,
  putBackOff: DocumentTypes.PB_OFF,
  putBackOn: DocumentTypes.PB_ON,
  registrarsNotation: DocumentTypes.REGN,
  registrarsOrder: DocumentTypes.REGO,
  registration: DocumentTypes.REG_BUS,
  restoration: DocumentTypes.RSRI,
  systemIsTheRecord: DocumentTypes.SYSR,
  transition: DocumentTypes.RSLN_SPEC
}

// Map between legal type and DRS document class
// For all other legal types not listed below, the document class defaults to CORP
export const DOCUMENT_CLASSES = {
  CP: DocumentClasses.COOP,
  XCP: DocumentClasses.COOP,
  SP: DocumentClasses.FIRM,
  GP: DocumentClasses.FIRM
}
