import { Col, Image, Row, Space, Table, Tag, TagProps, Typography } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, ReactNode, useMemo } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'
import { IHappyPointHistoryData } from '~/interfaces'
import { HappyPointService } from '~/services'
import { CustomPagingUtil, HelperDecimalFormatUtil } from '~/utils/main'
import styles from './HappyPointHistoryTable.module.scss'

const { Text } = Typography

interface IHappyPointHistoryTableProps {
  filter?: HappyPointTypeEnum
}
const HappyPointHistoryTable: FC<IHappyPointHistoryTableProps> = (
  props: IHappyPointHistoryTableProps
) => {
  const { filter } = props
  const { page, limit, onPageChange, onLimitChange } = CustomPagingUtil()
  const { data: happyPointHistory, isLoading } = HappyPointService.useGetHappyPointHistory({
    filter,
    page,
    limit
  })
  const { items = [], meta } = happyPointHistory || {}

  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])

  const columns: ColumnsType<IHappyPointHistoryData> = useMemo(
    (): ColumnsType<IHappyPointHistoryData> => [
      {
        title: t('happy-point:history.createdAt'),
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
        title: t('happy-point:history.type'),
        className: styles.type,
        dataIndex: 'type',
        key: 'type',
        sorter: false,
        showSorterTooltip: false,
        render: (value: HappyPointTypeEnum): ReactNode => {
          let happyPointTypeLabel: string = ''
          let happyPointTypeIcon: string = ''
          switch (value) {
            case HappyPointTypeEnum.BUY:
              happyPointTypeLabel = t('happy-point:buy.title')
              happyPointTypeIcon = './images/main/buyer/happy-point-buy.svg'
              break
            case HappyPointTypeEnum.SELL:
              happyPointTypeLabel = t('happy-point:sell.title')
              happyPointTypeIcon = './images/main/buyer/happy-point-sell.svg'
              break
            case HappyPointTypeEnum.TRANSFER:
              happyPointTypeLabel = t('happy-point:transfer.title')
              happyPointTypeIcon = './images/main/buyer/happy-point-transfer.svg'
              break
            default:
              break
          }
          return (
            <Row gutter={[4, 0]} wrap={false}>
              <Col>
                <Image
                  className={styles.typeIcon}
                  preview={false}
                  src={happyPointTypeIcon}
                  alt=""
                />
              </Col>
              <Col>
                <Text>{happyPointTypeLabel}</Text>
              </Col>
            </Row>
          )
        }
      },
      {
        title: t('happy-point:history.description'),
        dataIndex: 'memberRemark',
        key: 'memberRemark',
        sorter: false,
        align: 'left',
        showSorterTooltip: false,
        render: (value: string) => <Text>{value}</Text>
      },
      {
        title: t('happy-point:history.amount'),
        dataIndex: 'amount',
        key: 'amount',
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        render: (value: number, record: IHappyPointHistoryData) => (
          <Row justify="end" wrap={false}>
            <Col>
              <Text>{record.type === HappyPointTypeEnum.BUY ? '+' : '-'}</Text>
            </Col>
            <Col>
              <Text>{HelperDecimalFormatUtil(value)}</Text>
            </Col>
          </Row>
        )
      },
      {
        title: t('happy-point:history.status'),
        dataIndex: 'status',
        key: 'status',
        sorter: false,
        align: 'center',
        showSorterTooltip: false,
        render: (value: HappyPointStatusEnum): JSX.Element => {
          let tagColor: TagProps['color'] = ''
          let statusLabel: string = ''
          switch (value) {
            case HappyPointStatusEnum.SUCCESS:
              statusLabel = t('สำเร็จ')
              tagColor = 'success'
              break
            case HappyPointStatusEnum.CANCELED:
              statusLabel = t('ยกเลิก')
              tagColor = 'error'
              break
            case HappyPointStatusEnum.FAILED:
              statusLabel = t('ไม่สำเร็จ')
              tagColor = 'error'
              break
            case HappyPointStatusEnum.PENDING:
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
    sorter: SorterResult<IHappyPointHistoryData>,
    extra: TableCurrentDataSource<IHappyPointHistoryData>
  ): void {
    // TODO: handle sort column here
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Table
      className={`${styles.layout} hps-table hps-scroll`}
      columns={columns}
      dataSource={items || []}
      onChange={onChange}
      pagination={{
        onChange: (newPage: number, newLimit: number): void => {
          onPageChange(newPage)
          onLimitChange(newLimit)
        },
        total: meta?.totalItems || 0,
        showTotal: (total: number, range: [number, number]): string =>
          t('happy-point:history.paginateLabel', {
            from: range[0],
            to: range[1],
            total
          }),
        showSizeChanger: true,
        defaultPageSize: limit,
        defaultCurrent: page,
        pageSizeOptions: [5, 10, 20, 50]
      }}
      loading={isLoading}
      scroll={{ x: true }}
    />
  )
}

export default HappyPointHistoryTable
