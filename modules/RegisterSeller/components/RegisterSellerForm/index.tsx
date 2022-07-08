import React, { FC, ChangeEvent } from 'react'
import { Typography, Button, Image, Row, Col, Form, Input, Select, Radio } from 'antd'
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
  brand: string
  category: number
  website: string
  facebook: string
  instagram: string
  other: string
  about: string
}

const RegisterSellerForm: FC<IRegisterSellerFormProps> = (props: IRegisterSellerFormProps) => {
  const [form] = Form.useForm()

  function onTelChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpList.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ tel: e.target.value })
    } else {
      form.setFieldsValue({ tel: e.target.value.replace(RegExpList.ALLOW_NUMBER, '') })
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
            <Form layout="vertical" name="registerForm" form={form} onFinish={onSubmit}>
              <Row gutter={[16, 8]}>
                <Col xs={24}>
                  <Row align="middle">
                    <Col span={8}>
                      <Text>{t('auth.registerSeller.form.shopType.title')}</Text>
                    </Col>
                    <Col span={16}>
                      <Form.Item className="mb-0" name="shopType">
                        <Radio.Group className={styles.radio} defaultValue="0">
                          <Radio value="0">{t('auth.registerSeller.form.shopType.normal')}</Radio>
                          <Radio value="1">{t('auth.registerSeller.form.shopType.mall')}</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <HighlightLabel title={t('auth.registerSeller.section.info')} color="secondary" />
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
                        message: `${t('common.form.min.head')} ${t(
                          'auth.registerSeller.form.tel'
                        )} ${t('common.form.min.tail')}`
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
                  <HighlightLabel
                    title={t('auth.registerSeller.section.brand')}
                    color="secondary"
                  />
                </Col>
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
                    <Select defaultValue="">
                      <Select.Option value="">{t('common.option')}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.website')} name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.facebook')} name="facebook">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.instagram')} name="instagram">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.other')} name="other">
                    <TextArea maxLength={200} showCount />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <HighlightLabel
                    title={t('auth.registerSeller.section.about')}
                    color="secondary"
                  />
                </Col>
                <Col xs={24}>
                  <Form.Item label={t('auth.registerSeller.form.about')} name="about">
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
