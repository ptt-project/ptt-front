import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Col, DatePicker, Row, Typography } from 'antd'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import { LocaleNamespaceConst } from '../../../../../../constants'
import styles from './FlashSaleFilter.module.scss'

const { Text } = Typography

const FlashSaleFilter: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])

  function onChange(
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ): void {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  function onOk(value: DatePickerProps['value'] | RangePickerProps['value']): void {
    console.log('onOk: ', value)
  }

  return (
    <Row className={styles.filter}>
      <Col md={12} xs={24}>
        <Text className={styles.label}>{t('seller.marketing:flashSale.filter.label')}</Text>
        <DatePicker.RangePicker
          className={styles.picker}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          onOk={onOk}
        />
      </Col>
      <Col span={24}>
        <div className={styles.btnGroup}>
          <Button type="primary">{t('common:search')}</Button>
          <Button>{t('common:reset')}</Button>
        </div>
      </Col>
    </Row>
  )
}

export default FlashSaleFilter
