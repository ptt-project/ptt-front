import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import MainSidebar from '~/components/main/MainSidebar'
import Banner from './components/Banner'
import Promotion from './components/Promotion'
import Brand from './components/Brand'
import styles from './Home.module.scss'

const { Text, Title } = Typography

const Home: FC = () => {
  const { t } = useTranslation('common')
  const router: NextRouter = useRouter()

  return (
    <div className="main mt-lg-4 mb-4">
      <Helmet>
        <title>{t('home.title')}</title>
      </Helmet>
      <Title className="d-none" level={1}>
        {t('home.title')}
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col xl={6}>
              <MainSidebar />
            </Col>
            <Col xl={18} md={24}>
              <div className="mb-8">
                <Banner />
              </div>
              <div className="mb-8">
                <Promotion />
              </div>
              <div className="mb-8">
                <Brand />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home
