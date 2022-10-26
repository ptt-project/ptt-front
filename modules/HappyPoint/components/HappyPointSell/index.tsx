/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Typography, Row, Col, Form, message, Button } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import styles from './HappyPointSell.module.scss'
import { CustomUrlUtil, HelperDecimalFormatUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { IHappyPointFormValues, IOtp } from '~/interfaces'
import HappyPointForm from '../HappyPointForm'
import { HappyPointTypeEnum, OtpTypeEnum } from '~/enums'
import OtpModal from '~/components/main/OtpModal'
import { HappyPointService, MemberService, WalletService } from '~/services'
import { getSummarySellHappyPoint } from '../HappyPointForm/happy-point.helper'

const { Title, Text } = Typography

const HappyPointSell: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()

  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])
  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<IHappyPointFormValues>()

  const { data: user } = MemberService.useGetProfile()
  const { data: configLookup } = HappyPointService.useGetHappyPointRateLookup()
  const { data: wallet } = WalletService.useGetMyWallet()
  const { mutateAsync: sellHappyPoint } = HappyPointService.useSellHappyPoint()

  const happyPointBalance: number = 3999

  function onCancelClick(): void {
    router.back()
  }

  function onSubmit(values: IHappyPointFormValues): void {
    setFormValues(values)
    setIsOtpOpen(true)
  }

  function toggleOtpOpen(): void {
    setIsOtpOpen(!isOtpOpen)
  }

  async function onOtpSuccess(otp: IOtp): Promise<void> {
    setIsOtpOpen(false)
    try {
      const { bahtAmount, vatAmount, totalAmount } = getSummarySellHappyPoint(
        formValues?.happyPointAmount,
        configLookup?.exchangeRate
      )
      await sellHappyPoint({
        amount: totalAmount,
        feeAmount: vatAmount,
        totalAmount: bahtAmount,
        point: formValues?.happyPointAmount,
        refId: configLookup?.refId,
        otpCode: otp.otpCode,
        refCode: otp.refCode
      })
      setFormValues(undefined)
      message.success(t('common:dataUpdated'))
      router.replace('/settings/finance/happy-point')
    } catch (error) {
      message.error(t('common:apiMessage.error'))
    }
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('happy-point:sell.title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('happy-point:breadcrumbs.setting') },
          { title: t('happy-point:breadcrumbs.finance') },
          {
            title: t('happy-point:breadcrumbs.happyPoint')
          },
          {
            title: t('happy-point:breadcrumbs.sell'),
            href: CustomUrlUtil('/settings/finance/happy-point/sell', router.locale)
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
                    {t('happy-point:sell.title')}
                  </Title>
                </Col>
                <Row gutter={8} align="middle">
                  <Col>
                    <Text className={styles.balanceLabel}>{t('happy-point:common.remain')}</Text>
                  </Col>
                  <Col>
                    <Text className={styles.balanceValue}>
                      {HelperDecimalFormatUtil(happyPointBalance, 2)}
                    </Text>
                  </Col>
                  <Col>
                    <Text className={styles.balanceUnit}>{t('happy-point:common.happyPoint')}</Text>
                  </Col>
                </Row>
              </Row>
              <Row className="w-100">
                <Col xs={24}>
                  <HappyPointForm
                    parentForm={form}
                    onSubmit={onSubmit}
                    formType={HappyPointTypeEnum.SELL}
                    eWalletBalance={wallet?.balance}
                    happyPointBalance={happyPointBalance}
                    rateBahtPerHappyPoint={configLookup?.exchangeRate}
                  />
                </Col>
                <Col xs={24}>
                  <Row className="mt-5" gutter={[24, 0]} align="middle">
                    <Col span={12}>
                      <Button type="text" onClick={onCancelClick} block>
                        {t('common:cancel')}
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" onClick={form.submit} block>
                        {t('common:confirm')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* TODO: wait type otp verify */}
          <OtpModal
            action={OtpTypeEnum.REGISTER}
            mobile={user?.mobile}
            isOpen={isOtpOpen}
            toggle={toggleOtpOpen}
            onSubmit={onOtpSuccess}
          />
        </div>
      </div>
    </main>
  )
}

export default HappyPointSell
