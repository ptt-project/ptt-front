import React, { FC } from 'react'
import { Tabs } from 'antd'
import Review from '../Review'
import t from '~/locales'
import styles from './SellerPointTabs.module.scss'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}

const SellerPointTabs: FC = () => (
  <Tabs className={`${styles.tabs} hps-overflow`} defaultActiveKey="1" onChange={onChange}>
    <TabPane tab={t('sellerPoint.all')} key="1">
      <Review />
    </TabPane>
    <TabPane tab={t('sellerPoint.waitingForReply')} key="2">
      <Review />
    </TabPane>
    <TabPane tab={t('sellerPoint.replied')} key="3">
      <Review />
    </TabPane>
  </Tabs>
)

export default SellerPointTabs
