import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Button, Row, Col, Space, Modal, message, Image } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { orderBy, pullAt } from 'lodash'
import Helmet from 'react-helmet'
import styles from './BankAccount.module.scss'
import { useVisible } from '~/utils/main/custom-hook'
import t from '~/locales'
import { CustomUrl } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import { bankMock } from '~/model/BankAccount/mock-data'
import { IBankAccountData, IBankAccountFromValues } from '~/model/BankAccount'
import BankAccountCard from './components/BankAccountCard'
import { sensorBankAccountNo } from '~/utils/main/helper'

const { Text, Title, Link } = Typography

interface IBankAccountProps {
  isSeller?: boolean
}
const BankAccount: React.FC<IBankAccountProps> = (props: IBankAccountProps) => {
  const router: NextRouter = useRouter()
  // eslint-disable-next-line @typescript-eslint/typedef
  const deleteBankAccountVisible = useVisible()
  const [deleteBankAccountId, setDeleteBankAccountId] = useState<string>()

  const rootMenu: string = props.isSeller ? '/seller' : ''

  const bankAccounts: IBankAccountData[] = useMemo(() => bankMock || [], [])

  function onAddBankAccountClick(): void {
    router.push(`${rootMenu}/settings/wallet/bank/add`, `${rootMenu}/settings/wallet/bank/add`, {
      locale: router.locale
    })
  }

  function onEditBankAccountClick(bankAccountId: string): void {
    router.push(
      `${rootMenu}/settings/wallet/bank/${bankAccountId}`,
      `${rootMenu}/settings/wallet/bank/${bankAccountId}`,
      {
        locale: router.locale
      }
    )
  }

  function onFavoriteBankAccountClick(bankAccountId: string): void {
    const favoriteBankAccountIndex: number = bankMock?.findIndex(
      (v: IBankAccountData) => v.id === bankAccountId
    )
    console.debug({ bankMock, bankAccountId, favoriteBankAccountIndex })
    if (favoriteBankAccountIndex >= 0) {
      bankMock?.forEach((v: IBankAccountData, index: number) => {
        bankMock[index].isDefault = index === favoriteBankAccountIndex
      })
      console.debug({ bankAccountId, bankMock })
    }

    message.success('ข้อมูลอัพเดทแล้ว')
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
    message.success('ข้อมูลอัพเดทแล้ว')
    deleteBankAccountVisible.hide()
  }

  useEffect(() => {
    console.debug({ bankAccounts })
  }, [bankAccounts])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('bankAccount.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('bankAccount.breadcrumbs.setting') },
          { title: t('bankAccount.breadcrumbs.wallet') },
          {
            title: t('bankAccount.breadcrumbs.bankAccount'),
            href: CustomUrl.href(`${rootMenu}/settings/wallet/bank`, router.locale)
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
                    {t('bankAccount.title')}
                  </Title>
                </Col>
                <Col span={24}>
                  <Row className={styles.addressListHead}>
                    <HighlightLabel
                      className={styles.highlightLabel}
                      title={t('bankAccount.listBankAccountTitle')}
                    />
                    <Col>
                      <Button className="hps-btn-secondary" onClick={onAddBankAccountClick}>
                        {t('bankAccount.addBankAccount')}
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
                            {t('bankAccount.emptyBankAccount')}
                            <Link
                              className="ml-1"
                              href={CustomUrl.href(
                                `${rootMenu}/settings/wallet/bank/add`,
                                router.locale
                              )}
                              underline
                            >
                              {t('bankAccount.addBankAccountTitle')}
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
                        {t('bankAccount.deleteBankAccount')}
                      </Title>
                    </Col>
                  }
                  footer={[
                    <Col span={24}>
                      <Space>
                        <Button type="text" onClick={deleteBankAccountVisible.hide}>
                          {t('common.cancel')}
                        </Button>
                        <Button type="primary" onClick={onConfirmDeleteAddressClick}>
                          {t('bankAccount.deleteBankAccount')}
                        </Button>
                      </Space>
                    </Col>
                  ]}
                >
                  <Space size={4} direction="vertical">
                    <Space className={styles.contentLayout} size={4} direction="vertical">
                      <Text>
                        {t('bankAccount.confirmDeleteAccountMsg1')}
                        {deleteBankAccount?.bankFullName}{' '}
                        {sensorBankAccountNo(deleteBankAccount?.bankAccountNo)}
                      </Text>
                    </Space>
                    <Text>{deleteBankAccount?.bankAccountName}</Text>
                    <Text type="danger">{t('bankAccount.confirmDeleteAccountMsg2')}</Text>
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
