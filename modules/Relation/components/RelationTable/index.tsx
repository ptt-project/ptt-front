import React, { useCallback, useMemo } from 'react'
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import RelationCount from './RelationCount'
import styles from './RelationTable.module.scss'
import { Col, Row, Select } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import { useTranslation } from 'next-i18next'
import { IRelationTableData } from '~/interfaces'
import { RelationLevelEnum } from '~/enums'
import { LocaleNamespaceConst } from '~/constants'
import { HelperDecimalFormatUtil } from '~/utils/main'

interface ICountDataByRelationLevel {
  [RelationLevelEnum.CHILD]: number
  [RelationLevelEnum.GRANDCHILD]: number
  [RelationLevelEnum.GREAT_GRANDSON]: number
}

interface IRelationTableProps {
  data: IRelationTableData[]
}
const RelationTable: React.FC<IRelationTableProps> = (props: IRelationTableProps) => {
  const { data } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'relation'])

  // const totalData: number = data.length

  const getRelationLevelLabel: (relationLevel: RelationLevelEnum) => string = useCallback(
    (relationLevel: RelationLevelEnum): string => {
      switch (relationLevel) {
        case RelationLevelEnum.CHILD:
          return t('relation:relationLevel.one')
        case RelationLevelEnum.GRANDCHILD:
          return t('relation:relationLevel.two')
        case RelationLevelEnum.GREAT_GRANDSON:
          return t('relation:relationLevel.three')
        default:
          return ''
      }
    },
    [t]
  )

  const relationLevelOptions: DefaultOptionType[] = useMemo(
    () => [
      {
        label: t('relation:relationLevel.one'),
        value: RelationLevelEnum.CHILD
      },
      {
        label: t('relation:relationLevel.two'),
        value: RelationLevelEnum.GRANDCHILD
      },
      {
        label: t('relation:relationLevel.three'),
        value: RelationLevelEnum.GREAT_GRANDSON
      }
    ],
    [t]
  )

  const countDataByRelationLevel: ICountDataByRelationLevel = useMemo(
    () =>
      data.reduce(
        (acc: ICountDataByRelationLevel, cur: IRelationTableData) => {
          const { level } = cur
          acc[level] += 1
          return acc
        },
        {
          [RelationLevelEnum.CHILD]: 0,
          [RelationLevelEnum.GRANDCHILD]: 0,
          [RelationLevelEnum.GREAT_GRANDSON]: 0
        }
      ),
    [data]
  )

  const columns: ColumnsType<IRelationTableData> = useMemo(
    () => [
      {
        title: t('relation:table.username'),
        dataIndex: 'username',
        key: 'username',
        sorter: true,
        showSorterTooltip: false
      },
      {
        title: t('relation:table.relationLevel'),
        dataIndex: 'level',
        key: 'level',
        sorter: true,
        showSorterTooltip: false,
        render: (level: RelationLevelEnum) => getRelationLevelLabel(level)
      },
      {
        title: t('relation:table.commission'),
        dataIndex: 'commission',
        key: 'commission',
        align: 'right',
        sorter: true,
        showSorterTooltip: false,
        render: (value: number) => HelperDecimalFormatUtil(value, 2)
      }
    ],
    [getRelationLevelLabel, t]
  )

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IRelationTableData>,
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
            placeholder={t('relation:table.noFilterRelation')}
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
        dataSource={data}
        onChange={onChange}
        pagination={false}
        scroll={{ x: true }}
      />
    </Col>
  )
}

export default RelationTable
