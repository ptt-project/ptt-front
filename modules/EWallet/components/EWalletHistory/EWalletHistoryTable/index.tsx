/* eslint-disable @typescript-eslint/typedef */
import { Col, Image, Row, Space, Table, Tag, TagProps, Typography } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo, useState } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IWalletTransaction } from '~/interfaces'
import { useGetWalletHistory } from '~/services/wallet.service'
import { HelperDecimalFormatUtil } from '~/utils/main'
import styles from './EWalletHistoryTable.module.scss'

const { Text } = Typography

interface IEWalletHistoryTableProps {
  type?: EWalletTypeEnum
  startDate?: moment.Moment
  endDate?: moment.Moment
}
const EWalletHistoryTable: FC<IEWalletHistoryTableProps> = (props: IEWalletHistoryTableProps) => {
  const { type, startDate, endDate } = props

  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)

  const { data: walletHistoryResponse, isFetching } = useGetWalletHistory({
    page,
    limit,
    type,
    startDate: startDate?.toDate(),
    endDate: endDate?.toDate()
  })

  const columns: ColumnsType<IWalletTransaction> = useMemo(
    (): ColumnsType<IWalletTransaction> => [
      {
        title: t('e-wallet:history.createdAt'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: false,
        showSorterTooltip: false,
        render: (value: number) => (
          <Space direction="vertical" size={0}>
            <Text>{moment(value).format('DD/MM/YYYY')}</Text>
            <Text>{moment(value).format('HH:mm:ss')}</Text>
          </Space>
        )
      },
      {
        title: t('e-wallet:history.type'),
        className: styles.type,
        dataIndex: 'type',
        key: 'type',
        sorter: false,
        showSorterTooltip: false,
        render: (value: EWalletTypeEnum) => (
          <Row gutter={[4, 0]} wrap={false}>
            <Col>
              {value === EWalletTypeEnum.WITHDRAW ? (
                <Image
                  className={styles.typeIcon}
                  preview={false}
                  src="./images/main/buyer/icon-withdraw.svg"
                />
              ) : (
                <Image
                  className={styles.typeIcon}
                  preview={false}
                  src="./images/main/buyer/icon-top-up-red.svg"
                />
              )}
            </Col>
            <Col>
              <Text>
                {value === EWalletTypeEnum.WITHDRAW
                  ? t('e-wallet:withdraw.title')
                  : t('e-wallet:topUp.title')}
              </Text>
            </Col>
          </Row>
        )
      },
      {
        title: t('e-wallet:history.description'),
        dataIndex: 'detail',
        key: 'detail',
        sorter: false,
        align: 'left',
        showSorterTooltip: false,
        render: (value: string) => <Text ellipsis>{value}</Text>
      },
      {
        title: t('e-wallet:history.amount'),
        dataIndex: 'amount',
        key: 'amount',
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        render: (value: number, record: IWalletTransaction) => (
          <Row justify="end" wrap={false}>
            <Col>
              <Text>{record.type === EWalletTypeEnum.WITHDRAW ? '' : '+'}</Text>
            </Col>
            <Col>
              <Text>{HelperDecimalFormatUtil(value)}</Text>
            </Col>
          </Row>
        )
      },
      {
        title: t('e-wallet:history.status'),
        dataIndex: 'status',
        key: 'status',
        sorter: false,
        align: 'center',
        showSorterTooltip: false,
        render: (value: EWalletStatusEnum): JSX.Element => {
          let tagColor: TagProps['color'] = ''
          let statusLabel: string = ''
          switch (value) {
            case EWalletStatusEnum.SUCCESS:
              statusLabel = t('สำเร็จ')
              tagColor = 'success'
              break
            case EWalletStatusEnum.CANCELED:
              statusLabel = t('ยกเลิก')
              tagColor = 'error'
              break
            case EWalletStatusEnum.FAILED:
              statusLabel = t('ไม่สำเร็จ')
              tagColor = 'error'
              break
            case EWalletStatusEnum.PENDING:
            default:
              statusLabel = ''
              break
          }
          return (
            <Row justify="center">{statusLabel && <Tag color={tagColor}>{statusLabel}</Tag>}</Row>
          )
        }
      }
    ],
    [t]
  )

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IWalletTransaction>,
    extra: TableCurrentDataSource<IWalletTransaction>
  ): void {
    // TODO: handle sort column here
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Table
      className={`${styles.layout} hps-table hps-scroll`}
      columns={columns}
      dataSource={walletHistoryResponse?.items || []}
      onChange={onChange}
      loading={isFetching}
      pagination={{
        total: walletHistoryResponse?.meta?.totalItems || 0,
        showTotal: (total: number, range: [number, number]): string =>
          t('e-wallet:history.paginateLabel', {
            from: range[0],
            to: range[1],
            total
          }),
        showSizeChanger: true,
        defaultPageSize: limit,
        pageSizeOptions: [5, 10, 20, 50],
        defaultCurrent: page,
        onChange: (newPage: number, newLimit: number): void => {
          setPage(newPage)
          setLimit(newLimit)
        }
      }}
      scroll={{ x: true }}
    />
  )
}

EWalletHistoryTable.defaultProps = {
  type: undefined,
  startDate: undefined,
  endDate: undefined
}

export default EWalletHistoryTable
