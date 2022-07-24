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

  const onChangeUseOptions = (checked: boolean) => {
    setIsCheckUseOptions(checked)
  }
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

  function onClickButtonAddOption(): void {
    setIsFormProductOptions(true)
  }
  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col md={24}>
          <Switch onChange={onChangeUseOptions} />
          <Text className="ml-2 mt-1">{t('sellerProducts.form.sales.useOptions')}</Text>
        </Col>
        {!isCheckUseOptions && (
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
                <Input
                  suffix={<Text type="secondary">{t('sellerProducts.form.sales.baht')}</Text>}
                />
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
        )}
        {isCheckUseOptions && (
          <>
            <Row gutter={[16, 8]} className={styles.highlight}>
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
              <Col md={{ span: 22, offset: 1 }}>
                <Button className="hps-btn-secondary" block>
                  <i className="fas fa-plus mr-2" />
                  {t('sellerProducts.form.sales.optionsForm.addOption')}
                </Button>
              </Col>
            </Row>
            {isFormProductOptions && (
              <Row gutter={[16, 8]} className={styles.highlight}>
                <Col md={{ span: 22, offset: 1 }}>
                  <Text>{t('sellerProducts.form.sales.optionsForm.productOptions')} 2</Text>
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
                <Col md={{ span: 22, offset: 1 }}>
                  <Button className="hps-btn-secondary" block>
                    <i className="fas fa-plus mr-2" />
                    {t('sellerProducts.form.sales.optionsForm.addOption')}
                  </Button>
                </Col>
              </Row>
            )}
            <Row gutter={[16, 8]}>
              {!isFormProductOptions && (
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
              <Col md={26}>
                <Table columns={columns} dataSource={data} className="hps-table hps-scroll" />
              </Col>
            </Row>
          </>
        )}
      </Row>
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
