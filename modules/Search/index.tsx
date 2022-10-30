import React, { useState, useEffect, FC } from 'react'
import Link from 'next/link'
import Helmet from 'react-helmet'
import SearchSidebar from './components/SearchSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import ProductCard from '~/components/main/ProductCard'
import ShopCard from '~/components/main/ShopCard'
import styles from './Search.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Col, Row, Typography, Select, Space } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Title, Text } = Typography

const Search: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search'])
  const router: NextRouter = useRouter()
  const [keyword, setKeyword] = useState<string>()

  function getKeyword(): string {
    return router?.query?.keyword ? router.query.keyword.toString() : ''
  }

  useEffect(() => {
    if (router?.query) {
      setKeyword(getKeyword())
    }
  }, [router.query])

  return (
    <div className="main mb-4">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('search:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('search:title') }]} />
      <Title className="d-none" level={1}>
        {t('search:title')}
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col xl={6}>
              <SearchSidebar />
            </Col>
            <Col xl={18} md={24}>
              <Row className={styles.header} align="middle">
                <Col span={16}>
                  <Title level={4}>
                    <Space size="middle">
                      <Text className={styles.icon}>
                        <i className="fas fa-store" />
                      </Text>
                      <Text>{`${t('search:shop.title')} "${keyword || t('common:all')}"`}</Text>
                    </Space>
                  </Title>
                </Col>
                <Col className="text-right" span={8}>
                  <Link href={`/search/shop?keyword=${keyword}`}>
                    <a className="hps-link">{t('common:viewAll')}</a>
                  </Link>
                </Col>
              </Row>
              <div className="mb-3">
                <ShopCard />
                <ShopCard />
              </div>
              <Row className={styles.header}>
                <Col>
                  <Title level={4}>
                    <Space size="middle">
                      <Text className={styles.icon}>
                        <i className="fas fa-box" />
                      </Text>
                      <Text>{`${t('search:product.title')} "${keyword || t('common:all')}"`}</Text>
                    </Space>
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className={styles.control}>
                    <Title className="d-inline-block mr-2" level={5}>
                      {t('search:product.sort')}:
                    </Title>
                    <Select style={{ width: '100%', maxWidth: 250 }}>
                      <Select.Option value="">{t('common:form.option')}</Select.Option>
                    </Select>
                  </div>
                </Col>
              </Row>
              <ProductCard />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Search
