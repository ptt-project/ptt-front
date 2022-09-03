import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import ProductList from '../ProductList'
import styles from './ProductTabs.module.scss'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}

const ProductTabs: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.product:list.all')} key="1">
        <ProductList />
      </TabPane>
      <TabPane tab={t('seller.product:list.waitingForApprove')} key="2">
        <ProductList />
      </TabPane>
      <TabPane tab={t('seller.product:list.selling')} key="3">
        <ProductList />
      </TabPane>
      <TabPane tab={t('seller.product:list.soldOut')} key="4">
        <ProductList />
      </TabPane>
      <TabPane tab={t('seller.product:list.notPublished')} key="5">
        <ProductList />
      </TabPane>
    </Tabs>
  )
}

export default ProductTabs
