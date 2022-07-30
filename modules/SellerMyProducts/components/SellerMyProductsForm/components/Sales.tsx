import React, { useState } from 'react'
import { Typography, Switch, Col, Form, Input, Row, Button, Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input

interface DataType {
  key: React.Key
  productModel: string
  choice: string
  sku: string
  price: string
  warehouse: string
}
const data: DataType[] = []

interface IFormProductSalesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Sales: React.FC<IFormProductSalesProps> = (props: IFormProductSalesProps) => {
  const [isCheckUseOptions, setIsCheckUseOptions] = useState<boolean>(false)
  const [isFormProductOptions, setIsFormProductOptions] = useState<boolean>(false)
  const [countProductList, setCountProductList] = useState<number>(2)
  const [countProduct2List, setCountProduct2List] = useState<number>(2)
  const [productList, setProductList] = useState([{ product: '' }])
  const [product2List, setProduct2List] = useState([{ product2: '' }])
  const [isCheckButtonProductOptions, setIsCheckButtonProductOptions] = useState<boolean>(true)
  const [isCheckButtonProduct2Options, setIsCheckButtonProduct2Options] = useState<boolean>(true)
  const [isCheckButtonFormProductOptions, setIsCheckButtonFormProductOptions] =
    useState<boolean>(true)
  const [calProductOptions, setCalProductOptions] = useState<number>(0)
  const [calProduct2Options, setCalProduct2Options] = useState<number>(0)
  const productModel: string = t('sellerProducts.form.sales.productModel') // prevent error hook rules
  const choice: string = t('sellerProducts.form.sales.choice2') // prevent error hook rules
  const sku: string = t('sellerProducts.form.sales.sku') // prevent error hook rules
  const priceBaht: string = t('sellerProducts.form.sales.priceBaht') // prevent error hook rules
  const warehouse: string = t('sellerProducts.form.sales.warehouse') // prevent error hook rules
  const columns: ColumnsType<DataType> = [
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
  const onChangeUseOptions = (checked: boolean) => {
    setIsCheckUseOptions(checked)
  }
  const handleProductChange = (e, index) => {
    const { name, value } = e.target
    const list = [...productList]
    list[index][name] = value
    setProductList(list)
  }

  const handleProductRemove = (index: number, type: string, list) => {
    const tmpList = [...list]
    tmpList.splice(index, 1)
    if (type === 'choice1') {
      setProductList(tmpList)
      setCountProductList(countProductList - 1)
      const calLimitProduct2 = Math.floor(50 / countProductList)
      setCalProduct2Options(calLimitProduct2)
      if (countProductList <= 50) {
        setIsCheckButtonProductOptions(true)
        setIsCheckButtonProduct2Options(true)
        setIsCheckButtonFormProductOptions(true)
      }
      if (countProductList <= calProductOptions) {
        setIsCheckButtonProductOptions(true)
      }
    } else {
      setProduct2List(tmpList)
      setCountProduct2List(countProduct2List - 1)
      const calLimitProduct = Math.floor(50 / countProduct2List)
      setCalProductOptions(calLimitProduct)
      if (countProduct2List <= calProduct2Options) {
        setIsCheckButtonProduct2Options(true)
        setIsCheckButtonProductOptions(true)
      }
    }
  }

  function handleProductAdd(type: string): void {
    if (type === 'choice1') {
      setProductList([...productList, { product: '' }])
      setCountProductList(countProductList + 1)
      const calLimitProduct2 = Math.floor(50 / countProductList)
      setCalProduct2Options(calLimitProduct2)
      if (countProductList === 50 && countProduct2List === 1) {
        setIsCheckButtonProductOptions(false)
        setIsCheckButtonProduct2Options(false)
        setIsCheckButtonFormProductOptions(false)
      }
      if (countProductList >= calProductOptions) {
        setIsCheckButtonProductOptions(false)
      }
    } else {
      setProduct2List([...product2List, { product2: '' }])
      setCountProduct2List(countProduct2List + 1)
      const calLimitProduct = Math.floor(50 / countProduct2List)
      setCalProductOptions(calLimitProduct)
      if (countProduct2List >= calProduct2Options) {
        setIsCheckButtonProduct2Options(false)
        setIsCheckButtonProductOptions(false)
      }
    }
  }

  function onClickButtonAddOption(): void {
    setIsFormProductOptions(true)
    setProduct2List([{ product2: '' }])
  }

  function renderFormSales(): JSX.Element {
    if (!isCheckUseOptions) {
      return (
        <>
          <Col md={12}>
            <Form.Item
              label={t('sellerProducts.form.sales.price')}
              name="price"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input suffix={<Text type="secondary">{t('sellerProducts.form.sales.baht')}</Text>} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label={t('sellerProducts.form.sales.warehouse')} name="warehouse">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              label={
                <Text>
                  {t('sellerProducts.form.sales.sku')}
                  <Text className="ml-1" type="secondary">
                    {t('sellerProducts.form.sales.msgSku')}
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
          <Text>{t('sellerProducts.form.sales.optionsForm.productOptions')} 1</Text>
        </Col>
        <Col md={{ span: 22, offset: 1 }}>
          <Form.Item
            label={t('sellerProducts.form.sales.optionsForm.name')}
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
        {productList.map((item, index) => {
          if (index === 0) {
            return (
              <Col md={{ span: 22, offset: 1 }}>
                <Form.Item
                  label={t('sellerProducts.form.sales.optionsForm.choice')}
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
              <Col key={index} md={{ span: 21, offset: 1 }}>
                <Form.Item
                  label={t('sellerProducts.form.sales.optionsForm.choice')}
                  name={`productChoice_${index}`}
                  id={`productChoice_${index}`}
                  onChange={(e) => handleProductChange(e, index)}
                >
                  <TextArea rows={1} showCount maxLength={20} />
                </Form.Item>
              </Col>
              <Col md={2} className="mt-7">
                <i
                  onClick={() => handleProductRemove(index, 'choice1', productList)}
                  className={`fas fa-trash-alt ${styles.textSecondary}`}
                />
              </Col>
            </>
          )
        })}

        <Col md={{ span: 22, offset: 1 }}>
          {isCheckButtonProductOptions && (
            <Button className="hps-btn-secondary" onClick={() => handleProductAdd('choice1')} block>
              <i className="fas fa-plus mr-2" />
              {t('sellerProducts.form.sales.optionsForm.addOption')}
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
            <Text>{t('sellerProducts.form.sales.optionsForm.productOptions')} 2</Text>
          </Col>
          <Col md={2}>
            <i
              onClick={() => setIsFormProductOptions(false)}
              className={`fas fa-trash-alt ${styles.textSecondary}`}
            />
          </Col>
          <Col md={{ span: 22, offset: 1 }}>
            <Form.Item
              label={t('sellerProducts.form.sales.optionsForm.name')}
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
          {product2List.map((item, index) => {
            if (index === 0) {
              return (
                <Col md={{ span: 22, offset: 1 }}>
                  <Form.Item
                    label={t('sellerProducts.form.sales.optionsForm.choice')}
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
                <Col key={index} md={{ span: 21, offset: 1 }}>
                  <Form.Item
                    label={t('sellerProducts.form.sales.optionsForm.choice')}
                    name={`product2Choice_${index}`}
                    id={`product2Choice_${index}`}
                    onChange={(e) => handleProductChange(e, index)}
                  >
                    <TextArea rows={1} showCount maxLength={20} />
                  </Form.Item>
                </Col>
                <Col md={1} className="mt-7">
                  <i
                    onClick={() => handleProductRemove(index, 'choice2', product2List)}
                    className={`fas fa-trash-alt ${styles.textSecondary}`}
                  />
                </Col>
              </>
            )
          })}
          {isCheckButtonProduct2Options && (
            <Col md={{ span: 22, offset: 1 }}>
              <Button
                className="hps-btn-secondary"
                onClick={() => handleProductAdd('choice2')}
                block
              >
                <i className="fas fa-plus mr-2" />
                {t('sellerProducts.form.sales.optionsForm.addOption')}
              </Button>
            </Col>
          )}
        </Row>
      )
    }
  }

  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col md={24}>
          <Switch onChange={onChangeUseOptions} />
          <Text className="ml-2 mt-1">{t('sellerProducts.form.sales.useOptions')}</Text>
        </Col>
        {renderFormSales()}
        {isCheckUseOptions && (
          <>
            {rederFormProductOptionsOne()}
            {rederFormProductOptionsTwo()}
            <Row gutter={[16, 8]}>
              {!isFormProductOptions && isCheckButtonFormProductOptions && (
                <Col md={24}>
                  <Button className="hps-btn-secondary" onClick={onClickButtonAddOption} block>
                    <i className="fas fa-plus mr-2" />
                    {t('sellerProducts.form.sales.optionsForm.addOptionChoice')}
                  </Button>
                </Col>
              )}
              <Col md={24}>
                <Text>{t('sellerProducts.form.sales.titleTable')}</Text>
              </Col>
            </Row>
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
