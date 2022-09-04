import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Switch, Col, Form, Input, Row, Button, Table, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../ProductForm.module.scss'

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

  const columns: ColumnsType<IDataType> = [
    {
      title: t('seller.product:form.sales.productModel'),
      dataIndex: 'productModel'
    },
    {
      title: t('seller.product:form.sales.choice2'),
      dataIndex: 'choice'
    },
    {
      title: t('seller.product:form.sales.sku'),
      dataIndex: 'sku'
    },
    {
      title: t('seller.product:form.sales.priceBaht'),
      dataIndex: 'price'
    },
    {
      title: t('seller.product:form.sales.warehouse'),
      dataIndex: 'warehouse'
    }
  ]

  function onChangeUseOptions(checked: boolean): void {
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
          <Col md={12} xs={24}>
            <Form.Item
              label={t('seller.product:form.sales.price')}
              name="price"
              rules={[{ required: true }]}
            >
              <Input suffix={<Text type="secondary">{t('seller.product:form.sales.baht')}</Text>} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t('seller.product:form.sales.warehouse')} name="warehouse">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
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
      <Row className={styles.highlight}>
        <Col span={24}>
          <Text strong>{t('seller.product:form.sales.optionsForm.productOptions')} 1</Text>
        </Col>
        <Col span={24}>
          <Form.Item
            className="mt-3"
            label={t('seller.product:form.sales.optionsForm.name')}
            name="saleName"
            rules={[{ required: true }]}
          >
            <TextArea rows={1} showCount maxLength={20} />
          </Form.Item>
        </Col>
        {productList.map((item: object, index: number) => {
          if (index === 0) {
            return (
              <Col span={24}>
                <Form.Item
                  label={t('seller.product:form.sales.optionsForm.choice')}
                  name="product"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={1} showCount maxLength={20} />
                </Form.Item>
              </Col>
            )
          }
          return (
            <>
              <Col span={22}>
                <Form.Item
                  label={t('seller.product:form.sales.optionsForm.choice')}
                  name={`productChoice_${index}`}
                  id={`productChoice_${index}`}
                >
                  <TextArea rows={1} showCount maxLength={20} />
                </Form.Item>
              </Col>
              <Col className={styles.binWrapper} span={2}>
                <Text
                  className={styles.bin}
                  onClick={(): void => handleProductRemove(index, 'choice1', productList)}
                >
                  <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
                </Text>
              </Col>
            </>
          )
        })}
        <Col span={24}>
          {isCheckButtonProductOptions && (
            <Button
              className="hps-btn-secondary mt-5"
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
        <Row className={styles.highlight}>
          <Col span={24}>
            <div className={styles.optionLabelBox}>
              <Text strong className={styles.optionLabel}>
                {t('seller.product:form.sales.optionsForm.productOptions')} 2
              </Text>
              <Text
                className={styles.optionBin}
                onClick={(): void => setIsFormProductOptions(false)}
              >
                <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
              </Text>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              className="mt-3"
              label={t('seller.product:form.sales.optionsForm.name')}
              name="saleName"
              rules={[{ required: true }]}
            >
              <TextArea rows={1} showCount maxLength={20} />
            </Form.Item>
          </Col>
          {product2List.map((item: object, index: number) => {
            if (index === 0) {
              return (
                <Col span={24}>
                  <Form.Item
                    label={t('seller.product:form.sales.optionsForm.choice')}
                    name="choice"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={1} showCount maxLength={20} />
                  </Form.Item>
                </Col>
              )
            }
            return (
              <>
                <Col span={22}>
                  <Form.Item
                    label={t('seller.product:form.sales.optionsForm.choice')}
                    name={`product2Choice_${index}`}
                    id={`product2Choice_${index}`}
                  >
                    <TextArea rows={1} showCount maxLength={20} />
                  </Form.Item>
                </Col>
                <Col className={styles.binWrapper} span={2}>
                  <Text
                    className={styles.bin}
                    onClick={(): void => handleProductRemove(index, 'choice2', product2List)}
                  >
                    <i className={`fas fa-trash-alt ${styles.textSecondary}`} />
                  </Text>
                </Col>
              </>
            )
          })}
          {isCheckButtonProduct2Options && (
            <Col span={24}>
              <Button
                className="hps-btn-secondary mt-5"
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
        <Col span={24}>
          <Space className="mt-1 mb-3" align="center">
            <Switch className="hps-switch" onChange={onChangeUseOptions} />
            <Text>{t('seller.product:form.sales.useOptions')}</Text>
          </Space>
        </Col>
        {renderFormSales()}
        {isCheckUseOptions && (
          <>
            <Col span={24}>{rederFormProductOptionsOne()}</Col>
            <Col span={24}>{rederFormProductOptionsTwo()}</Col>
            {!isFormProductOptions && (
              <Col span={24}>
                <Button className="hps-btn-secondary mb-3" onClick={onClickButtonAddOption} block>
                  <i className="fas fa-plus mr-2" />
                  {t('seller.product:form.sales.optionsForm.addOptionChoice')}
                </Button>
              </Col>
            )}
            <Col span={24}>
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
