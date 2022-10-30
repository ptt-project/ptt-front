import React, { FC, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '../../../../components/main/Loading'
import Info from './components/Info'
import Features from './components/Features'
import Sales from './components/Sales'
import Other from './components/Other'
import Delivery from './components/Delivery'
import styles from './ProductForm.module.scss'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isEmpty } from 'lodash'
import { Typography, Button, Row, Col, Form, message, UploadFile } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ICreateProductPayload } from '../../../../interfaces'
import { ImageService, ShopService } from '../../../../services'
import { ProductConditionEnum } from '../../../../enums'

const { Text } = Typography

interface IFormData {
  images: UploadFile[]
  videoLink?: string
  name: string
  detail: string
  platformCategoryId: string
  brandId?: string
  exp?: string // convert to number
  condition: ProductConditionEnum
  price?: string // convert to number
  stock?: string // convert to number
  sku?: string
  weight: string // convert to number
  width: string // convert to number
  length: string // convert to number
  height: string // convert to number
  isSendLated: number
  extraDay?: string // convert to number
  [key: string]: any
}

const ProductForm: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const router: NextRouter = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [productOptionLabelOne, setProductOptionLabelOne] = useState<string>('')
  const [productOptionLabelTwo, setProductOptionLabelTwo] = useState<string>('')
  const [productOptionValueOne, setProductOptionValueOne] = useState<string[]>([])
  const [productOptionValueTwo, setProductOptionValueTwo] = useState<string[]>([])

  async function onSubmit(values: IFormData): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const isMultipleOptions: boolean = !isEmpty(values.optionLabelOne)
      const payload: ICreateProductPayload = {
        imageIds: [],
        videoLink: values.videoLink,
        name: values.name,
        detail: values.detail,
        platformCategoryId: values.platformCategoryId,
        condition: values.condition,
        weight: parseInt(values.weight),
        width: parseInt(values.width),
        length: parseInt(values.length),
        height: parseInt(values.height),
        isSendLated: values.isSendLated === 1,
        isMultipleOptions,
        productOptions: [],
        products: []
      }

      if (!isMultipleOptions) {
        payload.exp = values.exp ? parseInt(values.exp) : undefined
        payload.price = values.price ? parseInt(values.price) : undefined
        payload.stock = values.stock ? parseInt(values.stock) : undefined
        payload.sku = values.sku
        payload.extraDay = values.extraDay ? parseInt(values.extraDay) : undefined
      } else if (!isEmpty(values.optionLabelTwo)) {
        payload.productOptions = [
          { name: productOptionLabelOne, options: productOptionValueOne },
          { name: productOptionLabelTwo, options: productOptionValueTwo }
        ]
        productOptionValueOne.forEach((valueOne: string) => {
          productOptionValueTwo.forEach((valueTwo: string, j: number) => {
            const priceKey: string = `price_${j + 1}`
            const skuKey: string = `sku_${j + 1}`
            const stockKey: string = `stock_${j + 1}`
            const price: number = parseInt(values[priceKey]) || 0
            const sku: string = values[skuKey] || ''
            const stock: number = parseInt(values[stockKey]) || 0
            payload.products.push({ option1: valueOne, option2: valueTwo, price, sku, stock })
          })
        })
      } else {
        payload.productOptions = [{ name: productOptionLabelOne, options: productOptionValueOne }]
        productOptionValueOne.forEach((value: string, index: number) => {
          const priceKey: string = `price_${index + 1}`
          const skuKey: string = `sku_${index + 1}`
          const stockKey: string = `stock_${index + 1}`
          const price: number = parseInt(values[priceKey]) || 0
          const sku: string = values[skuKey] || ''
          const stock: number = parseInt(values[stockKey]) || 0
          payload.products.push({ option1: value, option2: '', price, sku, stock })
        })
      }

      const uploadImages: { id: string }[] = await Promise.all(
        values.images.map(async (img: UploadFile) => {
          const formData: FormData = new FormData()
          formData.append('image', img.originFileObj)
          const { data }: IApiResponse = await ImageService.upload(formData)
          return data
        })
      )
      const imageIds: string[] = []
      uploadImages.forEach((data: { id: string }) => imageIds.push(data.id))
      payload.imageIds = imageIds

      await ShopService.createProduct(payload)

      isSuccess = true
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
      router.push('/seller/settings/product/list')
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.product:list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.product:list.product') },
          { title: t('seller.product:list.myProduct'), href: '/seller/settings/product/list' },
          { title: t('seller.product:form.addTitle'), href: '/seller/settings/product/add' }
        ]}
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Text>
                <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                  {t('seller.product:form.addTitle')}
                </h4>
              </Text>
              <Form
                layout="vertical"
                initialValues={{
                  platformCategoryId: '',
                  brandId: '',
                  condition: ProductConditionEnum.NEW,
                  isSendLated: 0
                }}
                form={form}
                name="productForm"
                onFinish={onSubmit}
              >
                <Info form={form} />
                <Features form={form} />
                <Sales
                  form={form}
                  productOptionLabelOne={productOptionLabelOne}
                  productOptionLabelTwo={productOptionLabelTwo}
                  productOptionValueOne={productOptionValueOne}
                  productOptionValueTwo={productOptionValueTwo}
                  setProductOptionLabelOne={setProductOptionLabelOne}
                  setProductOptionLabelTwo={setProductOptionLabelTwo}
                  setProductOptionValueOne={setProductOptionValueOne}
                  setProductOptionValueTwo={setProductOptionValueTwo}
                />
                <Delivery form={form} />
                <Other form={form} />
                <Row gutter={[16, 8]} className="mt-3">
                  <Col md={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
                    <Button type="text" block>
                      {t('common:cancel')}
                    </Button>
                  </Col>
                  <Col md={{ span: 8, order: 2 }} xs={{ span: 12, order: 3 }}>
                    <Button type="text" block>
                      {t('seller.product:form.saveHide')}
                    </Button>
                  </Col>
                  <Col md={{ span: 8, order: 3 }} xs={{ span: 24, order: 1 }}>
                    <Button htmlType="submit" type="primary" block>
                      {t('seller.product:form.savePublish')}
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

export default ProductForm
