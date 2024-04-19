import { CorpTypeCd } from '@bcrs-shared-components/corp-type-module'
import { NameTypes } from '@bcrs-shared-components/enums'
import { ApiDateTimeUtc, IsoDatePacific } from './date-interfaces'

export interface AlternateNameIF {
  entityType: CorpTypeCd
  identifier: string
  name: string
  registeredDate: ApiDateTimeUtc
  startDate: IsoDatePacific
  type: NameTypes
}
