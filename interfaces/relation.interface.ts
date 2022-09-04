import { RelationLevelEnum } from '~/enums'

export interface IRelationData {
  username: string
  parent: string
  commission: number
}

export interface IRelationTableData {
  username: string
  level: RelationLevelEnum
}

export interface IRelationTreeData {
  name: string
  level: RelationLevelEnum
  children: IRelationTreeData[]
}

export interface IRelationResponse {
  relationTree: IRelationTreeData
  relationTable: IRelationTableData[]
}
