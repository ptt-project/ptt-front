/* eslint-disable @typescript-eslint/typedef */
import { Col, Image, Row, Typography } from 'antd'
import React, { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './BankAccountCard.module.scss'
import BankLogo from './BankLogo'
import { HelperCensorBankAccountNoUtil } from '~/utils/main'
import { BankAccountStatusEnum } from '~/enums'
import { IBankAccountData } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { useGetBankMeta } from '../../bank-account.helper'

const { Text } = Typography

interface IBankAccountCardProps {
  data: IBankAccountData
  onEditClick: () => void
  onFavoriteClick: () => void
  onDeleteClick: () => void
}

const BankAccountCard: React.FC<IBankAccountCardProps> = (props: IBankAccountCardProps) => {
  const { data, onEditClick, onFavoriteClick, onDeleteClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])
  const { bankMeta } = useGetBankMeta(data?.bankCode)

  function getStatusLabel(): string {
    switch (data.status) {
      case BankAccountStatusEnum.APPROVED:
        return t('bank-account:status.approved')
      case BankAccountStatusEnum.REJECTED:
        return t('bank-account:status.rejected')
      case BankAccountStatusEnum.PENDING:
      default:
        return t('bank-account:status.pending')
    }
  }

  const handleFavoriteClick: VoidFunction = useCallback((): void => {
    if (!data.isMain) {
      onFavoriteClick()
    }
  }, [data.isMain, onFavoriteClick])

  const handleDeleteClick: VoidFunction = useCallback((): void => {
    if (!data.isMain) {
      onDeleteClick()
    }
  }, [data.isMain, onDeleteClick])

  return (
    <Row className={styles.layout} gutter={[8, 8]}>
      <Col sm={18} xs={24}>
        <Row gutter={[16, 16]}>
          <Col className={styles.bankLogo} xs={4}>
            <BankLogo bankIconImageId={bankMeta?.icon} />
          </Col>
          <Col className={styles.bankInfoLayout}>
            <div className={styles.bankName}>
              <Text>{`${bankMeta?.labelTh} (${data.bankCode})`}</Text>
            </div>
            <div className={styles.bankStatus}>
              <Text>{getStatusLabel()}</Text>
            </div>
            <div className={styles.bankAccountName}>
              <Text>{data.accountHolder}</Text>
            </div>
            <div className={styles.bankTagDefault}>
              {data.isMain && (
                <Image
                  preview={false}
                  src="./images/main/buyer/bank-account-tag-default.svg"
                  alt="bank-account-tag-default"
                />
              )}
            </div>
          </Col>
        </Row>
      </Col>
      <Col className={styles.bankAccountNo}>
        <div>
          <Text>{HelperCensorBankAccountNoUtil(data.accountNumber)}</Text>
        </div>
      </Col>
      <Col className={styles.actionLayout} md={4} sm={2}>
        <Image
          className={[styles.clickable, styles.actionIcon].join(' ')}
          preview={false}
          src="./images/main/buyer/icon-edit.svg"
          alt=""
          onClick={onEditClick}
        />
        <Image
          className={[styles.clickable, styles.actionIcon, data.isMain ? styles.disabled : ''].join(
            ' '
          )}
          preview={false}
          src={`./images/main/buyer/icon-favorite${data.isMain ? '-disabled' : ''}.svg`}
          alt=""
          onClick={handleFavoriteClick}
        />
        <Image
          className={[styles.clickable, styles.actionIcon, data.isMain ? styles.disabled : ''].join(
            ' '
          )}
          preview={false}
          src={`./images/main/buyer/icon-delete${data.isMain ? '-disabled' : ''}.svg`}
          alt=""
          onClick={handleDeleteClick}
        />
      </Col>
    </Row>
  )
}

export default BankAccountCard
