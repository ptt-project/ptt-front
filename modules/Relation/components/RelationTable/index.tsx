import React from 'react'
import { Col, Row, Select } from 'antd'
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { DefaultOptionType } from 'antd/lib/select'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import { IRelationTableData, RelationLevel } from '~/model/Relation'
import t from '~/locales'
import RelationCount from './RelationCount'
import styles from './RelationTable.module.scss'

interface ICountDataByRelationLevel {
  [RelationLevel.CHILD]: number
  [RelationLevel.GRANDCHILD]: number
  [RelationLevel.GREAT_GRANDSON]: number
}

interface IRelationTableProps {
  data: IRelationTableData[]
}
const RelationTable: React.FC<IRelationTableProps> = (props: IRelationTableProps) => {
  const { data } = props
  // const totalData: number = data.length

  const relationLevelOptions: DefaultOptionType[] = [
    {
      label: t('relation.relationLevel.one'),
      value: RelationLevel.CHILD
    },
    {
      label: t('relation.relationLevel.two'),
      value: RelationLevel.GRANDCHILD
    },
    {
      label: t('relation.relationLevel.three'),
      value: RelationLevel.GREAT_GRANDSON
    }
  ]

  const levelOneLabel: string = t('relation.relationLevel.one')
  const levelTwoLabel: string = t('relation.relationLevel.two')
  const levelThreeLabel: string = t('relation.relationLevel.three')

  function getRelationLevelLabel(relationLevel: RelationLevel): string {
    switch (relationLevel) {
      case RelationLevel.CHILD:
        return levelOneLabel
      case RelationLevel.GRANDCHILD:
        return levelTwoLabel
      case RelationLevel.GREAT_GRANDSON:
        return levelThreeLabel
      default:
        return ''
    }
  }

  const customData: IRelationTableData[] = data.map((d: IRelationTableData): IRelationTableData => {
    const { relationLevel } = d
    const relationLevelLabel: string = getRelationLevelLabel(relationLevel)
    return { ...d, relationLevelLabel }
  })

  const countDataByRelationLevel: ICountDataByRelationLevel = data.reduce(
    (acc: ICountDataByRelationLevel, cur: IRelationTableData) => {
      const { relationLevel } = cur
      acc[relationLevel] += 1
      return acc
    },
    {
      [RelationLevel.CHILD]: 0,
      [RelationLevel.GRANDCHILD]: 0,
      [RelationLevel.GREAT_GRANDSON]: 0
    }
  )

  const columns: ColumnsType<IRelationTableData> = [
    {
      title: t('relation.table.username'),
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: t('relation.table.relationLevel'),
      dataIndex: 'relationLevelLabel',
      key: 'relationLevelLabel',
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: t('relation.table.commission'),
      dataIndex: 'commission',
      key: 'commission',
      align: 'right',
      sorter: true,
      showSorterTooltip: false,
      render: (value: number) =>
        value.toLocaleString('en-EN', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })
    }
  ]

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IRelationTableData> | SorterResult<IRelationTableData>[],
    extra: TableCurrentDataSource<IRelationTableData>
  ): void {
    // TODO: handle sort column here
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Col>
      <Row className="w-100" gutter={[16, 16]}>
        {Object.entries(countDataByRelationLevel).map(
          ([relationLevel, count]: [string, number]) => {
            const relationLevelNumber: number = Number(relationLevel)
            return (
              <Col key={relationLevel} sm={6} xs={8}>
                <RelationCount
                  count={count}
                  relationLevelLabel={getRelationLevelLabel(relationLevelNumber)}
                  relationLevel={relationLevelNumber}
                />
              </Col>
            )
          }
        )}
        <Col sm={6} xs={24}>
          <Select
            className="w-100"
            placeholder={t('relation.table.noFilterRelation')}
            allowClear
            autoClearSearchValue
          >
            {relationLevelOptions.map((option: DefaultOptionType) => (
              <Select.Option key={`${option.value}`} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Table
        className={`${styles.relationTable} ${styles.relationTableSm} hps-table hps-scroll`}
        rowKey="username"
        columns={columns}
        dataSource={customData}
        onChange={onChange}
        pagination={false}
        scroll={{ x: true }}
      />
    </Col>
  )
}

export default RelationTable