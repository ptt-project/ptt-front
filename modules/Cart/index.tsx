/* eslint-disable @typescript-eslint/typedef */
import React, { useState, FC, useMemo, useEffect, useCallback } from 'react'
import Helmet from 'react-helmet'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '~/components/main/Loading'
import CartList from './CartList'
import SelectHappyVoucher from './SelectHappyVoucher'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Form, Checkbox } from 'antd'
import {
  flatMap,
  identity,
  keyBy,
  keys,
  map,
  pickBy,
  random,
  round,
  times,
  transform
} from 'lodash'
import { DeepPartial } from 'redux'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { HelperDecimalFormatUtil } from '~/utils/main'
import { ICartProduct, IShop } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import Image from '../../components/main/Image'

const { Title } = Typography

interface ICartSummary {
  sumDiscount: number
  sumTotalPrice: number
  totalProductAmount: number
  totalProductSelected: number
  totalProduct: number
}

export interface ICartFormValues {
  products: Record<string, ICartProduct>
  productsSelected: Record<string, ICartProduct>
  productsExpired: Record<string, ICartProduct>
  selectedRowKeys: number[]
  checkedAll: boolean
}

const Cart: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])

  const [isLoading] = useState<boolean>(false)
  const [form] = Form.useForm<ICartFormValues>()

  const productsInForm = Form.useWatch('products', form)
  const productsSelected = Form.useWatch('productsSelected', form)
  const selectedRowKeys = Form.useWatch('selectedRowKeys', form)
  const checkedAll = Form.useWatch('checkedAll', form)

  const onlyProducts = useMemo(
    () =>
      transform<ICartProduct, Record<string, ICartProduct>>(
        productsInForm,
        (acc, cur) => {
          if (cur?.id) {
            acc[cur.id] = cur
          }
          return acc
        },
        {}
      ),
    [productsInForm, productsSelected]
  )

  const onlyProductsSelected = useMemo(
    () =>
      transform<ICartProduct, Record<string, ICartProduct>>(
        onlyProducts,
        (acc, cur) => {
          if (cur?.id && productsSelected?.[cur.id]) {
            acc[cur.id] = cur
          }
          return acc
        },
        {}
      ),
    [onlyProducts, productsSelected]
  )

  const products: Record<string, DeepPartial<ICartProduct>> = useMemo(() => {
    const shops: Record<number, DeepPartial<IShop>> = {}
    while (Object.keys(shops).length < 3) {
      const shopId: string = round(random(1, 1000) + (random(1, 1000) + 1)).toString()
      const shopData = {
        id: shopId,
        shopName: `shop-${shopId}`
      }
      shops[shopId] = shopData
    }
    const flatProducts = flatMap(
      map(Object.entries(shops), ([shopId, shop]): DeepPartial<IShop> => {
        const shopProducts: DeepPartial<ICartProduct>[] = times(random(2, 5)).map(
          (product: number): DeepPartial<ICartProduct> => {
            const productId: string = round(
              random(1, 1000) + (Number(shopId) + product + 1)
            ).toString()
            const stock = round(random(1, 9))
            return {
              id: productId,
              price: round(random(1, 15, true) * 1000) as any,
              stock,
              amount: random(1, stock),
              productProfile: {
                name: `product-${productId}`
              },
              option1: 'สีขาว กาวน้ำเงิน',
              shop
            }
          }
        )
        return { ...shop, products: shopProducts }
      }),
      (e) => e.products
    )
    return keyBy(flatProducts, 'id')
  }, [])

  const summaryCartSelected = useMemo(() => {
    const defaultSummaryCart: ICartSummary = {
      sumDiscount: 0,
      sumTotalPrice: 0,
      totalProductAmount: 0,
      totalProductSelected: keys(pickBy(onlyProductsSelected, identity)).length,
      totalProduct: keys(pickBy(onlyProducts, identity)).length
    }

    return transform(
      onlyProductsSelected,
      (result: ICartSummary, product) => {
        const tempResult = result
        tempResult.sumDiscount += 0
        tempResult.sumTotalPrice += Number(product.price) * Number(product.amount)
        tempResult.totalProductAmount += Number(product.amount)
        return result
      },
      defaultSummaryCart
    )
  }, [productsInForm, onlyProductsSelected, onlyProducts])

  const onSubmit = useCallback((values: ICartFormValues) => {
    console.log({ values })
  }, [])

  const initialValues = useMemo(() => {
    const temp: ICartFormValues = {
      products: products as ICartFormValues['products'],
      productsExpired: {},
      productsSelected: {},
      selectedRowKeys: [],
      checkedAll: false
    }
    return temp
  }, [products])

  const indeterminate = useMemo(
    () =>
      summaryCartSelected.totalProduct &&
      summaryCartSelected.totalProductSelected &&
      summaryCartSelected.totalProduct !== summaryCartSelected.totalProductSelected,
    [summaryCartSelected]
  )

  useEffect(() => {
    form.setFields([
      {
        name: 'products',
        value: products
      }
    ])
  }, [products])

  useEffect(() => {
    // console.log({
    //   productsInForm,
    //   productsSelected,
    //   onlyProducts,
    //   onlyProductSelected: onlyProductsSelected,
    //   selectedRowKeys
    // })
  }, [productsInForm, productsSelected, onlyProducts, onlyProductsSelected, selectedRowKeys])

  const onCheckAllChange = useCallback(
    (event: CheckboxChangeEvent) => {
      const checked = !!event.target.checked
      if (checked || indeterminate) {
        const newSelectedRowKeys: string[] = []
        const newProductsSelected = transform(
          onlyProducts,
          (acc, cur) => {
            if (cur?.id) {
              newSelectedRowKeys.push(cur.id)
              acc[cur.id] = cur
            }
            return acc
          },
          {}
        )

        form.setFieldValue('productsSelected', newProductsSelected)
        form.setFieldValue('selectedRowKeys', newSelectedRowKeys)
        form.setFieldValue('checkedAll', true)
      } else {
        form.setFieldValue('productsSelected', {})
        form.setFieldValue('selectedRowKeys', [])
        form.setFieldValue('checkedAll', false)
      }
    },
    [form, onlyProducts, indeterminate]
  )

  useEffect(() => {
    if (
      summaryCartSelected.totalProduct &&
      summaryCartSelected.totalProductSelected &&
      summaryCartSelected.totalProduct === summaryCartSelected.totalProductSelected
    ) {
      const newSelectedRowKeys: string[] = []
      const newProductsSelected = transform(
        onlyProducts,
        (acc, cur) => {
          if (cur?.id) {
            newSelectedRowKeys.push(cur.id)
            acc[cur.id] = cur
          }
          return acc
        },
        {}
      )

      form.setFieldValue('productsSelected', newProductsSelected)
      form.setFieldValue('selectedRowKeys', newSelectedRowKeys)
      form.setFieldValue('checkedAll', true)
    } else if (summaryCartSelected.totalProduct && !summaryCartSelected.totalProductSelected) {
      form.setFieldValue('productsSelected', {})
      form.setFieldValue('selectedRowKeys', [])
      form.setFieldValue('checkedAll', false)
    }
  }, [form, onlyProducts, summaryCartSelected])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('auth.login:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.login:title') }]} />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <Image src="./images/main/buyer/login.png" alt="login" ratio={2 / 3} />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('รายการสินค้ารอชำระเงิน')}
              </Title>
              <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
                <Form.Item name="productsSelected" hidden />
                <Form.Item name="productsExpired" hidden />
                <Form.Item name="selectedRowKeys" hidden />
                <Form.Item name="products" shouldUpdate>
                  <CartList form={form} selectedRowKeys={selectedRowKeys} />
                </Form.Item>

                <SelectHappyVoucher
                  onSelect={(): void => {
                    //
                  }}
                />
                <Row className="mt-2" justify="space-between" align="middle">
                  <Col sm={8} xs={24}>
                    <Form.Item name="checkedAll" shouldUpdate noStyle>
                      <Checkbox
                        checked={checkedAll}
                        onChange={onCheckAllChange}
                        indeterminate={indeterminate}
                      >
                        <Typography.Text>
                          {t('เลือกทั้งหมด ({{totalSelected}})', {
                            totalSelected: summaryCartSelected.totalProductSelected
                          })}
                        </Typography.Text>
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col sm={5} xs={24}>
                    <Typography.Text>
                      {t('รวม ({{totalProductAmount}} สินค้า)', {
                        totalProductAmount: HelperDecimalFormatUtil(
                          summaryCartSelected.totalProductAmount,
                          0
                        )
                      })}
                    </Typography.Text>
                  </Col>
                  <Col sm={5} xs={24}>
                    <Col>
                      <Typography.Text>
                        {HelperDecimalFormatUtil(summaryCartSelected.sumTotalPrice, 2, 'th-TH', {
                          style: 'currency',
                          currency: 'THB'
                        })}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text>
                        {t('ประหยัด {{sumDiscount}}', {
                          sumDiscount: HelperDecimalFormatUtil(
                            summaryCartSelected.sumDiscount,
                            2,
                            'th-TH',
                            {
                              style: 'currency',
                              currency: 'THB'
                            }
                          )
                        })}
                      </Typography.Text>
                    </Col>
                  </Col>
                  <Col sm={6}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!summaryCartSelected.totalProductSelected}
                      block
                    >
                      {t('สั่งสินค้า')}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Cart
