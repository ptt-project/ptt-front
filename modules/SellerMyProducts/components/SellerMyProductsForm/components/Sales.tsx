import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Switch, Col, Form, Input, Row, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../SellerMyProductsForm.module.scss'

const { Text } = Typography
const { TextArea } = Input

interface IDataType {
  key: React.Key
  productModel: string
  choice: string
  sku: string
  price: string
  warehouse: string
}
const data: IDataType[] = []

interface IFormProductSalesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Sales: React.FC<IFormProductSalesProps> = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [isCheckUseOptions, setIsCheckUseOptions] = useState<boolean>(false)
  const [isFormProductOptions, setIsFormProductOptions] = useState<boolean>(false)
  const [countProductList, setCountProductList] = useState<number>(1)
  const [countProduct2List, setCountProduct2List] = useState<number>(1)
  const [productList, setProductList] = useState<object[]>([{ product: '' }])
  const [product2List, setProduct2List] = useState<object[]>([{ product2: '' }])
  const [isCheckButtonProductOptions, setIsCheckButtonProductOptions] = useState<boolean>(true)
  const [isCheckButtonProduct2Options, setIsCheckButtonProduct2Options] = useState<boolean>(true)
  const [calProductOptions, setCalProductOptions] = useState<number>(0)
  const [calProduct2Options, setCalProduct2Options] = useState<number>(0)
  const productModel: string = t('seller.product:form.sales.productModel') // prevent error hook rules
  const choice: string = t('seller.product:form.sales.choice2') // prevent error hook rules
  const sku: string = t('seller.product:form.sales.sku') // prevent error hook rules
  const priceBaht: string = t('seller.product:form.sales.priceBaht') // prevent error hook rules
  const warehouse: string = t('seller.product:form.sales.warehouse') // prevent error hook rules

  const columns: ColumnsType<IDataType> = [
    {
      title: productModel,
      dataIndex: 'productModel'
    },
    {
      title: choice,
      dataIndex: 'choice'
    },
    {
      title: sku,
      dataIndex: 'sku'
    },
    {
      title: priceBaht,
      dataIndex: 'price'
    },
    {
      title: warehouse,
      dataIndex: 'warehouse'
    }
  ]
  const onChangeUseOptions = (checked: boolean): void => {
    setIsCheckUseOptions(checked)
  }

  /* const handleProductChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const { name, value } = e.target
    const list: object[] = [...productList]
    list[index][name] = value
    setProductList(list)
  } */

  function handleProductRemove(index: number, type: string, list: object[]): void {
    const tmpList: object[] = [...list]
    tmpList.splice(index, 1)
    if (type === 'choice1') {
      setProductList(tmpList)
      const countAddButton: number = countProductList - 1
      setCountProductList(countAddButton)

      const calLimitProduct2: number = Math.floor(50 / countAddButton)
      setCalProduct2Options(calLimitProduct2)
      if (calProductOptions >= countAddButton) {
        setIsCheckButtonProductOptions(true)
      }
      if (calLimitProduct2 > countProduct2List) {
        setIsCheckButtonProduct2Options(true)
      }
    } else {
      setProduct2List(tmpList)
      const countAdd2Button: number = countProduct2List - 1
      setCountProduct2List(countAdd2Button)
      const calLimitProduct: number = Math.floor(50 / countAdd2Button)
      setCalProductOptions(calLimitProduct)
      if (calProduct2Options >= countAdd2Button) {
        setIsCheckButtonProduct2Options(true)
      }
      if (calLimitProduct > countProductList) {
        setIsCheckButtonProductOptions(true)
      }
    }
  }

  function handleProductAdd(type: string): void {
    if (type === 'choice1') {
      setProductList([...productList, { product: '' }])
      const countAddButton: number = countProductList + 1
      setCountProductList(countAddButton)
      const calLimitProduct2: number = Math.floor(50 / countAddButton)
      setCalProduct2Options(calLimitProduct2)
      if (
        (countAddButton === 50 && countProduct2List === 1) ||
        countAddButton === calProductOptions
      ) {
        setIsCheckButtonProductOptions(false)
        setIsCheckButtonProduct2Options(false)
      }
    } else {
      setProduct2List([...product2List, { product2: '' }])
      const countAdd2Button: number = countProduct2List + 1
      setCountProduct2List(countAdd2Button)
      const calLimitProduct: number = Math.floor(50 / countAdd2Button)
      setCalProductOptions(calLimitProduct)
      if (countAdd2Button === calProduct2Options) {
        setIsCheckButtonProduct2Options(false)
        setIsCheckButtonProductOptions(false)
      }
    }
  }

  function onClickButtonAddOption(): void {
    setIsFormProductOptions(true)
    setProduct2List([{ product2: '' }])
    setCountProduct2List(1)
  }

  function renderFormSales(): JSX.Element {
    if (!isCheckUseOptions) {
      return (
        <>
          <Col md={12}>
            <Form.Item
              label={t('seller.product:form.sales.price')}
              name="price"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input suffix={<Text type="secondary">{t('seller.product:form.sales.baht')}</Text>} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label={t('seller.product:form.sales.warehouse')} name="warehouse">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              label={
                <Text>
                  {t('seller.product:form.sales.sku')}
                  <Text className="ml-1" type="secondary">
                    {t('seller.product:form.sales.msgSku')}
                  </Text>
                </Text>
              }
              name="sku"
            >
              <TextArea rows={1} showCount maxLength={20} />
            </Form.Item>
          </Col>
        </>
      )
    }
    return null
  }

  function rederFormProductOptionsOne(): JSX.Element {
    return (
      <Row gutter={[8, 8]} className={styles.highlight}>
        <Col md={{ span: 22, offset: 1 }}>
          <Text>{t('seller.product:form.sales.optionsForm.productOptions')} 1</Text>
        </Col>
        <Col md={{ span: 22, offset: 1 }}>
          <Form.Item
            label={t('seller.product:form.sales.optionsForm.name')}
            name="saleName"
            rules={[
              {
                required: true
              }
            ]}
          >
            <TextArea rows={1} showCount maxLength={20} />
          </Form.Item>
        </Col>
        {productList.map((item: object, index: number) => {
          if (index === 0) {
            return (
              <Col md={{ span: 22, offset: 1 }}>
                <Form.Item
                  label={t('seller.product:form.sales.optionsForm.choice')}
                  name="product"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <TextArea rows={1} showCount maxLength={20} />
                </Form.Item>
              </Col>
            )
          }
          return (
            <>
              <Col md={{ span: 21, offset: 1 }}>
                <Form.Item
                  label={t('seller.product:form.sales.optionsForm.choice')}
                  name={`productChoice_${index}`}
                  id={`productChoice_${index}`}
                >
                  <TextArea rows={1} showCount maxLength={20} />
                </Form.Item>
              </Col>
              <Col md={2} className="mt-7">
                <Text onClick={(): void => handleProductRemove(index, 'choice1', productList)}>
                  <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
                </Text>
              </Col>
            </>
          )
        })}

        <Col md={{ span: 22, offset: 1 }}>
          {isCheckButtonProductOptions && (
            <Button
              className="hps-btn-secondary"
              onClick={(): void => handleProductAdd('choice1')}
              block
            >
              <i className="fas fa-plus mr-2" />
              {t('seller.product:form.sales.optionsForm.addOption')}
            </Button>
          )}
        </Col>
      </Row>
    )
  }

  function rederFormProductOptionsTwo(): JSX.Element {
    if (isFormProductOptions) {
      return (
        <Row gutter={[8, 8]} className={styles.highlight}>
          <Col md={{ span: 21, offset: 1 }}>
            <Text>{t('seller.product:form.sales.optionsForm.productOptions')} 2</Text>
          </Col>
          <Col md={2}>
            <Text onClick={(): void => setIsFormProductOptions(false)}>
              <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
            </Text>
          </Col>
          <Col md={{ span: 22, offset: 1 }}>
            <Form.Item
              label={t('seller.product:form.sales.optionsForm.name')}
              name="saleName"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <TextArea rows={1} showCount maxLength={20} />
            </Form.Item>
          </Col>
          {product2List.map((item: object, index: number) => {
            if (index === 0) {
              return (
                <Col md={{ span: 22, offset: 1 }}>
                  <Form.Item
                    label={t('seller.product:form.sales.optionsForm.choice')}
                    name="choice"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <TextArea rows={1} showCount maxLength={20} />
                  </Form.Item>
                </Col>
              )
            }
            return (
              <>
                <Col md={{ span: 21, offset: 1 }}>
                  <Form.Item
                    label={t('seller.product:form.sales.optionsForm.choice')}
                    name={`product2Choice_${index}`}
                    id={`product2Choice_${index}`}
                  >
                    <TextArea rows={1} showCount maxLength={20} />
                  </Form.Item>
                </Col>
                <Col md={1} className="mt-7">
                  <Text onClick={(): void => handleProductRemove(index, 'choice2', product2List)}>
                    <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
                  </Text>
                </Col>
              </>
            )
          })}
          {isCheckButtonProduct2Options && (
            <Col md={{ span: 22, offset: 1 }}>
              <Button
                className="hps-btn-secondary"
                onClick={(): void => handleProductAdd('choice2')}
                block
              >
                <i className="fas fa-plus mr-2" />
                {t('seller.product:form.sales.optionsForm.addOption')}
              </Button>
            </Col>
          )}
        </Row>
      )
    }
    return null
  }

  return (
    <>
      <HighlightLabel title={t('seller.product:form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col md={24}>
          <Switch onChange={onChangeUseOptions} />
          <Text className="ml-2 mt-1">{t('seller.product:form.sales.useOptions')}</Text>
        </Col>
        {renderFormSales()}
        {isCheckUseOptions && (
          <>
            {rederFormProductOptionsOne()}
            {rederFormProductOptionsTwo()}
            {!isFormProductOptions && (
              <Col md={24}>
                <Button className="hps-btn-secondary" onClick={onClickButtonAddOption} block>
                  <i className="fas fa-plus mr-2" />
                  {t('seller.product:form.sales.optionsForm.addOptionChoice')}
                </Button>
              </Col>
            )}
            <Col md={24}>
              <Text>{t('seller.product:form.sales.titleTable')}</Text>
            </Col>
          </>
        )}
      </Row>
      {isCheckUseOptions && (
        <Table columns={columns} dataSource={data} className="hps-table hps-scroll" />
      )}
    </>
  )
}

Sales.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Sales
