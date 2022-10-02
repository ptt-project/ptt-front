import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import VocherAdd from '~/modules/SellerMarketing/components/Voucher/components/VocherAdd'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.marketing'
      ]))
    }
  }
}
const AddVoucherPage: FC = () => <VocherAdd />

export default AddVoucherPage
