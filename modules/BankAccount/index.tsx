import React, { useMemo, useState } from 'react'
import { Typography, Button, Row, Col, Space, Modal, message, Image } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { orderBy, pullAt } from 'lodash'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import styles from './BankAccount.module.scss'
import {
  CustomUrlUtil,
  CustomHookUseVisibleUtil,
  HelperCensorBankAccountNoUtil
} from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import { bankMock } from '~/modules/BankAccount/mock-data'
import BankAccountCard from './components/BankAccountCard'
import { IBankAccountData, IBankAccountFromValues, ICustomHookUseVisibleUtil } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title, Link } = Typography

interface IBankAccountProps {
  isSeller?: boolean
}
const BankAccount: React.FC<IBankAccountProps> = (props: IBankAccountProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])

  const deleteBankAccountVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()
  const [deleteBankAccountId, setDeleteBankAccountId] = useState<string>()

  const rootMenu: string = props.isSeller ? '/seller' : ''

  const bankAccounts: IBankAccountData[] = useMemo(() => bankMock || [], [])

  function onAddBankAccountClick(): void {
    router.push(`${rootMenu}/settings/finance/bank/add`, `${rootMenu}/settings/finance/bank/add`, {
      locale: router.locale
    })
  }

  function onEditBankAccountClick(bankAccountId: string): void {
    router.push(
      `${rootMenu}/settings/finance/bank/${bankAccountId}`,
      `${rootMenu}/settings/finance/bank/${bankAccountId}`,
      {
        locale: router.locale
      }
    )
  }

  function onFavoriteBankAccountClick(bankAccountId: string): void {
    const favoriteBankAccountIndex: number = bankMock?.findIndex(
      (v: IBankAccountData) => v.id === bankAccountId
    )
    if (favoriteBankAccountIndex >= 0) {
      bankMock?.forEach((v: IBankAccountData, index: number) => {
        bankMock[index].isDefault = index === favoriteBankAccountIndex
      })
    }

    message.success(t('common:dataUpdated'))
  }

  function onDeleteBankAccountClick(bankAccountId: string): void {
    setDeleteBankAccountId(bankAccountId)
    deleteBankAccountVisible.show()
  }

  const deleteBankAccount: IBankAccountFromValues = useMemo(
    (): IBankAccountFromValues =>
      bankAccounts.find((v: IBankAccountData) => v.id === deleteBankAccountId),
    [deleteBankAccountId, bankAccounts]
  )

  async function onConfirmDeleteAddressClick(): Promise<void> {
    if (deleteBankAccount) {
      const deleteBankAccountIndex: number = bankMock.indexOf(deleteBankAccount)
      pullAt(bankMock, deleteBankAccountIndex)
    }

    setDeleteBankAccountId('')
    message.success(t('common:dataUpdated'))
    deleteBankAccountVisible.hide()
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('bank-account:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('bank-account:breadcrumbs.setting') },
          { title: t('bank-account:breadcrumbs.wallet') },
          {
            title: t('bank-account:breadcrumbs.bankAccount'),
            href: CustomUrlUtil(`${rootMenu}/settings/finance/bank`, router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row>
                <Col span={24}>
                  <Title className="hps-title" level={4}>
                    {t('bank-account:title')}
                  </Title>
                </Col>
                <Col span={24}>
                  <Row className={styles.addressListHead}>
                    <HighlightLabel
                      className={styles.highlightLabel}
                      title={t('bank-account:listBankAccountTitle')}
                    />
                    <Col>
                      <Button className="hps-btn-secondary" onClick={onAddBankAccountClick}>
                        {t('bank-account:addBankAccount')}
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-4" gutter={[0, 16]}>
                    {bankAccounts.length ? (
                      orderBy(bankAccounts, (v: IBankAccountData) => (v.isDefault ? 1 : 0), [
                        'desc'
                      ]).map((address: IBankAccountData) => (
                        <Col key={`${address.id}`} span={24}>
                          <BankAccountCard
                            data={address}
                            onEditClick={onEditBankAccountClick.bind(null, address.id)}
                            onFavoriteClick={onFavoriteBankAccountClick.bind(null, address.id)}
                            onDeleteClick={onDeleteBankAccountClick.bind(null, address.id)}
                          />
                        </Col>
                      ))
                    ) : (
                      <Col className="w-100">
                        <div className={`mx-auto ${styles.wrapImageEmptyAddress}`}>
                          <div className={styles.imgContainer}>
                            <Image
                              rootClassName={styles.imgWrapper}
                              preview={false}
                              width="100%"
                              src="./images/main/buyer/address-empty-list.svg"
                            />
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Text>
                            {t('bank-account:emptyBankAccount')}
                            <Link
                              className="ml-1"
                              href={CustomUrlUtil(
                                `${rootMenu}/settings/finance/bank/add`,
                                router.locale
                              )}
                              underline
                            >
                              {t('bank-account:addBankAccountTitle')}
                            </Link>
                          </Text>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Col>
                <Modal
                  visible={deleteBankAccountVisible.visible}
                  onCancel={deleteBankAccountVisible.hide}
                  title={
                    <Col span={24}>
                      <Title className="mb-0" level={4}>
                        <i className={`${styles.cError} fas fa-info-circle mr-2`} />
                        {t('bank-account:deleteBankAccount')}
                      </Title>
                    </Col>
                  }
                  footer={[
                    <Col span={24}>
                      <Space>
                        <Button type="text" onClick={deleteBankAccountVisible.hide}>
                          {t('common:cancel')}
                        </Button>
                        <Button type="primary" onClick={onConfirmDeleteAddressClick}>
                          {t('bank-account:deleteBankAccount')}
                        </Button>
                      </Space>
                    </Col>
                  ]}
                >
                  <Space size={4} direction="vertical">
                    <Space className={styles.contentLayout} size={4} direction="vertical">
                      <Text>
                        {t('bank-account:confirmDeleteAccountMsg1')}
                        {deleteBankAccount?.bankFullName}{' '}
                        {HelperCensorBankAccountNoUtil(deleteBankAccount?.bankAccountNo)}
                      </Text>
                    </Space>
                    <Text>{deleteBankAccount?.bankAccountName}</Text>
                    <Text type="danger">{t('bank-account:confirmDeleteAccountMsg2')}</Text>
                  </Space>
                </Modal>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

BankAccount.defaultProps = {
  isSeller: false
}

export default BankAccount
