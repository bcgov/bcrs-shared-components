import { CorpTypeCd } from '@bcrs-shared-components/corp-type-module'
import { NameTypes } from '@bcrs-shared-components/enums'
import { ApiDateTimeUtc, IsoDatePacific } from '@bcrs-shared-components/interfaces'

export interface AlternateNameIF {
  entityType: CorpTypeCd
  identifier: string
  name: string
  nameRegisteredDate: ApiDateTimeUtc
  nameStartDate: IsoDatePacific
  nameType: NameTypes
}
