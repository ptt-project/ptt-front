import { Col, DatePicker, Row, Space, Tabs, Typography } from 'antd'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useState } from 'react'
import { RangePickerProps } from 'antd/es/date-picker'
import { LocaleNamespaceConst } from '~/constants'
import styles from './EWalletHistory.module.scss'
import EWalletHistoryTable from './EWalletHistoryTable'
import { EWalletTypeEnum } from '~/enums'

const { Text } = Typography

enum EWalletHistoryTabsEnum {
  ALL = 'all',
  WITHDRAW = 'withdraw',
  TOP_UP = 'top_up'
}

const EWalletHistory: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const [tabActive, setTabActive] = useState<EWalletHistoryTabsEnum>(EWalletHistoryTabsEnum.ALL)
  const [startDate, setStartDate] = useState<moment.Moment>()
  const [endDate, setEndDate] = useState<moment.Moment>()

  function onTabChange(tabKey: EWalletHistoryTabsEnum): void {
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
          <Text>{t('e-wallet:history.filterDateRange')}</Text>
          <DatePicker.RangePicker
            className="w-100"
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')]
            }}
            format="YYYY/MM/DD"
            onChange={onFilterChange}
            disabledDate={(date: moment.Moment): boolean => date.isAfter(moment(), 'date')}
          />
        </Space>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey={tabActive} onChange={onTabChange}>
          <Tabs.TabPane tab={t('e-wallet:history.all')} key={EWalletHistoryTabsEnum.ALL}>
            <EWalletHistoryTable startDate={startDate} endDate={endDate} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('e-wallet:history.withdraw')} key={EWalletHistoryTabsEnum.TOP_UP}>
            <EWalletHistoryTable
              type={EWalletTypeEnum.DEPOSIT}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('e-wallet:history.topUp')} key={EWalletHistoryTabsEnum.WITHDRAW}>
            <EWalletHistoryTable
              type={EWalletTypeEnum.WITHDRAW}
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
