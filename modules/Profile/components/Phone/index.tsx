import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Space, message } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Loading from '~/components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import { IOtp, IMemberMobile, IMemberMobilePayload } from '~/interfaces'
import { CustomUrlUtil, HelperMobileFormat } from '~/utils/main'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import { OtpTypeEnum } from '~/enums'
import { MemberService } from '~/services'
import styles from './ProfilePhone.module.scss'

const { Text } = Typography

interface IMemberMobileProps {
  mobile: IMemberMobile
}
const Phone: FC<IMemberMobileProps> = (props: IMemberMobileProps) => {
  console.log(props.mobile)
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const router: NextRouter = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDelPhoneModal, setIsOpenDelPhoneModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataMobile, setDataMobile] = useState<string>('')
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [dataMainMobile, setDataMainMobile] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function toggleDelete(): void {
    setIsOpenDelete(!isOpen)
  }

  function onConfirmDelete(): void {
    setIsOpenDelPhoneModal(false)
    setIsOpenDelete(true)
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
    try {
      const payload: IMemberMobilePayload = {
        mobile: dataMobile,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      }
      await MemberService.setMainMobile(payload)
      setIsOpen(false)
      router.push('/settings/account/info/phone')
    } catch (error) {
      console.log(error)
    }
  }

  async function onRemove(otpData: IOtp): Promise<void> {
    try {
      const payload: IMemberMobilePayload = {
        mobile: dataMobile,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      }
      console.log(payload)
      await MemberService.deleteMobile(payload)
    } catch (error) {
      console.log(error)
    }
  }

  function getMobileMain(mobileList: IMemberMobile): void {
    const mainMobile: string = mobileList.filter((item: IMemberMobile): string => {
      if (item.isPrimary === true) {
        return item.mobile
      }
    })
    console.log(mainMobile)
    setDataMainMobile(mainMobile[0].mobile)
  }

  async function fetchData(): Promise<void> {
    try {
      await MemberService.getMobile()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMobileMain(props.mobile)
    console.log('dataMainMobile=', dataMainMobile)
    fetchData()
  }, [])
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
      <OtpModal
        mobile={dataMainMobile}
        action={OtpTypeEnum.REGISTER}
        isOpen={isOpenDelete}
        toggle={toggleDelete}
        onSubmit={onRemove}
      />
      <ConfirmationModal
        isOpen={isOpenDelPhoneModal}
        toggle={toggleDelPhoneModal}
        type="error"
        title={t('account-info:phone.deletePhone')}
        content={`${t('account-info:phone.confirmDelete')}${dataMobile}`}
        contentWarning={t('account-info:phone.msgConfirmDelete')}
        onSubmit={onConfirmDelete}
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
                {props.mobile?.map((item: IMemberMobile) =>
                  item.isPrimary ? (
                    <Row className={styles.highlight}>
                      <Col md={{ span: 6, offset: 2 }}>
                        <Text className={`mr-2 ${styles.textPrimary}`}>
                          {HelperMobileFormat(item.mobile)}
                        </Text>
                        <Button>
                          <i className="fas fa-star mr-2" />
                          {t('account-info:button.mainNumber')}
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row className={styles.phoneListWrapper}>
                      <Col sm={{ span: 12, offset: 2 }} xs={12}>
                        <Text className={`${styles.textPrimary}`}>
                          {HelperMobileFormat(item.mobile)}
                        </Text>
                      </Col>
                      <Col sm={8} xs={12} className="text-right">
                        <Space size="middle">
                          <a
                            onClick={(): void => onSetMobile(`${item.mobile}`, 'main')}
                            aria-hidden="true"
                          >
                            <i className="fas fa-star" />
                          </a>
                          <a
                            onClick={(): void => onSetMobile(`${item.mobile}`, 'delete')}
                            aria-hidden="true"
                          >
                            <i className="fas fa-trash-alt" />
                          </a>
                        </Space>
                      </Col>
                    </Row>
                  )
                )}
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  )
}

export default Phone
