import React, { useState, FC, ChangeEvent } from 'react'
import {
  Typography,
  Button,
  Image,
  Row,
  Col,
  Form,
  Input,
  Select,
  Radio,
  RadioChangeEvent
} from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import { RegExpList } from '~/constants'
import styles from './RegisterSellerForm.module.scss'

const { Text } = Typography
const { TextArea } = Input

interface IRegisterSellerFormProps {
  setStep: (step: number) => void
}

interface IRegisterSellerForm {
  shopType: number
  name: string
  tel: string
  email: string
  corporateName?: string
  corporateNo?: string
  brand: string
  category: number
  website: string
  facebook: string
  instagram: string
  other: string
  corporate?: string
  corporateDetail?: string
  info: string
}

const RegisterSellerForm: FC<IRegisterSellerFormProps> = (props: IRegisterSellerFormProps) => {
  const [form] = Form.useForm()
  const [shopType, setShopType] = useState<string>('0')
  const corporateLabel: string = t('auth.registerSeller.form.corporate') // prevent error hook rules
  const corporateNameLabel: string = t('auth.registerSeller.form.corporateName') // prevent error hook rules
  const corporateNoLabel: string = t('auth.registerSeller.form.corporateNo') // prevent error hook rules
  const corporateDetailLabel: string = t('auth.registerSeller.form.corporateDetail') // prevent error hook rules
  const optionLabel: string = t('common.form.option') // prevent error hook rules
  const requiredRule: string = t('common.form.required') // prevent error hook rules
  const minRule: any = t('common.form.min') // prevent error hook rules

  function onTelChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpList.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ tel: e.target.value })
    } else {
      form.setFieldsValue({ tel: e.target.value.replace(RegExpList.ALLOW_NUMBER, '') })
    }
  }

  function onRadioChange(e: RadioChangeEvent): void {
    setShopType(e.target.value)
  }

  function onIdCardChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpList.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ corporateNo: e.target.value })
    } else {
      form.setFieldsValue({ corporateNo: e.target.value.replace(RegExpList.ALLOW_NUMBER, '') })
    }
  }

  function onSubmit(values: IRegisterSellerForm): void {
    console.log(values)
    props.setStep(1)
  }

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0}>
            <div className={styles.imgContainer}>
              <Image
                rootClassName={styles.imgWrapper}
                preview={false}
                width="100%"
                src="./images/main/seller/register-form.jpg"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Text>
              <h4 className={`${styles.cSecondary} text-center mb-5`}>
                {t('auth.registerSeller.title')}
              </h4>
            </Text>
            <Form
              initialValues={{
                shopType: '0',
                category: '',
                corporate: ''
              }}
              layout="vertical"
              name="registerForm"
              form={form}
              onFinish={onSubmit}
            >
              <Row gutter={[16, 8]}>
                <Col xs={24}>
                  <Row align="middle">
                    <Col sm={8} xs={24}>
                      <Text>{t('auth.registerSeller.form.shopType.title')}</Text>
                    </Col>
                    <Col sm={16} xs={24}>
                      <Form.Item className="mb-0" name="shopType">
                        <Radio.Group className={styles.radio} onChange={onRadioChange}>
                          <Radio value="0">{t('auth.registerSeller.form.shopType.normal')}</Radio>
                          <Radio value="1">{t('auth.registerSeller.form.shopType.mall')}</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <HighlightLabel title={t('auth.registerSeller.section.contact')} />
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    label={t('auth.registerSeller.form.name')}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: `${t('common.form.required')} ${t(
                          'auth.registerSeller.form.name'
                        )}`
                      }
                    ]}
                  >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    label={t('auth.registerSeller.form.tel')}
                    name="tel"
                    rules={[
                      {
                        required: true,
                        message: `${t('common.form.required')} ${t('auth.registerSeller.form.tel')}`
                      },
                      {
                        min: 9,
                        message: `${t('common.form.min.head')} 9 ${t('common.form.min.tail')}`
                      }
                    ]}
                  >
                    <Input maxLength={10} onChange={onTelChange} />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    label={t('auth.registerSeller.form.email')}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: `${t('common.form.required')} ${t(
                          'auth.registerSeller.form.email'
                        )}`
                      },
                      {
                        type: 'email',
                        message: `${t('common.form.invalid.head')} ${t(
                          'auth.registerSeller.form.email'
                        )} ${t('common.form.invalid.tail')}`
                      }
                    ]}
                  >
                    <Input type="email" maxLength={50} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <HighlightLabel title={t('auth.registerSeller.section.brand')} />
                </Col>
                {shopType === '1' ? (
                  <>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label={corporateNameLabel}
                        name="corporateName"
                        rules={[
                          {
                            required: true,
                            message: `${requiredRule} ${corporateNameLabel}`
                          }
                        ]}
                      >
                        <Input maxLength={50} />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label={corporateNoLabel}
                        name="corporateNo"
                        rules={[
                          {
                            required: true,
                            message: `${requiredRule} ${corporateNoLabel}`
                          },
                          {
                            min: 13,
                            message: `${minRule.head} 13 ${minRule.tail}`
                          }
                        ]}
                      >
                        <Input maxLength={13} onChange={onIdCardChange} />
                      </Form.Item>
                    </Col>
                  </>
                ) : null}
                <Col md={12} xs={24}>
                  <Form.Item
                    label={t('auth.registerSeller.form.brand')}
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: `${t('common.form.required')} ${t(
                          'auth.registerSeller.form.brand'
                        )}`
                      }
                    ]}
                  >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    name="category"
                    label={t('auth.registerSeller.form.category')}
                    rules={[
                      {
                        required: true,
                        message: `${t('common.form.required')} ${t(
                          'auth.registerSeller.form.category'
                        )}`
                      }
                    ]}
                  >
                    <Select>
                      <Select.Option value="">{t('common.form.option')}</Select.Option>
                      <Select.Option value="0">ของตกแต่งบ้าน</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.website')} name="website">
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.facebook')} name="facebook">
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.instagram')} name="instagram">
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.other')} name="other">
                    <TextArea maxLength={200} showCount />
                  </Form.Item>
                </Col>
                {shopType === '1' ? (
                  <>
                    <Col span={24}>
                      <Form.Item
                        name="corporate"
                        label={corporateLabel}
                        rules={[
                          {
                            required: true,
                            message: `${requiredRule} ${corporateLabel}`
                          }
                        ]}
                      >
                        <Select>
                          <Select.Option value="">{optionLabel}</Select.Option>
                          <Select.Option value="0">ผู้จัดจำหน่าย</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label={corporateDetailLabel} name="corporateDetail">
                        <TextArea rows={4} maxLength={1000} showCount />
                      </Form.Item>
                    </Col>
                  </>
                ) : null}
                <Col span={24}>
                  <HighlightLabel title={t('auth.registerSeller.section.info')} />
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.info')} name="info">
                    <TextArea rows={4} maxLength={1000} showCount />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button className="mt-5" htmlType="submit" type="primary" block>
                  {t('common.confirm')}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RegisterSellerForm
