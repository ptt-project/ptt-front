import { Col, Image, Row, Typography } from 'antd'
import React, { useMemo } from 'react'
import { BankStatus, IBankAccountData } from '~/model/BankAccount'
import styles from './BankAccountCard.module.scss'
import BankLogo from './BankLogo'
import t from '~/locales'

const { Text } = Typography

interface IBankAccountCardProps {
  data: IBankAccountData
  onEditClick: () => void
  onFavoriteClick: () => void
  onDeleteClick: () => void
}

const BankAccountCard: React.FC<IBankAccountCardProps> = (props: IBankAccountCardProps) => {
  const { data, onEditClick, onFavoriteClick, onDeleteClick } = props

  const statusLabel: string = useMemo(() => {
    switch (data.status) {
      case BankStatus.APPROVED:
        return t('bankAccount.status.approved')
      case BankStatus.REJECTED:
        return t('bankAccount.status.rejected')
      case BankStatus.PENDING:
      default:
        return t('bankAccount.status.pending')
    }
  }, [data.status])

  function handleFavoriteClick(): void {
    if (!data.isDefault) {
      onFavoriteClick()
    }
  }

  function handleDeleteClick(): void {
    if (!data.isDefault) {
      onDeleteClick()
    }
  }

  return (
    <Row className={styles.layout} gutter={[16, 16]}>
      <Col md={18} sm={12} xs={18}>
        <Row wrap={false} gutter={16}>
          <Col xs={8}>
            <BankLogo bank={data.bankName} />
          </Col>
          <Row gutter={[16, 8]}>
            <Col xs={24}>
              <Text>{`${data.bankFullName} (${data.bankName})`}</Text>
            </Col>
            <Col xs={24}>
              <Text>{statusLabel}</Text>
            </Col>
            <Col>
              <Text>{data.bankAccountName}</Text>
            </Col>
          </Row>
        </Row>
      </Col>
      <Col xs={6}>
        {data.isDefault && (
          <Image preview={false} src="./images/main/buyer/bank-account-tag-default.svg" />
        )}
      </Col>
      <Col md={2} sm={8}>
        <Row align="middle">
          <Text>{data.bankAccountNo}</Text>
        </Row>
      </Col>
      <Col className={styles.actionLayout} md={4} sm={2}>
        <Image
          className={[styles.clickable, styles.actionIcon].join(' ')}
          preview={false}
          src="./images/main/buyer/icon-edit.svg"
          onClick={onEditClick}
        />
        <Image
          className={[
            styles.clickable,
            styles.actionIcon,
            data.isDefault ? styles.disabled : ''
          ].join(' ')}
          preview={false}
          src={`./images/main/buyer/icon-favorite${data.isDefault ? '-disabled' : ''}.svg`}
          onClick={handleFavoriteClick}
        />
        <Image
          className={[
            styles.clickable,
            styles.actionIcon,
            data.isDefault ? styles.disabled : ''
          ].join(' ')}
          preview={false}
          src={`./images/main/buyer/icon-delete${data.isDefault ? '-disabled' : ''}.svg`}
          onClick={handleDeleteClick}
        />
      </Col>
    </Row>
  )
}

export default BankAccountCard
