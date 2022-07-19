import React, { FC, useState } from 'react'
import { Typography, Table, Space, Image } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import t from '~/locales'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import styles from './List.module.scss'

const { Text } = Typography

interface DataType {
  key: React.Key
  productName: string
  view: number
  favorite: number
  sku: string
  productSelection: string
  price: string
  warehouse: string
  sales: string
  img: string
}
const data: DataType[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    productName: `ดัมเบลหุ้มยาง ${i} กิโลกรัม`,
    view: i,
    favorite: i,
    sku: `S00${i}`,
    productSelection: '-',
    price: `4${i}`,
    warehouse: `0${i}`,
    sales: `1${i}`,
    img: 'https://joeschmoe.io/api/v1/random'
  })
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

const List: FC = () => {
  const [isOpenDelModal, setIsOpenDelModal] = useState<boolean>(false)
  const [isContentImg, setIsContentImg] = useState<string>()
  const [isContentTextImg, setIsContentTextImg] = useState<string>()
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
      dataIndex: 'productName',
      render: (text, item) => {
        return (
          <div>
            <div>{item.productName}</div>
            <div className={styles.row}>
              <div className={styles.column}>
                <Image preview={false} width={48} src={item.img} />
              </div>
              <div className={`mt-1 ${styles.column} ${styles.textGrey}`}>
                <div>
                  <i className="far fa-eye" />
                  <Text className="ml-1" type="secondary">
                    {item.view}
                  </Text>
                </div>
                <div>
                  <i className="fas fa-heart" />
                  <Text className="ml-1" type="secondary">
                    {item.favorite}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )
      }
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
      render: (text, item) => {
        return (
          <Space size="middle" className={styles.textSecondary}>
            <a>
              <i className="far fa-eye-slash" />
            </a>
            <a>
              <i className="fas fa-pen" />
            </a>
            <a>
              <i onClick={() => onDelModal(item)} className="fas fa-trash-alt" />
            </a>
          </Space>
        )
      }
    }
  ]
  function toggleDelModal(): void {
    setIsOpenDelModal(!isOpenDelModal)
  }

  function onDelModal(item): void {
    if (item) {
      setIsContentImg(item.img)
      setIsContentTextImg(item.productName)
      setIsOpenDelModal(true)
    }
  }

  function onRemove(): void {
    console.log('reomove')
  }
  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDelModal}
        toggle={toggleDelModal}
        type="error"
        title={t('sellerProducts.delete.title')}
        content={t('sellerProducts.delete.msgQuestion')}
        contentWarning={t('sellerProducts.delete.msgWarning')}
        contentImg={isContentImg}
        contentTextImg={isContentTextImg}
        onSubmit={onRemove}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        className="hps-table hps-scroll"
      />
    </>
  )
}

export default List
