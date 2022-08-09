import { Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'
import { LocaleNamespaceConst } from '~/constants'

enum EWalletStatusEnum {
  pending,
  failed,
  canceled,
  success
}

interface IEWalletHistoryData {
  id?: string
  description?: string
  amount: number
  createdAt: string
  status: EWalletStatusEnum
}

interface IEWalletHistoryTableProps {
  data: IEWalletHistoryData[]
}
const EWalletHistoryTable: FC<IEWalletHistoryTableProps> = (props: IEWalletHistoryTableProps) => {
  const { data } = props

  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])

  const columns: ColumnsType<IEWalletHistoryData> = useMemo(
    (): ColumnsType<IEWalletHistoryData> => [
      {
        title: t('วันที่ทำรายการ'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: false,
        showSorterTooltip: false
      },
      {
        title: t('ประเภท'),
        dataIndex: 'type',
        key: 'type',
        sorter: false,
        showSorterTooltip: false
      },
      {
        title: t('รายละเอียด'),
        dataIndex: 'description',
        key: 'description',
        sorter: false,
        align: 'left',
        showSorterTooltip: false,
        render: (value: number) =>
          value.toLocaleString('en-EN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        title: t('จำนวนเงิน'),
        dataIndex: 'amount',
        key: 'amount',
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        render: (value: number) =>
          value.toLocaleString('en-EN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        title: t('สถานะ'),
        dataIndex: 'status',
        key: 'status',
        sorter: false,
        align: 'center',
        showSorterTooltip: false
      }
    ],
    [t]
  )

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IEWalletHistoryData> | SorterResult<IEWalletHistoryData>[],
    extra: TableCurrentDataSource<IEWalletHistoryData>
  ): void {
    // TODO: handle sort column here
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Table
      className="hps-table hps-scroll"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      scroll={{ x: true }}
    />
  )
}

export default EWalletHistoryTable
