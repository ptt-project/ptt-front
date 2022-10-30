import React, { useState, FC, ChangeEvent } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import Loading from '~/components/main/Loading'
import styles from './RegisterSellerForm.module.scss'
import { useTranslation } from 'next-i18next'
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
  RadioChangeEvent,
  message,
  Alert
} from 'antd'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IConfigOptionPlatformCategory, ISellerInfo, ISellerRegisterPayload } from '~/interfaces'
import { FormModeEnum, SellerApprovalStatusEnum, SellerShopTypeEnum } from '~/enums'
import { ConfigService, SellerService } from '~/services'

const { Text, Title } = Typography
const { TextArea } = Input

interface IRegisterSellerFormProps {
  shopInfo?: ISellerInfo
  setStep: (step: number) => void
}

const RegisterSellerForm: FC<IRegisterSellerFormProps> = (props: IRegisterSellerFormProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register-seller'])
  const { data: configOptions } = ConfigService.useGetConfigOptions()

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shopType, setShopType] = useState<SellerShopTypeEnum>(SellerShopTypeEnum.NORMAL)
  const [formMode] = useState<FormModeEnum>(getFormMode())

  function getFormMode(): FormModeEnum {
    if (props.shopInfo) {
      return FormModeEnum.VIEW
    }
    return FormModeEnum.ADD
  }

  function initForm():
    | ISellerRegisterPayload
    | { type: SellerShopTypeEnum; category: string; mallApplicantRole: string } {
    if (props.shopInfo) {
      return props.shopInfo
    }

    return {
      type: shopType,
      category: '',
      mallApplicantRole: ''
    }
  }

  function onTelChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ tel: e.target.value })
    } else {
      form.setFieldsValue({ tel: e.target.value.replace(RegExpConst.ALLOW_NUMBER, '') })
    }
  }

  function onRadioChange(e: RadioChangeEvent): void {
    setShopType(e.target.value)
  }

  function onIdCardChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ corporateNo: e.target.value })
    } else {
      form.setFieldsValue({ corporateNo: e.target.value.replace(RegExpConst.ALLOW_NUMBER, '') })
    }
  }

  async function onSubmit(values: ISellerRegisterPayload): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: ISellerRegisterPayload = { ...values }
      await SellerService.register(payload)
      isSuccess = true
      props.setStep(1)
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function renderStatus(): JSX.Element {
    switch (props.shopInfo?.approvalStatus) {
      case SellerApprovalStatusEnum.REQUESTED:
        return (
          <Alert
            className="mb-5"
            message={t('auth.register-seller:form.alert.requested.title')}
            description={t('auth.register-seller:form.alert.requested.detail')}
            type="warning"
            showIcon
          />
        )
      case SellerApprovalStatusEnum.REJECTED:
        return (
          <Alert
            className="mb-5"
            message={t('auth.register-seller:form.alert.rejected.title')}
            description={t('auth.register-seller:form.alert.rejected.detail')}
            type="error"
            showIcon
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  src="./images/main/seller/register-form.jpg"
                  alt="register-seller-form"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('auth.register-seller:title')}
              </Title>
              {renderStatus()}
              <Form
                initialValues={initForm()}
                layout="vertical"
                name="registerForm"
                form={form}
                onFinish={onSubmit}
                disabled={formMode === FormModeEnum.VIEW}
              >
                <Row gutter={[16, 8]}>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col sm={8} xs={24}>
                        <Text>{t('auth.register-seller:form.shopType.title')}</Text>
                      </Col>
                      <Col sm={16} xs={24}>
                        <Form.Item className="mb-0" name="type">
                          <Radio.Group className={styles.radio} onChange={onRadioChange}>
                            <Radio value={SellerShopTypeEnum.NORMAL}>
                              {t('auth.register-seller:form.shopType.normal')}
                            </Radio>
                            <Radio value={SellerShopTypeEnum.MALL}>
                              {t('auth.register-seller:form.shopType.mall')}
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <HighlightLabel title={t('auth.register-seller:section.contact')} />
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register-seller:form.name')}
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register-seller:form.name'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register-seller:form.tel')}
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register-seller:form.tel'
                          )}`
                        },
                        {
                          min: 9,
                          message: `${t('common:form.min.head')} 9 ${t('common:form.min.tail')}`
                        }
                      ]}
                    >
                      <Input maxLength={10} onChange={onTelChange} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register-seller:form.email')}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register-seller:form.email'
                          )}`
                        },
                        {
                          type: 'email',
                          message: `${t('common:form.invalid.head')} ${t(
                            'auth.register-seller:form.email'
                          )} ${t('common:form.invalid.tail')}`
                        }
                      ]}
                    >
                      <Input type="email" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <HighlightLabel title={t('auth.register-seller:section.brand')} />
                  </Col>
                  {shopType === SellerShopTypeEnum.MALL ? (
                    <>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label={t('auth.register-seller:form.corporateName')}
                          name="corporateName"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'auth.register-seller:form.corporateName'
                              )}`
                            }
                          ]}
                        >
                          <Input maxLength={50} />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label={t('auth.register-seller:form.corporateNo')}
                          name="corporateId"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'auth.register-seller:form.corporateNo'
                              )}`
                            },
                            {
                              min: 13,
                              message: `${t('common:form.min.head')} 13 ${t(
                                'common:form.min.tail'
                              )}`
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
                      label={t('auth.register-seller:form.brand')}
                      name="brandName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register-seller:form.brand'
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
                      label={t('auth.register-seller:form.category')}
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register-seller:form.category'
                          )}`
                        }
                      ]}
                    >
                      <Select>
                        <Select.Option value="">{t('common:form.option')}</Select.Option>
                        {configOptions?.platformCategory.map(
                          (category: IConfigOptionPlatformCategory) => (
                            <Select.Option key={category.value} value={category.value}>
                              {category.label}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label={t('auth.register-seller:form.website')} name="website">
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label={t('auth.register-seller:form.facebook')} name="facebookPage">
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label={t('auth.register-seller:form.instagram')} name="instagram">
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label={t('auth.register-seller:form.social')} name="socialMedia">
                      <TextArea maxLength={200} showCount />
                    </Form.Item>
                  </Col>
                  {shopType === SellerShopTypeEnum.MALL ? (
                    <>
                      <Col span={24}>
                        <Form.Item
                          name="mallApplicantRole"
                          label={t('auth.register-seller:form.corporate')}
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'auth.register-seller:form.corporate'
                              )}`
                            }
                          ]}
                        >
                          <Select>
                            <Select.Option value="">{t('common:form.option')}</Select.Option>
                            <Select.Option value="Brand Owner">Brand Owner</Select.Option>
                            <Select.Option value="Exclusive Distributor">
                              Exclusive Distributor
                            </Select.Option>
                            <Select.Option value="Non-Exclusive Distributor">
                              Non-Exclusive Distributor
                            </Select.Option>
                            <Select.Option value="Retailer">Retailer</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label={t('auth.register-seller:form.corporateDetail')}
                          name="mallOfflineShopDetail"
                        >
                          <TextArea rows={4} maxLength={1000} showCount />
                        </Form.Item>
                      </Col>
                    </>
                  ) : null}
                  <Col span={24}>
                    <HighlightLabel title={t('auth.register-seller:section.info')} />
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label={t('auth.register-seller:form.info')}
                      name="mallShopDescription"
                    >
                      <TextArea rows={4} maxLength={1000} showCount />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button className="mt-5" htmlType="submit" type="primary" block>
                    {t('common:confirm')}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

RegisterSellerForm.defaultProps = {
  shopInfo: null
}

export default RegisterSellerForm
