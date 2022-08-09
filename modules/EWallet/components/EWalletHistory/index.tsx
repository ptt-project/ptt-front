import { Col, DatePicker, message, Row, Space, Tabs, Typography } from 'antd'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import React, { FC, useState } from 'react'
import { RangePickerProps } from 'antd/es/date-picker'
import { LocaleNamespaceConst } from '~/constants'
import styles from './EWalletHistory.module.scss'
import EWalletHistoryTable from './EWalletHistoryTable'
import { eWalletHistory } from '../../mock-data'
import { EWalletTypeEnum } from '~/enums'
import { IEWalletHistoryData } from '~/interfaces'

const { Text } = Typography

enum EWalletHistoryTabsEnum {
  ALL = 'all',
  WITHDRAW = 'withdraw',
  TOP_UP = 'top_up'
}

const EWalletHistory: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const [tabActive, setTabActive] = useState<EWalletHistoryTabsEnum>(EWalletHistoryTabsEnum.ALL)

  function onTabChange(tabKey: EWalletHistoryTabsEnum): void {
    setTabActive(tabKey)
  }

  function onFilterChange<T extends Parameters<RangePickerProps['onChange']>>(...args: T): void {
    const [values] = args
    console.log({ values })
    message.info('top-up')
  }

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
          />
        </Space>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey={tabActive} onChange={onTabChange}>
          <Tabs.TabPane tab={t('e-wallet:history.all')} key={EWalletHistoryTabsEnum.ALL}>
            <EWalletHistoryTable data={eWalletHistory} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('e-wallet:history.withdraw')} key={EWalletHistoryTabsEnum.WITHDRAW}>
            <EWalletHistoryTable
              data={eWalletHistory.filter(
                (e: IEWalletHistoryData) => e.type === EWalletTypeEnum.WITHDRAW
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('e-wallet:history.topUp')} key={EWalletHistoryTabsEnum.TOP_UP}>
            <EWalletHistoryTable
              data={eWalletHistory.filter(
                (e: IEWalletHistoryData) => e.type === EWalletTypeEnum.TOP_UP
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default EWalletHistory
