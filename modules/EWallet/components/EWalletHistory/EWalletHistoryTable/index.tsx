import { Col, Image, Row, Space, Table, Tag, TagProps, Typography } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IEWalletHistoryData } from '~/interfaces'
import { formatNumberDecimal } from '~/utils/main'
import styles from './EWalletHistoryTable.module.scss'

const { Text } = Typography

interface IEWalletHistoryTableProps {
  data: IEWalletHistoryData[]
}
const EWalletHistoryTable: FC<IEWalletHistoryTableProps> = (props: IEWalletHistoryTableProps) => {
  const { data } = props

  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])

  const columns: ColumnsType<IEWalletHistoryData> = useMemo(
    (): ColumnsType<IEWalletHistoryData> => [
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
        dataIndex: 'description',
        key: 'description',
        sorter: false,
        align: 'left',
        showSorterTooltip: false,
        render: (value: string) => <Text>{value}</Text>
      },
      {
        title: t('e-wallet:history.amount'),
        dataIndex: 'amount',
        key: 'amount',
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        render: (value: number, record: IEWalletHistoryData) => (
          <Row justify="end" wrap={false}>
            <Col>
              <Text>{record.type === EWalletTypeEnum.WITHDRAW ? '-' : '+'}</Text>
            </Col>
            <Col>
              <Text>{formatNumberDecimal(value)}</Text>
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
    sorter: SorterResult<IEWalletHistoryData>,
    extra: TableCurrentDataSource<IEWalletHistoryData>
  ): void {
    // TODO: handle sort column here
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Table
      className={`${styles.layout} hps-table hps-scroll`}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{
        total: data.length,
        showTotal: (total: number, range: [number, number]): string =>
          t('e-wallet:history.paginateLabel', {
            from: range[0],
            to: range[1],
            total
          }),
        showSizeChanger: true,
        defaultPageSize: 10,
        defaultCurrent: 1
      }}
      scroll={{ x: true }}
    />
  )
}

export default EWalletHistoryTable
