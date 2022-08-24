import React, { ReactNode } from 'react'
import { Typography, Row, Col, Select, Form, Button, Image, Space, List, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import { DefaultOptionType } from 'antd/lib/select'
import { DownloadOutlined } from '@ant-design/icons'
import { first } from 'lodash'
import styles from './EWalletTopUp.module.scss'
import { CustomUrlUtil, HelperDecimalFormatUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'

const { Title, Text } = Typography

const topUpAmountOptions: DefaultOptionType[] = [100, 300, 500, 800, 1300, 1500, 2000].map(
  (amount: number): DefaultOptionType => ({ label: amount.toLocaleString(), value: amount })
)

interface IEWalletTopUpFormValues {
  topUpAmount: number
}

const EWalletTopUp: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()

  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const balance: number = 3999

  function onSubmit(values: IEWalletTopUpFormValues): void {
    console.debug(values)
    message.success(t('e-wallet:topUp.downloadSuccess'))
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('e-wallet:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('e-wallet:breadcrumbs.setting') },
          { title: t('e-wallet:breadcrumbs.finance') },
          {
            title: t('e-wallet:breadcrumbs.topUp'),
            href: CustomUrlUtil('/settings/finance/e-wallet/top-up', router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className=" mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row
                className={styles.contentLayout}
                gutter={16}
                justify="space-between"
                wrap={false}
              >
                <Col>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('e-wallet:topUp.title')}
                  </Title>
                </Col>
                <Row gutter={8} align="middle">
                  <Col>
                    <Text className={styles.balanceLabel}>{t('e-wallet:balance')}</Text>
                  </Col>
                  <Col>
                    <Text className={styles.balanceValue}>
                      {HelperDecimalFormatUtil(balance, 2, 'en-EN', {
                        style: 'currency',
                        currency: 'THB'
                      })}
                    </Text>
                  </Col>
                </Row>
              </Row>
              <Row justify="center">
                <Col className={styles.topUpAmountSelectLayout}>
                  <Form
                    layout="vertical"
                    labelAlign="right"
                    form={form}
                    initialValues={{
                      topUpAmount: first(topUpAmountOptions).value
                    }}
                    onFinish={onSubmit}
                  >
                    <Form.Item
                      name="topUpAmount"
                      label={t('e-wallet:common.amount')}
                      requiredMark
                      required
                    >
                      <Select>
                        {topUpAmountOptions.map((option: DefaultOptionType) => (
                          <Select.Option key={`${option.value}`} value={option.value}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Row justify="center">
                      <Space direction="vertical" size={8}>
                        <Image preview={false} src="./images/main/buyer/example-qr-code.svg" />
                        <Form.Item shouldUpdate>
                          {(): JSX.Element => {
                            const topUpAmount: number = form.getFieldValue('topUpAmount')
                            return (
                              <Row justify="center">
                                <Button
                                  className="hps-btn-secondary mt-1"
                                  icon={<DownloadOutlined />}
                                  disabled={!topUpAmount}
                                  htmlType="submit"
                                >
                                  {t('e-wallet:common.download')}
                                </Button>
                              </Row>
                            )
                          }}
                        </Form.Item>
                      </Space>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <List
                    className={styles.howToLayout}
                    header={
                      <Text className={styles.howToTitle}>{t('e-wallet:topUp.howToTitle')}</Text>
                    }
                    dataSource={[
                      t('e-wallet:topUp.howTo1'),
                      t('e-wallet:topUp.howTo2'),
                      t('e-wallet:topUp.howTo3')
                    ]}
                    split={false}
                    renderItem={(item: string): ReactNode => (
                      <List.Item className={styles.howToItem}>
                        <Text>{item}</Text>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default EWalletTopUp
