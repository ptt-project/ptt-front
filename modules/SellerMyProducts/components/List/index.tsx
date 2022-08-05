import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Table, Space, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import { LocaleNamespaceConst } from '~/constants'
import styles from './List.module.scss'

const { Text } = Typography

interface IDataType {
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

const data: IDataType[] = []
for (let i: number = 0; i < 100; i++) {
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

/* const onChange: TableProps<IDataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
} */

const List: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [isOpenDelModal, setIsOpenDelModal] = useState<boolean>(false)
  const [isContentImg, setIsContentImg] = useState<string>()
  const [isContentTextImg, setIsContentTextImg] = useState<string>()
  const productName: string = t('seller.product:list.productName') // prevent error hook rules
  const SKU: string = t('seller.product:list.SKU') // prevent error hook rules
  const productSelection: string = t('seller.product:list.productSelection') // prevent error hook rules
  const price: string = t('seller.product:list.price') // prevent error hook rules
  const warehouse: string = t('seller.product:list.warehouse') // prevent error hook rules
  const sales: string = t('seller.product:list.sales') // prevent error hook rules
  const operation: string = t('seller.product:list.operation') // prevent error hook rules
  const columns: ColumnsType<IDataType> = [
    {
      title: productName,
      dataIndex: 'productName',
      render: (text: string, item: IDataType) => (
        <>
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
        </>
      )
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
      align: 'right'
      // sorter: (a: IDataType, b: IDataType) => a.price - b.price // build error
    },
    {
      title: warehouse,
      dataIndex: 'warehouse',
      defaultSortOrder: 'descend'
      // sorter: (a: IDataType, b: IDataType) => a.warehouse - b.warehouse // build error
    },
    {
      title: sales,
      dataIndex: 'sales',
      defaultSortOrder: 'descend',
      align: 'right'
      // sorter: (a: IDataType, b: IDataType) => a.sales - b.sales // build error
    },
    {
      title: operation,
      dataIndex: '',
      key: 'x',
      render: (text: string, item: IDataType) => (
        <Space size="middle" className={styles.textSecondary}>
          <Text>
            <i className="far fa-eye-slash" />
          </Text>
          <Text>
            <i className="fas fa-pen" />
          </Text>
          <Text onClick={(): void => onDelModal(item)}>
            <i className="fas fa-trash-alt" />
          </Text>
        </Space>
      )
    }
  ]

  function toggleDelModal(): void {
    setIsOpenDelModal(!isOpenDelModal)
  }

  function onDelModal(item: IDataType): void {
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
        title={t('seller.product:delete.title')}
        content={t('seller.product:delete.msgQuestion')}
        contentWarning={t('seller.product:delete.msgWarning')}
        contentImg={isContentImg}
        contentTextImg={isContentTextImg}
        onSubmit={onRemove}
      />
      <Table
        columns={columns}
        dataSource={data}
        // onChange={onChange}
        pagination={{ pageSize: 10 }}
        className="hps-table hps-scroll"
      />
    </>
  )
}

export default List
