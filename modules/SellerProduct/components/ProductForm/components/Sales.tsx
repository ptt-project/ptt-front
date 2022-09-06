import React, { FC, Fragment, useState, useEffect, ChangeEvent } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { Typography, Switch, Col, Form, Input, Row, Button, Table, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FormInstance } from 'antd/es/form/Form'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import styles from '../ProductForm.module.scss'

const { Text } = Typography

interface ISalesProps {
  form: FormInstance
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
  const [isCheckedOption, setIsCheckedOption] = useState<boolean>(false)
  const [isActiveOptionTwo, setIsActiveOptionTwo] = useState<boolean>(false)
  const [countProductListOne, setCountProductListOne] = useState<number>(1)
  const [countProductListTwo, setCountProductListTwo] = useState<number>(1)
  const [productListOne, setProductListOne] = useState<string[]>([`${EOptionValue.ONE}_1`])
  const [productListTwo, setProductListTwo] = useState<string[]>([`${EOptionValue.TWO}_1`])
  const [canAddOptionOne, setCanAddOptionOne] = useState<boolean>(true)
  const [canAddOptionTwo, setCanAddOptionTwo] = useState<boolean>(true)
  const [calcProductOptionOne, setCalcProductOptionOne] = useState<number>(0)
  const [calcProductOptionTwo, setCalcProductOptionTwo] = useState<number>(0)
  const [dataSource, setDataSource] = useState<ITempProductDetail[]>([])
  const [productOptionLabelOne, setProductOptionLabelOne] = useState<string>('')
  const [productOptionLabelTwo, setProductOptionLabelTwo] = useState<string>('')
  const [productOptionValueOne, setProductOptionValueOne] = useState<string[]>([])
  const [productOptionValueTwo, setProductOptionValueTwo] = useState<string[]>([])
  // const [productOptionElementNameOne, setProductOptionElementNameOne] = useState<string[]>([])
  const [productOptionElementNameTwo, setProductOptionElementNameTwo] = useState<string[]>([])

