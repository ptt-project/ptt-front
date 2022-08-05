import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import List from '../List'
import styles from './SellerMyProductsTabs.module.scss'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}

const SellerMyProductTabs: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.product:list.all')} key="1">
        <List />
      </TabPane>
      <TabPane tab={t('seller.product:list.waitingForApprove')} key="2">
        <List />
      </TabPane>
      <TabPane tab={t('seller.product:list.selling')} key="3">
        <List />
      </TabPane>
      <TabPane tab={t('seller.product:list.soldOut')} key="4">
        <List />
      </TabPane>
      <TabPane tab={t('seller.product:list.notPublished')} key="5">
        <List />
      </TabPane>
    </Tabs>
  )
}

export default SellerMyProductTabs
