import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './ModalConfirmBankInfo.module.scss'
import { IBankAccountData } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { getBankName } from '../../bank-account.helper'

const { Text, Title } = Typography

interface IModalConfirmBankInfoProps {
  visible: boolean
  onConfirmClick: () => void
  onCancelClick: () => void
  data?: IBankAccountData
}
const ModalConfirmBankInfo: FC<IModalConfirmBankInfoProps> = (
  props: IModalConfirmBankInfoProps
) => {
  const { data, visible, onCancelClick, onConfirmClick } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])

  return (
    <Modal
      visible={visible}
      onCancel={onCancelClick}
      title={
        <Col span={24}>
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {t('bank-account:confirmBankInfo')}
          </Title>
        </Col>
      }
      footer={[
        <Col span={24}>
          <Space>
            <Button type="text" onClick={onCancelClick}>
              {t('common:cancel')}
            </Button>
            <Button type="primary" onClick={onConfirmClick}>
              {t('common:confirm')}
            </Button>
          </Space>
        </Col>
      ]}
    >
      <Row className={styles.modalContent} gutter={[4, 16]}>
        <Col span={12}>
          <Text className={styles.dataLabel}>{t('bank-account:form.fullName')}</Text>
        </Col>
        <Col span={12}>
          <Text>{data?.fullName}</Text>
        </Col>
        <Col span={12}>
          <Text className={styles.dataLabel}>{t('bank-account:form.citizenNo')}</Text>
        </Col>
        <Col span={12}>
          <Text>{data?.citizenNo}</Text>
        </Col>
        <Col span={12}>
          <Text className={styles.dataLabel}>{t('bank-account:form.bankName')}</Text>
        </Col>
        <Col span={12}>
          <Text>{`${getBankName(data.bankCode)} (${data?.bankCode})`}</Text>
        </Col>
        <Col span={12}>
          <Text className={styles.dataLabel}>{t('bank-account:form.bankName')}</Text>
        </Col>
        <Col span={12}>
          <Text>{data?.bankAccountNo}</Text>
        </Col>
        <Col span={12}>
          <Text className={styles.dataLabel}>{t('bank-account:form.bankAccountName')}</Text>
        </Col>
        <Col span={12}>
          <Text>{data?.bankAccountName}</Text>
        </Col>
      </Row>
    </Modal>
  )
}
ModalConfirmBankInfo.defaultProps = {
  data: undefined
}

export default ModalConfirmBankInfo
