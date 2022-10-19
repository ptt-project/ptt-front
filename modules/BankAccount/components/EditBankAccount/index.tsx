import React, { useState } from 'react'
import { Col, Typography, Form, Button, Row, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import BankAccountFrom from '../BankAccountFrom'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import ModalConfirmBankInfo from '../ModalConfirmBankInfo'
import OtpModal from '~/components/main/OtpModal'
import { CustomUrlUtil, CustomHookUseVisibleUtil } from '~/utils/main'
import {
  IBankAccount,
  IBankAccountData,
  IBankAccountFromValues,
  ICustomHookUseVisibleUtil,
  IOtp
} from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { OtpTypeEnum } from '~/enums'
import { BankAccountService } from '~/services'

const { Title } = Typography

interface IEditBankAccountProps {
  isSeller?: boolean
  bankAccount: IBankAccountData
  onSubmitted?: (bankAccount: IBankAccount) => void
}
const EditBankAccount: React.FC<IEditBankAccountProps> = (props: IEditBankAccountProps) => {
  const { bankAccount, isSeller, onSubmitted } = props
  const [form] = Form.useForm()
  const router: NextRouter = useRouter()
  const bankAccountId: number = bankAccount.id

  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])

  const rootMenu: string = isSeller ? '/seller' : ''
  const mobileNo: string = '0901061303'

  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const [bankAccountData, setBankAccountData] = useState<IBankAccountData>()
  const confirmBankInfoVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()

  const initialValues: IBankAccountData = bankAccount

  function onSubmit(values: IBankAccountFromValues): void {
    // update data mock on submit
    setBankAccountData(values)
    confirmBankInfoVisible.show()
  }

  function onCancelClick(): void {
    router.back()
  }

  function onConfirmBankInfoClick(): void {
    confirmBankInfoVisible.hide()
    setIsOtpOpen(true)
  }

  function onCancelBankInfoClick(): void {
    confirmBankInfoVisible.hide()
  }

  function toggleOtpOpen(): void {
    setIsOtpOpen(!isOtpOpen)
  }

  async function onOtpSuccess(otpData: IOtp): Promise<void> {
    setIsOtpOpen(false)
    const formValues: IBankAccountFromValues = form.getFieldsValue()
    try {
      const { data } = await BankAccountService.editBankAccount(bankAccountId, {
        accountHolder: formValues.bankAccountName,
        accountNumber: formValues.bankAccountNo,
        bankCode: formValues.bankCode,
        fullName: formValues.fullName,
        thaiId: formValues.citizenNo,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      })

      message.success(t('common:dataUpdated'))
      onSubmitted?.(data)
    } catch (error) {
      console.log({ error })
      message.error(error.data.message)
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('bank-account:editBankAccountTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('bank-account:breadcrumbs.setting') },
          { title: t('bank-account:breadcrumbs.wallet') },
          {
            title: t('bank-account:breadcrumbs.editBankAccount'),
            href: CustomUrlUtil(`${rootMenu}/settings/finance/bank/${bankAccountId}`, router.locale)
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
            >
              <Col className="mb-4" span={24}>
                <Title className="hps-title" level={4}>
                  {t('bank-account:editBankAccountTitle')}
                </Title>
              </Col>
              <BankAccountFrom
                parentForm={form}
                initialValues={initialValues}
                onSubmit={onSubmit}
              />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" onClick={onCancelClick} block>
                    {t('common:cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" onClick={form.submit} block>
                    {t('common:save')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <ModalConfirmBankInfo
            visible={confirmBankInfoVisible.visible}
            data={bankAccountData}
            onConfirmClick={onConfirmBankInfoClick}
            onCancelClick={onCancelBankInfoClick}
          />
          {/* TODO: wait type otp verify */}
          <OtpModal
            mobile={mobileNo}
            action={OtpTypeEnum.EDIT_BANK_ACCOUNT}
            isOpen={isOtpOpen}
            toggle={toggleOtpOpen}
            onSubmit={onOtpSuccess}
          />
        </div>
      </div>
    </main>
  )
}
EditBankAccount.defaultProps = {
  isSeller: false,
  onSubmitted: undefined
}

export default EditBankAccount
