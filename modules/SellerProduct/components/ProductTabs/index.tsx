import React, { FC, useState } from 'react'
import ProductList from '../ProductList'
import styles from './ProductTabs.module.scss'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IListItems, IProduct } from '../../../../interfaces'
import { NextRouter, useRouter } from 'next/router'
import { ProductStatusEnum } from '../../../../enums'

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
  param?: any // FIXME debug
  fetch: () => Promise<void>
}

const ProductTabs: FC<IProductTabsProps> = (props: IProductTabsProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [activeTab, setActiveTab] = useState<string>(getActiveTab())

  console.log('param', props.param) // FIXME debug

  function getActiveTab(): string {
    const { query } = router

    if (query.approval === 'false' && !query.status) {
      return '2'
    }

    if (query.approval === 'true' && query.status === ProductStatusEnum.PUBLIC) {
      return '3'
    }

    if (query.approval === 'true' && query.status === ProductStatusEnum.OUT_OF_STOCK) {
      return '4'
    }

    if (query.approval === 'true' && query.status === ProductStatusEnum.HIDDEN) {
      return '5'
    }

    return '1'
  }

  function onChange(key: string): void {
    setActiveTab(key)

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
            approval: true,
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
            approval: true,
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
            approval: true,
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
    <Tabs
      className={`${styles.tabs} hps-scroll`}
      items={[
        {
          label: t('seller.product:list.all'),
          key: '1',
          children: <ProductList products={props.products} fetch={props.fetch} />
        },
        {
          label: t('seller.product:list.waitingForApprove'),
          key: '2',
          children: <ProductList products={props.products} fetch={props.fetch} />
        },
        {
          label: t('seller.product:list.selling'),
          key: '3',
          children: <ProductList products={props.products} fetch={props.fetch} />
        },
        {
          label: t('seller.product:list.soldOut'),
          key: '4',
          children: <ProductList products={props.products} fetch={props.fetch} />
        },
        {
          label: t('seller.product:list.notPublished'),
          key: '5',
          children: <ProductList products={props.products} fetch={props.fetch} />
        }
      ]}
      activeKey={activeTab}
      onChange={onChange}
    />
  )
}

export default ProductTabs
