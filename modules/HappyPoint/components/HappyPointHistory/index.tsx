import { Col, DatePicker, Row, Space, Tabs, Typography } from 'antd'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useState } from 'react'
import { RangePickerProps } from 'antd/es/date-picker'
import { LocaleNamespaceConst } from '~/constants'
import styles from './HappyPointHistory.module.scss'
import HappyPointHistoryTable from './HappyPointHistoryTable'
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
  const [startDate, setStartDate] = useState<moment.Moment>()
  const [endDate, setEndDate] = useState<moment.Moment>()

  function onTabChange(tabKey: HappyPointHistoryTabsEnum): void {
    setTabActive(tabKey)
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  const onFilterChange = useCallback(
    <T extends Parameters<RangePickerProps['onChange']>>(...args: T): void => {
      const [values] = args
      const [valueStartDate, valueEndDate] = values || []
      setStartDate(valueStartDate)
      setEndDate(valueEndDate)
    },
    []
  )

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
            <HappyPointHistoryTable startDate={startDate} endDate={endDate} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('happy-point:history.buy')} key={HappyPointHistoryTabsEnum.BUY}>
            <HappyPointHistoryTable
              filter={HappyPointTypeEnum.BUY}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('happy-point:history.sell')} key={HappyPointHistoryTabsEnum.SELL}>
            <HappyPointHistoryTable
              filter={HappyPointTypeEnum.SELL}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={t('happy-point:history.transfer')}
            key={HappyPointHistoryTabsEnum.TRANSFER}
          >
            <HappyPointHistoryTable
              filter={HappyPointTypeEnum.TRANSFER}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default EWalletHistory
