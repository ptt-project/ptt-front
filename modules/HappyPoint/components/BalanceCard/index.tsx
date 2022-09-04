import { Button, Col, Image, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { HelperDecimalFormatUtil } from '~/utils/main'
import styles from './BalanceCard.module.scss'

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
              preview={false}
              className={styles.happyPointIcon}
              src="./images/main/buyer/happy-point-icon.svg"
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
              icon={<Image preview={false} src="./images/main/buyer/happy-point-buy.svg" />}
              onClick={onBuyClick}
            >
              {t('happy-point:buy.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={<Image preview={false} src="./images/main/buyer/happy-point-sell.svg" />}
              onClick={onSellClick}
            >
              {t('happy-point:sell.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={<Image preview={false} src="./images/main/buyer/happy-point-transfer.svg" />}
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
