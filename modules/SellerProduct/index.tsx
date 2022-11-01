import React, { FC, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import ProductFilters from './components/ProductFilters'
import ProductTabs from './components/ProductTabs'
import Loading from '../../components/main/Loading'
import styles from './SellerProduct.module.scss'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Button, Progress } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { CustomUrlUtil } from '../../utils/main'
import { IListItems, IProduct } from '../../interfaces'
import { ShopService } from '../../services'

const { Text, Title } = Typography

interface ISellerProductProps {
  products: IListItems<IProduct>
  query: {
    keyword: string
    categoryId: string
    groupSearch: string
    approval: boolean
    status?: string
    page: number
  }
}

const SellerProduct: FC<ISellerProductProps> = (props: ISellerProductProps) => {
  const router: NextRouter = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<IListItems<IProduct>>(props.products)
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true)

      const { data } = await ShopService.getProducts()

      setProducts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

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
          { title: t('seller.product:list.myProduct') }
        ]}
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Row className="mb-3" align="middle">
                <Col xs={20}>
                  <Title className={`${styles.h4} ${styles.textSecondary}`} level={4}>
                    {t('seller.product:list.product')} {products.meta.totalItems}{' '}
                    {t('seller.product:list.list')}
                  </Title>
                  <div className={styles.progress}>
                    <Progress percent={10} showInfo={false} size="small" strokeColor="#239CD7" />
                  </div>
                  <Text type="secondary">
                    {t('seller.product:list.uploadProduct')} {1000 - products.meta.totalItems}{' '}
                    {t('seller.product:list.items')}
                  </Text>
                </Col>
                <Col xs={4}>
                  <div className={styles.addNewProduct}>
                    <Button
                      type="primary"
                      href={CustomUrlUtil('/seller/settings/product/add', router.locale)}
                    >
                      <i className="fas fa-plus mr-1" />
                      {t('seller.product:list.addNewProduct')}
                    </Button>
                  </div>
                </Col>
              </Row>
              <ProductFilters query={props.query} />
              <ProductTabs products={products} query={props.query} fetch={fetchData} />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerProduct
