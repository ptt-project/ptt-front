import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button, Progress } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SellerMyProductsFilters from './components/SellerMyProductsFilters'
import SellerMyProductsTabs from './components/SellerMyProductsTabs'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import styles from './SellerMyProducts.module.scss'

const { Text, Title } = Typography

const SellerMyProduct: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const router: NextRouter = useRouter()
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.product:list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.product:list.product') },
          { title: t('seller.product:list.myProduct'), href: '/seller/settings/product/list' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
              <Row className="mb-3" align="middle">
                <Col xs={20}>
                  <Title className={`${styles.h4} ${styles.textSecondary}`} level={4}>
                    {t('seller.product:list.product')} 5 {t('seller.product:list.list')}
                  </Title>
                  <div className={styles.progress}>
                    <Progress percent={10} showInfo={false} size="small" />
                  </div>
                  <Text type="secondary">
                    {t('seller.product:list.uploadProduct')} 999 {t('seller.product:list.items')}
                  </Text>
                </Col>
                <Col xs={4}>
                  <div className={styles.addNewProduct}>
                    <Link href={CustomUrlUtil('/seller/settings/product/add-list', router.locale)}>
                      <Button type="primary">
                        <i className="fas fa-plus mr-1" />
                        {t('seller.product:list.addNewProduct')}
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <SellerMyProductsFilters />
              <SellerMyProductsTabs />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerMyProduct
