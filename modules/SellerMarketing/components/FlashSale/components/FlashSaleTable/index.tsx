import { Space, Switch, Tag, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '../../../../../../constants'
import EmptyTableData from '../../../../../SellerCategory/components/EmptyTableData'
import styles from './FlashSaleTable.module.scss'

const { Text } = Typography

interface IFlashSaleData {
  key: string
  title: string
  subTitle: string
  startDate: string
  endDate: string
  view: number
  status: number
  active: boolean
}

const dataSource: IFlashSaleData[] = [
  {
    key: '1',
    title: 'ที่เปิดแสดง Flash sale 0',
    subTitle: 'ที่ว่างทั้งหมด 10',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    view: 0,
    status: 0,
    active: true
  },
  {
    key: '2',
    title: 'ที่เปิดแสดง Flash sale 0',
    subTitle: 'ที่ว่างทั้งหมด 10',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    view: 421,
    status: 1,
    active: true
  }
]

const FlashSaleTable: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const columns: ColumnsType<IFlashSaleData> = [
    {
      title: t('seller.marketing:flashSale.table.a'),
      dataIndex: 'cycleDate',
      key: 'cycleDate',
      width: 100,
      sorter: (a: IFlashSaleData, b: IFlashSaleData) =>
        moment(a.startDate).unix() - moment(b.startDate).unix(),
      render: (text: string, record: IFlashSaleData, index: number): JSX.Element => {
        const date: string = moment(record.startDate).format('DD/MM/YYYY')
        const startTime: string = moment(record.startDate).format('HH:mm')
        const endTime: string = moment(record.endDate).format('HH:mm')
        return (
          <Text key={index}>
            {date}
            <br />
            {startTime} - {endTime}
          </Text>
        )
      }
    },
    {
      title: t('seller.marketing:flashSale.table.b'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      sorter: (a: IFlashSaleData, b: IFlashSaleData) => a.title.localeCompare(b.title),
      render: (text: string, record: IFlashSaleData, index: number): JSX.Element => (
        <div key={index}>
          <Text>{record.title}</Text>
          <br />
          <Text type="secondary" className="hps-text-small">
            {record.subTitle}
          </Text>
        </div>
      )
    },
    {
      title: t('seller.marketing:flashSale.table.c'),
      dataIndex: 'view',
      key: 'view',
      align: 'right',
      width: 100,
      sorter: (a: IFlashSaleData, b: IFlashSaleData) => a.view - b.view
    },
    {
      title: t('seller.marketing:flashSale.table.d'),
      key: 'status',
      width: 100,
      sorter: (a: IFlashSaleData, b: IFlashSaleData) => a.status - b.status,
      render: (text: string, record: IFlashSaleData, index: number): JSX.Element => {
        switch (record.status) {
          case 0:
            return (
              <Tag key={index} color="warning">
                เร็วๆ นี้
              </Tag>
            )
          case 1:
            return (
              <Tag key={index} color="error">
                หมดอายุ
              </Tag>
            )
          default:
            return <Tag key={index}>ไม่ระบุ</Tag>
        }
      }
    },
    {
      title: t('seller.marketing:flashSale.table.e'),
      key: 'active',
      align: 'center',
      width: 100,
      render: (text: string, record: IFlashSaleData, index: number): JSX.Element => (
        <Switch
          className="hps-switch"
          key={index}
          defaultChecked={record.active}
          onChange={(checked: boolean): void => onChangeSwitch(checked)}
        />
      )
    },
    {
      title: t('seller.marketing:flashSale.table.f'),
      key: 'action',
      align: 'right',
      width: 100,
      render: (text: string, record: IFlashSaleData, index: number): JSX.Element => (
        <Space key={index} size="middle">
          <Text className={styles.action}>
            <i className="fas fa-pen" />
          </Text>
          <Text className={styles.action}>
            <i className="fas fa-trash-alt" />
          </Text>
        </Space>
      )
    }
  ]

  function onChangeSwitch(checked: boolean): void {
    console.log(checked)
  }

  return (
    <Table
      className={`${styles.table} hps-table hps-scroll`}
      size="middle"
      columns={columns}
      dataSource={dataSource}
      pagination={{ position: ['none', 'none'] as any }}
      locale={{ emptyText: <EmptyTableData /> }}
    />
  )
}

export default FlashSaleTable
