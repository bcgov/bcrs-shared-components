export enum DocumentClasses {
  CORP = 'CORP', // Corporations
  COOP = 'COOP', // Cooperatives
  FIRM = 'FIRM', // Firms
  LP_LLP = 'LP_LLP', // Limited Partnership/Limited Liability Partnership
  NR = 'NR', // Name Requests
  SOCIETY = 'SOCIETY', // Societies
  OTHER = 'OTHER', // Other
  MHR = 'MHR', // Manufactured Home Registry
  PPR = 'PPR', // Personal Property Registry
}

export enum DocumentTypes {
  DIRECTOR_AFFIDAVIT = 'DIRECTOR_AFFIDAVIT',
  CORP_AFFIDAVIT = 'CORP_AFFIDAVIT',
  COOP_MEMORANDUM = 'COOP_MEMORANDUM', // Memorandum
  COOP_RULES = 'COOP_RULES', // Rules
  COU = 'COU', // Court Order
  COOP_MISC = 'COOP_MISC', // Correction Filing
  COFI = 'COFI', // Cooperatives Miscellaneous Documents
  // Corporations
  CORP_MISC = 'CORP_MISC', // Corporations Miscellaneous Documents
  FILE = 'FILE', // COLIN Filing (CORP/FIRM/LP_LLP/COOP)
  DISD = 'DISD', // Dissolution Delays
  FRMA = 'FRMA', // Form 2\'s Address Change for Corps
  AMLG = 'AMLG', // Amalgamations
  CNTI = 'CNTI', // Continuation In
  CNTO = 'CNTO', // Continuation Out
  RSRI = 'RSRI', // Restoration/Reinstatement
  COFF = 'COFF', // CORPS Filed Forms
  COSD = 'COSD', // CORPS Supporting Documentation
  CNTA = 'CNTA', // Continuation in Authorization
  LPRG = 'LPRG', // LP and LLP Registration (CORP/LP_LLP)
  AMLO = 'AMLO', // Amalgamation Out
  ASNU = 'ASNU', // Assumed Name Undertaking
  AMAL = 'AMAL', // Update Due to Amalgamation
  ATTN = 'ATTN', // Attorney (CORP/LP_LLP)
  DISS = 'DISS', // Dissolution Due to Death
  // Firms
  FIRM_MISC = 'FIRM_MISC', // Firms miscellaneous documents
  CNVF = 'CNVF', // Conversion of Firm (FIRM/LP_LLP)
  COPN = 'COPN', // Change of Proprietor\'s Name
  // Limited Partnership/Limited Liability Partnership
  ADDR = 'ADDR', // Address (SOCIETY/CORP/LP_LLP/FIRM)
  ANNR = 'ANNR', // Annual Report (SOCIETY/CORP/LP_LLP)
  CHNM = 'CHNM', // Change Of Name (LP_LLP/OTHER)
  CONT = 'CONT', // Consent (CORP/SOCIETY/FIRM/LP_LLP/MHR/NR/COOP/PPR)
  CORSP = 'CORSP', // Correspondence
  // Name Requests
  NR_MISC = 'NR_MISC', // Name requests miscellaneous documents
  CONS = 'CONS', // NR Consent Letter
  // Society
  SOC_MISC = 'SOC_MISC', // Societies miscellaneous documents
  SOCF = 'SOCF', // Society Filing
  CORC = 'CORC', // Corrections (CORP/SOCIETY)
  CORR = 'CORR', // Correspondence
  DIRS = 'DIRS', // Directors
  // Other
  CERT = 'CERT', // Certificates
  LTR = 'LTR', // Letter Templates
  CLW = 'CLW', // Client Letters
  BYLW = 'BYLW', // Bylaw
  CNST = 'CNST', // Constitution
  SYSR = 'SYSR', // System is the record
  ADMN = 'ADMN', // Administration
  RSLN = 'RSLN', // Resolution Document
  AFDV = 'AFDV', // Affidavit Document
  SUPP = 'SUPP', // Supporting Documents
  MNOR = 'MNOR', // Minister\'s Order
  FINM = 'FINM', // Financial Management
  APCO = 'APCO', // Application to Correct the Registry
  RPTP = 'RPTP', // Report of Payments
  DAT = 'DAT', // DAT or CAT
  BYLT = 'BYLT', // Bylaw Alterations
  CNVS = 'CNVS', // Conversions
  CRTO = 'CRTO', // Court Orders
  MEM = 'MEM', // Membership
  PRE = 'PRE', // Pre Image Documents
  REGO = 'REGO', // Registrar\'s Order
  PLNA = 'PLNA', // Plan of Arrangements
  REGN = 'REGN', // Registrar\'s Notation
  FINC = 'FINC', // Financial
  BCGT = 'BCGT', // BC Gazette
  OTP = 'OTP', // OTP
  // Manufactured Home Registry
  MHR_MISC = 'MHR_MISC', // MHR Miscellaneous Documents
  FNCH = 'FNCH', // MH Supporting Documentation
  MHSP = 'MHSP', // Finance Change Statements/Partial Discharges
  REG_101 = 'REG_101', // Manufactured Home Registration
  REG_102 = 'REG_102', // Decal Replacement
  REG_103 = 'REG_103', // Transport Permit
  ABAN = 'ABAN', // Transfer Due To Abandonment And Sale
  ADDI = 'ADDI', // Addition
  AFFE = 'AFFE', // Transfer To Executor – Estate Under $25,000 With Will
  ATTA = 'ATTA', // Attachment
  BANK = 'BANK', // Transfer Due To Bankruptcy
  CAU = 'CAU', // Notice Of Caution
  CAUC = 'CAUC', // Continued Notice Of Caution
  CAUE = 'CAUE', // Extension To Notice Of Caution
  COMP = 'COMP', // Certificate Of Companies
  COUR = 'COUR', // Court Rescind Order
  DEAT = 'DEAT', // Transfer To Surviving Joint Tenant(s)
  DNCH = 'DNCH', // Declaration Of Name Change
  EXMN = 'EXMN', // Manufactured Exemption
  EXNR = 'EXNR', // Non-Residential Exemption
  EXRE = 'EXRE', // Manufactured Home Re-Registration
  EXRS = 'EXRS', // Residential Exemption
  FORE = 'FORE', // Transfer Due To Foreclosure Order
  FZE = 'FZE', // Registrars Freeze
  GENT = 'GENT', // Transfer Due To General Transmission
  LETA = 'LETA', // Transfer To Administrator – Grant Of Probate With No Will
  MAID = 'MAID', // Maiden Name
  MAIL = 'MAIL', // Mailing Address
  MARR = 'MARR', // Marriage Certificate
  NAMV = 'NAMV', // Certificate Of Vital Stats
  NCAN = 'NCAN', // Cancel Note
  NCON = 'NCON', // Confidential Note
  NPUB = 'NPUB', // Public Note
  NRED = 'NRED', // Notice Of Redemption
  PUBA = 'PUBA', // Public Amendment
  REBU = 'REBU', // Rebuilt
  REGC = 'REGC', // Registrar\'s Correction
  REIV = 'REIV', // Transfer Due To Repossession - Involuntary
  REPV = 'REPV', // Transfer Due To Repossession - Voluntary
  REST = 'REST', // Restraining Order
  STAT = 'STAT', // Registered Location Change
  SZL = 'SZL', // Transfer Due To Seizure Under Land Act
  TAXN = 'TAXN', // Notice Of Tax Sale
  TAXS = 'TAXS', // Transfer Due To Tax Sale
  THAW = 'THAW', // Remove Freeze
  TRAN = 'TRAN', // Transfer Due To Sale Or Gift
  VEST = 'VEST', // Transfer Due To Vesting Order
  WHAL = 'WHAL', // Warehouseman Lien
  WILL = 'WILL', // Transfer To Executor - Grant Of Probate With Will
  // Personal Property Registry
  PPR_MISC = 'PPR_MISC', // PPR miscellaneous documents
  PPRS = 'PPRS', // PPR Search
  PPRC = 'PPRC', // PPR Secure Party Codes
}

