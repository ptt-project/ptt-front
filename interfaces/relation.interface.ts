import { RelationLevelEnum } from '~/enums'

export interface IRelationData {
  username: string
  parent: string
  commission: number
}

export interface IRelationTableData extends IRelationData {
  relationLevel: RelationLevelEnum
  relationLevelLabel?: string
}
