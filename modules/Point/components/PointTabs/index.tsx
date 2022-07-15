import React, { FC } from 'react'
import { Tabs } from 'antd'
import PointDetail from '../PointDetail'
import t from '~/locales'

const { TabPane } = Tabs

function onChange(key: string): void {
  console.log(key)
}
const PointTabs: FC = () => (
  <Tabs defaultActiveKey="1" onChange={onChange}>
    <TabPane tab={t('shopPoint.all')} key="1">
      <PointDetail />
    </TabPane>
    <TabPane tab={t('shopPoint.waitingForReply')} key="2">
      <PointDetail />
    </TabPane>
    <TabPane tab={t('shopPoint.replied')} key="3">
      <PointDetail />
    </TabPane>
  </Tabs>
)

export default PointTabs
