export interface IRelationData {
  username: string
  parent: string
  commission: number
}

export enum RelationLevel {
  CHILD = 1,
  GRANDCHILD = 2,
  GREAT_GRANDSON = 3
}

export interface IRelationTableData extends IRelationData {
  relationLevel: RelationLevel
  relationLevelLabel?: string
}
