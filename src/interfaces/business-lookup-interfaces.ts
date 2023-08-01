import { CorpTypeCd, EntityStates } from '@bcrs-shared-components/enums'

export interface BusinessLookupIF {
  identifier: string
  name: string
  bn?: string
}

export const EmptyBusinessLookup: BusinessLookupIF = {
  identifier: null,
  name: null
}

export interface BusinessLookupResultIF {
  bn?: string
  identifier: string
  legalType: CorpTypeCd
  name: string
  score?: number
  status: EntityStates
  disabled?: boolean // for display in v-autocomplete
}
