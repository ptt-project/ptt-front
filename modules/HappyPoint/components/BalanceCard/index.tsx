import React, { FC } from 'react'
import Image from '../../../../components/main/Image'
import styles from './BalanceCard.module.scss'
import { Button, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { LocaleNamespaceConst } from '~/constants'
import { HelperDecimalFormatUtil } from '~/utils/main'

const { Text } = Typography

interface IBalanceCardProps {
  balance: number
  onBuyClick: () => void
  onSellClick: () => void
  onTransferClick: () => void
}
const BalanceCard: FC<IBalanceCardProps> = (props: IBalanceCardProps) => {
  const { balance, onBuyClick, onSellClick, onTransferClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])

  return (
    <Row className={styles.layout} justify="space-between" align="middle" gutter={[0, 24]}>
      <Col>
        <Space direction="vertical" size={0}>
          <Text className={styles.balanceLabel}>{t('happy-point:common.balance')}</Text>
          <Space align="center" size={8} direction="horizontal">
            <Image
              className={styles.happyPointIcon}
              src="./images/main/buyer/happy-point-icon.svg"
              alt=""
            />
            <Text className={styles.balanceValue}>{HelperDecimalFormatUtil(balance, 2)}</Text>
            <Text className={styles.balanceUnit}>{t('happy-point:common.happyPoint')}</Text>
          </Space>
        </Space>
      </Col>
      <Col>
        <Row gutter={[16, 16]} justify="space-between">
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={
                <Image
                  className="mr-1"
                  src="./images/main/buyer/happy-point-buy.svg"
                  alt="happy-point-buy"
                />
              }
              onClick={onBuyClick}
            >
              {t('happy-point:buy.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={
                <Image
                  className="mr-1"
                  src="./images/main/buyer/happy-point-sell.svg"
                  alt="happy-point-sell"
                />
              }
              onClick={onSellClick}
            >
              {t('happy-point:sell.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={
                <Image
                  className="mr-1"
                  src="./images/main/buyer/happy-point-transfer.svg"
                  alt="happy-point-transfer"
                />
              }
              onClick={onTransferClick}
            >
              {t('happy-point:transfer.title')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default BalanceCard
