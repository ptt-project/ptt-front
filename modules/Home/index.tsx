import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import MainSidebar from '~/components/main/MainSidebar'
import Banner from './components/Banner'
import NewsletterSection from '~/components/partials/home/newsletter-section'
import BrandSection from '~/components/partials/home/brand-section'
import t from '~/locales'
import styles from './Home.module.scss'

const { Text, Title } = Typography

const Home: FC = () => {
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
              <Banner />
              <NewsletterSection />
              <BrandSection />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home
