import React, { FC, Fragment, useState, useEffect, ChangeEvent } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from '../ProductForm.module.scss'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { Typography, Switch, Col, Form, Input, Row, Button, Table, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FormInstance } from 'antd/es/form/Form'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IProductInfo } from '../../../../../interfaces'

const { Text } = Typography

interface ISalesProps {
  form: FormInstance
  productInfo?: IProductInfo
  productOptionLabelOne: string
  productOptionLabelTwo: string
  productOptionValueOne: string[]
  productOptionValueTwo: string[]
  setProductOptionLabelOne: (value: string) => void
  setProductOptionLabelTwo: (value: string) => void
  setProductOptionValueOne: (values: string[]) => void
  setProductOptionValueTwo: (values: string[]) => void
}

interface ITempProductDetail {
  option1: string
  option2?: string
  price?: string
  stock?: string
  sku?: string
}

enum EChoice {
  ONE = 'choice1',
  TWO = 'choice2'
}

enum EOptionLabel {
  ONE = 'optionLabelOne',
  TWO = 'optionLabelTwo'
}

enum EOptionValue {
  ONE = 'optionValueOne',
  TWO = 'optionValueTwo'
}

const Sales: FC<ISalesProps> = (props: ISalesProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [isOpenOptions, setIsOpenOptions] = useState<boolean>(getDefaultOpenOptions(1))
  const [isOpenOptionTwo, setIsOpenOptionTwo] = useState<boolean>(getDefaultOpenOptions(2))
  const [productListOne, setProductListOne] = useState<string[]>(getDefaultProductList(1))
  const [productListTwo, setProductListTwo] = useState<string[]>(getDefaultProductList(2))
  const [dataSource, setDataSource] = useState<ITempProductDetail[]>([])
  const [productOptionElementNameTwo, setProductOptionElementNameTwo] = useState<string[]>(
    getDefaultProductList(2)
  )

  const columns: ColumnsType<ITempProductDetail> = [
    {
      title:
        props.productOptionLabelOne ||
        `${t('seller.product:form.sales.optionsForm.productOptions')} 1`,
      dataIndex: 'option1',
      key: 'option1'
    },
    {
      title:
        props.productOptionLabelTwo ||
        `${t('seller.product:form.sales.optionsForm.productOptions')} 2`,
      dataIndex: 'option2',
      key: 'option2'
    },
    {
      title: t('seller.product:form.sales.priceBaht'),
      dataIndex: 'price',
      key: 'price',
      render: (text: string, record: ITempProductDetail, index: number): JSX.Element => {
        const name: string = `price_${index + 1}`
        return (
          <Form.Item
            key={name}
            name={name}
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.sales.price')}`
              }
            ]}
          >
            <Input onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, name)} />
          </Form.Item>
        )
      }
    },
    {
      title: t('seller.product:form.sales.sku'),
      dataIndex: 'sku',
      key: 'sku',
      render: (text: string, record: ITempProductDetail, index: number): JSX.Element => {
        const name: string = `sku_${index + 1}`
        return (
          <Form.Item key={name} name={name}>
            <Input />
          </Form.Item>
        )
      }
    },
    {
      title: t('seller.product:form.sales.warehouse'),
      dataIndex: 'stock',
      key: 'stock',
      render: (text: string, record: ITempProductDetail, index: number): JSX.Element => {
        const name: string = `stock_${index + 1}`
        return (
          <Form.Item
            key={name}
            name={name}
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.sales.warehouse')}`
              }
            ]}
          >
            <Input onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, name)} />
          </Form.Item>
        )
      }
    }
  ]

  function getDefaultOpenOptions(mode: 1 | 2): boolean {
    if (mode === 1) {
      return props.productInfo?.productOptions.length > 0
    }

    return props.productInfo?.productOptions.length > 1
  }

  function getDefaultProductList(mode: 1 | 2): string[] {
    const optionValues: string[] = []

    let prefix: string = ''
    let index: number

    if (mode === 1) {
      prefix = EOptionValue.ONE

      if (props.productInfo?.productOptions[0]) {
        index = 0
      }
    } else {
      prefix = EOptionValue.TWO

      if (props.productInfo?.productOptions[1]) {
        index = 1
      }
    }

    if (index >= 0) {
      props.productInfo.productOptions[index].options.forEach((o: string, i: number) => {
        optionValues.push(`${prefix}_${i + 1}`)
      })
    } else {
      optionValues.push(`${prefix}_1`)
    }

    return optionValues
  }

  function toggleOptions(checked: boolean): void {
    setIsOpenOptions(checked)
  }

  function toggleOptionTwo(): void {
    setIsOpenOptionTwo(!isOpenOptionTwo)

    if (!isOpenOptionTwo === true) {
      setProductListTwo([`${EOptionValue.TWO}_1`])
    } else {
      props.form.setFieldValue(EOptionLabel.TWO, '')

      productOptionElementNameTwo.forEach((i: string) => {
        props.form.setFieldValue(i, '')
      })

      props.setProductOptionLabelTwo('')
      props.setProductOptionValueTwo([])
    }
  }

  function handleProductAdd(type: string): void {
    if (type === EChoice.ONE) {
      const tmpList: string[] = [...productListOne]

      tmpList.push(`optionValueOne_${productListOne.length + 1}`)
      setProductListOne(tmpList)
    } else {
      const tmpList: string[] = [...productListTwo]

      tmpList.push(`optionValueTwo_${productListTwo.length + 1}`)
      setProductListTwo(tmpList)
    }
  }

  function handleProductRemove(
    type: EChoice,
    name: string,
    list: string[],
    index: number,
    mode: 1 | 2
  ): void {
    props.form.setFieldValue(name, '')
    onChangeProductDetailOptionValue('', mode, index)

    const tmpList: string[] = [...list]
    tmpList.splice(index, 1)

    if (type === EChoice.ONE) {
      setProductListOne(tmpList)
    } else {
      setProductListTwo(tmpList)
    }
  }

  function onChangeProductDetailOptionLabel(e: ChangeEvent<HTMLInputElement>, mode: 1 | 2): void {
    if (mode === 1) {
      props.setProductOptionLabelOne(e.target.value)
    } else {
      props.setProductOptionLabelTwo(e.target.value)
    }
  }

  function onChangeProductDetailOptionValue(value: string, mode: 1 | 2, index: number): void {
    let option: string[]
    let optionElementName: string[]

    if (mode === 1) {
      option = [...props.productOptionValueOne]
      option[index] = value
      props.setProductOptionValueOne(option.filter((i: string) => !isEmpty(i)))
    } else {
      option = [...props.productOptionValueTwo]
      option[index] = value
      props.setProductOptionValueTwo(option.filter((i: string) => !isEmpty(i)))

      optionElementName = [...productOptionElementNameTwo]
      optionElementName.push(`${EOptionValue.TWO}_${index + 1}`)
      setProductOptionElementNameTwo(
        optionElementName.filter((item: string, i: number) => optionElementName.indexOf(item) === i)
      )
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>, name: string): void {
    if (!e.target.value || RegExpConst.MATCH_NUMBER.test(e.target.value)) {
      props.form.setFieldValue(name, e.target.value)
    } else {
      props.form.setFieldValue(name, e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
  }

  function initTableDataSource(): void {
    const data: ITempProductDetail[] = []

    if (props.productOptionLabelOne && props.productOptionValueOne.length) {
      props.productOptionValueOne.forEach((i: string) => {
        if (props.productOptionLabelTwo && props.productOptionValueTwo.length) {
          props.productOptionValueTwo.forEach((j: string) => {
            data.push({
              option1: i,
              option2: j
            })
          })
        } else {
          data.push({
            option1: i
          })
        }
      })
    }

    setDataSource(data)
  }

  useEffect(() => {
    initTableDataSource()
  }, [
    props.productOptionLabelOne,
    props.productOptionLabelTwo,
    props.productOptionValueOne,
    props.productOptionValueTwo
  ])

  function rederFormProductOptions(mode: 1 | 2): JSX.Element {
    if (mode === 2 && !isOpenOptionTwo) {
      return null
    }

    let items: string[]
    let optionLabelName: EOptionLabel
    let choiceName: EChoice
    const canAddOption: boolean = productListOne.length + productListTwo.length < 50

    if (mode === 1) {
      items = productListOne
      optionLabelName = EOptionLabel.ONE
      choiceName = EChoice.ONE
    } else {
      items = productListTwo
      optionLabelName = EOptionLabel.TWO
      choiceName = EChoice.TWO
    }

    return (
      <Row className={styles.highlight}>
        {mode === 1 ? (
          <Col span={24}>
            <Text strong>{t('seller.product:form.sales.optionsForm.productOptions')} 1</Text>
          </Col>
        ) : (
          <Col span={24}>
            <div className={styles.optionLabelBox}>
              <Text strong className={styles.optionLabel}>
                {t('seller.product:form.sales.optionsForm.productOptions')} 2
              </Text>
              <Text className={styles.optionBin} onClick={toggleOptionTwo}>
                <i className="fas fa-trash-alt" />
              </Text>
            </div>
          </Col>
        )}
        <Col span={24}>
          <Form.Item
            className="mt-3"
            label={t('seller.product:form.sales.optionsForm.name')}
            name={optionLabelName}
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t(
                  'seller.product:form.sales.optionsForm.name'
                )}`
              }
            ]}
          >
            <Input
              showCount
              maxLength={20}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                onChangeProductDetailOptionLabel(e, mode)
              }
            />
          </Form.Item>
        </Col>
        {items.map((item: string, index: number) => {
          const canRemove: boolean = items.length - index === 1

          if (index === 0) {
            return (
              <Col span={24} key={`form-${mode}-${index}`}>
                <Form.Item
                  label={t('seller.product:form.sales.optionsForm.choice')}
                  name={item}
                  rules={[
                    {
                      required: true,
                      message: `${t('common:form.required')} ${t(
                        'seller.product:form.sales.optionsForm.choice'
                      )}`
                    }
                  ]}
                >
                  <Input
                    showCount
                    maxLength={20}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      onChangeProductDetailOptionValue(e.target.value, mode, index)
                    }
                  />
                </Form.Item>
              </Col>
            )
          }
          return (
            <Fragment key={`form-${mode}-${index}`}>
              <Col span={22}>
                <Form.Item label={t('seller.product:form.sales.optionsForm.choice')} name={item}>
                  <Input
                    showCount
                    maxLength={20}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      onChangeProductDetailOptionValue(e.target.value, mode, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col className={styles.binWrapper} span={2}>
                <Text
                  className={canRemove ? styles.bin : styles.disabledBin}
                  onClick={(): void => {
                    if (canRemove) {
                      handleProductRemove(choiceName, item, items, index, mode)
                    }
                  }}
                >
                  <i className="fas fa-trash-alt" />
                </Text>
              </Col>
            </Fragment>
          )
        })}
        <Col span={24}>
          {canAddOption && (
            <Button
              className="hps-btn-secondary mt-5"
              onClick={(): void => handleProductAdd(choiceName)}
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

  return (
    <>
      <HighlightLabel title={t('seller.product:form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Space className="mt-1 mb-3" align="center">
            <Switch
              className="hps-switch"
              defaultChecked={isOpenOptions}
              onChange={toggleOptions}
            />
            <Text>{t('seller.product:form.sales.useOptions')}</Text>
          </Space>
        </Col>
        {!isOpenOptions ? (
          <>
            <Col md={12} xs={24}>
              <Form.Item
                label={t('seller.product:form.sales.price')}
                name="price"
                rules={[
                  {
                    required: true,
                    message: `${t('common:form.required')} ${t('seller.product:form.sales.price')}`
                  }
                ]}
              >
                <Input
                  suffix={<Text type="secondary">{t('seller.product:form.sales.baht')}</Text>}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label={t('seller.product:form.sales.warehouse')}
                name="stock"
                rules={[
                  {
                    required: true,
                    message: `${t('common:form.required')} ${t(
                      'seller.product:form.sales.warehouse'
                    )}`
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label={
                  <Space>
                    <Text>{t('seller.product:form.sales.sku')}</Text>
                    <Text className="hps-text-small" type="secondary">
                      {t('seller.product:form.sales.msgSku')}
                    </Text>
                  </Space>
                }
                name="sku"
              >
                <Input showCount maxLength={20} />
              </Form.Item>
            </Col>
          </>
        ) : null}
        {isOpenOptions && (
          <>
            <Col span={24}>{rederFormProductOptions(1)}</Col>
            <Col span={24}>{rederFormProductOptions(2)}</Col>
            {!isOpenOptionTwo && (
              <Col span={24}>
                <Button className="hps-btn-secondary mb-3" onClick={toggleOptionTwo} block>
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
      {isOpenOptions && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className={`${styles.table} hps-table hps-scroll`}
        />
      )}
    </>
  )
}

export default Sales
