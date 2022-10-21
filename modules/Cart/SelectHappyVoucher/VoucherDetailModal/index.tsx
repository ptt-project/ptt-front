/* eslint-disable @typescript-eslint/typedef */
import React, { FC, ReactNode, useCallback } from 'react'
import { Col, Modal, Row, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { LocaleNamespaceConst } from '~/constants'
import styles from './VoucherDetailModal.module.scss'
import VoucherCard, { IVoucher } from '../VoucherCard'

interface IVoucherDetailModalProps {
  data: IVoucher
  visible: boolean
  onCloseClick: () => void
}
const VoucherDetailModal: FC<IVoucherDetailModalProps> = (props: IVoucherDetailModalProps) => {
  const { data, visible, onCloseClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])

  const renderTextBlock = useCallback(
    (label: string, content: string): ReactNode => (
      <Col className={styles.textBlock} span={24}>
        <Row>
          <Col span={24}>
            <Typography.Text className={styles.label}>{label}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text className={styles.content}>{content}</Typography.Text>
          </Col>
        </Row>
      </Col>
    ),
    []
  )

  return (
    <Modal
      open={visible}
      width={480}
      zIndex={1101}
      onOk={onCloseClick}
      okText={t('common:close')}
      closable={false}
      destroyOnClose
      cancelButtonProps={{
        hidden: true
      }}
    >
      {data && (
        <Row className={styles.voucherDetail}>
          <Col span={24}>
            <Row align="middle" gutter={8}>
              <Col span={24} className={styles.voucherBanner}>
                <VoucherCard data={data} />
              </Col>
            </Row>
          </Col>
          {renderTextBlock(t('โค้ด'), data.name)}
          {renderTextBlock(t('เวลาที่ใช้ได้'), data.name)}
          {renderTextBlock(t('อุปกรณ์'), data.name)}
          {renderTextBlock(t('สินค้า'), data.name)}
          {renderTextBlock(t('การชำระเงิน'), data.name)}
          {renderTextBlock(t('การขนส่ง'), data.name)}
          {renderTextBlock(t('รายละเอียดเพิ่มเติม'), data.name)}
        </Row>
      )}
    </Modal>
  )
}

export default VoucherDetailModal
