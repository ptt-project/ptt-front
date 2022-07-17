import React, { FC, useState } from 'react'
import { Typography, Table, Space } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import t from '~/locales'
import styles from './List.module.scss'

const { Text } = Typography

interface DataType {
  key: React.Key
  productName: string
  sku: string
  productSelection: string
  price: string
  warehouse: string
  sales: string
}
const data: DataType[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    productName: `ดัมเบลหุ้มยาง ${i} กิโลกรัม`,
    sku: `S00${i}`,
    productSelection: '-',
    price: `4${i}`,
    warehouse: `0${i}`,
    sales: `1${i}`
  })
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

const List: FC = () => {
  const productName: string = t('sellerProducts.list.productName') // prevent error hook rules
  const SKU: string = t('sellerProducts.list.SKU') // prevent error hook rules
  const productSelection: string = t('sellerProducts.list.productSelection') // prevent error hook rules
  const price: string = t('sellerProducts.list.price') // prevent error hook rules
  const warehouse: string = t('sellerProducts.list.warehouse') // prevent error hook rules
  const sales: string = t('sellerProducts.list.sales') // prevent error hook rules
  const operation: string = t('sellerProducts.list.operation') // prevent error hook rules
  const columns: ColumnsType<DataType> = [
    {
      title: productName,
      dataIndex: 'productName'
    },
    {
      title: SKU,
      dataIndex: 'sku'
    },
    {
      title: productSelection,
      dataIndex: 'productSelection'
    },
    {
      title: price,
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: warehouse,
      dataIndex: 'warehouse',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.warehouse - b.warehouse
    },
    {
      title: sales,
      dataIndex: 'sales',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sales - b.sales
    },
    {
      title: operation,
      dataIndex: '',
      key: 'x',
      render: () => (
        <Space size="middle" className={styles.textSecondary}>
          <a>
            <i className="far fa-eye-slash" />
          </a>
          <a>
            <i className="fas fa-pen" />
          </a>
          <a>
            <i className="fas fa-trash-alt" />
          </a>
        </Space>
      )
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 10 }}
      className="hps-table hps-scroll"
    />
  )
}

export default List
