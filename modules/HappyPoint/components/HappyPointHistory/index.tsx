import { Col, DatePicker, Row, Space, Tabs, Typography } from 'antd'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useState } from 'react'
import { RangePickerProps } from 'antd/es/date-picker'
import { LocaleNamespaceConst } from '~/constants'
import styles from './HappyPointHistory.module.scss'
import HappyPointHistoryTable from './HappyPointHistoryTable'
import { happyPointHistory } from '../../mock-data'
import { IHappyPointHistoryData } from '~/interfaces'
import { HappyPointTypeEnum } from '~/enums'

const { Text } = Typography

enum HappyPointHistoryTabsEnum {
  ALL = 'all',
  BUY = 'buy',
  SELL = 'sell',
  TRANSFER = 'transfer'
}

const EWalletHistory: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])
  const [tabActive, setTabActive] = useState<HappyPointHistoryTabsEnum>(
    HappyPointHistoryTabsEnum.ALL
  )

  function onTabChange(tabKey: HappyPointHistoryTabsEnum): void {
    setTabActive(tabKey)
  }

  function onFilterChange<T extends Parameters<RangePickerProps['onChange']>>(...args: T): void {
    const [values] = args
    console.log({ values })
  }

  return (
    <Row className={styles.layout} justify="space-between" align="middle" gutter={[0, 16]}>
      <Col xs={24} className={styles.filterLayout}>
        <Space className="w-100" direction="vertical" size={8}>
          <Text>{t('happy-point:history.filterDateRange')}</Text>
          <DatePicker.RangePicker
            className="w-100"
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')]
            }}
            format="YYYY/MM/DD"
            onChange={onFilterChange}
          />
        </Space>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey={tabActive} onChange={onTabChange}>
          <Tabs.TabPane tab={t('happy-point:history.all')} key={HappyPointHistoryTabsEnum.ALL}>
            <HappyPointHistoryTable data={happyPointHistory} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('happy-point:history.buy')} key={HappyPointHistoryTabsEnum.BUY}>
            <HappyPointHistoryTable
              data={happyPointHistory.filter(
                (e: IHappyPointHistoryData) => e.type === HappyPointTypeEnum.BUY
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('happy-point:history.sell')} key={HappyPointHistoryTabsEnum.SELL}>
            <HappyPointHistoryTable
              data={happyPointHistory.filter(
                (e: IHappyPointHistoryData) => e.type === HappyPointTypeEnum.SELL
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={t('happy-point:history.transfer')}
            key={HappyPointHistoryTabsEnum.TRANSFER}
          >
            <HappyPointHistoryTable
              data={happyPointHistory.filter(
                (e: IHappyPointHistoryData) => e.type === HappyPointTypeEnum.TRANSFER
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default EWalletHistory
