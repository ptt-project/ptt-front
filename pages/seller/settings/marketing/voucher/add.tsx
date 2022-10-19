import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AddVocher from '~/modules/SellerMarketing/components/Voucher/components/AddVocher'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.marketing'
        ]))
      }
    }
  }
)

const AddVoucherPage: FC = () => <AddVocher />

export default AddVoucherPage
