import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import { Row, Col, Typography, Pagination, Tag } from 'antd'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import styles from './VoucherList.module.scss'

const { Text } = Typography

interface IMockData {
  id: string
  code: string
  type: string
  value: string
  available: string
  used: string
  status: string
  colorStatus: string
  periodGetCode: string
}

const data: IMockData[] = [
  {
    id: '1',
    code: '00111',
    type: 'โดย %',
    value: '10 %',
    available: '100',
    used: '0',
    status: 'เร็วๆนี้',
    colorStatus: 'gold',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  },
  {
    id: '2',
    code: '00112',
    type: 'โดย %',
    value: '10 %',
    available: '100',
    used: '0',
    status: 'หมดอายุ',
    colorStatus: 'red',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  }
]

const VoucherList: FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [replyData, setReplyData] = useState<IMockData>({
    id: '',
    code: '',
    type: '',
    value: '',
    available: '',
    used: '',
    status: '',
    colorStatus: '',
    periodGetCode: ''
  })
  return (
    <>
      <Row className={`${styles.hrTitleCol} text-center mb-3`}>
        <Col lg={3} xs={4}>
          <Text type="danger">{t('seller.marketing:voucher.col.voucher')}</Text>
        </Col>
        <Col lg={3} xs={4}>
          <Text type="danger">{t('seller.marketing:voucher.col.type')}</Text>
        </Col>
        <Col lg={2} xs={2}>
          <Text type="danger">{t('seller.marketing:voucher.col.value')}</Text>
        </Col>
        <Col lg={2} xs={2}>
          <Text type="danger">{t('seller.marketing:voucher.col.available')}</Text>
        </Col>
        <Col lg={2} xs={2}>
          <Text type="danger">{t('seller.marketing:voucher.col.used')}</Text>
        </Col>
        <Col lg={3} xs={3}>
          <Text type="danger">{t('seller.marketing:voucher.col.status')}</Text>
        </Col>
        <Col lg={5} xs={4}>
          <Text type="danger">{t('seller.marketing:voucher.col.periodGetCode')}</Text>
        </Col>
        <Col lg={4} xs={3}>
          <Text type="danger">{t('seller.marketing:voucher.col.operation')}</Text>
        </Col>
      </Row>
      {data?.map((item: IMockData) => (
        <div key={item.id} className={`${styles.tr} mb-3`}>
          <Row className="text-center">
            <Col lg={3}>
              <Text>{item.code}</Text>
            </Col>
            <Col lg={3}>
              <Text>{item.type}</Text>
            </Col>
            <Col lg={2}>
              <Text>{item.value}</Text>
            </Col>
            <Col lg={2}>
              <Text>{item.available}</Text>
            </Col>
            <Col lg={2}>
              <Text>{item.used}</Text>
            </Col>
            <Col lg={3}>
              <Tag color={`${item.colorStatus}`}>{item.status}</Tag>
            </Col>
            <Col lg={5}>
              <Text>{item.periodGetCode}</Text>
            </Col>
            <Col lg={4}>
              <Link href={CustomUrlUtil('/settings/', router.locale)}>
                <i className={`${styles.textSecondary} fas fa-pen mr-1`} />
              </Link>
              <Link href={CustomUrlUtil('/settings/', router.locale)}>
                <i className={`${styles.textSecondary} fas fa-trash-alt mr-1`} />
              </Link>
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

export default VoucherList
