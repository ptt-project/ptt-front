/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import React, { FC, useMemo, ReactNode, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { Col, Form, FormInstance, Grid, Image, message, Modal, Row, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { DeepPartial } from 'redux'
import { map, orderBy, pickBy, random, transform } from 'lodash'
import { TableRowSelection } from 'antd/lib/table/interface'
import { CloseCircleOutlined } from '@ant-design/icons'
import { ICartProduct, ICartProductItem, IShop } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import styles from './CartList.module.scss'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import InputCounter from './InputCounter'
import CartProductDetail from './CartProductDetail'
import { HelperDecimalFormatUtil } from '~/utils/main'
import CartProductDetailMobile from './CartProductDetailMobile'
import CartProductTotalPrice from './CartProductTotalPrice'
import { ICartFormValues } from '..'

const { Text } = Typography

const shouldCellUpdate = (record: ICartProduct, prevRecord: ICartProduct) => {
  const isAmountChange = record?.amount !== prevRecord?.amount
  const isIdChange = record?.id !== prevRecord?.id
  return isAmountChange || isIdChange
}

interface ICartListProps {
  form: FormInstance<ICartFormValues>
  value?: Record<string, DeepPartial<ICartProduct>>
  selectedRowKeys: number[]
}
const CartList: FC<ICartListProps> = (props: ICartListProps) => {
  const { value: data, form: parentForm, selectedRowKeys } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])
  const [form] = Form.useForm(parentForm)
  const products = Form.useWatch('products', form)
  const screens = Grid.useBreakpoint()

  const dataSource = useMemo(() => {
    const shopHash = transform(
      data,
      (acc: Record<string, IShop>, cur: ICartProduct) => {
        const shopId = cur?.shop?.id
        if (shopId) acc[shopId] = cur.shop
        return acc
      },
      {}
    )

    const groupByShop = transform(
      data,
      (acc: Record<string, ICartProduct[]>, cur: ICartProduct) => {
        const shopId = cur?.shop?.id
        if (shopId) {
          const temp = acc[shopId] || []
          temp.push(cur)
          acc[shopId] = temp
        }
        return acc
      },
      {}
    )
    const shopWithProduct = Object.entries(groupByShop).map(([k, v]) => {
      const shop = shopHash[k]
      return {
        ...shop,
        products: v
      }
    })

    return orderBy(
      shopWithProduct.map((d) => ({
        name: d.shopName,
        isShop: true,
        ...d,
        products: map(d.products || [], (product) => ({
          name: product?.productProfile?.name,
          isProduct: true,
          amount: random(1, 16),
          ...product
        }))
      })),
      ['id'],
      ['desc']
    )
  }, [data])

  const onDeleteClick = useCallback(
    (product: ICartProduct) => {
      const { id: productId, amount, productProfile } = product

      Modal.confirm({
        type: 'error',
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        title: t('คุณแน่ใจว่าต้องการลบหรือไม่'),
        content: productProfile.name,
        centered: true,
        okText: t('ลบ'),
        onOk: () => {
          const newProducts = pickBy(products, (e, key) => Number(key) !== productId)
          form.setFieldsValue({ products: newProducts })
          form.setFieldValue(['products', productId], null)
          message.success(t('Success'))
        },
        cancelText: t('ยกเลิก'),
        onCancel: () => {
          if (amount === 0) {
            form.setFieldValue(['products', productId, 'amount'], 1)
          }
        },
        open: true
      })
    },
    [form, products]
  )

  const onAmountChange = useCallback(
    (product: ICartProduct) => (amount: number) => {
      const { id: productId, stock } = product

      if (amount > stock) {
        Modal.error({
          title: t('ขออภัย'),
          content: t('คุณสามารถซื้อได้สูงสุด {{stock}} ชิ้นเท่านั้น', {
            stock
          }),
          centered: true,
          okText: t('ตกลง'),
          onOk: () => {
            form.setFieldValue(['products', productId, 'amount'], stock)
          }
        })
      }
    },
    [form]
  )

  const columns: ColumnsType<any> = useMemo(
    (): ColumnsType<any> => [
      {
        // for mobile
        dataIndex: 'name',
        key: 'name',
        className: styles.cartProductDetailMobile,
        sorter: false,
        showSorterTooltip: false,
        shouldCellUpdate,
        responsive: ['xs'],
        render: (value: string, record: ICartProduct): ReactNode => {
          const { isProduct, name, id: productId } = record
          return isProduct ? (
            <CartProductDetailMobile
              productId={productId}
              product={record}
              onAmountBlur={onAmountChange(record)}
              onDeleteClick={onDeleteClick.bind(null, record)}
            />
          ) : (
            <Row>
              <Col>
                <Text ellipsis>{name}</Text>
              </Col>
            </Row>
          )
        }
      },
      {
        title: t('รายละเอียดสินค้า'),
        dataIndex: 'name',
        key: 'name',
        className: styles.name,
        align: 'left',
        sorter: false,
        showSorterTooltip: false,
        shouldCellUpdate,
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        render: (value: string, record: ICartProduct): ReactNode => {
          const { isProduct, name } = record
          return isProduct ? (
            <CartProductDetail product={record} />
          ) : (
            <Row wrap={false}>
              <Col>
                <Text ellipsis>{name}</Text>
              </Col>
            </Row>
          )
        }
      },
      {
        title: t('ราคาต่อชิ้น'),
        dataIndex: 'price',
        key: 'price',
        className: 'price',
        align: 'right',
        sorter: false,
        showSorterTooltip: false,
        shouldCellUpdate,
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        render: (value: string, record: ICartProduct): ReactNode => {
          const { isProduct, id: productId } = record
          return isProduct ? (
            <Row>
              <Col span={24}>
                <Form.Item name={['products', productId, 'price']} shouldUpdate>
                  <InputNumberFormat displayType="text" thousandSeparator />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name={['products', productId, 'discount']} shouldUpdate noStyle>
                  <InputNumberFormat displayType="text" thousandSeparator />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <div />
          )
        }
      },
      {
        title: t('จำนวน'),
        dataIndex: 'amount',
        key: 'amount',
        className: 'amount',
        sorter: false,
        width: 146,
        align: 'left',
        showSorterTooltip: false,
        shouldCellUpdate,
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        render: (value: string, record: ICartProduct): ReactNode => {
          const { isProduct, stock = 0, id: productId } = record
          return isProduct ? (
            <Row gutter={[0, 4]}>
              <Col span={24}>
                <Form.Item name={['products', productId, 'amount']} shouldUpdate noStyle>
                  <InputCounter
                    min={0}
                    max={stock}
                    onBlur={onAmountChange(record)}
                    onValueToZero={onDeleteClick.bind(null, record)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row justify="end">
                  <Text>
                    {t('เหลือ {{stock}} ชิ้น', { stock: HelperDecimalFormatUtil(stock, 0) })}
                  </Text>
                </Row>
              </Col>
            </Row>
          ) : (
            <div />
          )
        }
      },
      {
        title: t('ราคารวม'),
        dataIndex: 'total',
        key: 'total',
        className: 'total',
        sorter: false,
        align: 'left',
        showSorterTooltip: false,
        shouldCellUpdate,
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        render: (value: string, record: ICartProduct): ReactNode => {
          const { isProduct, id: productId } = record
          return isProduct ? (
            <Form.Item name={['products', productId, 'amount']} shouldUpdate>
              <CartProductTotalPrice productId={productId} />
            </Form.Item>
          ) : (
            <div />
          )
        }
      },
      {
        title: t('ดำเนินการ'),
        dataIndex: 'action',
        key: 'action',
        className: styles.action,
        sorter: false,
        align: 'right',
        showSorterTooltip: false,
        shouldCellUpdate,
        width: 100,
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        render: (value: string, record: ICartProduct) => {
          const { isProduct, id: productId } = record
          return (
            <Row align="top">
              <Col span={24}>
                <Form.Item name={['products', productId, 'id']} hidden />
                {isProduct && (
                  <Image
                    className={styles.iconDelete}
                    preview={false}
                    src="./images/main/buyer/icon-delete-blue.svg"
                    onClick={onDeleteClick.bind(null, record)}
                  />
                )}
              </Col>
            </Row>
          )
        }
      }
    ],
    [t, onAmountChange, onDeleteClick]
  )

  const onSelected = useCallback((selectedRows: ICartProductItem[]) => {
    const newSelectedRowKeys: number[] = []
    const productsSelected = transform(
      selectedRows || [],
      (acc, cur) => {
        if (cur?.id && cur?.isProduct) {
          newSelectedRowKeys.push(cur.id)
          acc[cur.id] = cur
        }
        return acc
      },
      {}
    )

    form.setFieldValue('productsSelected', productsSelected)
    form.setFieldValue('selectedRowKeys', newSelectedRowKeys)
  }, [])

  const rowSelection: TableRowSelection<ICartProductItem> = useMemo(
    () => ({
      onChange: (_, selectedRows: ICartProductItem[]) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        onSelected(selectedRows)
      },
      onSelect: (record: ICartProductItem, selected: boolean, selectedRows: ICartProductItem[]) => {
        // console.log(record, selected, selectedRows)
        onSelected(selectedRows)
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: ICartProductItem[]
        // changeRows: ICartProductItem[]
      ) => {
        // console.log(selected, selectedRows, changeRows)
        onSelected(selectedRows)
      },
      getCheckboxProps: (
        record: ICartProductItem
      ): ReturnType<TableRowSelection<IShop>['getCheckboxProps']> => ({
        name: record.id?.toString()
      })
    }),
    [onSelected]
  )

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
        selectedRowKeys,
        checkStrictly: false,
        hideSelectAll: !!screens?.xs
      }}
      onHeaderRow={() => ({ colSpan: 2 })}
      rowKey={(record: any): string => record.id}
      className={`${styles.table} hps-table hps-scroll`}
      columns={columns}
      dataSource={dataSource}
      indentSize={0}
      expandable={{
        childrenColumnName: 'products',
        expandedRowKeys: map(dataSource, 'id'),
        rowExpandable: (record) => !!record.shopName,
        defaultExpandAllRows: true,
        showExpandColumn: false
      }}
      pagination={false}
      scroll={{ x: 600 }}
    />
  )
}

CartList.defaultProps = {
  value: {}
}

export default CartList
