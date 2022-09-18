import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Space, message } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Loading from '~/components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import { IOtp, IMemberMobile } from '~/interfaces'
import { CustomUrlUtil } from '~/utils/main'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import { OtpTypeEnum } from '~/enums'
import { MemberService } from '~/services'
import styles from './ProfilePhone.module.scss'

const { Text } = Typography

const Phone: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const router: NextRouter = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDelPhoneModal, setIsOpenDelPhoneModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataMobile, setDataMobile] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function toggleDelPhoneModal(): void {
    setIsOpenDelPhoneModal(!isOpenDelPhoneModal)
  }

  function onSetMobile(mobile: string, type: string): void {
    setDataMobile(mobile)
    if (type === 'main') {
      toggle()
    } else {
      setIsOpenDelPhoneModal(true)
    }
  }

  async function onSubmit(otpData: IOtp): Promise<void> {
    if (!otpData) {
      toggle()
    }

    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IMemberMobile = {
        mobile: dataMobile,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      }
      console.log(payload)
      await MemberService.setMainMobile(payload)
      isSuccess = true
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

  async function onRemove(otpData: IOtp): Promise<void> {
    if (!otpData) {
      toggle()
    }
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IMemberMobile = {
        mobile: dataMobile,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      }
      console.log(payload)
      await MemberService.deleteMobile(payload)
      isSuccess = true
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

  return (
    <>
      <Loading show={isLoading} />
      <OtpModal
        mobile={dataMobile}
        action={OtpTypeEnum.REGISTER}
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        isOpen={isOpenDelPhoneModal}
        toggle={toggleDelPhoneModal}
        type="error"
        title={t('account-info:phone.deletePhone')}
        content={`${t('account-info:phone.confirmDelete')}${dataMobile}`}
        contentWarning={t('account-info:phone.msgConfirmDelete')}
        onSubmit={onRemove}
      />
      <main className="main">
        <Helmet>
          <title>
            {t('common:meta.title')} | {t('account-info:phone.titleEdit')}
          </title>
        </Helmet>
        <Breadcrumbs
          items={[
            { title: t('account-info:setting') },
            { title: t('account-info:title') },
            { title: t('account-info:personalInfo'), href: '/settings/account/info' },
            { title: t('account-info:phone.titleEdit'), href: '/settings/account/info/phone' }
          ]}
        />
        <div className="page-content mb-9">
          <div className="container">
            <Row gutter={48}>
              <Col xl={6}>
                <SettingSidebar sidebarType="buyer" />
              </Col>
              <Col xs={24} xl={18} lg={24}>
                <Text>
                  <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                    {t('account-info:phone.titleEdit')}
                  </h4>
                </Text>
                <Row>
                  <Col md={12}>
                    <HighlightLabel title={t('account-info:phone.phoneList')} />
                  </Col>
                  <Col md={12} xs={18} className="text-right">
                    <Link href={CustomUrlUtil('/settings/account/info/add-phone', router.locale)}>
                      <Button className="hps-btn-secondary mt-3">
                        <i className="fas fa-plus mr-2" />
                        {t('account-info:button.addPhone')}
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row className={styles.highlight}>
                  <Col md={{ span: 6, offset: 2 }}>
                    <Text className={`mr-2 ${styles.textPrimary}`}>081-111-1111</Text>
                    <Button>
                      <i className="fas fa-star mr-2" />
                      {t('account-info:button.mainNumber')}
                    </Button>
                  </Col>
                </Row>
                <Row className={styles.phoneListWrapper}>
                  <Col sm={{ span: 12, offset: 2 }} xs={12}>
                    <Text className={`${styles.textPrimary}`}>081-111-2222</Text>
                  </Col>
                  <Col sm={8} xs={12} className="text-right">
                    <Space size="middle">
                      <a onClick={(): void => onSetMobile('0647012666', 'main')} aria-hidden="true">
                        <i className="fas fa-star" />
                      </a>
                      <a
                        onClick={(): void => onSetMobile('0647012666', 'delete')}
                        aria-hidden="true"
                      >
                        <i className="fas fa-trash-alt" />
                      </a>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  )
}

export default Phone
