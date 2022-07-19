export interface IRelationData {
  username: string
  parent: string
  commission: number
}

export interface IRelationTableData extends IRelationData {
  relationLevel: number
  relationLevelLabel?: string
}
