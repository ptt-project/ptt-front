import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AddVocher from '~/modules/SellerMarketing/components/Voucher/components/AddVocher'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.marketing'
      ]))
    }
  }
}
const VoucherAddPage: FC = () => <AddVocher />

export default VoucherAddPage
