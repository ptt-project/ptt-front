import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import PromotionList from '../PromotionList'
import PromotionFormSearch from '../PromotionFormSearch'
import { LocaleNamespaceConst } from '~/constants'
import styles from './PromotionTabs.module.scss'

const { TabPane } = Tabs

const PromotionTabs: FC = () => {
  function onChange(key: string): void {
    console.log(key)
  }
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.marketing:tabs.all')} key="1">
        <PromotionFormSearch />
        <PromotionList />
      </TabPane>
      <TabPane tab={t('seller.marketing:tabs.inProgress')} key="2">
        <PromotionFormSearch />
        <PromotionList />
      </TabPane>
      <TabPane tab={t('seller.marketing:tabs.expired')} key="3">
        <PromotionFormSearch />
        <PromotionList />
      </TabPane>
    </Tabs>
  )
}

export default PromotionTabs