export const DOCUMENT_TYPES = {
  coopMemorandum: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COOP_MEMORANDUM
  },
  coopMiscellaneous: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COFI
  },
  coopRules: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COOP_RULES
  },
  coopCorrectionFiling: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COOP_MISC
  },
  corpsCorrections: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.CORC
  },
  corpAmalgamations: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.AMLG
  },
  corpAmalgamationOut: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.AMLO
  },
  corpAmalgamationUpdate: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.AMAL
  },
  corpAssumedNameUndertaking: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.ASNU
  },
  corpContInAuthorization: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CNTA
  },
  corpContinuationIn: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CNTI
  },
  corpContinuationOut: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CNTO
  },
  corpAffidavit: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CORP_AFFIDAVIT
  },
  corpAttorney: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.ATTN
  },
  corpColinFiling: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.FILE
  },
  corpLpLlpRegistration: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.LPRG
  },
  corpMiscellaneous: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CORP_MISC
  },
  corpsAddressChange: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.FRMA
  },
  corpsFiledForms: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.COFF
  },
  corpsSupporting: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.COSD
  },
  courtOrder: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.COU
  },
  corpDirectorAffidavit: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.DIRECTOR_AFFIDAVIT
  },
  corpDissolutionDeath: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.DISS
  },
  corpDissolutionDelays: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.DISD
  },
  lpLlpchangeOfName: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.CHNM
  },
  lpLlpConsent: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.CONT
  },
  lpLlpconversionofFirm: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.CNVF
  },
  lpLlpAddress: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.ADDR
  },
  lpLlpAnnualReport: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.ANNR
  },
  lpLlpAttorney: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.ATTN
  },
  lpLlpColinFiling: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.FILE
  },
  lpLlpCorrespondence: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.CORSP
  },
  lpLlpRegistration: {
    class: DocumentClasses.LP_LLP,
    type: DocumentTypes.LPRG
  },
  firmConversion: {
    class: DocumentClasses.FIRM,
    type: DocumentTypes.CNVF
  },
  firmMiscellaneous: {
    class: DocumentClasses.FIRM,
    type: DocumentTypes.FIRM_MISC
  },
  firmProprietorNameChange: {
    class: DocumentClasses.FIRM,
    type: DocumentTypes.COPN
  },
  nrConsentLetter: {
    class: DocumentClasses.NR,
    type: DocumentTypes.CONS
  },
  nrMiscellaneous: {
    class: DocumentClasses.NR,
    type: DocumentTypes.CONS
  },
  societyAddress: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.ADDR
  },
  societyAnnualReport: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.ANNR
  },
  societyCorrespondence: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.CORR
  },
  societyCorrections: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.CORC
  },
  societyDirectors: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.DIRS
  },
  societyFiling: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.SOCF
  },
  societyMiscellaneous: {
    class: DocumentClasses.SOCIETY,
    type: DocumentTypes.SOC_MISC
  },
  otherAdministration: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.ADMN
  },
  otherAffidavit: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.AFDV
  },
  otherApplicationCorrection: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.APCO
  },
  otherBcGazette: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.BCGT
  },
  otherBylaw: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.BYLW
  },
  otherBylawAlterations: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.BYLT
  },
  otherCertificates: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CERT
  },
  otherChangeOfName: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CHNM
  },
  otherClientLetters: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CLW
  },
  otherConstitution: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CNST
  },
  otherConsent: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CONT
  },
  otherConversions: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CNVS
  },
  otherCourtOrders: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.CRTO
  },
  otherDatCat: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.DAT
  },
  otherFinancial: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.FINC
  },
  otherFinancialManagement: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.FINM
  },
  otherLetterTemplates: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.LTR
  },
  otherMembership: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.MEM
  },
  otherMinistersOrder: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.MNOR
  },
  otherOtp: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.OTP
  },
  otherPaymentReport: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.RPTP
  },
  otherPlanArrangement: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.PLNA
  },
  otherPreImageDocs: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.PRE
  },
  otherRegistrarNotation: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.REGN
  },
  otherRegistrarOrder: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.REGO
  },
  otherResolution: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.RSLN
  },
  otherSupporting: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.SUPP
  },
  otherSystemIsRecord: {
    class: DocumentClasses.OTHER,
    type: DocumentTypes.SYSR
  },
  mhrMiscellaneous: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.MHR_MISC
  },
  mhrSupportingDocs: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.FNCH
  },
  mhrFinanceChange: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.MHSP
  },
  mhrRegistration: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REG_101
  },
  mhrDecalReplacement: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REG_102
  },
  mhrTransportPermit: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REG_103
  },
  mhrAbandonmentTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.ABAN
  },
  mhrAddition: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.ADDI
  },
  mhrExecutorTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.AFFE
  },
  mhrAttachment: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.ATTA
  },
  mhrBankruptcyTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.BANK
  },
  mhrNoticeCaution: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.CAU
  },
  mhrContinuedCaution: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.CAUC
  },
  mhrCautionExtension: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.CAUE
  },
  mhrCertificateCompanies: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.COMP
  },
  mhrCourtRescindOrder: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.COUR
  },
  mhrSurvivingTenantTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.DEAT
  },
  mhrNameChangeDeclaration: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.DNCH
  },
  mhrManufacturedExemption: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.EXMN
  },
  mhrNonResidentialExemption: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.EXNR
  },
  mhrReRegistration: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.EXRE
  },
  mhrResidentialExemption: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.EXRS
  },
  mhrForeclosureTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.FORE
  },
  mhrRegistrarsFreeze: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.FZE
  },
  mhrGeneralTransmission: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.GENT
  },
  mhrAdministratorTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.LETA
  },
  mhrMaidenName: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.MAID
  },
  mhrMailingAddress: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.MAIL
  },
  mhrMarriageCertificate: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.MARR
  },
  mhrVitalStatsCertificate: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.NAMV
  },
  mhrCancelNote: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.NCAN
  },
  mhrConfidentialNote: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.NCON
  },
  mhrPublicNote: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.NPUB
  },
  mhrRedemptionNotice: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.NRED
  },
  mhrPublicAmendment: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.PUBA
  },
  mhrRebuilt: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REBU
  },
  mhrRegistrarCorrection: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REGC
  },
  mhrInvoluntaryRepossession: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REIV
  },
  mhrVoluntaryRepossession: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REPV
  },
  mhrRestrainingOrder: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.REST
  },
  mhrLocationChange: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.STAT
  },
  mhrSeizureTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.SZL
  },
  mhrTaxSaleNotice: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.TAXN
  },
  mhrTaxSaleTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.TAXS
  },
  mhrFreezeRemoval: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.THAW
  },
  mhrSaleGiftTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.TRAN
  },
  mhrVestingOrderTransfer: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.VEST
  },
  mhrWarehousemanLien: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.WHAL
  },
  mhrExecutorTransferProbate: {
    class: DocumentClasses.MHR,
    type: DocumentTypes.WILL
  },
  pprMiscellaneous: {
    class: DocumentClasses.PPR,
    type: DocumentTypes.PPR_MISC
  },
  pprSearch: {
    class: DocumentClasses.PPR,
    type: DocumentTypes.PPRS
  },
  pprSecurePartyCodes: {
    class: DocumentClasses.PPR,
    type: DocumentTypes.PPRC
  }
}
