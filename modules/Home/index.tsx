import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import MainSidebar from './components/MainSidebar'
import Banner from './components/Banner'
import Promotion from './components/Promotion'
import Brand from './components/Brand'
import ProductCard from '~/components/main/ProductCard'
import { LocaleNamespaceConst } from '~/constants'
import styles from './Home.module.scss'

const { Title, Link } = Typography

const Home: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'home'])

  return (
    <div className="main mt-4 mb-4">
      <Helmet>
        <title>{t('home:title')}</title>
      </Helmet>
      <Title className="d-none" level={1}>
        {t('home:title')}
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
              <div className="mb-8">
                <Row className={styles.header} align="middle">
                  <Col span={16}>
                    <Title className={styles.title} level={3}>
                      {t('product:card.title')}
                    </Title>
                  </Col>
                  <Col className="text-right" span={8}>
                    <Link href="#">
                      <a className="hps-link">{t('common:viewAll')}</a>
                    </Link>
                  </Col>
                </Row>
                <ProductCard />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home
