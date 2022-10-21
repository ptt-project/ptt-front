import { Button, Col, Form, Row, Typography, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import { CustomHookUseVisibleUtil, CustomUrlUtil } from '~/utils/main'
import {
  IBankAccountData,
  IBankAccountFromValues,
  ICustomHookUseVisibleUtil,
  IOtp
} from '~/interfaces'
import BankAccountFrom from '../BankAccountFrom'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import ModalConfirmBankInfo from '../ModalConfirmBankInfo'
import OtpModal from '~/components/main/OtpModal'
import { OtpTypeEnum } from '~/enums'
import SettingSidebar from '~/components/main/SettingSidebar'
import { BankAccountService } from '~/services'

const { Title } = Typography

interface IAddBankAccountProps {
  isSeller?: boolean
}
const AddBankAccount: React.FC<IAddBankAccountProps> = (props: IAddBankAccountProps) => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm<IBankAccountFromValues>()

  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])

  const mobileNo: string = '0901061303'
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const [bankAccountData, setBankAccountData] = useState<IBankAccountData>()
  const confirmBankInfoVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()

  function onSubmit(values: IBankAccountFromValues): void {
    const newBankAccountData: IBankAccountData = { ...values }
    setBankAccountData(newBankAccountData)
    confirmBankInfoVisible.show()
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
      await BankAccountService.addBankAccount({
        accountHolder: formValues.bankAccountName,
        accountNumber: formValues.bankAccountNo,
        bankCode: formValues.bankCode,
        fullName: formValues.fullName,
        thaiId: formValues.citizenNo,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      })
      message.success(t('common:dataUpdated'))
      router.replace(`${rootMenu}/settings/finance/bank`, `${rootMenu}/settings/finance/bank`, {
        locale: router.locale
      })
    } catch (error) {
      //
    }
    // bankMock.push(bankAccountData)
  }

  function onSaveClick(): void {
    form.submit()
  }

  function onCancelClick(): void {
    router.back()
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('bank-account:addBankAccountTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('bank-account:breadcrumbs.setting') },
          { title: t('bank-account:breadcrumbs.wallet') },
          {
            title: t('bank-account:breadcrumbs.addBankAccount'),
            href: CustomUrlUtil(`${rootMenu}/settings/finance/bank/add`, router.locale)
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
              <Col span={24}>
                <Title className="hps-title" level={4}>
                  {t('bank-account:addBankAccountTitle')}
                </Title>
              </Col>
              <BankAccountFrom parentForm={form} onSubmit={onSubmit} />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" onClick={onCancelClick} block>
                    {t('common:cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" onClick={onSaveClick} block>
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
            action={OtpTypeEnum.REGISTER}
            isOpen={isOtpOpen}
            toggle={toggleOtpOpen}
            onSubmit={onOtpSuccess}
          />
        </div>
      </div>
    </main>
  )
}

AddBankAccount.defaultProps = {
  isSeller: false
}

export default AddBankAccount
