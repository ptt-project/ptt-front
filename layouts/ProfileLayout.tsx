/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { Col, Row } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import t from '~/locales'
import { CustomUrl } from '~/utils/main'

interface IProfileLayoutProps {
  children: ReactNode
}
const ProfileLayout: React.FC<IProfileLayoutProps> = (props: IProfileLayoutProps) => {
  const { children } = props
  const router: NextRouter = useRouter()

  return (
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
            <li>{t('accountProfile.form.setting')}</li>
            <li>{t('accountProfile.form.title')}</li>
            <li>
              <Link href={CustomUrl.href('/personal-info', router.locale)}>
                {t('accountProfile.form.personalInfo')}
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
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ProfileLayout
