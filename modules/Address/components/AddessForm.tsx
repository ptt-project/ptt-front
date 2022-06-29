import React, { useState } from 'react'
import { Coords } from 'google-map-react'
import { Input, Space, Form, FormInstance, Checkbox, Radio, Col, Row, Select } from 'antd'
import { DeepPartial } from 'redux'
import { Rule } from 'antd/lib/form'
import PickLocationField from './PickLocationField'
import provinceData from './province-data.json'
import districtData from './district-data.json'
import styles from '../Address.module.scss'
import t from '~/locales'

const provinceOptions: IBaseOption[] = provinceData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const districtOptions: IBaseOption[] = districtData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const postalCodeOptions: IBaseOption[] = ['73100', '73150'].map((d: any) => ({
  label: d,
  value: d
}))
export interface IAddressFormValues {
  fullName: string
  mobileNo: string
  province: string
  district: string
  postalCode: string
  addressDetails: string
  location: Coords
  addressType: string
  isDefault: boolean
  isStore: boolean
  isRefundStore: boolean
}
interface IAddressFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IAddressFormValues>
  onSubmit: (values: IAddressFormValues) => void
}

const AddressForm: React.FC<IAddressFormProps> = (props: IAddressFormProps) => {
  const { parentForm, initialValues, onSubmit } = props
  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IAddressFormValues>>({})

  const baseRules: Rule[] = [{ required: true, message: t('required') }]

  function onFormFinish(values: IAddressFormValues): void {
    console.log({ formValues: values })
    onSubmit?.(values)
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
        <Row>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.addressFields.fullName')}
              name="fullName"
              rules={[...baseRules]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.addressFields.mobileNo')}
              name="mobileNo"
              rules={[...baseRules]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.addressFields.province')}
              name="province"
              rules={[...baseRules]}
            >
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                allowClear
                autoClearSearchValue
              >
                {provinceOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.addressFields.district')}
              name="district"
              rules={[...baseRules]}
            >
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                // disabled={!formValues.province}
                allowClear
                autoClearSearchValue
              >
                {districtOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.addressFields.postalCode')}
              name="postalCode"
              rules={[...baseRules]}
            >
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                // disabled={!formValues.district}
                allowClear
                autoClearSearchValue
              >
                {postalCodeOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} span={24}>
            <Form.Item
              label={t('address.addressFields.addressDetails')}
              name="addressDetails"
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
        </Row>
        <Space />
        <Form.Item label={t('address.addressFields.location')} name="location">
          <PickLocationField />
        </Form.Item>
        <Row className={styles.fieldRow}>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              name="addressType"
              label={t('address.addressFields.addressType')}
              rules={[...baseRules]}
            >
              <Radio.Group>
                <Radio.Button value="home">บ้าน</Radio.Button>
                <Radio.Button value="office">ที่ทำงาน</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12} style={{ alignItems: 'center' }}>
            <Form.Item name="isDefault" noStyle>
              <Checkbox value="isDefault" name="isDefault">
                {t('address.addressFields.isDefault')}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item name="isStore" noStyle>
              <Checkbox value="isStore">{t('address.addressFields.isStore')}</Checkbox>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item name="isRefundStore" noStyle>
              <Checkbox value="isRefundStore">{t('address.addressFields.isRefundStore')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddressForm
