import React, { FC, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import OtpModal from '~/components/main/OtpModal'
import DelPhoneModal from './DelPhoneModal'
import t from '~/locales'
import { IOtpData } from '~/model/Common'
import { CustomUrl } from '~/utils/main'
import styles from './ProfilePhone.module.scss'

const { Text } = Typography

const Phone: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDelPhoneModal, setIsOpenDelPhoneModal] = useState<boolean>(false)
  function toggle(): void {
    setIsOpen(!isOpen)
  }
  function toggleDelPhoneModal(): void {
    setIsOpenDelPhoneModal(!isOpenDelPhoneModal)
  }
  function onDelPhoneModal() {
    setIsOpenDelPhoneModal(true)
  }
  function onFavoritePhone() {
    setIsOpen(true)
  }
  function onSubmit(otpData: IOtpData): void {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  const router: NextRouter = useRouter()
  return (
    <>
      <OtpModal mobileNo="12346" isOpen={isOpen} toggle={toggle} onSubmit={onSubmit} />
      <DelPhoneModal
        isOpen={isOpenDelPhoneModal}
        toggle={toggleDelPhoneModal}
        type="danger success info warning"
        content="test"
      />
      <main className="main account">
        <Helmet>
          <title>
            {t('meta.title')} | {t('accountProfile.form.title')}
          </title>
        </Helmet>
        <nav className="breadcrumb-nav">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <Link href={CustomUrl.href('/', router.locale)}>
                  <i className="d-icon-home" />
                </Link>
              </li>
              <li disabled>{t('accountProfile.form.setting')}</li>
              <li disabled>{t('accountProfile.form.title')}</li>
              <li>
                <Link href={CustomUrl.href('/settings/account/info', router.locale)}>
                  {t('accountProfile.form.personalInfo')}
                </Link>
              </li>
              <li>
                <Link href={CustomUrl.href('/settings/account/info/phone', router.locale)}>
                  {t('accountProfile.phone.titleEdit')}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="page-content mb-9">
          <div className="container">
            <Row gutter={48}>
              <Col xl={6} lg={0}>
                <SettingSidebar />
              </Col>
              <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
                <Text>
                  <h4 className={`text-center mb-5 ${styles.textPrimary}`}>
                    {t('accountProfile.phone.titleEdit')}
                  </h4>
                </Text>
                <Row gutter={[16, 8]}>
                  <Col md={12} xs={12}>
                    <Text className={styles.textPrimary}>
                      {t('accountProfile.phone.phoneList')}
                    </Text>
                  </Col>
                  <Col md={12} xs={12} className="text-right">
                    <Link href="/settings/account/info/add-phone">
                      <Button className={styles.textPrimary}>
                        <i className={`fas fa-plus ${styles.paddingRight5}`} />
                        {t('accountProfile.button.addPhone')}
                      </Button>
                    </Link>
                  </Col>
                  <Col span={24} className="alert alert-message alert-light alert-primary">
                    <Text className={`${styles.textUnderline} ${styles.paddingRight5}`}>
                      081-111-1111
                    </Text>
                    <Button>
                      <i className={`fas fa-star ${styles.paddingRight5}`} />
                      {t('accountProfile.button.mainNumber')}
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Text className={`${styles.textUnderline} ${styles.paddingRight5}`}>
                      081-111-2222
                    </Text>
                  </Col>
                  <Col span={12} className="text-right">
                    <i
                      className={`fas fa-star ${styles.paddingRight5}`}
                      onClick={onFavoritePhone}
                    />
                    <i
                      className={`fas fa-trash-alt ${styles.paddingRight5}`}
                      onClick={onDelPhoneModal}
                    />
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
