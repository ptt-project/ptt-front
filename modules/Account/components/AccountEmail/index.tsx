import React, { FC, useState } from 'react'
import Helmet from 'react-helmet'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './AccountEmail.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Form, Input, message } from 'antd'
import { IMemberInfo, IUpdateMemberEmailPayload } from '~/interfaces'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { MemberService } from '~/services'
import { NextRouter, useRouter } from 'next/router'
import { Rule } from 'antd/lib/form'
import { AxiosError } from 'axios'

const { Text, Title } = Typography

interface IAccountEmailForm {
  email: string
  password: string
}

interface IAccountEmailProps {
  isSeller?: boolean
  info: IMemberInfo
}

const AccountEmail: FC<IAccountEmailProps> = (props: IAccountEmailProps) => {
  const router: NextRouter = useRouter()
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const prefixMenu: string = props.isSeller ? 'management/account' : 'account/info'
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info', 'setting-sidebar'])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [info] = useState<IMemberInfo>(props.info)

  function getEmail(): string {
    if (info.email) {
      let num: number = 6
      let star: string = ''

      while (num > 0) {
        star += '*'
        num--
      }

      const provider: string = info.email.split('@')[info.email.split('@').length - 1]

      return `${info.email.slice(0, 2)}${star}@${provider}`
    }

    return ''
  }

  async function onSubmit(values: IAccountEmailForm): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IUpdateMemberEmailPayload = {
        newEmail: values.email,
        password: values.password
      }

      await MemberService.updateEmail(payload)

      message.success(t('common:apiMessage.success'))
      router.push(`${rootMenu}/settings/${prefixMenu}`)
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          case 103003:
            message.error(t('message:buyer.account.email.alreadyEmail'))
            break
          case 101001:
            message.error(t('message:buyer.account.email.alreadyEmail'))
            break
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account-info:email.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={
          props.isSeller
            ? [
                { title: t('setting-sidebar:seller.management.title') },
                {
                  title: t('setting-sidebar:seller.management.account'),
                  href: `${rootMenu}/settings/${prefixMenu}`
                },
                { title: t('account-info:email.title') }
              ]
            : [
                { title: t('account-info:setting') },
                { title: t('account-info:title') },
                {
                  title: t('account-info:personalInfo'),
                  href: `${rootMenu}/settings/${prefixMenu}`
                },
                { title: t('account-info:email.title') }
              ]
        }
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:email.title')}
              </Title>
              <Row className={styles.highlight}>
                <Col md={{ span: 4, offset: 6 }} xs={8}>
                  <Text>{t('account-info:email.currentEmail')} :</Text>
                </Col>
                <Col md={12} xs={16}>
                  <Text className={styles.colorPrimaryDark}>{getEmail()}</Text>
                </Col>
              </Row>
              <Row>
                <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                  <Form layout="vertical" form={form} name="accountEmailForm" onFinish={onSubmit}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label={t('account-info:email.newEmail')}
                          name="email"
                          rules={[
                            {
                              required: false,
                              message: `${t('common:form.required')} ${t(
                                'account-info:email.newEmail'
                              )}`
                            },
                            (): any => ({
                              validator(_: Rule, value: string): Promise<any> {
                                if (
                                  !value ||
                                  (RegExpConst.MATCH_EMAIL.test(value) &&
                                    !RegExpConst.MATCH_THAI_LETTER.test(value))
                                ) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  new Error(
                                    `${t('common:form.invalid.head')} ${t(
                                      'account-info:email.newEmail'
                                    )} ${t('common:form.invalid.tail')}`
                                  )
                                )
                              }
                            })
                          ]}
                        >
                          <Input maxLength={50} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label={t('account-info:email.password')}
                          name="password"
                          rules={[
                            {
                              required: false,
                              message: `${t('common:form.required')} ${t(
                                'account-info:email.password'
                              )}`
                            },
                            (): any => ({
                              validator(_: Rule, value: string): Promise<any> {
                                if (!value || RegExpConst.MATCH_PASSWORD.test(value)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  new Error(
                                    `${t('common:form.invalid.head')} ${t(
                                      'account-info:email.password'
                                    )} ${t('common:form.invalid.tail')}`
                                  )
                                )
                              }
                            })
                          ]}
                        >
                          <Input.Password maxLength={20} />
                        </Form.Item>
                      </Col>
                      <Col span={24} className="text-center mb-5">
                        <Text type="secondary">{t('account-info:email.msgConfirm')}</Text>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('account-info:button.confirm')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default AccountEmail
