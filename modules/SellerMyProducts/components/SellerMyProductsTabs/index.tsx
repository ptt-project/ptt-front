import React, { FC } from 'react'
import { Tabs } from 'antd'
import t from '~/locales'
import List from '../List'
import styles from './SellerMyProductsTabs.module.scss'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}

const SellerMyProductTabs: FC = () => (
  <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
    <TabPane tab={t('sellerProducts.list.all')} key="1">
      <List/>
    </TabPane>
    <TabPane tab={t('sellerProducts.list.waitingForApprove')} key="2">
      <List/>
    </TabPane>
    <TabPane tab={t('sellerProducts.list.selling')} key="3">
      <List/>
    </TabPane>
    <TabPane tab={t('sellerProducts.list.soldOut')} key="4">
      <List/>
    </TabPane>
    <TabPane tab={t('sellerProducts.list.notPublished')} key="5">
      <List/>
    </TabPane>
  </Tabs>
)

export default SellerMyProductTabs
