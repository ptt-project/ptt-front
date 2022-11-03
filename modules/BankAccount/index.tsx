import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Button, Row, Col, Space, Modal, message, Image } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { orderBy } from 'lodash'
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
import BankAccountCard from './components/BankAccountCard'
import {
  IBankAccount,
  IBankAccountData,
  IBankAccountFromValues,
  ICustomHookUseVisibleUtil,
  IOtp
} from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { BankAccountService, MemberService } from '~/services'
import { BankAccountStatusEnum, OtpTypeEnum } from '~/enums'
import OtpModal from '~/components/main/OtpModal'
import EditBankAccount from './components/EditBankAccount'
import { useGetBankMeta } from './bank-account.helper'

const { Text, Title, Link } = Typography

interface IBankAccountProps {
  isSeller?: boolean
}
const BankAccount: React.FC<IBankAccountProps> = (props: IBankAccountProps) => {
  const { isSeller } = props

  const rootMenu: string = isSeller ? '/seller' : ''

  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])
  const { data: user } = MemberService.useGetProfile()

  const deleteBankAccountVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()
  const [deleteBankAccountId, setDeleteBankAccountId] = useState<string>()
  const [isOtpViewBankAccountsOpen, setIsOtpViewBankAccountsOpen] = useState<boolean>(false)
  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const [otpViewVerifyMeta, setOtpViewVerifyMeta] = useState<IOtp>()
  const { getBankMeta } = useGetBankMeta()

  const {
    data: bankAccountRes,
    isStale,
    remove: removeGetBankAccounts
  } = BankAccountService.useGetBankAccounts({
    otpCode: otpViewVerifyMeta?.otpCode || '',
    refCode: otpViewVerifyMeta?.refCode || ''
  })

  const [bankAccounts, setBankAccounts] = useState<IBankAccountData[]>([])
  const [editBankAccount, setEditBankAccount] = useState<IBankAccountData>()

  // const isVerify: boolean = useMemo(() => {
  //   return !!otpViewVerifyMeta?.otpCode && !!otpViewVerifyMeta?.refCode
  // }, [otpViewVerifyMeta])

  async function onSubmitOtpViewBankAccount(otpData: IOtp): Promise<void> {
    try {
      setOtpViewVerifyMeta(otpData)
      setIsOtpViewBankAccountsOpen(false)
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    if (isStale) {
      setIsOtpViewBankAccountsOpen(true)
    }
  }, [isStale])

  useEffect(() => {
    if (bankAccountRes) {
      const tempData: IBankAccountData[] = bankAccountRes.map(
        (d: IBankAccount): IBankAccountData => ({
          id: d.id,
          accountHolder: d.accountHolder,
          accountNumber: d.accountNumber,
          bankCode: d.bankCode,
          fullName: d.fullName,
          thaiId: d.thaiId,
          isMain: d.isMain,
          status: BankAccountStatusEnum.APPROVED
        })
      )
      setBankAccounts(orderBy(tempData, (v: IBankAccountData) => (v.isMain ? 1 : 0), ['desc']))
    } else {
      setIsOtpViewBankAccountsOpen(true)
    }
  }, [bankAccountRes])

  function toggleViewBankAccountOtpOpen(): void {
    setIsOtpViewBankAccountsOpen((prev: boolean): boolean => {
      const newVisible: boolean = !prev
      if (!newVisible) {
        setOtpViewVerifyMeta(undefined)
        setEditBankAccount(undefined)
        setBankAccounts([])
        removeGetBankAccounts()
      }
      return newVisible
    })
  }

  function onAddBankAccountClick(): void {
    router.push(`${rootMenu}/settings/finance/bank/add`)
  }

  function onEditBankAccountClick(bankAccountId: string): void {
    setEditBankAccount(bankAccounts.find((e: IBankAccountData): boolean => e.id === bankAccountId))
  }

  function onEditBankAccountSubmitted(bankAccountEdited: IBankAccount): void {
    setEditBankAccount(undefined)
    setBankAccounts((prev: IBankAccountData[]) => {
      const newBankAccounts: IBankAccountData[] = prev.map(
        (bankAccount: IBankAccountData): IBankAccountData => {
          if (bankAccount.id === bankAccountEdited.id) {
            return {
              id: bankAccountEdited.id,
              accountHolder: bankAccountEdited.accountHolder,
              accountNumber: bankAccountEdited.accountNumber,
              bankCode: bankAccountEdited.bankCode,
              fullName: bankAccountEdited.fullName,
              thaiId: bankAccountEdited.thaiId,
              isMain: bankAccountEdited.isMain,
              status: BankAccountStatusEnum.APPROVED
            }
          }
          return bankAccount
        }
      )
      return newBankAccounts
    })
  }

  async function onFavoriteBankAccountClick(bankAccountId: string): Promise<void> {
    try {
      await BankAccountService.setMainBankAccount(bankAccountId)
      setBankAccounts((prev: IBankAccountData[]) => {
        const newBankAccounts: IBankAccountData[] = prev.map(
          (bankAccount: IBankAccountData): IBankAccountData => ({
            ...bankAccount,
            isMain: bankAccount.id === bankAccountId
          })
        )

        return orderBy(newBankAccounts, (v: IBankAccountData) => (v.isMain ? 1 : 0), ['desc'])
      })
      message.success(t('common:dataUpdated'))
    } catch (error) {
      message.error(t('เกิดข้อผิดพลาด'))
    }
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
    deleteBankAccountVisible.hide()
    setIsOtpOpen(true)
  }

  function toggleOtpOpen(): void {
    setIsOtpOpen(!isOtpOpen)
  }

  async function onOtpDeleteBankAccountSuccess(otpData: IOtp): Promise<void> {
    setIsOtpOpen(false)
    try {
      await BankAccountService.deleteBankAccount(deleteBankAccountId, {
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      })
      setBankAccounts((prev: IBankAccountData[]) => {
        const newBankAccounts: IBankAccountData[] = prev.filter(
          (bankAccount: IBankAccountData): boolean => bankAccount.id !== deleteBankAccountId
        )
        return newBankAccounts
      })

      message.success(t('common:dataUpdated'))
    } catch (error) {
      message.error(t('เกิดข้อผิดพลาด'))
    }
  }

  return editBankAccount ? (
    <EditBankAccount
      bankAccount={editBankAccount}
      isSeller={isSeller}
      onSubmitted={onEditBankAccountSubmitted}
      onCancel={setEditBankAccount.bind(null, undefined)}
    />
  ) : (
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
                      <Button
                        className="hps-btn-secondary"
                        onClick={onAddBankAccountClick}
                        disabled={isStale}
                      >
                        {t('bank-account:addBankAccount')}
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-4" gutter={[0, 16]}>
                    {bankAccounts.length ? (
                      orderBy(bankAccounts, (v: IBankAccountData) => (v.isMain ? 1 : 0), [
                        'desc'
                      ]).map((bankAccount: IBankAccountData) => (
                        <Col key={`${bankAccount.id}`} span={24}>
                          <BankAccountCard
                            data={bankAccount}
                            onEditClick={onEditBankAccountClick.bind(null, bankAccount.id)}
                            onFavoriteClick={onFavoriteBankAccountClick.bind(null, bankAccount.id)}
                            onDeleteClick={onDeleteBankAccountClick.bind(null, bankAccount.id)}
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
                              alt="address-empty"
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
                              disabled={isStale}
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
                  footer={
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
                  }
                >
                  <Space size={4} direction="vertical">
                    <Space className={styles.contentLayout} size={4} direction="vertical">
                      <Text>
                        {t('bank-account:confirmDeleteAccountMsg1')}
                        {getBankMeta(deleteBankAccount?.bankCode)?.labelTh}
                        {HelperCensorBankAccountNoUtil(deleteBankAccount?.accountNumber)}
                      </Text>
                    </Space>
                    <Text>{deleteBankAccount?.accountHolder}</Text>
                    <Text type="danger">{t('bank-account:confirmDeleteAccountMsg2')}</Text>
                  </Space>
                </Modal>
              </Row>
            </Col>
            <OtpModal
              mobile={user?.mobile}
              action={OtpTypeEnum.DELETE_BANK_ACCOUNT}
              isOpen={isOtpOpen}
              toggle={toggleOtpOpen}
              onSubmit={onOtpDeleteBankAccountSuccess}
            />
            <OtpModal
              mobile={user?.mobile}
              action={OtpTypeEnum.VIEW_BANK_ACCOUNTS}
              isOpen={isOtpViewBankAccountsOpen}
              toggle={toggleViewBankAccountOtpOpen}
              onSubmit={onSubmitOtpViewBankAccount}
            />
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