  const columns: ColumnsType<ITempProductDetail> = [
    {
      title:
        productOptionLabelOne || `${t('seller.product:form.sales.optionsForm.productOptions')} 1`,
      dataIndex: 'option1',
      key: 'option1'
    },
    {
      title:
        productOptionLabelTwo || `${t('seller.product:form.sales.optionsForm.productOptions')} 2`,
      dataIndex: 'option2',
      key: 'option2'
    },
    {
      title: t('seller.product:form.sales.priceBaht'),
      dataIndex: 'price',
      key: 'price',
      render: (text: string, recode: ITempProductDetail, index: number): JSX.Element => {
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
      render: (text: string, recode: ITempProductDetail, index: number): JSX.Element => {
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
      render: (text: string, recode: ITempProductDetail, index: number): JSX.Element => {
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

  useEffect(() => {
    initTableDataSource()
  }, [productOptionLabelOne, productOptionLabelTwo, productOptionValueOne, productOptionValueTwo])

  function toggleCheckOption(checked: boolean): void {
    setIsCheckedOption(checked)
  }

  function toggleActiveOptionTwo(): void {
    setIsActiveOptionTwo(!isActiveOptionTwo)

    if (!isActiveOptionTwo === true) {
      setProductListTwo([`${EOptionValue.TWO}_1`])
      setCountProductListTwo(1)
    } else {
      props.form.setFieldValue(EOptionLabel.TWO, '')
      productOptionElementNameTwo.forEach((i: string) => {
        console.log(i)
        props.form.setFieldValue(i, '')
      })
      setProductOptionLabelTwo('')
      setProductOptionValueTwo([])
    }
  }

  function handleProductAdd(type: string): void {
    if (type === EChoice.ONE) {
      const tmpList: string[] = [...productListOne]
      tmpList.push(`optionValueOne_${productListOne.length + 1}`)
      setProductListOne(tmpList)
      const countAddButton: number = countProductListOne + 1
      setCountProductListOne(countAddButton)
      const calcLimitProductTwo: number = Math.floor(50 / countAddButton)
      setCalcProductOptionTwo(calcLimitProductTwo)

      if (
        (countAddButton === 50 && countProductListTwo === 1) ||
        countAddButton === calcProductOptionOne
      ) {
        setCanAddOptionOne(false)
        setCanAddOptionTwo(false)
      }
    } else {
      const tmpList: string[] = [...productListTwo]
      tmpList.push(`optionValueTwo_${productListTwo.length + 1}`)
      setProductListTwo(tmpList)
      const countAddButtonTwo: number = countProductListTwo + 1
      setCountProductListTwo(countAddButtonTwo)
      const calLimitProduct: number = Math.floor(50 / countAddButtonTwo)
      setCalcProductOptionOne(calLimitProduct)

      if (countAddButtonTwo === calcProductOptionTwo) {
        setCanAddOptionTwo(false)
        setCanAddOptionOne(false)
      }
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
      const countAddButton: number = countProductListOne - 1
      setCountProductListOne(countAddButton)

      const calcLimitProductTwo: number = Math.floor(50 / countAddButton)
      setCalcProductOptionTwo(calcLimitProductTwo)

      if (calcProductOptionOne >= countAddButton) {
        setCanAddOptionOne(true)
      }
      if (calcLimitProductTwo > countProductListTwo) {
        setCanAddOptionTwo(true)
      }
    } else {
      setProductListTwo(tmpList)
      const countAddButtonTwo: number = countProductListTwo - 1
      setCountProductListTwo(countAddButtonTwo)
      const calcLimitProduct: number = Math.floor(50 / countAddButtonTwo)
      setCalcProductOptionOne(calcLimitProduct)

      if (calcProductOptionTwo >= countAddButtonTwo) {
        setCanAddOptionTwo(true)
      }
      if (calcLimitProduct > countProductListOne) {
        setCanAddOptionOne(true)
      }
    }
  }

  function initTableDataSource(): void {
    const data: ITempProductDetail[] = []
    if (productOptionLabelOne && productOptionValueOne.length) {
      productOptionValueOne.forEach((i: string) => {
        if (productOptionLabelTwo && productOptionValueTwo.length) {
          productOptionValueTwo.forEach((j: string) => {
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

  function onChangeProductDetailOptionLabel(e: ChangeEvent<HTMLInputElement>, mode: 1 | 2): void {
    if (mode === 1) {
      setProductOptionLabelOne(e.target.value)
    } else {
      setProductOptionLabelTwo(e.target.value)
    }
  }

  function onChangeProductDetailOptionValue(value: string, mode: 1 | 2, index: number): void {
    let option: string[]
    let optionElementName: string[]

    if (mode === 1) {
      option = [...productOptionValueOne]
      option[index] = value
      setProductOptionValueOne(option.filter((i: string) => !isEmpty(i)))

      // optionElementName = [...productOptionElementNameOne]
      // optionElementName.push(`${EOptionValue.ONE}_${index + 1}`)
      // setProductOptionElementNameOne(
      //   optionElementName.filter((item: string, i: number) => optionElementName.indexOf(item) === i)
      // )
    } else {
      option = [...productOptionValueTwo]
      option[index] = value
      setProductOptionValueTwo(option.filter((i: string) => !isEmpty(i)))

      optionElementName = [...productOptionElementNameTwo]
      optionElementName.push(`${EOptionValue.TWO}_${index + 1}`)
      setProductOptionElementNameTwo(
        optionElementName.filter((item: string, i: number) => optionElementName.indexOf(item) === i)
      )
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>, name: string): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      props.form.setFieldValue(name, e.target.value)
    } else {
      props.form.setFieldValue(name, e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
  }

  function rederFormProductOptions(mode: 1 | 2): JSX.Element {
    if (mode === 2 && !isActiveOptionTwo) {
      return null
    }

    let items: string[]
    let optionLabelName: EOptionLabel
    let choiceName: EChoice
    let canAddOption: boolean

    if (mode === 1) {
      items = productListOne
      optionLabelName = EOptionLabel.ONE
      choiceName = EChoice.ONE
      canAddOption = canAddOptionOne
    } else {
      items = productListTwo
      optionLabelName = EOptionLabel.TWO
      choiceName = EChoice.TWO
      canAddOption = canAddOptionTwo
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
              <Text className={styles.optionBin} onClick={toggleActiveOptionTwo}>
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
          if (index === 0) {
            return (
              <Col span={24} key={index}>
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
            <Fragment key={index}>
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
                  className={styles.bin}
                  onClick={(): void => handleProductRemove(choiceName, item, items, index, mode)}
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
            <Switch className="hps-switch" onChange={toggleCheckOption} />
            <Text>{t('seller.product:form.sales.useOptions')}</Text>
          </Space>
        </Col>
        {!isCheckedOption ? (
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
        {isCheckedOption && (
          <>
            <Col span={24}>{rederFormProductOptions(1)}</Col>
            <Col span={24}>{rederFormProductOptions(2)}</Col>
            {!isActiveOptionTwo && (
              <Col span={24}>
                <Button className="hps-btn-secondary mb-3" onClick={toggleActiveOptionTwo} block>
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
      {isCheckedOption && (
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
