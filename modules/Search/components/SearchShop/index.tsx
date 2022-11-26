import React, { FC, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import Image from '../../../../components/main/Image'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import ShopCard from '~/components/main/ShopCard'
import styles from './SearchShop.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Col, Row, Space, Typography } from 'antd'
import { LocaleNamespaceConst } from '../../../../constants'

const { Title, Text } = Typography

const SearchShop: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search', 'shop'])
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
          {t('common:meta.title')} | {t('search:searchShop.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('search:title'), href: `/search?keyword=${keyword}` },
          { title: t('search:searchShop.title') }
        ]}
      />
      <Title className="d-none" level={1}>
        {t('search:searchShop.title')}
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col xl={6}>
              <Image src="./images/main/buyer/search-shop.png" alt="search shop" ratio={2 / 3} />
            </Col>
            <Col xl={18} md={24}>
              <Title className={styles.title} level={4}>
                <Space size="middle">
                  <Text className={styles.icon}>
                    <i className="fas fa-store" />
                  </Text>
                  <Text>{`${t('search:shop.title')} "${keyword || t('common:all')}"`}</Text>
                </Space>
              </Title>
              <ShopCard showOptions />
              <ShopCard showOptions />
              <ShopCard showOptions />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default SearchShop
