/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useMemo, useState } from 'react'
import { Input, Form, FormInstance, Col, Row, Select, Modal, Typography, Button } from 'antd'
import { DeepPartial } from 'redux'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { uniqBy } from 'lodash'
import PickLocationField from './components/PickLocationField'
import styles from './AddressForm.module.scss'
import AddressTagField from './components/AddressTagField'
import AddressCheckboxField from './components/AddressCheckboxField'
import { IAddressFormValues, ICustomHookUseVisibleUtil } from '~/interfaces'
import { CustomHookUseVisibleUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import {
  AddressFieldsEnum,
  IFindAddressResult,
  provinceData,
  queryAddress
} from './data/address-finder'

const { Text, Title } = Typography

// eslint-disable-next-line @typescript-eslint/typedef
const addressFiledLevels = ['province', 'district', 'tambon', 'postcode'] as const

type IAddressFiledLevel = typeof addressFiledLevels[number]

interface IAddressFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IAddressFormValues>
  onSubmit: (values: IAddressFormValues) => void
  isSeller?: boolean
  googleMapsApiKey: string
}

const AddressForm: React.FC<IAddressFormProps> = (props: IAddressFormProps) => {
  const { parentForm, initialValues, onSubmit, isSeller, googleMapsApiKey } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'address'])
  const [form] = Form.useForm(parentForm)
  const province: string = Form.useWatch('province', form)
  const district: string = Form.useWatch('district', form)
  const tambon: string = Form.useWatch('tambon', form)

  const hintModalVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()

  const [hintModalData, setHintModalData] = useState<any>({})

  const [, /* formValues */ setFormValues] = useState<DeepPartial<IAddressFormValues>>({})

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

  const provinceOptions: DefaultOptionType[] = useMemo(
    () =>
      uniqBy(
        provinceData.map((d: string) => ({
          label: d,
          value: d
        })),
        'value'
      ),
    []
  )

  const districtOptions: DefaultOptionType[] = useMemo(() => {
    const districtData: IFindAddressResult[] = queryAddress(AddressFieldsEnum.PROVINCE, province)
    return uniqBy(
      districtData.map((d: IFindAddressResult) => ({
        label: d[AddressFieldsEnum.DISTRICT],
        value: d[AddressFieldsEnum.DISTRICT]
      })),
      'value'
    )
  }, [province])

  const tambonOptions: DefaultOptionType[] = useMemo(() => {
    const tambonData: IFindAddressResult[] = queryAddress(AddressFieldsEnum.DISTRICT, district)
    return uniqBy(
      tambonData.map((d: IFindAddressResult) => ({
        label: d[AddressFieldsEnum.TAMBON],
        value: d[AddressFieldsEnum.TAMBON]
      })),
      'value'
    )
  }, [district])

  const postalCodeOptions: DefaultOptionType[] = useMemo(() => {
    const postalCodeData: IFindAddressResult[] = queryAddress(AddressFieldsEnum.TAMBON, tambon)
    return uniqBy(
      postalCodeData.map((d: any) => ({
        label: d[AddressFieldsEnum.ZIPCODE],
        value: `${d[AddressFieldsEnum.ZIPCODE]}`
      })),
      'value'
    )
  }, [tambon])

  useEffect(() => {
    console.log({ province, district, tambon })
    console.log({ provinceOptions, districtOptions, tambonOptions })
  }, [district, districtOptions, province, provinceOptions, tambon, tambonOptions])

  function onHintClick(hintType: string): void {
    switch (hintType) {
      // TODO: wait final msg
      case 'isStore':
        setHintModalData({
          title: 'เลือกเป็นที่อยู่ในการรับสินค้า',
          description: 'คำอธิบายบางอย่าง'
        })
        break
      case 'isRefundStore':
        setHintModalData({
          title: 'เลือกเป็นที่อยู่ในการรับสินค้าคืน',
          description: 'คำอธิบายบางอย่าง'
        })
        break
      default:
        break
    }
    hintModalVisible.show()
  }

  function onFormFinish(values: IAddressFormValues): void {
    console.log({ formValues: values })
    onSubmit?.({ ...initialValues, ...values })
  }

  function onFormChange(values: IAddressFormValues): void {
    setFormValues(values)
  }

  function clearRelateFields(currentField: IAddressFiledLevel) {
    return () => {
      const currentFieldIndex: number = addressFiledLevels.indexOf(currentField)
      const startClearIndex: number = currentFieldIndex + 1
      for (let i: number = startClearIndex; i < addressFiledLevels.length; i++) {
        form.setFieldValue(addressFiledLevels[i], null)
      }
    }
  }

  return (
    <div className={styles.form}>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onValuesChange={onFormChange}
        onFinish={onFormFinish}
      >
        <Row className="" gutter={[20, 0]}>
          <Col sm={12} xs={24}>
            <Form.Item label={t('address:form.fullName')} name="name" rules={[...baseRules]}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('address:form.mobileNo')}
              name="mobile"
              rules={[
                ...baseRules,
                {
                  min: 10,
                  message: `${t('common:form.invalid.head')} ${'${label}'} ${t(
                    'common:form.invalid.tail'
                  )}`
                }
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label={t('address:form.province')} name="province" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
                onChange={clearRelateFields('province')}
                allowClear
                autoClearSearchValue
              >
                {provinceOptions.map((option: DefaultOptionType) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label={t('address:form.district')} name="district" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
                onChange={clearRelateFields('district')}
                disabled={!province}
                allowClear
                autoClearSearchValue
              >
                {districtOptions.map((option: DefaultOptionType) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label={t('address:form.tambon')} name="tambon" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
                onChange={clearRelateFields('tambon')}
                disabled={!district}
                allowClear
                autoClearSearchValue
              >
                {tambonOptions.map((option: DefaultOptionType) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label={t('address:form.postalCode')} name="postcode" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
                disabled={!tambon}
                allowClear
                autoClearSearchValue
              >
                {postalCodeOptions.map((option: DefaultOptionType) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('address:form.addressDetails')}
              name="address"
              rules={[...baseRules]}
            >
              <Input.TextArea
                className={styles.addressDetails}
                showCount
                maxLength={200}
                rows={3}
              />
            </Form.Item>
          </Col>
          <Col sm={24} xs={24}>
            <Form.Item label={t('address:form.location')} name="geoName" shouldUpdate>
              <PickLocationField googleMapsApiKey={googleMapsApiKey} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              name="addressType"
              label={t('address:form.addressType')}
              rules={[...baseRules]}
            >
              <AddressTagField />
            </Form.Item>
          </Col>
          <Col className="align-items-center" sm={12} xs={24}>
            <Form.Item name="isDefault" noStyle>
              <AddressCheckboxField
                label={t('address:form.isDefault')}
                disabled={!!initialValues?.isMain}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name="isStore" noStyle>
              <AddressCheckboxField
                label={t('address:form.isStore')}
                onHintClick={onHintClick.bind(null, 'isStore')}
                disabled={!isSeller}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name="isRefundStore" noStyle>
              <AddressCheckboxField
                label={t('address:form.isRefundStore')}
                onHintClick={onHintClick.bind(null, 'isRefundStore')}
                disabled={!isSeller}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        visible={hintModalVisible.visible}
        onCancel={hintModalVisible.hide}
        title={
          <Col span={24}>
            <Title className="mb-0" level={4}>
              <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
              {hintModalData?.title}
            </Title>
          </Col>
        }
        footer={[
          <Col span={24}>
            <Button type="primary" onClick={hintModalVisible.hide}>
              {t('common:confirm')}
            </Button>
          </Col>
        ]}
      >
        <Text type="secondary"> {hintModalData?.description}</Text>
      </Modal>
    </div>
  )
}

AddressForm.defaultProps = {
  initialValues: {},
  isSeller: false
}

export default AddressForm
