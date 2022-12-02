import React, { FC, ReactNode, useMemo } from 'react'
import Image from '../../../../components/main/Image'
import moment from 'moment'
import styles from './VoucherCard.module.scss'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { CalendarFilled } from '@ant-design/icons'
import { LocaleNamespaceConst } from '~/constants'

export interface IVoucher {
  id: string
  name: string
  code?: string
  description: string
  minimum?: number
  maximum?: number

  condition: string

  device?: string
  productCategory?: string[]
  paymentMethod?: string[]
  shippingMethod?: string[]

  startDate?: string
  endDate: string
}

interface IVoucherCardProps {
  data: IVoucher
  onDetailClick?: () => void
}
const VoucherCard: FC<IVoucherCardProps> = (props: IVoucherCardProps) => {
  const { data, onDetailClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])
  const endDateLabel: ReactNode = useMemo(() => {
    const now: moment.Moment = moment()
    const endDate: moment.Moment = moment(data.endDate)
    const daysToEnd: number = endDate.diff(now, 'day')
    const hoursToEnd: number = endDate.diff(now, 'hour')
    const minutesToEnd: number = endDate.diff(now, 'minute')
    if (daysToEnd < 1) {
      return (
        <Row className={styles.voucherEndDate} gutter={8}>
          <Col>
            <CalendarFilled className={styles.willExpired} />
          </Col>
          <Col>
            <Typography.Text className={styles.willExpired}>
              {hoursToEnd > 0 &&
                t('ใกล้หมดเขต: เหลือ {{hoursToEnd}} ชั่วโมง', {
                  hoursToEnd
                })}
              {hoursToEnd <= 0 &&
                minutesToEnd > 0 &&
                t('ใกล้หมดเขต: เหลือ {{minutesToEnd}} นาที', {
                  minutesToEnd
                })}
            </Typography.Text>
          </Col>
        </Row>
      )
    }
    return (
      <Row className={styles.voucherEndDate} gutter={8}>
        <Col>
          <CalendarFilled />
        </Col>
        <Col>
          <Typography.Text>
            {t('ใช้ได้ก่อน: {{endDate}}', {
              endDate: endDate.format('DD/MM/YYYY')
            })}
          </Typography.Text>
        </Col>
      </Row>
    )
  }, [data.endDate])
  return (
    <Row className={styles.layout} justify="space-between" align="middle" wrap={false}>
      <Col className={styles.image}>
        <Image src="./images/main/buyer/icon-happy-voucher.svg" alt="icon-happy-voucher" />
      </Col>
      <Col flex={1}>
        <Row align="middle" justify="space-between" className={styles.detailWarpLayout}>
          <Col sm={21} xs={24}>
            <Row className={styles.detailLayout}>
              <Col span={24}>
                <Typography.Text className={styles.name}>{data.name}</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text className={styles.condition}>{data.condition}</Typography.Text>
              </Col>
              <Col span={24}>{endDateLabel}</Col>
            </Row>
          </Col>
          {onDetailClick ? (
            <Col className="text-right" sm={2} xs={24}>
              <Typography.Link onClick={onDetailClick}>{t('เงื่อนไข')}</Typography.Link>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  )
}
VoucherCard.defaultProps = {
  onDetailClick: undefined
}

export default VoucherCard
