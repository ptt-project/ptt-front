import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import AddBankAccount from '~/modules/BankAccount/components/AddBankAccount'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'bank-account']))
    }
  }
}

const AddBankAccountPage: FC = () => <AddBankAccount />

export default AddBankAccountPage
