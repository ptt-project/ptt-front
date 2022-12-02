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
              icon={
                <Image
                  className="mr-1"
                  src="./images/main/buyer/icon-withdraw.svg"
                  alt="icon-withdraw"
                />
              }
              onClick={onWithdrawClick}
            >
              {t('e-wallet:withdraw.title')}
            </Button>
          </Col>
          <Col>
            <Button
              className={`${styles.button} ${styles.topUpButton}`}
              icon={
                <Image
                  className="mr-1"
                  src="./images/main/buyer/icon-top-up.svg"
                  alt="icon-top-up"
                />
              }
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
