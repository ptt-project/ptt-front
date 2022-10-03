import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Row, Col, Typography, Pagination, Tag } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import styles from './PromotionList.module.scss'

const { Text } = Typography

interface IMockData {
  id: string
  name: string
  list: string
  status: string
  colorStatus: string
  periodGetCode: string
}

const data: IMockData[] = [
  {
    id: '1',
    name: 'Glove Discount',
    list: 'Everlast Weight Lifting Gloves',
    status: 'เร็วๆนี้',
    colorStatus: 'gold',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  },
  {
    id: '2',
    name: 'Mid year sale 2021',
    list: 'EVERLAST WEIGHTED เสื้อถ่วงน้ำหนัก',
    status: 'หมดอายุ',
    colorStatus: 'red',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  }
]

const PromotionList: FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [isOpenDelModal, setIsOpenDelModal] = useState<boolean>(false)

  function toggleDelModal(): void {
    setIsOpenDelModal(!isOpenDelModal)
  }

  function onDelModal(item: IMockData): void {
    if (item) {
      setIsOpenDelModal(true)
    }
  }

  function onRemove(): void {
    console.log('reomove')
  }

  function onEditVoucherClick(voucherId: string): void {
    router.push(`/seller/settings/marketing/voucher/${voucherId}`)
  }
  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDelModal}
        toggle={toggleDelModal}
        type="error"
        title={t('seller.marketing:voucher.col.deleteHeader')}
        content={t('seller.marketing:voucher.col.deleteMsg')}
        onSubmit={onRemove}
      />
      <Row className={`${styles.hrTitleCol} text-center mb-3`}>
        <Col lg={5}>
          <Text type="danger">{t('seller.marketing:promotion.col.promotionName')}</Text>
        </Col>
        <Col lg={6}>
          <Text type="danger">{t('seller.marketing:promotion.col.list')}</Text>
        </Col>
        <Col lg={3}>
          <Text type="danger">{t('seller.marketing:promotion.col.status')}</Text>
        </Col>
        <Col lg={5}>
          <Text type="danger">{t('seller.marketing:promotion.col.period')}</Text>
        </Col>
        <Col lg={4}>
          <Text type="danger">{t('seller.marketing:promotion.col.operation')}</Text>
        </Col>
      </Row>
      {data?.map((item: IMockData) => (
        <div key={item.id} className={`${styles.tr} mb-3`}>
          <Row className="text-center">
            <Col lg={5}>
              <Text>{item.name}</Text>
            </Col>
            <Col lg={6}>
              <Text>{item.list}</Text>
            </Col>
            <Col lg={3}>
              <Tag color={`${item.colorStatus}`}>{item.status}</Tag>
            </Col>
            <Col lg={5}>
              <Text>{item.periodGetCode}</Text>
            </Col>
            <Col lg={4}>
              <Text onClick={(): void => onEditVoucherClick(item.id)}>
                <i className={`${styles.textSecondary} fas fa-pen mr-1`} />
              </Text>
              <Text onClick={(): void => onDelModal(item)}>
                <i className={`${styles.textSecondary} fas fa-trash-alt mr-1`} />
              </Text>
            </Col>
          </Row>
        </div>
      ))}
      <Row>
        <Col span={24} className="text-right">
          <Pagination
            className="mb-3"
            showTotal={(total: number, range: [number, number]): string =>
              `${range[0]}-${range[1]} ${t('common:pagination.of')} ${total} ${t(
                'common:pagination.items'
              )}`
            }
            total={5}
            showSizeChanger
          />
        </Col>
      </Row>
    </>
  )
}

export default PromotionList
