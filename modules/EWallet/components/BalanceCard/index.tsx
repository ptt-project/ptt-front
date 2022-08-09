import { Button, Col, Image, message, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import styles from './BalanceCard.module.scss'

const { Text } = Typography

interface IBalanceCardProps {
  balance: number
}
const BalanceCard: FC<IBalanceCardProps> = (props: IBalanceCardProps) => {
  const { balance } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])

  function onWithdrawClick(): void {
    message.info('withdraw')
  }

  function onTopUpClick(): void {
    message.info('top-up')
  }

  return (
    <Row className={styles.layout} justify="space-between" align="middle" gutter={[0, 24]}>
      <Col>
        <Space direction="vertical" size={0}>
          <Text className={styles.balanceLabel}>{t('e-wallet:balance')}</Text>
          <Text className={styles.balanceValue}>
            {(balance || 0).toLocaleString('th-TH', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'THB'
            })}
          </Text>
        </Space>
      </Col>
      <Col>
        <Row gutter={[16, 16]}>
          <Col>
            <Button
              className={`${styles.button} hps-btn-secondary`}
              icon={<Image preview={false} src="./images/main/buyer/icon-withdraw.svg" />}
              onClick={onWithdrawClick}
            >
              {t('e-wallet:withdraw')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} ${styles.topUpButton}`}
              icon={<Image preview={false} src="./images/main/buyer/icon-top-up.svg" />}
              onClick={onTopUpClick}
            >
              {t('e-wallet:topUp')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default BalanceCard
