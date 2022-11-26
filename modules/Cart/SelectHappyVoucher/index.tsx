/* eslint-disable @typescript-eslint/typedef */
import React, { FC, useCallback, useState } from 'react'
import Image from '../../../components/main/Image'
import moment from 'moment'
import VoucherCard, { IVoucher } from './VoucherCard'
import VoucherDetailModal from './VoucherDetailModal'
import styles from './SelectHappyVoucher.module.scss'
import { Button, Col, Form, Input, Modal, Radio, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { InfoCircleFilled } from '@ant-design/icons'
import { LocaleNamespaceConst } from '~/constants'

interface ISelectHappyVoucherFromValues {
  voucherId: string
}

interface ISelectHappyVoucherProps {
  onSelect: (value: IVoucher) => void
}
const SelectHappyVoucher: FC<ISelectHappyVoucherProps> = (props: ISelectHappyVoucherProps) => {
  const { onSelect } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])

  const disableBodyScroll = (isScroll: boolean): void => {
    if (isScroll && document.body.style.overflowY !== 'hidden') {
      document.body.style.overflowY = 'hidden !important;'
      document.body.style.backgroundColor = 'red !important;'
    } else {
      document.body.style.overflowY = 'scroll !important;'
      document.body.style.backgroundColor = 'blue !important;'
    }
  }
  const [form] = Form.useForm<ISelectHappyVoucherFromValues>()
  const voucherId = Form.useWatch('voucherId', form)
  const [visible, setVisible] = useState<boolean>(false)
  const [voucherDetailVisible, setVoucherDetailVisible] = useState<boolean>(false)
  const [voucherSelected, setVoucherSelected] = useState<IVoucher>()
  const [voucherDetail, setVoucherDetail] = useState<IVoucher>()
  const [vouchers /* setVouchers */] = useState<IVoucher[]>([
    {
      id: '1',
      name: 'โค้ดส่งฟรีเฉพาะร้านค้า',
      condition: 'ขั้นต่ำ ฿99',
      endDate: moment().add(1, 'hour').format(),
      description: ''
    },
    {
      id: '2',
      name: 'ส่วนลด 12%',
      condition: 'ขั้นต่ำ ฿1,500 สูงสุด ฿500',
      endDate: moment().add(4, 'hour').format(),
      description: ''
    },
    {
      id: '3',
      name: 'โค้ดส่งฟรี',
      condition: 'เมื่อชำระด้วยบัตรเครดิต',
      endDate: moment().add(4, 'day').format(),
      description: ''
    },
    {
      id: '4',
      name: 'ส่วนลด ฿100',
      condition: 'ขั้นต่ำ ฿899',
      endDate: moment().add(9, 'day').format(),
      description: ''
    }
  ])

  const onSubmit = useCallback(
    (values: ISelectHappyVoucherFromValues) => {
      const voucher = vouchers.find((e) => e.id === values.voucherId)
      console.log({ selectVoucher: voucher })

      onSelect(voucher)
      setVoucherSelected(voucher)
      setVisible(false)
    },
    [vouchers, onSelect]
  )

  const openModal: VoidFunction = useCallback(() => {
    disableBodyScroll(true)
    setVisible(true)
  }, [])

  const closeModal: VoidFunction = useCallback(() => {
    disableBodyScroll(false)
    setVisible(false)
  }, [])

  const openVoucherDetailModal = useCallback((voucher: IVoucher) => {
    setVoucherDetail(voucher)
    setVoucherDetailVisible(true)
    setVisible(false)
  }, [])

  const closeVoucherDetailModal: VoidFunction = useCallback(() => {
    setVoucherDetailVisible(false)
    setVisible(true)
  }, [])

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Row align="middle" gutter={4}>
          <Col>
            <Image src="./images/main/buyer/icon-voucher.svg" alt="icon-voucher" />
          </Col>
          <Col>
            <Typography.Text className={styles.textStyle}>
              {t('โค้ดส่วนลดของ PTT')}
              {voucherSelected ? (
                <>
                  : <span className={styles.voucherSelected}>{voucherSelected.name}</span>
                </>
              ) : null}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col>
        <Typography.Link className={styles.textStyle} onClick={openModal}>
          {t('เลือกโค้ดส่วนลด')}
        </Typography.Link>
      </Col>
      <Modal
        open={visible}
        width={800}
        zIndex={1101}
        closable={false}
        onCancel={closeModal}
        cancelText={t('common:cancel')}
        okText={t('common:ok')}
        onOk={form.submit}
        destroyOnClose
      >
        <Row>
          <Form
            form={form}
            onFinish={onSubmit}
            initialValues={{
              voucherId: voucherSelected?.id
            }}
          >
            <Row align="middle" gutter={[16, 16]}>
              <Col span={24}>
                <Row className={styles.modalTitle}>
                  <Col className={styles.iconInfo}>
                    <InfoCircleFilled width={36} height={36} style={{ color: '#1890FF' }} />
                  </Col>
                  <Col>
                    <Typography.Text>{t('เลือกโค้ดส่วนลด Happy Shopping')}</Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24} className={styles.wrapBackground}>
                <Row className="mb-1">
                  <Typography.Text>{t('เพิ่มโค้ด')}</Typography.Text>
                </Row>
                <Row gutter={16}>
                  <Col sm={18}>
                    <Input />
                  </Col>
                  <Col sm={6}>
                    <Button type="primary" block>
                      {t('ใช้โค้ด')}
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row align="middle" gutter={[16, 16]}>
                  <Form.Item name="voucherId" className="w-100">
                    <Radio.Group className={`w-100 ${styles.voucherRadioGroup}`}>
                      <Space className="w-100" size={8} direction="vertical">
                        {vouchers.map((voucher: IVoucher) => (
                          <Col
                            key={voucher.name}
                            span={24}
                            className={`${styles.wrapBackground} ${
                              voucher.id === voucherId ? styles.voucherCheckboxLayoutSelected : ''
                            }`}
                          >
                            <Radio value={voucher.id} className={`w-100 ${styles.voucherRadio}`}>
                              <VoucherCard
                                data={voucher}
                                onDetailClick={openVoucherDetailModal.bind(null, voucher)}
                              />
                            </Radio>
                          </Col>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>
      <VoucherDetailModal
        visible={voucherDetailVisible}
        onCloseClick={closeVoucherDetailModal}
        data={voucherDetail}
      />
    </Row>
  )
}

export default SelectHappyVoucher
