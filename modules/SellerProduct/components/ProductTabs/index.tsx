import React, { FC } from 'react'
import ProductList from '../ProductList'
import styles from './ProductTabs.module.scss'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IListItems, IProduct } from '../../../../interfaces'
import { NextRouter, useRouter } from 'next/router'
import { ProductStatusEnum } from '../../../../enums'

const { TabPane } = Tabs

interface IProductTabsProps {
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

const ProductTabs: FC<IProductTabsProps> = (props: IProductTabsProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  function onChange(key: string): void {
    switch (key) {
      case '1':
        router.push({
          pathname: '/seller/settings/product/list',
          query: {
            keyword: props.query.keyword,
            categoryId: props.query.categoryId,
            groupSearch: props.query.groupSearch,
            page: 1
          }
        })
        break
      case '2':
        router.push({
          pathname: '/seller/settings/product/list',
          query: {
            keyword: props.query.keyword,
            categoryId: props.query.categoryId,
            groupSearch: props.query.groupSearch,
            approval: false,
            page: 1
          }
        })
        break
      case '3':
        router.push({
          pathname: '/seller/settings/product/list',
          query: {
            keyword: props.query.keyword,
            categoryId: props.query.categoryId,
            groupSearch: props.query.groupSearch,
            status: ProductStatusEnum.PUBLIC,
            page: 1
          }
        })
        break
      case '4':
        router.push({
          pathname: '/seller/settings/product/list',
          query: {
            keyword: props.query.keyword,
            categoryId: props.query.categoryId,
            groupSearch: props.query.groupSearch,
            status: ProductStatusEnum.OUT_OF_STOCK,
            page: 1
          }
        })
        break
      case '5':
        router.push({
          pathname: '/seller/settings/product/list',
          query: {
            keyword: props.query.keyword,
            categoryId: props.query.categoryId,
            groupSearch: props.query.groupSearch,
            status: ProductStatusEnum.HIDDEN,
            page: 1
          }
        })
        break
      default:
        break
    }
  }

  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.product:list.all')} key="1">
        <ProductList products={props.products} />
      </TabPane>
      <TabPane tab={t('seller.product:list.waitingForApprove')} key="2">
        <ProductList products={props.products} />
      </TabPane>
      <TabPane tab={t('seller.product:list.selling')} key="3">
        <ProductList products={props.products} />
      </TabPane>
      <TabPane tab={t('seller.product:list.soldOut')} key="4">
        <ProductList products={props.products} />
      </TabPane>
      <TabPane tab={t('seller.product:list.notPublished')} key="5">
        <ProductList products={props.products} />
      </TabPane>
    </Tabs>
  )
}

export default ProductTabs
