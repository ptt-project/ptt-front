import { Button, Col, Image, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { HelperDecimalFormatUtil } from '~/utils/main'
import styles from './BalanceCard.module.scss'

const { Text } = Typography

interface IBalanceCardProps {
  balance: number
  onWithdrawClick: () => void
  onTopUpClick: () => void
}
const BalanceCard: FC<IBalanceCardProps> = (props: IBalanceCardProps) => {
  const { balance, onWithdrawClick, onTopUpClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])

  return (
    <Row className={styles.layout} justify="space-between" align="middle" gutter={[0, 24]}>
      <Col>
        <Space direction="vertical" size={0}>
          <Text className={styles.balanceLabel}>{t('e-wallet:balance')}</Text>
          <Text className={styles.balanceValue}>
            {HelperDecimalFormatUtil(balance, 2, 'en-EN', {
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
              icon={<Image preview={false} src="./images/main/buyer/icon-withdraw.svg" alt="" />}
              onClick={onWithdrawClick}
            >
              {t('e-wallet:withdraw.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} ${styles.topUpButton}`}
              icon={<Image preview={false} src="./images/main/buyer/icon-top-up.svg" alt="" />}
              onClick={onTopUpClick}
            >
              {t('e-wallet:topUp.title')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default BalanceCard
