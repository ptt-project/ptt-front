import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Tabs } from 'antd'
import VoucherList from '../VoucherList'
import { LocaleNamespaceConst } from '~/constants'
import styles from './VoucherTabs.module.scss'

const { TabPane } = Tabs

const VoucherTabs: FC = () => {
  function onChange(key: string): void {
    console.log(key)
  }
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  return (
    <Tabs className={`${styles.tabs} hps-scroll`} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab={t('seller.marketing:tabs.all')} key="1">
        <VoucherList />
      </TabPane>
      <TabPane tab={t('seller.marketing:tabs.inProgress')} key="2">
        <VoucherList />
      </TabPane>
      <TabPane tab={t('seller.marketing:tabs.expired')} key="3">
        <VoucherList />
      </TabPane>
    </Tabs>
  )
}

export default VoucherTabs
