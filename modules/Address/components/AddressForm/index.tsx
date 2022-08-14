/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Input, Form, FormInstance, Col, Row, Select, Modal, Typography, Button } from 'antd'
import { DeepPartial } from 'redux'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import PickLocationField from './components/PickLocationField'
import provinceData from './mock-data/province-data.json'
import districtData from './mock-data/district-data.json'
import styles from './AddressForm.module.scss'
import AddressTagField from './components/AddressTagField'
import AddressCheckboxField from './components/AddressCheckboxField'
import { IAddressFormValues } from '~/interfaces'
import { CustomHookUseVisibleUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

const provinceOptions: DefaultOptionType[] = provinceData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const districtOptions: DefaultOptionType[] = districtData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const postalCodeOptions: DefaultOptionType[] = ['73100', '73150'].map((d: any) => ({
  label: d,
  value: d
}))

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

  // eslint-disable-next-line @typescript-eslint/typedef
  const hintModalVisible = CustomHookUseVisibleUtil()

  const [hintModalData, setHintModalData] = useState<any>({})

  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IAddressFormValues>>({})

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

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
            <Form.Item label={t('address:form.postalCode')} name="postcode" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
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
            <Form.Item label={t('address:form.location')} name="geoName">
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
