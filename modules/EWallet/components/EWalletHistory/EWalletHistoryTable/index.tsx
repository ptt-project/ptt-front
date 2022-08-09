import { Col, Image, Row, Space, Table, Typography } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IEWalletHistoryData } from '~/interfaces'
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
        dataIndex: 'type',
        key: 'type',
        sorter: false,
        showSorterTooltip: false,
        render: (value: EWalletTypeEnum) => (
          <Row gutter={[4, 0]}>
            <Col>
              {value === EWalletTypeEnum.WITHDRAW ? (
                <Image preview={false} src="./images/main/buyer/icon-withdraw.svg" />
              ) : (
                <Image preview={false} src="./images/main/buyer/icon-top-up-red.svg" />
              )}
            </Col>
            <Col>
              {value === EWalletTypeEnum.WITHDRAW ? t('e-wallet:withdraw') : t('e-wallet:topUp')}
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
        showSorterTooltip: false
      },
      {
        title: t('e-wallet:history.amount'),
        dataIndex: 'amount',
        key: 'amount',
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        render: (value: number, record: IEWalletHistoryData) => (
          <Row justify="end">
            <Col>
              <Text>{record.type === EWalletTypeEnum.WITHDRAW ? '-' : '+'}</Text>
            </Col>
            <Col>
              <Text>
                {value.toLocaleString('en-EN', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
              </Text>
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
          let statusLabel: string = ''
          const statusClassNames: string[] = [styles.statusTag]
          switch (value) {
            case EWalletStatusEnum.SUCCESS:
              statusLabel = t('สำเร็จ')
              statusClassNames.push(styles.tagBlue)
              break
            case EWalletStatusEnum.CANCELED:
              statusLabel = t('ยกเลิก')
              statusClassNames.push(styles.tagRed)
              break
            case EWalletStatusEnum.FAILED:
              statusLabel = t('ไม่สำเร็จ')
              statusClassNames.push(styles.tagRed)
              break
            case EWalletStatusEnum.PENDING:
            default:
              statusLabel = ''
              break
          }
          return (
            <Row justify="center">
              <div className={statusClassNames.join(' ')}>
                <Text>{statusLabel}</Text>
              </div>
            </Row>
          )
        }
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
      className={`${styles.layout} hps-table hps-scroll`}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      scroll={{ x: true }}
    />
  )
}

export default EWalletHistoryTable
