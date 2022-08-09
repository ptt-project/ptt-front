import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import Review from '../Review'
import { LocaleNamespaceConst } from '~/constants'
import styles from './SellerPointTabs.module.scss'

const { TabPane } = Tabs

const SellerPointTabs: FC = () => {
  function onChange(key: string): void {
    console.log(key)
  }
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.point'])
  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.point:all')} key="1">
        <Review />
      </TabPane>
      <TabPane tab={t('seller.point:waitingForReply')} key="2">
        <Review />
      </TabPane>
      <TabPane tab={t('seller.point:replied')} key="3">
        <Review />
      </TabPane>
    </Tabs>
  )
}

export default SellerPointTabs
