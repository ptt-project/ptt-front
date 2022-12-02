import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './EWalletTopUp.module.scss'
import { Typography, Row, Col, Select, Form, Button, Space, List, Image } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { DefaultOptionType } from 'antd/lib/select'
import { DownloadOutlined } from '@ant-design/icons'
import { first } from 'lodash'
import { CustomUrlUtil, HelperBlobToFileUtil, HelperDecimalFormatUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import { ImageService, WalletService } from '~/services'
import { exampleQrCodeBase64 } from './qr-code-base64'
import { EnumImageSize } from '~/enums/image.enum'

const { Title, Text } = Typography

const topUpAmountOptions: DefaultOptionType[] = [100, 300, 500, 800, 1300, 1500, 2000].map(
  (amount: number): DefaultOptionType => ({ label: amount.toLocaleString(), value: amount })
)

interface IEWalletTopUpFormValues {
  topUpAmount: number
}

const EWalletTopUp: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm<IEWalletTopUpFormValues>()

  const topUpAmount: number = Form.useWatch('topUpAmount', form)

  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const [qrCodeImageId, setQrCodeImageId] = useState<string>('')
  const [qrCodeImage, setQrCodeImage] = useState<string>('')

  const { data: qrCodeImageResponse } = ImageService.useGetImage(
    qrCodeImageId,
    EnumImageSize.SMALL,
    {
      retry: 0
    }
  )
  const { data: wallet, refetch: fetchWallet } = WalletService.useGetMyWallet()
  const { data: depositQrCode } = WalletService.useGetWalletDepositQrCode({
    amount: topUpAmount
  })

  const balance: number = useMemo(() => wallet?.balance || 0, [wallet?.balance])

  function onSubmit(): void {
    if (qrCodeImage) {
      const tempLink: HTMLAnchorElement = document.createElement('a')
      tempLink.href = qrCodeImage
      tempLink.setAttribute('download', `happy-shopping-topup-${topUpAmount}.png`)
      tempLink.click()
    }
  }

  useEffect(() => {
    if (depositQrCode) {
      fetchWallet()
      setQrCodeImageId(depositQrCode)
    }
  }, [depositQrCode, fetchWallet])

  useEffect(() => {
    const parseBlobToFile = async (): Promise<void> => {
      try {
        if (qrCodeImageResponse) {
          const file: File = await HelperBlobToFileUtil(
            qrCodeImageResponse,
            `happy-shopping-topup-${topUpAmount}.${qrCodeImageResponse.type}`
          )
          const tempCreateObjectURL: string = URL.createObjectURL(file)
          setQrCodeImage(tempCreateObjectURL)
        } else {
          // TODO: อย่าลืมลบ
          console.log('mock top up qr code')
          const example: Buffer = Buffer.from(exampleQrCodeBase64, 'base64')
          const file: File = await HelperBlobToFileUtil(
            new Blob([new Uint8Array(example, example.byteOffset, example.length)]),
            `happy-shopping-topup-${topUpAmount}.png`
          )
          const tempCreateObjectURL: string = URL.createObjectURL(file)
          setQrCodeImage(tempCreateObjectURL)
        }
      } catch (error) {
        console.error(error)
      }
    }

    parseBlobToFile()
  }, [qrCodeImageResponse, topUpAmount])

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
                        <Image
                          preview={false}
                          className={styles.qrCodeImage}
                          src={qrCodeImage}
                          fallback="./images/main/buyer/example-qr-code.svg"
                          alt="example-qr-code"
                        />
                        <Form.Item shouldUpdate>
                          {(): JSX.Element => (
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
                          )}
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
