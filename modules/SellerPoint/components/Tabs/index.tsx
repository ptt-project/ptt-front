import React, { FC } from 'react'
import { Tabs } from 'antd'
import Detail from '../Detail'
import t from '~/locales'
import styles from './Tabs.module.scss'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}

const PointTabs: FC = () => (
  <Tabs className={styles.reviewContainer} defaultActiveKey="1" onChange={onChange}>
    <TabPane tab={t('shopPoint.all')} key="1">
      <Detail />
    </TabPane>
    <TabPane tab={t('shopPoint.waitingForReply')} key="2">
      <Detail />
    </TabPane>
    <TabPane tab={t('shopPoint.replied')} key="3">
      <Detail />
    </TabPane>
  </Tabs>
)

export default PointTabs
