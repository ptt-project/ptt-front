import React, { FC, useState } from 'react'
import Link from 'next/link'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import Loading from '../../../../components/main/Loading'
import styles from './ProductList.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Table, Space, Image, message } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IListItems, IProduct, IProductItem } from '../../../../interfaces'
import type { ColumnsType } from 'antd/es/table'
import { HelperDecimalFormatUtil, HelperGetImageUtil } from '../../../../utils/main'
import { ImageSizeEnum, ProductStatusEnum } from '../../../../enums'
import { ShopService } from '../../../../services'

const { Text } = Typography

interface IProductListProps {
  products: IListItems<IProduct>
  fetch: () => Promise<void>
}

const ProductList: FC<IProductListProps> = (props: IProductListProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [productSelected, setProductSelected] = useState<IProduct>()

  const columns: ColumnsType<IProduct> = [
    {
      title: t('seller.product:list.productName'),
      key: 'name',
      render: (text: string, record: IProduct) => (
        <div>
          <Text className={`${styles.tableText} mb-2`}>{record.name}</Text>
          <div className={styles.tableImage}>
            <Image
              preview={false}
              width={56}
              src={HelperGetImageUtil(record.imageIds[0], ImageSizeEnum.THUMBNAIL)}
              alt={record.name}
            />
            <div>
              <div>
                <Text type="secondary">
                  <i className="far fa-eye mr-2" />
                  {record.watched}
                </Text>
              </div>
              <div>
                <Text type="secondary">
                  <i className="fas fa-heart mr-2" />
                  {record.like}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('seller.product:list.SKU'),
      key: 'sku',
      render: (_: unknown, record: IProduct) => (
        <>
          {record.products.map((item: IProductItem) => (
            <Text key={`sku-${item.id}`} className={styles.tableText}>
              {item.sku || '-'}
            </Text>
          ))}
        </>
      )
    },
    {
      title: t('seller.product:list.productSelection'),
      key: 'option',
      render: (_: unknown, record: IProduct) => (
        <>
          {record.products.map((item: IProductItem) => {
            let optionTitle: string = ''

            if (item.option1) {
              optionTitle += item.option1
            }

            if (item.option2) {
              optionTitle += `, ${item.option2}`
            }

            return (
              <Text key={`option-${item.id}`} className={styles.tableText}>
                {optionTitle || '-'}
              </Text>
            )
          })}
        </>
      )
    },
    {
      title: t('seller.product:list.price'),
      key: 'price',
      align: 'right',
      sorter: (a: IProduct, b: IProduct) => a.products[0].price - b.products[0].price,
      render: (_: unknown, record: IProduct) => (
        <>
          {record.products.map((item: IProductItem) => (
            <Text key={`price-${item.id}`} className={styles.tableText}>
              ฿{HelperDecimalFormatUtil(item.price, 2)}
            </Text>
          ))}
        </>
      )
    },
    {
      title: t('seller.product:list.warehouse'),
      key: 'stock',
      align: 'right',
      sorter: (a: IProduct, b: IProduct) => a.products[0].stock - b.products[0].stock,
      render: (_: unknown, record: IProduct) => (
        <>
          {record.products.map((item: IProductItem) => (
            <Text key={`stock-${item.id}`} className={styles.tableText}>
              {item.stock}
            </Text>
          ))}
        </>
      )
    },
    {
      title: t('seller.product:list.sales'),
      key: 'amountSold',
      align: 'right',
      sorter: (a: IProduct, b: IProduct) => a.products[0].amountSold - b.products[0].amountSold,
      render: (_: unknown, record: IProduct) => (
        <>
          {record.products.map((item: IProductItem) => (
            <Text key={`stock-${item.id}`} className={styles.tableText}>
              ฿{HelperDecimalFormatUtil(item.amountSold)}
            </Text>
          ))}
        </>
      )
    },
    {
      title: t('seller.product:list.operation'),
      key: 'action',
      render: (text: string, record: IProduct) => (
        <Space size="middle" className={styles.textSecondary}>
          <Text className={styles.link} onClick={(): Promise<void> => onChangeStatus(record)}>
            {record.status !== ProductStatusEnum.HIDDEN ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </Text>
          <Link href={`/seller/settings/product/${record.id}`}>
            <a className={styles.link}>
              <i className="fas fa-pen" />
            </a>
          </Link>
          <Text className={styles.link} onClick={(): void => onRemove(record)}>
            <i className="fas fa-trash-alt" />
          </Text>
        </Space>
      )
    }
  ]

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  async function onChangeStatus(product: IProduct): Promise<void> {
    try {
      setIsLoading(true)

      await ShopService.toggleProductStatus(product.id)
      props.fetch()

      message.success(t('common:apiMessage.success'))
    } catch (error) {
      message.error(t('common:apiMessage.error'))
    } finally {
      setIsLoading(false)
    }
  }

  function onRemove(product: IProduct): void {
    setProductSelected(product)
    setIsOpen(true)
  }

  async function onConfirmRemove(): Promise<void> {
    try {
      setIsLoading(true)

      await ShopService.deleteProduct(productSelected.id)
      props.fetch()

      message.success(t('common:apiMessage.success'))
    } catch (error) {
      message.error(t('common:apiMessage.error'))
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Loading show={isLoading} />
      <ConfirmationModal
        isOpen={isOpen}
        toggle={toggle}
        type="error"
        title={t('seller.product:delete.title')}
        content={t('seller.product:delete.msgQuestion')}
        contentWarning={t('seller.product:delete.msgWarning')}
        contentImg={HelperGetImageUtil(productSelected?.imageIds[0], ImageSizeEnum.THUMBNAIL)}
        contentTextImg={productSelected?.name}
        onSubmit={onConfirmRemove}
      />
      <Table
        className={`${styles.table} hps-table hps-scroll`}
        columns={columns}
        dataSource={props.products.items}
        pagination={props.products.meta.totalItems > 10 ? { pageSize: 10 } : false}
      />
    </>
  )
}

export default ProductList
