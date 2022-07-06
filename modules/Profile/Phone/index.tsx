import React, { FC, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import OtpModal from '~/components/main/OtpModal'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import t from '~/locales'
import { IOtpData } from '~/model/Common'
import { CustomUrl } from '~/utils/main'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './ProfilePhone.module.scss'

const { Text } = Typography

const Phone: FC = () => {
  const router: NextRouter = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDelPhoneModal, setIsOpenDelPhoneModal] = useState<boolean>(false)

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function toggleDelPhoneModal(): void {
    setIsOpenDelPhoneModal(!isOpenDelPhoneModal)
  }

  function onDelPhoneModal(): void {
    setIsOpenDelPhoneModal(true)
  }

  function onFavoritePhone(): void {
    setIsOpen(true)
  }

  function onSubmit(otpData: IOtpData): void {
    try {
      console.log(otpData)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <OtpModal mobileNo="12346" isOpen={isOpen} toggle={toggle} onSubmit={onSubmit} />
      <ConfirmationModal
        isOpen={isOpenDelPhoneModal}
        toggle={toggleDelPhoneModal}
        type="error"
        title={t('accountProfile.phone.deletePhone')}
        content={`${t('accountProfile.phone.confirmDelete')}081-2226666`}
        contentWarning={t('accountProfile.phone.msgConfirmDelete')}
      />
      <main className="main account">
        <Helmet>
          <title>
            {t('meta.title')} | {t('accountProfile.form.title')}
          </title>
        </Helmet>
        <Breadcrumbs
          items={[
            { title: t('accountProfile.form.setting') },
            { title: t('accountProfile.form.title') },
            { title: t('accountProfile.form.personalInfo'), href: '/settings/account/info' },
            { title: t('accountProfile.phone.titleEdit'), href: '/settings/account/info/phone' }
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
                    {t('accountProfile.phone.titleEdit')}
                  </h4>
                </Text>
                <Row>
                  <Col md={12}>
                    <Text className={styles.textSecondary}>
                      {t('accountProfile.phone.phoneList')}
                    </Text>
                  </Col>
                  <Col md={12} xs={19}>
                    <div className="text-right mb-5">
                    <Link href={CustomUrl.href('/settings/account/info/add-phone', router.locale)}>
                      <Button className={styles.textSecondary}>
                        <i className="fas fa-plus mr-2" />
                        {t('accountProfile.button.addPhone')}
                      </Button>
                    </Link>
                    </div>
                  </Col>
                </Row>
                <Row className={styles.highlight}>
                  <Col md={{ span: 6, offset: 2 }}>
                    <Text className={`mr-2 ${styles.textPrimary}`}>081-111-1111</Text>
                    <Button>
                      <i className="fas fa-star mr-2" />
                      {t('accountProfile.button.mainNumber')}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 6, offset: 2 }} xs={{ span: 12, offset: 1 }}>
                    <Text className={`${styles.textPrimary}`}>081-111-2222</Text>
                  </Col>
                  <Col md={13} xs={10}>
                    <div className="text-right">
                      <i className="fas fa-star mr-2" onClick={onFavoritePhone} />
                      <i className="fas fa-trash-alt mr-2" onClick={onDelPhoneModal} />
                    </div>
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
