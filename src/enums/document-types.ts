export enum DocumentClasses {
  CORP = 'CORP',
  COOP = 'COOP',
}

export enum DocumentTypes {
  CNTA = 'CNTA',
  DIRECTOR_AFFIDAVIT = 'DIRECTOR_AFFIDAVIT',
  CORP_AFFIDAVIT = 'CORP_AFFIDAVIT',
  COOP_MEMORANDUM = 'COOP_MEMORANDUM', // Memorandum
  COOP_RULES = 'COOP_RULES', // Rules
  COU = 'COU', // Court Order
}

export const DOCUMENT_TYPES = {
  contInAuthorization: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CNTA
  },
  directorAffidavit: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.DIRECTOR_AFFIDAVIT
  },
  corpAffidavit: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.CORP_AFFIDAVIT
  },
  coopMemorandum: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COOP_MEMORANDUM
  },
  coopRules: {
    class: DocumentClasses.COOP,
    type: DocumentTypes.COOP_RULES
  },
  courtOrder: {
    class: DocumentClasses.CORP,
    type: DocumentTypes.COU
  }
}
